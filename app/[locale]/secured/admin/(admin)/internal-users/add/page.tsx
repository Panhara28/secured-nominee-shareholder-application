import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import AdminInternalUserForm from "@/components/admin/AdminInternalUserForm";

export const metadata: Metadata = {
  title: "Create User — Secured Nominee Shareholder",
  description: "Add a new staff or administrator account.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminCreateInternalUserPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.nav");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("createInternalUser")}</h1>
      <AdminInternalUserForm />
    </div>
  );
}
