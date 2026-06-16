import type { Metadata } from 'next'
import '@radix-ui/themes/styles.css'

export const metadata: Metadata = {
  title: 'Bank Statement Parser by Jestin',
  description:
    'Upload PDF bank statements (Scotiabank VISA, Scotiabank chequing, TD chequing) and instantly extract transactions to a table or CSV. Everything runs in your browser — no files are uploaded.',
}

export default function StatementParserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
