"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Image as ImageIcon, Eye, Sparkles, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  "Tin hoạt động",
  "Phong trào tình nguyện",
  "Gương sáng thanh niên",
  "Thông báo",
];

// Các link ảnh mẫu đẹp liên quan tới Đoàn & Tuổi trẻ để tiện thử nghiệm nhanh
const SAMPLE_IMAGES = [
  {
    label: "Thanh niên tình nguyện",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Hội thảo tuổi trẻ",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Hoạt động cộng đồng",
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function PostCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tin hoạt động");
  const [author, setAuthor] = useState("Ban Biên Tập Đoàn");
  const [coverImage, setCoverImage] = useState(SAMPLE_IMAGES[0].url);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !summary.trim() || !content.trim()) {
      setError("Vui lòng nhập đầy đủ: Tiêu đề, Tóm tắt và Nội dung bài viết.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          author,
          coverImage,
          summary,
          content,
          isPinned,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Không thể đăng bài viết");
      }

      // Đăng thành công -> chuyển về trang chi tiết bài viết mới hoặc trang quản trị
      router.push(`/posts/${data.post.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi đăng bài.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header bar */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-900">Soạn Thảo Bài Viết Mới</h1>
            <p className="text-xs text-slate-500">Đăng tin tức lên Cổng thông tin Đoàn TNCS Hồ Chí Minh</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Eye className="w-4 h-4 text-doan-blue" />
          <span>{isPreview ? "Quay lại chỉnh sửa" : "Xem trước bài viết"}</span>
        </button>
      </div>

      {error && (
        <div className="m-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
          {error}
        </div>
      )}

      {isPreview ? (
        /* Live Preview Mode */
        <div className="p-6 sm:p-10 bg-white">
          <div className="inline-block bg-blue-100 text-doan-blue text-xs font-bold px-3 py-1 rounded-full mb-3">
            {category}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            {title || "Tiêu đề bài viết xem trước..."}
          </h2>
          <div className="text-xs text-slate-400 mb-6 flex items-center space-x-3">
            <span>Tác giả: <strong>{author}</strong></span>
            <span>•</span>
            <span>Hôm nay</span>
          </div>

          {summary && (
            <div className="p-4 bg-blue-50/70 border-l-4 border-doan-blue rounded-r-lg text-slate-800 font-semibold italic mb-6">
              {summary}
            </div>
          )}

          {coverImage && (
            <div className="mb-6 rounded-xl overflow-hidden max-h-96">
              <img src={coverImage} alt="Ảnh bìa" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="text-slate-700 whitespace-pre-line leading-relaxed">
            {content || "Nội dung bài viết sẽ hiển thị ở đây..."}
          </div>
        </div>
      ) : (
        /* Edit Form Mode */
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Tuổi trẻ Đoàn Khối ra quân Chiến dịch Tình nguyện Mùa hè xanh 2026..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-doan-blue focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Chuyên mục & Tác giả & Ghim */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Chuyên mục <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-doan-blue focus:bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Tác giả / Ban đưa tin
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ban Biên Tập Đoàn"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-doan-blue focus:bg-white"
              />
            </div>

            <div className="flex items-center sm:pt-6">
              <label className="relative flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-5 h-5 text-doan-blue rounded border-slate-300 focus:ring-doan-blue cursor-pointer"
                />
                <span className="text-sm font-semibold text-slate-800">
                  Ghim bài viết tiêu điểm (lên đầu)
                </span>
              </label>
            </div>
          </div>

          {/* Link ảnh bìa */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              <span>Đường dẫn ảnh bìa (URL)</span>
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-doan-blue focus:bg-white mb-2"
            />
            {/* Quick choose image */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium">Chọn nhanh ảnh mẫu:</span>
              {SAMPLE_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setCoverImage(img.url)}
                  className="px-2 py-1 bg-slate-100 hover:bg-blue-100 hover:text-doan-blue rounded border border-slate-200 transition-colors"
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tóm tắt bài viết (Sapo) */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Tóm tắt bài viết (Sapo) <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tóm tắt ngắn gọn 1-2 câu về nội dung chính của bài viết..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-doan-blue focus:bg-white leading-relaxed"
            />
          </div>

          {/* Nội dung chi tiết */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Nội dung bài viết đầy đủ <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập toàn bộ nội dung bài viết ở đây (hỗ trợ xuống dòng, đoạn văn)..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-doan-blue focus:bg-white leading-relaxed"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <Link
              href="/admin"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Hủy bỏ
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-md shadow-green-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Đang lưu vào CSDL...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Xuất bản bài viết</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

