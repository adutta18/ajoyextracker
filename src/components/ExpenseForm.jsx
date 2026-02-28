import React, { useState } from 'react'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8)
}

export default function ExpenseForm({ onAdd }) {
  const [type, setType] = useState('Other')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [paid, setPaid] = useState('')

  function submit(e) {
    e.preventDefault()
    const a = parseFloat(amount) || 0
    const p = parseFloat(paid) || 0
    const balance = Math.max(0, a - p)
    const item = { id: uid(), type, date: date || new Date().toISOString().slice(0,10), amount: a, paid: p, balance }
    onAdd(item)
    setAmount('')
    setPaid('')
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h2>Add Expense</h2>
      <label>Expense Type
        <input value={type} onChange={e => setType(e.target.value)} list="types" />
        <datalist id="types">
          <option>Food</option>
          <option>Transport</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Other</option>
        </datalist>
      </label>

      <label>Date
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>

      <label>Amount
        <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
      </label>

      <label>Paid
        <input type="number" step="0.01" value={paid} onChange={e => setPaid(e.target.value)} placeholder="0.00" />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary">Add Expense</button>
      </div>
    </form>
  )
}
