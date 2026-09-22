import type { Metadata } from "next";
import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import AdminProfileClient from "@/components/admin/AdminProfileClient";

export const metadata: Metadata = {
  title: "My Profile — Secured Nominee Shareholder",
  description: "View your account information and change your password.",
};

type Props = { params: Promise<{ locale: string }> };

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

type AdminMe = {
  fullName: string;
  username: string;
  email: string;
  staffRoleName: string | null;
};

export default async function AdminProfilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cookieHeader = (await cookies()).toString();
  const res = await fetch(`${API_BASE_URL}/secured/admin/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const me = res.ok ? ((await res.json()) as AdminMe) : null;

  return <AdminProfileClient me={me} />;
}
