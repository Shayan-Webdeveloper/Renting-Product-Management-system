'use client'

import { useState } from 'react'
import { createBrowserClient  } from '@supabase/ssr'
const supabase = createBrowserClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
export default function LoginPage() {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
     const [message, setMessage] = useState('')

     async function handleLogin() {
          const {error} = await supabase.auth.signInWithPassword({
               email,
               password
          })
          setMessage(error ? error.message : 'Login successful!')
     }

return (
     <div className="flex min-h-screen items-center justify-center">
          <div className="w-1/2 h-screen bg-slate-900 p-6 shadow-md">

          </div>
     <div className="w-1/2 h-screen p-4 pt-8 rounded-lg">
     <h1 className="text-6xl font-bold mb-4 text-center">Login</h1>
     <form action="" className="border border-gray-300 p-4 rounded-lg shadow-md mt-10 pt-10 ps-10">
<label className="block mb-2 font-medium">Email</label>
          <input type="email" placeholder="Email" className="border w-full border-gray-300 p-2 rounded-lg block" value={email} onChange={(e) => setEmail(e.target.value)} />
<label className="block mb-2 font-medium mt-8">Password</label>

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
          <button onClick={handleLogin} className='mt-5 block border px-4 py-2 cursor-pointer'>Login</button>
     <p>Don't have an account? <a href="/signup" className='text-blue-500 underline cursor-pointer'>Sign Up</a></p>
          {message && <p>{message}</p>}
     </form>
     </div>
     </div>
)
}
