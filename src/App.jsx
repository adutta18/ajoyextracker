import React, { useEffect, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import Dashboard from './components/Dashboard'

// NOTE: we no longer use a fixed key. each user will have their own key.

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [username, setUsername] = useState(localStorage.getItem('exp_user') || '')
  const [pendingName, setPendingName] = useState('')

  // build a storage key that includes the username
  const storageKey = username ? `expanse_tracker_expenses_${username}_v1` : null

  // load when username becomes available
  useEffect(() => {
    if (!username) return
    const raw = localStorage.getItem(storageKey)
    if (raw) setExpenses(JSON.parse(raw))
  }, [username, storageKey])

  // persist whenever expenses or user change
  useEffect(() => {
    if (!username) return
    localStorage.setItem(storageKey, JSON.stringify(expenses))
  }, [expenses, username, storageKey])

  function addExpense(e) {
    setExpenses(prev => [e, ...prev])
  }

  function removeExpense(id) {
    setExpenses(prev => prev.filter(p => p.id !== id))
  }

  function importExpenses(items) {
    // ensure items have ids and numeric fields
    const normalized = items.map(it => ({
      id: it.id || (Date.now().toString(36) + Math.random().toString(36).slice(2,8)),
      type: it.type || 'Other',
      date: it.date || new Date().toISOString().slice(0,10),
      amount: parseFloat(it.amount) || 0,
      paid: parseFloat(it.paid) || 0,
      balance: parseFloat(it.balance) || Math.max(0,(parseFloat(it.amount)||0)-(parseFloat(it.paid)||0))
    }))
    setExpenses(prev => [...normalized, ...prev])
  }

  function handleLogin() {
    if (pendingName.trim() === '') return
    setUsername(pendingName.trim())
    localStorage.setItem('exp_user', pendingName.trim())
    setPendingName('')
  }

  function handleLogout() {
    setUsername('')
    setExpenses([])
    localStorage.removeItem('exp_user')
  }

  // if we don't yet have a username, show simple login screen
  if (!username) {
    return (
      <div className="login-shell">
        <h2>Who are you?</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={pendingName}
          onChange={e => setPendingName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button className="btn primary" onClick={handleLogin} style={{marginLeft:8}}>
          Continue
        </button>
        <p className="muted">Your expenses will be stored separately under this name.</p>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Expanse Tracker</h1>
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center'}}>
          <span className="muted" style={{marginRight:8}}>user: {username}</span>
          <button className="btn ghost small" onClick={handleLogout}>Log out</button>
        </div>
      </header>
      <main className="main">
        <aside className="panel">
          <ExpenseForm onAdd={addExpense} />
        </aside>
        <section className="content">
          <Dashboard expenses={expenses} onRemove={removeExpense} onImport={importExpenses} />
        </section>
      </main>
      <footer className="footer">Built with ❤️ — this browser stores data per user name</footer>
    </div>
  )
}
