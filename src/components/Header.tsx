import { useState, useEffect, useRef } from 'react'
import { Menu } from 'lucide-react'
import Base360PlatformMark from './Base360PlatformMark'
import MobileNavigation from './MobileNavigation'
import { navItems } from '../data/content'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [overDark, setOverDark] = useState(false)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      setScrolled(currentScroll > 12)

      // Hide on scroll down, reveal on scroll up (only after hero)
      if (currentScroll > 200 && !menuOpen) {
        if (currentScroll > lastScrollRef.current + 8) {
          setHidden(true)
        } else if (currentScroll < lastScrollRef.current - 8) {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }
      lastScrollRef.current = currentScroll

      // Dark chapter detection
      const darkSection = document.getElementById('orchestration')
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect()
        setOverDark(rect.top < 80 && rect.bottom > 80)
      }

      // Active section tracking
      const sections = ['hero', 'how-it-works', 'platform', 'capabilities', 'orchestration', 'customer-history', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-30 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ paddingTop: '16px' }}
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <header
            className={`flex items-center justify-between rounded-[14px] border transition-all duration-300 ${
              overDark
                ? 'border-white/10 bg-chapter/90 text-chapter-text shadow-nav backdrop-blur-xl'
                : scrolled
                ? 'border-line bg-surface/90 shadow-nav backdrop-blur-xl'
                : 'border-line/60 bg-surface/60 backdrop-blur-md'
            }`}
            style={{ minHeight: '60px' }}
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2.5 pl-4 sm:pl-5"
              aria-label="Base360 home"
            >
              <Base360PlatformMark size={28} />
              <span className={`font-heading text-[16px] font-semibold tracking-tight transition-colors ${overDark ? 'text-chapter-text' : 'text-ink'}`}>Base360</span>
            </a>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                    className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : overDark
                        ? 'text-chapter-secondary hover:text-chapter-text'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-2 pr-2 sm:pr-3">
              <a
                href="#contact"
                onClick={handleNavClick('#contact')}
                className="hidden lg:inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-[14px] font-medium text-white shadow-card transition-colors hover:bg-primary-hover"
              >
                Request early access
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden ${overDark ? 'text-chapter-text hover:bg-white/10' : 'text-ink hover:bg-surface-2'}`}
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
