import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/ui/page-transition'
import ClientLayout from '@/components/ui/ClientLayout'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif' 
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stylehub.vercel.app'),
  title: 'StyleHub - Premium Fashion & Home Decor',
  description: 'Discover premium accessories, clothing, and home decor at StyleHub. Shop the latest trends with fast shipping and easy returns.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stylehub.app',
    title: 'StyleHub - Premium Fashion & Home Decor',
    description: 'Discover premium accessories, clothing, and home decor',
    siteName: 'StyleHub',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <head>
        <style>{`
          :root {
            color-scheme: light;
          }
          .dark {
            color-scheme: dark;
          }
        `}</style>
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-background text-foreground">
        <ClientLayout />
        <Header />
        <main className="flex-1">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
