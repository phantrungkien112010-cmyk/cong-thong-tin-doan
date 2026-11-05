const DEFAULT_DATABASE_URL =
  "postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027%40@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require";
const DEFAULT_DIRECT_URL =
  "postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027%40@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require";

if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith("postgres")) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
}
if (!process.env.DIRECT_URL || !process.env.DIRECT_URL.startsWith("postgres")) {
  process.env.DIRECT_URL = DEFAULT_DIRECT_URL;
}

// Tự động chuẩn hóa @@ nếu có
if (process.env.DATABASE_URL.includes("khkt20262027@@")) {
  process.env.DATABASE_URL = process.env.DATABASE_URL.replace("khkt20262027@@", "khkt20262027%40@");
}
if (process.env.DIRECT_URL.includes("khkt20262027@@")) {
  process.env.DIRECT_URL = process.env.DIRECT_URL.replace("khkt20262027@@", "khkt20262027%40@");
}

