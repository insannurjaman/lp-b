import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Base360PlatformMark from './Base360PlatformMark'
import MobileNavigation from './MobileNavigation'
import { navItems } from '../data/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-30 pt-4 px-4 sm:pt-5 sm:px-6 lg:pt-6">
        <div className="mx-auto max-w-[1240px]">
          <header
            className={`flex items-center justify-between rounded-[14px] border transition-all duration-300 ${
              scrolled
                ? 'border-line bg-surface/85 shadow-nav backdrop-blur-xl'
                : 'border-line/60 bg-surface/60 backdrop-blur-md'
            }`}
            style={{ minHeight: '60px' }}
          >
            {/* Left: logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2.5 pl-4 sm:pl-5"
              aria-label="Base360 home"
            >
              <Base360PlatformMark size={30} />
              <span className="font-heading text-[17px] font-semibold tracking-tight text-ink">Base360</span>
            </a>

            {/* Center: nav links (desktop) */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-ink-secondary transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: CTA + mobile menu */}
            <div className="flex items-center gap-2 pr-2 sm:pr-3">
              <a
                href="#contact"
                onClick={handleNavClick('#contact')}
                className="hidden lg:inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Request early access
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 lg:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </header>
        </div>
      </div>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
