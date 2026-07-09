"use client";

import BeneficiaryRequestForm from "@/components/portal/beneficiary/BeneficiaryRequestForm";

export default function EditRequest({ id }: { id: string }) {
  return <BeneficiaryRequestForm editId={id} />;
}
