import { describe, expect, it } from 'vitest'
import { buildOrderPayload } from '../lib/order'

describe('order builder', () => {
  it('maps cart to order payload', () => {
    const payload = buildOrderPayload([
      { productId: 'p1', quantity: 2, unitPriceCentsSnapshot: 1200 },
      { productId: 'p2', quantity: 1, unitPriceCentsSnapshot: 800 },
    ])
    expect(payload.totalCents).toBe(3200)
    expect(payload.items).toHaveLength(2)
    expect(payload.items[0].productId).toBe('p1')
  })
})
