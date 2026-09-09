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
        <body className="bg-slate-50 text-slate-900 min-h-screen">
          <SiteHeader user={user} signOutAction={signOut} />
          <main>{children}</main>
        </body>
      </html>
    );
  }