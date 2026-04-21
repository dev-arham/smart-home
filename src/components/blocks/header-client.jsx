'use client'

import { useEffect, useState } from 'react'

export default function HeaderClient({ children }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4 lg:px-6 transition-all duration-500',
        scrolled ? 'top-2 sm:top-3' : 'top-3 sm:top-4',
      ].join(' ')}
    >
      <div
        className={[
          'mx-auto container rounded-[1.25rem] border transition-[background,border-color,box-shadow,transform] duration-500 backdrop-blur-2xl will-change-transform bg-blend-luminosity',
          scrolled
            ? 'bg-background/85 border-border/80 shadow-2xl scale-[0.99] translate-y-2'
            : 'bg-card/45 border-border/40 shadow-sm translate-y-0',
        ].join(' ')}
      >
        {children}
      </div>
    </header>
  )
}
