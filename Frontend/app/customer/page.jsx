import { createClient } from '@/lib/supabase/server'
export default async function CustomerOverviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('customer_id', user.id)

  const { count: activeBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('customer_id', user.id)
    .in('status', ['pending', 'approved', 'active'])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Overview</h1>
      <p className="text-slate-500 text-sm mb-8">Your rental activity at a glance.</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded p-5">
          <p className="text-sm text-slate-500 mb-1">Total bookings</p>
          <p className="text-3xl font-semibold text-slate-900">{totalBookings ?? 0}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded p-5">
          <p className="text-sm text-slate-500 mb-1">Active bookings</p>
          <p className="text-3xl font-semibold text-slate-900">{activeBookings ?? 0}</p>
        </div>
      </div>
    </div>
  )
}