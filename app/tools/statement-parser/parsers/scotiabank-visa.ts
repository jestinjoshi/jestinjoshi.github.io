import { BaseParser } from './base-parser';
import type { Transaction, ParseResult, ParseError } from './types';

export class ScotiabankVisaParser extends BaseParser {
    name = 'scotiabank-visa';

    detect(text: string): boolean {
        return text.includes('Scotiabank') && text.includes('Total Minimum Payment');
    }

    parse(text: string): ParseResult {
        const transactions: Transaction[] = [];
        const errors: ParseError[] = [];
        const warnings: string[] = [];

        const lines = text.split('\n');
        let inTransactions = false;

        // Extract statement period years
        const { startYear, endYear } = this.getStatementYears(text);

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('Transactions since your last statement')) {
                inTransactions = true;
                continue;
            }

            if (!inTransactions) {
                continue;
            }

            if (line.includes('SUB-TOTAL')) {
                break;
            }

            const trimmed = line.trim();

            // A new transaction starts with a 3-digit reference
            if (/^\d{3}\s/.test(trimmed)) {
                let transactionLine = trimmed;

                // Only one continuation line is allowed, per your requirement
                const nextLine = (i + 1 < lines.length) ? lines[i + 1].trim() : '';
                if (nextLine && !/^\d{3}\s/.test(nextLine) && !nextLine.includes('SUB-TOTAL')) {
                    transactionLine += ' ' + nextLine;
                    i++; // skip the continuation line in the outer loop
                }

                const result = this.processTransaction(transactionLine, i, startYear, endYear);
                if (result.transaction) {
                    transactions.push(result.transaction);
                } else if (result.error) {
                    errors.push(result.error);
                }
            }
        }

        if (errors.length > 0) {
            return this.createErrorResult(errors, warnings);
        }

        return this.createSuccessResult(transactions);
    }

    private processTransaction(txText: string, lineNumber: number, startYear: string, endYear: string): { transaction?: Transaction; error?: ParseError } {
        // Regex to match transaction format: REF TransDate PostDate Details Amount [optional - for credits]
        // Groups: 1=ref, 2=transDate, 3=postDate, 4=details, 5=amountStr
        const match = txText.match(/^(\d{3})\s+(\w+\s+\d+)\s+(\w+\s+\d+)\s+(.+?)\s+([\d.,]+)(?:\s*-)?$/);
        if (!match) {
            // return { error: this.createError(lineNumber, 'transaction', `Failed to match transaction format: ${txText}`) };
            return { transaction: undefined };
        }

        const [, ref, transDate, postDate, details, amountStr] = match;
        const amount = this.parseTransactionAmount(amountStr);
        if (isNaN(amount)) {
            return { error: this.createError(lineNumber, 'amount', `Invalid amount format: ${amountStr}`) };
        }

        // Check if it's a credit (ends with -)
        const isCredit = txText.endsWith('-');
        const finalAmount = isCredit ? -Math.abs(amount) : amount;

        const formattedTransDate = this.formatDate(transDate, startYear, endYear);
        const formattedPostDate = this.formatDate(postDate, startYear, endYear);

        const transaction = this.createTransaction(ref, formattedTransDate, formattedPostDate, details, finalAmount);
        return { transaction };
    }
}