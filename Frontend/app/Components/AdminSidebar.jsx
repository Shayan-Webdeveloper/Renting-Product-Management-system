'use client'
const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/vendors', label: 'Vendors' },
  { href: '/admin/customers', label: 'Customers' },
]

export default function AdminSidebar() {

  return (
    <aside className="w-56 flex-shrink-0 border min-h-[calc(100vh-66px)] p-4">
      <p>
        Admin
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