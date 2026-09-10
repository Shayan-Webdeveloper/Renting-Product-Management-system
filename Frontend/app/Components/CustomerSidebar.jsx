'use client'

const links = [
  { href: '/customer', label: 'Overview' },
  { href: '/customer/products', label: 'Browse' },
  { href: '/customer/bookings', label: 'My Bookings' },
  { href: '/customer/settings', label: 'Settings' },
]

export default function CustomerSidebar() {

  return (
    <aside className="w-56 flex-shrink-0 min-h-[calc(100vh-65px)] p-4">
      <p className=" px-3 mb-2">
        Customer
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          return (
            <a
              key={link.href}
              href={link.href}
              className='block'
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}