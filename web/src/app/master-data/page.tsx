import { API_BASE } from "@/lib/api";
"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type MasterDataKey = "suppliers" | "customers" | "items" | "users";

interface MasterRecord {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

const tabs: Array<{ key: MasterDataKey; label: string; icon: string }> = [
  { key: "suppliers", label: "Suppliers", icon: "S" },
  { key: "customers", label: "Customers", icon: "C" },
  { key: "items", label: "Items", icon: "I" },
  { key: "users", label: "Users", icon: "U" },
];

async function fetchMasterRecords() {
  const [supplierResponse, fabricResponse] = await Promise.all([
    fetch(`\https://garment-erp-api-nr0i.onrender.com/master-data/suppliers`),
    fetch(`\https://garment-erp-api-nr0i.onrender.com/master-data/fabric-types`),
  ]);
  if (!supplierResponse.ok || !fabricResponse.ok) {
    throw new Error("Master data could not be loaded.");
  }
  return {
    suppliers: (await supplierResponse.json()) as MasterRecord[],
    fabricTypes: (await fabricResponse.json()) as MasterRecord[],
  };
}

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState<MasterDataKey>("suppliers");
  const [suppliers, setSuppliers] = useState<MasterRecord[]>([]);
  const [fabricTypes, setFabricTypes] = useState<MasterRecord[]>([]);
  const [supplierCode, setSupplierCode] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    void fetchMasterRecords()
      .then((records) => {
        if (isMounted) {
          setSuppliers(records.suppliers);
          setFabricTypes(records.fabricTypes);
        }
      })
      .catch((loadError: unknown) => {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Master data could not be loaded.");
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  async function createSupplier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`\https://garment-erp-api-nr0i.onrender.com/master-data/suppliers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: supplierCode, name: supplierName }),
      });
      const result = (await response.json()) as { message?: string | string[] };
      if (!response.ok) {
        throw new Error(Array.isArray(result.message) ? result.message.join(". ") : result.message || "Supplier could not be saved.");
      }
      setSupplierCode("");
      setSupplierName("");
      setMessage("Supplier added successfully.");
      const records = await fetchMasterRecords();
      setSuppliers(records.suppliers);
      setFabricTypes(records.fabricTypes);
    } catch (saveError: unknown) {
      setError(saveError instanceof Error ? saveError.message : "Supplier could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  const activeCount = activeTab === "suppliers" ? suppliers.length : activeTab === "items" ? fabricTypes.length : 0;
  const fieldClass = "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-950";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-wider"><span className="text-amber-500">GARMENT</span> ERP</Link>
          <nav className="flex items-center gap-2 text-sm"><Link href="/inventory/receive" className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Receive Fabric</Link><span className="rounded-lg bg-slate-800 px-3 py-2 font-semibold text-amber-400">Master Data</span></nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-8"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">System Administration</p><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Master Data</h1><p className="mt-3 text-slate-600 dark:text-slate-400">Maintain the core records used throughout the ERP.</p></div>
        {message && <div role="status" className="mb-5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-800">{message}</div>}
        {error && <div role="alert" className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800">{error}</div>}

        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div role="tablist" aria-label="Master data registers" className="space-y-1">
              {tabs.map((tab) => {
                const count = tab.key === "suppliers" ? suppliers.length : tab.key === "items" ? fabricTypes.length : 0;
                const selected = activeTab === tab.key;
                return <button key={tab.key} role="tab" aria-selected={selected} type="button" onClick={() => { setActiveTab(tab.key); setMessage(null); setError(null); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${selected ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}><span className={`flex h-9 w-9 items-center justify-center rounded-lg font-black ${selected ? "bg-amber-500 text-slate-950 dark:bg-slate-950 dark:text-amber-400" : "bg-slate-100 dark:bg-slate-800"}`}>{tab.icon}</span><span><span className="block text-sm font-bold">{tab.label}</span><span className="block text-xs opacity-60">{count} records</span></span></button>;
              })}
            </div>
          </aside>

          <section role="tabpanel" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800"><h2 className="text-xl font-bold">{tabs.find((tab) => tab.key === activeTab)?.label}</h2><p className="mt-1 text-sm text-slate-500">{activeCount} active records</p></div>

            {activeTab === "suppliers" && <>
              <form onSubmit={createSupplier} className="grid gap-3 border-b border-slate-200 bg-slate-50 p-6 sm:grid-cols-[140px_minmax(0,1fr)_auto] dark:border-slate-800 dark:bg-slate-950/50">
                <input required maxLength={3} value={supplierCode} onChange={(event) => setSupplierCode(event.target.value.toUpperCase())} placeholder="Code (ZT)" aria-label="Supplier code" className={fieldClass} />
                <input required maxLength={100} value={supplierName} onChange={(event) => setSupplierName(event.target.value)} placeholder="Supplier business name" aria-label="Supplier business name" className={fieldClass} />
                <button disabled={isSaving} className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 disabled:opacity-60">{isSaving ? "Saving…" : "Add Supplier"}</button>
              </form>
              <RecordTable records={suppliers} firstHeading="Supplier Code" secondHeading="Supplier Name" />
            </>}

            {activeTab === "items" && <>
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">Fabric types available for procurement receipts</div>
              <RecordTable records={fabricTypes} firstHeading="Fabric Code" secondHeading="Fabric Type" />
            </>}

            {(activeTab === "customers" || activeTab === "users") && <div className="px-6 py-16 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 font-black text-slate-400 dark:bg-slate-800">{activeTab === "customers" ? "C" : "U"}</div><h3 className="mt-4 font-bold">No records added yet</h3><p className="mt-2 text-sm text-slate-500">This register will be enabled after its business fields and access rules are finalized.</p></div>}
          </section>
        </div>
      </main>
    </div>
  );
}

function RecordTable({ records, firstHeading, secondHeading }: { records: MasterRecord[]; firstHeading: string; secondHeading: string }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/30"><th className="px-6 py-4">{firstHeading}</th><th className="px-6 py-4">{secondHeading}</th><th className="px-6 py-4">Status</th></tr></thead><tbody>{records.map((record) => <tr key={record.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800"><td className="px-6 py-4 font-mono font-semibold text-amber-700 dark:text-amber-400">{record.code}</td><td className="px-6 py-4 font-medium">{record.name}</td><td className="px-6 py-4"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Active</span></td></tr>)}</tbody></table>{records.length === 0 && <div className="px-6 py-12 text-center text-sm text-slate-500">No records found.</div>}</div>;
}
