'use client';
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type MeasurementUnit = "YARDS" | "METERS";

interface MasterRecord {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

interface FormState {
  supplierCode: string;
  fabricType: string;
  color: string;
  quantity: string;
  unitOfMeasure: MeasurementUnit;
  supplierInvoiceNumber: string;
  supplierDeliveryChallanNumber: string;
  pricePerUnit: string;
}

interface ReceiveFabricResponse {
  success: true;
  batchId: string;
  totalAmount: string;
}

const initialForm: FormState = {
  supplierCode: "",
  fabricType: "",
  color: "",
  quantity: "",
  unitOfMeasure: "YARDS",
  supplierInvoiceNumber: "",
  supplierDeliveryChallanNumber: "",
  pricePerUnit: "",
};

function isReceiveFabricResponse(value: unknown): value is ReceiveFabricResponse {
  if (typeof value !== "object" || value === null) return false;
  const response = value as Record<string, unknown>;
  return response.success === true && typeof response.batchId === "string";
}

function getErrorMessage(value: unknown): string {
  if (typeof value !== "object" || value === null) {
    return "The fabric receipt could not be saved. Please try again.";
  }
  const response = value as Record<string, unknown>;
  if (typeof response.message === "string") return response.message;
  if (Array.isArray(response.message)) return response.message.join(". ");
  return "The fabric receipt could not be saved. Please try again.";
}

export default function ReceiveFabricPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [suppliers, setSuppliers] = useState<MasterRecord[]>([]);
  const [fabricTypes, setFabricTypes] = useState<MasterRecord[]>([]);
  const [isLoadingMasters, setIsLoadingMasters] = useState(true);
  const [batchId, setBatchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = useMemo(() => {
    const quantity = Number(form.quantity);
    const price = Number(form.pricePerUnit);
    return Number.isFinite(quantity) && Number.isFinite(price)
      ? quantity * price
      : 0;
  }, [form.quantity, form.pricePerUnit]);

  useEffect(() => {
    let isMounted = true;

    async function loadMasterData() {
      try {
        const [supplierResponse, fabricTypeResponse] = await Promise.all([
          fetch(`\https://garment-erp-api-nr0i.onrender.com/master-data/suppliers`),
          fetch(`\https://garment-erp-api-nr0i.onrender.com/master-data/fabric-types`),
        ]);
        if (!supplierResponse.ok || !fabricTypeResponse.ok) {
          throw new Error("Master data could not be loaded.");
        }

        const supplierData = (await supplierResponse.json()) as MasterRecord[];
        const fabricTypeData = (await fabricTypeResponse.json()) as MasterRecord[];
        if (isMounted) {
          setSuppliers(supplierData);
          setFabricTypes(fabricTypeData);
        }
      } catch (loadError: unknown) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Master data could not be loaded.",
          );
        }
      } finally {
        if (isMounted) setIsLoadingMasters(false);
      }
    }

