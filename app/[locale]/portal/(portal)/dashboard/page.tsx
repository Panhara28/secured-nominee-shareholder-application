import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { requireShareholder } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/lib/navigation";
import { Briefcase, Clock, FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard — Secured Nominee Shareholder",
};

type Props = { params: Promise<{ locale: string }> };

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await requireShareholder();
  if (!session) return redirect({ href: "/portal/login", locale });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { fullName: true, email: true, createdAt: true },
  });
  if (!user) return redirect({ href: "/portal/login", locale });

  const t = await getTranslations("portal.dashboard");

  const stats = [
    {
      label: t("shareholdingsLabel"),
      value: t("shareholdingsValue"),
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: t("pendingLabel"),
      value: t("pendingValue"),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: t("documentsLabel"),
      value: t("documentsValue"),
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-blue-200" />
          </div>
          <div>
            <p className="text-blue-200 text-sm">{t("welcome")}</p>
            <h1 className="text-xl font-bold">{user.fullName}</h1>
          </div>
        </div>
        <p className="text-blue-200/80 text-sm">
          Secured Nominee Shareholder Portal — Simulation Mode
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm"
            >
              <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">{t("recentActivity")}</h2>
        </div>
        <div className="px-5 py-10 text-center text-slate-400 text-sm">
          {t("noActivity")}
        </div>
      </div>
    </div>
  );
}
