import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import AdminPostList from "./AdminPostList";
import { PlusCircle, Newspaper, Eye, Pin, Home } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/login");
  }

  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết trang Admin:", error);
  }

  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const pinnedPosts = posts.filter((p) => p.isPinned).length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Phiên làm việc Quản trị viên
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Bảng Quản Trị Bài Viết Đoàn
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Quản lý danh sách tin tức, xuất bản bài viết mới lên Cổng thông tin.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Xem trang chủ</span>
            </Link>
            <Link
              href="/admin/new"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md shadow-green-600/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đăng bài mới</span>
            </Link>
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-doan-blue flex items-center justify-center">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số bài viết</p>
              <p className="text-2xl font-black text-slate-900">{totalPosts}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng lượt xem</p>
              <p className="text-2xl font-black text-slate-900">{totalViews.toLocaleString("vi-VN")}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Pin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bài ghim tiêu điểm</p>
              <p className="text-2xl font-black text-slate-900">{pinnedPosts}</p>
            </div>
          </div>
        </div>

        {/* Danh sách quản lý bài viết (Client Component hỗ trợ xóa tương tác) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Danh sách các bài viết đã đăng</h2>
            <span className="text-xs font-medium text-slate-500">Cơ sở dữ liệu Supabase PostgreSQL</span>
          </div>

          <AdminPostList initialPosts={posts} />
        </div>
      </div>
    </div>
  );
}

