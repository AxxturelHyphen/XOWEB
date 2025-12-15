import { describe, expect, it } from 'vitest'
import { computeCartTotal, formatCurrency } from '../lib/pricing'

describe('pricing helpers', () => {
  it('computes totals', () => {
    const total = computeCartTotal([
      { quantity: 2, unitPriceCentsSnapshot: 1000 },
      { quantity: 1, unitPriceCentsSnapshot: 500 },
    ])
    expect(total).toBe(2500)
  })

  it('formats currency', () => {
    expect(formatCurrency(1500, 'USD')).toContain('$15')
  })
})
