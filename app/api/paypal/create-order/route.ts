import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { computeCartTotal } from '@/lib/pricing'
import { rateLimit } from '@/lib/rate-limit'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const ip = req.headers.get('x-forwarded-for') || 'ip'
  if (!rateLimit(`paypal:${ip}`, 20).success) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  const cartId = cookies().get('xo76_cart')?.value
  if (!cartId) return NextResponse.json({ error: 'No cart' }, { status: 400 })
  const cart = await prisma.cart.findUnique({ where: { id: cartId, userId: session.user.id }, include: { items: { include: { product: true } } } })
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: 'Empty cart' }, { status: 400 })
  const total = computeCartTotal(cart.items)
  const currency = cart.items[0]?.product.currency || 'USD'
  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId: session.user!.id,
        status: 'CREATED',
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
            provider: 'PAYPAL',
            status: 'CREATED',
            providerOrderId: `sandbox-${Date.now()}`,
          },
        },
      },
      include: { payments: true },
    })
    return created
  })
  return NextResponse.json({ orderId: order.id, providerOrderId: order.payments[0]?.providerOrderId })
}
