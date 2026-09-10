import { createClient } from '@/lib/supabase/server'

export default async function BrowseProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('id, title, daily_rate, product_images(url, sort_order)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="mb-1">Browse equipment</h1>
      <p className=" mb-8">Rent cameras, tools, and generators by the day.</p>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => {
            const cover = product.product_images?.length
              ? [...product.product_images].sort((a, b) => a.sort_order - b.sort_order)[0].url
              : null

            return (
              <a
                key={product.id}
                href={`/customer/products/${product.id}`}
                className="border overflow-hidden"
              >
                {cover ? (
                  <img src={cover} alt={product.title} className="h-40 w-full object-cover" />
                ) : (
                  <div className="h-40 w-full bg-slate-100" />
                )}
                <div className="p-4">
                  <p className="font-medium text-slate-900">{product.title}</p>
                  <p className="text-sm text-slate-500">Rs. {product.daily_rate}/day</p>
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No equipment listed yet.</p>
      )}
    </div>
  )
}