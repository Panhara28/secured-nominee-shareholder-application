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

  console.log("Seeding database…");

  // Admin user
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@nominee.local",
      passwordHash: hashPassword("Admin@1234"),
      fullName: "System Administrator",
      role: "ADMIN",
      isActive: true,
    },
  });

  // Shareholder accounts
  await prisma.user.upsert({
    where: { username: "shareholder1" },
    update: {},
    create: {
      username: "shareholder1",
      email: "shareholder1@nominee.local",
      passwordHash: hashPassword("Pass@1234"),
      fullName: "John Doe",
      role: "SHAREHOLDER",
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { username: "shareholder2" },
    update: {},
    create: {
      username: "shareholder2",
      email: "shareholder2@nominee.local",
      passwordHash: hashPassword("Pass@1234"),
      fullName: "Jane Smith",
      role: "SHAREHOLDER",
      isActive: true,
    },
  });

  console.log("✓ Seeded 3 users (1 admin, 2 shareholders)");
  console.log("  admin       / Admin@1234");
  console.log("  shareholder1 / Pass@1234");
  console.log("  shareholder2 / Pass@1234");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
