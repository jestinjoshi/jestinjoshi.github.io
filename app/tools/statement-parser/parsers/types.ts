export interface Transaction {
  ref: string; // Transaction reference number (e.g., "001")
  transDate: string; // Transaction date in DD-MM-YYYY format (e.g., "06-12-2025")
  postDate: string; // Posting date in DD-MM-YYYY format (e.g., "09-12-2025")
  details: string; // Description of the transaction
  amount: number; // Transaction amount (positive for debits, negative for credits)
}

export interface ParseError {
  line: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ParseResult {
  success: boolean;
  transactions: Transaction[];
  errors: ParseError[];
  warnings: string[];
}

export interface BankParser {
  name: string;
  detect(text: string): boolean;
  parse(text: string): ParseResult;
}