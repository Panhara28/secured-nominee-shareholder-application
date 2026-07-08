"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function AuthBrandSection() {
  const t = useTranslations("auth.brand");

  const backgroundPattern =
    "data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.04'%3E%3Cpath d='M36 0v72M0 36h72'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,197,253,0.18),transparent_34%),radial-gradient(circle_at_25%_75%,rgba(59,130,246,0.16),transparent_40%),radial-gradient(circle_at_85%_25%,rgba(37,99,235,0.18),transparent_34%)]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("${backgroundPattern}")` }} />

      <div className="relative z-10 flex h-full flex-col justify-between px-12 py-16 text-white">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/moc-logo.png" alt="Ministry of Commerce" width={120} height={120} className="object-contain" />
            <div>
              <h1 className="text-4xl font-extrabold leading-tight">ក្រសួងពាណិជ្ជកម្ម</h1>
              <p className="mt-1 text-lg font-semibold text-blue-100">Ministry Of Commerce</p>
              <p className="mt-0.5 text-lg text-blue-200/80">Business Registration Portal</p>
            </div>
          </div>

          <h2 className="mt-10 text-3xl font-semibold leading-tight">{t("headline")}</h2>
          <p className="mt-4 text-lg text-slate-200/80 leading-relaxed">{t("description")}</p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200/70">{t("stat1Label")}</p>
              <p className="mt-2 text-2xl font-semibold">{t("stat1Value")}</p>
              <p className="text-xs text-slate-300/70">{t("stat1Sub")}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">{t("stat2Label")}</p>
              <p className="mt-2 text-2xl font-semibold">{t("stat2Value")}</p>
              <p className="text-xs text-slate-300/70">{t("stat2Sub")}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm text-slate-200/80">
          {(["feature1", "feature2", "feature3", "feature4"] as const).map((key) => (
            <div key={key}>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">{t("feature")}</p>
              <p className="mt-2 text-lg font-medium text-white">{t(key)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-blue-400/12 blur-3xl" />
      <div className="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-blue-500/12 blur-3xl" />
    </div>
  );
}
