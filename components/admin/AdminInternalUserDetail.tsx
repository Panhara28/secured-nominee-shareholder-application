"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowLeft, CheckCircle2, Loader2, Mail, Pencil, Phone, ShieldCheck, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

function formatDateTime(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const date = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} ${time}`;
}

function Field({ label, value, icon }: { label: string; value: string | null | undefined; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800 flex items-center gap-1.5">
        {icon}
        {value || "-"}
      </p>
    </div>
  );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
        <span className="text-blue-600">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

type PermissionRow = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  module: { name: string; label: string };
};

type InternalUserDetailData = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  phoneNumber: string | null;
  isActive: boolean;
  createdAt: string;
  role: { name: string; description: string | null; permissions: PermissionRow[] } | null;
};

export default function AdminInternalUserDetail({ id }: { id: string }) {
  const t = useTranslations("admin.internalUsers");
  const ta = useTranslations("beneficiary.allRequests");

  const [data, setData] = useState<InternalUserDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/secured/admin/internal-users/${id}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(t("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id, t]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400 inline-block" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <Link href="/secured/admin/internal-users" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {ta("backToList")}
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? ta("notFound")}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/secured/admin/internal-users" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {ta("backToList")}
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-semibold text-slate-800">{data.fullName}</h1>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
              data.isActive ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
            )}
          >
            {data.isActive ? t("statusActive") : t("statusInactive")}
          </span>
          <Link
            href={`/secured/admin/internal-users/${id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
            {t("edit")}
          </Link>
        </div>
      </div>

      <SectionCard icon={<User className="h-4 w-4" />} title={t("col.name")}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <Field label={t("col.name")} value={data.fullName} />
          <Field label={t("col.role")} value={data.role?.name} icon={<ShieldCheck className="h-3.5 w-3.5 text-slate-400" />} />
          <Field label={t("col.createdAt")} value={formatDateTime(data.createdAt)} />
          <Field label="Email" value={data.email} icon={<Mail className="h-3.5 w-3.5 text-slate-400" />} />
          <Field label="Username" value={`@${data.username}`} />
          <Field label="Phone" value={data.phoneNumber} icon={<Phone className="h-3.5 w-3.5 text-slate-400" />} />
        </div>
      </SectionCard>

      {data.role && (
        <SectionCard icon={<ShieldCheck className="h-4 w-4" />} title={data.role.name}>
          {data.role.description && (
            <p className="text-sm text-slate-500 mb-4">{data.role.description}</p>
          )}
          {data.role.permissions.length === 0 ? (
            <p className="text-sm text-slate-400">-</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Module</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Create</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Read</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Update</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.role.permissions.map((p) => (
                    <tr key={p.module.name} className="border-b border-slate-100">
                      <td className="px-3 py-2.5 text-slate-800">{p.module.label}</td>
                      {[p.create, p.read, p.update, p.delete].map((v, i) => (
                        <td key={i} className="px-3 py-2.5 text-center">
                          {v ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 inline-block" />
                          ) : (
                            <X className="h-4 w-4 text-slate-300 inline-block" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      )}
    </div>
  );
}
