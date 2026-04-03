'use client'

export default function HeaderClient({ children }) {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4 lg:px-6">
      <div className="mx-auto container rounded-2xl bg-white shadow-sm">
      {children}
      </div>
    </header>
  )
}
