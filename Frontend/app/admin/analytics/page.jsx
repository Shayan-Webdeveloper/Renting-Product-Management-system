import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { count: totalVendors } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'vendor')

  const { count: totalCustomers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')

  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })

  const { data: items } = await supabase
    .from('booking_items')
    .select('subtotal, products(vendor:profiles!vendor_id(full_name))')

  const totalRevenue = items.reduce((sum, item) => sum + Number(item.subtotal), 0)

  const revenueByVendor = {}
  for (const item of items) {
    const vendorName = item.products.vendor.full_name
    revenueByVendor[vendorName] = (revenueByVendor[vendorName] ?? 0) + Number(item.subtotal)
  }

  const topVendors = Object.entries(revenueByVendor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="p-8">
      <h1>Analytics</h1>
      <p>Platform-wide performance.</p>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border">
          <p>Total revenue</p>
          <p>Rs. {totalRevenue}</p>
        </div>
        <div className="bg-white border">
          <p>Total bookings</p>
          <p>{totalBookings ?? 0}</p>
        </div>
        <div className="bg-white border">
          <p>Total vendors</p>
          <p>{totalVendors ?? 0}</p>
        </div>
        <div className="bg-white border">
          <p>Total customers</p>
          <p>{totalCustomers ?? 0}</p>
        </div>
      </div>

      <h2>Top vendors by revenue</h2>
      {topVendors.length > 0 ? (
        <div className="space-y-2">
          {topVendors.map(([name, revenue]) => (
            <div key={name} className="bg-white border flex items-center justify-between">
              <p className="text-slate-900">{name}</p>
              <p className="font-medium text-slate-900">Rs. {revenue}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No revenue yet.</p>
      )}
    </div>
  )
}