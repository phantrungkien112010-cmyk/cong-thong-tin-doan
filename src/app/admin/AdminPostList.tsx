"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Edit3, ExternalLink, Pin, Calendar, Eye, AlertCircle } from "lucide-react";

interface Post {
  id: number;
  title: string;
  summary: string;
  category: string;
  author: string;
  coverImage: string | null;
  views: number;
  isPinned: boolean;
  createdAt: string | Date;
}

export default function AdminPostList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" không?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setMessage("Đã xóa bài viết thành công!");
        setTimeout(() => setMessage(null), 3000);
      } else {
        alert(data.message || "Không thể xóa bài viết.");
      }
    } catch (e) {
      alert("Lỗi kết nối khi xóa bài viết.");
    } finally {
      setDeletingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-600 font-medium">Chưa có bài viết nào trong cơ sở dữ liệu.</p>
        <Link
          href="/admin/new"
          className="inline-block mt-4 text-sm font-semibold text-doan-blue hover:underline"
        >
          Nhấp vào đây để đăng bài viết đầu tiên →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {message && (
        <div className="bg-emerald-50 text-emerald-800 text-sm px-4 py-3 border-b border-emerald-100 flex items-center justify-between">
          <span>{message}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3.5">Tiêu đề bài viết</th>
              <th className="px-6 py-3.5">Chuyên mục</th>
              <th className="px-6 py-3.5">Tác giả</th>
              <th className="px-6 py-3.5">Ngày đăng</th>
              <th className="px-6 py-3.5 text-center">Lượt xem</th>
              <th className="px-6 py-3.5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-blue-50/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-1.5">
                        {post.isPinned && (
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-0.5">
                            <Pin className="w-2.5 h-2.5" />
                            <span>Ghim</span>
                          </span>
                        )}
                        <Link
                          href={`/posts/${post.id}`}
                          target="_blank"
                          className="font-bold text-slate-900 hover:text-doan-blue line-clamp-1"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                    {post.category}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-700">
                  {post.author}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-semibold text-slate-700">
                  <div className="inline-flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.views}</span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/posts/${post.id}`}
                      target="_blank"
                      title="Xem bài viết trên web"
                      className="p-1.5 text-slate-400 hover:text-doan-blue hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      disabled={deletingId === post.id}
                      title="Xóa bài viết"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

