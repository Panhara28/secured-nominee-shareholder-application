import { useTranslations } from "next-intl";
import { FilePen } from "lucide-react";

// Shown next to an APPROVED request's status badge while the applicant has
// saved an update to it but not yet sent it ("Request To Update"). The
// request itself stays Approved — this only flags the separate draft.
export default function UpdateDraftedTag() {
  const t = useTranslations("beneficiary.allRequests");
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 whitespace-nowrap">
      <FilePen className="h-3 w-3" />
      {t("updateDrafted")}
    </span>
  );
}
