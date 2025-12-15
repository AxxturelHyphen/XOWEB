'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { ShoppingCart, LogIn, LogOut } from 'lucide-react'

export function Nav() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'
  return (
    <header className="border-b border-white/5 bg-black/40 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-[var(--accent-blue)] text-center leading-8 font-bold">XO</span>
          <span>XO76</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/shop" className="hover:text-[var(--accent-red)] transition">Shop</Link>
          <Link href="/account" className="hover:text-[var(--accent-red)] transition">Account</Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-[var(--accent-blue)] transition">
              Admin
            </Link>
          )}
          <Link href="/cart" className="relative flex items-center gap-2">
            <ShoppingCart size={18} />
            <span>Cart</span>
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="inline-flex items-center gap-1 text-sm hover:text-[var(--accent-red)]">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <button onClick={() => signIn('google')} className="inline-flex items-center gap-1 text-sm hover:text-[var(--accent-blue)]">
              <LogIn size={16} /> Login
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
