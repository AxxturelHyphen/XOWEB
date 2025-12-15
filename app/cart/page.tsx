import Link from 'next/link'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import { formatCurrency, computeCartTotal } from '@/lib/pricing'

async function getCart() {
  const cartId = cookies().get('xo76_cart')?.value
  if (!cartId) return null
  return prisma.cart.findUnique({ where: { id: cartId }, include: { items: { include: { product: true } } } })
}

export default async function CartPage() {
  const cart = await getCart()
  const total = computeCartTotal(cart?.items || [])
  return (
    <section className="section space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <Link href="/shop" className="btn-secondary">
          Continue shopping
        </Link>
      </div>
      {!cart || cart.items.length === 0 ? (
        <p className="text-white/60">Cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cart.items.map((item) => (
            <div key={item.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-white/60">Qty {item.quantity}</p>
              </div>
              <p>{formatCurrency(item.unitPriceCentsSnapshot * item.quantity, item.product.currency)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Subtotal</span>
            <span>{formatCurrency(total, 'USD')}</span>
          </div>
          <Link href="/checkout" className="btn-primary w-fit">
            Checkout
          </Link>
        </div>
      )}
    </section>
  )
}
