import { EventEmitter } from "node:events";

const bus = new EventEmitter();
bus.setMaxListeners(0);

export function emitAdminNotification(): void {
  bus.emit("admin");
}

export function emitUserNotification(userId: number): void {
  bus.emit(`user:${userId}`);
}

export function subscribeAdmin(listener: () => void): () => void {
  bus.on("admin", listener);
  return () => bus.off("admin", listener);
}

export function subscribeUser(userId: number, listener: () => void): () => void {
  const channel = `user:${userId}`;
  bus.on(channel, listener);
  return () => bus.off(channel, listener);
}

export function emitActivityLogged(): void {
  bus.emit("activity");
}

export function subscribeActivity(listener: () => void): () => void {
  bus.on("activity", listener);
  return () => bus.off("activity", listener);
}

export function emitAdminUsersNotification(): void {
  bus.emit("admin:users");
}

export function subscribeAdminUsers(listener: () => void): () => void {
  bus.on("admin:users", listener);
  return () => bus.off("admin:users", listener);
}
