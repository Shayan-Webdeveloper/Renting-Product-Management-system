'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSignup(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError('An account with this email already exists. Try signing in instead.')
      return
    }

    setSuccess(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-4 md:p-8">
        <div className="grid w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/50 md:grid-cols-[1.1fr_1fr]">
          <div className="hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-10 md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Start your journey
              </p>
              <h2 className="mt-6 text-4xl font-bold text-white">Create an account that works for you.</h2>
            </div>

            <div className="space-y-4 text-slate-300">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <p className="text-lg font-medium text-white">Join as a buyer</p>
                <p className="mt-1 text-sm text-slate-400">Browse products, reserve rentals, and manage bookings quickly.</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <p className="text-lg font-medium text-white">Join as a vendor</p>
                <p className="mt-1 text-sm text-slate-400">List inventory, handle requests, and grow your rental business.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Create account</p>
                <h1 className="mt-3 text-3xl font-bold text-white">Sign up</h1>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-200">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Ali Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 transition duration-200 focus:outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="mb-2 block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 transition duration-200 focus:outline-none focus:ring-2"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="signup-password" className="mb-2 block text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 transition duration-200 focus:outline-none focus:ring-2"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className={`rounded-xl cursor-pointer border px-4 py-3 text-sm font-medium transition ${
                        role === 'customer'
                          ? 'border-slate-400 bg-slate-700 text-white'
                          : 'border-slate-600 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                      onClick={() => setRole('customer')}
                    >
                      Buyer
                    </button>
                    <button
                      type="button"
                      className={`rounded-xl cursor-pointer border px-4 py-3 text-sm font-medium transition ${
                        role === 'vendor'
                          ? 'border-slate-400 bg-slate-700 text-white'
                          : 'border-slate-600 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                      onClick={() => setRole('vendor')}
                    >
                      Vendor
                    </button>
                  </div>
                </div>

                {success ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                    A confirmation email has been sent. Please verify your email to continue.
                  </div>
                ) : (
                  <>
                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-medium text-white transition-all duration-200 hover:border-slate-500 hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? 'Creating account…' : 'Create account'}
                    </button>

                    <p className="text-center text-sm text-slate-300">
                      Already have an account?{' '}
                      <a href="/login" className="font-medium text-slate-200 transition hover:text-white hover:underline">
                        Sign in
                      </a>
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}