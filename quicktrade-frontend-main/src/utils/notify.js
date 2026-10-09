// src/utils/notify.js
export async function ensureNotificationPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch {
    return false;
  }
}

export async function notify(title, body, options = {}) {
  const ok = await ensureNotificationPermission();
  if (!ok) {
    // Fallback: console + alert-free; silently skip
    console.log("[notify]", title, body);
    return;
  }
  try {
    new Notification(title, {
      body,
      icon: "/icons/pwa-192x192.png",
      badge: "/icons/pwa-192x192.png",
      ...options,
    });
  } catch (e) {
    console.error("Notification failed:", e);
  }
}