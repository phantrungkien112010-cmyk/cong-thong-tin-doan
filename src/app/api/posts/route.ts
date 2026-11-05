import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// GET: Lấy danh sách bài viết (có hỗ trợ lọc theo danh mục, tìm kiếm và phân trang)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category && category !== "Tất cả") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        take: limit,
        skip: skip,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("Lỗi lấy danh sách bài viết:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể tải danh sách bài viết từ CSDL",
        error: error?.message || String(error),
        code: error?.code,
      },
      { status: 500 }
    );
  }
}

// POST: Tạo bài viết mới (yêu cầu đăng nhập quản trị viên)
export async function POST(request: Request) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, summary, content, coverImage, category, author, isPinned } = body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập đầy đủ tiêu đề, tóm tắt và nội dung bài viết!" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        coverImage: coverImage?.trim() || null,
        category: category?.trim() || "Tin hoạt động",
        author: author?.trim() || "Ban Biên Tập Đoàn",
        isPinned: Boolean(isPinned),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Đăng bài viết thành công!",
      post: newPost,
    });
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lưu bài viết vào CSDL" },
      { status: 500 }
    );
  }
}

