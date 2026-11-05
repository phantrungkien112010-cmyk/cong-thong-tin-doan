const DEFAULT_DATABASE_URL =
  "postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027%40@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require";
const DEFAULT_DIRECT_URL =
  "postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027%40@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require";

function fixUrl(url?: string, defaultUrl?: string): string {
  if (!url || !url.startsWith("postgres")) return defaultUrl || DEFAULT_DATABASE_URL;
  let fixed = url.trim();
  // Tự động sửa định dạng nếu mật khẩu chứa ký tự @@ -> %40@
  if (fixed.includes("@@")) {
    fixed = fixed.replace("@@", "%40@");
  }
  return fixed;
}

process.env.DATABASE_URL = fixUrl(process.env.DATABASE_URL, DEFAULT_DATABASE_URL);
process.env.DIRECT_URL = fixUrl(process.env.DIRECT_URL, DEFAULT_DIRECT_URL);
