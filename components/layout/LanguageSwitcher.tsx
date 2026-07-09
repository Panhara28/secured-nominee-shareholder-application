"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "@/lib/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    router.replace(pathname, { locale: locale === "km" ? "en" : "km" });
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
    >
      <Globe className="h-3.5 w-3.5 text-slate-400 mr-0.5" />
      <span className={locale === "km" ? "text-blue-600 font-semibold" : "text-slate-400"}>ខ្មែរ</span>
      <span className="text-slate-300">/</span>
      <span className={locale === "en" ? "text-blue-600 font-semibold" : "text-slate-400"}>EN</span>
    </button>
  );
}
