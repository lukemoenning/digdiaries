import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Annabel Hendrickson's Portfolio",
  description: "A collection of photos and blog posts by Annabel Hendrickson",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
      <body className={inter.className}>{children}</body>
    </html>
  )
}