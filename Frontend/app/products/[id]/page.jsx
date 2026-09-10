import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BookingForm from '@/app/components/BookingForm'

export default async function ProductDetailPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('id, title, description, daily_rate, security_deposit, product_images(url, sort_order)')
    .eq('id', id)
    .eq('status', 'active')
    .single()

  if (!product) {
    notFound()
  }

  const images = product.product_images?.length
    ? [...product.product_images].sort((a, b) => a.sort_order - b.sort_order)
    : []

  return (
    <div className='p-5'>
      <div>
        {images[0] ? (
          <img src={images[0].url} alt={product.title} className="w-150 h-100 object-cover rounded" />
        ) : (
          <div className="w-full h-72 bg-slate-100 rounded" />
        )}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {images.slice(1).map((img) => (
              <img key={img.url} src={img.url} alt="" className="h-16 w-16 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">{product.title}</h1>
        <p className="text-slate-500 mb-6">{product.description}</p>
        <p className="text-xl font-semibold text-slate-900 mb-6">Rs. {product.daily_rate}/day</p>

        <BookingForm
          productId={product.id}
          dailyRate={product.daily_rate}
          securityDeposit={product.security_deposit}
        />
      </div>
    </div>
  )
}