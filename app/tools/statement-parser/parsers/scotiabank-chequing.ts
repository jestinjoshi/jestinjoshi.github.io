import { BaseParser } from './base-parser';
import type { Transaction, ParseResult, ParseError } from './types';

export class ScotiabankChequingParser extends BaseParser {
    name = 'scotiabank-chequing';

    detect(text: string): boolean {
        return text.toLowerCase().includes('scotiabank') && text.includes('Here\'s what happened in your account this statement period');
    }

    parse(text: string): ParseResult {
        const transactions: Transaction[] = [];
        const errors: ParseError[] = [];
        const warnings: string[] = [];

        // Extract statement period years
        const { startYear, endYear } = this.getStatementYears(text);

        const lines = text.split('\n');
        let inTransactions = false;
        let previousBalance: number | null = this.extractOpeningBalance(text);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            // Handle both initial and continued sections on subsequent pages
            if (trimmed.includes("Here's what happened in your account")) {
                inTransactions = true;
                continue;
            }

            if (!inTransactions) continue;

            // Break on page breaks or other section markers, but continue parsing if it's just a "Date Transactions" header
            if (trimmed.includes('--') && /\d{1,2} of \d{1,2}/.test(trimmed)) {
                // This is a page number marker, skip it but don't break
                continue;
            }

            if (trimmed.includes('Date') && trimmed.includes('Transactions') && trimmed.includes('Balance')) {
                // This is the column header, skip it
                continue;
            }

            // Check if line starts with a date like "Dec 18" or "Jan 2"
            if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+/.test(trimmed)) {
                const result = this.processChequingTransaction(trimmed, i, lines, startYear, endYear, previousBalance);
                if (result.transaction) {
                    transactions.push(result.transaction);
                    previousBalance = result.newBalance;
                } else if (result.error) {
                    errors.push(result.error);
                }
                i = result.newIndex; // Update index to skip processed lines
            }
        }

        if (errors.length > 0) {
            return this.createErrorResult(errors, warnings);
        }

        return this.createSuccessResult(transactions);
    }

    private processChequingTransaction(
        line: string,
        index: number,
        lines: string[],
        startYear: string,
        endYear: string,
        previousBalance: number | null
    ): { transaction?: Transaction; error?: ParseError; newBalance: number | null; newIndex: number } {
        const parts = line.split(/\s+/);
        if (parts.length < 4) {
            return { error: this.createError(index, 'transaction', `Insufficient parts in transaction line: ${line}`), newBalance: previousBalance, newIndex: index };
        }

        const date = parts[0] + ' ' + parts[1];
        let description = parts.slice(2, -2).join(' ');

        // Check for continuation lines
        let j = index + 1;
        while (j < lines.length) {
            const nextTrimmed = lines[j].trim();
            if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d+/.test(nextTrimmed) ||
                nextTrimmed.includes('SUB-TOTAL') ||
                nextTrimmed.includes('--') ||
                nextTrimmed === '') break;
            description += ' ' + nextTrimmed;
            j++;
        }

        const numericTokens = parts.filter(token => /^[\d,]+(?:\.\d+)?$/.test(token));
        const currentBalanceToken = numericTokens[numericTokens.length - 1];
        const currentBalance = currentBalanceToken ? parseFloat(currentBalanceToken.replace(/,/g, '')) : NaN;

        // Skip opening and closing balances (set previousBalance from opening balance)
        if (description.toLowerCase().includes('opening') || description.toLowerCase().includes('closing')) {
            if (!isNaN(currentBalance)) {
                return { newBalance: currentBalance, newIndex: j - 1 };
            }
            return { newBalance: previousBalance, newIndex: j - 1 };
        }

        if (numericTokens.length < 2 || isNaN(currentBalance)) {
            return { error: this.createError(index, 'amount', `Invalid balance or insufficient numeric tokens: ${line}`), newBalance: previousBalance, newIndex: j - 1 };
        }

        const transactionAmountToken = numericTokens[numericTokens.length - 2];
        let amount = transactionAmountToken ? parseFloat(transactionAmountToken.replace(/,/g, '')) : NaN;
        if (isNaN(amount)) {
            return { error: this.createError(index, 'amount', `Invalid transaction amount: ${transactionAmountToken}`), newBalance: previousBalance, newIndex: j - 1 };
        }

        // Determine sign by previous balance comparison when available
        if (previousBalance !== null) {
            if (currentBalance > previousBalance) {
                // Deposit - balance increased
                amount = Math.abs(amount);
            } else {
                // Withdrawal - balance decreased
                amount = -Math.abs(amount);
            }
        } else {
            // Fallback: use description hints when no prior balance exists
            amount = this.inferAmountSignFromDescription(description, amount);
        }

        const transaction = this.createTransaction(
            date,
            this.formatDate(date, startYear, endYear),
            '',
            description,
            amount
        );

        return { transaction, newBalance: currentBalance, newIndex: j - 1 };
    }

    private extractOpeningBalance(text: string): number | null {
        const openingMatch = text.match(/Opening Balance on [A-Za-z]+ \d+, \d{4} \$?([\d,]+(?:\.\d+)?)/i);
        if (!openingMatch) return null;

        const normalized = openingMatch[1].replace(/,/g, '');
        const parsed = parseFloat(normalized);
        return Number.isFinite(parsed) ? parsed : null;
    }

    private inferAmountSignFromDescription(description: string, amount: number): number {
        const desc = description.toLowerCase();
        const creditTerms = ['deposit', 'credit', 'refund', 'reversal', 'inbound', 'transfer in'];
        const debitTerms = ['withdrawal', 'debit', 'payment', 'purchase', 'fee', 'interac', 'outbound', 'atm'];

        if (debitTerms.some(term => desc.includes(term))) {
            return -Math.abs(amount);
        }

        if (creditTerms.some(term => desc.includes(term))) {
            return Math.abs(amount);
        }

        // If not sure, preserve natural parsed magnitude but don't default using 0 prior balance
        return amount;
    }
}
