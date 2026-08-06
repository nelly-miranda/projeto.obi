import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OBI.TEC · Base de Conhecimento',
  description: 'Sistema de gestão de conhecimento comercial da OBI.TEC',
  icons: {
    icon: '/obitec-logo.png',
    shortcut: '/obitec-logo.png',
    apple: '/obitec-logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
