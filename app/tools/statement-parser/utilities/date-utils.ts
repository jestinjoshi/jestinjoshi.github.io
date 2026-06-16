export const monthMap: { [key: string]: string } = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
};

/**
 * Formats a date string from "MMM DD" to "DD-MM-YYYY"
 * @param dateStr - Date string like "Dec 18"
 * @param startYear - Year for December transactions
 * @param endYear - Year for January transactions
 * @returns Formatted date string or original if parsing fails
 */
export function formatMonthDate(dateStr: string, startYear: string, endYear: string): string {
  const parts = dateStr.split(' ');
  if (parts.length !== 2) return dateStr;
  const monthName = parts[0];
  const day = parts[1].padStart(2, '0');
  const month = monthMap[monthName];
  if (!month) return dateStr;
  const year = month === '12' ? startYear : endYear; // Dec from start year, Jan from end year
  return `${day}-${month}-${year}`;
}

/**
 * Extracts statement period years from text
 * @param text - Full PDF text
 * @returns Object with startYear and endYear, defaults to '2025' and '2026'
 */
export function extractStatementYears(text: string): { startYear: string; endYear: string } {
  const periodMatch = text.match(/Statement Period \w+ \d+, (\d{4}) - \w+ \d+, (\d{4})/);
  if (periodMatch) {
    return { startYear: periodMatch[1], endYear: periodMatch[2] };
  }

  // For chequing statements
  const chequingMatch = text.match(/(\w+ \d+, \d{4}) to (\w+ \d+, \d{4})/);
  if (chequingMatch) {
    const startDateMatch = chequingMatch[1].match(/(\d{4})/);
    const endDateMatch = chequingMatch[2].match(/(\d{4})/);
    return {
      startYear: startDateMatch ? startDateMatch[1] : '2025',
      endYear: endDateMatch ? endDateMatch[1] : '2026'
    };
  }

  return { startYear: '2025', endYear: '2026' };
}