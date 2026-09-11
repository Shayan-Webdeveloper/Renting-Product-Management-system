import { createClient } from '@/lib/supabase/server'

export default async function VendorOverviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()


  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: totalVendors } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'vendor')
    
  const { count: totalCustomers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer')


  const { count: totalBookings } = await supabase
    .from('booking_items')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-1">Overview</h1>
      <p className="mb-8">A quick look at your business.</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border p-3">
          <p className="mb-1 text-slate-900">Total Products</p>
          <p className='text-slate-900'>{totalProducts}</p>
        </div>
        <div className="bg-white border p-3">
          <p className="mb-1 text-slate-900">Total Bookings</p>
          <p className='text-slate-900'>{totalBookings}</p>
        </div>
        <div className="bg-white border p-3">
          <p className="mb-1 text-slate-900">Total Vendors</p>
          <p className='text-slate-900'>{totalVendors}</p>
        </div>
        <div className="bg-white border p-3">
          <p className="mb-1 text-slate-900">Total Customers</p>
          <p className='text-slate-900'>{totalCustomers}</p>
        </div>
      </div>
    </div>
  )
}