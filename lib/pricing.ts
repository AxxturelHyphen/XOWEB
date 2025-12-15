export function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}

export function computeCartTotal(items: { quantity: number; unitPriceCentsSnapshot: number }[]) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPriceCentsSnapshot, 0)
}
