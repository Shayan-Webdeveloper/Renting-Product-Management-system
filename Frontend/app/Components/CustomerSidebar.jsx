'use client'

import { usePathname } from 'next/navigation'

const links = [
  { href: '/customer', label: 'Overview' },
  { href: '/customer/products', label: 'Browse' },
  { href: '/customer/bookings', label: 'My Bookings' },
  { href: '/customer/settings', label: 'Settings' },
]

export default function CustomerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/90 p-4 text-slate-200 min-h-[calc(100vh-65px)]">
      <div className="mb-6 px-3 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Customer</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href

          return (
            <a
              key={link.href}
              href={link.href}
              className={`block rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'border-slate-600 bg-slate-800 text-white'
                  : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}