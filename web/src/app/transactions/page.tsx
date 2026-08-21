import Link from "next/link";

export default function TransactionsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">Operations</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Transactions</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Create and manage operational movements across the garment lifecycle.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/inventory/receive" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 font-black text-amber-700">IN</div>
          <h2 className="mt-5 text-xl font-bold">Inventory</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Receive raw fabric, record supplier documents, and generate Tag 1.</p>
        </Link>
      </div>
    </main>
  );
}
