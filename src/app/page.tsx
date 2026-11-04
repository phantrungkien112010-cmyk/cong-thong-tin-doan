import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, Eye, User, ArrowRight, Sparkles, Pin, Bookmark, Tag } from "lucide-react";

export const revalidate = 0; // Dynamic server rendering để luôn cập nhật bài viết mới nhất

interface HomeProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

const CATEGORIES = [
  "Tất cả",
  "Tin hoạt động",
  "Phong trào tình nguyện",
  "Gương sáng thanh niên",
  "Thông báo",
];

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentCategory = params.category || "Tất cả";
  const searchQuery = params.search || "";

  // Query posts from Prisma
  const where: any = {};
  if (currentCategory !== "Tất cả") {
    where.category = currentCategory;
  }
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { summary: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  let posts: any[] = [];

  try {
    posts = await prisma.post.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Lỗi kết nối CSDL:", error);
    // Trả về mảng rỗng, trang sẽ hiển thị empty state thay vì thông báo lỗi
  }

  // Bài viết nổi bật (bài được ghim đầu tiên hoặc bài mới nhất)
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const standardPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero Banner Đoàn Thanh Niên */}
      <section className="relative overflow-hidden bg-gradient-to-br from-doan-blue via-blue-800 to-indigo-950 text-white py-12 md:py-16 shadow-lg">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 text-blue-100 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Cổng Thông Tin Điện Tử Tuổi Trẻ</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
              Khát vọng cống hiến, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300">
                Lập thân - Lập nghiệp
              </span>
            </h1>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
              Nơi cập nhật tin tức phong trào thanh niên, các chương trình tình nguyện, văn bản hướng dẫn và câu chuyện truyền cảm hứng từ tuổi trẻ Việt Nam.
            </p>

            {/* Quick search input */}
            <form method="GET" action="/" className="flex max-w-md gap-2">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Tìm kiếm bài viết, tin tức..."
                className="flex-1 px-4 py-2.5 rounded-lg text-slate-800 bg-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm cursor-pointer"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Category Pills Navigation */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none mb-8">
          <div className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Chuyên mục:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = currentCategory === cat;
            return (
              <Link
                key={cat}
                href={cat === "Tất cả" ? "/" : `/?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-doan-blue text-white shadow-sm"
                    : "text-slate-600 hover:text-doan-blue hover:bg-blue-50"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Posts Content */}
        {posts.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-doan-blue">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa có bài viết nào</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {searchQuery
                ? `Không tìm thấy kết quả nào cho "${searchQuery}". Thử từ khóa khác.`
                : "Hệ thống Cổng thông tin chưa có bài viết nào trong chuyên mục này. Hãy đăng nhập để tạo bài viết đầu tiên!"}
            </p>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-doan-blue hover:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm shadow-sm transition-all"
            >
              <span>Đăng nhập đăng bài</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Post (Bài viết nổi bật) */}
            {featuredPost && (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[300px] bg-slate-100">
                    <img
                      src={
                        featuredPost.coverImage ||
                        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    {featuredPost.isPinned && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-md">
                        <Pin className="w-3.5 h-3.5 fill-white" />
                        <span>TIN TIÊU ĐIỂM</span>
                      </span>
                    )}
                  </div>
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-semibold text-doan-blue uppercase tracking-wider mb-2">
                        <span className="bg-blue-50 text-doan-blue px-2.5 py-1 rounded">
                          {featuredPost.category}
                        </span>
                      </div>
                      <Link href={`/posts/${featuredPost.id}`}>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 hover:text-doan-blue transition-colors line-clamp-3 leading-snug mb-3">
                          {featuredPost.title}
                        </h2>
                      </Link>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 mb-6">
                        {featuredPost.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{featuredPost.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(featuredPost.createdAt).toLocaleDateString("vi-VN")}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>{featuredPost.views} lượt xem</span>
                        </span>
                      </div>
                      <Link
                        href={`/posts/${featuredPost.id}`}
                        className="inline-flex items-center space-x-1 text-sm font-bold text-doan-blue hover:text-blue-800 transition-colors"
                      >
                        <span>Đọc tiếp</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Other Articles */}
            {standardPosts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-doan-blue pl-3">
                    Tin tức mới cập nhật
                  </h3>
                  <span className="text-xs text-slate-500">Tổng cộng: {posts.length} bài viết</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standardPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col group"
                    >
                      {/* Thumbnail Image */}
                      <Link href={`/posts/${post.id}`} className="block relative aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={
                            post.coverImage ||
                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-doan-blue text-xs font-semibold px-2.5 py-1 rounded shadow-sm">
                          {post.category}
                        </span>
                        {post.isPinned && (
                          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center space-x-1">
                            <Pin className="w-3 h-3 fill-white" />
                          </span>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/posts/${post.id}`}>
                            <h4 className="font-bold text-slate-900 text-lg leading-snug hover:text-doan-blue transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                          </Link>
                          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                            {post.summary}
                          </p>
                        </div>

                        {/* Card Footer Metadata */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              <span>{post.views}</span>
                            </span>
                          </div>
                          <Link
                            href={`/posts/${post.id}`}
                            className="text-doan-blue hover:text-blue-800 font-semibold inline-flex items-center space-x-0.5"
                          >
                            <span>Xem</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

