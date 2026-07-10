import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import RevisionLogBrowser from "@/components/beneficiary/RevisionLogBrowser";

type Props = { params: Promise<{ locale: string }> };

export default async function PortalRevisionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("beneficiary.revisions");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-800">{t("diffCompare")}</h1>
      <Suspense>
        <RevisionLogBrowser fetchUrl="/api/portal/beneficiary/revisions" requestLinkBase="/portal/beneficiary/all-requests" />
      </Suspense>
    </div>
  );
}
