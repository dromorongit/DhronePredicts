import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'DhronePredicts - Elite Sports Predictions',
  description: 'Premium sports prediction platform with VVIP access, advanced analytics, and expert predictions.',
  keywords: ['sports predictions', 'betting tips', 'football predictions', 'VIP predictions'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background text-text antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
