import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/app/Components/ProductForm'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name')

  return (
    <div>
      <h1>List new equipment</h1>
      <p>Add a product for customers to rent.</p>

      <ProductForm categories={categories || []} />
    </div>
  )
}
