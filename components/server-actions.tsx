'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function AddToCartButton({ productId }: { productId: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()
  async function handleAdd() {
    start(async () => {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      })
      router.refresh()
    })
  }
  return (
    <button onClick={handleAdd} className="btn-primary" disabled={pending}>
      {pending ? 'Adding…' : 'Add to cart'}
    </button>
  )
}
