'use client'

export default function HeaderClient({ children }) {
  return (
    <header className="container left-1/2 -translate-x-1/2 fixed shadow-sm top-8 z-50 rounded-2xl bg-white">
      {children}
    </header>
  )
}
