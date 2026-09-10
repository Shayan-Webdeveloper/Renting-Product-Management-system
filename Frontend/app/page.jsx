// app/page.jsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BookNowButton from '@/app/Components/BookNowButton'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'vendor') {
    redirect('/vendor')
  }

  if (profile?.role === 'customer') {
    redirect('/customer')
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold text-black">Hello World</h1>
      <BookNowButton productId="2d6164e6-c778-4778-8098-deb5ebcc8920" dailyRate={500} />
    </main>
  )
}

