'use client'

import { useState } from 'react'
import { createBooking } from "../actions/bookings"

export default function BookingForm({ productId, dailyRate, securityDeposit }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const days = startDate && endDate
    ? Math.max(0, (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    : 0
  const total = days * quantity * dailyRate

  async function handleBook() {
    setLoading(true)
    setMessage('')

    const result = await createBooking([
      {
        product_id: productId,
        quantity: Number(quantity),
        start_date: startDate,
        end_date: endDate,
      },
    ])

    setLoading(false)

    if (result.error) {
      setIsError(true)
      setMessage(result.error)
    } else {
      setIsError(false)
      setMessage('Booking created successfully!')
    }
  }

  return (
    <div className="border">
      <div>
        <div>
          <label>Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border"
        />
      </div>

      {days > 0 && (
        <div className="text-sm text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex justify-between">
            <span>{days} day(s) × {quantity} × Rs. {dailyRate}</span>
            <span>Rs. {total}</span>
          </div>
          {securityDeposit > 0 && (
            <div className="flex justify-between text-slate-500 mt-1">
              <span>Security deposit</span>
              <span>Rs. {securityDeposit}</span>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleBook}
        disabled={loading || !startDate || !endDate}
        className="w-full disabled:opacity-50 cursor-pointer "
      >
        {loading ? 'Booking…' : 'Book now'}
      </button>

      {message && (
        <p className={`text-sm ${isError ? 'text-red-600' : 'text-green-700'}`}>{message}</p>
      )}
    </div>
  )
}