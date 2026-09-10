     import { createClient } from '@/lib/supabase/server'

     export default async function BrowseProductsPage() {
     const supabase = await createClient()

     const { data: { user } } = await supabase.auth.getUser()
     
     const { data: bookings } = await supabase
     .from('bookings')
     .select('id, customer_id, status, total_price, security_deposit')
     .eq('customer_id', user.id)

     return (
     <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="mb-1">Bookings</h1>
          <p className=" mb-8">Rent cameras, tools, and generators by the day.</p>


          {bookings && bookings.length > 0 ? (
          <div className="grid gap-4">
               {bookings.map((booking) => {
               return (
               <a
                    key={booking.id}
                    href={`/customer/bookings/${booking.id}`}
                    className="border overflow-hidden"
               >
                    <div className="p-4">
                    <p className="font-medium text-slate-900">Booking Id --- {booking.id}</p>
                    <p className="text-sm text-slate-500">Rs. {booking.total_price}/day</p>
                    </div>
               </a>
               )
               })}
          </div>
          ) : (
          <p className="text-slate-500 text-sm">No equipment listed yet. {bookings}</p>
          )}
     </div>
     )
     }