    void loadMasterData();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBatchId(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`\https://garment-erp-api-nr0i.onrender.com/inventory/receive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          pricePerUnit: Number(form.pricePerUnit),
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) throw new Error(getErrorMessage(result));
      if (!isReceiveFabricResponse(result)) {
        throw new Error("The server returned an unexpected response.");
      }

      setBatchId(result.batchId);
      setForm(initialForm);
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The fabric receipt could not be saved. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:disabled:bg-slate-800";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-wider">
            <span className="text-amber-500">GARMENT</span> ERP
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/master-data" className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              Master Data
            </Link>
            <span className="rounded-lg bg-slate-800 px-3 py-2 font-semibold text-amber-400">Receive Fabric</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-14">
        <section>
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">Procurement &amp; Raw Materials</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Receive raw fabric</h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">Record the supplier document, physical fabric details, and landed purchase value before generating Tag 1.</p>
          </div>

          {batchId && (
            <div role="status" className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-100 px-5 py-4 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Receipt completed</p>
              <p className="mt-1 text-lg font-bold">Fabric Received! Print Tag 1: {batchId}</p>
            </div>
          )}
          {error && <div role="alert" className="mb-6 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 font-medium text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Supplier
                <select required disabled={isLoadingMasters || suppliers.length === 0} value={form.supplierCode} onChange={(event) => setForm((current) => ({ ...current, supplierCode: event.target.value }))} className={fieldClass}>
                  <option value="">{isLoadingMasters ? "Loading suppliers…" : "Select supplier"}</option>
                  {suppliers.map((supplier) => <option key={supplier.id} value={supplier.code}>{supplier.code} — {supplier.name}</option>)}
                </select>
                {!isLoadingMasters && suppliers.length === 0 && <Link href="/master-data" className="mt-2 block text-xs font-medium text-amber-700 dark:text-amber-400">Add a supplier in Master Data first</Link>}
              </label>

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Fabric type
                <select required disabled={isLoadingMasters} value={form.fabricType} onChange={(event) => setForm((current) => ({ ...current, fabricType: event.target.value }))} className={fieldClass}>
                  <option value="">{isLoadingMasters ? "Loading fabric types…" : "Select fabric type"}</option>
                  {fabricTypes.map((fabricType) => <option key={fabricType.id} value={fabricType.code}>{fabricType.name}</option>)}
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Color<input required maxLength={50} value={form.color} onChange={(event) => setForm((current) => ({ ...current, color: event.target.value.toUpperCase() }))} placeholder="BLACK" className={fieldClass} /></label>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Supplier invoice number<input required maxLength={50} value={form.supplierInvoiceNumber} onChange={(event) => setForm((current) => ({ ...current, supplierInvoiceNumber: event.target.value }))} placeholder="INV-2026-001" className={fieldClass} /></label>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Delivery challan number<input required maxLength={50} value={form.supplierDeliveryChallanNumber} onChange={(event) => setForm((current) => ({ ...current, supplierDeliveryChallanNumber: event.target.value }))} placeholder="DC-2026-001" className={fieldClass} /></label>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Quantity<input required min="0.001" step="0.001" type="number" inputMode="decimal" value={form.quantity} onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))} placeholder="500" className={fieldClass} /></label>

              <fieldset>
                <legend className="text-sm font-semibold text-slate-700 dark:text-slate-200">Unit of measure</legend>
                <div className="mt-2 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                  {(["YARDS", "METERS"] as const).map((unit) => (
                    <label key={unit} className={`cursor-pointer rounded-lg px-4 py-2.5 text-center text-sm font-bold transition ${form.unitOfMeasure === unit ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                      <input className="sr-only" type="radio" name="unitOfMeasure" value={unit} checked={form.unitOfMeasure === unit} onChange={() => setForm((current) => ({ ...current, unitOfMeasure: unit }))} />
                      {unit === "YARDS" ? "Yards" : "Meters"}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Price per unit (PKR)<input required min="0.01" step="0.01" type="number" inputMode="decimal" value={form.pricePerUnit} onChange={(event) => setForm((current) => ({ ...current, pricePerUnit: event.target.value }))} placeholder="350.00" className={fieldClass} /></label>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900 dark:bg-amber-950/40">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">Calculated total</p>
                <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">PKR {total.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="mt-1 text-xs text-slate-500">Quantity × price per unit</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <p className="text-xs text-slate-500">The server recalculates the total before saving.</p>
              <button type="submit" disabled={isSubmitting || suppliers.length === 0} className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Receiving fabric…" : "Receive fabric & generate tag"}</button>
            </div>
          </form>
        </section>

        <aside className="h-fit rounded-3xl bg-slate-950 p-6 text-white shadow-xl dark:border dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Receipt summary</p>
          <div className="mt-5 space-y-4 text-sm">
            <div><p className="text-slate-500">Supplier</p><p className="mt-1 font-semibold">{form.supplierCode || "Not selected"}</p></div>
            <div><p className="text-slate-500">Fabric / Color</p><p className="mt-1 font-semibold">{fabricTypes.find((item) => item.code === form.fabricType)?.name || "Not selected"}{form.color ? ` · ${form.color}` : ""}</p></div>
            <div><p className="text-slate-500">Quantity</p><p className="mt-1 font-semibold">{form.quantity || "0"} {form.unitOfMeasure}</p></div>
            <div className="border-t border-slate-800 pt-4"><p className="text-slate-500">Purchase total</p><p className="mt-1 text-xl font-black text-amber-400">PKR {total.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div>
          </div>
        </aside>
      </main>
    </div>
  );
}
