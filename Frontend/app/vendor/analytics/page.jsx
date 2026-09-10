// app/vendor/analytics/page.jsx
import { createClient } from '@/lib/supabase/server'

export default async function VendorAnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: vendorProducts } = await supabase
    .from('products')
    .select('id, title')
    .eq('vendor_id', user.id)

  const productIds = vendorProducts?.map((p) => p.id) ?? []

  const { data: items } = await supabase
    .from('booking_items')
    .select('product_id, subtotal, quantity')
    .in('product_id', productIds.length > 0 ? productIds : ['00000000-0000-0000-0000-000000000000'])

  const totalRevenue = (items ?? []).reduce((sum, item) => sum + Number(item.subtotal), 0)
  const totalBookings = items?.length ?? 0

  const revenueByProduct = {}
  for (const item of items ?? []) {
    revenueByProduct[item.product_id] = (revenueByProduct[item.product_id] ?? 0) + Number(item.subtotal)
  }

  const topProducts = (vendorProducts ?? [])
    .map((p) => ({ ...p, revenue: revenueByProduct[p.id] ?? 0 }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  return (
    <div className="p-8">
      <h1 className="text-4xl">Analytics</h1>
      <p>Revenue and performance across your listings.</p>

      <div>
        <div className="bg-white border border-slate-200 rounded p-2 mt-3">
          <p className="text-sm text-slate-500 mb-1">Total revenue</p>
          <p className="text-3xl">Rs. {totalRevenue}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded p-2 mb-3 mt-3">
          <p className="mb-1">Total bookings</p>
          <p className="text-3xl">{totalBookings}</p>
        </div>
      </div>

      <h2 className="text-sm font-medium text-slate-700 mb-3">Top products by revenue</h2>
      {topProducts.length > 0 ? (
        <div>
          {topProducts.map((p) => (
            <div key={p.id} className="bg-white border p-1 flex items-center justify-between">
              <p className="text-slate-900">{p.title}</p>
              <p className="font-medium text-slate-900">Rs. {p.revenue}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No revenue yet.</p>
      )}
    </div>
  )
}