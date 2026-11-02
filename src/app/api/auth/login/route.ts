import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCredentials, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập tên đăng nhập và mật khẩu" },
        { status: 400 }
      );
    }

    if (!verifyCredentials(username, password)) {
      return NextResponse.json(
        { success: false, message: "Tài khoản hoặc mật khẩu không chính xác!" },
        { status: 401 }
      );
    }

    const token = await createSessionToken(username);
    const cookieStore = await cookies();

    // Lưu cookie trong 7 ngày
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công!",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ khi đăng nhập" },
      { status: 500 }
    );
  }
}

