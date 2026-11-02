# CỔNG THÔNG TIN ĐOÀN TNCS HỒ CHÍ MINH

Dự án Cổng Thông Tin Điện Tử của Đoàn Thanh Niên Cộng Sản Hồ Chí Minh được xây dựng trên nền tảng **Next.js (App Router)**, **Tailwind CSS** và cơ sở dữ liệu **Supabase PostgreSQL** qua **Prisma ORM**.

---

## 🚀 Các Tính Năng Chính

1. **Trang chủ (`/`)**:
   - Giao diện mang phong cách Đoàn thanh niên hiện đại, trang nhã (gam màu xanh thanh niên, cờ đỏ sao vàng).
   - Banner khẩu hiệu hành động & thanh tìm kiếm tin tức.
   - Thanh lọc tin theo chuyên mục: *Tin hoạt động, Phong trào tình nguyện, Gương sáng thanh niên, Thông báo*.
   - Khối bài viết tiêu điểm (ghim) nổi bật và lưới bài viết tin tức mới nhất.
   - Thống kê lượt đọc, ngày đăng, tác giả và tóm tắt (sapo).

2. **Xem chi tiết bài viết (`/posts/[id]`)**:
   - Giao diện đọc bài chuẩn báo điện tử: Tiêu đề lớn, thông tin xuất bản, ảnh bìa, hộp tóm tắt dẫn dắt, nội dung chi tiết.
   - Tự động tăng lượt xem (views) khi độc giả truy cập.
   - Đề xuất các tin tức liên quan cùng chuyên mục.

3. **Xác thực & Quản trị bài viết (`/login` & `/admin`)**:
   - Cơ chế đăng nhập đơn giản, bảo mật bằng HTTP-only Cookie.
   - Bảng điều khiển quản trị thống kê: Tổng số bài viết, tổng lượt đọc, bài ghim tiêu điểm.
   - Bảng quản lý tin tức: Xem bài viết, xem ngày đăng, sửa, xóa bài viết tương tác.

4. **Đăng bài viết mới (`/admin/new`)**:
   - Biểu mẫu nhập liệu: Tiêu đề, Chuyên mục, Tác giả, Link ảnh bìa (có sẵn nút chọn ảnh mẫu chủ đề Đoàn thanh niên), Sapo tóm tắt, Nội dung chi tiết.
   - Tùy chọn ghim bài viết lên tiêu điểm trang chủ.
   - Tính năng **Xem trước bài viết (Live Preview)** trước khi xuất bản.
   - Lưu trữ trực tiếp vào Supabase PostgreSQL.

---

## 🔑 Tài Khoản Đăng Nhập Ban Biên Tập Mặc Định

| Mục | Giá trị |
| :--- | :--- |
| **URL Đăng nhập** | `/login` |
| **Tên đăng nhập** | `admin` |
| **Mật khẩu** | `doanthanhnien@2026` |

*(Bạn có thể thay đổi trong file `.env`)*

---

## 🛠️ Cấu Hình & Cài Đặt Cục Bộ (Local)

### 1. Chuẩn bị file môi trường `.env`
Đã cấu hình sẵn kết nối tới cơ sở dữ liệu Supabase:
```env
DATABASE_URL="postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027@@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027@@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD="doanthanhnien@2026"
SESSION_SECRET="cong-thong-tin-doan-secret-key-2026"
```

### 2. Cài đặt thư viện & đồng bộ CSDL
```bash
# Cài đặt dependencies
npm install

# Đẩy schema vào cơ sở dữ liệu Supabase
npx prisma db push

# Tạo các bài viết mẫu ban đầu (tùy chọn)
node scripts/seed.mjs
```

### 3. Chạy môi trường phát triển
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

---

## 📤 Hướng Dẫn Đẩy Code Lên GitHub

Thực hiện các lệnh sau trong PowerShell hoặc Terminal tại thư mục dự án:

```bash
# 1. Khởi tạo Git repository (nếu chưa có)
git init

# 2. Thêm tất cả các file vào Git
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: Khoi tao cong thong tin Doan TNCS Ho Chi Minh"

# 4. Đổi tên nhánh chính thành main
git branch -M main

# 5. Liên kết tới kho lưu trữ GitHub của bạn
# (Thay URL bên dưới bằng URL kho lưu trữ trên GitHub của bạn)
git remote add origin https://github.com/TÊN_GITHUB_CỦA_BẠN/TÊN_REPOSITORY.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

---

## 🌐 Hướng Dẫn Cấu Hình Chạy Online Trên Vercel

Vercel là nền tảng tối ưu nhất để chạy Next.js hoàn toàn miễn phí.

### Bước 1: Đăng nhập Vercel & Import dự án
1. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub của bạn.
2. Nhấn nút **"Add New..."** → chọn **"Project"**.
3. Tìm kho lưu trữ GitHub bạn vừa đẩy lên ở bước trên và nhấn **"Import"**.

### Bước 2: Cấu hình biến môi trường (Environment Variables)
Tại mục **Environment Variables**, bạn thêm các biến sau:

| Tên biến (Key) | Giá trị (Value) |
| :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027@@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres.bimhefgmuidejkiwplju:khkt20262027@@aws-0-eu-west-1.pooler.supabase.com:5432/postgres` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `doanthanhnien@2026` |
| `SESSION_SECRET` | `cong-thong-tin-doan-secret-key-2026` |

### Bước 3: Deploy (Triển khai)
- Nhấn nút **"Deploy"**.
- Vercel sẽ tự động build Next.js và sinh Prisma Client (`prisma generate` đã được cấu hình trong `postinstall`).
- Sau 1 - 2 phút, website của bạn sẽ hoạt động trực tuyến với tên miền miễn phí dạng `https://ten-du-an.vercel.app`!

