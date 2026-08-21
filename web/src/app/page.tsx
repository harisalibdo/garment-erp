import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-wider border-b border-slate-700">
          <span className="text-amber-500">GARMENT</span> ERP
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block p-3 rounded-lg bg-slate-800 text-amber-500 font-semibold">📊 Dashboard</a>
          <Link href="/inventory/receive" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">📦 Inventory (Yards/Suits)</Link>
          <Link href="/master-data" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">🗂️ Master Data</Link>
          <a href="#" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">✂️ Cutting Jobs</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">🚚 Vendor Operations</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">💰 Financial Ledgers</a>
        </nav>
        <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
          Logged in as <br/><span className="text-white font-medium">Mr. Irfan (Ops Head)</span>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Command Center</h1>
          <p className="text-slate-500 mt-1">Live production overview for August 2026</p>
        </header>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-amber-500">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Raw Fabric (WIP)</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">12,450 <span className="text-lg text-gray-400 font-normal">Yards</span></p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending at Vendors</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">3,200 <span className="text-lg text-gray-400 font-normal">Suits</span></p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-emerald-500">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Ready Catalogs</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">850 <span className="text-lg text-gray-400 font-normal">Sets</span></p>
          </div>
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-slate-800">Recent Factory Scans (Live)</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-sm text-gray-500 border-b border-gray-100">
                <th className="p-4 font-medium">Batch ID / Tag</th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Unit</th>
                <th className="p-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-mono font-medium text-blue-600">2608-ZT-LAWN-T1</td>
                <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">RECEIVED</span></td>
                <td className="p-4">500 Yards</td>
                <td className="p-4 text-gray-400">Just now</td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-mono font-medium text-blue-600">BUN-042-EMB</td>
                <td className="p-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">OUTWARD CHALLAN</span></td>
                <td className="p-4">20 Suits</td>
                <td className="p-4 text-gray-400">12 mins ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
