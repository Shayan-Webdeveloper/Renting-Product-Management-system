'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const bookingItemSchema = z.object({
  product_id: z.uuid(),
  quantity: z.number().int().positive(),
  start_date: z.string(),
  end_date: z.string(),
})

const createBookingSchema = z.array(bookingItemSchema).min(1)

export async function createBooking(items) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to book.' }
  }

  const parsed = createBookingSchema.safeParse(items)
  if (!parsed.success) {
    return { error: 'Invalid booking data.' }
  }

  const { data, error } = await supabase.rpc('create_booking', {
    p_customer_id: user.id,
    p_items: parsed.data,
  })

  if (error) {
     return {error: error.message}
  }
  else {return {bookingId: data}}
}