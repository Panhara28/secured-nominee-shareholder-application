"use client";

export function requestNotificationPermission(): void {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
}

export function notify(title: string, options?: NotificationOptions): void {
  if (typeof window === "undefined" || !("Notification" in window)) {
    console.warn("[notify] Notification API not available in this browser");
    return;
  }
  if (Notification.permission !== "granted") {
    console.warn("[notify] permission is", Notification.permission, "— not showing:", title);
    return;
  }
  try {
    const n = new Notification(title, options);
    console.info("[notify] Notification constructed:", title, n);
  } catch (err) {
    // some browsers (e.g. mobile Safari) throw on unsupported constructor use
    console.error("[notify] failed to construct Notification:", err);
  }
}
