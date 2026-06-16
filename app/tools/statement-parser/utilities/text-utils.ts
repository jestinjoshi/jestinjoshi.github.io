/**
 * Parses an amount string, removing commas and handling negative signs
 * @param amountStr - Amount string like "2,149.50" or "100.00-"
 * @returns Parsed number or NaN if invalid
 */
export function parseAmount(amountStr: string): number {
  if (!amountStr) return NaN;
  const cleaned = amountStr.replace(/,/g, '').replace(/-$/, '');
  const num = parseFloat(cleaned);
  if (isNaN(num)) return NaN;
  return amountStr.endsWith('-') ? -num : num;
}

/**
 * Validates if a string matches a transaction reference pattern
 * @param ref - Reference string
 * @returns True if valid reference
 */
export function isValidReference(ref: string): boolean {
  return /^\d{3}$/.test(ref) || /^\w{3}\s+\d{1,2}$/.test(ref);
}

/**
 * Cleans and normalizes transaction details
 * @param details - Raw details string
 * @returns Trimmed details
 */
export function cleanDetails(details: string): string {
  return details.trim();
}