import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function VendorProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: products } = await supabase
    .from('products')
    .select('id, title, daily_rate, status, created_at, product_images(url, sort_order)')
    .eq('vendor_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div>
        <h1>Your listings</h1>
        <a
          href="/vendor/products/new"
          
        >
          + New listing
        </a>
      </div>

      {products && products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
            >
              {product.product_images?.[0] ? (
                <img
                  src={product.product_images.sort((a, b) => a.sort_order - b.sort_order)[0].url}
                  alt={product.title}
                  className="w-24 h-24 object-cover"
                />
              ) : (
                <div/>
              )}
              <div>
                <p >{product.title}</p>
                <p >Rs. {product.daily_rate}/day · {product.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p >No listings yet. Create your first one above.</p>
      )}
    </div>
  )
}