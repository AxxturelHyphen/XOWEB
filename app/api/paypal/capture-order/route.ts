import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({ orderId: z.string() })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const ip = req.headers.get('x-forwarded-for') || 'ip'
  if (!rateLimit(`paypal-capture:${ip}`, 20).success) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const order = await prisma.order.findUnique({ where: { id: parsed.data.orderId, userId: session.user.id }, include: { payments: true } })
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const payment = order.payments[0]
  await prisma.$transaction([
    prisma.payment.update({ where: { id: payment.id }, data: { status: 'CAPTURED', providerCaptureId: payment.providerOrderId } }),
    prisma.order.update({ where: { id: order.id }, data: { status: 'PAID' } }),
  ])
  return NextResponse.json({ status: 'captured' })
}
