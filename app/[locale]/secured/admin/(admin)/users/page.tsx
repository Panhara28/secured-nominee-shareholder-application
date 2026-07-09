import { setRequestLocale, getTranslations } from "next-intl/server";
import { UserCog } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminUsersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.nav");
  const tc = await getTranslations("admin.comingSoon");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("users")}</h1>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-16 flex flex-col items-center justify-center text-center gap-2">
        <UserCog className="h-8 w-8 text-slate-300" />
        <p className="text-sm text-slate-500">{tc("message")}</p>
      </div>
    </div>
  );
}
