/* Học viện · Cơ sở Hán văn cổ — đề cương (các bài sẽ được soạn dần theo tiến độ trên lớp). */
const ACAD_HANVAN = {
  format: 'chutchi-course@1', id: 'han-van', field: 'Hán Nôm', icon: '📜', color: '#ffe680',
  title: 'Cơ sở Hán văn cổ',
  desc: 'Chuẩn bị cho môn Cơ sở Hán Nôm (phần Hán văn cổ): chữ Hán, từ vựng văn ngôn, ngữ pháp (từ loại, hư từ, cú pháp), đọc – dịch văn bản cổ. 32 bài, soạn dần theo tiến độ trên lớp.',
  intro: '<p>Khoá dựng theo khung chung của môn Cơ sở Hán Nôm, kết hợp ghi chép trên lớp. Thuật ngữ theo giáo trình Việt Nam (văn/tự, thực từ/hư từ, tự động từ/tha động từ, phần đề/phần thuyết, nòng cốt câu…).</p><p>Mỗi bài: mục tiêu · bài giảng · văn bản (nguyên văn, âm Hán Việt, chú thích, lời bình) · thẻ chữ & từ (có tập viết theo thứ tự nét) · luyện tập (trắc nghiệm, dịch câu có AI chấm) · hỏi gia sư · tự dịch & tự giảng lại.</p>',
  parts: [
    { title: 'Phần I · Chữ Hán', lessons: [
      { id: 'hv-khaiquat', title: 'Chữ Hán: khái quát', sub: 'Chữ ghi ý – âm, các thể chữ, phồn thể & giản thể' },
      { id: 'hv-lucthu1', title: 'Văn và tự · Lục thư (I)', sub: 'Thuyết văn giải tự; tượng hình, chỉ sự, hội ý' },
      { id: 'hv-lucthu2', title: 'Lục thư (II)', sub: 'Hình thanh, chuyển chú, giả tá, thông giả' },
      { id: 'hv-botthu', title: 'Nét, bút thuận, bộ thủ, tra từ điển', sub: '214 bộ, bộ biến thể, Thiều Chửu – Đào Duy Anh' },
      { id: 'hv-amhv', title: 'Âm Hán Việt', sub: 'Âm cổ Hán Việt, chữ nhiều âm, đồng âm khác chữ' }] },
    { title: 'Phần II · Từ vựng văn ngôn', lessons: [
      { id: 'hv-tutu', title: 'Tự và Từ', sub: 'Đơn vị văn tự và đơn vị ngôn ngữ; hai chữ cạnh nhau chưa chắc là một từ' },
      { id: 'hv-dondaam', title: 'Từ đơn âm, đa âm · Từ đơn, từ ghép', sub: 'Điệp tự, song thanh, điệp vận, từ ngoại lai, từ ghép' },
      { id: 'hv-nghia', title: 'Nghĩa của từ', sub: 'Nghĩa gốc – mở rộng, nghĩa cổ – mới, đồng nghĩa, nhiều nghĩa' },
      { id: 'hv-tuloai', title: 'Từ loại: thực từ và hư từ', sub: 'Chi hồ giả dã hĩ yên tai; hư hoá' }] },
    { title: 'Phần III · Ngữ pháp từ loại: thực từ', lessons: [
      { id: 'hv-danhtu', title: 'Danh từ', sub: 'Danh từ làm trạng ngữ; định ngữ đứng trước danh từ' },
      { id: 'hv-dongtu', title: 'Động từ', sub: 'Tự động, tha động, hệ từ, năng nguyện, xu hướng' },
      { id: 'hv-hinhdung', title: 'Hình dung từ', sub: 'Định ngữ, vị ngữ, trạng ngữ' },
      { id: 'hv-soluong', title: 'Số từ và lượng từ', sub: 'Cách biểu thị số, số ước lượng' },
      { id: 'hv-daitu', title: 'Đại từ', sub: 'Nhân xưng, khiêm xưng – tôn xưng, chỉ thị, phiếm chỉ, nghi vấn' },
      { id: 'hv-hoatdung', title: 'Từ loại hoạt dụng', sub: 'Danh từ dùng như động từ, sử động, ý động' }] },
    { title: 'Phần IV · Ngữ pháp hư từ', lessons: [
      { id: 'hv-photu', title: 'Phó từ', sub: 'Phủ định, thời gian, mức độ, phạm vi, tình thái' },
      { id: 'hv-gioitu', title: 'Giới từ', sub: '以, 於, 自, 從, 與, 為' },
      { id: 'hv-lientu', title: 'Liên từ', sub: '而, 與, 且, 則, 雖, 故, 若, 苟' },
      { id: 'hv-trotu', title: 'Trợ từ', sub: '之, 者, 所, 所以, hậu tố 然' },
      { id: 'hv-ngukhi', title: 'Ngữ khí từ, thán từ, tượng thanh từ', sub: '也, 矣, 乎, 哉, 焉, 耳' },
      { id: 'hv-bangtra', title: 'Bảng tổng hợp hư từ trọng điểm', sub: '18 hư từ hay gặp nhất, đủ cách dùng và ví dụ' }] },
    { title: 'Phần V · Ngữ pháp câu (cú pháp)', lessons: [
      { id: 'hv-thanhphan', title: 'Thành phần câu', sub: 'Chủ, vị, tân, định, trạng, bổ ngữ; phần đề – phần thuyết' },
      { id: 'hv-doanngu', title: 'Đoản ngữ (cụm từ)', sub: 'Chủ – vị, động – tân, chính – phụ, động – bổ, liên hợp, giới – tân' },
      { id: 'hv-daotrang', title: 'Trật tự từ và đảo trang', sub: 'Tân ngữ, định ngữ, trạng ngữ đảo vị trí' },
      { id: 'hv-tinhluoc', title: 'Tỉnh lược', sub: 'Lược chủ ngữ, tân ngữ, giới từ, vị ngữ' },
      { id: 'hv-cauvingu', title: 'Phân loại câu theo vị ngữ', sub: 'Phán đoán, trần thuật, miêu tả, tồn tại' },
      { id: 'hv-caumucdich', title: 'Phân loại câu theo mục đích', sub: 'Trần thuật, nghi vấn – phản vấn, cầu khiến, cảm thán' },
      { id: 'hv-phudinh', title: 'Câu phủ định, bị động, so sánh', sub: '見, 為…所, 於, 被; 於, 如, 莫…於' },
      { id: 'hv-cauphuc', title: 'Câu phức', sub: 'Đẳng lập và chính phụ' },
      { id: 'hv-codinh', title: 'Các cấu trúc cố định', sub: '不亦…乎, 何…之有, 如…何, 無乃…乎, 以…為…; quy trình phân tích câu' }] },
    { title: 'Phần VI · Đọc – dịch văn bản cổ', lessons: [
      { id: 'hv-phuongphap', title: 'Phương pháp đọc – dịch', sub: 'Phiên âm, giải nghĩa, dịch nghĩa, dịch thơ; cú đậu' },
      { id: 'hv-thuchanh', title: 'Thực hành đọc – dịch theo thể loại', sub: 'Luận ngữ, Mạnh Tử, ngụ ngôn chư tử, Sử ký, thơ Đường, văn biền ngẫu và thơ văn chữ Hán Việt Nam' }] }
  ]
};
