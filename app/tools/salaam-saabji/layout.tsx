import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salaam Saabji by Jestin',
  description: 'Welcome to the game of Salaam Saabji! In this game, you have to guess words that your friends have picked for themselves. The last one standing whose word is not guessed by anyone is the winner.',
  openGraph: {
    type: "website",
    images: [
      {
        url: '/img/salaam-saabji-preview.jpeg',
        width: 600,
        height: 600,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
