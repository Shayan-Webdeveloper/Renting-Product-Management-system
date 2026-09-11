import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminBookingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: myProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (myProfile?.role !== 'admin') {
    redirect('/')
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, status, total_price, created_at, customer:profiles!customer_id(full_name, email)')
    .order('created_at', { ascending: false })

  const { data: items } = await supabase
    .from('booking_items')
    .select('booking_id, products(title, vendor:profiles!vendor_id(full_name))')

  const vendorsByBooking = {}
  for (const item of items ?? []) {
    const vendorName = item.products?.vendor?.full_name
    if (!vendorsByBooking[item.booking_id]) {
      vendorsByBooking[item.booking_id] = new Set()
    }
    vendorsByBooking[item.booking_id].add(vendorName)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">All bookings</h1>
      <p className="text-slate-500 text-sm mb-8">Every booking across the platform.</p>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white border p-2">
            <div>
              <p>Rs. {booking.total_price}</p>
              <span>
                {booking.status}
              </span>
            </div>
            <p>
              Customer: {booking.customer.full_name} ({booking.customer.email})
            </p>
            <p>
              Vendor: {[...vendorsByBooking[  booking.id]]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}










// https://xhtv.live/videos/oral-creampie-compilation-2-cum-in-mouth-throbbing-cock-cum-dripping-blowjob-oral-cumshot-xh2wvMc