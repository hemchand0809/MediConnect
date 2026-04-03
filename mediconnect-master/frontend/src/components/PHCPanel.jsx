import React, { useEffect, useState } from 'react';
import { Users, Check, X, Store, Calendar, ShoppingBag, FlaskConical, Lock, FileText, Send, Pill, IndianRupee, TrendingUp } from 'lucide-react';

const Requests = () => {
  const [requests, setRequests] = useState([
    { id: 'R-1024', name: 'Guest User', type: 'Instant', issue: 'Fever and cough', time: '2 min ago' },
    { id: 'R-1025', name: 'Rahul', type: 'User', issue: 'Back pain', time: '10 min ago' },
  ]);
  const accept = (id) => setRequests(prev => prev.filter(r => r.id !== id));
  const reject = (id) => setRequests(prev => prev.filter(r => r.id !== id));
  return (
    <div className="space-y-3">
      {requests.map(r => (
        <div key={r.id} className="flex items-center justify-between border rounded-lg p-3">
          <div>
            <p className="text-sm font-medium text-gray-900">{r.name} <span className="text-xs text-gray-500">• {r.type}</span></p>
            <p className="text-xs text-gray-600">{r.issue}</p>
            <p className="text-xs text-gray-400">{r.id} • {r.time}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => accept(r.id)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 inline-flex items-center"><Check className="w-3 h-3 mr-1"/> Accept</button>
            <button onClick={() => reject(r.id)} className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 inline-flex items-center"><X className="w-3 h-3 mr-1"/> Reject</button>
          </div>
        </div>
      ))}
      {requests.length === 0 && <div className="text-sm text-gray-500">No pending requests.</div>}
    </div>
  );
};

