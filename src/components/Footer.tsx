import Container from './Container'

const productLinks = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#journey' },
  { label: 'Channels', href: '#channels' },
  { label: 'Why Base360', href: '#timeline' },
]

const companyLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-950 py-16">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="#"
              className="font-heading text-lg font-bold tracking-tight text-dark-mode-text"
            >
              BASE360
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-dark-mode-secondary/60">
              The AI operating system for B2C brands. Every conversation. Every
              channel. Every lead. One system.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-dark-mode-secondary/50">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.querySelector(link.href)
                      if (target) target.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-dark-mode-secondary/70 transition-colors hover:text-dark-mode-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-dark-mode-secondary/50">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-dark-mode-secondary/70 transition-colors hover:text-dark-mode-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6">
          <p className="text-xs text-dark-mode-secondary/40">
            &copy; {new Date().getFullYear()} Base360. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
