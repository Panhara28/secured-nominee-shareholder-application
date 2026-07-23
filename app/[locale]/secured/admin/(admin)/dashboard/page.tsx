import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import DashboardClient from "@/components/admin/DashboardClient";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

type DashboardStats = {
  totalShareholders: number;
  totalRequests: number;
  summary: {
    drafted: number;
    request: number;
    inReview: number;
    approved: number;
    rejected: number;
    returned: number;
    updateRequested: number;
  };
  recent: { id: number; requestNo: string; companyNameEn: string; status: string; submittedAt: string }[];
};

type UsersListResponse = {
  data: {
    id: number;
    fullName: string;
    companyName: string | null;
    email: string;
    username: string;
    isActive: boolean;
    status: "PENDING" | "RETURNED" | "ACTIVE";
    createdAt: string;
  }[];
};

async function fetchJson<T>(path: string, cookieHeader: string): Promise<T | null> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [stats, pendingUsers, returnedUsers] = await Promise.all([
    fetchJson<DashboardStats>("/secured/admin/dashboard/stats", cookieHeader),
    fetchJson<UsersListResponse>(
      "/secured/admin/users?status=PENDING&sortKey=createdAt&sortDir=desc&page=1&limit=5",
      cookieHeader,
    ),
    fetchJson<UsersListResponse>(
      "/secured/admin/users?status=RETURNED&sortKey=createdAt&sortDir=desc&page=1&limit=5",
      cookieHeader,
    ),
  ]);

  const totalShareholders = stats?.totalShareholders ?? 0;
  const totalRequests = stats?.totalRequests ?? 0;
  const summary = stats?.summary ?? {
    drafted: 0,
    request: 0,
    inReview: 0,
    approved: 0,
    rejected: 0,
    returned: 0,
    updateRequested: 0,
  };
  const recent = stats?.recent ?? [];

  const recentUsers = [...(pendingUsers?.data ?? []), ...(returnedUsers?.data ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <DashboardClient
      totalShareholders={totalShareholders}
      totalRequests={totalRequests}
      summary={summary}
      recent={recent}
      recentUsers={recentUsers}
    />
  );
}
