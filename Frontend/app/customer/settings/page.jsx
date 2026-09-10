// app/customer/settings/page.jsx
import { createClient } from '@/lib/supabase/server'
import RoleSwitcher from '@/app/Components/RoleSwitcher'
import ProfileEditForm from '@/app/Components/ProfileEditForm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function CustomerSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, phone, role')
    .eq('id', user.id)
    .single()

  async function updateProfile(formData) {
    'use server'

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'You must be logged in.' }
    }

    const fullName = formData.get('full_name')
    const phone = formData.get('phone')

    if (!fullName || fullName.trim().length < 2) {
      return { error: 'Please enter a valid name.' }
    }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone: phone || null })
      .eq('id', user.id)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/customer/settings')
    return { success: true }
  }

  return (
    <div>
      <h1>Settings</h1>

      <div>
        <p>Email: {profile.email}</p>
        <p>Role: {profile.role}</p>
      </div>

      <ProfileEditForm fullName={profile.full_name} phone={profile.phone} updateAction={updateProfile} />

      <div>
        <h2>Account type</h2>
        <RoleSwitcher currentRole={profile.role} />
      </div>
    </div>
  )
}