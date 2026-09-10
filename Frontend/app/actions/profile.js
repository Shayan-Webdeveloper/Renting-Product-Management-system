'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function switchRole(newRole) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in.' }
  }

  if (newRole !== 'customer' && newRole !== 'vendor') {
    return { error: 'Invalid role.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', user.id)

  if (error) {
    return { error: error.message } 
  }

  revalidatePath('/profile')
  return { success: true }
}