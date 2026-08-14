import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EditIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Create User — Secured Nominee Shareholder",
  description: "Add a new staff or administrator account.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminCreateInternalUserPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.nav");
  const tc = await getTranslations("admin.comingSoon");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("createInternalUser")}</h1>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 flex flex-col items-center justify-center text-center gap-2">
        <EditIcon className="h-8 w-8 text-slate-300" />
        <p className="text-sm text-slate-500">{tc("message")}</p>
      </div>
    </div>
  );
}
