'use client'
import { useHeaderScroll } from '@/hooks/use-header-scroll'

export default function HeaderClient({ children }) {
  const isVisible = useHeaderScroll()

  return (
    <header className={`w-full fixed shadow-sm top-0 left-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } bg-transparent dark:bg-background/40 backdrop-blur-sm`}>
      {children}
    </header>
  )
}
