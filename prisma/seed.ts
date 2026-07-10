import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../lib/generated/prisma/index.js";
import { scryptSync, randomBytes } from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function main() {
  const url = process.env.DATABASE_URL || "file:./dev.db";
  const adapter = new PrismaLibSql({ url });
  const prisma = new PrismaClient({ adapter });

  console.log("Cleaning database…");

  await prisma.activityLog.deleteMany({});
  await prisma.beneficiaryRequest.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.staffRolePermission.deleteMany({});
  await prisma.staffRole.deleteMany({});
  await prisma.permissionModule.deleteMany({});

  console.log("Seeding database…");

  await prisma.user.create({
    data: {
      username: "sok.dara",
      email: "sok.dara@nominee.local",
      passwordHash: hashPassword("password123"),
      fullName: "Sok Dara",
      role: "SHAREHOLDER",
      isActive: true,
    },
  });

  const modules = await Promise.all(
    [
      { name: "dashboard", label: "Dashboard" },
      { name: "users", label: "Users" },
      { name: "roles", label: "Role & Permission" },
    ].map((m) => prisma.permissionModule.create({ data: m }))
  );

  const superAdminRole = await prisma.staffRole.create({
    data: {
      name: "Super Admin",
      slug: "super-admin",
      description: "Full access to all modules.",
      permissions: {
        create: modules.map((m) => ({
          moduleId: m.id,
          create: true,
          read: true,
          update: true,
          delete: true,
        })),
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@nominee.local",
      passwordHash: hashPassword("admin123"),
      fullName: "System Administrator",
      role: "ADMIN",
      isActive: true,
      staffRoleId: superAdminRole.id,
    },
  });

  console.log("✓ Seeded 2 users");
  console.log("  sok.dara / password123 (shareholder)");
  console.log("  admin    / admin123 (admin, Super Admin role)");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
