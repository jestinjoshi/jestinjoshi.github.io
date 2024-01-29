import type { Metadata } from 'next'
import './css/globals.css'
import './css/style.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://jestinjoshi.github.io/'),
  title: 'Jestin | Frontend Web Developer',
  description: 'A portfolio website of Jestin Palamuttam, a frontend web developer who resides in Toronto, Canada',
  appleWebApp: {
    capable: true,
    title: 'Jestin',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: "profile",
  },
  twitter: {
    card: "summary",
    creator: "@jestinjoshi"
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
  "image": "https://www.yourportfolio.com/images/your-profile-image.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/jestinjoshi",
    "https://github.com/jestinjoshi",
    "https://twitter.com/your-twitter-handle"
  ],
  "jobTitle": "Frontend Web Developer",
  "knows": "HTML, CSS, JavaScript, React, Vue, WordPress, PHP",
  "description": "Experienced frontend web developer passionate about creating responsive and user-friendly websites. Proficient in the latest web technologies and committed to delivering high-quality results.",
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
      <body>{children}</body>
    </html>
  )
}
