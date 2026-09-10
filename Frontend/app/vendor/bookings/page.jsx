// app/vendor/bookings/page.jsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function VendorBookingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: vendorProducts, error: vendorProductsError } = await supabase
    .from('products')
    .select('id')
    .eq('vendor_id', user.id)

  if (vendorProductsError) {
    throw new Error(vendorProductsError.message)
  }

  const vendorProductIds = vendorProducts?.map((product) => product.id) ?? []

  const { data: items, error: itemsError } = await supabase
    .from('booking_items')
    .select(`
      id,
      quantity,
      start_date,
      end_date,
      subtotal,
      booking_id,
      product_id,
      products (title, vendor_id)
    `)
    .in('product_id', vendorProductIds.length > 0 ? vendorProductIds : ['00000000-0000-0000-0000-000000000000'])
    .order('start_date', { ascending: false })

  if (itemsError) {
    throw new Error(itemsError.message)
  }

  const bookingIds = [...new Set((items ?? []).map((item) => item.booking_id).filter(Boolean))]
  const bookingStatusMap = {}

  if (bookingIds.length > 0) {
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('id, status')
      .in('id', bookingIds)

    if (bookingsError) {
      throw new Error(bookingsError.message)
    }

    for (const booking of bookings ?? []) {
      bookingStatusMap[booking.id] = booking.status
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Bookings</h1>

      {items && items.length > 0 ? (
        <div>
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{item.products?.title ?? 'Unknown product'}</p>
                <p className="text-sm text-slate-500">
                  {item.start_date} → {item.end_date} · Qty {item.quantity} · Rs. {item.subtotal}
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-700 capitalize">
                {bookingStatusMap[item.booking_id] ?? 'pending'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No bookings yet.</p>
      )}
    </div>
  )
}