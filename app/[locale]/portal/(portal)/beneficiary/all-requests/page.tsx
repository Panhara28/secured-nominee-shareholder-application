import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "All Requests — Secured Nominee Shareholder",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AllRequestsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("beneficiary.allRequests");

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800">{t("pageTitle")}</h1>
        <Link
          href="/portal/beneficiary/request"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Request
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 text-center text-slate-400 text-sm">
        {t("empty")}
      </div>
    </div>
  );
}
