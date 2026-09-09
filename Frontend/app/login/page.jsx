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
          <input type="password" placeholder="Password" className="mt-2 w-full border border-gray-300 p-2 rounded-lg block" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className='mt-5 block border px-4 py-2 cursor-pointer'>Login</button>
     <p>Don't have an account? <a href="/signup" className='text-blue-500 underline cursor-pointer'>Sign Up</a></p>
          {message && <p>{message}</p>}
     </form>
     </div>
     </div>
)
}
