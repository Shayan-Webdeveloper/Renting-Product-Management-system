import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function BookingDetailPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('id, status, total_price, security_deposit, created_at')
    .eq('id', id)
    .single()

  console.log('Booking id from URL:', id)
  console.log('Booking fetch error:', bookingError)
  console.log('Booking data:', booking)

  if (!booking) {
     return (
<div>
     404! Page not found
</div>
     )
  }

  const { data: items } = await supabase
    .from('booking_items')
    .select('id, quantity, start_date, end_date, subtotal, products(title)')
    .eq('booking_id', id)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Booking details</h1>
        <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-700 capitalize">
          {booking.status}
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded p-5 mb-4">
        <h2 className="text-sm font-medium text-slate-700 mb-3">Items</h2>
        <div className="space-y-3">
          {(items ?? []).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="text-slate-900">{item.products?.title ?? 'Unknown product'}</p>
                <p className="text-slate-500">
                  {item.start_date} → {item.end_date} · Qty {item.quantity}
                </p>
              </div>
              <p className="font-medium text-slate-900">Rs. {item.subtotal}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded p-5">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-500">Total</span>
          <span className="font-medium text-slate-900">Rs. {booking.total_price}</span>
        </div>
        {booking.security_deposit > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Security deposit</span>
            <span className="text-slate-900">Rs. {booking.security_deposit}</span>
          </div>
        )}
      </div>
    </div>
  )
}