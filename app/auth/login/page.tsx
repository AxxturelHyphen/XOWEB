import Link from 'next/link'

export default function LoginPage() {
  return (
    <section className="section space-y-4">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <p className="text-white/70">Use Google to enter XO76.</p>
      <Link href="/api/auth/signin/google" className="btn-primary inline-flex">
        Continue with Google
      </Link>
    </section>
  )
}
