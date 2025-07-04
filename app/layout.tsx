import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'El Jarda - Services de jardinage à Sfax | الجردة - خدمات البستنة في صفاقس',
  description: 'Services de jardinage professionnel à Sfax, Tunisie. Outils, conseils et entretien de jardins.',
  keywords: 'jardinage, Sfax, Tunisie, outils, plantes, jardinier, El Jarda',
  metadataBase: new URL('https://eljarda.com'),
  icons: {
    icon: '/el_jarda.png',
    shortcut: '/el_jarda.png',
    apple: '/el_jarda.png',
  },
  openGraph: {
    title: 'El Jarda - Services de jardinage à Sfax',
    description: 'Expert en jardinage à Sfax. Outils, conseils et entretien professionnel.',
    url: 'https://eljarda.com',
    siteName: 'El Jarda',
    locale: 'fr_TN',
    type: 'website',
    images: [
      {
        url: '/el_jarda.png',
        width: 1200,
        height: 630,
        alt: 'El Jarda - Expert en jardinage à Sfax',
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
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
