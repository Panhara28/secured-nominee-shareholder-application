import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import AdminInternalUserForm from "@/components/admin/AdminInternalUserForm";

export const metadata: Metadata = {
  title: "Edit Internal User — Secured Nominee Shareholder",
  description: "Update a staff or administrator account's details, role, or password.",
};

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminEditInternalUserPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.internalUsers");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("edit")}</h1>
      <AdminInternalUserForm userId={id} />
    </div>
  );
}
