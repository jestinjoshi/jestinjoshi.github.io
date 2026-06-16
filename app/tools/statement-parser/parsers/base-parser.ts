import type { Transaction, ParseResult, ParseError, BankParser } from './types';
import { formatMonthDate, extractStatementYears } from '../utilities/date-utils';
import { parseAmount, cleanDetails } from '../utilities/text-utils';

export abstract class BaseParser implements BankParser {
    abstract name: string;

    abstract detect(text: string): boolean;

    abstract parse(text: string): ParseResult;

    /**
     * Creates a successful parse result
     */
    protected createSuccessResult(transactions: Transaction[]): ParseResult {
        return {
            success: true,
            transactions,
            errors: [],
            warnings: []
        };
    }

    /**
     * Creates a failed parse result with errors
     */
    protected createErrorResult(errors: ParseError[], warnings: string[] = []): ParseResult {
        return {
            success: false,
            transactions: [],
            errors,
            warnings
        };
    }

    /**
     * Extracts statement years from text
     */
    protected getStatementYears(text: string): { startYear: string; endYear: string } {
        return extractStatementYears(text);
    }

    /**
     * Formats a month-date string using statement years
     */
    protected formatDate(dateStr: string, startYear: string, endYear: string): string {
        return formatMonthDate(dateStr, startYear, endYear);
    }

    /**
     * Parses and validates an amount
     */
    protected parseTransactionAmount(amountStr: string): number {
        return parseAmount(amountStr);
    }

    /**
     * Cleans transaction details
     */
    protected cleanTransactionDetails(details: string): string {
        return cleanDetails(details);
    }

    /**
     * Creates a standardized transaction object
     */
    protected createTransaction(
        ref: string,
        transDate: string,
        postDate: string,
        details: string,
        amount: number
    ): Transaction {
        return {
            ref,
            transDate,
            postDate,
            details: this.cleanTransactionDetails(details),
            amount
        };
    }

    /**
     * Creates a parse error
     */
    protected createError(line: number, field: string, message: string, severity: 'error' | 'warning' = 'error'): ParseError {
        return { line, field, message, severity };
    }
}