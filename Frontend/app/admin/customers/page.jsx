import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminCustomersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: customers } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, created_at')
    .eq('role', 'customer')
    .order('created_at', { ascending: false })

  const { data: bookings } = await supabase
    .from('bookings')
    .select('customer_id')

  const bookingCountByCustomer = {}
  for (const booking of bookings) {
    const customerId = booking.customer_id
    bookingCountByCustomer[customerId] = (bookingCountByCustomer[customerId]??0) + 1
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Customers</h1>
      <p className="text-slate-500 text-sm mb-8">Every customer on the platform.</p>

      {customers && customers.length > 0 ? (
        <div className="space-y-3">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white border flex items-center justify-between">
              <div>
                <p>{customer.full_name}</p>
                <p>{customer.email}{customer.phone ? ` · ${customer.phone}` : ''}</p>
              </div>
              <p>{bookingCountByCustomer[customer.id]} bookings</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No customers yet.</p>
      )}
    </div>
  )
}