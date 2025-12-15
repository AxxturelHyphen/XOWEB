import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Providers } from '@/components/providers'

const plex = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex',
})

export const metadata: Metadata = {
  title: 'XO76 | xosieteseis',
  description: 'XO76 — streetwear tees and underground beats',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plex.variable}>
      <body className="bg-background text-foreground">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
