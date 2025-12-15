import { computeCartTotal } from './pricing'

export type CartSnapshot = {
  productId: string
  quantity: number
  unitPriceCentsSnapshot: number
}

export function buildOrderPayload(items: CartSnapshot[], currency = 'USD') {
  const total = computeCartTotal(items)
  return {
    totalCents: total,
    currency,
    items: items.map((item) => ({ ...item })),
  }
}
