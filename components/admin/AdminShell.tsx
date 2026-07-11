"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import {
  LayoutDashboard, UserCog, ShieldCheck, ChevronDown,
  User, EditIcon, Menu, X, LogOut, FileText, History, GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import AdminNotificationBell from "@/components/admin/AdminNotificationBell";

type Props = {
  fullName: string;
  children: React.ReactNode;
};

type NavChild = { label: string; href: string; icon?: React.ElementType };
type NavItem = { label: string; href?: string; icon: React.ElementType; children?: NavChild[] };

export default function AdminShell({ fullName, children }: Props) {
  const t = useTranslations("admin.nav");
  const trev = useTranslations("beneficiary.revisions");
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch("/api/secured/admin/auth/logout", { method: "POST" });
    router.push("/secured/admin/login");
    router.refresh();
  };

  const navItems: NavItem[] = [
    { label: t("dashboard"), href: "/secured/admin/dashboard", icon: LayoutDashboard },
    { label: t("requests"), href: "/secured/admin/requests", icon: FileText },
    { label: t("activitiesLogs"), href: "/secured/admin/activities-logs", icon: History },
    { label: trev("diffCompare"), href: "/secured/admin/revisions", icon: GitCompare },
    { label: t("users"), href: "/secured/admin/users", icon: User },
    {
      label: t("internalUsers"),
      icon: UserCog,
      children: [
        { label: t("allInternalUsers"), href: "/secured/admin/internal-users", icon: User },
        { label: t("createInternalUser"), href: "/secured/admin/internal-users/add", icon: EditIcon },
      ],
    },
    {
      label: t("rolesPermissions"),
      icon: ShieldCheck,
      children: [
        { label: t("assignRole"), href: "/secured/admin/roles", icon: ShieldCheck },
      ],
    },
  ];

  useEffect(() => {
    const active = navItems.find((item) => item.children?.some((c) => pathname.startsWith(c.href)));
    if (active) setOpenDropdown(active.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SidebarContent = (
    <>
      <div className="flex items-center gap-3 px-4 h-24 py-3 border-b border-blue-600/40 flex-shrink-0">
        <Image src="/moc-logo.png" alt="ក្រសួងពាណិជ្ជកម្ម" width={64} height={64} className="object-contain flex-shrink-0" />
        <div className="min-w-0 overflow-hidden">
          <p className="text-base font-bold text-white leading-tight truncate">ក្រសួងពាណិជ្ជកម្ម</p>
          <p className="text-[11px] font-semibold text-blue-100 leading-tight mt-0.5 truncate">Ministry Of Commerce</p>
          <p className="text-[10px] text-blue-200/80 leading-tight mt-0.5 truncate">{t("portalName")}</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {navItems.map((item) => {
          if (item.children) {
            const isOpen = openDropdown === item.label;
            const anyChildActive = item.children.some((c) => pathname.startsWith(c.href));
            const Icon = item.icon;
            return (
              <div key={item.label} className="mb-1">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-sm font-medium",
                    anyChildActive ? "bg-white/15 text-white" : "text-blue-100 hover:bg-blue-800/70 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="mt-1 ml-4 border-l border-blue-600/40 pl-3 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors text-sm",
                          pathname.startsWith(child.href)
                            ? "bg-white/15 text-white font-medium"
                            : "text-blue-200 hover:bg-blue-800/70 hover:text-white"
                        )}
                      >
                        {child.icon && <child.icon className="h-4 w-4 flex-shrink-0" />}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href!}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 mb-1 transition-colors text-sm font-medium",
                active ? "bg-white/15 text-white" : "text-blue-100 hover:bg-blue-800/70 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
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
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
        {SidebarContent}
      </aside>

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
            <AdminNotificationBell />
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
