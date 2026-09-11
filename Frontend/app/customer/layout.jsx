import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CustomerSidebar from '@/app/Components/CustomerSidebar'

export default async function CustomerLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex">
      <CustomerSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}