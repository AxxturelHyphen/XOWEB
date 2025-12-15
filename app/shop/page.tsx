import { prisma } from '@/lib/db'
import { ProductCard } from '@/components/product-card'
import { Suspense } from 'react'

async function Products({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const term = typeof searchParams.search === 'string' ? searchParams.search : undefined

  const products = await prisma.product.findMany({
    where: {
      active: true,
      category: category && category !== 'ALL' ? (category.toUpperCase() as any) : undefined,
      name: term ? { contains: term, mode: 'insensitive' } : undefined,
    },
  })
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          slug={product.slug}
          name={product.name}
          priceCents={product.priceCents}
          currency={product.currency}
          category={product.category as any}
          image={product.images[0] || undefined}
        />
      ))}
    </div>
  )
}

export default function ShopPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return (
    <section className="section space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Shop</p>
          <h1 className="text-3xl font-semibold">Tees + Beats</h1>
        </div>
        <form className="flex gap-2 text-sm">
          <select name="category" defaultValue={searchParams.category || 'ALL'} className="bg-black/40 border border-white/10 rounded-lg px-3 py-2">
            <option value="ALL">All</option>
            <option value="TSHIRT">T-shirts</option>
            <option value="BEAT">Beats</option>
          </select>
          <input
            name="search"
            placeholder="search"
            defaultValue={typeof searchParams.search === 'string' ? searchParams.search : ''}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
          />
          <button className="btn-primary" type="submit">
            Filter
          </button>
        </form>
      </div>
      <Suspense>
        <Products searchParams={searchParams} />
      </Suspense>
    </section>
  )
}
