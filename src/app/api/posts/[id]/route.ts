import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// GET: Chi tiết bài viết và tăng lượt xem
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    // Tăng lượt xem và lấy bài viết
    const post = await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Lỗi lấy chi tiết bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Không tìm thấy bài viết" },
      { status: 404 }
    );
  }
}

// PUT: Cập nhật bài viết (Admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ success: false, message: "Chưa xác thực" }, { status: 401 });
    }

    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    const body = await request.json();
    const { title, summary, content, coverImage, category, author, isPinned } = body;

    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title?.trim(),
        summary: summary?.trim(),
        content: content?.trim(),
        coverImage: coverImage?.trim() || null,
        category: category?.trim(),
        author: author?.trim(),
        isPinned: isPinned !== undefined ? Boolean(isPinned) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật bài viết thành công!",
      post: updated,
    });
  } catch (error) {
    console.error("Lỗi cập nhật bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Không thể cập nhật bài viết" },
      { status: 500 }
    );
  }
}

// DELETE: Xóa bài viết (Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ success: false, message: "Chưa xác thực" }, { status: 401 });
    }

    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa bài viết thành công!",
    });
  } catch (error) {
    console.error("Lỗi xóa bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xóa bài viết" },
      { status: 500 }
    );
  }
}

