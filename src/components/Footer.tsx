import Link from "next/link";
import { Mail, Phone, MapPin, Globe, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t-4 border-doan-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Thông tin cơ quan Đoàn */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-doan-blue flex items-center justify-center text-yellow-300 font-bold border border-yellow-400">
                ĐOÀN
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight uppercase">
                  CỔNG THÔNG TIN ĐOÀN TNCS HỒ CHÍ MINH
                </h3>
                <p className="text-xs text-blue-400">Cơ quan ngôn luận & truyền thông công tác thanh niên</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              Cập nhật thông tin nhanh chóng, chính xác về các chủ trương, phong trào hành động cách mạng của tuổi trẻ, các hoạt động tình nguyện vì cộng đồng, gương thanh niên tiêu biểu và đời sống thanh niên.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bản quyền nội dung thuộc Ban Biên Tập Cổng thông tin Đoàn</span>
            </div>
          </div>

          {/* Cột 2: Danh mục nhanh */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-l-2 border-red-500 pl-2">
              Chuyên mục chính
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=Tin hoạt động" className="hover:text-white transition-colors">
                  Tin hoạt động Đoàn - Hội
                </Link>
              </li>
              <li>
                <Link href="/?category=Phong trào tình nguyện" className="hover:text-white transition-colors">
                  Phong trào thanh niên tình nguyện
                </Link>
              </li>
              <li>
                <Link href="/?category=Gương sáng thanh niên" className="hover:text-white transition-colors">
                  Gương sáng thanh niên
                </Link>
              </li>
              <li>
                <Link href="/?category=Thông báo" className="hover:text-white transition-colors">
                  Văn bản - Thông báo chỉ đạo
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-yellow-400 transition-colors text-blue-300 font-medium">
                  Đăng nhập Ban Biên Tập
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-l-2 border-yellow-400 pl-2">
              Thông tin liên hệ
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                <span>Trụ sở Đoàn Thanh niên các cấp</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hotline: 024.3943.xxxx</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Email: doanthanhnien@portal.vn</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Hệ thống trực tuyến 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Cổng Thông Tin Đoàn TNCS Hồ Chí Minh. Tất cả các quyền được bảo lưu.</p>
          <p className="text-slate-400">
            Xây dựng trên nền tảng <span className="text-blue-400 font-medium">Next.js & Supabase PostgreSQL</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

