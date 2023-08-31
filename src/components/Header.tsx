import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-primary flex items-center justify-end text-smoke font-semibold px-9 py-4 gap-11">
      <Link href="/" className="hover:text-white transition-colors">
        Clima
      </Link>
      <Link href="/search" className="hover:text-white transition-colors">
        CEP
      </Link>
      <Link href="/contact" className="hover:text-white transition-colors">
        Contato
      </Link>
    </header>
  )
}
