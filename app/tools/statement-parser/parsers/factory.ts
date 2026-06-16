import type { BankParser, ParseResult } from './types';
import { ScotiabankVisaParser } from './scotiabank-visa';
import { ScotiabankChequingParser } from './scotiabank-chequing';
import { TDChquingParser } from './td-chequing';

export class ParserFactory {
  private parsers: BankParser[] = [];

  constructor() {
    this.registerParser(new ScotiabankVisaParser());
    this.registerParser(new ScotiabankChequingParser());
    this.registerParser(new TDChquingParser());
  }

  /**
   * Registers a new bank parser
   */
  registerParser(parser: BankParser): void {
    this.parsers.push(parser);
  }

  /**
   * Detects the appropriate parser for the given text
   */
  detectParser(text: string): BankParser | null {
    for (const parser of this.parsers) {
      if (parser.detect(text)) {
        return parser;
      }
    }
    return null;
  }

  /**
   * Parses text using the detected parser
   */
  parseText(text: string): ParseResult {
    const parser = this.detectParser(text);
    if (!parser) {
      return {
        success: false,
        transactions: [],
        errors: [{ line: 0, field: 'statement', message: 'Unsupported statement type', severity: 'error' }],
        warnings: []
      };
    }

    return parser.parse(text);
  }

  /**
   * Gets all registered parsers
   */
  getParsers(): BankParser[] {
    return [...this.parsers];
  }

  /**
   * Gets a parser by name
   */
  getParserByName(name: string): BankParser | null {
    return this.parsers.find(p => p.name === name) || null;
  }
}

// Singleton instance
export const parserFactory = new ParserFactory();