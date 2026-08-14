import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RevisionLogBrowser from "@/components/beneficiary/RevisionLogBrowser";

export const metadata: Metadata = {
  title: "Admin Diff & Compare — Secured Nominee Shareholder",
  description: "Review field-level changes across request edit history.",
};

type Props = { params: Promise<{ locale: string }> };

export default async function AdminRevisionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("beneficiary.revisions");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("diffCompare")}</h1>
      <Suspense>
        <RevisionLogBrowser fetchUrl="/api/secured/admin/revisions" requestLinkBase="/secured/admin/requests" />
      </Suspense>
    </div>
  );
}
