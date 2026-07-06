import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/navigation'
import Container from './Container'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-base-950/80 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between md:h-20"
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="font-heading text-lg font-bold tracking-tight text-dark-mode-text"
          >
            BASE360
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-dark-mode-secondary transition-colors hover:text-dark-mode-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector('#cta')
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-lg shadow-primary/20"
            >
              Request early access
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-dark-mode-text transition-colors hover:bg-white/5 md:hidden cursor-pointer"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/5 bg-base-950 md:hidden"
          >
            <Container className="py-6">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-dark-mode-secondary transition-colors hover:bg-white/5 hover:text-dark-mode-text"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 px-4">
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault()
                    setMenuOpen(false)
                    const target = document.querySelector('#cta')
                    if (target) target.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-primary/90 shadow-lg shadow-primary/20"
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
