import type { Metadata } from 'next'
import './css/globals.css'
import './css/style.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://jestinjoshi.github.io/'),
  title: 'Jestin • Web Developer • Toronto, Canada',
  description: 'Portfolio website of Jestin Palamuttam, an experienced web developer passionate about creating responsive and user-friendly websites. Proficient in the latest web technologies and committed to delivering high-quality results.',
  keywords: ['web developer', 'portfolio', 'jestin palamuttam', 'toronto', 'canada', 'responsive', 'user-friendly', 'web technologies', 'high-quality results'],
  icons: {
    icon: './favicon.ico',
    apple: './favicon.ico',
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: 'https://jestinjoshi.github.io/img/preview.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@jestinjoshi",
    images: [
      {
        url: 'https://jestinjoshi.github.io/img/preview.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
  verification: {
    google: "I3mkVwBHNX9HGBRlqfDzXzYZ33drz0Ah-s5uSaGOTTY"
  }
}

const jsonLd = {
  "@context": "http://schema.org",
  "@type": "Person",
  "name": "Jestin Palamuttam",
  "url": "https://jestinjoshi.github.io/",
  "image": "https://jestinjoshi.github.io/img/avatar.webp",
  "sameAs": [
    "https://www.linkedin.com/in/jestinjoshi",
    "https://github.com/jestinjoshi",
    "https://twitter.com/your-twitter-handle"
  ],
  "jobTitle": "Web Developer",
  "knows": "HTML, CSS, JavaScript, React, Vue, WordPress, PHP",
  "description": "Experienced web developer passionate about creating responsive and user-friendly websites. Proficient in the latest web technologies and committed to delivering high-quality results.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "Ontario",
    "addressCountry": "Canada"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-NMNP0QSWEX" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-NMNP0QSWEX');
        `}
        </Script>
        <Script id='structuredData' type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
