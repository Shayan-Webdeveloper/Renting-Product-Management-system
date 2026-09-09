'use client'

import { useState } from 'react'
import { createBooking } from '@/app/actions/bookings'

export default function BookNowButton({ productId, dailyRate }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleBook() {
    setLoading(true)
    setMessage('')

    const result = await createBooking([
      {
        product_id: productId,
        quantity: 1,
        start_date: startDate,
        end_date: endDate,
      },
    ])

    setLoading(false)

    if (result.error) {
      setMessage(result.error)
    } else {
      setMessage('Booking created! ID: ' + result.bookingId)
    }
  }

  return (
    <div>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleBook} disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}