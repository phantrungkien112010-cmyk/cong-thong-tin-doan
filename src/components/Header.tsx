"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Flame, PlusCircle, LayoutDashboard, LogOut, Menu, X, Newspaper, Bell, HeartHandshake } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(!!data.authenticated);
      })
      .catch(() => setIsLoggedIn(false));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  };

  const navLinks = [
    { href: "/", label: "Trang chủ", icon: Newspaper },
    { href: "/?category=Tin hoạt động", label: "Tin hoạt động", icon: Flame },
    { href: "/?category=Phong trào tình nguyện", label: "Phong trào", icon: HeartHandshake },
    { href: "/?category=Thông báo", label: "Thông báo", icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-blue-100">
      {/* Top Banner Tiêu ngữ Đoàn */}
      <div className="bg-gradient-to-r from-red-600 via-doan-blue to-blue-700 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
            <span>ĐOÀN THANH NIÊN CỘNG SẢN HỒ CHÍ MINH</span>
          </div>
          <div className="hidden md:block italic text-blue-100 text-xs">
            "Khát vọng - Tiên phong - Đoàn kết - Bản lĩnh - Sáng tạo"
          </div>
        </div>
      </div>

      {/* Main Header Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Portal Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* Huy hiệu Đoàn cách điệu */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-doan-blue flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-xl group-hover:scale-105 transition-transform border-2 border-white ring-2 ring-blue-500/30">
              <span className="text-yellow-300 font-extrabold tracking-tighter">ĐOÀN</span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-red-600">
                Tuổi trẻ Việt Nam
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-doan-blue tracking-tight leading-tight group-hover:text-blue-800 transition-colors">
                CỔNG THÔNG TIN ĐOÀN
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-doan-blue font-bold shadow-sm"
                      : "text-slate-600 hover:text-doan-blue hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Đăng bài / Quản trị / Đăng nhập */}
          <div className="hidden sm:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/admin/new"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all shadow-green-600/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Đăng bài mới</span>
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center space-x-1.5 text-slate-700 hover:text-doan-blue px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Quản trị</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center space-x-2 bg-doan-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all shadow-blue-500/20"
              >
                <span>Đăng nhập đăng bài</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-doan-blue hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-doan-blue"
            >
              <link.icon className="w-4 h-4 text-blue-600" />
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/admin/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Đăng bài mới</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-blue-50 text-doan-blue py-2.5 rounded-lg text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Trang quản trị bài viết</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center space-x-2 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 bg-doan-blue text-white py-2.5 rounded-lg text-sm font-medium"
              >
                <span>Đăng nhập đăng bài</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

