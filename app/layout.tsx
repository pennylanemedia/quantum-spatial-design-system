// Root Layout for Petersen Games
// Complete app layout with cart provider and navigation

import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from '../lib/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Petersen Games - Epic Tabletop Adventures',
  description: 'Discover immersive games, detailed miniatures, and legendary stories from Petersen Games.',
  keywords: 'tabletop games, miniatures, RPG, board games, Cthulhu Wars, Bloodfields',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}