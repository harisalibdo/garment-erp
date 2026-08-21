"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryItems = [
  { href: "/", label: "Home" },
  { href: "/master-data", label: "Master Data" },
  { href: "/accounts", label: "Accounts" },
  { href: "/quality-control", label: "Quality Control" },
];

export function AppHeader() {
  const pathname = usePathname();
  const transactionsActive =
    pathname.startsWith("/transactions") || pathname.startsWith("/inventory");

  const navClass = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      active
        ? "bg-amber-500 text-slate-950"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white shadow-lg shadow-slate-950/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-3 sm:px-8">
        <Link href="/" className="mr-auto text-xl font-black tracking-wider">
          <span className="text-amber-500">GARMENT</span> ERP
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {primaryItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navClass(
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <Link href="/transactions" className={navClass(transactionsActive)}>
              Transactions <span aria-hidden="true">⌄</span>
            </Link>
            <div className="invisible absolute left-0 top-full w-56 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl">
                <Link
                  href="/inventory/receive"
                  className={`block rounded-lg px-4 py-3 text-sm transition ${
                    pathname.startsWith("/inventory")
                      ? "bg-amber-500 font-bold text-slate-950"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <span className="block font-semibold">Inventory</span>
                  <span className="mt-0.5 block text-xs opacity-70">Receive raw fabric</span>
                </Link>
              </div>
            </div>
          </div>

          {primaryItems.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navClass(pathname.startsWith(item.href))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200">
            Menu
          </summary>
          <nav className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl">
            {primaryItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
                {item.label}
              </Link>
            ))}
            <div className="mt-1 border-y border-slate-700 py-1">
              <Link href="/transactions" className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">Transactions</Link>
              <Link href="/inventory/receive" className="ml-3 block rounded-lg px-4 py-2 text-sm text-amber-400 hover:bg-slate-800">Inventory</Link>
            </div>
            {primaryItems.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>

        <div className="hidden border-l border-slate-700 pl-4 xl:block">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Signed in as</p>
          <p className="text-xs font-semibold text-slate-200">Mr. Irfan · Ops Head</p>
        </div>
      </div>
    </header>
  );
}
