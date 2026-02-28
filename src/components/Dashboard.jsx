import React from 'react'

function currency(n){
  return n.toLocaleString('en-IN', {style:'currency', currency:'INR'})
}

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8)
}

export default function Dashboard({ expenses, onRemove, onImport }){
  const total = expenses.reduce((s,e)=>s+e.amount,0)
  const paid = expenses.reduce((s,e)=>s+e.paid,0)
  const balance = expenses.reduce((s,e)=>s+e.balance,0)

  function exportCSV(){
    const header = ['id','type','date','amount','paid','balance']
    const rows = expenses.map(e => [e.id,e.type,e.date,Number(e.amount).toFixed(2),Number(e.paid).toFixed(2),Number(e.balance).toFixed(2)])
    const csv = [header.join(','), ...rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'expenses_export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportFile(e){
    const f = e.target.files && e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result
      const lines = text.split(/\r?\n/).filter(l => l.trim().length>0)
      if(lines.length < 1) return
      const header = lines[0].split(',').map(h=>h.replace(/^"|"$/g,'').trim().toLowerCase())
      const items = lines.slice(1).map(l=>{
        // basic CSV parse for simple data
        const parts = l.match(/\s*(?:"((?:[^"]|"")*)"|([^,]*))\s*(?:,|$)/g).map(p=>p.replace(/,$/,'').trim())
        const vals = parts.map(v=>v.replace(/^"|"$/g,'').replace(/""/g,'"'))
        const obj = {}
        for(let i=0;i<header.length;i++) obj[header[i]] = vals[i] || ''
        return obj
      })
      if(onImport) onImport(items)
      e.target.value = ''
    }
    reader.readAsText(f)
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div className="stats">
        <div className="stat card">
          <div className="label">Total Expenses</div>
          <div className="value">{currency(total)}</div>
        </div>
        <div className="stat card">
          <div className="label">Total Paid</div>
          <div className="value">{currency(paid)}</div>
        </div>
        <div className="stat card">
          <div className="label">Total Balance</div>
          <div className="value">{currency(balance)}</div>
        </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
          <label className="btn" style={{cursor:'pointer'}}>
            Import CSV
            <input type="file" accept=".csv,text/csv" onChange={handleImportFile} style={{display:'none'}} />
          </label>
        </div>
      </div>

      <div className="card table-wrap">
        <h2>Recent Expenses</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr><td colSpan="6" className="muted">No expenses yet</td></tr>
            )}
            {expenses.map(e => (
              <tr key={e.id}>
                <td>{e.type}</td>
                <td>{e.date}</td>
                <td>{currency(e.amount)}</td>
                <td>{currency(e.paid)}</td>
                <td>{currency(e.balance)}</td>
                <td><button className="btn ghost" onClick={()=>onRemove(e.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
