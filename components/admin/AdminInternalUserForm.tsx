"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2, User, Mail, Lock, Phone, ShieldCheck } from "lucide-react";
import { useRouter } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Role = { id: number; name: string };

type FormState = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: string;
  isActive: boolean;
};

const emptyState: FormState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  roleId: "",
  isActive: true,
};

type UserDetail = {
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  role: { id: number } | null;
};

export default function AdminInternalUserForm({ userId }: { userId?: string }) {
  const isEdit = Boolean(userId);
  const t = useTranslations("admin.internalUsers.form");
  const tCreate = useTranslations("admin.internalUsers.create");
  const tEdit = useTranslations("admin.internalUsers.editForm");
  const router = useRouter();

  const [formData, setFormData] = useState<FormState>(emptyState);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRoles() {
      setRolesLoading(true);
      setRolesError(null);
      try {
        const res = await fetch("/api/roles/lists?limit=100");
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (!cancelled) setRoles(json.data ?? []);
      } catch {
        if (!cancelled) setRolesError(t("roleLoadError"));
      } finally {
        if (!cancelled) setRolesLoading(false);
      }
    }

    fetchRoles();
    return () => {
      cancelled = true;
    };
  }, [t]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function fetchUser() {
      setUserLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/secured/admin/internal-users/${userId}`);
        if (!res.ok) throw new Error();
        const data: UserDetail = await res.json();
        if (cancelled) return;
        setFormData({
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          password: "",
          phoneNumber: data.phoneNumber ?? "",
          roleId: data.role?.id ? String(data.role.id) : "",
          isActive: data.isActive,
        });
      } catch {
        if (!cancelled) setError(tEdit("loadError"));
      } finally {
        if (!cancelled) setUserLoading(false);
      }
    }

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [userId, tEdit]);

  const field = (id: keyof Omit<FormState, "isActive">) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((p) => ({ ...p, [id]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const errorFallback = isEdit ? tEdit("error") : tCreate("error");
    try {
      const res = await fetch(
        isEdit ? `/api/secured/admin/internal-users/${userId}` : "/api/secured/admin/internal-users",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            // Username and password are not editable from this form - see
            // the read-only username field and the removed password field below.
            ...(isEdit ? {} : { username: formData.username, password: formData.password }),
            email: formData.email,
            phoneNumber: formData.phoneNumber || undefined,
            roleId: Number(formData.roleId),
            isActive: formData.isActive,
          }),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? errorFallback);
      }
      toast.success(isEdit ? tEdit("success") : tCreate("success"));
      router.push(isEdit ? `/secured/admin/internal-users/${userId}` : "/secured/admin/internal-users");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : errorFallback);
      setIsSubmitting(false);
    }
  };

  if (userLoading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400 inline-block" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 max-w-2xl">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div>
        <Label htmlFor="fullName">{t("fullName")}</Label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            id="fullName"
            type="text"
            required
            className="pl-10"
            placeholder={t("fullNamePlaceholder")}
            value={formData.fullName}
            onChange={field("fullName")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="username">{t("username")}</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="username"
              type="text"
              required={!isEdit}
              readOnly={isEdit}
              disabled={isEdit}
              className={cn("pl-10", isEdit && "bg-slate-50 text-slate-500")}
              placeholder={t("usernamePlaceholder")}
              value={formData.username}
              onChange={field("username")}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="email"
              type="email"
              required
              className="pl-10"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={field("email")}
            />
          </div>
        </div>
      </div>

      <div className={cn("grid grid-cols-1 gap-4", !isEdit && "sm:grid-cols-2")}>
        {!isEdit && (
          <div>
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                className="pl-10"
                placeholder={tCreate("passwordPlaceholder")}
                value={formData.password}
                onChange={field("password")}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">{tCreate("passwordHint")}</p>
          </div>
        )}
        <div>
          <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="phoneNumber"
              type="text"
              className="pl-10"
              placeholder={t("phoneNumberPlaceholder")}
              value={formData.phoneNumber}
              onChange={field("phoneNumber")}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="roleId">{t("role")}</Label>
        <div className="relative mt-1">
          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 z-10" />
          <select
            id="roleId"
            required
            disabled={rolesLoading}
            value={formData.roleId}
            onChange={(e) => setFormData((p) => ({ ...p, roleId: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="" disabled>
              {rolesLoading ? "…" : t("rolePlaceholder")}
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        {rolesError && <p className="mt-1 text-xs text-red-600">{rolesError}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        {t("isActive")}
      </label>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting || rolesLoading}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEdit ? tEdit("submitting") : tCreate("submitting")}
            </>
          ) : isEdit ? (
            tEdit("submit")
          ) : (
            tCreate("submit")
          )}
        </Button>
        <button
          type="button"
          onClick={() =>
            router.push(isEdit ? `/secured/admin/internal-users/${userId}` : "/secured/admin/internal-users")
          }
          className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}
