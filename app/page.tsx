import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { prisma } from '@/lib/db'

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { active: true },
    take: 4,
  })
  return (
    <div>
      <section className="section grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <p className="uppercase tracking-[0.3em] text-white/60">xosieteseis</p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            XO76 — tees + beats built for night runners.
          </h1>
          <p className="text-white/70">Dark, minimal, Chile-inspired palette. Drop in, pick a fit, vibe with a beat.</p>
          <div className="flex gap-3">
            <Link href="/shop" className="btn-primary">
              Shop the drop
            </Link>
            <Link href="/account" className="btn-secondary">
              Account
            </Link>
          </div>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/10">
          <Image src="/hero-placeholder.jpg" alt="XO76 hero" fill className="object-cover" />
        </div>
      </section>
      <section className="section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <Link href="/shop" className="text-[var(--accent-blue)] hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
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
      </section>
    </div>
  )
}
