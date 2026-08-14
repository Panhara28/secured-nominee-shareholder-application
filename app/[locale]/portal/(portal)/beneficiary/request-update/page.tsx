import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RequestToUpdateSearch from "@/components/portal/beneficiary/RequestToUpdateSearch";

export const metadata: Metadata = {
  title: "Request to Update — Secured Nominee Shareholder",
  description: "Search for an approved request and submit an update.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function RequestToUpdatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portal.nav");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("requestToUpdate")}</h1>
      <RequestToUpdateSearch />
    </div>
  );
}
