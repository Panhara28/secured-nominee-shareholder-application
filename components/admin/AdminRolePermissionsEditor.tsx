"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { CheckCircle2, Copy, Loader2, Save, ShieldCheck, X } from "lucide-react";
import { useRouter } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PermissionRow = {
  moduleId: number;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  module: { id: number; name: string; label: string };
};

type RoleDetail = { id: number; slug: string; name: string; description: string | null };
type RoleOption = { id: number; slug: string; name: string };

const ACTIONS = ["create", "read", "update", "delete"] as const;
type Action = (typeof ACTIONS)[number];

export default function AdminRolePermissionsEditor({ slug }: { slug: string }) {
  const t = useTranslations("admin.roles.editForm");
  const router = useRouter();

  const [role, setRole] = useState<RoleDetail | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<PermissionRow[]>([]);
  const [otherRoles, setOtherRoles] = useState<RoleOption[]>([]);
  const [cloneFromSlug, setCloneFromSlug] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [savingDetails, setSavingDetails] = useState(false);
  const [savingPermissions, setSavingPermissions] = useState(false);
  const [cloning, setCloning] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const [detailRes, permsRes, rolesRes] = await Promise.all([
          fetch(`/api/roles/${slug}`),
          fetch(`/api/roles/permissions/${slug}`),
          fetch(`/api/roles/lists?limit=100`),
        ]);
        if (!detailRes.ok || !permsRes.ok) throw new Error();
        const detailJson = await detailRes.json();
        const permsJson = await permsRes.json();
        const rolesJson = rolesRes.ok ? await rolesRes.json() : { data: [] };
        if (cancelled) return;

        setRole(detailJson.data);
        setName(detailJson.data.name);
        setDescription(detailJson.data.description ?? "");
        setPermissions(permsJson.permissions);
        setOtherRoles(
          (rolesJson.data as { id: number; slug: string; name: string }[]).filter((r) => r.slug !== slug),
        );
      } catch {
        if (!cancelled) setLoadError(t("loadError"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, t]);

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDetails(true);
    try {
      const res = await fetch(`/api/roles/update/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: description || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("detailsError"));
      }
      toast.success(t("detailsSuccess"));
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("detailsError"));
    } finally {
      setSavingDetails(false);
    }
  };

  const togglePermission = (moduleId: number, action: Action) => {
    setPermissions((prev) =>
      prev.map((p) => (p.moduleId === moduleId ? { ...p, [action]: !p[action] } : p)),
    );
  };

  const handleSavePermissions = async () => {
    setSavingPermissions(true);
    try {
      const res = await fetch(`/api/roles/permissions/update/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          permissions: permissions.map((p) => ({
            moduleId: p.moduleId,
            create: p.create,
            read: p.read,
            update: p.update,
            delete: p.delete,
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("permissionsError"));
      }
      toast.success(t("permissionsSuccess"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("permissionsError"));
    } finally {
      setSavingPermissions(false);
    }
  };

  const handleClone = async () => {
    if (!role || !cloneFromSlug) return;
    const source = otherRoles.find((r) => r.slug === cloneFromSlug);
    if (!source) return;
    setCloning(true);
    try {
      const res = await fetch(`/api/roles/permissions/clone/${role.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromRoleId: source.id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("cloneError"));
      }
      const permsRes = await fetch(`/api/roles/permissions/${slug}`);
      const permsJson = await permsRes.json();
      setPermissions(permsJson.permissions);
      toast.success(t("cloneSuccess"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("cloneError"));
    } finally {
      setCloning(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400 inline-block" />
      </div>
    );
  }

  if (loadError || !role) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {loadError ?? t("loadError")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSaveDetails}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 max-w-2xl"
      >
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <div className="relative mt-1">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="name"
              type="text"
              required
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="description">{t("description")}</Label>
          <textarea
            id="description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit" disabled={savingDetails}>
          {savingDetails ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("savingDetails")}
            </>
          ) : (
            t("saveDetails")
          )}
        </Button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">{t("permissionsTitle")}</h3>
          {otherRoles.length > 0 && (
            <div className="flex items-center gap-2">
              <select
                value={cloneFromSlug}
                onChange={(e) => setCloneFromSlug(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">{t("cloneFromPlaceholder")}</option>
                {otherRoles.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleClone}
                disabled={!cloneFromSlug || cloning}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {cloning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Copy className="h-3.5 w-3.5" />}
                {t("cloneButton")}
              </button>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {t("module")}
                </th>
                {ACTIONS.map((action) => (
                  <th
                    key={action}
                    className="px-4 py-2.5 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    {t(action)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr key={perm.moduleId} className="border-b border-slate-100">
                  <td className="px-4 py-2.5 text-slate-800">{perm.module.label}</td>
                  {ACTIONS.map((action) => (
                    <td key={action} className="px-4 py-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => togglePermission(perm.moduleId, action)}
                        className="inline-flex items-center justify-center"
                      >
                        {perm[action] ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300" />
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-slate-100">
          <Button type="button" onClick={handleSavePermissions} disabled={savingPermissions}>
            {savingPermissions ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("savingPermissions")}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {t("savePermissions")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
