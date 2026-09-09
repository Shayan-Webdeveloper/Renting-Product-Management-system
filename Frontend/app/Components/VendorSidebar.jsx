'use client'

import { usePathname } from 'next/navigation'

const links = [
  { href: '/vendor', label: 'Overview' },
  { href: '/vendor/products', label: 'Products' },
  { href: '/vendor/bookings', label: 'Bookings' },
  { href: '/vendor/analytics', label: 'Analytics' },
  { href: '/vendor/settings', label: 'Settings' },
]

export default function VendorSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0 border-r border-slate-200 min-h-[calc(100vh-65px)] p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 mb-2">
        Vendor
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}