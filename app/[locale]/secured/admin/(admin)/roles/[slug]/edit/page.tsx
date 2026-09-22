import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/lib/navigation";
import AdminRolePermissionsEditor from "@/components/admin/AdminRolePermissionsEditor";

export const metadata: Metadata = {
  title: "Edit Role — Secured Nominee Shareholder",
  description: "Update a role's details and module permissions.",
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function AdminEditRolePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.roles");

  return (
    <div className="space-y-4">
      <Link href="/secured/admin/roles" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t("backToList")}
      </Link>
      <h1 className="text-xl font-semibold text-slate-800">{t("edit")}</h1>
      <AdminRolePermissionsEditor slug={slug} />
    </div>
  );
}
