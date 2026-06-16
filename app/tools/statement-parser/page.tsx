'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  Text,
  Theme,
} from '@radix-ui/themes';
import type { Transaction } from './parsers/types';
import { parserFactory } from './parsers/factory';

// pdf-parse is loaded lazily inside the upload handler so it never runs
// during the static export build (it relies on browser-only APIs).
let workerConfigured = false;

export default function StatementParserPage() {
  // Follow the OS light/dark preference
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  // Loading state for PDF processing
  const [loading, setLoading] = useState(false);
  // List of parsed transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // List of error messages
  const [errors, setErrors] = useState<string[]>([]);
  // Whether the CSV was just copied (for button feedback)
  const [copied, setCopied] = useState(false);
  // Hidden file input, triggered by the styled upload button
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setAppearance(media.matches ? 'dark' : 'light');
    const onChange = (e: MediaQueryListEvent) => setAppearance(e.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Handle PDF file upload and text extraction
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setTransactions([]); // Clear previous transactions
    setErrors([]); // Clear previous errors

    // Configure PDF.js worker once, on first use
    const { PDFParse } = await import('pdf-parse');
    if (!workerConfigured) {
      PDFParse.setWorker('https://cdn.jsdelivr.net/npm/pdf-parse@latest/dist/pdf-parse/web/pdf.worker.mjs');
      workerConfigured = true;
    }

    const allTransactions: Transaction[] = [];
    const fileErrors: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        await parser.destroy();

        const parseResult = parserFactory.parseText(result.text);
        if (parseResult.success) {
          allTransactions.push(...parseResult.transactions);
          if (parseResult.warnings.length > 0) {
            fileErrors.push(`${file.name}: ${parseResult.warnings.join(', ')}`);
          }
        } else {
          const errorMessages = parseResult.errors.map(err => `${err.field}: ${err.message}`).join('; ');
          fileErrors.push(`${file.name}: ${errorMessages}`);
        }
      } catch (error) {
        console.error('Error parsing PDF:', error);
        fileErrors.push(`${file.name}: Error parsing PDF file`);
      }
    }

    setTransactions(allTransactions);
    setErrors(fileErrors);
    setLoading(false);
  }

  // Generate CSV from transactions and copy to clipboard
  const copyToCSV = async () => {
    const headers = ['Ref', 'Trans Date', 'Post Date', 'Details', 'Amount'];
    const rows = transactions.map(tx => [tx.ref, tx.transDate, tx.postDate, tx.details, tx.amount.toString()]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    try {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy CSV. Please check permissions.');
    }
  };

  return (
    <Theme accentColor="violet" grayColor="slate" radius="large" appearance={appearance}>
      <Box style={{ minHeight: '100vh' }} p={{ initial: '4', sm: '6' }}>
        <Container size="4">
          <Card size={{ initial: '2', sm: '4' }}>
            <Flex direction="column" gap="5">
              <Flex direction="column" gap="1" align="start">
                <Heading size="7" as="h1">Bank Statement Parser</Heading>
                <Text size="3" color="gray">
                  Upload one or more PDF statements and view extracted transactions instantly.
                  Everything runs in your browser — nothing is uploaded.
                </Text>
              </Flex>

              <Flex align="center" gap="3" wrap="wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="statement"
                  id="statement"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Button
                  size="3"
                  variant="solid"
                  disabled={loading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {loading ? <Spinner /> : null}
                  {loading ? 'Parsing…' : 'Upload PDF statements'}
                </Button>
                {transactions.length > 0 && (
                  <Badge size="2" color="gray" variant="soft">
                    {transactions.length} transaction{transactions.length === 1 ? '' : 's'}
                  </Badge>
                )}
              </Flex>

              {errors.length > 0 && (
                <Callout.Root color="red" role="alert">
                  <Callout.Text>
                    <Flex direction="column" gap="1">
                      {errors.map((error, index) => (
                        <Text key={index} size="2">{error}</Text>
                      ))}
                    </Flex>
                  </Callout.Text>
                </Callout.Root>
              )}

              {transactions.length > 0 && (
                <Flex direction="column" gap="3">
                  <Flex justify="between" align="center" gap="3">
                    <Heading size="4" as="h2">Transactions</Heading>
                    <Button
                      variant="soft"
                      color={copied ? 'green' : undefined}
                      onClick={copyToCSV}
                    >
                      {copied ? 'Copied!' : 'Copy as CSV'}
                    </Button>
                  </Flex>

                  <Table.Root variant="surface" size="2">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Ref</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Trans Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Post Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Details</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="end">Amount</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {transactions.map((tx, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{tx.ref}</Table.Cell>
                          <Table.Cell>{tx.transDate}</Table.Cell>
                          <Table.Cell>{tx.postDate}</Table.Cell>
                          <Table.Cell>{tx.details}</Table.Cell>
                          <Table.Cell justify="end">
                            <Text color={tx.amount < 0 ? 'red' : 'green'} weight="medium">
                              {tx.amount.toFixed(2)}
                            </Text>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Flex>
              )}

              {transactions.length === 0 && !loading && (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap="2"
                  py="8"
                  style={{
                    border: '1px dashed var(--gray-a6)',
                    borderRadius: 'var(--radius-4)',
                  }}
                >
                  <Text size="3" color="gray">No transactions yet</Text>
                  <Text size="2" color="gray">Upload a statement to begin.</Text>
                </Flex>
              )}
            </Flex>
          </Card>
        </Container>
      </Box>
    </Theme>
  );
}
