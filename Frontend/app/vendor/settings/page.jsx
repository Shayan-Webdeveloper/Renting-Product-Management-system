import { createClient } from '@/lib/supabase/server'
import RoleSwitcher from '@/app/Components/RoleSwitcher'

export default async function VendorSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, phone, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-1">Settings</h1>
      <p className="mb-8">Manage your account.</p>

      <div className=" border p-5 mb-4">
        <h2 className="text-sm font-medium text-slate-700 mb-3">Account details</h2>
        <p className="text-slate-900">{profile.full_name}</p>
        <p className="text-sm text-slate-500">{profile.email}</p>
        {profile.phone && <p className="text-sm text-slate-500">{profile.phone}</p>}
      </div>

      <div className="bg-white border border-slate-200 rounded p-5">
        <h2 className="text-sm font-medium text-slate-700 mb-3">Account type</h2>
        <RoleSwitcher currentRole={profile.role} />
      </div>
    </div>
  )
}