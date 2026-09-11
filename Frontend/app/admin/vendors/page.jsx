import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminVendorsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: vendors } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, created_at')
    .eq('role', 'vendor')
    .order('created_at', { ascending: false })

  const { data: products } = await supabase
    .from('products')
    .select('vendor_id')

  const productCountByVendor = {}
  for (const product of products ?? []) {
    const vendorId = product.vendor_id
    productCountByVendor[vendorId] = (productCountByVendor[vendorId] ?? 0) + 1
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Vendors</h1>
      <p className="text-slate-500 text-sm mb-8">Every vendor on the platform.</p>

      {vendors && vendors.length > 0 ? (
        <div className="space-y-3">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white border border-slate-200 rounded p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{vendor.full_name}</p>
                <p className="text-sm text-slate-500">{vendor.email}{vendor.phone ? ` · ${vendor.phone}` : ''}</p>
              </div>
              <p className="text-sm text-slate-500">{productCountByVendor[vendor.id] ?? 0} listings</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No vendors yet.</p>
      )}
    </div>
  )
}