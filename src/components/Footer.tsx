import Container from './Container'
import Base360PlatformMark from './Base360PlatformMark'
import { footerLinkGroups } from '../data/content'

export default function Footer() {
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href === '#') return
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-footer text-footer-text">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Left: brand + statement */}
          <div>
            <a href="#" onClick={scrollTop} className="flex items-center gap-2.5" aria-label="Base360 home">
              <Base360PlatformMark size={30} />
              <span className="font-heading text-[18px] font-semibold tracking-tight text-footer-text">Base360</span>
            </a>
            <p className="mt-4 max-w-[320px] text-[15px] leading-relaxed text-footer-secondary">
              One system for every customer conversation.
            </p>
          </div>

          {/* Right: link groups + platform illustration */}
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            {/* Link groups */}
            <div className="grid grid-cols-3 gap-8">
              {footerLinkGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-footer-secondary">{group.title}</p>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={handleNavClick(link.href)}
                          className="text-[14px] text-footer-secondary transition-colors hover:text-footer-text"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Platform illustration */}
            <div className="hidden lg:block">
              <FooterPlatformIllustration />
            </div>
          </div>
        </div>

        {/* Mobile platform illustration */}
        <div className="lg:hidden">
          <FooterPlatformIllustration />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-footer-secondary">&copy; {new Date().getFullYear()} Base360. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" onClick={handleNavClick('#')} className="text-[12px] text-footer-secondary transition-colors hover:text-footer-text">Privacy</a>
            <a href="#" onClick={handleNavClick('#')} className="text-[12px] text-footer-secondary transition-colors hover:text-footer-text">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterPlatformIllustration() {
  return (
    <div className="relative h-32 w-48">
      <svg viewBox="0 0 192 128" fill="none" className="h-full w-full" aria-hidden="true">
        {/* Subtle grid */}
        <defs>
          <pattern id="footer-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="192" height="128" fill="url(#footer-grid)" />

        {/* Stacked surfaces */}
        <rect x="32" y="72" width="128" height="40" rx="8" fill="#111117" stroke="rgba(255,255,255,0.06)" />
        <rect x="44" y="56" width="104" height="32" rx="6" fill="#16161E" stroke="rgba(255,255,255,0.08)" />
        <rect x="56" y="40" width="80" height="24" rx="5" fill="#1C1C26" stroke="rgba(255,255,255,0.10)" />

        {/* Violet signal line */}
        <path d="M 16 96 Q 48 96 48 64 L 48 52 Q 48 40 96 40 Q 144 40 144 52 L 144 64 Q 144 96 176 96" stroke="#6657FF" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />

        {/* Signal dots */}
        <circle cx="16" cy="96" r="3" fill="#6657FF" />
        <circle cx="96" cy="40" r="3" fill="#6657FF" />
        <circle cx="176" cy="96" r="3" fill="#6657FF" />

        {/* Core mark */}
        <circle cx="96" cy="40" r="6" fill="#6657FF" fillOpacity="0.15" />
        <circle cx="96" cy="40" r="3" fill="#6657FF" />
      </svg>
    </div>
  )
}
