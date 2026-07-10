import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const contactSection = document.getElementById('contact')
      const contactTop = contactSection ? contactSection.getBoundingClientRect().top + window.scrollY : Infinity
      const contactBottom = contactSection ? contactTop + contactSection.offsetHeight : Infinity

      // Show after scrolling past 600px (past hero)
      // Hide when contact section is in view
      setVisible(scrollY > 600 && !(scrollY >= contactTop - 200 && scrollY < contactBottom))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('contact')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border-t border-line bg-surface/95 px-4 py-3 shadow-lifted backdrop-blur-lg">
            <a
              href="#contact"
              onClick={handleClick}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[15px] font-medium text-white shadow-card transition-colors hover:bg-primary-hover"
            >
              Request early access
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
