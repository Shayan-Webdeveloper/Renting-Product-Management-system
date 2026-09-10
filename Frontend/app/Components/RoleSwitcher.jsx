'use client'

import { useState } from 'react'
import { switchRole } from '@/app/actions/profile'

export default function RoleSwitcher({ currentRole }) {
  const [role, setRole] = useState(currentRole)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSwitch(newRole) {
    if (newRole === role) return

    setLoading(true)
    setMessage('')

    const result = await switchRole(newRole)

    setLoading(false)

    if (result.error) {
      setMessage(result.error)
    } else {
      setRole(newRole)
      setMessage(`You are now a ${newRole === 'vendor' ? 'Vendor' : 'Buyer'}.`)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSwitch('customer')}
          disabled={loading}
          className='px-4 cursor-pointer border'
            
        >
          Buyer
        </button>
        <button
          onClick={() => handleSwitch('vendor')}
          disabled={loading}
          className='px-4 cursor-pointer border'
        >
          Vendor
        </button>
      </div>
      {message && <p className="text-sm text-slate-500 mt-3">{message}</p>}
    </div>
  )
}