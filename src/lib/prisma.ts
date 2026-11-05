import { PrismaClient } from "@prisma/client";

// Chuỗi kết nối dự phòng trực tiếp tới Supabase nếu Vercel chưa cấu hình biến môi trường
const DEFAULT_DATABASE_URL =
  "postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027@@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