const StockChecker = () => {
  const [query, setQuery] = useState('');
  const stocks = [
    { shop: 'City Care Pharmacy', item: 'Paracetamol 500mg', available: true, qty: 42 },
    { shop: 'Neighborhood Meds', item: 'Amoxicillin 500mg', available: false, qty: 0 },
    { shop: 'HealthPlus Store', item: 'Cetirizine 10mg', available: true, qty: 18 },
  ];
  const filtered = stocks.filter(s => s.item.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="flex items-center mb-3">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search medicine" className="px-3 py-2 border rounded w-full"/>
      </div>
      <div className="space-y-2">
        {filtered.map((s, idx) => (
          <div key={idx} className="flex items-center justify-between border rounded p-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{s.item}</p>
              <p className="text-xs text-gray-600">{s.shop}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${s.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.available ? `Available • ${s.qty}` : 'Out of stock'}</span>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-sm text-gray-500">No items match your search.</div>}
      </div>
    </div>
  );
};

const Appointments = () => (
  <div className="text-sm text-gray-600">
    <p>Quickly book appointments on behalf of patients.</p>
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      <button className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-500">Book Consultation</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Follow-up</button>
    </div>
  </div>
);

const Orders = () => {
  const [tab, setTab] = useState('meds');
  const [medOrder, setMedOrder] = useState({ name: '', qty: 1, shop: '' });
  const [labOrder, setLabOrder] = useState({ test: '', patient: '', date: '' });
  const submitMed = (e) => { e.preventDefault(); alert(`Medicine order placed: ${medOrder.name} x${medOrder.qty} @ ${medOrder.shop || 'Any shop'}`); };
  const submitLab = (e) => { e.preventDefault(); alert(`Lab test booked: ${labOrder.test} for ${labOrder.patient || 'patient'} on ${labOrder.date || 'ASAP'}`); };
  return (
    <div className="text-sm text-gray-600">
      <div className="flex mb-4">
        <button onClick={() => setTab('meds')} className={`px-4 py-2 rounded-l-md border ${tab==='meds' ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-violet-700 border-violet-200'}`}>Meds</button>
        <button onClick={() => setTab('lab')} className={`px-4 py-2 rounded-r-md border-t border-b border-r ${tab==='lab' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200'}`}>Lab</button>
      </div>

      {tab === 'meds' && (
        <form onSubmit={submitMed} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={medOrder.name} onChange={e => setMedOrder(m => ({...m, name: e.target.value}))} placeholder="Medicine name" className="px-3 py-2 border rounded" required />
          <input type="number" min="1" value={medOrder.qty} onChange={e => setMedOrder(m => ({...m, qty: e.target.value}))} placeholder="Qty" className="px-3 py-2 border rounded" />
          <input value={medOrder.shop} onChange={e => setMedOrder(m => ({...m, shop: e.target.value}))} placeholder="Preferred shop (optional)" className="px-3 py-2 border rounded" />
          <div className="md:col-span-3">
            <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-500 inline-flex items-center"><ShoppingBag className="w-4 h-4 mr-2"/> Place Order</button>
          </div>
        </form>
      )}

      {tab === 'lab' && (
        <form onSubmit={submitLab} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={labOrder.test} onChange={e => setLabOrder(l => ({...l, test: e.target.value}))} placeholder="Test name" className="px-3 py-2 border rounded" required />
          <input value={labOrder.patient} onChange={e => setLabOrder(l => ({...l, patient: e.target.value}))} placeholder="Patient name" className="px-3 py-2 border rounded" />
          <input type="date" value={labOrder.date} onChange={e => setLabOrder(l => ({...l, date: e.target.value}))} className="px-3 py-2 border rounded" />
          <div className="md:col-span-3">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 inline-flex items-center"><FlaskConical className="w-4 h-4 mr-2"/> Book Test</button>
          </div>
        </form>
      )}
    </div>
  );
};

const Reports = () => {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('phcReports');
    return saved ? JSON.parse(saved) : [
      { id: 'REP-1001', patientName: 'Anita Sharma', patientId: 'U-2001', reportType: 'Blood Test', notes: 'Routine checkup', attachmentUrl: '', status: 'Sent', time: new Date().toISOString() },
      { id: 'REP-1002', patientName: 'Ravi Kumar', patientId: 'U-2002', reportType: 'X-Ray', notes: 'Minor fracture follow-up', attachmentUrl: '', status: 'Sent', time: new Date().toISOString() },
    ];
  });
  const [form, setForm] = useState({ patientName: '', patientId: '', reportType: '', notes: '', attachmentUrl: '' });

  useEffect(() => {
    localStorage.setItem('phcReports', JSON.stringify(reports));
  }, [reports]);

  const submit = (e) => {
    e.preventDefault();
    const newReport = {
      id: `REP-${Math.floor(1000 + Math.random()*9000)}`,
      ...form,
      status: 'Sent',
      time: new Date().toISOString(),
    };
    setReports(prev => [newReport, ...prev]);
    setForm({ patientName: '', patientId: '', reportType: '', notes: '', attachmentUrl: '' });
  };

  const remove = (id) => setReports(prev => prev.filter(r => r.id !== id));

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input value={form.patientName} onChange={e => setForm(f => ({...f, patientName: e.target.value}))} placeholder="Patient name" className="px-3 py-2 border rounded" required />
        <input value={form.patientId} onChange={e => setForm(f => ({...f, patientId: e.target.value}))} placeholder="Patient ID / Email" className="px-3 py-2 border rounded" required />
        <input value={form.reportType} onChange={e => setForm(f => ({...f, reportType: e.target.value}))} placeholder="Report type" className="px-3 py-2 border rounded" required />
        <input value={form.attachmentUrl} onChange={e => setForm(f => ({...f, attachmentUrl: e.target.value}))} placeholder="Attachment link (optional)" className="px-3 py-2 border rounded" />
        <div className="md:col-span-5">
          <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Notes (optional)" className="w-full px-3 py-2 border rounded" rows={2} />
        </div>
        <div className="md:col-span-5">
          <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-500 inline-flex items-center"><Send className="w-4 h-4 mr-2"/> Send Report</button>
        </div>
      </form>

      <div className="space-y-2">
        {reports.map(r => (
          <div key={r.id} className="border rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-4 h-4 text-violet-600 mr-2"/>
              <div>
                <p className="text-sm font-medium text-gray-900">{r.reportType} • {r.patientName} <span className="text-xs text-gray-500">({r.patientId})</span></p>
                <p className="text-xs text-gray-600">{r.notes || '—'}</p>
                <p className="text-xs text-gray-400">{r.id} • {new Date(r.time).toLocaleString()}</p>
                {r.attachmentUrl && <a href={r.attachmentUrl} target="_blank" rel="noreferrer" className="text-xs text-violet-700 underline">View attachment</a>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{r.status}</span>
              <button onClick={() => remove(r.id)} className="px-2 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">Remove</button>
            </div>
          </div>
        ))}
        {reports.length === 0 && <div className="text-sm text-gray-500">No reports yet.</div>}
      </div>
    </div>
  );
};

const SendMedicines = () => {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('phcMedicines');
    return saved ? JSON.parse(saved) : [
      { id: 'MED-5001', patientName: 'Sunita Verma', items: [{ name: 'Paracetamol 500mg', qty: 10 }], status: 'Dispatched', time: new Date().toISOString() },
      { id: 'MED-5002', patientName: 'Aman Gupta', items: [{ name: 'Cetirizine 10mg', qty: 5 }, { name: 'ORS', qty: 2 }], status: 'Delivered', time: new Date().toISOString() },
    ];
  });
  const [form, setForm] = useState({ patientName: '', itemName: '', qty: 1 });

  useEffect(() => {
    localStorage.setItem('phcMedicines', JSON.stringify(medications));
  }, [medications]);

  const add = (e) => {
    e.preventDefault();
    const entry = {
      id: `MED-${Math.floor(5000 + Math.random()*4000)}`,
      patientName: form.patientName,
      items: [{ name: form.itemName, qty: Number(form.qty) || 1 }],
      status: 'Dispatched',
      time: new Date().toISOString(),
    };
    setMedications(prev => [entry, ...prev]);
    setForm({ patientName: '', itemName: '', qty: 1 });
  };

  const markDelivered = (id) => setMedications(prev => prev.map(m => m.id === id ? { ...m, status: 'Delivered' } : m));
  const remove = (id) => setMedications(prev => prev.filter(m => m.id !== id));

  return (
    <div className="space-y-4">
      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input value={form.patientName} onChange={e => setForm(f => ({...f, patientName: e.target.value}))} placeholder="Patient name" className="px-3 py-2 border rounded" required />
        <input value={form.itemName} onChange={e => setForm(f => ({...f, itemName: e.target.value}))} placeholder="Medicine name" className="px-3 py-2 border rounded" required />
        <input type="number" min="1" value={form.qty} onChange={e => setForm(f => ({...f, qty: e.target.value}))} placeholder="Qty" className="px-3 py-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-500 inline-flex items-center"><Pill className="w-4 h-4 mr-2"/> Send Medicine</button>
      </form>

      <div className="space-y-2">
        {medications.map(m => (
          <div key={m.id} className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Pill className="w-4 h-4 text-violet-600 mr-2"/>
                <div>
                  <p className="text-sm font-medium text-gray-900">{m.patientName}</p>
                  <p className="text-xs text-gray-600">{m.items.map(i => `${i.name} x${i.qty}`).join(', ')}</p>
                  <p className="text-xs text-gray-400">{m.id} • {new Date(m.time).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${m.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                {m.status !== 'Delivered' && (
                  <button onClick={() => markDelivered(m.id)} className="px-2 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100">Mark delivered</button>
                )}
                <button onClick={() => remove(m.id)} className="px-2 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">Remove</button>
              </div>
            </div>
          </div>
        ))}
        {medications.length === 0 && <div className="text-sm text-gray-500">No medicine dispatches yet.</div>}
      </div>
    </div>
  );
};

const Profit = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('phcProfitTx');
    return saved ? JSON.parse(saved) : [
      { id: 'TX-9001', type: 'Revenue', description: 'Consultation orders', amount: 1200, cost: 0, date: new Date().toISOString() },
      { id: 'TX-9002', type: 'Revenue', description: 'Medicine sales', amount: 3500, cost: 0, date: new Date().toISOString() },
      { id: 'TX-9003', type: 'Expense', description: 'Procurement', amount: 0, cost: 2000, date: new Date().toISOString() },
    ];
  });
  const [form, setForm] = useState({ type: 'Revenue', description: '', amount: '', cost: '' });

  useEffect(() => {
    localStorage.setItem('phcProfitTx', JSON.stringify(transactions));
  }, [transactions]);

  const add = (e) => {
    e.preventDefault();
    const tx = {
      id: `TX-${Math.floor(9000 + Math.random()*900)}`,
      type: form.type,
      description: form.description || (form.type === 'Revenue' ? 'Revenue' : 'Expense'),
      amount: Number(form.amount) || 0,
      cost: Number(form.cost) || 0,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [tx, ...prev]);
    setForm({ type: 'Revenue', description: '', amount: '', cost: '' });
  };

  const remove = (id) => setTransactions(prev => prev.filter(t => t.id !== id));

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.type === 'Revenue' ? t.amount : 0), 0);
  const totalCost = transactions.reduce((sum, t) => sum + (t.type === 'Expense' ? t.cost : 0), 0);
  const profit = totalRevenue - totalCost;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-lg border flex items-center">
          <IndianRupee className="w-5 h-5 text-violet-600 mr-2"/>
          <div>
            <p className="text-xs text-gray-500">Total Revenue</p>
            <p className="text-lg font-semibold text-gray-900">₹ {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border flex items-center">
          <IndianRupee className="w-5 h-5 text-red-600 mr-2"/>
          <div>
            <p className="text-xs text-gray-500">Total Cost</p>
            <p className="text-lg font-semibold text-gray-900">₹ {totalCost.toLocaleString()}</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border flex items-center">
          <TrendingUp className="w-5 h-5 text-green-600 mr-2"/>
          <div>
            <p className="text-xs text-gray-500">Net Profit</p>
            <p className={`text-lg font-semibold ${profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>₹ {profit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} className="px-3 py-2 border rounded">
          <option>Revenue</option>
          <option>Expense</option>
        </select>
        <input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Description" className="px-3 py-2 border rounded" />
        <input type="number" min="0" value={form.amount} onChange={e => setForm(f => ({...f, amount: e.target.value}))} placeholder="Amount (₹)" className="px-3 py-2 border rounded" />
        <input type="number" min="0" value={form.cost} onChange={e => setForm(f => ({...f, cost: e.target.value}))} placeholder="Cost (₹ for expense)" className="px-3 py-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-500">Add</button>
      </form>

      <div className="space-y-2">
        {transactions.map(t => (
          <div key={t.id} className="border rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{t.description}</p>
              <p className="text-xs text-gray-500">{t.id} • {new Date(t.date).toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs px-2 py-1 rounded-full ${t.type === 'Revenue' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{t.type}</span>
              {t.type === 'Revenue' ? (
                <span className="text-sm font-semibold text-green-700">₹ {t.amount.toLocaleString()}</span>
              ) : (
                <span className="text-sm font-semibold text-red-700">₹ {t.cost.toLocaleString()}</span>
              )}
              <button onClick={() => remove(t.id)} className="px-2 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">Remove</button>
            </div>
          </div>
        ))}
        {transactions.length === 0 && <div className="text-sm text-gray-500">No transactions yet.</div>}
      </div>
    </div>
  );
};

const PHCPanel = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('phcToken'));
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const demo = { username: 'phc', password: 'phc123' };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (form.username === demo.username && form.password === demo.password) {
      localStorage.setItem('phcToken', 'demo');
      setIsLoggedIn(true);
    } else {
      setError('Invalid PHC credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('phcToken');
    setIsLoggedIn(false);
    setForm({ username: '', password: '' });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
            <Users className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">PHC Panel</h1>
          <p className="text-gray-600 mt-2">Manage guest requests, stock, bookings, and orders</p>
        </div>

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 border border-gray-100">
            <div className="flex items-center justify-center mb-4 text-gray-700 text-sm"><Lock className="w-4 h-4 mr-2"/> PHC Staff Login</div>
            {error && <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-3">
              <input value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))} placeholder="Username" className="w-full px-3 py-2 border rounded"/>
              <input type="password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} placeholder="Password" className="w-full px-3 py-2 border rounded"/>
              <button type="submit" className="w-full px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-500">Log In</button>
              <p className="text-xs text-gray-500">Demo: phc / phc123</p>
            </form>
          </div>
        ) : (
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Logged in as PHC</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors duration-200 flex items-center text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => setActiveTab('requests')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='requests' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Requests</button>
            <button onClick={() => setActiveTab('stock')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='stock' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Stock Checker</button>
            <button onClick={() => setActiveTab('appointments')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='appointments' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Appointments</button>
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='orders' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Orders</button>
            <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='reports' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Reports</button>
            <button onClick={() => setActiveTab('medicines')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='medicines' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Send Medicines</button>
            <button onClick={() => setActiveTab('profit')} className={`px-4 py-2 rounded-md text-sm ${activeTab==='profit' ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'}`}>Total Profit</button>
          </div>

          {activeTab === 'requests' && <Requests />}
          {activeTab === 'stock' && <StockChecker />}
          {activeTab === 'appointments' && <Appointments />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'medicines' && <SendMedicines />}
          {activeTab === 'profit' && <Profit />}
        </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border shadow-sm flex items-center">
            <Users className="w-5 h-5 text-violet-600 mr-3"/>
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-lg font-semibold text-gray-900">2</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border shadow-sm flex items-center">
            <Store className="w-5 h-5 text-blue-600 mr-3"/>
            <div>
              <p className="text-sm text-gray-600">Shops Checked</p>
              <p className="text-lg font-semibold text-gray-900">3</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border shadow-sm flex items-center">
            <Calendar className="w-5 h-5 text-purple-600 mr-3"/>
            <div>
              <p className="text-sm text-gray-600">Today Bookings</p>
              <p className="text-lg font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHCPanel;


