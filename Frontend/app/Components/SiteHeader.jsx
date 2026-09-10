'use client'

import { usePathname } from 'next/navigation'

export default function SiteHeader({ user, signOutAction }) {
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/signup') {
    return null
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-white">

      {user ? (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">{user.email}</span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="border cursor-pointer py-1.5"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-4 text-sm">
          <a href="/login" className="text-slate-500 hover:text-slate-900">Log in</a>
          <a
            href="/signup"
          >
            Sign up
          </a>
        </div>
      )}
    </header>
  )
}