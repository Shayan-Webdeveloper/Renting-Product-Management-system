import { createClient } from '@/lib/supabase/server'

export default async function VendorOverviewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()


  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

const { data: products } = await supabase.from('products').select('*')

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-1">Products</h1>
      <p className="mb-8">A quick look at your business.</p>

      <div className="gap-4">
        <div className="bg-white border p-3 text-center">
          <p className="mb-1 text-slate-900">Total Products</p>
          <p className='text-slate-900'>{totalProducts}</p>
        </div>
      </div>


      <div className='border mt-4'>
          <ol>
               {(products ?? []).map((product) => (
                 <li key={product.id} className='border p-3'>
                   <p className='font-medium'>{product.title}</p>
                   <p>Status: {product.status}</p>
                   <p>Daily rate: Rs. {product.daily_rate}</p>
                   <p>Security deposit: Rs. {product.security_deposit}</p>
                 </li>
               ))}
          </ol>
      </div>
    </div>
  )
}