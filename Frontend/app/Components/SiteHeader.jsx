'use client'

import { usePathname } from 'next/navigation'

export default function SiteHeader({ user, signOutAction }) {
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/signup') {
    return null
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="text-lg font-semibold tracking-wide text-white">
          RentalFlow
        </a>

        {user ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-300 sm:inline-block">
              {user.email}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white hover:text-slate-900"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <a href="/login" className="rounded-lg px-3 py-1.5 text-slate-300 transition hover:text-white">
              Log in
            </a>
            <a
              href="/signup"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-medium text-white transition hover:border-slate-500 hover:bg-white hover:text-slate-900"
            >
              Sign up
            </a>
          </div>
        )}
      </div>
    </header>
  )
}