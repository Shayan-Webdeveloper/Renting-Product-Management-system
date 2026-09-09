'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category_id: z.uuid(),
  daily_rate: z.coerce.number().positive(),
  security_deposit: z.coerce.number().min(0),
})

export async function createProduct(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in.' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'vendor') {
    return { error: 'Only vendors can list products.' }
  }

  const parsed = productSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category_id: formData.get('category_id'),
    daily_rate: formData.get('daily_rate'),
    security_deposit: formData.get('security_deposit'),
  })

  if (!parsed.success) {
    return { error: 'Please check the form fields.' }
  }

  const { data: product, error } = await supabase
    .from('products')
    .insert({ ...parsed.data, vendor_id: user.id })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  const photos = formData.getAll('photos').filter((f) => f.size > 0)

  for (let i = 0; i < photos.length; i++) {
    const file = photos[i]
    const filePath = `${user.id}/${product.id}-${i}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file)

    if (uploadError) continue

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath)

    await supabase
      .from('product_images')
      .insert({ product_id: product.id, url: publicUrl, sort_order: i })
  }

  revalidatePath('/vendor/products')
  return { success: true, productId: product.id }
}

export async function updateProduct(productId, formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in.' }
  }

  const parsed = productSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category_id: formData.get('category_id'),
    daily_rate: formData.get('daily_rate'),
    security_deposit: formData.get('security_deposit'),
  })

  if (!parsed.success) {
    return { error: 'Please check the form fields.' }
  }

  const { error } = await supabase
    .from('products')
    .update(parsed.data)
    .eq('id', productId)
    .eq('vendor_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/vendor/products')
  return { success: true }
}