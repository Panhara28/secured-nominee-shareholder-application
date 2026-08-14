import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import AdminCreateRoleForm from "@/components/admin/AdminCreateRoleForm";

export const metadata: Metadata = {
  title: "Create Role — Secured Nominee Shareholder",
  description: "Add a new staff role.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminCreateRolePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.roles");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("addRole")}</h1>
      <AdminCreateRoleForm />
    </div>
  );
}
