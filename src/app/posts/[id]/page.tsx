import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Calendar, Eye, User, ArrowLeft, Tag, Share2, Printer } from "lucide-react";

export const revalidate = 0;

interface PostDetailProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound();
  }

  // Tăng lượt xem và lấy bài viết
  let post;
  try {
    post = await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });
  } catch (e) {
    console.error("Lỗi tải bài viết:", e);
    notFound();
  }

  if (!post) {
    notFound();
  }

  // Lấy các bài viết liên quan cùng chuyên mục
  const relatedPosts = await prisma.post.findMany({
    where: {
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <article className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-sm font-medium text-slate-600 hover:text-doan-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <span className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-doan-blue">
            <Tag className="w-3 h-3" />
            <span>{post.category}</span>
          </span>
        </div>

        {/* Article Box Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 mb-10">
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between border-y border-slate-100 py-3 mb-6 text-xs sm:text-sm text-slate-500 gap-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 font-medium text-slate-700">
                <User className="w-4 h-4 text-doan-blue" />
                <span>{post.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{post.views} lượt xem</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                Tin chính thức
              </span>
            </div>
          </div>

          {/* Sapo / Tóm tắt bài viết */}
          {post.summary && (
            <div className="bg-blue-50/70 border-l-4 border-doan-blue p-4 sm:p-5 rounded-r-lg mb-8">
              <p className="text-slate-800 font-semibold text-base sm:text-lg leading-relaxed italic">
                {post.summary}
              </p>
            </div>
          )}

          {/* Cover Image (nếu có) */}
          {post.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full max-h-[500px] object-cover"
              />
              <p className="text-xs text-center text-slate-400 py-2 bg-slate-50 italic">
                Hình ảnh minh họa hoạt động
              </p>
            </div>
          )}

          {/* Main Body Content */}
          <div className="text-slate-800 text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {post.content}
          </div>

          {/* Author Signature */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-end sm:justify-end">
            <div className="text-right">
              <p className="text-xs uppercase font-bold text-slate-400">Tác giả / Nguồn tin:</p>
              <p className="text-base font-bold text-doan-blue">{post.author}</p>
              <p className="text-xs text-slate-500 italic">Ban Biên tập Cổng thông tin Đoàn</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-red-600 pl-3">
              Tin cùng chuyên mục
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/posts/${item.id}`}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs text-blue-600 font-medium mb-1 block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-doan-blue line-clamp-2 mb-2">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center space-x-1 mt-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

