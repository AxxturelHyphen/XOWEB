export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60 mt-12">
      <div className="container mx-auto px-6 py-8 text-sm text-white/70 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">XO76 / xosieteseis</p>
          <p>Streetwear + beats forged in the dark.</p>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com" className="hover:text-white">Instagram</a>
          <a href="mailto:hello@xo76.com" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  )
}
