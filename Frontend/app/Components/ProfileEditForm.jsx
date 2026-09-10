// app/components/ProfileEditForm.jsx
'use client'

import { useState } from 'react'

export default function ProfileEditForm({ fullName, phone, updateAction }) {
  const [name, setName] = useState(fullName || '')
  const [phoneNumber, setPhoneNumber] = useState(phone || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)
    setMessage('')

    const result = await updateAction(formData)

    setLoading(false)

    if (result.error) {
      setIsError(true)
      setMessage(result.error)
    } else {
      setIsError(false)
      setMessage('Profile updated.')
    }
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label>Full name</label>
        <input
          type="text"
          name="full_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Save changes'}
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}