import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { formatCurrency } from '@/lib/pricing'

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/')
  }
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } })
  return (
    <section className="section space-y-6">
      <div>
        <p className="text-sm text-white/60">Admin</p>
        <h1 className="text-3xl font-semibold">Inventory</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-4 space-y-3">
          <h2 className="font-semibold">Products</h2>
          {products.map((p) => (
            <div key={p.id} className="border border-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{p.name}</span>
                <span>{formatCurrency(p.priceCents, p.currency)}</span>
              </div>
              <p className="text-white/60 text-sm">{p.category}</p>
            </div>
          ))}
        </div>
        <div className="card p-4 space-y-3">
          <h2 className="font-semibold">Orders</h2>
          {orders.map((o) => (
            <div key={o.id} className="border border-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{o.id}</span>
                <span>{o.status}</span>
              </div>
              <p className="text-sm text-white/70">{formatCurrency(o.totalCents, o.currency)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
