"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import { LayoutDashboard, Users, Menu, X, LogOut, User, ChevronDown, ListChecks, FilePlus2, FileEdit, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import NotificationBell from "@/components/portal/NotificationBell";

type Props = {
  fullName: string;
  navDisabled?: boolean;
  children: React.ReactNode;
};

export default function PortalShell({ fullName, navDisabled = false, children }: Props) {
  const t = useTranslations("portal.nav");
  const tAllRequests = useTranslations("beneficiary.allRequests");
  const tRequest = useTranslations("beneficiary.request");
  const tRevisions = useTranslations("beneficiary.revisions");
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [beneficiaryOpen, setBeneficiaryOpen] = useState(
    !navDisabled && pathname.startsWith("/portal/beneficiary")
  );

  const isEditRequestPage = /^\/portal\/beneficiary\/all-requests\/[^/]+\/edit$/.test(pathname);

  const navLinkClick = (e: React.MouseEvent) => {
    if (navDisabled) {
      e.preventDefault();
      return;
    }
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-blue-600/40 flex-shrink-0">
        <Image src="/moc-logo.png" alt="ក្រសួងពាណិជ្ជកម្ម" width={64} height={64} className="object-contain flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-base font-bold text-white leading-tight truncate">ក្រសួងពាណិជ្ជកម្ម</p>
          <p className="text-[11px] font-semibold text-blue-100 leading-tight mt-0.5 truncate">Ministry Of Commerce</p>
          <p className="text-[10px] text-blue-200/80 leading-tight mt-0.5">{t("portalName")}</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {/* Dashboard */}
        <Link
          href="/portal/dashboard"
          onClick={navLinkClick}
          aria-disabled={navDisabled}
          tabIndex={navDisabled ? -1 : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            navDisabled
              ? "text-blue-100/40 cursor-not-allowed"
              : pathname === "/portal/dashboard" || pathname.startsWith("/portal/dashboard/")
                ? "bg-white/15 text-white"
                : "text-blue-100 hover:bg-blue-800/70 hover:text-white"
          )}
        >
          <LayoutDashboard className="h-4.5 w-4.5" />
          {t("dashboard")}
        </Link>

        {/* Beneficiary Owner dropdown */}
        <div>
          <button
            onClick={() => !navDisabled && setBeneficiaryOpen((v) => !v)}
            disabled={navDisabled}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              navDisabled
                ? "text-blue-100/40 cursor-not-allowed"
                : pathname.startsWith("/portal/beneficiary")
                  ? "bg-white/15 text-white"
                  : "text-blue-100 hover:bg-blue-800/70 hover:text-white"
            )}
          >
            <Users className="h-4.5 w-4.5 flex-shrink-0" />
            <span className="flex-1 text-left">{t("beneficiaryOwner")}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", beneficiaryOpen && "rotate-180")} />
          </button>
          {beneficiaryOpen && !navDisabled && (
            <div className="mt-1 ml-4 border-l border-blue-600/40 pl-3 space-y-0.5">
              <Link
                href="/portal/beneficiary/all-requests"
                onClick={navLinkClick}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors text-sm",
                  pathname.startsWith("/portal/beneficiary/all-requests") && !isEditRequestPage
                    ? "bg-white/15 text-white font-medium"
                    : "text-blue-200 hover:bg-blue-800/70 hover:text-white"
                )}
              >
                <ListChecks className="h-4 w-4 flex-shrink-0" />
                {tAllRequests("pageTitle")}
              </Link>
              <Link
                href="/portal/beneficiary/request"
                onClick={navLinkClick}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors text-sm",
                  pathname === "/portal/beneficiary/request" || pathname.startsWith("/portal/beneficiary/request/")
                    ? "bg-white/15 text-white font-medium"
                    : "text-blue-200 hover:bg-blue-800/70 hover:text-white"
                )}
              >
                <FilePlus2 className="h-4 w-4 flex-shrink-0" />
                {tRequest("pageTitle")}
              </Link>
              <Link
                href="/portal/beneficiary/request-update"
                onClick={navLinkClick}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors text-sm",
                  pathname.startsWith("/portal/beneficiary/request-update") || isEditRequestPage
                    ? "bg-white/15 text-white font-medium"
                    : "text-blue-200 hover:bg-blue-800/70 hover:text-white"
                )}
              >
                <FileEdit className="h-4 w-4 flex-shrink-0" />
                {t("requestToUpdate")}
              </Link>
              <Link
                href="/portal/beneficiary/revisions"
                onClick={navLinkClick}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors text-sm",
                  pathname.startsWith("/portal/beneficiary/revisions")
                    ? "bg-white/15 text-white font-medium"
                    : "text-blue-200 hover:bg-blue-800/70 hover:text-white"
                )}
              >
                <GitCompare className="h-4 w-4 flex-shrink-0" />
                {tRevisions("diffCompare")}
              </Link>
            </div>
          )}
        </div>

      </nav>
      <div className="px-3 py-4 border-t border-blue-600/40">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-800/70 hover:text-white transition-colors"
        >
          <LogOut className="h-4.5 w-4.5" />
          {t("signOut")}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 z-10">
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 lg:px-6">
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="ml-auto flex items-center gap-3">
            <NotificationBell />
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-700" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700">{fullName}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
