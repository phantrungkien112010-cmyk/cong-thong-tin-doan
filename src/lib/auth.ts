import { cookies } from "next/headers";

const COOKIE_NAME = "doan_admin_session";
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "doanthanhnien@2026";
const SECRET = process.env.SESSION_SECRET || "cong-thong-tin-doan-secret-key-2026";

// Tạo token đơn giản dựa trên secret + timestamp
export async function createSessionToken(username: string): Promise<string> {
  const data = `${username}:${Date.now()}:${SECRET}`;
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return Buffer.from(`${username}:${hashHex}`).toString("base64");
}

// Kiểm tra thông tin đăng nhập
export function verifyCredentials(user: string, pass: string): boolean {
  return user.trim() === ADMIN_USER && pass.trim() === ADMIN_PASS;
}

// Kiểm tra xem người dùng hiện tại có đang đăng nhập admin không
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [user] = decoded.split(":");
    return user === ADMIN_USER;
  } catch {
    return false;
  }
}

export { COOKIE_NAME, ADMIN_USER, ADMIN_PASS };

