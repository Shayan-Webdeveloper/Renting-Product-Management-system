import { createClient } from '@/lib/supabase/server'

export default async function VendorOverviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', user.id)

  const { count: activeProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', user.id)
    .eq('status', 'active')

  const { data: vendorProducts } = await supabase
    .from('products')
    .select('id')
    .eq('vendor_id', user.id)

  const vendorProductIds = vendorProducts?.map((product) => product.id) ?? []

  const { count: totalBookings } = await supabase
    .from('booking_items')
    .select('*', { count: 'exact', head: true })
    .in('product_id', vendorProductIds.length > 0 ? vendorProductIds : ['00000000-0000-0000-0000-000000000000'])

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-1">Overview</h1>
      <p className="mb-8">A quick look at your business.</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border p-3">
          <p className="mb-1">Total listings</p>
          <p>{totalProducts ?? 0}</p>
        </div>
        <div className="bg-white border p-3">
          <p className="mb-1">Active listings</p>
          <p>{activeProducts ?? 0}</p>
        </div>
        <div className="bg-white border p-3">
          <p className="mb-1">Total bookings</p>
          <p>{totalBookings ?? 0}</p>
        </div>
      </div>
    </div>
  )
}