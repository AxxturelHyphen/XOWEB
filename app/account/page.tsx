import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { formatCurrency } from '@/lib/pricing'

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) {
    return (
      <section className="section">
        <h1 className="text-3xl font-semibold mb-4">Account</h1>
        <p>Please sign in to view your profile.</p>
        <Link href="/api/auth/signin" className="btn-primary mt-3 inline-flex">
          Sign in
        </Link>
      </section>
    )
  }
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <section className="section space-y-4">
      <div>
        <p className="text-sm text-white/60">Signed in as</p>
        <h1 className="text-3xl font-semibold">{session.user.name || session.user.email}</h1>
      </div>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Order {order.id}</p>
                <p className="text-white/60 text-sm">{order.status}</p>
              </div>
              <p className="font-semibold">{formatCurrency(order.totalCents, order.currency)}</p>
            </div>
            <ul className="text-sm text-white/70 mt-2">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {orders.length === 0 && <p className="text-white/60">No orders yet.</p>}
      </div>
    </section>
  )
}
