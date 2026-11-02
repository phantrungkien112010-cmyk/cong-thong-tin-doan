import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Bắt đầu khởi tạo dữ liệu mẫu cho Cổng thông tin Đoàn...");

  const existing = await prisma.post.count();
  if (existing > 0) {
    console.log(`Đã có ${existing} bài viết trong CSDL, bỏ qua tạo dữ liệu mẫu.`);
    return;
  }

  const samplePosts = [
    {
      title: "Tuổi trẻ cả nước sôi nổi ra quân Tháng Thanh niên 2026: Tiên phong chuyển đổi số và phát triển cộng đồng",
      summary: "Sáng nay, Lễ phát động Tháng Thanh niên 2026 đã chính thức diễn ra với sự tham gia của hơn 5.000 đoàn viên, thanh niên trên toàn quốc, thể hiện tinh thần xung kích, sáng tạo vì sự phát triển bền vững của quê hương đất nước.",
      content: `Sáng ngày 01/03, tại Quảng trường trung tâm, Ban Thường vụ Trung ương Đoàn TNCS Hồ Chí Minh đã long trọng tổ chức Lễ khởi động Tháng Thanh niên năm 2026 với chủ đề "Tuổi trẻ tiên phong chuyển đổi số và phụng sự Tổ quốc".

Tham dự buổi lễ có các đồng chí lãnh đạo Đảng, Nhà nước cùng hơn 5.000 đoàn viên, thanh niên ưu tú đại diện cho thế hệ trẻ cả nước.

Tại buổi lễ, Bí thư thứ nhất Ban Chấp hành Trung ương Đoàn đã phát biểu kêu gọi toàn thể cán bộ Đoàn, đoàn viên, thanh thiếu niên phát huy tinh thần "Đâu cần thanh niên có, việc gì khó có thanh niên", đăng ký và thực hiện các công trình, phần việc thanh niên thiết thực, gắn liền với nhiệm vụ chính trị - kinh tế - xã hội tại địa phương.

Các mũi nhọn hành động chính trong Tháng Thanh niên 2026 bao gồm:
1. Thành lập các Tổ công nghệ số cộng đồng hướng dẫn người dân sử dụng dịch vụ công trực tuyến.
2. Tổ chức chuỗi ngày Chủ nhật Xanh, trồng hơn 1.000.000 cây xanh tại các đô thị và nông thôn.
3. Hỗ trợ thanh niên nông thôn tiếp cận nguồn vốn khởi nghiệp và chuyển đổi mô hình kinh tế xanh.
4. Trao tặng 500 suất học bổng cho học sinh, sinh viên nghèo vượt khó học giỏi.

Ngay sau lễ phát động, hàng loạt đội hình tình nguyện đã đồng loạt ra quân triển khai các công trình thanh niên đầu tiên, tạo không khí thi đua sôi nổi và đầy nhiệt huyết của tuổi trẻ.`,
      coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
      category: "Tin hoạt động",
      author: "Ban Biên Tập Đoàn",
      views: 342,
      isPinned: true,
    },
    {
      title: "Ngày hội 'Chủ nhật xanh': Đoàn viên thanh niên chung tay làm sạch môi trường, trồng hơn 2.000 cây xanh",
      summary: "Chiến dịch môi trường xanh thu hút đông đảo đoàn viên thanh niên các chi đoàn tham gia dọn dẹp vệ sinh, xóa điểm đen rác thải và trồng cây xanh ven tuyến đường liên thôn.",
      content: `Thực hiện chương trình công tác Đoàn và phong trào thanh thiếu nhi năm 2026, Đoàn cơ sở đã đồng loạt tổ chức ra quân Ngày hội "Chủ nhật xanh" đợt I.

Hoạt động đã quy tụ hơn 400 bạn trẻ từ các chi đoàn trường học, chi đoàn cơ quan và thanh niên địa bàn dân cư. Trong buổi sáng, các bạn trẻ đã dọn sạch hơn 3km tuyến đường trục chính, thu gom và phân loại rác thải nhựa, bóc xóa biển quảng cáo sai quy định và trồng mới 2.000 cây bàng Đài Loan, hoa hoàng yến dọc tuyến kênh.

Hoạt động không chỉ góp phần nâng cao ý thức bảo vệ môi trường trong thanh thiếu nhi mà còn lan tỏa mạnh mẽ hình ảnh đẹp của người đoàn viên áo xanh trong lòng nhân dân.`,
      coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1200&auto=format&fit=crop",
      category: "Phong trào tình nguyện",
      author: "Đoàn Cơ Sở",
      views: 185,
      isPinned: false,
    },
    {
      title: "Tuyên dương 15 Gương mặt trẻ tiêu biểu trong phong trào Tuổi trẻ sáng tạo năm 2026",
      summary: "Lễ vinh danh các gương thanh niên có sáng kiến đổi mới kỹ thuật, nghiên cứu khoa học và cống hiến nổi bật cho cộng đồng trong năm qua.",
      content: `Tối qua, Hội đồng Bình chọn Gương mặt trẻ tiêu biểu đã tổ chức lễ tuyên dương và trao bằng khen cho 15 cá nhân xuất sắc có thành tích vượt bậc trong các lĩnh vực: Học tập, nghiên cứu khoa học, lao động sản xuất, an ninh quốc phòng và hoạt động xã hội.

Các gương mặt trẻ được vinh danh đều là những tấm gương sáng về tinh thần tự học, ý chí vươn lên, không ngừng tìm tòi, ứng dụng tiến bộ khoa học công nghệ vào giải quyết các bài toán thực tiễn của cuộc sống.

Phát biểu tại buổi lễ, đồng chí Bí thư nhấn mạnh: "Mỗi bạn trẻ được tuyên dương hôm nay là một đóa hoa ngát hương, tiếp thêm ngọn lửa nhiệt huyết và khát vọng vươn lên cho thế hệ trẻ cả nước".`,
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      category: "Gương sáng thanh niên",
      author: "Hội Đồng Tuyên Dương",
      views: 290,
      isPinned: false,
    },
    {
      title: "Thông báo: Về việc triệu tập Đại biểu tham dự Hội nghị Tập huấn Kỹ năng Công tác Đoàn năm 2026",
      summary: "Kế hoạch tổ chức lớp tập huấn kỹ năng nghiệp vụ công tác Đoàn - Hội, kỹ năng chuyển đổi số và công tác bảo vệ nền tảng tư tưởng của Đảng trên không gian mạng.",
      content: `Kính gửi: Các cơ sở Đoàn trực thuộc.

Thực hiện Kế hoạch công tác bồi dưỡng cán bộ Đoàn năm 2026, Ban Thường vụ thông báo về việc triệu tập đại biểu tham dự Hội nghị tập huấn nghiệp vụ công tác Đoàn:

1. Thời gian: 02 ngày, từ 8h00 ngày 15/03/2026 đến 17h00 ngày 16/03/2026.
2. Địa điểm: Hội trường Lớn Trụ sở cơ quan Đoàn.
3. Nội dung tập huấn:
- Kỹ năng thiết kế ấn phẩm truyền thông số, video ngắn phục vụ công tác tuyên truyền.
- Phương pháp tổ chức sinh hoạt chi đoàn hấp dẫn và ứng dụng phần mềm quản lý đoàn viên.
- Kỹ năng đấu tranh phản bác quan điểm sai trái trên mạng xã hội.
4. Thành phần tham dự: Bí thư, Phó Bí thư các chi đoàn trực thuộc.

Yêu cầu các đơn vị lập danh sách và gửi về Văn phòng trước ngày 10/03/2026.`,
      coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
      category: "Thông báo",
      author: "Văn Phòng Ban Thường Vụ",
      views: 120,
      isPinned: false,
    },
  ];

  for (const post of samplePosts) {
    await prisma.post.create({ data: post });
  }

  console.log("Khởi tạo thành công 4 bài viết mẫu!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

