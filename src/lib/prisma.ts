import { PrismaClient } from "@prisma/client";

// Chuỗi kết nối chuẩn Supabase Pooler (hỗ trợ cả Vercel Linux Serverless & Local)
const DEFAULT_DATABASE_URL =
  "postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027%40@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require";

function normalizeUrl(url?: string): string {
  if (!url) return DEFAULT_DATABASE_URL;
  // Nếu mật khẩu có dấu @@ thì tự động chuẩn hóa thành %40 để tương thích với engine Linux trên Vercel
  if (url.includes("khkt20262027@@")) {
    return url.replace("khkt20262027@@", "khkt20262027%40@");
  }
  return url;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: normalizeUrl(process.env.DATABASE_URL),
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
