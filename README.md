# 🥚 Hành Tinh Chữ-tchi

Góc học tập cá nhân mang phong cách "đồ chơi nuôi thú trứng" thập niên 90: viền đen dày, má hồng, màu kẹo, màn hình ma trận điểm.
Mọi nhân vật và minh hoạ đều là **nhân vật gốc** vẽ bằng SVG (Mực-tchi, Nốt-tchi, Trang-tchi, Mây-tchi, Cà-tchi, Bóng-tchi, Bút-tchi, Sao-tchi, Cá-tchi, thầy Ếch Kính).

## Chạy

Web tĩnh, không cần build:

```bash
python3 -m http.server 8000   # rồi mở http://localhost:8000
```

(Hoặc đưa thư mục lên GitHub Pages / Netlify.) Dữ liệu lưu trong IndexedDB của trình duyệt — nhớ **xuất sao lưu** trong ⚙️ Cài đặt.

## Có gì bên trong

| Khu | Tính năng |
|---|---|
| **Cổng vào** | Cảnh minh hoạ “máy trứng” có chú thích kiểu bìa tạp chí; bấm nút **B** để trứng nở trên màn LCD 32×16 rồi phóng vào hành tinh. |
| **Sảnh** | Mặt cắt hành tinh nhiều tầng (như biểu đồ trưởng thành), mỗi phòng là một bong bóng minh hoạ; lời chào, việc hôm nay, câu trích trong ngày. |
| **Phòng Viết** | 7 chủ đề (văn học, triết học, âm nhạc, hội hoạ, lịch sử, văn hoá, ngôn ngữ); khuôn bài theo chủ đề; 12 kiểu giấy (sổ kẻ, chấm bi, tạp chí 2 cột, báo cổ 3 cột, zine, giấy cổ, bản vẽ…); trình soạn toàn màn hình có thu phóng, đổi khổ, chế độ máy chữ, dàn ý tự động, mục tiêu chữ; hơn 30 khối trình bày (hộp chú thích, nhân vật nói, trích dẫn lớn, thơ, hội thoại, dòng thời gian, thẻ nhân vật, so sánh, định nghĩa, từ nguyên, song ngữ, thẻ bài hát, khung tranh, nhiều cột, khối thu gọn, checklist, bảng, chú thích cuối trang, nhúng YouTube/Spotify…); phím tắt Markdown; AI viết tiếp / trau chuốt / dịch / phản biện / nhận xét. |
| **Chế độ đọc** | Tràn màn hình, chỉnh cỡ chữ, phông, giãn dòng, khổ, 5 nền giấy; tô màu theo ý nghĩa (6 màu), gạch chân sóng, đóng khung, ghi chú lề có thẻ & mức độ, sổ ghi chú lọc/tìm, ghi chú chung, dấu trang, **bút vẽ tay** lên trang, chế độ tập trung, đọc to, mục lục, tiến độ đọc nhớ vị trí, AI giải thích/dịch đoạn chọn, hỏi đáp về bài, tóm tắt, xuất ghi chú .md, tạo flashcard & lưu trích dẫn từ đoạn chọn. |
| **Kho Lưu Trữ** | Cất bài từ mọi nguồn (báo, nghiên cứu, sách, video, podcast…), dạng ngăn kéo / thẻ / bảng, thẻ (tag), trạng thái đọc, chấm sao, AI tóm tắt & gợi ý thẻ; **Sổ Trích Dẫn**. |
| **Thư Viện Thế Giới** | Bản đồ vẽ tay 11 vùng đất ↔ kệ sách 3D vuốt/kéo/lăn chuột; xem dạng gáy sách hoặc lưới; tự tìm bìa thật qua Open Library; chấm điểm bằng trứng, tiến độ trang, review đa định dạng, câu trích, mục tiêu năm, **hộ chiếu đọc sách**. |
| **Lớp Ngoại Ngữ** | Ngôn ngữ › Sách › Bài › Phần; flashcard đủ trường (từ, phiên âm, từ loại, nghĩa, định nghĩa, lưu ý cách dùng, ví dụ, đồng/trái nghĩa, collocation, họ từ, mẹo nhớ) — **AI điền hết**, thêm hàng loạt; ôn lặp lại ngắt quãng SM-2 (lật thẻ / gõ đáp án / nghe); nghe chép có chấm từng chữ; 4 trò chơi (ghép cặp, trắc nghiệm, xếp chữ, mưa từ); ngữ pháp có AI soạn bài, sinh bài tập & chấm; gia sư AI có nhập giọng nói; thống kê & xuất CSV cho Anki. |
| **Thêm** | 🎵 Hộp nhạc (giai điệu gốc tổng hợp, âm nền mưa/sóng/lửa/gió, playlist) · ✉️ Thùng thư (góp ý, nhật ký, **thư gửi tương lai** khoá tới ngày mở, thư mỗi sáng từ thú cưng) · 🐣 Thú cưng tiến hoá theo việc học, có đói/vui/hiểu biết · 🏅 Sổ tem & bản đồ chăm chỉ · ⏱️ Ấp trứng (Pomodoro) · 🔍 Ctrl+K tìm mọi thứ · 💡 bật/tắt đèn (chế độ tối). |

## AI

Các nút ✦ gọi Claude Messages API trực tiếp từ trình duyệt (mặc định `claude-opus-5-5`). Nhập API key trong ⚙️ Cài đặt — khoá được lưu cục bộ, chỉ nên dùng trên máy cá nhân; hoặc trỏ “Base URL” tới một proxy riêng.

## Cấu trúc

```
index.html
css/style.css   nền tảng, cổng vào, sảnh
css/pages.css   các trang
js/core.js      kho dữ liệu, router, modal, AI, TTS
js/art.js       toàn bộ minh hoạ SVG + sprite pixel
js/gate.js      cổng vào  · js/home.js  sảnh
js/editor.js    trình soạn thảo · js/reader.js chế độ đọc + ghi chú
js/write.js · js/archive.js · js/books.js · js/lang.js
js/extras.js    hộp nhạc, thư, thú cưng, tem, hẹn giờ, tìm kiếm, cài đặt
js/main.js      khởi động + dữ liệu mẫu
```
