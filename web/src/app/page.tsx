import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">Operations Overview</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Command Center</h1>
          <p className="mt-2 text-slate-500">Live production overview for August 2026</p>
        </div>
        <Link href="/inventory/receive" className="w-fit rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400">Receive Fabric</Link>
      </header>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 border-t-4 border-t-amber-500 bg-white p-6 shadow-sm"><h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Raw Fabric</h2><p className="mt-2 text-3xl font-bold text-slate-800">12,450 <span className="text-lg font-normal text-slate-400">Yards</span></p></div>
        <div className="rounded-2xl border border-slate-200 border-t-4 border-t-blue-500 bg-white p-6 shadow-sm"><h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Pending at Vendors</h2><p className="mt-2 text-3xl font-bold text-slate-800">3,200 <span className="text-lg font-normal text-slate-400">Suits</span></p></div>
        <div className="rounded-2xl border border-slate-200 border-t-4 border-t-emerald-500 bg-white p-6 shadow-sm"><h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ready Catalogs</h2><p className="mt-2 text-3xl font-bold text-slate-800">850 <span className="text-lg font-normal text-slate-400">Sets</span></p></div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4"><h2 className="font-semibold text-slate-800">Recent Factory Scans</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead><tr className="border-b border-slate-100 text-slate-500"><th className="p-4 font-medium">Batch ID / Tag</th><th className="p-4 font-medium">Action</th><th className="p-4 font-medium">Unit</th><th className="p-4 font-medium">Time</th></tr></thead>
            <tbody className="text-slate-700"><tr className="border-b border-slate-100 hover:bg-slate-50"><td className="p-4 font-mono font-semibold text-blue-600">2608-ZT-LAWN-T1</td><td className="p-4"><span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">RECEIVED</span></td><td className="p-4">500 Yards</td><td className="p-4 text-slate-400">Just now</td></tr><tr className="hover:bg-slate-50"><td className="p-4 font-mono font-semibold text-blue-600">BUN-042-EMB</td><td className="p-4"><span className="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">OUTWARD CHALLAN</span></td><td className="p-4">20 Suits</td><td className="p-4 text-slate-400">12 mins ago</td></tr></tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
