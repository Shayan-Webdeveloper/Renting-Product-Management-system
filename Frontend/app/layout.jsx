  // app/layout.jsx
  import "./globals.css";
  import { createClient } from '@/lib/supabase/server'
  import { signOut } from '@/app/actions/auth'
  import SiteHeader from '@/app/Components/SiteHeader'

  export default async function RootLayout({ children }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
      <html lang="en">
        <body className="min-h-screen bg-slate-950 text-slate-100">
          <SiteHeader user={user} signOutAction={signOut} />
          <main className="bg-slate-950">{children}</main>
        </body>
      </html>
    );
  }