import { notFound } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { AddToCartButton } from '@/components/server-actions'
import { formatCurrency } from '@/lib/pricing'

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } })
  if (!product) return notFound()
  const isBeat = product.category === 'BEAT'
  return (
    <section className="section grid gap-8 lg:grid-cols-2">
      <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/10">
        <Image src={product.images[0] || '/placeholder-product.jpg'} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">{product.category}</p>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-lg text-white/70">{product.description}</p>
        <p className="text-2xl font-semibold text-[var(--accent-red)]">{formatCurrency(product.priceCents, product.currency)}</p>
        <AddToCartButton productId={product.id} />
        {isBeat && (
          <audio controls className="w-full">
            <source src="/beat-placeholder.mp3" />
          </audio>
        )}
      </div>
    </section>
  )
}
