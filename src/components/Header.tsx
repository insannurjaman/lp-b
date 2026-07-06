import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from './Container'

const links = [
  { label: 'Product', href: '#capabilities' },
  { label: 'How it works', href: '#actions' },
  { label: 'Platform', href: '#workspace' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [darkBg, setDarkBg] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const darkSections = document.querySelectorAll('#actions, #capabilities')
      let overDark = false
      darkSections.forEach((s) => {
        const rect = s.getBoundingClientRect()
        if (rect.top < 80 && rect.bottom > 0) overDark = true
      })
      setDarkBg(overDark && y > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkBg
          ? 'bg-base-950/90 backdrop-blur-md'
          : scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-sm shadow-black/5'
            : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-14 items-center justify-between md:h-15" aria-label="Main navigation">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className={`font-heading text-sm font-semibold tracking-tight transition-colors ${
              darkBg ? 'text-dark-mode-text' : 'text-dark-text'
            }`}
          >
            BASE360
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className={`text-sm font-medium transition-colors ${
                    darkBg ? 'text-dark-mode-secondary hover:text-dark-mode-text' : 'text-muted hover:text-dark-text'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#closing"
                onClick={(e) => { e.preventDefault(); scrollTo('#closing') }}
                className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90"
              >
                Request early access
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center justify-center rounded-lg p-2 md:hidden cursor-pointer ${
              darkBg ? 'text-dark-mode-text' : 'text-dark-text'
            }`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="border-t border-border bg-cream md:hidden"
          >
            <Container className="py-6">
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-soft-violet/30 hover:text-dark-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 px-4">
                <a
                  href="#closing"
                  onClick={(e) => { e.preventDefault(); scrollTo('#closing') }}
                  className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
                >
                  Request early access
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
