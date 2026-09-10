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
    <aside className="w-56 flex-shrink-0 border min-h-[calc(100vh-66px)] p-4">
      <p>
        Vendor
      </p>
      <nav>
        {links.map((link) => {
          return (
            <a key={link.href} href={link.href} className='block'>
              {link.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}