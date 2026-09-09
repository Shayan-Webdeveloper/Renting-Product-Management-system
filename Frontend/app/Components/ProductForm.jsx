'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/app/actions/products'

export default function ProductForm({ categories }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)
    setError('')

    const result = await createProduct(formData)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/vendor/products')
    }
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label className="block">Title</label>
        <input
          type="text"
          name="title"
          required
          className="w-full bg-white border border-slate-200 text-slate-900"
        />
      </div>

      <div>
        <label className="block">Description</label>
        <textarea
          name="description"
          rows="3"
          className="w-full border bg-white"
        />
      </div>

      <div>
        <label className="w-full border bg-white">Category</label>
        <select
          name="category_id"
          required
          className="w-full border border bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <div>
          <label>Daily rate</label>
          <input
            type="number"
            name="daily_rate"
            step="0.01"
            required
            className="w-full border bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Security deposit</label>
          <input
            type="number"
            name="security_deposit"
            step="0.01"
            className="w-full bg-white border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Photos</label>
        <input
          type="file"
          name="photos"
          multiple
          accept="image/*"
          className="w-full border bg-white"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="disabled:opacity-50 border"
      >
        {loading ? 'Creating…' : 'Create listing'}
      </button>
    </form>
  )
}