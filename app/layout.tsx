import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'

import './globals.css'

const _cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Heart Locket',
  description: 'A Valentine keepsake for someone you love',
}

export const viewport: Viewport = {
  themeColor: '#f7f4f1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${_cormorant.variable} ${_inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
