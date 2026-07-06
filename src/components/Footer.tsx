import Container from './Container'

const links = [
  { label: 'Product', href: '#capabilities' },
  { label: 'How it works', href: '#actions' },
  { label: 'Platform', href: '#workspace' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-base-950 py-20">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="font-heading text-base font-semibold tracking-tight text-dark-mode-text"
            >
              BASE360
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-dark-mode-secondary/50">
              The conversation engine for B2C brands.
            </p>
          </div>
          <div className="flex flex-wrap gap-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault()
                    const target = document.querySelector(link.href)
                    if (target) target.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-sm text-dark-mode-secondary/50 transition-colors hover:text-dark-mode-text"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-16 border-t border-border-dark pt-6">
          <p className="text-xs text-dark-mode-secondary/30">&copy; {new Date().getFullYear()} Base360. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
