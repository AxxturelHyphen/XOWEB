import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import { formatCurrency, computeCartTotal } from '@/lib/pricing'

async function getCart(userId: string) {
  const cookieId = cookies().get('xo76_cart')?.value
  if (!cookieId) return null
  return prisma.cart.findUnique({ where: { id: cookieId, userId }, include: { items: { include: { product: true } } } })
}

export default async function CheckoutPage() {
  const session = await auth()
  if (!session?.user) {
    return (
      <section className="section">
        <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
        <p className="text-white/70 mb-4">Sign in with Google to checkout.</p>
        <Link href="/api/auth/signin" className="btn-primary">
          Sign in
        </Link>
      </section>
    )
  }

  const cart = await getCart(session.user.id)
  const total = computeCartTotal(cart?.items || [])
  return (
    <section className="section space-y-4">
      <h1 className="text-3xl font-semibold">Checkout</h1>
      {!cart || cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-4">
              <h2 className="font-semibold mb-2">Payment</h2>
              <form action="/api/paypal/create-order" method="post" className="space-y-3">
                <button type="submit" className="btn-primary w-full">Pay with PayPal</button>
              </form>
              <form action="/api/order/manual" method="post" className="space-y-3 mt-3">
                <button type="submit" className="btn-secondary w-full">Pay via Instagram DM</button>
              </form>
            </div>
          </div>
          <div className="card p-4 space-y-2">
            <h2 className="font-semibold">Summary</h2>
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.quantity * item.unitPriceCentsSnapshot, item.product.currency)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total, 'USD')}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
