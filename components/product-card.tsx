import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/lib/pricing'

export type ProductCardProps = {
  slug: string
  name: string
  priceCents: number
  currency: string
  category: 'TSHIRT' | 'BEAT'
  image?: string
}

export function ProductCard({ slug, name, priceCents, currency, category, image }: ProductCardProps) {
  return (
    <Link
      href={`/p/${slug}`}
      className="card flex flex-col overflow-hidden hover:-translate-y-1 transition transform"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || '/placeholder-product.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">{category}</p>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <p className="text-[var(--accent-red)] font-semibold">{formatCurrency(priceCents, currency)}</p>
      </div>
    </Link>
  )
}
