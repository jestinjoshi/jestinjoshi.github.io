import { BaseParser } from './base-parser';
import type { Transaction, ParseResult, ParseError } from './types';

const depositTerms = /rebate|deposit|credit|refund|reversal|deposit in|deposit to/i;
const withdrawalTerms = /withdrawal|debit|fee|payment|purchase|tdvisa|monthly account fee|etf/i;

export class TDChquingParser extends BaseParser {
  name = 'td-chequing';

  detect(text: string): boolean {
    const normalizedCompact = text.replace(/\s+/g, '').toUpperCase();
    return normalizedCompact.includes('THETORONTO-DOMINIONBANK');
  }

  parse(text: string): ParseResult {
    const transactions: Transaction[] = [];
    const errors: ParseError[] = [];
    const warnings: string[] = [];

    const normalized = this.normalizeSpacedText(text);

    const dateMatch = normalized.match(/(\d{1,2})\/(\d{2})\s*-\s*(\d{1,2})\/(\d{2})/);
    let startYear = '2025';
    let endYear = '2026';
    if (dateMatch) {
      startYear = `20${dateMatch[2]}`;
      endYear = `20${dateMatch[4]}`;
    } else {
      const years = this.getStatementYears(normalized);
      startYear = years.startYear;
      endYear = years.endYear;
    }

    let previousBalance: number | null = null;
    let refCount = 1;

    // Find starting balance
    const startingMatch = normalized.match(/STARTINGBALANCE([A-Z]+)(\d{1,2})([\d,]+\.\d{2})/);
    if (startingMatch) {
      const balance = parseFloat(startingMatch[3].replace(/,/g, ''));
      previousBalance = balance;
      const startPos = normalized.indexOf('STARTINGBALANCE');
      const endPos = startPos + startingMatch[0].length;
      const afterStarting = normalized.slice(endPos);

      // Parse transactions
      const txRegex = /([A-Za-z &-*]+)([\d,]+\.\d{2})(DEC|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV)(\d{1,2})([\d,]+\.\d{2})?/gi;
      let txMatch;
      while ((txMatch = txRegex.exec(afterStarting)) !== null) {
        const description = txMatch[1].trim();
        const amount = parseFloat(txMatch[2].replace(/,/g, ''));
        const dateStr = txMatch[3] + txMatch[4];
        const balanceStr = txMatch[5];
        const balance = balanceStr ? parseFloat(balanceStr.replace(/,/g, '')) : NaN;

        let finalAmount = -amount; // default withdrawal
        if (previousBalance !== null && !isNaN(balance)) {
          const delta = balance - previousBalance;
          if (Math.abs(delta - amount) < 0.5) {
            finalAmount = delta < 0 ? -amount : amount;
          } else {
            const descUpper = description.toUpperCase();
            if (depositTerms.test(descUpper)) finalAmount = amount;
            else if (withdrawalTerms.test(descUpper)) finalAmount = -amount;
            else finalAmount = -amount;
          }
        } else {
          const descUpper = description.toUpperCase();
          if (depositTerms.test(descUpper)) finalAmount = amount;
          else if (withdrawalTerms.test(descUpper)) finalAmount = -amount;
          else finalAmount = -amount;
        }

        if (!isNaN(balance)) previousBalance = balance;

        const formattedDate = this.formatDate(this.normalizeDateToken(dateStr), startYear, endYear);

        const tx: Transaction = this.createTransaction(
          `${refCount.toString().padStart(3, '0')}`,
          formattedDate,
          formattedDate,
          description,
          finalAmount
        );
        transactions.push(tx);
        refCount++;
      }
    }

    if (errors.length > 0) {
      return this.createErrorResult(errors, warnings);
    }
    return this.createSuccessResult(transactions);
  }

  private normalizeSpacedText(text: string): string {
    return text.replace(/\s+/g, '');
  }

  private normalizeDateToken(token: string): string {
    const m = token.match(/^([A-Za-z]{3})(\d{1,2})$/i);
    if (!m) return token;
    const month = m[1].slice(0, 1).toUpperCase() + m[1].slice(1).toLowerCase();
    return `${month} ${m[2]}`;
  }
}
