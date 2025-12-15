import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { computeCartTotal } from '@/lib/pricing'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const cartId = cookies().get('xo76_cart')?.value
  if (!cartId) return NextResponse.json({ error: 'No cart' }, { status: 400 })
  const cart = await prisma.cart.findUnique({ where: { id: cartId, userId: session.user.id }, include: { items: { include: { product: true } } } })
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: 'Empty cart' }, { status: 400 })
  const total = computeCartTotal(cart.items)
  const currency = cart.items[0]?.product.currency || 'USD'
  await prisma.order.create({
    data: {
      userId: session.user.id,
      status: 'PENDING_MANUAL',
      totalCents: total,
      currency,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPriceCentsSnapshot: item.unitPriceCentsSnapshot,
        })),
      },
      payments: {
        create: {
          provider: 'MANUAL',
          status: 'CREATED',
        },
      },
    },
  })
  return NextResponse.redirect(new URL(process.env.INSTAGRAM_CHECKOUT_URL || 'https://instagram.com/xo76', req.url))
}
