import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WelcomeModal from '@/components/WelcomeModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ketapiphany.com'),
  title: 'Ketapiphany — A Gallery of Healing & Discovery',
  description:
    'A community space for sharing art, poetry, journals, and stories born from ketamine therapy sessions. A place of healing, creativity, and connection.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Ketapiphany',
    description: 'Share your healing. Discover others.',
    siteName: 'Ketapiphany',
    images: [{ url: '/logo.png', width: 1536, height: 1024, alt: 'Ketapiphany' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketapiphany',
    description: 'Share your healing. Discover others.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <WelcomeModal />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
