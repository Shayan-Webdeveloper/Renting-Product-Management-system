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

  async function handleSignup() {
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
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError('An account with this email already exists. Try signing in instead.')
    } else {
      setSuccess(true)
    }
  }

  return (
          <div className="flex min-h-screen items-center justify-center">
          <div className="w-1/2 min-h-screen shadow-md bg-slate-900">

          </div>
     

      <div className="w-1/2 min-h-screen shadow-md">
          <h2  className="text-6xl font-bold mb-4 text-center ">Create your account</h2>
<form action="" className="border border-gray-300 p-4 rounded-lg shadow-md mt-10 pt-10 ps-10">

              <label className="block mb-2 font-medium">Full name</label>
              <input
                type="text"
                placeholder="Ali Khan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                
              />

              <label  className="block mb-2 font-medium mt-8">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label  className="block mb-2 font-medium mt-8">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>

            <div>
  <label className="block mb-2 font-medium mt-8">I am a</label>
  <div className="grid grid-cols-2 gap-3">
    <button
      type="button"
      className='border p-2 cursor-pointer'
      onClick={() => setRole('customer')}
    >
      Buyer
    </button>
    <button
    className='border p-2 cursor-pointer'
      type="button"
      onClick={() => setRole('vendor')}

    >
      Vendor
    </button>
  </div>
</div>

          {success ? (
               <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded text-sm text-green-800">
              A confirmation email has been sent. Please verify your email to continue.
            </div>
          ) : (
               <>
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

              <button
                onClick={handleSignup}
                disabled={loading}
                className='mt-5 block border px-4 py-2 cursor-pointer'
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>

              <p className="text-slate-500 text-sm mt-6">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Sign in
                </a>
              </p>
            </>
          )}
                </form>
                 </div>  
        </div>
  )
}