import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RequestToDissolveSearch from "@/components/portal/beneficiary/RequestToDissolveSearch";

export const metadata: Metadata = {
  title: "Request Dissolve — Secured Nominee Shareholder",
  description: "Search for an approved request and submit a request to dissolve the agreement.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function RequestToDissolvePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portal.nav");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("requestDissolve")}</h1>
      <RequestToDissolveSearch />
    </div>
  );
}
