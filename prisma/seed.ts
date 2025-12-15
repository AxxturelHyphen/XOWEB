import { prisma } from '../lib/db'

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@xo76.test'
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: 'XO76 Admin', role: 'ADMIN' },
  })
  const products = [
    {
      slug: 'night-vision-tee',
      name: 'Night Vision Tee',
      description: 'Black heavyweight tee with subtle blue + red stitch.',
      category: 'TSHIRT',
      priceCents: 3200,
      currency: 'USD',
      images: ['/tshirt1.jpg'],
      inventory: 50,
    },
    {
      slug: 'signal-tee',
      name: 'Signal Tee',
      description: 'Clean white tee with XO76 crest.',
      category: 'TSHIRT',
      priceCents: 3000,
      currency: 'USD',
      images: ['/tshirt2.jpg'],
      inventory: 40,
    },
    {
      slug: 'metroline',
      name: 'Metroline Beat',
      description: 'Driving 90bpm beat with moody synths.',
      category: 'BEAT',
      priceCents: 1500,
      currency: 'USD',
      images: ['/beat1.jpg'],
      digitalFileUrl: 'https://example.com/metroline',
    },
    {
      slug: 'azul-noche',
      name: 'Azul Noche Beat',
      description: 'Blue-hour vibes in drum form.',
      category: 'BEAT',
      priceCents: 1800,
      currency: 'USD',
      images: ['/beat2.jpg'],
      digitalFileUrl: 'https://example.com/azul',
    },
  ] as const

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log({ admin, seeded: products.length })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
