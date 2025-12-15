const buckets = new Map<string, { count: number; reset: number }>()

export function rateLimit(identifier: string, limit = 30, windowMs = 60_000) {
  const now = Date.now()
  const bucket = buckets.get(identifier)
  if (!bucket || bucket.reset < now) {
    buckets.set(identifier, { count: 1, reset: now + windowMs })
    return { success: true }
  }
  if (bucket.count >= limit) {
    return { success: false, retryAfter: bucket.reset - now }
  }
  bucket.count += 1
  return { success: true }
}
