/* Học viện · Cơ sở Hán văn cổ — đề cương (các bài sẽ được soạn dần theo tiến độ trên lớp). */
const HV_TUTU = {
  id: 'hv-tutu', kind: 'lang', short: 'Tự & Từ', title: 'Tự và Từ', sub: 'Đơn vị văn tự và đơn vị ngôn ngữ — và cái bẫy “hai chữ cạnh nhau chưa chắc là một từ”', who: 'Phần II · Từ vựng văn ngôn',
  goals: ['Phân biệt văn 文 và tự 字 theo Hứa Thận, và tự 字 với từ 詞 theo ngôn ngữ học hiện đại', 'Nêu được ba khả năng quan hệ giữa tự và từ, kèm ví dụ', 'Giải thích vì sao văn ngôn chủ yếu là từ đơn âm, khác tiếng Hán hiện đại', 'Tránh lỗi dịch gộp hai chữ đứng cạnh nhau thành một từ hiện đại (妻子, 先生, 可以…)'],
  q: 'Khi nhìn một dòng chữ Hán, bạn thấy những “chữ”. Nhưng ngôn ngữ được làm bằng “từ”. Một chữ có phải luôn là một từ không — và nếu không, làm sao biết đâu là ranh giới?',
  context: '<p>Đây là bài mở đầu phần từ vựng. Nó trả lời một câu hỏi tưởng đơn giản nhưng quyết định cách bạn đọc mọi văn bản: <b>đơn vị mình đang đọc là gì?</b> Với tiếng Việt, ta phân biệt “tiếng” (âm tiết) và “từ”: “cà phê” là một từ gồm hai tiếng, mà “cà” hay “phê” đứng riêng đều vô nghĩa. Với Hán văn, sự phân biệt tương ứng là <b>tự</b> (chữ) và <b>từ</b>.</p>',
  lecture: [
    { h: 'Văn và tự: cách phân biệt của người xưa', html: `<p>Thuật ngữ cổ nhất về chữ Hán là cặp <b>văn</b> 文 – <b>tự</b> 字, do Hứa Thận nêu trong lời tựa <i>Thuyết văn giải tự</i> (năm 100): “Thương Hiệt lúc đầu làm ra chữ, đại khái dựa theo loài mà vẽ hình, nên gọi là <b>văn</b>; về sau hình và thanh ghép thêm vào nhau, thì gọi là <b>tự</b>.” Tên sách “Thuyết văn giải tự” chính là “giảng văn, giải tự”.</p>
<ul><li><b>Văn</b>: chữ có kết cấu đơn giản, một khối không chia nhỏ được — thường là chữ tượng hình, chỉ sự: 日 nhật, 月 nguyệt, 木 mộc, 人 nhân, 山 sơn.</li><li><b>Tự</b>: chữ có kết cấu phức tạp, ghép từ các văn — chữ hội ý, hình thanh: 明 minh (日 + 月), 林 lâm (木 + 木), 江 giang (氵 + 工).</li></ul>
<p>Chữ 字 gồm 宀 (mái nhà) và 子 (đứa con): “sinh con trong nhà”, tức là chữ <i>sinh sôi</i> từ những chữ gốc. Hứa Thận nói: “tự là sinh sôi nảy nở mà dần nhiều lên.” Đây là cách phân biệt về <b>cấu tạo chữ</b> — ta sẽ học kỹ ở phần Lục thư (bài 2, 3). Về sau, chữ “tự” được dùng chung cho mọi chữ Hán, còn “văn” chuyển sang nghĩa văn chương, văn hoá.</p>` },
    { h: 'Tự 字: đơn vị của hệ thống văn tự', html: `<p>Theo cách hiểu hiện nay, <b>tự</b> là <b>chữ nói chung</b>, là một đơn vị của hệ thống văn tự Hán. Mỗi tự thống nhất ba mặt:</p>
<ul><li><b>Hình</b>: hình dạng viết ra (人).</li><li><b>Âm</b>: một âm tiết (nhân — âm Hán Việt; rén — âm Bắc Kinh).</li><li><b>Nghĩa</b>: thường có một hay nhiều nghĩa (người).</li></ul>
<p>Tự là đơn vị của <b>chữ viết</b>, không phải đơn vị của <b>ngôn ngữ</b>. Một văn bản Hán văn trên giấy là một chuỗi các tự đặt cách đều nhau, không có khoảng trống giữa các từ, cũng không có dấu câu (người đọc xưa phải tự ngắt câu — gọi là <b>cú đậu</b>, bài 31). Vì thế việc đầu tiên khi đọc là <b>chia chuỗi tự thành các từ</b>.</p>` },
    { h: 'Từ 詞: đơn vị ý nghĩa của ngôn ngữ', html: `<p><b>Từ</b> là đơn vị ý nghĩa nhỏ nhất có thể dùng độc lập để đặt câu — đơn vị của <b>ngôn ngữ</b>. Quan hệ giữa tự và từ có ba khả năng:</p>
<ol><li><b>Một tự = một từ</b> (từ đơn âm): 人 nhân (người), 馬 mã (ngựa), 木 mộc (cây), 雨 vũ (mưa), 風 phong (gió); và những khái niệm trừu tượng: 仁 nhân (đạo lý, lẽ phải để làm người), 義 nghĩa (định liệu sự việc hợp với lẽ phải), 禮 lễ (khuôn mẫu, phép tắc), 智 trí (hiểu thấu sự lý), 信 tín (lòng tin, không sai lời hẹn).</li>
<li><b>Một tự là một phần của từ đa âm, bản thân vô nghĩa</b>: 葡萄 bồ đào (quả nho), 琵琶 tỳ bà, 徘徊 bồi hồi. Tách riêng 葡 hay 萄 không mang nghĩa gì — giống “cà” trong “cà phê”.</li>
<li><b>Một tự là một phần của từ đa âm, có nghĩa nhưng không giữ nguyên nghĩa</b>: 小人 tiểu nhân không phải “người nhỏ” mà là “kẻ thiếu đức”; 君子 quân tử không còn là “con của vua” mà là “người có đức” (nhớ khoá Triết học Trung Quốc, bài Quân tử). Nghĩa của từ không bằng phép cộng nghĩa của các tự.</li></ol>
<p>Ngược lại, có khi <b>một từ dài hơn một tự</b> mà mỗi tự vẫn giữ nghĩa riêng: 天下 thiên hạ (dưới trời → cả thế giới), 社稷 xã tắc (thần đất + thần lúa → quốc gia). Đây là <b>từ ghép</b> — bài sau sẽ bàn kỹ.</p>` },
    { h: 'Văn ngôn: một ngôn ngữ chủ yếu đơn âm', html: `<p>Đặc điểm quan trọng nhất cần nhớ: <b>trong văn ngôn (Hán văn cổ), đại đa số từ là từ đơn âm — mỗi tự là một từ</b>. Đây là điểm khác lớn với tiếng Hán hiện đại (bạch thoại), nơi phần lớn từ đã thành <b>song âm tiết</b> (hai chữ):</p>
<table class="ac-tbl"><tr><th>Văn ngôn</th><th>Hán ngữ hiện đại</th><th>Nghĩa</th></tr>
<tr><td>目 mục</td><td>眼睛</td><td>mắt</td></tr><tr><td>衣 y</td><td>衣服</td><td>áo</td></tr><tr><td>師 sư</td><td>老師</td><td>thầy</td></tr><tr><td>知 tri</td><td>知道</td><td>biết</td></tr><tr><td>朋 bằng / 友 hữu</td><td>朋友</td><td>bạn</td></tr></table>
<p>Vì sao? Một giả thuyết phổ biến: qua hàng nghìn năm, hệ thống âm của tiếng Hán đơn giản dần (mất phụ âm cuối, mất nhiều phụ âm đầu), sinh ra quá nhiều chữ đồng âm; nói bằng một âm tiết dễ bị nhầm, nên tiếng nói dần ghép đôi các chữ để phân biệt. Nhưng văn ngôn — ngôn ngữ viết — vẫn giữ lối đơn âm cổ.</p>
<p>Với người Việt, đây vừa là lợi thế vừa là bẫy. Lợi thế: âm Hán Việt giữ được mỗi chữ một âm rõ ràng, và ta quen với từ Hán Việt hai chữ. Bẫy: ta có thói quen <b>đọc hai chữ cạnh nhau như một từ Hán Việt quen thuộc</b>.</p>` },
    { h: '⚠️ Cái bẫy lớn: hai chữ cạnh nhau chưa chắc là một từ', html: `<p>Nhiều tổ hợp hai chữ mà ta tưởng là một từ, trong văn ngôn thật ra là <b>hai từ đơn</b> đứng cạnh nhau. Đây là lỗi dịch phổ biến nhất của người mới học:</p>
<ul><li><b>妻子</b>: tiếng Hán hiện đại = “vợ”; văn ngôn thường = <b>vợ và con</b>. Đào Uyên Minh, <i>Đào hoa nguyên ký</i>: 率妻子邑人來此絕境 — “dẫn <b>vợ con</b> cùng người trong ấp đến chốn biệt lập này” (đọc ở phần Văn bản).</li>
<li><b>先生</b>: hiện đại = “ông, thầy”; văn ngôn có khi = <b>người sinh ra trước</b>, bậc cha anh. Luận ngữ 2.8: 有酒食，先生饌 — “có rượu và thức ăn thì <b>bậc cha anh</b> được ăn trước.”</li>
<li><b>可以</b>: hiện đại = “có thể”; văn ngôn có khi là <b>可</b> (có thể) + <b>以</b> (lấy, dùng — giới từ, sau nó lược tân ngữ “cái đó”): “có thể lấy cái đó mà…”.</li>
<li><b>地方</b>: hiện đại = “nơi chốn”; văn ngôn trong câu như 地方千里 = <b>đất</b> (地) <b>vuông</b> (方) nghìn dặm, tức đất rộng nghìn dặm vuông.</li></ul>
<p><b>Nguyên tắc an toàn</b>: khi gặp hai chữ đứng cạnh nhau, hãy thử hiểu <b>từng chữ một</b> trước. Chỉ gộp thành một từ khi (1) tách ra thì vô nghĩa (葡萄), hoặc (2) đó là một từ ghép cố định đã biết (天下, 社稷), và nghĩa gộp hợp với ngữ cảnh. Tra Thiều Chửu cho từng chữ, tra Đào Duy Anh cho từ ghép.</p>` },
    { h: 'Tự, từ và việc phân chia từ loại', html: `<p>Vì đơn vị cơ bản của văn ngôn là <b>tự</b>, nên khi bàn ngữ pháp Hán văn, các giáo trình thường lấy tự làm điểm xuất phát rồi xác định nó đóng vai trò từ gì trong câu (bài 9). Có học giả Trung Quốc còn chủ trương “bản vị tự” — coi tự chứ không phải từ là đơn vị cơ bản của tiếng Hán. Đây là một tranh luận lý thuyết; với người học, chỉ cần nhớ:</p>
<ul><li>Trong văn ngôn, <b>phần lớn trường hợp tự = từ</b>, nên ta học nghĩa từng chữ là chính.</li><li>Phải luôn để ý những trường hợp <b>tự ≠ từ</b>: từ đa âm (bài 7) và tổ hợp hai từ đơn dễ nhầm (mục trên).</li></ul>
<blockquote>Bài tập tư duy: tìm ba từ tiếng Việt gồm hai tiếng mà mỗi tiếng đứng riêng vô nghĩa (như “bồ hóng”, “mặc cả”?) và ba từ mà mỗi tiếng có nghĩa nhưng nghĩa chung khác hẳn (như “ăn ở”, “áo quần”?). Bạn sẽ thấy sự phân biệt tự – từ không xa lạ chút nào.</blockquote>` }
  ],
  texts: [
    { title: 'Văn và tự trong lời tựa Thuyết văn giải tự', src: 'Hứa Thận, Thuyết văn giải tự · Tự (năm 100)', lang: 'zh-TW',
      orig: '倉頡之初作書，蓋依類象形，故謂之文；其後形聲相益，即謂之字。文者，物象之本；字者，言孳乳而浸多也。',
      reading: 'Thương Hiệt chi sơ tác thư, cái y loại tượng hình, cố vị chi văn; kỳ hậu hình thanh tương ích, tức vị chi tự. Văn giả, vật tượng chi bản; tự giả, ngôn tư nhũ nhi tẩm đa dã.',
      vi: 'Thương Hiệt lúc đầu làm ra chữ, đại khái dựa theo từng loài mà vẽ hình, nên gọi là văn; về sau hình và thanh thêm vào nhau, thì gọi là tự. Văn là gốc của hình tượng sự vật; tự là nói sự sinh sôi nảy nở mà dần dần nhiều lên.',
      notes: [['倉頡 Thương Hiệt', 'nhân vật truyền thuyết, tương truyền là sử quan của Hoàng Đế, người sáng tạo chữ'], ['書 thư', 'ở đây: chữ viết'], ['蓋 cái', 'đại khái, có lẽ (phó từ)'], ['依類象形 y loại tượng hình', 'dựa theo loài vật mà mô phỏng hình dạng'], ['相益 tương ích', 'thêm vào nhau, ghép với nhau'], ['孳乳 tư nhũ', 'sinh sôi nảy nở (như sinh con)'], ['浸 tẩm', 'dần dần']],
      guide: ['Tìm trong đoạn hai câu có cấu trúc “… 者，… 也” và “… 謂之 …”. Mỗi cấu trúc dùng để làm gì?', 'Theo Hứa Thận, “văn” và “tự” khác nhau ở cách tạo chữ nào?'],
      comment: '<p>Đoạn văn này chính là định nghĩa gốc của cặp khái niệm trên slide của lớp (văn: kết cấu đơn giản; tự: kết cấu phức tạp). Để ý cấu trúc ngữ pháp: <b>故謂之文</b> “nên gọi nó là văn” — 謂之 (gọi nó là) là một cấu trúc định danh rất hay gặp; và <b>文者，物象之本</b> — “văn là cái gốc của hình tượng sự vật” — mẫu câu phán đoán <b>者…也</b> mà ta sẽ học ở bài 26. Ngay trong bài từ vựng, bạn đã gặp ngữ pháp: đó là lý do khoá này luôn để văn bản thật đi kèm.</p>' },
    { title: 'Vợ con — không phải “vợ”', src: 'Đào Uyên Minh, Đào hoa nguyên ký (thế kỷ V) — trích', lang: 'zh-TW',
      orig: '自云先世避秦時亂，率妻子邑人來此絕境，不復出焉，遂與外人間隔。',
      reading: 'Tự vân tiên thế tị Tần thời loạn, suất thê tử ấp nhân lai thử tuyệt cảnh, bất phục xuất yên, toại dữ ngoại nhân gián cách.',
      vi: 'Họ tự nói rằng tổ tiên tránh loạn thời Tần, dẫn vợ con và người trong ấp đến chốn biệt lập này, không ra ngoài nữa, thế là cách biệt với người bên ngoài.',
      notes: [['自云 tự vân', 'tự nói (云 = nói)'], ['先世 tiên thế', 'đời trước, tổ tiên'], ['率 suất', 'dẫn, đưa'], ['妻子 thê tử', 'vợ và con (hai từ đơn!)'], ['邑人 ấp nhân', 'người cùng ấp, cùng làng'], ['絕境 tuyệt cảnh', 'nơi cách tuyệt, biệt lập (không phải “tuyệt cảnh” = tình thế tuyệt vọng!)'], ['焉 yên', 'ngữ khí từ cuối câu'], ['間隔 gián cách', 'cách biệt']],
      guide: ['Đoạn này có ít nhất ba tổ hợp hai chữ dễ hiểu sai theo nghĩa hiện đại hoặc theo nghĩa Hán Việt quen thuộc. Tìm chúng.', 'Vì sao dịch 妻子 là “vợ” ở đây lại vô lý? (Gợi ý: họ sống ở đó qua nhiều đời.)'],
      comment: '<p>Đoạn trích có tới ba cái bẫy: <b>妻子</b> (vợ con, không phải vợ), <b>絕境</b> (chốn biệt lập — “tuyệt” ở đây là cách tuyệt, không phải tuyệt vọng như từ Hán Việt “tuyệt cảnh” trong tiếng Việt), và <b>先世</b> (tổ tiên). Ngữ cảnh cũng tự báo lỗi: cả một cộng đồng sống biệt lập qua mấy trăm năm thì không thể chỉ có “vợ” mà không có con cái.</p><p>Bài học: <b>ngữ cảnh là người kiểm tra cuối cùng</b>. Khi bản dịch của bạn tạo ra một điều vô lý, gần như chắc chắn bạn đã gộp sai hoặc hiểu sai một từ.</p>' },
    { title: 'Bậc cha anh ăn trước', src: 'Luận ngữ 2.8 · Vi chính', lang: 'zh-TW',
      orig: '子夏問孝。子曰：「色難。有事，弟子服其勞；有酒食，先生饌，曾是以為孝乎？」',
      reading: 'Tử Hạ vấn hiếu. Tử viết: “Sắc nan. Hữu sự, đệ tử phục kỳ lao; hữu tửu tự, tiên sinh soạn, tằng thị dĩ vi hiếu hồ?”',
      vi: 'Tử Hạ hỏi về hiếu. Khổng Tử đáp: “Khó ở nét mặt. Có việc thì con em gánh vác việc nhọc; có rượu và thức ăn thì dâng bậc cha anh ăn trước — chỉ như thế mà đã cho là hiếu sao?”',
      notes: [['色 sắc', 'sắc mặt, nét mặt (giữ được vẻ mặt hoà vui khi hầu cha mẹ mới là khó)'], ['弟子 đệ tử', 'ở đây: con em, người trẻ (không phải “học trò”)'], ['服其勞 phục kỳ lao', 'gánh lấy việc nhọc của bậc trên'], ['食 tự', 'đọc “tự”: thức ăn'], ['先生 tiên sinh', 'người sinh ra trước, bậc cha anh'], ['饌 soạn', 'ăn uống, dọn ăn'], ['曾 tằng', 'lại, há (phó từ nhấn mạnh)']],
      guide: ['Hai từ 弟子 và 先生 trong đoạn này có nghĩa khác với nghĩa quen thuộc của chúng ta thế nào?', 'Đoạn này có thêm cấu trúc 以為 (cho là). Nó là một từ hay hai từ?'],
      comment: '<p>Chương này hay vì có <b>hai</b> từ quen thuộc mang nghĩa khác: <b>弟子</b> ở đây không phải học trò mà là “con em” (người nhỏ tuổi trong nhà), và <b>先生</b> không phải “thầy giáo” mà là “bậc cha anh”. Đặt cạnh nhau, chúng tạo thành một cặp đối: người trẻ — người lớn.</p><p><b>以為</b> cũng đáng chú ý: trong nhiều câu văn ngôn, đó là 以 (lấy) + 為 (làm/cho là) với tân ngữ bị lược hoặc đặt giữa (以…為… “lấy … làm …”), về sau mới dính lại thành một từ “cho rằng”. Ở đây 是以為孝 = “lấy điều này (是) làm hiếu”. Lại một lần nữa: hai chữ cạnh nhau, hãy thử tách trước.</p>' }
  ],
  concepts: [
    { id: 'van-tu', han: '文 · 字', term: 'Văn và tự', def: 'Theo Hứa Thận: văn là chữ kết cấu đơn giản, mô phỏng hình sự vật (tượng hình, chỉ sự); tự là chữ kết cấu phức tạp, ghép từ các văn (hội ý, hình thanh).', ex: '日, 月, 木 là văn; 明 (日 + 月), 林 (木 + 木) là tự.', counter: '“Văn” theo nghĩa văn chương, văn hoá — nghĩa phát triển về sau, không phải thuật ngữ cấu tạo chữ.', rel: ['tu-zi'], write: '文字' },
    { id: 'tu-zi', han: '字', term: 'Tự (chữ)', def: 'Đơn vị của hệ thống văn tự Hán, thống nhất ba mặt hình – âm – nghĩa; mỗi tự là một âm tiết.', ex: '人: hình 人, âm “nhân”, nghĩa “người”.', counter: 'Từ (詞) — đơn vị của ngôn ngữ, có thể gồm nhiều tự.', rel: ['van-tu', 'tu-ci'], write: '字' },
    { id: 'tu-ci', han: '詞', term: 'Từ', def: 'Đơn vị ý nghĩa nhỏ nhất dùng độc lập được, đơn vị của ngôn ngữ. Có thể trùng với tự (từ đơn âm) hoặc gồm nhiều tự (từ đa âm).', ex: '馬 (một tự, một từ); 葡萄 (hai tự, một từ).', counter: 'Một tự đứng riêng không có nghĩa như 葡 — nó là tự, nhưng không phải từ.', rel: ['tu-zi', 'quanhe'], write: '詞' },
    { id: 'quanhe', han: '字 ↔ 詞', term: 'Ba quan hệ giữa tự và từ', def: '(1) Một tự là một từ; (2) tự là một phần vô nghĩa của từ đa âm; (3) tự là một phần có nghĩa của từ đa âm nhưng không giữ nguyên nghĩa.', ex: '(1) 仁 nhân; (2) 琵琶 tỳ bà; (3) 小人 tiểu nhân = kẻ thiếu đức.', counter: 'Hai từ đơn đứng cạnh nhau như 妻子 (vợ + con) — không phải một từ.', rel: ['tu-ci', 'bay'] },
    { id: 'bay', han: '妻子 · 先生', term: 'Bẫy “hai chữ chưa chắc là một từ”', def: 'Văn ngôn chủ yếu đơn âm, nên tổ hợp hai chữ quen thuộc (theo nghĩa hiện đại hay nghĩa Hán Việt) thường là hai từ đơn. Phải thử hiểu từng chữ trước, rồi kiểm tra bằng ngữ cảnh.', ex: '率妻子邑人 = dẫn vợ con và người trong ấp.', counter: 'Từ ghép cố định như 天下, 社稷 — nên hiểu như một từ.', rel: ['quanhe'], write: '妻' }
  ],
  drills: [
    { t: 'mcq', ch: '林', q: 'Theo Hứa Thận, chữ 林 (lâm — rừng) thuộc loại nào?', o: ['Văn', 'Tự'], a: 1, why: '林 ghép từ hai chữ 木, tức là chữ kết cấu phức tạp do các văn ghép lại → tự.' },
    { t: 'mcq', ch: '木', q: 'Chữ 木 (mộc) thuộc loại nào?', o: ['Văn', 'Tự'], a: 0, why: '木 là chữ tượng hình một khối, không chia nhỏ được → văn.' },
    { t: 'mcq', q: 'Tự 字 thống nhất ba mặt nào?', o: ['Hình – âm – nghĩa', 'Chủ – vị – tân', 'Nét – bộ – số nét', 'Thanh – vận – điệu'], a: 0, why: 'Mỗi tự có hình (cách viết), âm (một âm tiết) và nghĩa.' },
    { t: 'mcq', ch: '葡萄', q: 'Trong từ 葡萄 (bồ đào), quan hệ giữa tự và từ là gì?', o: ['Mỗi tự là một từ', 'Hai tự vô nghĩa khi đứng riêng, hợp lại thành một từ', 'Hai tự giữ nguyên nghĩa và cộng lại'], a: 1, why: '葡 hay 萄 tách riêng không mang nghĩa; chỉ cả tổ hợp mới là từ “quả nho”.' },
    { t: 'mcq', ch: '小人', q: '小人 trong Luận ngữ nghĩa là gì?', o: ['Người nhỏ bé (thấp)', 'Trẻ con', 'Kẻ thiếu đức, chỉ biết lợi riêng', 'Người hầu'], a: 2, why: 'Tự 小 và 人 có nghĩa nhưng từ 小人 không giữ nguyên nghĩa “người nhỏ” — nó là khái niệm đạo đức đối lập với quân tử.' },
    { t: 'mcq', ch: '妻子', q: 'Trong câu 率妻子邑人來此絕境, 妻子 nên hiểu là:', o: ['Vợ', 'Vợ và con', 'Người phụ nữ', 'Con gái'], a: 1, why: 'Văn ngôn chủ yếu là từ đơn âm: 妻 (vợ) + 子 (con). Ngữ cảnh — cả cộng đồng sống qua nhiều đời — cũng loại trừ nghĩa “vợ”.' },
    { t: 'mcq', ch: '先生', q: 'Trong câu 有酒食，先生饌, 先生 là:', o: ['Thầy giáo', 'Ông (cách xưng hô lịch sự)', 'Bậc cha anh, người sinh ra trước', 'Người đi trước trên đường'], a: 2, why: 'Ở Luận ngữ 2.8, 先生 đối với 弟子 (con em): bậc cha anh — người lớn tuổi hơn.' },
    { t: 'mcq', q: 'Đặc điểm từ vựng quan trọng nhất của văn ngôn so với tiếng Hán hiện đại là:', o: ['Văn ngôn có nhiều từ song âm tiết hơn', 'Văn ngôn chủ yếu là từ đơn âm (mỗi tự là một từ)', 'Văn ngôn không có từ ghép', 'Văn ngôn không có từ đa âm'], a: 1, why: 'Văn ngôn chủ yếu đơn âm; tiếng Hán hiện đại song âm hoá (目 → 眼睛, 衣 → 衣服).' },
    { t: 'mcq', ch: '絕境', q: '絕境 trong Đào hoa nguyên ký nghĩa là:', o: ['Tình thế tuyệt vọng', 'Chốn biệt lập, cách tuyệt với bên ngoài', 'Cảnh đẹp tuyệt vời', 'Biên giới xa xôi'], a: 1, why: '絕 ở đây là “cách tuyệt”, 境 là “cõi, vùng”: chốn biệt lập. Đừng hiểu theo từ Hán Việt “tuyệt cảnh” trong tiếng Việt hiện nay.' },
    { t: 'tr', src: '率妻子邑人來此絕境', rd: 'Suất thê tử ấp nhân lai thử tuyệt cảnh', a: 'Dẫn vợ con và người trong ấp đến chốn biệt lập này.', why: '率: dẫn; 妻子: vợ và con; 邑人: người cùng ấp; 來: đến; 此: này; 絕境: chốn biệt lập.' },
    { t: 'tr', src: '有酒食，先生饌', rd: 'Hữu tửu tự, tiên sinh soạn', a: 'Có rượu và thức ăn thì (dâng) bậc cha anh ăn.', why: '食 đọc “tự” = thức ăn; 先生 = bậc cha anh; 饌 = ăn, dọn ăn.' }
  ],
  socra: ['Cho ví dụ một từ Hán Việt hai chữ mà bạn hay dùng. Thử tách ra: mỗi chữ có nghĩa gì? Nghĩa của từ có bằng phép cộng hai chữ không?', 'Làm sao biết 天下 là một từ, còn 妻子 trong Đào hoa nguyên ký là hai từ?', 'Văn và tự khác nhau thế nào? Cho mình hai ví dụ mới, không trùng với bài.'],
  feynman: 'Giải thích cho một bạn cùng lớp sự khác nhau giữa tự và từ bằng một ví dụ tiếng Việt và một ví dụ Hán văn, rồi chỉ ra vì sao 妻子 là cái bẫy.',
  essay: 'Chọn một chương Luận ngữ đã học (ví dụ 1.1 hoặc 2.4). Chép nguyên văn, chia chuỗi chữ thành từng từ (dùng dấu / để ngăn), ghi chú chỗ nào là từ đa âm, chỗ nào hai chữ cạnh nhau nhưng là hai từ.',
  exam: {
    points: ['Văn: kết cấu đơn giản (日 月 木); tự: kết cấu phức tạp, ghép từ văn (明 林 江) — theo Thuyết văn giải tự', 'Tự 字: đơn vị của hệ thống văn tự Hán, thống nhất hình – âm – nghĩa', 'Từ 詞: đơn vị ý nghĩa, đơn vị của ngôn ngữ', 'Ba quan hệ: một tự = một từ (仁 義 禮 智 信 / 人 馬 木 雨 風); tự vô nghĩa trong từ đa âm (葡萄 琵琶 徘徊); tự có nghĩa nhưng không giữ nguyên nghĩa (小人 君子)', 'Văn ngôn chủ yếu là từ đơn âm; tiếng Hán hiện đại song âm hoá', 'Bẫy: 妻子 = vợ con, 先生 = bậc cha anh, 地方 = đất vuông…; thử tách từng chữ trước, kiểm tra bằng ngữ cảnh'],
    qs: ['Khi một tự có nhiều nghĩa và đứng trong một tổ hợp hai chữ, bạn sẽ dùng những manh mối nào để quyết định nó thuộc một từ hay đứng riêng?', 'Âm Hán Việt giúp và gây khó cho việc phân biệt tự – từ như thế nào?']
  },
  readings: ['Giáo trình của lớp: phần Tự và Từ', 'Thiều Chửu, Hán Việt tự điển: tra các chữ 妻, 子, 先, 生, 絕, 境 để xem chữ có những nghĩa nào', 'Đọc trọn Đào hoa nguyên ký (bản có nguyên văn và chú thích)']
};

const HV_DONDAAM = {
  id: 'hv-dondaam', kind: 'lang', short: 'Cấu tạo từ', title: 'Từ đơn âm, đa âm · Từ đơn, từ ghép', sub: 'Điệp tự, song thanh, điệp vận, từ ngoại lai, từ ghép — và cách xác định ranh giới từ khi đọc', who: 'Phần II · Từ vựng văn ngôn',
  goals: ['Phân biệt từ đơn âm và từ đa âm; biết từ đa âm ba âm tiết trở lên chủ yếu là phiên âm', 'Nhận diện hiện tượng rút gọn từ song âm thành đơn âm trong thơ (麒麟 → 麟)', 'Phân loại từ đơn đa âm: từ láy (điệp tự, song thanh, điệp vận) và từ ngoại lai', 'Phân biệt từ ghép đẳng lập và từ ghép chính phụ; hiểu nghĩa từ ghép không phải phép cộng'],
  q: '“Bồi hồi”, “lung linh”, “tỳ bà”, “bồ tát”, “xã tắc” — bạn dùng những từ này trong tiếng Việt. Bạn có biết chúng được cấu tạo theo những cách rất khác nhau không?',
  context: '<p>Bài trước phân biệt tự và từ. Bài này đi sâu vào <b>cấu tạo của từ</b>: theo số âm tiết (đơn âm / đa âm) và theo cách kết hợp (từ đơn / từ ghép). Hai cách chia này cắt nhau: một từ đa âm có thể là từ đơn (葡萄 — không chia nhỏ được) hoặc từ ghép (天下 — mỗi chữ có nghĩa).</p><p>Rất nhiều ví dụ trong bài là từ Hán Việt bạn đã quen — học bài này cũng là học về gốc gác của tiếng Việt.</p>',
  lecture: [
    { h: 'Hai cách chia từ: theo âm tiết và theo cấu tạo', html: `<p>Có hai trục phân loại, đừng lẫn với nhau:</p>
<table class="ac-tbl"><tr><th></th><th>Từ đơn (đơn thuần, không chia nhỏ về nghĩa)</th><th>Từ ghép (gồm các thành tố có nghĩa)</th></tr>
<tr><th>Đơn âm (1 tự)</th><td>家 gia, 身 thân, 牛 ngưu, 峰 phong, 嶺 lĩnh</td><td>—</td></tr>
<tr><th>Đa âm (≥ 2 tự)</th><td>Từ láy: 悠悠, 徘徊<br>Từ ngoại lai: 葡萄, 菩薩</td><td>天下, 社稷, 干戈, 君子</td></tr></table>
<p>Như vậy: mọi từ đơn âm đều là từ đơn; nhưng từ đa âm có thể là từ đơn (nếu không tách được thành các phần có nghĩa) hoặc từ ghép.</p>` },
    { h: 'Từ đơn âm và từ đa âm', html: `<p><b>Từ đơn âm</b> được biểu thị bằng <b>một tự</b>, thống nhất ba mặt hình – âm – nghĩa: 仁 nhân, 義 nghĩa, 禮 lễ, 智 trí, 信 tín. Như bài trước đã nói, đây là kiểu từ chiếm đại đa số trong văn ngôn.</p>
<p><b>Từ đa âm</b> được biểu thị bằng <b>hai tự trở lên</b>. Trong đó:</p>
<ul><li><b>Từ song âm tiết</b> (hai âm tiết) chiếm đa số.</li><li><b>Từ ba âm tiết trở lên</b> rất ít, phần lớn là <b>phiên âm</b> tên sự vật, chức tước, địa danh, thuật ngữ ngoại lai: 巴羅密 ba la mật (quả mít — theo ví dụ của lớp), 波羅蜜多 ba la mật đa (thuật ngữ Phật giáo, “đến bờ bên kia”, phiên âm từ tiếng Phạn), 單于 thiền vu (vua Hung Nô).</li></ul>
<p>Tên các loài vật nhỏ thường là từ song âm không tách được: 蝴蝶 hồ điệp (con bướm), 蜘蛛 tri thù (con nhện), 螞蟻 mã nghĩ (con kiến), 蛤蚧 cáp giới (con tắc kè). Để ý chúng đều có chung bộ 虫 (trùng) — hai chữ cùng bộ là dấu hiệu thường gặp của một từ song âm không tách được.</p>` },
    { h: 'Rút gọn từ song âm thành đơn âm', html: `<p>Trong <b>thơ và văn vần</b>, vì số chữ bị giới hạn (năm chữ, bảy chữ một câu), từ song âm thường được <b>rút gọn</b> còn một chữ:</p>
<ul><li>麒麟 kỳ lân → 麟 lân (con thú trong thần thoại).</li><li>鳳凰 phượng hoàng → 鳳 phượng.</li><li>鴛鴦 uyên ương → 鴛 hoặc 鴦.</li></ul>
<p>Hệ quả khi đọc: gặp một chữ như 麟 đứng một mình trong thơ, phải nhận ra nó là <b>hình thức rút gọn</b> và dịch đầy đủ (“con kỳ lân”). Ví dụ nổi tiếng: Xuân Thu chép năm 481 TCN “tây thú hoạch lân” (西狩獲麟 — đi săn ở phía tây bắt được con lân); truyền thống kể Khổng Tử dừng bút chép Xuân Thu ở câu này. Thành ngữ “tuyệt bút ư hoạch lân” (dừng bút ở chỗ bắt được lân) cũng từ đây.</p>` },
    { h: 'Từ đơn đa âm (I): từ láy — điệp tự, song thanh, điệp vận', html: `<p>Phần lớn từ đơn nhiều âm tiết là <b>từ láy</b> — các âm tiết lặp lại toàn bộ hoặc một phần. Văn ngôn có ba kiểu:</p>
<ol><li><b>Láy toàn phần — điệp tự</b> (重言, lặp chữ): 悠悠 du du (xa xăm, dằng dặc), 蕭蕭 tiêu tiêu (tiếng gió hiu hắt), 青青 thanh thanh (xanh xanh), 關關 quan quan (tiếng chim kêu). Điệp tự thường miêu tả âm thanh, trạng thái, cảm xúc — rất nhiều trong Kinh Thi.</li>
<li><b>Láy một phần — song thanh</b> (雙聲): hai âm tiết <b>cùng phụ âm đầu</b>: 玲瓏 linh lung (lóng lánh), 參差 sâm si (so le), 仿佛 phảng phất.</li>
<li><b>Láy một phần — điệp vận</b> (疊韻): hai âm tiết <b>cùng vần</b>: 徘徊 bồi hồi (đi đi lại lại, quanh quẩn), 盤桓 bàn hoàn (quanh quẩn, lần lữa), 窈窕 yểu điệu, 逍遙 tiêu dao.</li></ol>
<p><b>Ghi chú về thuật ngữ:</b> slide của lớp gộp các ví dụ láy một phần (lung linh, bồi hồi, bàn hoàn) dưới tên chung “song thanh”. Nhiều giáo trình gọi chung là “song thanh điệp vận”. Nếu tách kỹ thì <i>bồi hồi, bàn hoàn</i> thuộc điệp vận (trùng vần), còn <i>linh lung</i> thuộc song thanh (trùng phụ âm đầu). Khi làm bài trên lớp, hãy dùng cách gọi của thầy cô; hiểu cả hai sẽ giúp bạn không bị lúng túng. Lưu ý thêm: trong tiếng Hán, từ “lung linh” viết là <b>玲瓏</b> (linh lung) — người Việt đọc đảo thành “lung linh”.</p>
<p><b>Mẹo nhận diện:</b> hai chữ cùng bộ thủ (徘徊 cùng bộ 彳, 玲瓏 cùng bộ 王/玉) và âm Hán Việt có phụ âm đầu hoặc vần lặp lại → rất có thể là từ láy, phải dịch cả cụm.</p>` },
    { h: 'Từ đơn đa âm (II): từ cổ và từ ngoại lai', html: `<p>Loại thứ hai là những từ vay mượn hoặc phiên âm từ ngôn ngữ khác, mà mỗi chữ chỉ ghi âm:</p>
<ul><li>Từ Phật giáo, phiên âm tiếng Phạn: 剎那 sát na (khoảnh khắc cực ngắn, kṣaṇa), 菩提 bồ đề (giác ngộ, bodhi), 菩薩 bồ tát (bodhisattva), 涅槃 niết bàn (nirvāṇa), 佛陀 phật đà (buddha — rút gọn thành 佛 phật).</li>
<li>Từ đi qua Con đường tơ lụa từ Tây Vực: 琵琶 tỳ bà (nhạc cụ), 葡萄 bồ đào (nho), 苜蓿 mục túc (cỏ linh lăng), 獅子 sư tử.</li></ul>
<p>Để ý hiện tượng <b>rút gọn</b> cũng xảy ra ở đây: 佛陀 → 佛, 菩提薩埵 → 菩薩. Và tiếng Việt vay lại qua âm Hán Việt: niết bàn, bồ tát, sát na (“trong khoảnh khắc sát na”), tỳ bà. Như vậy những từ này đi một hành trình dài: tiếng Phạn → chữ Hán → âm Hán Việt.</p>` },
    { h: 'Từ ghép và cách xác định ranh giới từ', html: `<p><b>Từ ghép</b> gồm hai (hay nhiều) tự <b>đều có nghĩa</b>, kết hợp thành một nghĩa mới. Hai kiểu chính:</p>
<ul><li><b>Ghép đẳng lập</b> (hai thành tố ngang nhau): 社稷 xã tắc (thần đất + thần lúa → quốc gia), 干戈 can qua (khiên + giáo → chiến tranh), 骨肉 cốt nhục (xương + thịt → ruột thịt), 國家 quốc gia, 父母 phụ mẫu.</li>
<li><b>Ghép chính phụ</b> (một thành tố bổ nghĩa cho thành tố kia, thành tố phụ đứng <b>trước</b>): 天子 thiên tử (con của trời → vua), 小人 tiểu nhân, 君子 quân tử, 天下 thiên hạ (dưới trời → cả thế giới).</li></ul>
<p>Nghĩa của từ ghép thường <b>không phải phép cộng</b>: 干戈 không phải “khiên và giáo” mà là “chiến tranh” (hoán dụ). 社稷 không phải “hai vị thần” mà là “đất nước”. Đây là nghĩa mở rộng (bài sau).</p>
<p><b>Quy trình xác định ranh giới từ khi đọc</b> (tổng hợp bài 6 – 7):</p>
<ol><li>Hai chữ có phải từ láy (lặp chữ, lặp phụ âm đầu/vần, cùng bộ) hay phiên âm (tách riêng vô nghĩa)? → gộp thành một từ đơn.</li>
<li>Có phải từ ghép cố định đã biết (tra Đào Duy Anh)? → gộp, nhưng kiểm tra ngữ cảnh.</li>
<li>Nếu không → hiểu từng chữ là một từ đơn, rồi kiểm tra bằng ngữ cảnh (nhớ bẫy 妻子).</li></ol>` }
  ],
  texts: [
    { title: 'Kinh Thi mở đầu: điệp tự, điệp vận và từ ghép', src: 'Kinh Thi · Chu Nam · Quan thư (đoạn đầu)', lang: 'zh-TW',
      orig: '關關雎鳩，在河之洲。\n窈窕淑女，君子好逑。',
      reading: 'Quan quan thư cưu, tại hà chi châu.\nYểu điệu thục nữ, quân tử hảo cầu.',
      vi: 'Đôi chim thư cưu kêu “quan quan”, ở trên cồn giữa sông.\nNgười con gái hiền thục yểu điệu, là bạn tốt của người quân tử.',
      notes: [['關關 quan quan', 'điệp tự, tượng thanh: tiếng chim kêu hoà nhau'], ['雎鳩 thư cưu', 'tên một loài chim nước (từ song âm, tên loài vật)'], ['洲 châu', 'cồn, bãi giữa sông'], ['窈窕 yểu điệu', 'điệp vận: dáng thướt tha, dịu dàng (cũng hiểu là sâu kín, nết na)'], ['淑女 thục nữ', 'ghép chính phụ: người con gái hiền'], ['君子 quân tử', 'ghép chính phụ; ở đây chỉ chàng trai quý tộc'], ['好逑 hảo cầu', 'người bạn đời tốt (逑 = 仇, bạn đôi)']],
      guide: ['Tìm trong hai câu thơ: một từ điệp tự, một từ điệp vận, một từ tên loài vật, hai từ ghép chính phụ.', '之 trong 河之洲 có chức năng gì? (Gợi ý: định ngữ đứng trước danh từ.)'],
      comment: '<p>Đây là bài thơ đầu tiên của Kinh Thi — và chỉ trong tám chữ đầu đã có gần đủ các kiểu cấu tạo từ của bài này: điệp tự <b>關關</b>, tên loài chim <b>雎鳩</b>, điệp vận <b>窈窕</b>, từ ghép <b>淑女</b>, <b>君子</b>. Chữ <b>君子</b> ở đây còn mang nghĩa gốc (chàng trai quý tộc), chưa phải nghĩa đạo đức của Khổng Tử — một ví dụ đẹp cho bài sau về nghĩa cổ và sự biến đổi nghĩa.</p><p><b>河之洲</b>: 河 (sông) là định ngữ, đứng <b>trước</b> 洲 (cồn), nối bằng 之 — “cồn của sông”, tức cồn giữa sông. Đây là trật tự định ngữ – danh từ mà người Việt phải đảo khi dịch.</p>' },
    { title: 'Tiếng gió hiu hắt sông Dịch', src: 'Sử ký · Thích khách liệt truyện — bài ca của Kinh Kha', lang: 'zh-TW',
      orig: '風蕭蕭兮易水寒，\n壯士一去兮不復還。',
      reading: 'Phong tiêu tiêu hề Dịch thuỷ hàn,\nTráng sĩ nhất khứ hề bất phục hoàn.',
      vi: 'Gió hiu hắt chừ, sông Dịch lạnh,\nTráng sĩ một đi chừ, không trở về.',
      notes: [['蕭蕭 tiêu tiêu', 'điệp tự: tiếng gió thổi hiu hắt'], ['兮 hề', 'ngữ khí từ giữa câu trong thơ Sở (“chừ”)'], ['易水 Dịch thuỷ', 'sông Dịch (nước Yên)'], ['壯士 tráng sĩ', 'ghép chính phụ: người dũng sĩ'], ['去 khứ', 'rời đi (nghĩa cổ: rời khỏi, không phải “đi đến”)'], ['復 phục', 'lại, trở lại']],
      guide: ['Điệp tự 蕭蕭 tả âm thanh hay tạo không khí? Thử dịch bằng một từ láy tiếng Việt.', 'Chữ 去 ở đây nghĩa là “đi đến” hay “rời đi”? (Bài sau sẽ bàn nghĩa cổ của 去.)'],
      comment: '<p>Kinh Kha hát bài này bên sông Dịch trước khi đi hành thích Tần Vương. Điệp tự <b>蕭蕭</b> vừa là tiếng gió vừa là tâm trạng — một chức năng điển hình của từ láy trong thơ: gợi cảm giác bằng âm thanh. Tiếng Việt dịch rất tự nhiên bằng từ láy “hiu hắt”, “hiu hiu”.</p><p>Đây cũng là ví dụ về chữ <b>去</b> mang nghĩa cổ “rời đi”, và <b>兮</b> — một hư từ chỉ có trong thể thơ Sở từ (bài 20).</p>' },
    { title: 'Bàn hoàn và bồi hồi', src: 'Đào Uyên Minh, Quy khứ lai từ — trích', lang: 'zh-TW',
      orig: '景翳翳以將入，撫孤松而盤桓。',
      reading: 'Cảnh ế ế dĩ tương nhập, phủ cô tùng nhi bàn hoàn.',
      vi: 'Bóng mặt trời mờ mờ sắp lặn, (ta) vuốt cây thông lẻ loi mà lần lữa quanh quẩn.',
      notes: [['景 cảnh', 'ở đây: ánh mặt trời, bóng nắng (nghĩa cổ)'], ['翳翳 ế ế', 'điệp tự: mờ mờ, tối dần'], ['以 dĩ', 'liên từ, nối hai vế'], ['將 tương', 'sắp (phó từ)'], ['撫 phủ', 'vuốt, xoa'], ['孤松 cô tùng', 'cây thông đứng một mình'], ['盤桓 bàn hoàn', 'điệp vận: quanh quẩn, lần lữa không nỡ rời']],
      guide: ['Câu này có một điệp tự và một từ láy điệp vận. Tìm chúng.', 'Chủ ngữ của câu bị lược. Bạn khôi phục chủ ngữ là ai?'],
      comment: '<p>Bài “Quy khứ lai từ” (Về đi thôi) là lời từ quan về quê của Đào Uyên Minh. Hai chữ <b>盤桓</b> — quanh quẩn bên cây thông — diễn tả tâm trạng thong thả, lưu luyến. Trong tiếng Việt, “bàn hoàn” chuyển sang nghĩa “bối rối, băn khoăn”; ở đây phải hiểu theo nghĩa gốc “đi đi lại lại, lần lữa”.</p><p>Câu cũng cho thấy hai hiện tượng ngữ pháp sẽ học sau: <b>tỉnh lược chủ ngữ</b> (người vuốt cây thông là tác giả, không được nói ra) và <b>景</b> mang nghĩa cổ “ánh mặt trời”.</p>' }
  ],
  concepts: [
    { id: 'don-am', han: '單音詞', term: 'Từ đơn âm', def: 'Từ được biểu thị bằng một tự, thống nhất hình – âm – nghĩa; kiểu từ chiếm đa số trong văn ngôn.', ex: '仁, 義, 禮, 智, 信; 家, 身, 牛.', counter: 'Từ đa âm như 蝴蝶 — hai tự mới thành một từ.', rel: ['da-am'], write: '單' },
    { id: 'da-am', han: '多音詞', term: 'Từ đa âm', def: 'Từ biểu thị bằng hai tự trở lên; song âm tiết chiếm đa số, ba âm tiết trở lên rất ít (chủ yếu phiên âm). Trong thơ, từ song âm hay bị rút gọn (麒麟 → 麟).', ex: '蝴蝶 hồ điệp, 蜘蛛 tri thù, 蛤蚧 cáp giới; 巴羅密 ba la mật.', counter: 'Hai từ đơn đứng cạnh nhau (妻子 = vợ + con).', rel: ['don-am', 'lay', 'ngoai-lai'] },
    { id: 'lay', han: '重言 · 雙聲 · 疊韻', term: 'Từ láy: điệp tự, song thanh, điệp vận', def: 'Từ đơn nhiều âm tiết có âm lặp lại: điệp tự (lặp nguyên chữ), song thanh (cùng phụ âm đầu), điệp vận (cùng vần). Slide của lớp gọi chung láy một phần là “song thanh”.', ex: 'Điệp tự 悠悠, 蕭蕭; song thanh 玲瓏 (linh lung), 參差; điệp vận 徘徊, 盤桓, 窈窕.', counter: 'Từ ghép đẳng lập như 父母 — hai chữ không lặp âm, mỗi chữ có nghĩa riêng.', rel: ['da-am'], write: '徘徊' },
    { id: 'ngoai-lai', han: '外來詞', term: 'Từ ngoại lai, từ phiên âm', def: 'Từ vay mượn từ ngôn ngữ khác, mỗi chữ chỉ ghi âm; nhiều từ Phật giáo (tiếng Phạn) và từ Tây Vực.', ex: '剎那 sát na, 菩提 bồ đề, 菩薩 bồ tát, 琵琶 tỳ bà, 葡萄 bồ đào.', counter: 'Từ ghép thuần Hán như 天子 — mỗi chữ có nghĩa.', rel: ['da-am'], write: '菩薩' },
    { id: 'tu-ghep', han: '複合詞', term: 'Từ ghép đẳng lập và chính phụ', def: 'Từ gồm các tự đều có nghĩa. Đẳng lập: hai thành tố ngang nhau (社稷, 干戈); chính phụ: thành tố phụ đứng trước bổ nghĩa cho thành tố chính (天子, 小人). Nghĩa thường không phải phép cộng.', ex: '干戈 can qua = chiến tranh; 社稷 xã tắc = quốc gia.', counter: 'Từ láy 徘徊 — không tách thành hai phần có nghĩa.', rel: ['da-am'], write: '社稷' }
  ],
  drills: [
    { t: 'mcq', ch: '悠悠', q: '悠悠 (du du) thuộc kiểu từ nào?', o: ['Điệp tự (láy toàn phần)', 'Điệp vận', 'Từ ghép đẳng lập', 'Từ ngoại lai'], a: 0, why: 'Lặp nguyên một chữ → điệp tự.' },
    { t: 'mcq', ch: '徘徊', q: '徘徊 (bồi hồi) — nếu phân biệt kỹ song thanh và điệp vận — thuộc loại nào?', o: ['Song thanh (cùng phụ âm đầu)', 'Điệp vận (cùng vần)', 'Điệp tự', 'Từ ghép chính phụ'], a: 1, why: 'bồi – hồi (Bắc Kinh pái – huái) trùng vần → điệp vận. Slide của lớp gộp chung dưới “láy một phần (song thanh)”.' },
    { t: 'mcq', ch: '玲瓏', q: '玲瓏 (linh lung) thuộc loại nào?', o: ['Song thanh (cùng phụ âm đầu)', 'Điệp vận', 'Điệp tự', 'Từ ngoại lai'], a: 0, why: 'linh – lung (líng – lóng) cùng phụ âm đầu l → song thanh. Người Việt đọc đảo thành “lung linh”.' },
    { t: 'mcq', ch: '剎那', q: '剎那 (sát na) là:', o: ['Từ láy', 'Từ ghép đẳng lập', 'Từ ngoại lai phiên âm từ tiếng Phạn', 'Hai từ đơn'], a: 2, why: 'kṣaṇa (khoảnh khắc) trong tiếng Phạn, phiên âm qua Phật giáo.' },
    { t: 'mcq', ch: '社稷', q: '社稷 (xã tắc) là kiểu từ gì và nghĩa là gì?', o: ['Từ láy, nghĩa “vững vàng”', 'Từ ghép đẳng lập, nghĩa “quốc gia”', 'Từ ghép chính phụ, nghĩa “thần đất”', 'Từ ngoại lai'], a: 1, why: '社 (thần đất) + 稷 (thần lúa) ngang hàng → đẳng lập; nghĩa mở rộng: quốc gia.' },
    { t: 'mcq', ch: '天子', q: '天子 (thiên tử) là:', o: ['Từ ghép đẳng lập', 'Từ ghép chính phụ', 'Từ láy', 'Từ đơn âm'], a: 1, why: '天 bổ nghĩa cho 子 (con của trời), thành tố phụ đứng trước → chính phụ.' },
    { t: 'mcq', ch: '麟', q: 'Chữ 麟 đứng một mình trong thơ thường là:', o: ['Một từ đơn âm độc lập vốn có', 'Hình thức rút gọn của từ song âm 麒麟 (kỳ lân)', 'Một từ ngoại lai', 'Một hư từ'], a: 1, why: 'Trong thơ và văn vần, từ song âm thường rút gọn còn một chữ: 麒麟 → 麟.' },
    { t: 'mcq', q: 'Từ đa âm ba âm tiết trở lên trong văn ngôn chủ yếu là:', o: ['Từ láy', 'Phiên âm tên sự vật, chức tước, thuật ngữ ngoại lai', 'Từ ghép đẳng lập', 'Thành ngữ'], a: 1, why: 'Ví dụ 巴羅密 ba la mật, 波羅蜜多, 單于 thiền vu.' },
    { t: 'mcq', ch: '干戈', q: '干戈 (can qua) trong văn cổ thường nghĩa là:', o: ['Cái khiên và cây giáo (nghĩa đen)', 'Chiến tranh', 'Binh lính', 'Vũ khí nói chung'], a: 1, why: 'Từ ghép đẳng lập, nghĩa mở rộng theo hoán dụ: dụng cụ chiến tranh → chiến tranh.' },
    { t: 'tr', src: '關關雎鳩，在河之洲。', rd: 'Quan quan thư cưu, tại hà chi châu.', a: 'Đôi chim thư cưu kêu quan quan, ở trên cồn giữa sông.', why: '關關: tiếng chim (điệp tự); 雎鳩: tên chim; 在: ở; 河之洲: cồn của sông — định ngữ 河 đứng trước, nối bằng 之.' },
    { t: 'tr', src: '撫孤松而盤桓', rd: 'Phủ cô tùng nhi bàn hoàn', a: '(Ta) vuốt cây thông lẻ loi mà quanh quẩn, lần lữa.', why: 'Chủ ngữ bị lược; 撫: vuốt; 孤松: cây thông lẻ (chính phụ); 而: mà; 盤桓: điệp vận, quanh quẩn.' }
  ],
  socra: ['Cho mình hai từ láy tiếng Việt gốc Hán (ngoài bài) và thử xếp chúng vào điệp tự, song thanh hay điệp vận.', 'Vì sao hai chữ cùng bộ thủ thường là dấu hiệu của một từ không tách được?', 'Khác nhau giữa 干戈 (từ ghép) và 葡萄 (từ ngoại lai) là gì, nếu cả hai đều là từ đa âm?'],
  feynman: 'Giải thích sơ đồ hai trục (đơn âm/đa âm × từ đơn/từ ghép) cho một người bạn, mỗi ô một ví dụ.',
  essay: 'Lấy bài thơ “Quan thư” (đoạn đầu) hoặc bài ca của Kinh Kha: phân tích cấu tạo của từng từ (đơn âm/đa âm, láy, ghép), rồi dịch nghĩa sát từng chữ.',
  exam: {
    points: ['Hai trục: số âm tiết (đơn âm / đa âm) và cấu tạo (từ đơn / từ ghép)', 'Từ đơn âm: một tự, hình – âm – nghĩa (仁 義 禮 智 信)', 'Từ đa âm: song âm tiết chiếm đa số; ≥ 3 âm tiết chủ yếu phiên âm (巴羅密; 蝴蝶, 蜘蛛, 螞蟻, 蛤蚧)', 'Rút gọn trong thơ: 麒麟 → 麟, 鳳凰 → 鳳', 'Từ láy: điệp tự (悠悠 蕭蕭), song thanh (玲瓏), điệp vận (徘徊 盤桓 窈窕) — slide gộp láy một phần là “song thanh”', 'Từ ngoại lai: 剎那, 琵琶, 葡萄, 菩提, 菩薩', 'Từ ghép đẳng lập (社稷, 干戈) và chính phụ (天子, 小人); nghĩa không phải phép cộng', 'Quy trình xác định ranh giới từ: láy/phiên âm → từ ghép cố định → tách từng chữ + kiểm tra ngữ cảnh'],
    qs: ['Tiếng Việt vay nhiều từ láy và từ ngoại lai qua âm Hán Việt. Có từ nào đã đổi nghĩa khi vào tiếng Việt (như “bàn hoàn”)?', 'Vì sao thơ hay rút gọn từ song âm? Điều đó gây khó gì cho người đọc?']
  },
  readings: ['Giáo trình của lớp: phần Từ đơn và từ ghép', 'Kinh Thi — bài Quan thư (đọc trọn, để ý các từ láy)', 'Đào Duy Anh, Hán Việt từ điển: tra 社稷, 干戈, 骨肉, 盤桓']
};

const HV_NGHIA = {
  id: 'hv-nghia', kind: 'lang', short: 'Nghĩa của từ', title: 'Nghĩa của từ', sub: 'Nghĩa gốc và nghĩa mở rộng, nghĩa cổ và nghĩa mới, từ đồng nghĩa, từ nhiều nghĩa — đọc văn cổ bằng con mắt lịch sử', who: 'Phần II · Từ vựng văn ngôn',
  goals: ['Phân biệt nghĩa gốc và nghĩa mở rộng; dùng hình thể chữ để tìm nghĩa gốc (解 = 角 + 刀 + 牛)', 'Nêu được các con đường mở rộng nghĩa (dẫn thân, giả tá)', 'Phân biệt nghĩa cổ và nghĩa mới; biết vì sao không nên dùng từ điển Hán ngữ hiện đại cho văn bản cổ', 'Phân biệt các từ đồng nghĩa theo phạm vi và điều kiện sử dụng (崩 / 薨 / 卒 / 不祿 / 死)'],
  q: 'Chữ 走 người Trung Quốc ngày nay đọc là “đi”. Vậy khi Hàn Phi viết 兔走觸株, con thỏ “đi” đâm vào gốc cây sao? Nghĩa của một chữ có đứng yên qua hai nghìn năm không?',
  context: '<p>Học thuộc một nghĩa cho mỗi chữ là chưa đủ. Một chữ Hán thường có <b>nhiều nghĩa</b>, sinh ra từ một <b>nghĩa gốc</b>, và nghĩa của nó <b>đổi theo thời gian</b>. Đọc văn cổ mà dùng nghĩa hiện đại là nguồn lỗi lớn thứ hai (sau lỗi gộp sai từ ở bài 6).</p><p>Tin tốt cho người Việt: âm Hán Việt và từ Hán Việt <b>giữ lại rất nhiều nghĩa cổ</b> mà tiếng Hán hiện đại đã mất. Bài này sẽ cho bạn thấy điều đó.</p>',
  lecture: [
    { h: 'Nghĩa gốc và nghĩa mở rộng', html: `<p><b>Nghĩa gốc</b> (本義 bản nghĩa): nghĩa nhất thiết phải có, được xác định là nghĩa cơ bản của từ trong từ điển — thường là nghĩa mà hình chữ phản ánh. <b>Nghĩa mở rộng</b> (引申義 dẫn thân nghĩa): nghĩa cụ thể trong kết hợp từ, phát triển từ nghĩa gốc; có thể có, có thể không.</p>
<p>Ví dụ trên lớp: <b>解</b> giải.</p>
<ul><li>Xét hình thể chữ: 角 giác (cặp sừng) + 刀 đao (dao) + 牛 ngưu (con trâu) → <b>dùng dao làm thịt trâu</b>, cắt lấy bộ sừng. Đó là nghĩa gốc. Trang Tử kể chuyện 庖丁解牛 — anh bếp Đinh mổ trâu (đọc ở phần Văn bản).</li>
<li>Nghĩa mở rộng: tách ra, phanh ra (分解 phân giải) → làm cho rõ ràng (解釋 giải thích) → cởi bỏ (解衣 giải y — cởi áo) → thoát khỏi (解脫 giải thoát) → giải quyết.</li></ul>
<p>Các ví dụ khác cho thấy hình chữ là manh mối tìm nghĩa gốc:</p>
<ul><li><b>本</b> bản: 木 (cây) + một vạch ở gốc → <b>gốc cây</b> → căn bản, nguồn gốc. 末 mạt: vạch ở ngọn → <b>ngọn cây</b> → cuối, phần ngọn (bản mạt = gốc ngọn).</li>
<li><b>兵</b> binh: hai tay cầm cái rìu (斤) → <b>binh khí</b> → người cầm binh khí, quân lính → việc quân.</li>
<li><b>習</b> tập: chim non vỗ cánh (羽) → <b>tập bay</b> → luyện tập (nhớ 學而時習之).</li>
<li><b>道</b> đạo: <b>con đường</b> → phương pháp → đạo lý → và cả <b>nói</b> (不足為外人道也 — “không đáng nói cho người ngoài biết”, Đào hoa nguyên ký).</li></ul>
<p>Chú ý: chiết tự để tìm nghĩa gốc phải dựa trên <b>hình chữ cổ</b> (giáp cốt, kim văn, triện), không chỉ hình chữ khải hiện nay — phần Lục thư sẽ bàn kỹ.</p>` },
    { h: 'Các con đường mở rộng nghĩa', html: `<p>Một chữ có thể có nghĩa mới bằng hai con đường rất khác nhau:</p>
<ol><li><b>Dẫn thân</b> (引申): nghĩa mới phát triển từ nghĩa gốc theo liên tưởng — có <b>quan hệ logic</b> với nghĩa gốc.
<ul><li>Theo <i>tương đồng</i> (ẩn dụ): 本 gốc cây → gốc rễ của sự việc.</li><li>Theo <i>gần gũi</i> (hoán dụ): 兵 binh khí → người cầm binh khí; 干戈 khiên giáo → chiến tranh.</li><li>Từ <i>cụ thể</i> đến <i>trừu tượng</i>: 解 mổ trâu → giải thích, giải thoát.</li></ul></li>
<li><b>Giả tá</b> (假借): mượn chữ đồng âm để ghi một từ khác — nghĩa mới <b>không liên quan</b> đến nghĩa gốc. 來 vốn là cây lúa mạch → mượn ghi “đến”; 而 vốn là râu → mượn làm liên từ “mà”; 其 vốn là cái nia → mượn làm đại từ “ấy, của nó”.</li></ol>
<p>Phân biệt hai con đường này rất quan trọng: nghĩa dẫn thân thì <b>suy ra được</b> từ nghĩa gốc (nhớ một nghĩa gốc là hiểu được cả chùm nghĩa); nghĩa giả tá thì <b>phải học riêng</b>. Hầu hết hư từ là kết quả của giả tá hoặc hư hoá (bài 9).</p>` },
    { h: 'Nghĩa cổ và nghĩa mới', html: `<p><b>Nghĩa cổ</b>: nghĩa trong thư tịch, văn bản cổ đại. <b>Nghĩa mới</b>: nghĩa trong khẩu ngữ, chủ yếu từ Đường – Tống trở đi cho đến thời hiện đại. Ví dụ trên lớp:</p>
<ul><li><b>走</b> tẩu: cổ = <b>chạy</b> → mới = đi (chậm). Hàn Phi: 兔走觸株 — “con thỏ <b>chạy</b> đâm vào gốc cây”.</li>
<li><b>快</b> khoái: cổ = <b>vui, sướng</b> → mới = nhanh. Tống Ngọc: 快哉此風 — “sướng thay ngọn gió này!”.</li></ul>
<p>Thêm một số chữ hay gặp:</p>
<table class="ac-tbl"><tr><th>Chữ</th><th>Nghĩa cổ</th><th>Nghĩa mới</th><th>Tiếng Việt còn giữ nghĩa cổ</th></tr>
<tr><td>走 tẩu</td><td>chạy</td><td>đi</td><td>tẩu thoát, bôn tẩu</td></tr>
<tr><td>快 khoái</td><td>vui, sướng</td><td>nhanh</td><td>khoái chí, khoái lạc</td></tr>
<tr><td>去 khứ</td><td>rời khỏi</td><td>đi đến</td><td>khứ hồi, quá khứ, trừ khử</td></tr>
<tr><td>涕 thế</td><td>nước mắt</td><td>nước mũi</td><td>“thế khấp” (khóc chảy nước mắt)</td></tr>
<tr><td>湯 thang</td><td>nước nóng</td><td>canh</td><td>“phó thang đạo hoả” (xông vào nước sôi lửa bỏng)</td></tr>
<tr><td>臭 xú</td><td>mùi nói chung</td><td>mùi hôi</td><td>(tiếng Việt đã theo nghĩa mới: xú uế)</td></tr>
<tr><td>再 tái</td><td>hai lần</td><td>lại, lần nữa</td><td>tái bái (lạy hai lạy)</td></tr>
<tr><td>景 cảnh</td><td>ánh mặt trời</td><td>phong cảnh</td><td>—</td></tr></table>
<p><b>Người Việt thường biết nghĩa cổ, ít biết nghĩa mới; người Trung Quốc hiện đại thì ngược lại</b> — nghĩa cổ đã trở nên xa lạ, muốn hiểu phải tra từ điển. Đây là một lợi thế thật sự của người Việt khi học Hán văn cổ. Nhưng cũng vì vậy, <b>phải cẩn trọng khi dùng từ điển Hán ngữ hiện đại</b> (hay Google Dịch) để đọc văn bản cổ: chúng cho bạn nghĩa mới.</p>` },
    { h: 'Từ đồng nghĩa: cùng chỉ một việc, khác phạm vi', html: `<p><b>Từ đồng nghĩa</b>: nhiều từ khác nhau cùng biểu thị một sự vật, hiện tượng. Nhưng nội hàm của mỗi từ có khác: nghĩa có thể <b>mở rộng hoặc thu hẹp</b>, <b>phạm vi và điều kiện sử dụng</b> có thể không giống nhau.</p>
<p>Ví dụ kinh điển — các từ chỉ “chết” theo đẳng cấp. <i>Lễ ký</i>, thiên Khúc lễ hạ viết:</p>
<blockquote><span class="han">天子死曰崩，諸侯曰薨，大夫曰卒，士曰不祿，庶人曰死。</span><br>Thiên tử chết gọi là <b>băng</b>, chư hầu gọi là <b>hoăng</b>, đại phu gọi là <b>tốt</b>, kẻ sĩ gọi là <b>bất lộc</b>, thường dân gọi là <b>tử</b>.</blockquote>
<p>(Slide của lớp ghi kẻ sĩ chết là “thất lộc 失祿”; nguyên văn Lễ ký là “bất lộc 不祿” — không còn hưởng lộc. Bạn hỏi lại thầy cô xem lớp theo nguồn nào nhé.) Tiếng Việt còn giữ: “băng hà” (vua chết), “tốt” trong “tử tốt”.</p>
<p>Đồng nghĩa có thể mang <b>thái độ đánh giá</b>: 殺 sát (giết — trung tính), 誅 tru (giết kẻ có tội — chính đáng), 弒 thí (bề dưới giết bề trên — đại nghịch). Chọn chữ nào là <b>phán xét đạo đức</b>: đó là “bút pháp Xuân Thu”. Mạnh Tử dùng đúng điều này để biện hộ việc diệt vua Trụ: “Chỉ nghe nói giết (誅) kẻ thất phu tên Trụ, chưa nghe nói giết vua (弒君)” — nối với học thuyết chính danh ở khoá Triết học Trung Quốc.</p>
<p>Đồng nghĩa có thể khác ở <b>đặc điểm sự vật</b>: 岵 hỗ (núi có cây cỏ), 屺 dĩ (núi trọc), 岑 sầm (núi nhỏ mà cao). Kinh Thi có bài 陟岵: “Lên núi có cỏ cây (岵) mà trông cha… Lên núi trọc (屺) mà trông mẹ…”.</p>
<p>Phân biệt rõ từ đồng nghĩa giúp hiểu sâu hơn tính hàm súc của Hán văn, và những nét nghĩa uyển chuyển, tinh tế của văn bản.</p>` },
    { h: 'Từ nhiều nghĩa, từ trái nghĩa và chữ nhiều âm', html: `<p><b>Từ nhiều nghĩa</b>: hầu hết các chữ thường dùng đều nhiều nghĩa (như 解, 道 ở trên). Khi đọc, nghĩa nào đúng do <b>ngữ cảnh</b> quyết định — và do <b>từ loại</b> của chữ trong câu (bài 9).</p>
<p><b>Từ trái nghĩa</b> thường đi thành cặp, rất hay gặp trong văn đối và thành ngữ: 本 – 末 (gốc – ngọn), 文 – 質 (văn vẻ – chất phác), 義 – 利 (nghĩa – lợi), 君子 – 小人, 古 – 今. Nắm cặp trái nghĩa giúp đoán nghĩa trong câu đối.</p>
<p><b>Một chữ nhiều âm, mỗi âm một nghĩa</b> (phá âm — đổi âm để đổi nghĩa hoặc từ loại). Người Việt học Hán văn phải đặc biệt chú ý vì âm Hán Việt giữ các phân biệt này:</p>
<ul><li>樂: <b>nhạc</b> (âm nhạc), <b>lạc</b> (vui), <b>nhạo</b> (yêu thích): 智者樂水 — “người trí <b>thích</b> nước”.</li><li>說: <b>thuyết</b> (nói), <b>duyệt</b> (vui = 悅), <b>thuế</b> (thuyết phục, du thuyết).</li><li>好: <b>hảo</b> (tốt), <b>hiếu</b> (ưa thích: 好學 hiếu học).</li><li>惡: <b>ác</b> (xấu), <b>ố</b> (ghét: 好惡 hiếu ố — ưa ghét).</li><li>長: <b>trường</b> (dài), <b>trưởng</b> (lớn, người đứng đầu).</li></ul>
<p>Đọc sai âm (ví dụ đọc 好學 là “hảo học”) cũng là hiểu sai nghĩa và từ loại.</p>` },
    { h: 'Phương pháp: đọc nghĩa từ bằng con mắt lịch sử', html: `<p>Tổng hợp thành một quy trình khi gặp một chữ trong văn bản cổ:</p>
<ol><li><b>Xác định từ loại</b> của chữ trong câu (danh, động, hình dung hay hư từ?).</li>
<li><b>Tra từ điển có nghĩa cổ</b>: Thiều Chửu (Hán Việt tự điển) ghi nhiều nghĩa cổ kèm ví dụ; cao hơn có <i>Khang Hy tự điển</i>, <i>Từ nguyên</i>, <i>Hán ngữ đại từ điển</i>. Tránh dựa vào từ điển Hán ngữ hiện đại.</li>
<li><b>Bắt đầu từ nghĩa gốc</b> (xét hình chữ) rồi xem nghĩa dẫn thân nào hợp ngữ cảnh.</li>
<li><b>Để ý âm đọc</b> (chữ nhiều âm) và <b>sắc thái</b> (đồng nghĩa có đánh giá).</li>
<li><b>Kiểm tra bằng ngữ cảnh</b>: nếu bản dịch tạo ra điều vô lý (con thỏ “đi” đâm vào gốc cây mà chết?), hãy quay lại bước 2.</li></ol>
<p>Cuối cùng, hãy có <b>cái nhìn lịch sử</b> đối với nghĩa của từ Hán: một chữ không có “một nghĩa đúng”, mà có một lịch sử nghĩa. Biết lịch sử ấy là biết đọc văn cổ.</p>` }
  ],
  texts: [
    { title: 'Bào Đinh mổ trâu — nghĩa gốc của 解', src: 'Trang Tử · Dưỡng sinh chủ (trích)', lang: 'zh-TW',
      orig: '庖丁為文惠君解牛，手之所觸，肩之所倚，足之所履，膝之所踦……莫不中音。',
      reading: 'Bào Đinh vị Văn Huệ quân giải ngưu, thủ chi sở xúc, kiên chi sở ỷ, túc chi sở lý, tất chi sở ỷ …… mạc bất trúng âm.',
      vi: 'Anh bếp tên Đinh mổ trâu cho vua Văn Huệ: chỗ tay chạm vào, chỗ vai tì vào, chỗ chân đạp lên, chỗ gối tì xuống…… không đâu là không hợp với âm nhạc.',
      notes: [['庖 bào', 'người làm bếp'], ['為 vị', 'cho, vì (giới từ — đọc “vị”)'], ['解牛 giải ngưu', 'mổ trâu, xẻ thịt trâu — nghĩa gốc của 解'], ['觸 xúc', 'chạm vào'], ['倚 ỷ', 'tựa, tì'], ['履 lý', 'giẫm, đạp lên'], ['踦 ỷ', 'tì gối, quỳ một gối'], ['莫不 mạc bất', 'không gì là không (phủ định kép = khẳng định)'], ['中 trúng', 'đúng, hợp với']],
      guide: ['Chữ 解 ở đây dùng nghĩa gốc hay nghĩa mở rộng? Hình chữ (角 + 刀 + 牛) giúp gì cho bạn?', 'Bốn cụm “手之所觸，肩之所倚…” có cùng một cấu trúc. Tìm điểm chung (gợi ý: 之 và 所).'],
      comment: '<p>Câu mở đầu chuyện “Bào Đinh giải ngưu” là ví dụ hoàn hảo cho nghĩa gốc của <b>解</b>: dùng dao xẻ trâu, đúng như hình chữ. Ở cuối câu chuyện, Trang Tử dùng hình ảnh này để nói về dưỡng sinh: con dao của Bào Đinh dùng mười chín năm vẫn sắc vì nó đi theo những khe hở tự nhiên — “giải” ở đây đã bắt đầu mang nghĩa “tách ra theo lẽ tự nhiên”.</p><p>Về ngữ pháp, chuỗi <b>手之所觸，肩之所倚，足之所履，膝之所踦</b> là bốn kết cấu song song “danh từ + 之 + 所 + động từ” = “chỗ mà tay chạm”… — kết cấu 所 sẽ học ở bài Trợ từ. Và <b>莫不</b> (không gì không) là phủ định kép để khẳng định mạnh.</p>' },
    { title: 'Ôm cây đợi thỏ — nghĩa cổ của 走', src: 'Hàn Phi Tử · Ngũ đố (trích)', lang: 'zh-TW',
      orig: '宋人有耕者，田中有株，兔走觸株，折頸而死，因釋其耒而守株，冀復得兔。兔不可復得，而身為宋國笑。',
      reading: 'Tống nhân hữu canh giả, điền trung hữu chu, thố tẩu xúc chu, chiết cảnh nhi tử, nhân thích kỳ lỗi nhi thủ chu, ký phục đắc thố. Thố bất khả phục đắc, nhi thân vi Tống quốc tiếu.',
      vi: 'Người nước Tống có kẻ cày ruộng, trong ruộng có gốc cây; một con thỏ chạy đâm vào gốc cây, gãy cổ mà chết. Người ấy nhân đó bỏ cày mà ngồi giữ gốc cây, mong lại được thỏ. Thỏ không thể lại có được, mà bản thân thì bị người nước Tống cười.',
      notes: [['耕者 canh giả', 'người cày ruộng (kết cấu 者 = người…)'], ['株 chu', 'gốc cây'], ['走 tẩu', 'chạy (nghĩa cổ!)'], ['觸 xúc', 'đâm vào, chạm vào'], ['頸 cảnh', 'cổ'], ['因 nhân', 'nhân đó, bèn'], ['釋 thích', 'buông, bỏ'], ['耒 lỗi', 'cái cày'], ['冀 ký', 'mong'], ['復 phục', 'lại'], ['為…笑 vi … tiếu', 'bị … cười (câu bị động với 為)']],
      guide: ['Nếu dịch 走 theo nghĩa hiện đại (“đi”), câu chuyện có gì vô lý?', 'Câu cuối 身為宋國笑 là câu bị động. Ai cười ai? (Bài 28 sẽ học kỹ câu bị động.)'],
      comment: '<p>Đây là nguồn gốc thành ngữ “ôm cây đợi thỏ” (thủ chu đãi thố). Chữ <b>走</b> phải hiểu là <b>chạy</b> — một con thỏ đi chầm chậm thì không thể đâm gãy cổ. Tiếng Việt vẫn giữ nghĩa này trong “tẩu thoát”.</p><p>Hàn Phi kể chuyện này để chế giễu những người muốn dùng phép trị nước của các bậc vua xưa cho thời nay — tức là chế giễu Nho gia (nối với khoá Triết học Trung Quốc, phần Pháp gia). Đoạn văn cũng có nhiều điểm ngữ pháp: kết cấu <b>者</b> (耕者 — người cày), liên từ <b>而</b> nối thuận (折頸而死) và nghịch (而身為宋國笑), câu bị động <b>為…笑</b>.</p>' },
    { title: 'Năm cách nói “chết”', src: 'Lễ ký · Khúc lễ hạ', lang: 'zh-TW',
      orig: '天子死曰崩，諸侯曰薨，大夫曰卒，士曰不祿，庶人曰死。',
      reading: 'Thiên tử tử viết băng, chư hầu viết hoăng, đại phu viết tốt, sĩ viết bất lộc, thứ nhân viết tử.',
      vi: 'Thiên tử chết gọi là băng, chư hầu chết gọi là hoăng, đại phu chết gọi là tốt, kẻ sĩ chết gọi là bất lộc, thường dân chết gọi là tử.',
      notes: [['曰 viết', 'gọi là (động từ có chức năng hệ từ, bài 11)'], ['崩 băng', 'núi lở — thiên tử chết như núi lở'], ['薨 hoăng', 'chư hầu chết'], ['卒 tốt', 'xong, hết — đại phu chết'], ['不祿 bất lộc', 'không còn hưởng lộc — kẻ sĩ chết (slide lớp ghi 失祿 thất lộc)'], ['庶人 thứ nhân', 'thường dân']],
      guide: ['Câu này lược bớt chữ nào ở các vế sau? Khôi phục đầy đủ vế thứ hai.', 'Vì sao một xã hội lại cần năm từ khác nhau cho cùng một việc “chết”?'],
      comment: '<p>Câu này vừa là ví dụ về từ đồng nghĩa phân theo đẳng cấp, vừa là ví dụ về <b>tỉnh lược</b>: chỉ vế đầu có đủ “天子<b>死</b>曰崩”, các vế sau lược chữ 死 (諸侯[死]曰薨…) vì đã rõ từ vế trước. Đây là cách văn ngôn tiết kiệm chữ (bài 25).</p><p>Hệ thống từ ngữ này là biểu hiện của <b>lễ</b> nhà Chu — mỗi người có vị trí, kể cả trong cái chết (nối với bài Lễ và Chính danh ở khoá Triết học Trung Quốc). Đọc sử Việt Nam, bạn sẽ gặp lại: “vua băng”, và việc dùng chữ cho người chết luôn là một lựa chọn chính trị.</p>' },
    { title: 'Giết vua hay giết kẻ thất phu?', src: 'Mạnh Tử · Lương Huệ vương hạ (trích)', lang: 'zh-TW',
      orig: '賊仁者謂之賊，賊義者謂之殘，殘賊之人謂之一夫。聞誅一夫紂矣，未聞弒君也。',
      reading: 'Tặc nhân giả vị chi tặc, tặc nghĩa giả vị chi tàn, tàn tặc chi nhân vị chi nhất phu. Văn tru nhất phu Trụ hĩ, vị văn thí quân dã.',
      vi: 'Kẻ hại điều nhân gọi là tặc, kẻ hại điều nghĩa gọi là tàn; người tàn tặc gọi là kẻ thất phu. Chỉ nghe nói đã giết kẻ thất phu tên Trụ, chưa nghe nói giết vua.',
      notes: [['賊 tặc', 'động từ: làm hại; danh từ: kẻ làm hại'], ['謂之 vị chi', 'gọi là'], ['殘 tàn', 'kẻ tàn hại'], ['一夫 nhất phu', 'một kẻ tầm thường, kẻ thất phu (bị mọi người lìa bỏ)'], ['誅 tru', 'giết kẻ có tội'], ['紂 Trụ', 'vua cuối nhà Thương, bạo chúa'], ['弒 thí', 'bề dưới giết bề trên'], ['未 vị', 'chưa']],
      guide: ['Chữ 賊 xuất hiện hai lần với hai từ loại khác nhau. Đâu là động từ, đâu là danh từ?', 'Mạnh Tử đã dùng sự khác nhau giữa 誅 và 弒 để lập luận điều gì?'],
      comment: '<p>Tề Tuyên Vương hỏi: “Bề tôi giết vua có được không?” (chuyện Vũ Vương diệt Trụ). Mạnh Tử trả lời bằng một nước cờ <b>từ vựng</b>: Trụ đã hại nhân nghĩa nên không còn là “vua” mà chỉ là “kẻ thất phu”; vì vậy việc giết hắn là <b>誅</b> (giết kẻ có tội), không phải <b>弒</b> (giết vua). Cả một lập luận chính trị đứng trên sự phân biệt từ đồng nghĩa!</p><p>Chữ <b>賊</b> trong cùng một câu vừa là động từ (賊仁 — hại nhân) vừa là danh từ (謂之賊 — gọi là kẻ tặc): một ví dụ sớm về tính linh hoạt từ loại mà ta sẽ học ở bài 9 và bài 15.</p>' }
  ],
  concepts: [
    { id: 'goc-mr', han: '本義 · 引申義', term: 'Nghĩa gốc và nghĩa mở rộng', def: 'Nghĩa gốc: nghĩa cơ bản, thường phản ánh trong hình chữ. Nghĩa mở rộng: nghĩa phát triển từ nghĩa gốc trong các kết hợp từ, có thể có hoặc không.', ex: '解: gốc = mổ trâu (角 + 刀 + 牛); mở rộng = tách ra, giải thích, giải thoát.', counter: 'Nghĩa giả tá — mượn âm, không liên quan đến nghĩa gốc (來: lúa mạch → đến).', rel: ['duong-mr', 'co-moi'], write: '解' },
    { id: 'duong-mr', han: '引申 · 假借', term: 'Dẫn thân và giả tá', def: 'Dẫn thân: nghĩa mới phát triển từ nghĩa gốc theo liên tưởng (ẩn dụ, hoán dụ, cụ thể → trừu tượng), suy ra được. Giả tá: mượn chữ đồng âm, nghĩa mới không liên quan, phải học riêng.', ex: 'Dẫn thân: 兵 binh khí → quân lính. Giả tá: 而 râu → liên từ “mà”.', counter: 'Hai nghĩa của chữ nhiều âm (樂 nhạc/lạc) — đó là phá âm, đổi âm đọc.', rel: ['goc-mr'], write: '兵' },
    { id: 'co-moi', han: '古義 · 今義', term: 'Nghĩa cổ và nghĩa mới', def: 'Nghĩa cổ: trong thư tịch cổ đại; nghĩa mới: trong khẩu ngữ từ Đường – Tống đến nay. Người Việt thường biết nghĩa cổ (qua từ Hán Việt); cẩn trọng với từ điển Hán ngữ hiện đại.', ex: '走: chạy → đi (tẩu thoát); 快: vui → nhanh (khoái chí); 去: rời khỏi → đi đến (khứ hồi).', counter: 'Nghĩa mở rộng trong cùng thời kỳ — không phải sự thay đổi theo thời gian.', rel: ['goc-mr'], write: '走' },
    { id: 'dong-nghia', han: '同義詞', term: 'Từ đồng nghĩa', def: 'Nhiều từ cùng biểu thị một sự vật, hiện tượng nhưng khác nội hàm, phạm vi, điều kiện sử dụng hoặc thái độ đánh giá.', ex: '崩 / 薨 / 卒 / 不祿 / 死 (chết theo đẳng cấp); 殺 / 誅 / 弒; 岵 / 屺 / 岑.', counter: 'Từ nhiều nghĩa — một từ nhiều nghĩa, không phải nhiều từ một nghĩa.', rel: ['co-moi'], write: '崩' },
    { id: 'pha-am', han: '破音字', term: 'Chữ nhiều âm (phá âm)', def: 'Một chữ có nhiều âm đọc, mỗi âm ứng với một nghĩa hoặc từ loại; âm Hán Việt giữ được các phân biệt này nên đọc sai âm là hiểu sai nghĩa.', ex: '樂 nhạc/lạc/nhạo; 說 thuyết/duyệt/thuế; 好 hảo/hiếu; 惡 ác/ố.', counter: 'Từ đồng âm khác chữ (同, 銅, 童 đều đọc “đồng”).', rel: ['dong-nghia'], write: '樂' }
  ],
  drills: [
    { t: 'mcq', ch: '解', q: 'Nghĩa gốc của 解 (giải) theo hình chữ là:', o: ['Giải thích', 'Dùng dao làm thịt trâu, cắt lấy sừng', 'Cởi trói', 'Giải quyết'], a: 1, why: '解 = 角 (sừng) + 刀 (dao) + 牛 (trâu). Các nghĩa kia đều là nghĩa mở rộng.' },
    { t: 'mcq', ch: '走', q: 'Trong câu 兔走觸株，折頸而死, 走 nghĩa là:', o: ['Đi', 'Chạy', 'Nhảy', 'Bò'], a: 1, why: 'Nghĩa cổ của 走 là chạy (tiếng Việt: tẩu thoát). Nghĩa “đi” là nghĩa mới.' },
    { t: 'mcq', ch: '快', q: '快 trong 快哉此風 nghĩa là:', o: ['Nhanh', 'Vui, sướng', 'Mạnh', 'Mát'], a: 1, why: 'Nghĩa cổ của 快 là vui sướng (khoái chí). “Nhanh” là nghĩa mới.' },
    { t: 'mcq', ch: '薨', q: 'Theo Lễ ký, 薨 (hoăng) dùng cho cái chết của:', o: ['Thiên tử', 'Chư hầu', 'Đại phu', 'Thường dân'], a: 1, why: 'Thiên tử – băng; chư hầu – hoăng; đại phu – tốt; sĩ – bất lộc; thứ nhân – tử.' },
    { t: 'mcq', ch: '弒', q: 'Chữ 弒 (thí) khác 誅 (tru) ở chỗ:', o: ['弒 là giết kẻ có tội; 誅 là giết vua', '弒 là bề dưới giết bề trên; 誅 là giết kẻ có tội', 'Hai chữ hoàn toàn đồng nghĩa', '弒 chỉ dùng cho động vật'], a: 1, why: 'Đồng nghĩa nhưng khác thái độ đánh giá: 弒 = đại nghịch, 誅 = trừng trị chính đáng. Mạnh Tử dùng sự khác biệt này khi bàn về vua Trụ.' },
    { t: 'mcq', ch: '來', q: 'Chữ 來 vốn là cây lúa mạch, được dùng ghi từ “đến”. Đây là con đường:', o: ['Dẫn thân (ẩn dụ)', 'Giả tá (mượn chữ đồng âm)', 'Nghĩa cổ – nghĩa mới', 'Từ đồng nghĩa'], a: 1, why: 'Nghĩa “đến” không liên quan đến lúa mạch — mượn chữ đồng âm, tức giả tá.' },
    { t: 'mcq', ch: '兵', q: '兵: binh khí → người cầm binh khí → quân đội. Đây là:', o: ['Giả tá', 'Dẫn thân theo hoán dụ', 'Phá âm', 'Nghĩa mới thời hiện đại'], a: 1, why: 'Nghĩa mới có quan hệ gần gũi (hoán dụ) với nghĩa gốc → dẫn thân.' },
    { t: 'mcq', ch: '樂', q: 'Trong câu 智者樂水，仁者樂山, chữ 樂 đọc và nghĩa là:', o: ['nhạc — âm nhạc', 'lạc — vui', 'nhạo — yêu thích', 'lạc — rơi xuống'], a: 2, why: '樂 đọc “nhạo” = ưa thích: người trí thích nước, người nhân thích núi.' },
    { t: 'mcq', q: 'Vì sao nên cẩn trọng khi dùng từ điển Hán ngữ hiện đại để đọc văn bản cổ?', o: ['Vì từ điển hiện đại dùng giản thể', 'Vì nhiều chữ đã đổi nghĩa, từ điển hiện đại cho nghĩa mới', 'Vì từ điển hiện đại không có âm Hán Việt', 'Vì văn bản cổ không có từ loại'], a: 1, why: 'Ví dụ 走, 快, 去 — từ điển hiện đại sẽ cho “đi, nhanh, đến”, sai với văn cổ.' },
    { t: 'tr', src: '兔走觸株，折頸而死。', rd: 'Thố tẩu xúc chu, chiết cảnh nhi tử.', a: 'Con thỏ chạy đâm vào gốc cây, gãy cổ mà chết.', why: '走 = chạy (nghĩa cổ); 觸 = đâm vào; 株 = gốc cây; 折頸 = gãy cổ; 而 = mà (nối thuận).' },
    { t: 'tr', src: '聞誅一夫紂矣，未聞弒君也。', rd: 'Văn tru nhất phu Trụ hĩ, vị văn thí quân dã.', a: 'Chỉ nghe nói giết kẻ thất phu tên Trụ, chưa nghe nói giết vua.', why: '誅 = giết kẻ có tội; 一夫 = kẻ thất phu; 弒 = bề dưới giết bề trên; 未 = chưa; 矣, 也 = ngữ khí từ.' }
  ],
  socra: ['Cho mình một từ Hán Việt bạn dùng hằng ngày mà bạn nghĩ đang giữ nghĩa cổ của chữ Hán. Chúng ta cùng kiểm tra nhé.', 'Làm sao phân biệt một nghĩa là dẫn thân hay giả tá?', 'Nếu gặp chữ 去 trong một câu văn cổ, bạn sẽ làm gì để chắc là dịch đúng?'],
  feynman: 'Giải thích cho một người bạn vì sao 兔走觸株 không thể dịch là “con thỏ đi đâm vào gốc cây”, và qua đó nói vì sao phải có cái nhìn lịch sử về nghĩa của từ.',
  essay: 'Chọn 5 chữ (ngoài bài) có nghĩa cổ khác nghĩa mới. Với mỗi chữ: nghĩa gốc (theo hình chữ, nếu tìm được), nghĩa cổ, nghĩa mới, và một từ Hán Việt còn giữ nghĩa cổ. Tra Thiều Chửu để kiểm chứng.',
  exam: {
    points: ['Nghĩa gốc: nghĩa cơ bản trong từ điển; nghĩa mở rộng: nghĩa cụ thể trong kết hợp từ, có thể có, có thể không', '解 = 角 + 刀 + 牛: gốc = làm thịt trâu; mở rộng = tách ra, phanh ra, làm cho rõ ràng', 'Hai con đường mở rộng: dẫn thân (suy ra được) và giả tá (mượn âm, học riêng)', 'Nghĩa cổ (thư tịch cổ) — nghĩa mới (khẩu ngữ từ Đường – Tống): 走 chạy → đi, 快 vui → nhanh; người Việt biết nghĩa cổ, người TQ hiện đại biết nghĩa mới', 'Cẩn trọng khi dùng từ điển Hán ngữ hiện đại cho văn bản cổ', 'Đồng nghĩa: 崩 – 薨 – 卒 – 不祿 (slide: 失祿) – 死; 岵 – 屺 – 岑; 殺 – 誅 – 弒', 'Chữ nhiều âm: 樂 nhạc/lạc/nhạo, 說, 好, 惡, 長'],
    qs: ['Có nghĩa nào bạn thấy khó phân định là dẫn thân hay giả tá không?', 'Tiếng Việt giữ nghĩa cổ của chữ Hán — đó có phải chỉ là lợi thế, hay cũng có lúc gây hiểu sai?']
  },
  readings: ['Giáo trình của lớp: phần Nghĩa của từ', 'Thiều Chửu, Hán Việt tự điển: tra 解, 走, 快, 去, 涕, 再 và đọc hết các nghĩa', 'Trang Tử · Dưỡng sinh chủ — đọc trọn chuyện Bào Đinh mổ trâu']
};

const HV_TULOAI = {
  id: 'hv-tuloai', kind: 'lang', short: 'Thực từ – hư từ', title: 'Từ loại trong văn ngôn: thực từ và hư từ', sub: 'Khái niệm từ loại, bốn thực từ cơ bản, sáu loại hư từ, “chi hồ giả dã hĩ yên tai” và hiện tượng hư hoá', who: 'Phần II · Từ vựng văn ngôn — cửa ngõ vào Ngữ pháp',
  goals: ['Biết từ loại là khái niệm du nhập từ ngôn ngữ học châu Âu, và vì sao vẫn dùng nó cho Hán văn', 'Định nghĩa thực từ và hư từ; kể được bốn thực từ cơ bản và sáu loại hư từ', 'Giải nghĩa câu “chi hồ giả dã hĩ yên tai — thất tự năng thông đạt tú tài” và vai trò của bảy hư từ ấy', 'Hiểu hiện tượng hư hoá và phân biệt với giả tá', 'Xác định từ loại của một chữ dựa vào vị trí và chức năng trong câu'],
  q: 'Người xưa nói: chỉ cần dùng thông bảy chữ 之 乎 者 也 矣 焉 哉 là đủ làm tú tài. Bảy chữ ấy không chỉ sự vật nào, không chỉ hành động nào — vậy vì sao chúng quan trọng đến thế?',
  context: '<p>Bài này là <b>cửa ngõ vào phần Ngữ pháp</b>. Ba phần tiếp theo của khoá — Thực từ, Hư từ, Cú pháp — đều dựa trên sự phân biệt <b>thực từ / hư từ</b> mà bài này dựng lên.</p><p>Một lưu ý trước khi bắt đầu: văn ngôn <b>không có biến hình từ</b> (không có đuôi chỉ danh từ, động từ như tiếng Anh). Một chữ là danh từ hay động từ phụ thuộc vào <b>vị trí và chức năng</b> của nó trong câu. Vì vậy học từ loại trong Hán văn là học cách <b>nhìn chữ trong câu</b>.</p>',
  lecture: [
    { h: 'Khái quát về từ loại trong tiếng Hán', html: `<p><b>Từ loại</b> vốn là khái niệm do ngôn ngữ học châu Âu đưa vào thời kỳ cận đại. Năm 1898, Mã Kiến Trung xuất bản <i>Mã thị văn thông</i> — cuốn ngữ pháp tiếng Hán có hệ thống đầu tiên, phân chia từ loại theo mô hình ngữ pháp Latin. Từ đó, các công trình về ngữ pháp Hán ngữ đều vận dụng khái niệm từ loại, dù có nhiều quan điểm khác nhau khi phân chia.</p>
<p>Trước đó, truyền thống Trung Hoa chỉ phân biệt <b>thực tự</b> 實字 (chữ “đặc”, có nội dung) và <b>hư tự</b> 虛字 (chữ “rỗng”, chỉ có tác dụng ngữ pháp) — phân biệt này đã thấy từ thời Tống trong các sách bàn về làm thơ, viết văn.</p>
<p>Vấn đề từ loại trong Hán ngữ liên quan mật thiết đến việc xác định <b>đơn vị cơ bản là tự</b> (nhớ bài 6). Tuy có khác biệt trong quan niệm giữa 字 và 詞, ngữ văn học Trung Hoa vẫn dùng hệ thống từ loại để trình bày ngữ pháp, cả ngôn ngữ viết lẫn ngôn ngữ nói. Giáo trình của chúng ta chấp nhận cách phân chia phổ biến hiện hành: <b>thực từ và hư từ</b>.</p>` },
    { h: 'Thực từ: có nghĩa từ vựng, đứng được độc lập', html: `<p><b>Thực từ</b> 實詞 là những từ có “nghĩa thực”, còn gọi là <b>nghĩa từ vựng</b> — loại nghĩa nhờ nó mà từ liên hệ được với sự vật, hiện tượng nhất định. Thực từ chiếm đa số trong tiếng Hán (cả nói và viết), và có khả năng <b>đứng độc lập để đảm nhiệm phần đề và phần thuyết trong một nòng cốt câu</b>.</p>
<p>Bốn thực từ cơ bản:</p>
<table class="ac-tbl"><tr><th>Loại</th><th>Chức năng</th><th>Ví dụ</th></tr>
<tr><td><b>Danh từ</b> 名詞</td><td>định danh sự vật, hiện tượng</td><td>人, 山, 水, 君, 仁, 春</td></tr>
<tr><td><b>Động từ</b> 動詞</td><td>chỉ hành động, động tác; gồm tự động từ, tha động từ, hệ từ</td><td>來, 去, 學, 愛, 為</td></tr>
<tr><td><b>Hình dung từ</b> 形容詞</td><td>hình dung, chỉ ra tính chất của sự vật, hiện tượng</td><td>大, 小, 高, 美, 善</td></tr>
<tr><td><b>Đại từ</b> 代詞</td><td>thay thế danh từ; gồm nhân xưng, chỉ thị</td><td>吾, 我, 汝, 此, 彼</td></tr></table>
<p>Một số giáo trình xếp thêm <b>số từ</b> (一, 二, 百, 千) và <b>lượng từ</b> vào thực từ — khoá này sẽ có một bài riêng (bài 13). Mỗi loại thực từ sẽ được học kỹ trong Phần III.</p>
<p><b>Thử nghiệm “đứng độc lập”</b>: trong câu 山高 (núi cao), 山 làm phần đề, 高 làm phần thuyết — chỉ hai thực từ đã đủ một câu. Thử làm câu chỉ bằng 之 và 也 xem — không được.</p>` },
    { h: 'Hư từ: chỉ có nghĩa ngữ pháp', html: `<p><b>Hư từ</b> 虛詞 chỉ có <b>ý nghĩa ngữ pháp</b>, không có ý nghĩa từ vựng. Số lượng không nhiều nhưng <b>tần suất sử dụng rất cao, lặp đi lặp lại</b>. Hư từ không đứng độc lập làm thành phần chính của câu; nó làm “keo dán” và “dấu hiệu”: nối các từ, biểu thị quan hệ, thái độ, ngữ khí.</p>
<p>Sáu loại hư từ:</p>
<table class="ac-tbl"><tr><th>Loại</th><th>Chức năng</th><th>Ví dụ</th></tr>
<tr><td><b>Phó từ</b> 副詞</td><td>chỉ trạng thái, mức độ, thời gian, phủ định… (bổ nghĩa cho động từ, hình dung từ)</td><td>不, 未, 甚, 皆, 將</td></tr>
<tr><td><b>Giới từ</b> 介詞</td><td>nối, môi giới giữa động từ và tân ngữ (chỉ công cụ, nơi chốn, đối tượng…)</td><td>以, 於, 自, 與, 為</td></tr>
<tr><td><b>Liên từ</b> 連詞</td><td>nối các từ, các vế cùng vai</td><td>而, 與, 且, 則, 雖</td></tr>
<tr><td><b>Trợ từ</b> 助詞</td><td>phụ trợ về mặt ngữ pháp và ngữ nghĩa (tạo kết cấu)</td><td>之, 者, 所</td></tr>
<tr><td><b>Ngữ khí từ</b> 語氣詞</td><td>phụ trợ về mặt tình cảm, thái độ</td><td>也, 矣, 乎, 哉, 焉</td></tr>
<tr><td><b>Tượng thanh từ</b> 象聲詞</td><td>mô phỏng tiếng động, âm thanh</td><td>關關, 蕭蕭</td></tr></table>
<p><b>Ghi chú:</b> việc xếp phó từ vào hư từ hay thực từ là một chỗ các giáo trình không thống nhất (vì phó từ có nghĩa khá cụ thể như “không”, “rất”). Một số sách còn tách <b>thán từ</b> (嗚呼, 噫) thành loại riêng. Khoá này theo cách xếp của lớp: phó từ thuộc hư từ.</p>` },
    { h: '“Chi hồ giả dã hĩ yên tai — thất tự năng thông đạt tú tài”', html: `<p>Câu nói đùa nổi tiếng của các nhà nho: <span class="han">之乎者也矣焉哉，七字能通達秀才</span> — “Chi, hồ, giả, dã, hĩ, yên, tai — bảy chữ ấy dùng thông thạo thì đạt tới tú tài.” Câu này cho thấy: muốn viết và đọc Hán văn, nắm được hư từ quan trọng không kém nắm được hàng nghìn thực từ. Làm quen nhanh với bảy chữ (mỗi chữ sẽ được học kỹ ở Phần IV):</p>
<table class="ac-tbl"><tr><th>Chữ</th><th>Âm HV</th><th>Cách dùng thường gặp</th><th>Ví dụ</th></tr>
<tr><td>之</td><td>chi</td><td>trợ từ “của” (nối định ngữ); đại từ “nó, việc ấy”; động từ “đi”</td><td>河之洲 · 學而時習之</td></tr>
<tr><td>乎</td><td>hồ</td><td>ngữ khí từ nghi vấn, cảm thán (“chăng, ư”); giới từ (= 於)</td><td>不亦說乎</td></tr>
<tr><td>者</td><td>giả</td><td>trợ từ: “người / cái / việc mà…”; đánh dấu phần đề</td><td>耕者 · 陳勝者</td></tr>
<tr><td>也</td><td>dã</td><td>ngữ khí từ khẳng định, phán đoán (“vậy”); ngắt sau chủ ngữ</td><td>魚，我所欲也</td></tr>
<tr><td>矣</td><td>hĩ</td><td>ngữ khí từ: sự việc đã rồi hoặc sẽ xảy ra (“rồi”)</td><td>可以為師矣</td></tr>
<tr><td>焉</td><td>yên</td><td>ngữ khí từ; = 於之 (“ở đó”); đại từ nghi vấn (“sao, đâu”)</td><td>不復出焉</td></tr>
<tr><td>哉</td><td>tai</td><td>ngữ khí từ cảm thán (“thay!”), phản vấn</td><td>快哉此風 · 賢哉回也</td></tr></table>
<p>Bảy chữ này có một điểm chung: phần lớn đứng <b>cuối câu</b> hoặc làm dấu hiệu kết cấu. Trong văn bản không dấu câu, chúng chính là <b>“dấu câu” của người xưa</b>: thấy 也, 矣, 乎, 哉 là biết câu sắp kết thúc. Đây là manh mối quan trọng để ngắt câu (cú đậu).</p>` },
    { h: 'Hư hoá: từ thực từ thành hư từ', html: `<p>Đa số các hư từ lúc đầu có nguồn gốc thực từ, sau đó bị <b>hư hoá</b> — nghĩa từ vựng mờ dần, chỉ còn dùng với ý nghĩa ngữ pháp. Ví dụ:</p>
<ul><li><b>以</b>: gốc là động từ “dùng, lấy” → giới từ “bằng, lấy… mà” (以德服人 — lấy đức mà phục người).</li>
<li><b>為</b>: gốc là động từ “làm” → giới từ “vì, cho” (為文惠君解牛 — mổ trâu cho vua Văn Huệ).</li>
<li><b>與</b>: gốc là động từ “cho, trao; cùng tham dự” → giới từ / liên từ “cùng, với, và”.</li>
<li><b>將</b>: gốc là động từ “cầm, dẫn (quân)” → phó từ “sắp” (天將降大任 — trời sắp giao trách nhiệm lớn).</li>
<li><b>自</b>: gốc là danh từ “cái mũi” (chữ tượng hình) → đại từ “tự mình” → giới từ “từ” (有朋自遠方來).</li></ul>
<p>Hư hoá thường <b>không trọn vẹn</b>: cùng một chữ, có câu dùng như thực từ, có câu dùng như hư từ. 為 có thể là “làm” (為政 — làm chính trị) hoặc “vì” (為人謀 — mưu tính cho người). Đây là lý do phải xác định từ loại trong từng câu.</p>
<p><b>Phân biệt hư hoá và giả tá</b>: hư hoá là nghĩa ngữ pháp <b>phát triển từ</b> nghĩa thực (以 “dùng” → “bằng”: còn liên hệ). Giả tá là <b>mượn chữ đồng âm</b> để ghi một hư từ chưa có chữ: 而 (vốn là “râu”) → liên từ “mà”; 其 (vốn là “cái nia”) → đại từ “của nó”. Hai con đường khác nhau, nhưng kết quả đều là hư từ.</p>` },
    { h: 'Một chữ nhiều từ loại: xác định từ loại trong câu', html: `<p>Vì văn ngôn không biến hình, <b>một chữ có thể thuộc nhiều từ loại</b>. Chữ 之 là ví dụ điển hình:</p>
<ul><li>Động từ “đi, đến”: 吾欲之南海 — ta muốn <b>đi</b> Nam Hải.</li><li>Đại từ “nó”: 學而時習之 — học rồi thường luyện tập <b>nó</b>.</li><li>Trợ từ “của”: 河之洲 — cồn <b>của</b> sông.</li></ul>
<p>Cách xác định: nhìn <b>vị trí</b> và <b>chức năng</b>:</p>
<ol><li>Đứng sau động từ, ở cuối cụm → thường là đại từ tân ngữ (習之).</li><li>Đứng giữa hai danh từ / cụm danh từ → thường là trợ từ “của” (河之洲, 君子之道).</li><li>Đứng sau chủ ngữ, trước nơi chốn → có thể là động từ “đi” (吾欲之南海).</li></ol>
<p>Một số chữ thực từ cũng đổi loại theo vị trí — gọi là <b>từ loại hoạt dụng</b> (bài 15): danh từ dùng như động từ (君君臣臣 — vua <b>ra</b> vua), hình dung từ dùng như động từ (小天下 — <b>coi</b> thiên hạ là nhỏ). Bây giờ chỉ cần nhớ: <b>trong văn ngôn, từ loại là vai diễn của chữ trong câu, không phải nhãn cố định</b>.</p>` }
  ],
  texts: [
    { title: 'Phân tích từ loại: câu mở đầu Luận ngữ', src: 'Luận ngữ 1.1 · Học nhi', lang: 'zh-TW',
      orig: '子曰：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知而不慍，不亦君子乎？」',
      reading: 'Tử viết: “Học nhi thời tập chi, bất diệc duyệt hồ? Hữu bằng tự viễn phương lai, bất diệc lạc hồ? Nhân bất tri nhi bất uấn, bất diệc quân tử hồ?”',
      vi: 'Khổng Tử nói: “Học rồi thường xuyên luyện tập, chẳng cũng vui sao? Có bạn từ phương xa đến, chẳng cũng vui sao? Người ta không biết đến mình mà mình không giận, chẳng cũng là quân tử sao?”',
      notes: [['學 học', 'động từ (thực từ)'], ['而 nhi', 'liên từ (hư từ): nối hai động tác “học” và “tập”'], ['時 thời', 'danh từ “thời, lúc” dùng làm trạng ngữ: đúng lúc, thường xuyên'], ['之 chi', 'đại từ (thực từ): nó — điều đã học'], ['不 bất', 'phó từ phủ định (hư từ)'], ['亦 diệc', 'phó từ (hư từ): cũng'], ['說 duyệt', 'hình dung từ: vui (= 悅)'], ['乎 hồ', 'ngữ khí từ (hư từ): sao, chăng'], ['自 tự', 'giới từ (hư từ): từ'], ['遠方 viễn phương', 'hình dung từ 遠 làm định ngữ + danh từ 方: phương xa']],
      guide: ['Đếm số thực từ và hư từ trong câu đầu 學而時習之，不亦說乎. Hư từ chiếm bao nhiêu?', 'Câu thứ ba 人不知而不慍 lược mất tân ngữ của 知. Đó là gì?'],
      comment: '<p>Chỉ trong mười sáu chữ đầu đã có gần đủ các từ loại: động từ (學, 習, 來, 知), danh từ (朋, 人), hình dung từ (說, 樂, 遠), đại từ (之), phó từ (不, 亦), liên từ (而), giới từ (自), ngữ khí từ (乎). Cấu trúc <b>不亦…乎</b> (chẳng cũng… sao) lặp ba lần — đây là một <b>cấu trúc cố định</b> mang ngữ khí phản vấn nhẹ nhàng (bài 30).</p><p>Để ý chữ <b>時</b>: là danh từ nhưng đứng trước động từ 習 để làm trạng ngữ — danh từ làm trạng ngữ, sẽ học ở bài Danh từ. Và <b>人不知</b> lược tân ngữ “mình” — tỉnh lược tân ngữ (bài 25).</p>' },
    { title: 'Ôn cũ biết mới: 而, 以, 為, 矣', src: 'Luận ngữ 2.11 · Vi chính', lang: 'zh-TW',
      orig: '子曰：「溫故而知新，可以為師矣。」',
      reading: 'Tử viết: “Ôn cố nhi tri tân, khả dĩ vi sư hĩ.”',
      vi: 'Khổng Tử nói: “Ôn lại điều cũ mà biết thêm điều mới, thì có thể làm thầy được rồi.”',
      notes: [['溫 ôn', 'động từ: ôn lại (nghĩa gốc: hâm nóng)'], ['故 cố', 'hình dung từ dùng như danh từ: cái cũ'], ['而 nhi', 'liên từ: mà'], ['新 tân', 'hình dung từ dùng như danh từ: cái mới'], ['可以 khả dĩ', '可 (có thể) + 以 (giới từ, lược tân ngữ “điều đó”) → có thể lấy đó mà…'], ['為 vi', 'động từ: làm'], ['師 sư', 'danh từ: thầy'], ['矣 hĩ', 'ngữ khí từ: rồi']],
      guide: ['故 và 新 vốn là hình dung từ. Ở đây chúng đóng vai trò gì? (Gợi ý: làm tân ngữ của 溫 và 知.)', 'Phân tích 可以: một từ hay hai từ? Thử dịch theo cả hai cách.'],
      comment: '<p>Câu tám chữ này là một bài học thu nhỏ về từ loại. <b>故</b> (cũ) và <b>新</b> (mới) vốn là hình dung từ nhưng ở vị trí tân ngữ nên dùng như danh từ (“cái cũ”, “cái mới”) — một dạng hoạt dụng. <b>而</b> là liên từ nối hai cụm động từ. <b>可以</b>: các nhà ngữ pháp phân tích là 可 + 以 (có thể dựa vào đó mà), tuy trong cảm nhận đã gần với “có thể” hiện đại. Và <b>矣</b> cuối câu báo một kết quả: “thế là được rồi”.</p><p>Thành ngữ “ôn cố tri tân” trong tiếng Việt chính là từ đây.</p>' },
    { title: 'Một bài thơ hầu như toàn thực từ', src: 'Nam quốc sơn hà (tương truyền của Lý Thường Kiệt, thế kỷ XI)', lang: 'zh-TW',
      orig: '南國山河南帝居，\n截然定分在天書。\n如何逆虜來侵犯，\n汝等行看取敗虛。',
      reading: 'Nam quốc sơn hà Nam đế cư,\nTiệt nhiên định phận tại thiên thư.\nNhư hà nghịch lỗ lai xâm phạm,\nNhữ đẳng hành khan thủ bại hư.',
      vi: 'Sông núi nước Nam, vua Nam ở,\nRành rành định phận tại sách trời.\nCớ sao lũ giặc nghịch kia đến xâm phạm?\nBọn bay rồi sẽ thấy chuốc lấy thất bại.',
      notes: [['南國山河 Nam quốc sơn hà', 'định ngữ 南國 đứng trước danh từ 山河: “sông núi của nước Nam”'], ['居 cư', 'động từ: ở'], ['截然 tiệt nhiên', 'hình dung từ + hậu tố 然 (trợ từ): rõ ràng, phân minh'], ['定分 định phận', 'phận đã định'], ['在 tại', 'động từ/giới từ: ở tại'], ['天書 thiên thư', 'sách trời'], ['如何 như hà', 'đại từ nghi vấn: cớ sao, làm sao'], ['逆虜 nghịch lỗ', 'lũ giặc nghịch'], ['汝等 nhữ đẳng', 'đại từ ngôi 2 + 等 (số nhiều): bọn bay'], ['行 hành', 'phó từ: sẽ, rồi sẽ'], ['取 thủ', 'chuốc lấy'], ['敗虛 bại hư', 'thất bại (có bản chép khác chữ)']],
      guide: ['Gạch chân tất cả các hư từ (và các chữ đang dùng với chức năng ngữ pháp) trong bài. Vì sao thơ dùng ít hư từ hơn văn xuôi?', 'Câu đầu 南國山河南帝居 có cấu trúc phần đề – phần thuyết thế nào?'],
      comment: '<p>Bài thơ thần nổi tiếng nhất của Việt Nam gần như <b>chỉ toàn thực từ</b>. Câu đầu bảy chữ đều là danh từ, động từ: 南國山河 (phần đề: sông núi nước Nam) — 南帝居 (phần thuyết: vua Nam ở). Thơ, nhất là thơ Đường luật, rất tiết kiệm hư từ; quan hệ ngữ pháp được hiểu ngầm qua trật tự từ. Ngược lại, văn xuôi nghị luận (như Mạnh Tử) dùng hư từ dày đặc để lập luận chặt chẽ.</p><p>Những chữ đang làm việc ngữ pháp trong bài: 然 (hậu tố), 在 (giới từ/động từ), 如何 (đại từ nghi vấn), 等 (chỉ số nhiều), 行 (phó từ “sẽ”). Bài thơ có nhiều dị bản; bản trên là bản thông dụng trong sách giáo khoa.</p>' }
  ],
  concepts: [
    { id: 'tuloai', han: '詞類', term: 'Từ loại', def: 'Sự phân chia từ theo đặc điểm ngữ pháp; khái niệm du nhập từ ngôn ngữ học châu Âu thời cận đại (Mã thị văn thông, 1898). Giáo trình hiện hành chia thực từ và hư từ.', ex: 'Truyền thống Trung Hoa trước đó chỉ chia thực tự / hư tự.', counter: 'Biến hình từ trong tiếng Anh (-tion, -ly) — văn ngôn không có, từ loại xác định theo vị trí và chức năng.', rel: ['thuc-tu', 'hu-tu'], write: '詞類' },
    { id: 'thuc-tu', han: '實詞', term: 'Thực từ', def: 'Từ có nghĩa từ vựng (nghĩa thực), liên hệ với sự vật, hiện tượng; đứng độc lập được làm phần đề và phần thuyết trong nòng cốt câu. Bốn loại cơ bản: danh từ, động từ, hình dung từ, đại từ.', ex: '山高: 山 (danh từ, phần đề) + 高 (hình dung từ, phần thuyết).', counter: 'Hư từ như 之, 也 — không tự làm thành câu.', rel: ['tuloai', 'hu-tu'], write: '實' },
    { id: 'hu-tu', han: '虛詞', term: 'Hư từ', def: 'Từ chỉ có ý nghĩa ngữ pháp, số lượng ít nhưng tần suất cao. Sáu loại: phó từ, giới từ, liên từ, trợ từ, ngữ khí từ, tượng thanh từ.', ex: '而 (liên từ), 以 (giới từ), 也 (ngữ khí từ), 不 (phó từ).', counter: 'Thực từ như 學, 山 — có nghĩa từ vựng.', rel: ['tuloai', 'thuc-tu', 'that-tu'], write: '虛' },
    { id: 'that-tu', han: '之乎者也矣焉哉', term: 'Bảy hư từ của tú tài', def: '之 chi, 乎 hồ, 者 giả, 也 dã, 矣 hĩ, 焉 yên, 哉 tai — bảy hư từ thông dụng nhất; nhiều chữ đứng cuối câu, đóng vai “dấu câu” giúp ngắt câu.', ex: '學而時習之，不亦說乎 — có 之 và 乎.', counter: 'Thực từ thông dụng như 人, 天 — không mang chức năng ngữ pháp.', rel: ['hu-tu'], write: '之乎者也' },
    { id: 'hu-hoa', han: '虛化', term: 'Hư hoá', def: 'Quá trình thực từ mất dần nghĩa từ vựng, chỉ còn nghĩa ngữ pháp; thường không trọn vẹn nên một chữ có thể vừa là thực từ vừa là hư từ. Khác giả tá (mượn âm).', ex: '以: dùng → bằng; 為: làm → vì; 將: cầm, dẫn → sắp; 自: mũi → tự mình → từ.', counter: 'Giả tá: 而 vốn là “râu”, mượn làm liên từ — không phát triển từ nghĩa gốc.', rel: ['hu-tu'], write: '以' }
  ],
  drills: [
    { t: 'mcq', q: 'Khái niệm “từ loại” trong ngữ pháp Hán ngữ có nguồn gốc từ đâu?', o: ['Từ Thuyết văn giải tự của Hứa Thận', 'Từ ngôn ngữ học châu Âu, đưa vào thời cận đại', 'Từ các nhà nho thời Tống', 'Từ Kinh Dịch'], a: 1, why: 'Mã thị văn thông (1898) dựa theo ngữ pháp Latin. Truyền thống Trung Hoa chỉ chia thực tự / hư tự.' },
    { t: 'mcq', q: 'Đặc điểm nào là của thực từ?', o: ['Chỉ có ý nghĩa ngữ pháp', 'Có nghĩa từ vựng, đứng độc lập được làm phần đề và phần thuyết', 'Số lượng ít, tần suất cao', 'Chỉ đứng cuối câu'], a: 1, why: 'Thực từ có nghĩa thực và làm được thành phần chính của nòng cốt câu.' },
    { t: 'mcq', q: 'Đâu KHÔNG phải một trong bốn thực từ cơ bản?', o: ['Danh từ', 'Hình dung từ', 'Giới từ', 'Đại từ'], a: 2, why: 'Giới từ là hư từ. Bốn thực từ: danh từ, động từ, hình dung từ, đại từ.' },
    { t: 'mcq', ch: '而', q: '而 trong 溫故而知新 là:', o: ['Đại từ', 'Liên từ', 'Giới từ', 'Danh từ'], a: 1, why: '而 nối hai cụm động từ ngang vai “ôn cũ” và “biết mới” → liên từ.' },
    { t: 'mcq', ch: '之', q: '之 trong 學而時習之 là:', o: ['Trợ từ “của”', 'Động từ “đi”', 'Đại từ “nó” (tân ngữ)', 'Ngữ khí từ'], a: 2, why: 'Đứng sau động từ 習, cuối cụm → đại từ tân ngữ chỉ điều đã học.' },
    { t: 'mcq', ch: '之', q: '之 trong 吾欲之南海 là:', o: ['Trợ từ “của”', 'Động từ “đi, đến”', 'Đại từ “nó”', 'Liên từ'], a: 1, why: 'Sau 欲 (muốn) và trước địa danh → động từ “đi đến”: ta muốn đi Nam Hải.' },
    { t: 'mcq', ch: '自', q: '自 trong 有朋自遠方來 thuộc loại:', o: ['Danh từ “cái mũi”', 'Giới từ “từ”', 'Đại từ “tự mình”', 'Động từ'], a: 1, why: '自 đứng trước nơi chốn 遠方, chỉ điểm xuất phát → giới từ. Đây là kết quả hư hoá từ nghĩa gốc “cái mũi”.' },
    { t: 'mcq', ch: '將', q: '將 trong 天將降大任於是人也 nghĩa là “sắp”. Từ nghĩa gốc “cầm, dẫn” thành “sắp” là hiện tượng:', o: ['Giả tá', 'Hư hoá', 'Phá âm', 'Nghĩa mới thời hiện đại'], a: 1, why: 'Thực từ (động từ) mất dần nghĩa từ vựng, thành phó từ chỉ thời gian → hư hoá.' },
    { t: 'mcq', ch: '矣', q: 'Ngữ khí từ 矣 thường biểu thị:', o: ['Nghi vấn', 'Sự việc đã rồi hoặc sẽ xảy ra', 'Phán đoán “là”', 'Cảm thán “thay”'], a: 1, why: '可以為師矣 — có thể làm thầy được rồi.' },
    { t: 'tr', src: '溫故而知新，可以為師矣。', rd: 'Ôn cố nhi tri tân, khả dĩ vi sư hĩ.', a: 'Ôn lại điều cũ mà biết thêm điều mới, thì có thể làm thầy được rồi.', why: '故, 新: hình dung từ dùng như danh từ; 而: liên từ; 為: làm; 矣: rồi.' },
    { t: 'tr', src: '有朋自遠方來，不亦樂乎？', rd: 'Hữu bằng tự viễn phương lai, bất diệc lạc hồ?', a: 'Có bạn từ phương xa đến, chẳng cũng vui sao?', why: '自: giới từ “từ”; 遠方: phương xa (định ngữ đứng trước); 不亦…乎: chẳng cũng… sao.' }
  ],
  socra: ['Vì sao văn ngôn không có biến hình mà vẫn có từ loại? Từ loại được nhận ra bằng cách nào?', 'Cho mình một chữ mà bạn biết có thể vừa là thực từ vừa là hư từ, kèm hai câu ví dụ.', 'Khác nhau giữa hư hoá và giả tá là gì? Thử giải thích bằng 以 và 而.'],
  feynman: 'Giải thích cho một người bạn câu “chi hồ giả dã hĩ yên tai, thất tự năng thông đạt tú tài”: vì sao bảy chữ không có nghĩa từ vựng lại quan trọng đến vậy?',
  essay: 'Chọn một đoạn văn xuôi (ví dụ chuyện “ôm cây đợi thỏ” ở bài 8) và một bài thơ (Nam quốc sơn hà). Đếm và liệt kê hư từ trong mỗi văn bản, rồi giải thích vì sao văn xuôi nghị luận dùng nhiều hư từ hơn thơ.',
  exam: {
    points: ['Từ loại: khái niệm do ngôn ngữ học châu Âu đưa vào thời cận đại; có nhiều quan điểm phân chia; Mã thị văn thông (1898)', 'Đơn vị cơ bản là tự; truyền thống TQ: thực tự / hư tự; giáo trình hiện hành: thực từ – hư từ', 'Thực từ: có nghĩa từ vựng, đứng độc lập làm phần đề, phần thuyết trong nòng cốt câu; 4 loại: danh, động (tự động, tha động, hệ từ), hình dung, đại (nhân xưng, chỉ thị)', 'Hư từ: chỉ có nghĩa ngữ pháp, số lượng ít, tần suất cao; 6 loại: phó, giới, liên, trợ, ngữ khí, tượng thanh', '之乎者也矣焉哉 — thất tự năng thông đạt tú tài', 'Hư hoá: đa số hư từ gốc thực từ (以, 為, 與, 將, 自); khác giả tá (而, 其)', 'Một chữ nhiều từ loại (之: động / đại / trợ); xác định theo vị trí, chức năng'],
    qs: ['Phó từ nên xếp vào thực từ hay hư từ? Lập luận cho cả hai phía.', 'Nếu từ loại phụ thuộc vào vị trí, thì học nghĩa của chữ (như ở bài 8) và học từ loại (bài này) liên quan nhau thế nào?']
  },
  readings: ['Giáo trình của lớp: phần Sự phân chia từ loại trong văn ngôn', 'Luận ngữ — thiên 1 Học nhi: chọn 5 chương, gạch chân hư từ', 'Thiều Chửu: tra 之, 而, 以, 為 để thấy một chữ có bao nhiêu cách dùng']
};

const HV_DANHTU = {
  id: 'hv-danhtu', kind: 'lang', short: 'Danh từ', title: 'Danh từ', sub: 'Phân loại, chức năng trong câu, định ngữ đứng trước, danh từ làm trạng ngữ, số nhiều — và bẫy trật tự từ của người Việt', who: 'Phần III · Ngữ pháp từ loại: thực từ',
  goals: ['Định nghĩa và phân loại danh từ (chung, riêng, thời gian, phương vị)', 'Nhận diện các chức năng của danh từ: chủ ngữ, tân ngữ, định ngữ, vị ngữ, trạng ngữ', 'Dịch đúng cụm danh từ có định ngữ đứng trước (đảo trật tự khi sang tiếng Việt)', 'Nhận ra danh từ làm trạng ngữ (吾日三省, 學而時習之) và cách biểu thị số nhiều'],
  q: '“君子之道” — nếu dịch từng chữ theo thứ tự thì thành “quân tử của đạo”. Nhưng nghĩa đúng là “đạo của người quân tử”. Vì sao tiếng Việt và Hán văn lại xếp ngược nhau, và làm sao để không bao giờ dịch nhầm?',
  context: '<p>Đây là bài đầu tiên của khối <b>Ngữ pháp</b>. Danh từ là loại thực từ nhiều nhất, và cũng là chỗ người Việt mắc một lỗi rất hệ thống: <b>trật tự định ngữ</b>. Tiếng Việt nói “nhà <i>đẹp</i>”, “sách <i>của tôi</i>” (bổ nghĩa đứng sau); Hán văn nói 美室, 吾書 (bổ nghĩa đứng trước). Nắm chắc điểm này là đã dịch đúng một nửa số cụm từ trong văn cổ.</p>',
  lecture: [
    { h: 'Danh từ là gì và phân loại', html: `<p><b>Danh từ</b> 名詞 là thực từ nhằm <b>định danh sự vật, hiện tượng</b> (người, vật, nơi chốn, khái niệm, thời gian). Có thể phân loại:</p>
<ul><li><b>Danh từ chung</b>: 人 nhân, 馬 mã, 山 sơn, 水 thuỷ; danh từ trừu tượng: 仁 nhân, 道 đạo, 德 đức.</li>
<li><b>Danh từ riêng</b>: tên người (孔子, 孟子, 紂), tên nước, địa danh (魯 Lỗ, 齊 Tề, 南海 Nam Hải), tên sông núi (泰山, 易水).</li>
<li><b>Danh từ chỉ thời gian</b>: 朝 triêu (buổi sáng), 夕 tịch (buổi chiều), 日 nhật (ngày), 歲 tuế (năm), 春 xuân, 今 kim (nay), 昔 tích (xưa).</li>
<li><b>Danh từ chỉ phương vị</b>: 上 thượng, 下 hạ, 東 đông, 西 tây, 南 nam, 北 bắc, 內 nội, 外 ngoại, 前 tiền, 後 hậu, 中 trung.</li></ul>
<p>Danh từ chỉ thời gian và phương vị rất hay chuyển sang làm <b>trạng ngữ</b> — mục 4.</p>` },
    { h: 'Chức năng của danh từ trong câu', html: `<p>Danh từ có thể đảm nhiệm hầu hết các thành phần câu:</p>
<ul><li><b>Chủ ngữ</b> (phần đề): <span class="han">兔</span>走觸株 — <b>con thỏ</b> chạy đâm vào gốc cây.</li>
<li><b>Tân ngữ</b> (đứng sau động từ): 溫<span class="han">故</span>而知<span class="han">新</span>; 撫孤<span class="han">松</span> — vuốt cây <b>thông</b>.</li>
<li><b>Định ngữ</b> (đứng trước danh từ khác): <span class="han">河</span>之洲 — cồn <b>giữa sông</b>; <span class="han">南國</span>山河 — sông núi <b>nước Nam</b>.</li>
<li><b>Vị ngữ</b> (trong câu phán đoán, không cần hệ từ): 陳勝者，<span class="han">陽城人</span>也 — Trần Thắng là <b>người Dương Thành</b>.</li>
<li><b>Trạng ngữ</b> (đứng trước động từ): 吾<span class="han">日</span>三省吾身 — ta <b>mỗi ngày</b> ba lần xét mình.</li></ul>
<p>Điểm đáng chú ý nhất với người Việt là chức năng <b>định ngữ</b> (mục 3) và <b>trạng ngữ</b> (mục 4), vì cả hai đều khác thói quen tiếng Việt.</p>` },
    { h: '⚠️ Định ngữ đứng trước danh từ — bẫy trật tự lớn nhất', html: `<p>Trong Hán văn (và cả tiếng Hán hiện đại), <b>thành phần bổ nghĩa luôn đứng TRƯỚC danh từ trung tâm</b>. Tiếng Việt thì ngược lại — bổ nghĩa đứng sau. Vì thế khi dịch phải <b>đảo trật tự</b>:</p>
<table class="ac-tbl"><tr><th>Hán văn</th><th>Cấu tạo</th><th>Dịch đúng</th><th>Dịch sai (theo thứ tự chữ)</th></tr>
<tr><td>大國</td><td>đại (lớn) + quốc (nước)</td><td>nước lớn</td><td>lớn nước</td></tr>
<tr><td>孤松</td><td>cô (lẻ) + tùng (thông)</td><td>cây thông lẻ loi</td><td>lẻ thông</td></tr>
<tr><td>天子</td><td>thiên (trời) + tử (con)</td><td>con của trời</td><td>trời con</td></tr>
<tr><td>君子之道</td><td>quân tử + 之 + đạo</td><td>đạo của người quân tử</td><td>quân tử của đạo</td></tr>
<tr><td>南國山河</td><td>Nam quốc + sơn hà</td><td>sông núi nước Nam</td><td>nước Nam sông núi</td></tr>
<tr><td>手之所觸</td><td>thủ + 之 + sở xúc</td><td>chỗ mà tay chạm</td><td>tay của chỗ chạm</td></tr></table>
<p><b>Quy tắc vàng</b>: trong một cụm danh từ, <b>chữ cuối cùng là trung tâm</b>, các chữ đứng trước đều bổ nghĩa cho nó. Khi dịch, bắt đầu từ chữ cuối rồi đi ngược lên. Trợ từ <b>之</b> giữa hai thành phần là dấu hiệu rõ nhất: <i>A 之 B</i> = <i>B của A</i>.</p>
<p>Tiếng Việt giữ nguyên trật tự Hán trong các <b>từ Hán Việt</b> (quốc gia, thiên tử, hải quân, đại học) — nên ta quen đọc chúng như một khối. Nhưng khi gặp cụm từ tự do trong câu văn, phải đảo lại.</p>` },
    { h: 'Danh từ làm trạng ngữ', html: `<p>Danh từ có thể đứng <b>trước động từ</b> để làm <b>trạng ngữ</b>, biểu thị thời gian, nơi chốn, cách thức, công cụ, sự so sánh. Đây là hiện tượng rất phổ biến trong văn ngôn mà tiếng Việt thường phải thêm giới từ khi dịch:</p>
<ul><li><b>Thời gian</b>: 吾<b>日</b>三省吾身 — ta <b>mỗi ngày</b> ba lần xét mình; 學而<b>時</b>習之 — học rồi <b>thường xuyên</b> (đúng lúc) luyện tập; <b>朝</b>聞道，<b>夕</b>死可矣 — <b>sáng</b> nghe được đạo, <b>chiều</b> chết cũng được (Luận ngữ 4.8).</li>
<li><b>Phương vị, nơi chốn</b>: <b>南</b>面而王 — quay mặt <b>về phía nam</b> mà làm vua; <b>西</b>狩獲麟 — đi săn <b>ở phía tây</b> bắt được con lân.</li>
<li><b>Cách thức, so sánh</b>: 豕<b>人</b>立而啼 — con lợn đứng <b>như người</b> mà kêu (Tả truyện); 狐<b>鳴</b>… (kêu như cáo).</li>
<li><b>Công cụ, phương tiện</b>: 箕畚運於渤海之尾 — dùng sọt, ki chở ra biển Bột Hải (Liệt Tử, Ngu công).</li></ul>
<p><b>Cách nhận biết</b>: một danh từ đứng <b>ngay trước động từ</b>, mà không phải chủ ngữ (vì chủ ngữ đã có hoặc không hợp lý) → rất có thể là trạng ngữ. Trong 豕人立, chủ ngữ là 豕 (con lợn), nên 人 không thể là chủ ngữ — nó là trạng ngữ “như người”.</p>` },
    { h: 'Số nhiều và lượng từ', html: `<p>Danh từ văn ngôn <b>không biến hình theo số</b>: 人 có thể là “một người” hay “những người”, 馬 là “ngựa” nói chung. Số nhiều được hiểu qua ngữ cảnh, hoặc biểu thị bằng:</p>
<ul><li>Từ đứng trước: 諸 chư (các: 諸侯 chư hầu, 諸子 chư tử), 眾 chúng (nhiều: 眾人), 群 quần (bầy: 群臣 quần thần), 百 bách (trăm: 百姓 bách tính, 百家).</li>
<li>Từ đứng sau (thường với đại từ hoặc danh từ chỉ người): 等 đẳng (汝等 bọn bay), 輩 bối (吾輩 bọn ta), 曹 tào (爾曹 các ngươi), 儕 sài (吾儕).</li></ul>
<p>Văn ngôn <b>ít dùng lượng từ</b> (từ chỉ đơn vị như “cái, con, chiếc” trong tiếng Việt). Số từ thường đứng thẳng trước danh từ: 三人行 — ba người đi; 一夫 — một kẻ. Khi cần đơn vị đo lường, danh từ chỉ đồ vật được mượn làm lượng từ: 一<b>簞</b>食，一<b>瓢</b>飲 — một <b>giỏ</b> cơm, một <b>bầu</b> nước (Luận ngữ 6.11). Chi tiết ở bài 13 (Số từ và lượng từ).</p>` },
    { h: 'Danh từ “biến hình” theo vị trí: dấu hiệu hoạt dụng', html: `<p>Cuối cùng, cần nhớ: một danh từ có thể <b>được dùng như động từ</b> khi đứng ở vị trí của động từ. Đây là hiện tượng <b>hoạt dụng</b> (bài 15), nhưng nên làm quen ngay từ bây giờ vì gặp rất nhiều:</p>
<ul><li>君<b>君</b>，臣<b>臣</b> — vua <b>ra</b> vua, tôi <b>ra</b> tôi (danh từ thứ hai dùng như động từ: “làm đúng phận”).</li>
<li>驢不勝怒，<b>蹄</b>之 — con lừa không nén được giận, <b>đá</b> nó (蹄 “móng chân” dùng như động từ “đá”).</li>
<li>范增數<b>目</b>項王 — Phạm Tăng nhiều lần <b>đưa mắt ra hiệu</b> cho Hạng Vương (目 “mắt” dùng như động từ).</li></ul>
<p><b>Dấu hiệu</b>: danh từ đứng trước một tân ngữ (thường là đại từ 之), hoặc đứng sau phó từ (不, 將), sau động từ năng nguyện (能, 欲), hoặc sau chủ ngữ ở vị trí vị ngữ mà câu không có động từ khác. Nếu dịch như danh từ mà câu vô nghĩa — hãy thử dịch như động từ.</p>` }
  ],
  texts: [
    { title: 'Mỗi ngày ba lần tự xét', src: 'Luận ngữ 1.4 · Học nhi', lang: 'zh-TW',
      orig: '曾子曰：「吾日三省吾身：為人謀而不忠乎？與朋友交而不信乎？傳不習乎？」',
      reading: 'Tăng Tử viết: “Ngô nhật tam tỉnh ngô thân: vị nhân mưu nhi bất trung hồ? Dữ bằng hữu giao nhi bất tín hồ? Truyền bất tập hồ?”',
      vi: 'Tăng Tử nói: “Ta mỗi ngày tự xét mình ba điều: mưu tính việc cho người có điều gì không hết lòng chăng? Giao du với bạn bè có điều gì không thành tín chăng? Điều thầy truyền dạy có điều gì chưa luyện tập chăng?”',
      notes: [['吾 ngô', 'đại từ ngôi 1: ta'], ['日 nhật', 'danh từ “ngày” làm trạng ngữ: mỗi ngày'], ['三 tam', 'ba (lần hoặc ba điều)'], ['省 tỉnh', 'xét (đọc “tỉnh”, không phải “tỉnh” = tỉnh thành)'], ['吾身 ngô thân', 'định ngữ 吾 + danh từ 身: bản thân ta'], ['為 vị', 'giới từ: cho, vì'], ['謀 mưu', 'mưu tính'], ['與 dữ', 'giới từ: cùng với'], ['傳 truyền', 'điều được truyền dạy (động từ dùng như danh từ)']],
      guide: ['Chữ 日 đóng vai trò gì? Thử dịch nó như chủ ngữ — câu có còn hợp lý không?', 'Tìm một cụm danh từ có định ngữ đứng trước và dịch đúng trật tự tiếng Việt.'],
      comment: '<p>Chữ <b>日</b> là ví dụ chuẩn của danh từ làm trạng ngữ thời gian: chủ ngữ đã là 吾 (ta), nên 日 đứng trước động từ 省 chỉ có thể là “mỗi ngày”. Chữ <b>三</b> có hai cách hiểu: ba lần, hoặc ba điều (ba câu hỏi theo sau) — chú giải truyền thống nghiêng về “ba điều”, nhưng trong văn cổ 三 cũng thường chỉ “nhiều lần” (bài 13 sẽ bàn số ước lượng).</p><p><b>吾身</b>: định ngữ 吾 đứng trước 身 — “bản thân ta”. Để ý chữ 省 đọc là <b>tỉnh</b> với nghĩa “xét” (như trong “tỉnh ngộ”, “phản tỉnh”), khác chữ 省 đọc “tỉnh” chỉ đơn vị hành chính (nghĩa về sau).</p>' },
    { title: 'Sáng nghe đạo, chiều chết cũng được', src: 'Luận ngữ 4.8 · Lý nhân', lang: 'zh-TW',
      orig: '子曰：「朝聞道，夕死可矣。」',
      reading: 'Tử viết: “Triêu văn đạo, tịch tử khả hĩ.”',
      vi: 'Khổng Tử nói: “Buổi sáng được nghe đạo, buổi chiều chết cũng được.”',
      notes: [['朝 triêu', 'buổi sáng (đọc “triêu”; đọc “triều” là triều đình) — danh từ làm trạng ngữ'], ['聞 văn', 'nghe (nghĩa cổ), nghe biết'], ['道 đạo', 'đạo lý, chân lý'], ['夕 tịch', 'buổi chiều — danh từ làm trạng ngữ'], ['可 khả', 'được, có thể'], ['矣 hĩ', 'ngữ khí từ']],
      guide: ['Câu có hai danh từ chỉ thời gian. Chúng làm thành phần gì?', 'Chữ 朝 có hai âm (triêu / triều). Ở đây đọc âm nào, vì sao?'],
      comment: '<p>Câu tám chữ, hai danh từ thời gian 朝 và 夕 đều làm <b>trạng ngữ</b>, đứng trước động từ (聞, 死). Văn ngôn không cần giới từ “vào”; tiếng Việt dịch thêm “buổi sáng…, buổi chiều…”.</p><p>Chữ <b>朝</b> là một chữ nhiều âm: <b>triêu</b> (buổi sáng) và <b>triều</b> (triều đình, chầu vua). Âm Hán Việt giữ được sự phân biệt mà người đọc phải chú ý (nhớ bài 8 về phá âm). Về nội dung, câu này là một trong những tuyên ngôn mạnh nhất của Khổng Tử về giá trị của việc học đạo — nối với khoá Triết học Trung Quốc.</p>' },
    { title: 'Ba người cùng đi', src: 'Luận ngữ 7.22 · Thuật nhi', lang: 'zh-TW',
      orig: '子曰：「三人行，必有我師焉。擇其善者而從之，其不善者而改之。」',
      reading: 'Tử viết: “Tam nhân hành, tất hữu ngã sư yên. Trạch kỳ thiện giả nhi tòng chi, kỳ bất thiện giả nhi cải chi.”',
      vi: 'Khổng Tử nói: “Ba người cùng đi, ắt có người là thầy của ta ở trong đó. Chọn điều tốt của họ mà theo, điều không tốt của họ thì (soi vào mình) mà sửa.”',
      notes: [['三人 tam nhân', 'số từ đứng thẳng trước danh từ, không cần lượng từ'], ['行 hành', 'đi'], ['我師 ngã sư', 'định ngữ 我 + danh từ 師: thầy của ta'], ['焉 yên', '= 於之: ở trong đó'], ['擇 trạch', 'chọn'], ['其 kỳ', 'đại từ: của họ'], ['善者 thiện giả', 'kết cấu 者: điều tốt'], ['從 tòng', 'theo'], ['改 cải', 'sửa']],
      guide: ['我師 dịch là “ta thầy” hay “thầy của ta”? Áp dụng quy tắc chữ cuối là trung tâm.', 'Tìm số từ đứng trước danh từ mà không có lượng từ.'],
      comment: '<p><b>三人</b>: số từ đứng thẳng trước danh từ — văn ngôn không cần lượng từ như tiếng Việt (“ba <i>người</i>” đã đủ, tiếng Việt hiện đại có khi nói “ba con người”). <b>我師</b>: đại từ 我 làm định ngữ đứng trước danh từ 師 — “thầy của ta”.</p><p>Câu sau có hai kết cấu <b>其善者 / 其不善者</b> (điều tốt của họ / điều không tốt của họ) — 其 làm định ngữ, 者 tạo thành cụm danh từ. Chữ 之 ở cuối mỗi vế là đại từ tân ngữ. Một câu ngắn mà gom gần hết nội dung của bài Danh từ và Đại từ.</p>' },
    { title: 'Con lợn đứng như người', src: 'Tả truyện · Trang công năm thứ 8 (trích)', lang: 'zh-TW',
      orig: '豕人立而啼。',
      reading: 'Thỉ nhân lập nhi đề.',
      vi: 'Con lợn đứng (lên) như người mà kêu.',
      notes: [['豕 thỉ', 'con lợn — chủ ngữ'], ['人 nhân', 'danh từ làm trạng ngữ chỉ cách thức: như người'], ['立 lập', 'đứng'], ['而 nhi', 'liên từ'], ['啼 đề', 'kêu, khóc']],
      guide: ['Nếu coi 人 là chủ ngữ thì câu có nghĩa gì? Vì sao không hợp lý?', 'Tìm một ví dụ tiếng Việt có cấu trúc tương tự (danh từ chỉ cách thức), ví dụ “đi như vịt”.'],
      comment: '<p>Câu bốn chữ trong Tả truyện kể chuyện Tề Tương công đi săn gặp một con lợn lớn đứng dậy như người mà kêu (người ta cho là hồn oan hiện về). Chữ <b>人</b> không thể là chủ ngữ (chủ ngữ là 豕) và không phải tân ngữ (立 là tự động từ, không có tân ngữ) — nó là <b>trạng ngữ chỉ cách thức</b>: “như người”.</p><p>Đây là ví dụ kinh điển trong mọi giáo trình ngữ pháp văn ngôn. Bài học phương pháp: <b>loại trừ</b> — thử từng chức năng (chủ ngữ? tân ngữ? định ngữ?) cho đến khi tìm được chức năng hợp lý.</p>' }
  ],
  concepts: [
    { id: 'danhtu', han: '名詞', term: 'Danh từ', def: 'Thực từ định danh sự vật, hiện tượng. Gồm danh từ chung, riêng, chỉ thời gian, chỉ phương vị. Có thể làm chủ ngữ, tân ngữ, định ngữ, vị ngữ (câu phán đoán), trạng ngữ.', ex: '人, 山, 仁 (chung); 孔子, 魯 (riêng); 朝, 夕 (thời gian); 東, 上 (phương vị).', counter: 'Danh từ đứng trước tân ngữ 之 (蹄之) — đang được dùng như động từ.', rel: ['dinhngu', 'dt-trangngu'], write: '名' },
    { id: 'dinhngu', han: '定語在前', term: 'Định ngữ đứng trước danh từ', def: 'Thành phần bổ nghĩa luôn đứng trước danh từ trung tâm; chữ cuối của cụm là trung tâm. Dịch sang tiếng Việt phải đảo: A 之 B = B của A.', ex: '大國 = nước lớn; 君子之道 = đạo của người quân tử; 我師 = thầy của ta.', counter: 'Từ Hán Việt đã thành khối (quốc gia, thiên tử) — tiếng Việt giữ nguyên trật tự Hán, không đảo.', rel: ['danhtu'], write: '之' },
    { id: 'dt-trangngu', han: '名詞作狀語', term: 'Danh từ làm trạng ngữ', def: 'Danh từ đứng trước động từ biểu thị thời gian, nơi chốn, cách thức, công cụ; khi dịch thường thêm “vào, về phía, như, bằng”.', ex: '吾日三省 (mỗi ngày); 朝聞道 (buổi sáng); 豕人立 (đứng như người).', counter: 'Danh từ làm chủ ngữ đứng trước động từ (兔走 — con thỏ chạy).', rel: ['danhtu'], write: '日' },
    { id: 'sonhieu', han: '諸 · 群 · 等 · 輩', term: 'Biểu thị số nhiều', def: 'Danh từ không biến hình theo số; số nhiều hiểu qua ngữ cảnh hoặc bằng 諸, 眾, 群, 百 (đứng trước) và 等, 輩, 曹, 儕 (đứng sau đại từ, danh từ chỉ người).', ex: '諸侯 chư hầu; 群臣 quần thần; 汝等 bọn bay; 吾輩 bọn ta.', counter: 'Số từ cụ thể 三人 — chỉ số lượng xác định, không phải dấu hiệu số nhiều chung.', rel: ['danhtu', 'luongtu'], write: '諸' },
    { id: 'luongtu', han: '量詞', term: 'Lượng từ trong văn ngôn', def: 'Văn ngôn ít dùng lượng từ: số từ đứng thẳng trước danh từ (三人, 一夫); khi cần đơn vị, mượn danh từ chỉ vật chứa làm lượng từ.', ex: '一簞食，一瓢飲 — một giỏ cơm, một bầu nước.', counter: 'Tiếng Việt và tiếng Hán hiện đại cần loại từ/lượng từ (một con ngựa, 一匹馬).', rel: ['sonhieu'], write: '簞' }
  ],
  drills: [
    { t: 'mcq', ch: '大國', q: 'Dịch đúng 大國:', o: ['Lớn nước', 'Nước lớn', 'Đại quốc của', 'Nước của lớn'], a: 1, why: 'Định ngữ 大 đứng trước danh từ trung tâm 國 → tiếng Việt đảo: nước lớn.' },
    { t: 'mcq', ch: '君子之道', q: 'Dịch đúng 君子之道:', o: ['Quân tử của đạo', 'Đạo của người quân tử', 'Đạo và quân tử', 'Người quân tử đi đường'], a: 1, why: 'A 之 B = B của A; chữ cuối 道 là trung tâm.' },
    { t: 'mcq', ch: '日', q: 'Trong 吾日三省吾身, chữ 日 làm thành phần gì?', o: ['Chủ ngữ', 'Tân ngữ', 'Trạng ngữ chỉ thời gian (mỗi ngày)', 'Định ngữ'], a: 2, why: 'Chủ ngữ là 吾; 日 đứng trước động từ 省 → danh từ làm trạng ngữ.' },
    { t: 'mcq', ch: '人', q: 'Trong 豕人立而啼, chữ 人 làm thành phần gì?', o: ['Chủ ngữ', 'Tân ngữ', 'Trạng ngữ chỉ cách thức (như người)', 'Vị ngữ'], a: 2, why: 'Chủ ngữ là 豕 (con lợn); 立 là tự động từ không có tân ngữ → 人 là trạng ngữ: đứng như người.' },
    { t: 'mcq', ch: '朝', q: '朝 trong 朝聞道，夕死可矣 đọc và nghĩa là:', o: ['triều — triều đình', 'triêu — buổi sáng', 'triều — chầu vua', 'trào — thuỷ triều'], a: 1, why: 'Đối với 夕 (buổi chiều) → 朝 đọc “triêu”, buổi sáng, làm trạng ngữ thời gian.' },
    { t: 'mcq', ch: '陽城人', q: 'Trong 陳勝者，陽城人也, cụm 陽城人 làm thành phần gì?', o: ['Chủ ngữ', 'Vị ngữ (câu phán đoán)', 'Trạng ngữ', 'Tân ngữ'], a: 1, why: 'Câu phán đoán “A 者，B 也”: B (người Dương Thành) là vị ngữ danh từ, không cần hệ từ.' },
    { t: 'mcq', ch: '群臣', q: '群 trong 群臣 có tác dụng gì?', o: ['Chỉ số nhiều (các bề tôi)', 'Là động từ “tụ họp”', 'Là tên riêng', 'Chỉ thời gian'], a: 0, why: '群 (bầy, nhiều) đứng trước danh từ chỉ người → biểu thị số nhiều: quần thần.' },
    { t: 'mcq', ch: '蹄之', q: 'Trong 驢不勝怒，蹄之, chữ 蹄 (móng chân) được dùng như:', o: ['Danh từ làm chủ ngữ', 'Danh từ dùng như động từ: đá', 'Trạng ngữ', 'Lượng từ'], a: 1, why: '蹄 đứng trước tân ngữ 之 → dùng như động từ (hoạt dụng): đá nó.' },
    { t: 'mcq', ch: '一簞食', q: '簞 trong 一簞食 có vai trò:', o: ['Danh từ chỉ vật chứa mượn làm lượng từ', 'Động từ', 'Định ngữ chỉ chất liệu', 'Số từ'], a: 0, why: 'Văn ngôn ít lượng từ; 簞 (giỏ tre) được mượn làm đơn vị đo: một giỏ cơm.' },
    { t: 'tr', src: '吾日三省吾身', rd: 'Ngô nhật tam tỉnh ngô thân', a: 'Ta mỗi ngày tự xét bản thân mình ba điều (ba lần).', why: '日: danh từ làm trạng ngữ (mỗi ngày); 省: xét; 吾身: bản thân ta (định ngữ đứng trước).' },
    { t: 'tr', src: '三人行，必有我師焉。', rd: 'Tam nhân hành, tất hữu ngã sư yên.', a: 'Ba người cùng đi, ắt có người là thầy của ta ở trong đó.', why: '三人: ba người (không cần lượng từ); 我師: thầy của ta; 焉 = 於之: ở trong đó.' }
  ],
  socra: ['Thử dịch cụm 天下之士 và 手之所觸. Bạn bắt đầu từ chữ nào?', 'Làm sao phân biệt danh từ làm chủ ngữ và danh từ làm trạng ngữ khi cả hai đều đứng trước động từ?', 'Cho mình một câu Hán văn có danh từ dùng như động từ mà bạn từng gặp.'],
  feynman: 'Giải thích cho bạn cùng lớp “quy tắc chữ cuối là trung tâm” và vì sao người Việt hay dịch ngược cụm danh từ Hán văn, dùng ba ví dụ.',
  essay: 'Chọn 8 cụm danh từ có định ngữ (trong Luận ngữ, Mạnh Tử, hoặc các văn bản đã học), viết nguyên văn, âm Hán Việt, phân tích cấu tạo (định ngữ + trung tâm) và dịch đúng trật tự tiếng Việt.',
  exam: {
    points: ['Danh từ: định danh sự vật, hiện tượng; chung, riêng, thời gian, phương vị', 'Chức năng: chủ ngữ, tân ngữ, định ngữ, vị ngữ (câu phán đoán), trạng ngữ', '⚠️ Định ngữ đứng trước danh từ trung tâm; chữ cuối là trung tâm; A 之 B = B của A (大國, 君子之道, 我師)', 'Danh từ làm trạng ngữ: thời gian (吾日三省, 朝聞道夕死), phương vị (西狩), cách thức (豕人立)', 'Số nhiều: 諸, 眾, 群, 百 (trước); 等, 輩, 曹, 儕 (sau)', 'Ít lượng từ: số từ đứng thẳng trước danh từ (三人); mượn danh từ làm lượng từ (一簞食)', 'Danh từ dùng như động từ (蹄之, 君君) — dấu hiệu hoạt dụng'],
    qs: ['Tiếng Việt giữ trật tự Hán trong từ Hán Việt (quốc gia) nhưng đảo trong cụm từ tự do. Điều đó gây những lỗi gì khi dịch?', 'Có trường hợp nào một danh từ đứng trước động từ mà khó quyết định nó là chủ ngữ hay trạng ngữ không?']
  },
  readings: ['Giáo trình của lớp: phần Thực từ — Danh từ', 'Luận ngữ — thiên 4 Lý nhân: tìm các danh từ làm trạng ngữ', 'Thiều Chửu: tra 朝, 省 để thấy chữ nhiều âm']
};

const HV_DONGTU = {
  id: 'hv-dongtu', kind: 'lang', short: 'Động từ', title: 'Động từ', sub: 'Tự động từ, tha động từ, hệ từ, động từ năng nguyện, động từ xu hướng — và vì sao văn ngôn Tiên Tần hầu như không có chữ “là”', who: 'Phần III · Ngữ pháp từ loại: thực từ',
  goals: ['Phân biệt tự động từ (nội động, bất cập vật) và tha động từ (ngoại động, cập vật)', 'Nhận diện hệ từ (為, 乃, 曰…) và hiểu vì sao 是 thời Tiên Tần chưa phải hệ từ', 'Nhận diện động từ năng nguyện (可, 能, 欲, 敢, 得, 足) và động từ xu hướng', 'Hiểu “văn ngôn không có thì”: biểu thị thời gian bằng phó từ và ngữ khí từ', 'Làm quen với dạng sử động của tự động từ (臣活之)'],
  q: 'Tiếng Việt cần chữ “là” để nói “Trần Thắng là người Dương Thành”. Hán văn cổ viết 陳勝者，陽城人也 — không có chữ nào là “là” cả. Vậy câu ấy đứng vững nhờ cái gì?',
  context: '<p>Động từ là trung tâm của phần lớn câu văn ngôn: tìm được động từ chính là tìm được xương sống của câu (bài 22, 30). Bài này phân loại động từ theo cách giáo trình của lớp — <b>tự động từ, tha động từ, hệ từ</b> — và bổ sung hai nhóm hay gặp: động từ năng nguyện và động từ xu hướng.</p>',
  lecture: [
    { h: 'Động từ là gì; động từ làm vị ngữ', html: `<p><b>Động từ</b> 動詞 là thực từ nhằm chỉ các <b>hành động, động tác</b>, và cả các hoạt động tâm lý, sự tồn tại, biến đổi: 來 lai (đến), 去 khứ (rời đi), 學 học, 愛 ái (yêu), 思 tư (nghĩ), 有 hữu (có), 無 vô (không có), 死 tử (chết).</p>
<p>Chức năng chính của động từ là làm <b>vị ngữ</b> (phần thuyết). Trong câu 兔走觸株，折頸而死, các động từ 走 (chạy), 觸 (đâm vào), 折 (gãy), 死 (chết) tạo thành chuỗi hành động của con thỏ.</p>
<p>Động từ văn ngôn <b>không biến hình</b>: không có “thì” (quá khứ, hiện tại, tương lai), không chia theo ngôi. 學 có thể là “học”, “đã học”, “đang học”, “sẽ học” — thời gian được biểu thị bằng <b>phó từ</b> (既 đã, 將 sắp, 方 đang, 嘗 từng) và <b>ngữ khí từ</b> (矣 đã rồi), hoặc chỉ hiểu qua ngữ cảnh. Đây là điểm rất giống tiếng Việt (“tôi ăn” — có thể là đã ăn hay sẽ ăn, tùy “đã / sẽ”).</p>` },
    { h: 'Tự động từ và tha động từ', html: `<p>Giáo trình chia động từ theo khả năng mang tân ngữ:</p>
<ul><li><b>Tự động từ</b> (自動詞) — còn gọi <b>nội động từ</b>, <b>động từ bất cập vật</b>: hành động không tác động lên đối tượng nào, <b>không cần tân ngữ</b>: 來 (đến), 去 (đi), 死 (chết), 走 (chạy), 立 (đứng), 臥 (nằm), 啼 (kêu), 笑 (cười), 歸 (về).<br>例: 豕人<b>立</b>而<b>啼</b> — con lợn đứng như người mà kêu.</li>
<li><b>Tha động từ</b> (他動詞) — còn gọi <b>ngoại động từ</b>, <b>động từ cập vật</b>: hành động tác động lên đối tượng, <b>mang tân ngữ</b> đứng sau: 學 (học), 愛 (yêu), 殺 (giết), 見 (thấy), 撫 (vuốt), 釋 (bỏ), 守 (giữ).<br>例: <b>撫</b>孤松 — vuốt cây thông lẻ; <b>釋</b>其耒而<b>守</b>株 — bỏ cái cày mà giữ gốc cây.</li></ul>
<p>Tha động từ có thể mang <b>hai tân ngữ</b> (tân ngữ gián tiếp chỉ người, tân ngữ trực tiếp chỉ vật): 公<b>語</b>之故 — công nói cho ông ấy (之) nguyên do (故) (Tả truyện).</p>
<p><b>Vì sao phân biệt quan trọng?</b> Vì khi một tự động từ lại đứng trước một tân ngữ, nó thường mang nghĩa <b>sai khiến</b> (mục 6). Phân biệt được hai loại là có chìa khoá để hiểu những câu tưởng như vô lý.</p>` },
    { h: 'Hệ từ: động từ chỉ quan hệ nối', html: `<p><b>Hệ từ</b> (繫詞) là động từ chỉ biểu thị <b>quan hệ nối</b> giữa chủ ngữ và vị ngữ — tương đương chữ “là” trong tiếng Việt. Trong văn ngôn, các chữ thường đảm nhận chức năng này:</p>
<ul><li><b>為</b> vi: “là”: 夫執輿者<b>為</b>誰 — người cầm cương xe kia <b>là</b> ai? (Luận ngữ 18.6).</li>
<li><b>乃</b> nãi: “là, chính là” (có sắc thái nhấn mạnh): 當立者<b>乃</b>公子扶蘇 — người đáng được lập chính là công tử Phù Tô (Sử ký).</li>
<li><b>曰</b> viết: “gọi là”: 天子死<b>曰</b>崩 — thiên tử chết gọi là băng (nhớ bài 8).</li>
<li><b>非</b> phi: “không phải là” (phó từ phủ định nhưng làm vị ngữ phán đoán): 子<b>非</b>魚 — anh không phải là cá (Trang Tử).</li></ul>
<p><b>⚠️ Về chữ 是</b>: trong tiếng Hán hiện đại, 是 là hệ từ “là”. Nhưng trong văn ngôn thời Tiên Tần, 是 chủ yếu là <b>đại từ chỉ thị</b> “này, việc ấy”: 是可忍也 — <b>việc ấy</b> mà nhẫn tâm làm được (Luận ngữ 3.1). Hệ từ 是 chỉ phổ biến dần từ đời Hán trở đi. Đây là một bẫy kinh điển: đọc 是 thành “là” trong văn Tiên Tần thường dịch sai.</p>
<p>Vậy câu phán đoán Tiên Tần đứng vững nhờ đâu? Nhờ <b>trật tự từ và ngữ khí từ</b>: “A 者，B 也” — 者 đánh dấu phần đề, 也 đánh dấu phần thuyết khẳng định. Đây là nội dung của bài 26 (Câu phán đoán).</p>` },
    { h: 'Động từ năng nguyện', html: `<p><b>Động từ năng nguyện</b> (能願動詞) đứng trước một động từ khác, biểu thị <b>khả năng, nguyện vọng, sự cần thiết</b> — giống “có thể, muốn, dám, nên” trong tiếng Việt:</p>
<table class="ac-tbl"><tr><th>Chữ</th><th>Nghĩa</th><th>Ví dụ</th></tr>
<tr><td>可 khả</td><td>có thể, đáng</td><td>可以為師矣 · 兔不可復得</td></tr>
<tr><td>能 năng</td><td>có khả năng</td><td>曾益其所不<b>能</b> (cái mình không làm được)</td></tr>
<tr><td>欲 dục</td><td>muốn</td><td>吾<b>欲</b>之南海</td></tr>
<tr><td>敢 cảm</td><td>dám</td><td>孰<b>敢</b>不正 (ai dám không ngay thẳng)</td></tr>
<tr><td>得 đắc</td><td>được, có thể</td><td>二者不可<b>得</b>兼 (hai thứ không thể được cả)</td></tr>
<tr><td>足 túc</td><td>đủ để, đáng</td><td>不<b>足</b>為外人道也 (không đáng nói cho người ngoài)</td></tr>
<tr><td>當 đương</td><td>nên, phải</td><td><b>當</b>立者 (người đáng lập)</td></tr></table>
<p>Lưu ý: 可 + 以 → 可以 (bài 6, 9); 足 + 以 → 足以 (đủ để). Khi động từ năng nguyện đứng trước một danh từ, đó là dấu hiệu danh từ ấy đang được dùng như động từ (hoạt dụng, bài 15).</p>` },
    { h: 'Động từ xu hướng và động từ tồn tại', html: `<p><b>Động từ xu hướng</b> chỉ hướng của hành động: 來 lai (đến, lại), 往 vãng (đi tới), 出 xuất (ra), 入 nhập (vào), 上 thượng (lên), 下 hạ (xuống). Chúng có thể đứng một mình hoặc theo sau động từ khác: 不復<b>出</b>焉 — không ra nữa (Đào hoa nguyên ký); 景翳翳以將<b>入</b> — mặt trời mờ dần sắp lặn (vào).</p>
<p><b>Động từ tồn tại</b>: 有 hữu (có), 無 vô (không có) — tạo câu tồn tại (bài 26): 田中<b>有</b>株 — trong ruộng có gốc cây; 有朋自遠方來. Chú ý trật tự: <b>nơi chốn + 有 + vật tồn tại</b> (田中有株), giống tiếng Việt “trong ruộng có gốc cây”.</p>
<p>Ngoài ra, một số động từ <b>tâm lý</b> (愛 yêu, 惡 ố — ghét, 思 nghĩ, 畏 sợ, 好 hiếu — ưa) và <b>nói năng</b> (曰 nói, 云 nói, 謂 bảo, 告 báo) rất thường gặp. 曰 và 云 đứng trước lời dẫn trực tiếp: 子曰 — Khổng Tử nói.</p>` },
    { h: 'Tự động từ mang tân ngữ: dạng sử động', html: `<p>Bây giờ quay lại điều quan trọng ở mục 2. Khi một <b>tự động từ</b> (vốn không có tân ngữ) lại xuất hiện <b>trước một tân ngữ</b>, nó thường mang nghĩa <b>“làm cho (tân ngữ) …”</b> — gọi là <b>cách dùng sử động</b> (使動用法):</p>
<ul><li>項伯殺人，臣<b>活</b>之 — Hạng Bá giết người, thần <b>làm cho</b> ông ấy <b>sống</b> (cứu sống ông ấy) (Sử ký). 活 vốn là “sống” — tự động từ.</li>
<li>所謂<b>生</b>死而<b>肉</b>骨也 — đó gọi là <b>làm cho</b> người chết <b>sống lại</b>, <b>làm cho</b> xương <b>mọc thịt</b> (Tả truyện). 生 (sống) là tự động từ; 肉 (thịt) là danh từ dùng sử động.</li>
<li>莊公<b>寤</b>生 — câu này lại là tự động từ bình thường (Trang công sinh ngược) — để thấy không phải lúc nào cũng sử động; phải xét nghĩa.</li></ul>
<p><b>Cách dịch</b>: thêm “làm cho”, “khiến cho”, hoặc chọn động từ tiếng Việt có sẵn nghĩa sai khiến (活之 → “cứu sống ông ấy”). Hình dung từ và danh từ cũng có cách dùng sử động — toàn bộ hiện tượng này sẽ được hệ thống ở bài 15 (Từ loại hoạt dụng).</p>` }
  ],
  texts: [
    { title: 'Ôm cây đợi thỏ — chuỗi động từ', src: 'Hàn Phi Tử · Ngũ đố (trích, đọc lại với con mắt ngữ pháp)', lang: 'zh-TW',
      orig: '兔走觸株，折頸而死，因釋其耒而守株，冀復得兔。',
      reading: 'Thố tẩu xúc chu, chiết cảnh nhi tử, nhân thích kỳ lỗi nhi thủ chu, ký phục đắc thố.',
      vi: 'Con thỏ chạy đâm vào gốc cây, gãy cổ mà chết; (người ấy) nhân đó bỏ cái cày mà giữ gốc cây, mong lại được thỏ.',
      notes: [['走 tẩu', 'tự động từ: chạy'], ['觸 xúc', 'tha động từ: đâm vào (tân ngữ 株)'], ['折 chiết', 'tha động từ: gãy (tân ngữ 頸)'], ['死 tử', 'tự động từ: chết'], ['釋 thích', 'tha động từ: buông bỏ (tân ngữ 其耒)'], ['守 thủ', 'tha động từ: giữ (tân ngữ 株)'], ['冀 ký', 'động từ tâm lý: mong'], ['得 đắc', 'tha động từ: được (tân ngữ 兔)']],
      guide: ['Xếp các động từ trong câu thành hai cột: tự động từ / tha động từ. Tha động từ nào đi với tân ngữ nào?', 'Chủ ngữ của vế thứ hai (因釋其耒…) là ai? Nó có được viết ra không?'],
      comment: '<p>Đọc lại câu đã gặp ở bài 8, lần này để ý <b>động từ</b>. Câu có tám động từ nối tiếp nhau như một đoạn phim: 走 → 觸 → 折 → 死 (con thỏ), rồi 釋 → 守 → 冀 → 得 (người nông dân). Tự động từ (走, 死) không có tân ngữ; tha động từ (觸株, 折頸, 釋其耒, 守株, 得兔) đều có tân ngữ đứng sau.</p><p>Để ý <b>chủ ngữ đổi</b> giữa hai vế mà không được nói ra: vế đầu là con thỏ, vế sau là người nông dân. Văn ngôn tỉnh lược chủ ngữ khi ngữ cảnh đã rõ (bài 25) — người dịch phải tự khôi phục.</p>' },
    { title: 'Ba hệ từ: 曰, 為, 非', src: 'Lễ ký · Khúc lễ hạ; Mạnh Tử · Đằng Văn Công hạ; Trang Tử · Thu thuỷ (trích)', lang: 'zh-TW',
      orig: '天子死曰崩。\n……\n富貴不能淫，貧賤不能移，威武不能屈，此之謂大丈夫。\n……\n惠子曰：「子非魚，安知魚之樂？」',
      reading: 'Thiên tử tử viết băng.\n……\nPhú quý bất năng dâm, bần tiện bất năng di, uy vũ bất năng khuất, thử chi vị đại trượng phu.\n……\nHuệ Tử viết: “Tử phi ngư, an tri ngư chi lạc?”',
      vi: 'Thiên tử chết gọi là băng.\n……\nGiàu sang không làm cho mê đắm được, nghèo hèn không làm cho đổi lòng được, uy vũ không khuất phục được — như thế gọi là bậc đại trượng phu.\n……\nHuệ Tử nói: “Anh không phải là cá, sao biết được niềm vui của cá?”',
      notes: [['曰 viết', 'hệ từ: gọi là'], ['淫 dâm', 'làm cho mê đắm, buông thả (sử động)'], ['移 di', 'làm cho dời đổi (sử động)'], ['屈 khuất', 'làm cho khuất phục (sử động)'], ['不能 bất năng', 'phó từ + động từ năng nguyện: không thể'], ['此之謂 thử chi vị', 'cái này gọi là (tân ngữ 此 đảo lên trước, đánh dấu bằng 之)'], ['非 phi', 'không phải là'], ['安 an', 'đại từ nghi vấn: sao, làm sao']],
      guide: ['淫, 移, 屈 vốn là tự động từ. Trong câu của Mạnh Tử, chúng mang nghĩa gì? (Gợi ý: “làm cho…”)', 'Câu 子非魚 dùng 非 làm vị ngữ phán đoán. Nếu viết theo lối hiện đại, ta sẽ dùng chữ gì?'],
      comment: '<p>Ba câu gom ba cách nói “là” trong văn ngôn: <b>曰</b> (gọi là), cấu trúc <b>…之謂…</b> (cái này gọi là — thực chất là động từ 謂 với tân ngữ đảo trước), và <b>非</b> (không phải là). Không chữ nào là 是.</p><p>Câu của Mạnh Tử còn là ví dụ đẹp về <b>sử động</b>: 富貴不能淫 không phải “giàu sang không thể dâm” mà là “giàu sang không thể <b>làm cho</b> (người ấy) mê đắm”. Câu này rất nổi tiếng trong văn hoá Việt Nam như định nghĩa của người “đại trượng phu”.</p>' },
    { title: 'Cứu sống người: dạng sử động của 活', src: 'Sử ký · Hạng Vũ bản kỷ (trích)', lang: 'zh-TW',
      orig: '項伯殺人，臣活之。',
      reading: 'Hạng Bá sát nhân, thần hoạt chi.',
      vi: 'Hạng Bá giết người, thần đã cứu sống ông ấy (làm cho ông ấy được sống).',
      notes: [['項伯 Hạng Bá', 'chú của Hạng Vũ'], ['殺 sát', 'tha động từ: giết'], ['臣 thần', 'khiêm xưng ngôi 1 khi nói với vua (đây là Trương Lương nói với Lưu Bang)'], ['活 hoạt', 'vốn là tự động từ “sống”; ở đây có tân ngữ 之 → sử động: làm cho sống'], ['之 chi', 'đại từ tân ngữ: ông ấy (Hạng Bá)']],
      guide: ['Nếu dịch 臣活之 là “thần sống ông ấy” thì sao? Vì sao phải thêm “làm cho”?', 'Tìm trong câu một tha động từ dùng bình thường và một tự động từ dùng sử động.'],
      comment: '<p>Đây là lời Trương Lương giải thích với Lưu Bang vì sao Hạng Bá giúp họ trước Hồng Môn yến: xưa kia Hạng Bá giết người, Trương Lương đã che chở cứu mạng. <b>殺人</b> là tha động từ dùng bình thường; <b>活之</b> là tự động từ 活 (sống) đứng trước tân ngữ 之 → nghĩa sai khiến “làm cho sống”, tức cứu sống.</p><p>Mẹo nhận biết: khi thấy một động từ vốn chỉ trạng thái của chính chủ thể (sống, chết, đi, đến, đứng…) mà lại có tân ngữ theo sau, hãy thử nghĩa “làm cho tân ngữ…”.</p>' }
  ],
  concepts: [
    { id: 'dongtu', han: '動詞', term: 'Động từ', def: 'Thực từ chỉ hành động, động tác, hoạt động tâm lý, tồn tại, biến đổi; chức năng chính là làm vị ngữ. Không biến hình theo thì: thời gian biểu thị bằng phó từ (既, 將, 方), ngữ khí từ (矣) hoặc ngữ cảnh.', ex: '來, 去, 學, 愛, 有, 無, 死.', counter: 'Danh từ đứng ở vị trí vị ngữ — có thể đang được dùng như động từ (hoạt dụng).', rel: ['tu-tha', 'hetu', 'nangnguyen'], write: '動' },
    { id: 'tu-tha', han: '自動詞 · 他動詞', term: 'Tự động từ và tha động từ', def: 'Tự động từ (nội động, bất cập vật): không cần tân ngữ (來, 死, 走, 立). Tha động từ (ngoại động, cập vật): mang tân ngữ đứng sau (學, 愛, 殺, 撫).', ex: '豕人立而啼 (tự động); 撫孤松 (tha động).', counter: 'Tự động từ mang tân ngữ (臣活之) — đó là cách dùng sử động.', rel: ['dongtu', 'sudong'], write: '活' },
    { id: 'hetu', han: '繫詞', term: 'Hệ từ', def: 'Động từ chỉ biểu thị quan hệ nối giữa chủ ngữ và vị ngữ (“là, gọi là”): 為, 乃, 曰; phủ định: 非. Thời Tiên Tần 是 chủ yếu là đại từ chỉ thị, chưa là hệ từ.', ex: '天子死曰崩; 當立者乃公子扶蘇; 子非魚.', counter: '是 trong 是可忍也 — đại từ “việc ấy”, không phải “là”.', rel: ['dongtu'], write: '為' },
    { id: 'nangnguyen', han: '能願動詞', term: 'Động từ năng nguyện', def: 'Đứng trước động từ khác, biểu thị khả năng, nguyện vọng, sự cần thiết: 可, 能, 欲, 敢, 得, 足, 當.', ex: '吾欲之南海; 孰敢不正; 不足為外人道也.', counter: 'Động từ chính mang tân ngữ danh từ (欲富貴 — muốn giàu sang: 欲 là động từ chính).', rel: ['dongtu'], write: '能' },
    { id: 'sudong', han: '使動用法', term: 'Cách dùng sử động (của động từ)', def: 'Tự động từ đứng trước tân ngữ mang nghĩa “làm cho tân ngữ …”; dịch bằng “làm cho, khiến cho” hoặc động từ có nghĩa sai khiến.', ex: '臣活之 (cứu sống ông ấy); 生死而肉骨; 富貴不能淫.', counter: 'Tha động từ thường: 殺人 — giết người (không cần “làm cho”).', rel: ['tu-tha'], write: '使' }
  ],
  drills: [
    { t: 'mcq', ch: '死', q: '死 (chết) thuộc loại:', o: ['Tự động từ (không cần tân ngữ)', 'Tha động từ', 'Hệ từ', 'Động từ năng nguyện'], a: 0, why: 'Hành động không tác động lên đối tượng → tự động từ (nội động, bất cập vật).' },
    { t: 'mcq', ch: '撫', q: '撫 trong 撫孤松 thuộc loại:', o: ['Tự động từ', 'Tha động từ (có tân ngữ 孤松)', 'Hệ từ', 'Phó từ'], a: 1, why: '撫 (vuốt) tác động lên đối tượng 孤松 → tha động từ.' },
    { t: 'mcq', ch: '曰', q: '曰 trong 天子死曰崩 có chức năng:', o: ['Nói (dẫn lời trực tiếp)', 'Hệ từ “gọi là”', 'Ngữ khí từ', 'Giới từ'], a: 1, why: 'Ở đây 曰 nối chủ ngữ (thiên tử chết) với tên gọi (băng) → hệ từ “gọi là”.' },
    { t: 'mcq', ch: '是', q: '是 trong 是可忍也 (Luận ngữ 3.1) là:', o: ['Hệ từ “là”', 'Đại từ chỉ thị “việc ấy, điều này”', 'Phó từ “đúng”', 'Liên từ'], a: 1, why: 'Thời Tiên Tần, 是 chủ yếu là đại từ chỉ thị; hệ từ 是 phổ biến từ đời Hán.' },
    { t: 'mcq', ch: '活', q: '活 trong 臣活之 nghĩa là:', o: ['Sống', 'Làm cho sống, cứu sống', 'Hoạt động', 'Linh hoạt'], a: 1, why: 'Tự động từ 活 có tân ngữ 之 → sử động: làm cho (ông ấy) sống.' },
    { t: 'mcq', ch: '欲', q: '欲 trong 吾欲之南海 là:', o: ['Danh từ “lòng ham muốn”', 'Động từ năng nguyện “muốn”', 'Giới từ', 'Hệ từ'], a: 1, why: '欲 đứng trước động từ 之 (đi) → động từ năng nguyện.' },
    { t: 'mcq', ch: '淫', q: '淫 trong 富貴不能淫 nên hiểu là:', o: ['Dâm dục', 'Làm cho (người ấy) mê đắm, buông thả', 'Mưa dầm', 'Quá mức'], a: 1, why: 'Dạng sử động: giàu sang không thể làm cho người ấy mê đắm.' },
    { t: 'mcq', q: 'Văn ngôn biểu thị thời gian của hành động bằng cách nào?', o: ['Chia động từ theo thì', 'Thêm đuôi vào động từ', 'Dùng phó từ (既, 將, 方), ngữ khí từ (矣) hoặc ngữ cảnh', 'Đổi âm đọc của động từ'], a: 2, why: 'Động từ văn ngôn không biến hình, giống tiếng Việt dùng “đã, sẽ, đang”.' },
    { t: 'mcq', ch: '田中有株', q: 'Trật tự của câu tồn tại 田中有株 là:', o: ['Vật tồn tại + 有 + nơi chốn', 'Nơi chốn + 有 + vật tồn tại', '有 + nơi chốn + vật', 'Chủ ngữ + hệ từ + vị ngữ'], a: 1, why: 'Trong ruộng (nơi chốn) có (有) gốc cây (vật tồn tại) — giống tiếng Việt.' },
    { t: 'tr', src: '項伯殺人，臣活之。', rd: 'Hạng Bá sát nhân, thần hoạt chi.', a: 'Hạng Bá giết người, thần đã cứu sống ông ấy.', why: '殺: tha động từ; 臣: khiêm xưng; 活之: sử động — làm cho ông ấy sống.' },
    { t: 'tr', src: '富貴不能淫，貧賤不能移，威武不能屈。', rd: 'Phú quý bất năng dâm, bần tiện bất năng di, uy vũ bất năng khuất.', a: 'Giàu sang không làm cho mê đắm được, nghèo hèn không làm cho đổi lòng được, uy vũ không làm cho khuất phục được.', why: '不能: không thể; 淫, 移, 屈: tự động từ dùng sử động (làm cho…).' }
  ],
  socra: ['Cho mình hai tự động từ và hai tha động từ (ngoài bài), mỗi từ một câu ví dụ.', 'Vì sao đọc 是 thành “là” trong Luận ngữ lại dễ dịch sai? Cho một ví dụ.', 'Làm sao bạn nhận ra một động từ đang được dùng theo cách sử động?'],
  feynman: 'Giải thích cho bạn cùng lớp vì sao câu phán đoán thời Tiên Tần không cần chữ “là”, và các chữ nào đảm nhận chức năng hệ từ.',
  essay: 'Phân tích động từ trong câu của Mạnh Tử “富貴不能淫，貧賤不能移，威武不能屈，此之謂大丈夫”: loại động từ, chức năng, cách dùng sử động; dịch nghĩa sát và dịch thoát.',
  exam: {
    points: ['Động từ: chỉ hành động, động tác; chức năng chính là vị ngữ; không biến hình theo thì', 'Tự động từ (nội động, bất cập vật): 來 去 死 走 立 — không tân ngữ', 'Tha động từ (ngoại động, cập vật): 學 愛 殺 撫 — mang tân ngữ; có thể mang hai tân ngữ', 'Hệ từ: động từ chỉ biểu thị quan hệ nối — 為, 乃, 曰; phủ định 非; 是 thời Tiên Tần là đại từ chỉ thị', 'Động từ năng nguyện: 可, 能, 欲, 敢, 得, 足, 當', 'Động từ xu hướng (來 往 出 入) và tồn tại (有 無): nơi chốn + 有 + vật', 'Sử động: tự động từ + tân ngữ = làm cho… (臣活之, 富貴不能淫)'],
    qs: ['Tiếng Việt cũng không chia thì. Điều đó giúp gì cho người Việt khi học động từ văn ngôn?', 'Có động từ nào vừa có thể là tự động vừa là tha động không? Thử tìm ví dụ.']
  },
  readings: ['Giáo trình của lớp: phần Thực từ — Động từ', 'Mạnh Tử · Đằng Văn Công hạ — đoạn “đại trượng phu” (đọc trọn)', 'Sử ký · Hạng Vũ bản kỷ — đoạn Hồng Môn yến (đọc bản dịch, đối chiếu vài câu nguyên văn)']
};

const HV_HINHDUNG = {
  id: 'hv-hinhdung', kind: 'lang', short: 'Hình dung từ', title: 'Hình dung từ', sub: 'Làm định ngữ, vị ngữ, trạng ngữ; mức độ; hình dung từ trùng điệp; hình dung từ dùng như danh từ và động từ', who: 'Phần III · Ngữ pháp từ loại: thực từ',
  goals: ['Định nghĩa hình dung từ và phân biệt hình dung từ chỉ tính chất, trạng thái', 'Nhận diện ba chức năng: định ngữ (đứng trước danh từ), vị ngữ (không cần hệ từ), trạng ngữ (đứng trước động từ)', 'Biết cách biểu thị mức độ và so sánh (甚, 至, 最, 太, 於)', 'Nhận ra hình dung từ dùng như danh từ (故, 新) và như động từ — sử động (苦其心志), ý động (小魯)'],
  q: 'Tiếng Việt nói “núi cao” — không cần chữ “thì” hay “là”. Hán văn cũng nói 山高. Vậy giữa hình dung từ Hán văn và tính từ tiếng Việt, đâu là chỗ giống để dựa vào, và đâu là chỗ khác phải cảnh giác?',
  context: '<p>Hình dung từ (tính từ) là loại thực từ thứ ba. Tin vui: nó <b>gần với tiếng Việt</b> hơn danh từ và động từ — hình dung từ làm vị ngữ trực tiếp, không cần hệ từ. Tin cần chú ý: khi làm <b>định ngữ</b>, nó đứng <b>trước</b> danh từ (ngược tiếng Việt), và nó rất hay được <b>dùng như động từ</b> với nghĩa “làm cho…” hoặc “coi là…”.</p>',
  lecture: [
    { h: 'Hình dung từ là gì', html: `<p><b>Hình dung từ</b> 形容詞 là thực từ nhằm <b>hình dung, định vị, chỉ ra tính chất</b> của sự vật, hiện tượng. Có thể chia:</p>
<ul><li><b>Chỉ tính chất</b>: 大 đại (lớn), 小 tiểu (nhỏ), 高 cao, 長 trường (dài), 美 mỹ (đẹp), 善 thiện (tốt), 惡 ác (xấu), 新 tân (mới), 故 cố (cũ), 遠 viễn (xa).</li>
<li><b>Chỉ trạng thái</b>: thường là từ láy hoặc có hậu tố 然 / 如 / 爾: 悠悠 (dằng dặc), 蕭蕭 (hiu hắt), 截然 (rõ ràng), 怡然 (vui vẻ), 坦蕩蕩 (thản nhiên rộng rãi).</li></ul>
<p>Tiếng Việt vay rất nhiều hình dung từ Hán Việt: vĩ đại, tân tiến, mỹ lệ, thiện lương, cao quý… Gặp chúng trong văn cổ, phần lớn có thể hiểu theo nghĩa gốc của từng chữ.</p>` },
    { h: 'Hình dung từ làm định ngữ', html: `<p>Khi bổ nghĩa cho danh từ, hình dung từ đứng <b>trước</b> danh từ (nhớ quy tắc bài 10: chữ cuối là trung tâm):</p>
<ul><li>大國 — nước lớn; 孤松 — cây thông lẻ loi; 遠方 — phương xa; 新月 — trăng non.</li>
<li>Có thể chèn 之: 高山之巔 — đỉnh của núi cao.</li>
<li>Nhiều hình dung từ chồng lên nhau, vẫn đứng trước: 枯藤老樹昏鴉 — dây leo khô, cây già, quạ chiều (Mã Trí Viễn).</li></ul>
<p>Tiếng Việt giữ trật tự này trong từ Hán Việt (đại học, tân binh, cổ thụ) nhưng đảo trong câu tự do. Khi dịch: <b>danh từ trước, hình dung từ sau</b>.</p>` },
    { h: 'Hình dung từ làm vị ngữ — không cần hệ từ', html: `<p>Đây là chỗ hình dung từ văn ngôn <b>giống tiếng Việt</b>: nó làm vị ngữ trực tiếp, không cần chữ “là”:</p>
<ul><li>山<b>高</b>，水<b>長</b> — núi cao, sông dài.</li>
<li>城非不<b>高</b>也，池非不<b>深</b>也 — thành không phải là không cao, hào không phải là không sâu (Mạnh Tử).</li>
<li>賢哉回也 — hiền thay Hồi! (hình dung từ 賢 làm vị ngữ, đảo lên trước để cảm thán).</li></ul>
<p>Hình dung từ làm vị ngữ có thể nhận phó từ đứng trước (不高, 甚美) và ngữ khí từ đứng sau (高也, 美矣, 賢哉). Đây là cách dễ nhất để nhận ra nó.</p>` },
    { h: 'Hình dung từ làm trạng ngữ; mức độ và so sánh', html: `<p><b>Trạng ngữ</b>: hình dung từ đứng trước động từ để chỉ cách thức: <b>疾</b>走 — chạy <b>nhanh</b>; <b>善</b>戰 — đánh <b>giỏi</b>; <b>深</b>思 — nghĩ <b>sâu</b>; 不復出 — không ra <b>nữa</b> (復 phó từ). Tiếng Việt thường đặt bổ ngữ cách thức sau động từ, nên khi dịch lại phải đảo: 疾走 → “chạy nhanh”.</p>
<p><b>Mức độ</b> được biểu thị bằng phó từ đứng trước hình dung từ: 甚 thậm (rất), 至 chí (cực kỳ), 最 tối (nhất), 太 thái (quá), 極 cực, 頗 phả (khá), 益 ích / 愈 dũ (càng). Ví dụ: 甚美 (rất đẹp), 至善 (cực tốt — “chí thiện”).</p>
<p><b>So sánh hơn</b> thường dùng giới từ <b>於</b> sau hình dung từ: 苛政猛<b>於</b>虎也 — chính sự hà khắc dữ hơn hổ (Lễ ký); 青取之於藍，而青<b>於</b>藍 — màu xanh lấy từ cây chàm mà xanh hơn chàm (Tuân Tử). Cấu trúc: <b>A + hình dung từ + 於 + B</b> = A … hơn B. Chi tiết ở bài 28 (câu so sánh).</p>` },
    { h: 'Hình dung từ trùng điệp và hậu tố', html: `<p>Văn miêu tả, nhất là thơ, rất chuộng hình dung từ <b>trùng điệp</b> (lặp chữ — điệp tự, bài 7) để gợi hình, gợi cảm: 青青河畔草 — cỏ bờ sông xanh xanh (Cổ thi); 蕭蕭 (hiu hắt); 悠悠 (dằng dặc); 坦蕩蕩 (thản nhiên), 長戚戚 (lo lắng âu sầu — Luận ngữ 7.37: 君子坦蕩蕩，小人長戚戚).</p>
<p>Hậu tố <b>然</b> (nhiên), <b>如</b> (như), <b>爾</b> (nhĩ), <b>焉</b> (yên) gắn sau một chữ để tạo hình dung từ chỉ trạng thái: 截然 (rõ ràng), 怡然 (vui vẻ), 突如 (đột ngột), 莞爾 (mỉm cười). Trong tiếng Việt: “tự nhiên”, “đột nhiên”, “hiển nhiên”, “an nhiên” đều mang hậu tố 然.</p>` },
    { h: 'Hình dung từ dùng như danh từ và động từ', html: `<p>Như danh từ, hình dung từ cũng thường <b>đổi vai</b> theo vị trí (hoạt dụng — bài 15). Ba trường hợp hay gặp:</p>
<ol><li><b>Dùng như danh từ</b> (ở vị trí chủ ngữ, tân ngữ): 溫<b>故</b>而知<b>新</b> — ôn <b>cái cũ</b>, biết <b>cái mới</b>; 擇其<b>善</b>者而從之 — chọn <b>điều tốt</b> mà theo. Dịch thêm “cái, điều, người”.</li>
<li><b>Sử động</b> — “làm cho (tân ngữ) có tính chất ấy”: 必先<b>苦</b>其心志，<b>勞</b>其筋骨 — ắt trước hết <b>làm cho</b> tâm chí người ấy <b>khổ</b>, <b>làm cho</b> gân cốt <b>nhọc</b> (Mạnh Tử); 春風又<b>綠</b>江南岸 — gió xuân lại <b>làm xanh</b> bờ Giang Nam (Vương An Thạch).</li>
<li><b>Ý động</b> — “coi (tân ngữ) là có tính chất ấy”: 孔子登東山而<b>小</b>魯 — Khổng Tử lên núi Đông thì <b>thấy</b> nước Lỗ <b>nhỏ</b> (coi Lỗ là nhỏ) (Mạnh Tử).</li></ol>
<p><b>Phân biệt sử động và ý động</b>: sử động thay đổi <i>thực tế</i> của tân ngữ (làm cho gân cốt nhọc thật); ý động thay đổi <i>cách nhìn</i> của chủ ngữ về tân ngữ (nước Lỗ không nhỏ đi, chỉ là Khổng Tử thấy nó nhỏ). Dấu hiệu chung: <b>hình dung từ đứng ngay trước một tân ngữ</b>.</p>` }
  ],
  texts: [
    { title: 'Thành không phải không cao', src: 'Mạnh Tử · Công Tôn Sửu hạ (trích)', lang: 'zh-TW',
      orig: '城非不高也，池非不深也，兵革非不堅利也，米粟非不多也；委而去之，是地利不如人和也。',
      reading: 'Thành phi bất cao dã, trì phi bất thâm dã, binh cách phi bất kiên lợi dã, mễ túc phi bất đa dã; uỷ nhi khứ chi, thị địa lợi bất như nhân hoà dã.',
      vi: 'Thành không phải là không cao, hào không phải là không sâu, binh khí áo giáp không phải là không bền sắc, lương thực không phải là không nhiều; vậy mà (người giữ thành) bỏ thành mà chạy — ấy là vì địa lợi không bằng nhân hoà vậy.',
      notes: [['池 trì', 'hào nước quanh thành (nghĩa cổ)'], ['兵革 binh cách', 'binh khí và áo giáp'], ['堅利 kiên lợi', 'hai hình dung từ: bền, sắc'], ['非不 phi bất', 'không phải là không (phủ định kép)'], ['委 uỷ', 'bỏ'], ['去 khứ', 'rời bỏ (nghĩa cổ)'], ['是 thị', 'đại từ chỉ thị: ấy là, điều đó'], ['不如 bất như', 'không bằng']],
      guide: ['Tìm các hình dung từ làm vị ngữ. Chúng có cần hệ từ không?', 'Chữ 是 ở đây là “là” hay “điều đó”? Nhớ lại bài Động từ.'],
      comment: '<p>Bốn vế song song đều có cấu trúc <b>danh từ + 非不 + hình dung từ + 也</b>: hình dung từ (高, 深, 堅利, 多) làm vị ngữ trực tiếp, được phủ định kép “không phải là không”. Lối lặp này tạo nên nhịp hùng biện đặc trưng của Mạnh Tử.</p><p>Chữ <b>去</b> mang nghĩa cổ “rời bỏ” (bài 8), và <b>是</b> là đại từ “điều đó” (bài 11). Câu kết “địa lợi bất như nhân hoà” đã thành thành ngữ trong tiếng Việt.</p>' },
    { title: 'Trời sắp giao trách nhiệm lớn', src: 'Mạnh Tử · Cáo Tử hạ (trích)', lang: 'zh-TW',
      orig: '故天將降大任於是人也，必先苦其心志，勞其筋骨，餓其體膚，空乏其身，行拂亂其所為，所以動心忍性，曾益其所不能。',
      reading: 'Cố thiên tương giáng đại nhậm ư thị nhân dã, tất tiên khổ kỳ tâm chí, lao kỳ cân cốt, ngạ kỳ thể phu, không phạp kỳ thân, hành phất loạn kỳ sở vi, sở dĩ động tâm nhẫn tính, tăng ích kỳ sở bất năng.',
      vi: 'Cho nên khi trời sắp giao trách nhiệm lớn cho người nào, ắt trước hết làm cho tâm chí người ấy khổ sở, làm cho gân cốt nhọc nhằn, làm cho thân thể đói khát, làm cho bản thân thiếu thốn, làm cho việc làm trái ngược rối loạn — để lay động lòng người ấy, rèn cho tính tình bền bỉ, thêm cho những điều người ấy chưa làm được.',
      notes: [['將 tương', 'phó từ: sắp'], ['大任 đại nhậm', 'hình dung từ 大 làm định ngữ: trách nhiệm lớn'], ['是人 thị nhân', '是 đại từ chỉ thị làm định ngữ: người ấy'], ['苦 khổ', 'hình dung từ dùng sử động: làm cho khổ'], ['勞 lao', 'làm cho nhọc'], ['餓 ngạ', 'làm cho đói'], ['空乏 không phạp', 'làm cho thiếu thốn'], ['所以 sở dĩ', 'để mà (cái dùng để)'], ['曾 tăng', '= 增: thêm'], ['所不能 sở bất năng', 'kết cấu 所: điều chưa làm được']],
      guide: ['Tìm bốn hình dung từ dùng theo cách sử động. Tân ngữ của mỗi từ là gì?', '大任 và 是人: chữ nào là định ngữ, chữ nào là trung tâm?'],
      comment: '<p>Đây là một trong những đoạn văn nổi tiếng nhất của Mạnh Tử, và là ví dụ chuẩn mực cho <b>cách dùng sử động của hình dung từ</b>: 苦其心志, 勞其筋骨, 餓其體膚, 空乏其身 — bốn hình dung từ (khổ, nhọc, đói, thiếu thốn) đứng trước tân ngữ có 其, đều mang nghĩa “làm cho … ”.</p><p>Đoạn văn cũng gom nhiều điểm của các bài trước: định ngữ đứng trước (大任), đại từ chỉ thị 是 (是人 — người ấy), phó từ 將 (sắp), kết cấu 所 (所為, 所不能). Nếu dịch được trọn đoạn này, bạn đã nắm khá vững phần thực từ.</p>' },
    { title: 'Lên núi Thái thì thấy thiên hạ nhỏ', src: 'Mạnh Tử · Tận tâm thượng (trích)', lang: 'zh-TW',
      orig: '孔子登東山而小魯，登太山而小天下。',
      reading: 'Khổng Tử đăng Đông Sơn nhi tiểu Lỗ, đăng Thái Sơn nhi tiểu thiên hạ.',
      vi: 'Khổng Tử lên núi Đông Sơn thì thấy nước Lỗ nhỏ, lên núi Thái Sơn thì thấy thiên hạ nhỏ.',
      notes: [['登 đăng', 'lên (tha động từ)'], ['東山 Đông Sơn', 'núi ở nước Lỗ'], ['而 nhi', 'liên từ: thì, mà'], ['小 tiểu', 'hình dung từ dùng ý động: coi là nhỏ, thấy nhỏ'], ['太山 Thái Sơn', '= 泰山, núi Thái Sơn']],
      guide: ['小 trong 小魯 là sử động hay ý động? Nước Lỗ có thật sự nhỏ đi không?', 'Thử dịch 小魯 theo nghĩa sử động. Câu có hợp lý không?'],
      comment: '<p>Câu này là ví dụ kinh điển của <b>ý động</b>: 小 (nhỏ) đứng trước tân ngữ 魯, nhưng nước Lỗ không bị làm cho nhỏ đi — chỉ là đứng trên cao, Khổng Tử <b>thấy</b> nó nhỏ. So với 苦其心志 (sử động — làm cho khổ thật), bạn sẽ thấy rõ sự khác biệt.</p><p>Mạnh Tử dùng hình ảnh này để nói: người đã thấy biển thì khó nói chuyện về nước sông; người đã học ở cửa thánh nhân thì khó nói chuyện bằng lời tầm thường. Tầm nhìn cao thì thế giới “nhỏ” lại.</p>' }
  ],
  concepts: [
    { id: 'hinhdung', han: '形容詞', term: 'Hình dung từ', def: 'Thực từ hình dung, chỉ ra tính chất, trạng thái của sự vật, hiện tượng. Làm định ngữ (đứng trước danh từ), vị ngữ (không cần hệ từ), trạng ngữ (đứng trước động từ).', ex: '大國 (định ngữ); 山高 (vị ngữ); 疾走 (trạng ngữ).', counter: 'Hình dung từ đứng trước tân ngữ (小魯, 苦其心志) — đang được dùng như động từ.', rel: ['hd-vingu', 'mucdo', 'hd-dong'], write: '形' },
    { id: 'hd-vingu', han: '形容詞作謂語', term: 'Hình dung từ làm vị ngữ', def: 'Hình dung từ làm vị ngữ trực tiếp, không cần hệ từ (giống tiếng Việt); có thể nhận phó từ trước (不, 甚) và ngữ khí từ sau (也, 矣, 哉).', ex: '城非不高也; 賢哉回也.', counter: 'Câu phán đoán danh từ cần cấu trúc 者…也 hoặc hệ từ.', rel: ['hinhdung'], write: '高' },
    { id: 'mucdo', han: '甚 · 至 · 最 · 於', term: 'Mức độ và so sánh', def: 'Mức độ: phó từ 甚, 至, 最, 太, 極, 頗, 愈 đứng trước hình dung từ. So sánh hơn: A + hình dung từ + 於 + B.', ex: '至善 (chí thiện); 苛政猛於虎 (chính sự hà khắc dữ hơn hổ).', counter: '於 chỉ nơi chốn (於南海 — ở Nam Hải) — giới từ nơi chốn, không phải so sánh.', rel: ['hinhdung'], write: '甚' },
    { id: 'trungdiep', han: '疊字 · 然', term: 'Hình dung từ trùng điệp và hậu tố 然', def: 'Lặp chữ (青青, 蕭蕭, 坦蕩蕩) hoặc thêm hậu tố 然, 如, 爾 để tạo hình dung từ trạng thái, rất phổ biến trong văn miêu tả.', ex: '君子坦蕩蕩，小人長戚戚; 截然, 怡然.', counter: 'Từ ghép đẳng lập hai chữ khác nhau như 堅利 (bền + sắc).', rel: ['hinhdung'], write: '然' },
    { id: 'hd-dong', han: '使動 · 意動', term: 'Hình dung từ dùng sử động và ý động', def: 'Đứng trước tân ngữ: sử động = làm cho tân ngữ có tính chất ấy (thay đổi thực tế); ý động = coi tân ngữ là có tính chất ấy (thay đổi cách nhìn).', ex: 'Sử động: 苦其心志, 春風又綠江南岸. Ý động: 小魯, 小天下.', counter: 'Hình dung từ dùng như danh từ (溫故而知新) — làm tân ngữ, không mang tân ngữ.', rel: ['hinhdung'], write: '小' }
  ],
  drills: [
    { t: 'mcq', ch: '孤松', q: 'Trong 孤松, hình dung từ 孤 làm thành phần gì và dịch thế nào?', o: ['Vị ngữ: thông thì lẻ loi', 'Định ngữ đứng trước: cây thông lẻ loi', 'Trạng ngữ: một cách cô độc', 'Chủ ngữ'], a: 1, why: 'Hình dung từ đứng trước danh từ → định ngữ; tiếng Việt đảo: thông lẻ loi.' },
    { t: 'mcq', ch: '城非不高也', q: 'Trong 城非不高也, 高 làm thành phần gì?', o: ['Định ngữ', 'Vị ngữ (không cần hệ từ)', 'Trạng ngữ', 'Tân ngữ'], a: 1, why: 'Hình dung từ làm vị ngữ trực tiếp, được phủ định bằng 非不 và kết thúc bằng 也.' },
    { t: 'mcq', ch: '苦其心志', q: '苦 trong 必先苦其心志 nghĩa là:', o: ['Đắng', 'Làm cho (tâm chí) khổ — sử động', 'Coi là khổ — ý động', 'Một cách khổ sở'], a: 1, why: 'Hình dung từ đứng trước tân ngữ, làm thay đổi thực tế của tân ngữ → sử động.' },
    { t: 'mcq', ch: '小魯', q: '小 trong 登東山而小魯 nghĩa là:', o: ['Làm cho nước Lỗ nhỏ đi', 'Coi nước Lỗ là nhỏ, thấy nước Lỗ nhỏ', 'Nước Lỗ nhỏ bé', 'Một cách khiêm tốn'], a: 1, why: 'Nước Lỗ không thật sự nhỏ đi — chỉ là cách nhìn của Khổng Tử → ý động.' },
    { t: 'mcq', ch: '故', q: 'Trong 溫故而知新, 故 và 新 đóng vai trò:', o: ['Hình dung từ làm định ngữ', 'Hình dung từ dùng như danh từ (cái cũ, cái mới), làm tân ngữ', 'Liên từ', 'Phó từ'], a: 1, why: 'Đứng sau động từ 溫 và 知 ở vị trí tân ngữ → dùng như danh từ.' },
    { t: 'mcq', ch: '猛於虎', q: '苛政猛於虎也 nghĩa là:', o: ['Chính sự hà khắc ở chỗ hổ', 'Chính sự hà khắc dữ hơn hổ', 'Chính sự hà khắc như hổ', 'Hổ dữ vì chính sự hà khắc'], a: 1, why: 'A + hình dung từ + 於 + B = A … hơn B.' },
    { t: 'mcq', ch: '疾走', q: '疾 trong 疾走 (chạy nhanh) làm thành phần gì?', o: ['Chủ ngữ', 'Trạng ngữ chỉ cách thức', 'Tân ngữ', 'Định ngữ'], a: 1, why: 'Hình dung từ đứng trước động từ 走 → trạng ngữ. Tiếng Việt đặt sau: chạy nhanh.' },
    { t: 'mcq', ch: '綠', q: '綠 trong 春風又綠江南岸 nghĩa là:', o: ['Màu xanh', 'Làm cho (bờ Giang Nam) xanh — sử động', 'Coi là xanh — ý động', 'Một cách xanh tươi'], a: 1, why: 'Gió xuân thật sự làm cây cỏ bờ sông xanh lại → sử động. Câu thơ nổi tiếng của Vương An Thạch.' },
    { t: 'mcq', q: 'Dấu hiệu chung để nhận ra hình dung từ đang được dùng như động từ (sử động / ý động) là:', o: ['Đứng sau danh từ', 'Đứng ngay trước một tân ngữ', 'Đứng cuối câu với 也', 'Có hậu tố 然'], a: 1, why: 'Hình dung từ vốn không mang tân ngữ; khi có tân ngữ theo sau, nó đang làm động từ.' },
    { t: 'tr', src: '孔子登東山而小魯，登太山而小天下。', rd: 'Khổng Tử đăng Đông Sơn nhi tiểu Lỗ, đăng Thái Sơn nhi tiểu thiên hạ.', a: 'Khổng Tử lên núi Đông Sơn thì thấy nước Lỗ nhỏ, lên núi Thái Sơn thì thấy thiên hạ nhỏ.', why: '小: ý động — coi là nhỏ; 而: thì.' },
    { t: 'tr', src: '必先苦其心志，勞其筋骨', rd: 'Tất tiên khổ kỳ tâm chí, lao kỳ cân cốt', a: 'Ắt trước hết làm cho tâm chí người ấy khổ sở, làm cho gân cốt người ấy nhọc nhằn.', why: '苦, 勞: sử động — làm cho khổ, làm cho nhọc; 其: của người ấy.' }
  ],
  socra: ['Cho mình ba hình dung từ Hán Việt trong tiếng Việt, và thử dùng mỗi từ theo ba chức năng định ngữ, vị ngữ, trạng ngữ trong một câu Hán văn ngắn.', 'Bạn phân biệt sử động và ý động bằng cách nào? Thử với 美其服 (làm đẹp áo / cho áo là đẹp) — cần thêm ngữ cảnh gì?', 'Vì sao hình dung từ làm vị ngữ lại dễ với người Việt, còn làm định ngữ thì dễ sai?'],
  feynman: 'Giải thích cho bạn cùng lớp sự khác nhau giữa 苦其心志 và 小魯 — hai câu đều có hình dung từ đứng trước tân ngữ.',
  essay: 'Dịch trọn đoạn “天將降大任於是人也…” (Mạnh Tử), sau đó phân tích từng hình dung từ (chức năng, cách dùng sử động/ý động) và các thực từ khác đã học ở bài 10 – 11.',
  exam: {
    points: ['Hình dung từ: hình dung, định vị, chỉ ra tính chất của sự vật, hiện tượng; tính chất (大 高 美 善) và trạng thái (悠悠, 截然)', 'Định ngữ: đứng trước danh từ (大國, 孤松) → dịch đảo', 'Vị ngữ: trực tiếp, không cần hệ từ (山高; 城非不高也; 賢哉回也)', 'Trạng ngữ: đứng trước động từ (疾走, 善戰)', 'Mức độ: 甚, 至, 最, 太, 極, 愈; so sánh hơn: A + HDT + 於 + B (苛政猛於虎)', 'Trùng điệp và hậu tố 然 / 如 / 爾 (坦蕩蕩, 怡然)', 'Dùng như danh từ (溫故而知新); sử động (苦其心志, 綠江南岸); ý động (小魯, 小天下)'],
    qs: ['Có câu nào một hình dung từ đứng trước tân ngữ mà có thể hiểu cả sử động lẫn ý động không? Khi ấy dựa vào đâu để quyết định?', 'Vì sao thơ hay dùng hình dung từ theo cách sử động (như 綠)? Nó tạo hiệu quả nghệ thuật gì?']
  },
  readings: ['Giáo trình của lớp: phần Thực từ — Hình dung từ', 'Mạnh Tử · Cáo Tử hạ — đoạn “sinh ư ưu hoạn, tử ư an lạc” (đọc trọn)', 'Tìm đọc giai thoại Vương An Thạch sửa chữ 綠 trong câu “春風又綠江南岸”']
};

const HV_KHAIQUAT = {
  id: 'hv-khaiquat', kind: 'lang', short: 'Chữ Hán', title: 'Chữ Hán: khái quát', sub: 'Loại chữ ghi ý – âm, nguồn gốc, các thể chữ từ giáp cốt đến khải thư, phồn thể và giản thể, chữ Hán ở Việt Nam', who: 'Phần I · Chữ Hán',
  goals: ['Giải thích chữ Hán là loại chữ ghi ý – âm, mỗi chữ thống nhất hình – âm – nghĩa', 'Kể được các thể chữ theo trình tự lịch sử và ý nghĩa của “lệ biến”', 'Phân biệt phồn thể và giản thể; biết vì sao học Hán Nôm dùng phồn thể và bẫy “một giản – nhiều phồn”', 'Nắm các mốc của chữ Hán ở Việt Nam'],
  q: 'Chữ cái Latinh chỉ có vài chục ký hiệu ghi âm. Chữ Hán có hàng vạn chữ. Vì sao một nền văn minh lại chọn một hệ chữ “khó” như vậy — và nó đã sống sót hơn ba nghìn năm thế nào?',
  context: '<p>Bài mở đầu khoá: trước khi học cấu tạo chữ (lục thư), từ và ngữ pháp, ta cần hiểu <b>chữ Hán là loại chữ gì</b>, nó đã thay hình đổi dạng ra sao qua ba nghìn năm, và nó đã gắn với lịch sử Việt Nam như thế nào. Phần này cũng giải thích những khái niệm bạn sẽ gặp mãi về sau: giáp cốt, triện, lệ, khải, phồn thể, giản thể.</p>',
  lecture: [
    { h: 'Chữ Hán là loại chữ gì', html: `<p>Các hệ chữ trên thế giới có thể chia đại thể thành <b>chữ ghi âm</b> (chữ cái Latinh, chữ Quốc ngữ — mỗi ký hiệu ghi một âm) và <b>chữ ghi ý</b> (mỗi ký hiệu ghi một đơn vị có nghĩa). Chữ Hán thường được gọi là <b>chữ ghi ý – âm</b> (hay chữ ghi từ / ghi ngữ tố): mỗi chữ ghi <b>một âm tiết có nghĩa</b>, vừa có yếu tố biểu ý (bộ phận chỉ nghĩa), vừa có yếu tố biểu âm (bộ phận gợi âm — sẽ thấy rõ ở chữ hình thanh, bài 3).</p>
<p>Mỗi chữ Hán thống nhất ba mặt: <b>hình</b> (cách viết), <b>âm</b> (một âm tiết), <b>nghĩa</b>. Vì thế một chữ Hán có thể được đọc rất khác nhau ở Bắc Kinh, Quảng Đông, Nhật Bản, Hàn Quốc, Việt Nam mà <b>vẫn hiểu cùng một nghĩa</b> — 人 là “người” với tất cả, dù đọc là rén, jan, hito/jin, in hay nhân. Đây là lý do chữ Hán trở thành văn tự chung của cả vùng Đông Á suốt nhiều thế kỷ, và là lý do một người Việt xưa có thể “bút đàm” (nói chuyện bằng bút) với sứ thần Trung Quốc, Triều Tiên.</p>
<p><b>Số lượng</b>: <i>Thuyết văn giải tự</i> (năm 100) có 9.353 chữ; <i>Khang Hy tự điển</i> (1716) có khoảng 47.000 chữ. Nhưng số chữ thường dùng ít hơn nhiều: khoảng 3.500 chữ chiếm tuyệt đại đa số văn bản. Đọc được phần lớn văn bản cổ thông thường cần khoảng 2.000 – 3.000 chữ. Học chữ Hán vì thế không phải học hết hàng vạn chữ, mà học <b>cách chữ được cấu tạo</b> (lục thư, bộ thủ) để đoán và nhớ chữ mới.</p>` },
    { h: 'Nguồn gốc: từ truyền thuyết đến khảo cổ', html: `<p><b>Truyền thuyết</b> kể rằng <b>Thương Hiệt</b>, sử quan của Hoàng Đế, có bốn mắt, nhìn dấu chân chim thú mà sáng tạo ra chữ. Sách <i>Hoài Nam Tử</i> kể khi Thương Hiệt làm ra chữ thì “trời mưa thóc, quỷ khóc đêm” — chữ viết là một biến cố vũ trụ. Kinh Dịch thì nói thời thượng cổ người ta <b>thắt nút dây</b> (kết thằng) để ghi nhớ, về sau thánh nhân thay bằng <b>thư khế</b> (khắc chữ).</p>
<p>Thực tế, chữ Hán không do một người tạo ra mà hình thành dần qua nhiều thế hệ. Bằng chứng sớm nhất có hệ thống là <b>giáp cốt văn</b> 甲骨文 — chữ khắc trên mai rùa, xương thú dùng để bói của nhà Thương (khoảng thế kỷ XIV – XI TCN), tìm thấy ở Ân Khư (An Dương, Hà Nam). Câu chuyện phát hiện rất ly kỳ: năm 1899, Vương Ý Vinh, một quan chức kiêm nhà nghiên cứu đồ cổ, nhận ra những vết khắc trên các mảnh “long cốt” bán làm thuốc ở hiệu thuốc bắc là chữ cổ.</p>
<p>Giáp cốt văn đã là một hệ chữ <b>hoàn chỉnh</b> (đã có đủ các phép tạo chữ của lục thư), với khoảng bốn nghìn chữ khác nhau, trong đó giới nghiên cứu đọc được khoảng một phần ba. Điều đó cho thấy chữ Hán phải có một quá trình phát triển dài trước đó mà ta chưa tìm được dấu vết đầy đủ. Các ký hiệu khắc trên đồ gốm thời đồ đá mới (như văn hoá Ngưỡng Thiều) có phải là tiền thân của chữ hay không vẫn còn tranh luận.</p>` },
    { h: 'Các thể chữ qua ba nghìn năm', html: `<table class="ac-tbl"><tr><th>Thể chữ</th><th>Thời kỳ</th><th>Đặc điểm</th></tr>
<tr><td><b>Giáp cốt văn</b> 甲骨文</td><td>Thương</td><td>Khắc bằng dao trên mai rùa, xương; nét mảnh, thẳng, gãy góc; hình chữ chưa cố định.</td></tr>
<tr><td><b>Kim văn</b> 金文 (chung đỉnh văn)</td><td>Thương – Chu</td><td>Đúc trên đồ đồng (chuông, đỉnh); nét đầy, tròn. Đỉnh Mao Công (Tây Chu) có gần 500 chữ.</td></tr>
<tr><td><b>Đại triện</b> 大篆</td><td>Cuối Chu, các nước Chiến Quốc</td><td>Mỗi nước một kiểu chữ khác nhau.</td></tr>
<tr><td><b>Tiểu triện</b> 小篆</td><td>Tần (221 TCN)</td><td>Tần Thuỷ Hoàng thống nhất văn tự (“thư đồng văn”), Lý Tư chuẩn hoá; nét đều, tròn, cân đối. Nay còn dùng trên con dấu (“chữ triện”).</td></tr>
<tr><td><b>Lệ thư</b> 隸書</td><td>Tần – Hán</td><td>Nét thẳng, có đầu tằm đuôi én; viết nhanh hơn triện. Đánh dấu bước ngoặt lớn nhất.</td></tr>
<tr><td><b>Khải thư</b> 楷書 (chân thư)</td><td>Cuối Hán – Nguỵ Tấn, chín muồi đời Đường</td><td>Chữ chân phương, mẫu mực; là thể chữ in và viết chuẩn đến ngày nay.</td></tr>
<tr><td><b>Hành thư</b> 行書</td><td>từ Đông Hán</td><td>Bán thảo, viết nhanh mà vẫn dễ đọc (Vương Hy Chi, <i>Lan Đình tự</i>).</td></tr>
<tr><td><b>Thảo thư</b> 草書</td><td>từ Hán</td><td>Viết rất nhanh, nét liền, khó đọc; đỉnh cao là “cuồng thảo” của Trương Húc, Hoài Tố đời Đường.</td></tr></table>
<p><b>Lệ biến</b> (隸變 — sự biến đổi sang lệ thư) là ranh giới quan trọng nhất: trước lệ thư là <b>cổ văn tự</b> (giáp cốt, kim văn, triện — còn giữ nhiều nét tượng hình), sau lệ thư là <b>kim văn tự</b> (lệ, khải — chữ đã thành những nét thẳng, tính tượng hình mờ đi). Vì thế, muốn hiểu cấu tạo gốc của một chữ (lục thư), phải nhìn về chữ <b>trước lệ biến</b>. Ví dụ: chân ngựa trong 馬 và đuôi cá trong 魚 sau lệ biến đều thành bốn chấm 灬 — trông như bộ hoả, nhưng chẳng liên quan đến lửa.</p>` },
    { h: 'Phồn thể và giản thể', html: `<p>Năm 1956, nước Cộng hoà Nhân dân Trung Hoa ban hành <i>Phương án giản hoá chữ Hán</i>, rồi <i>Tổng biểu chữ giản hoá</i> (1964, điều chỉnh năm 1986). Chữ được giản hoá gọi là <b>giản thể</b> (简体); chữ truyền thống gọi là <b>phồn thể</b> (繁體). Đài Loan, Hồng Kông, Ma Cao vẫn dùng phồn thể; Nhật Bản có kiểu giản hoá riêng (shinjitai); Singapore, Malaysia dùng giản thể.</p>
<p>Một số cách giản hoá: dùng hình chữ thảo (書 → 书), giản hoá bộ phận (言 → 讠: 說 → 说), lấy một phần đại diện (聲 → 声), và <b>dùng một chữ đồng âm thay cho nhiều chữ</b> (後 → 后, 髮 và 發 → 发, 乾 và 幹 → 干).</p>
<p><b>Vì sao môn Hán Nôm học phồn thể?</b> Vì toàn bộ văn bản cổ — của Trung Quốc lẫn Việt Nam — đều viết bằng chữ phồn thể (chữ chính thể). Hơn nữa, cách giản hoá đồng âm tạo ra <b>bẫy “một giản – nhiều phồn”</b>: chữ 后 giản thể có thể là 后 (hoàng hậu) hoặc 後 (sau); 发 có thể là 發 (phát) hoặc 髮 (tóc); 干 có thể là 干 (can — cái khiên), 乾 (càn / can — khô) hoặc 幹 (cán — làm). Đọc văn cổ qua bản giản thể rất dễ hiểu sai. Khi tra cứu trên mạng hay dùng phần mềm, hãy chuyển về phồn thể.</p>` },
    { h: 'Chữ Hán ở Việt Nam', html: `<p>Chữ Hán vào Việt Nam theo con đường lịch sử của thời Bắc thuộc, từ khoảng thế kỷ II TCN. Thái thú Sĩ Nhiếp (cuối thế kỷ II – đầu thế kỷ III) được người xưa tôn là “Nam Giao học tổ” — ông tổ của việc học chữ ở nước Nam. Sau khi giành độc lập (thế kỷ X), các triều đại Việt Nam vẫn dùng chữ Hán làm <b>văn tự chính thức</b>:</p>
<ul><li>1070: Lý Thánh Tông lập Văn Miếu; 1075: khoa thi đầu tiên (Minh kinh bác học); 1076: Quốc Tử Giám.</li>
<li>Văn bản hành chính, luật pháp, sử sách (Đại Việt sử ký toàn thư), văn chương bác học (Nam quốc sơn hà, Hịch tướng sĩ, Bình Ngô đại cáo) đều viết bằng chữ Hán.</li>
<li>Song song, người Việt sáng tạo <b>chữ Nôm</b> (dựa trên chữ Hán) để ghi tiếng Việt, dùng cho văn chương dân tộc (Truyện Kiều).</li>
<li>1919: khoa thi Hội cuối cùng ở Huế; đầu thế kỷ XX, chữ Quốc ngữ dần thay thế chữ Hán, chữ Nôm.</li></ul>
<p>Kết quả là một kho di sản Hán Nôm khổng lồ: sách, văn bia, gia phả, sắc phong, hoành phi câu đối ở đình chùa. Viện Nghiên cứu Hán Nôm (thành lập năm 1979) lưu giữ hàng chục nghìn văn bản. Học Hán văn cổ chính là học để đọc được hơn một nghìn năm lịch sử thành văn của chính người Việt — và để hiểu vì sao tiếng Việt có nhiều từ Hán Việt đến vậy (bài 5).</p>` }
  ],
  texts: [
    { title: 'Từ thắt nút dây đến khắc chữ', src: 'Kinh Dịch · Hệ từ hạ', lang: 'zh-TW',
      orig: '上古結繩而治，後世聖人易之以書契。',
      reading: 'Thượng cổ kết thằng nhi trị, hậu thế thánh nhân dịch chi dĩ thư khế.',
      vi: 'Thời thượng cổ thắt nút dây mà trị (việc), đời sau thánh nhân thay nó bằng việc khắc chữ.',
      notes: [['結繩 kết thằng', 'thắt nút dây (để ghi nhớ sự việc)'], ['治 trị', 'cai trị, sắp đặt công việc'], ['易 dịch', 'thay đổi (đọc “dịch”; đọc “dị” là “dễ”)'], ['之 chi', 'đại từ: việc thắt nút dây'], ['以 dĩ', 'giới từ: bằng'], ['書契 thư khế', 'khắc chữ (契 = khắc), tức chữ viết']],
      guide: ['Chữ 易 có hai âm (dịch / dị). Ở đây đọc âm nào, vì sao?', 'Theo đoạn văn, chữ viết ra đời để đáp ứng nhu cầu gì?'],
      comment: '<p>Đây là một trong những ghi chép cổ nhất về nguồn gốc chữ viết, nhìn chữ viết như một <b>công cụ cai trị, ghi nhớ</b>. Về ngữ pháp, câu có cấu trúc 易之以書契 = “thay nó bằng thư khế” — 以 là giới từ chỉ công cụ (bài 17). Chữ 易 đọc là <b>dịch</b> (thay đổi), cùng chữ với tên sách Kinh Dịch (Kinh về sự biến đổi); khi đọc là <b>dị</b> thì nghĩa là “dễ” — một ví dụ chữ nhiều âm (bài 5).</p>' },
    { title: 'Trời mưa thóc, quỷ khóc đêm', src: 'Hoài Nam Tử · Bản kinh huấn', lang: 'zh-TW',
      orig: '昔者倉頡作書，而天雨粟，鬼夜哭。',
      reading: 'Tích giả Thương Hiệt tác thư, nhi thiên vũ túc, quỷ dạ khốc.',
      vi: 'Ngày xưa Thương Hiệt làm ra chữ, thì trời mưa thóc, quỷ khóc ban đêm.',
      notes: [['昔者 tích giả', 'ngày xưa (者 là hậu tố chỉ thời gian)'], ['作書 tác thư', 'làm ra chữ'], ['雨 vũ', 'danh từ “mưa” dùng như động từ: mưa xuống (khi là động từ, có sách ghi âm “vụ”)'], ['粟 túc', 'thóc'], ['夜 dạ', 'danh từ làm trạng ngữ: ban đêm'], ['哭 khốc', 'khóc']],
      guide: ['Tìm một danh từ dùng như động từ và một danh từ làm trạng ngữ trong câu (nhớ bài 10).', 'Vì sao người xưa tưởng tượng sự ra đời của chữ viết lại kéo theo những dị tượng như vậy?'],
      comment: '<p>Các nhà chú giải đời Hán giải thích: có chữ thì người ta bỏ nghề nông mà theo nghề viết lách, trời sợ dân đói nên mưa thóc xuống; quỷ sợ bị chữ viết (bùa chú) trấn áp nên khóc. Dù hiểu thế nào, câu chuyện cho thấy người xưa coi chữ viết là một <b>sức mạnh</b>, thay đổi cả quan hệ giữa con người với trời đất và thần linh.</p><p>Về ngữ pháp: <b>雨</b> (mưa) là danh từ dùng như động từ (trời <i>mưa</i> thóc), <b>夜</b> là danh từ làm trạng ngữ (khóc <i>ban đêm</i>). Ngay câu chuyện về nguồn gốc chữ đã chứa ngữ pháp bạn học ở Phần III.</p>' },
    { title: 'Thống nhất văn tự', src: 'Sử ký · Tần Thuỷ Hoàng bản kỷ (trích)', lang: 'zh-TW',
      orig: '一法度衡石丈尺，車同軌，書同文字。',
      reading: 'Nhất pháp độ hành thạch trượng xích, xa đồng quỹ, thư đồng văn tự.',
      vi: '(Tần Thuỷ Hoàng) thống nhất pháp độ, cân đo và thước tấc; xe cùng một cỡ trục, chữ viết cùng một kiểu chữ.',
      notes: [['一 nhất', 'số từ dùng như động từ: thống nhất'], ['法度 pháp độ', 'luật lệ, chế độ'], ['衡石 hành thạch', 'cân và đơn vị cân (thạch)'], ['丈尺 trượng xích', 'đơn vị đo chiều dài'], ['軌 quỹ', 'khoảng cách giữa hai bánh xe'], ['書同文字 thư đồng văn tự', 'chữ viết dùng chung một kiểu chữ']],
      guide: ['Chữ 一 (một) được dùng như loại từ nào ở đầu câu?', 'Vì sao thống nhất chữ viết lại quan trọng ngang với thống nhất đo lường và cỡ xe?'],
      comment: '<p>Sau khi diệt sáu nước năm 221 TCN, Tần Thuỷ Hoàng thống nhất mọi thứ: luật, cân đo, cỡ xe, và <b>chữ viết</b> — lấy tiểu triện của nước Tần làm chuẩn, bỏ các kiểu chữ riêng của các nước. Cụm “書同文，車同軌” trở thành biểu tượng của sự thống nhất. Về lâu dài, việc có một hệ chữ chung giúp một vùng đất rộng lớn với rất nhiều phương ngữ vẫn đọc được văn bản của nhau.</p><p>Chữ <b>一</b> đứng đầu câu là số từ dùng như động từ (“làm cho thành một” — thống nhất), một dạng hoạt dụng (bài 15).</p>' }
  ],
  concepts: [
    { id: 'hantu', han: '漢字', term: 'Chữ Hán: chữ ghi ý – âm', def: 'Mỗi chữ ghi một âm tiết có nghĩa, thống nhất hình – âm – nghĩa; có yếu tố biểu ý và biểu âm. Đọc khác nhau theo vùng nhưng nghĩa chung, nên từng là văn tự chung của Đông Á.', ex: '人: rén (Bắc Kinh), nhân (Hán Việt), hito / jin (Nhật) — đều là “người”.', counter: 'Chữ Quốc ngữ — chữ ghi âm, mỗi ký hiệu ghi một âm vị.', rel: ['the-chu', 'phon-gian'], write: '漢字' },
    { id: 'giapcot', han: '甲骨文', term: 'Giáp cốt văn', def: 'Chữ khắc trên mai rùa, xương thú để bói của nhà Thương; phát hiện năm 1899 (Vương Ý Vinh) ở Ân Khư; đã là hệ chữ hoàn chỉnh, khoảng bốn nghìn chữ.', ex: 'Các câu hỏi bói về chiến tranh, mùa màng, bệnh tật của vua Thương.', counter: 'Kim văn — chữ đúc trên đồ đồng, nét đầy và tròn hơn.', rel: ['the-chu'], write: '甲骨' },
    { id: 'the-chu', han: '篆 · 隸 · 楷', term: 'Các thể chữ và lệ biến', def: 'Giáp cốt → kim văn → đại triện → tiểu triện (Tần) → lệ thư → khải thư; hành thư, thảo thư. Lệ biến là ranh giới giữa cổ văn tự (còn tượng hình) và kim văn tự (nét thẳng).', ex: 'Sau lệ biến, chân ngựa (馬) và đuôi cá (魚) đều thành 灬.', counter: 'Kiểu chữ in (font) như Tống thể, Hắc thể — là kiểu trình bày của khải thư, không phải thể chữ khác.', rel: ['giapcot', 'hantu'], write: '隸' },
    { id: 'phon-gian', han: '繁體 · 簡體', term: 'Phồn thể và giản thể', def: 'Giản thể: chữ giản hoá ở CHND Trung Hoa từ 1956; phồn thể: chữ truyền thống. Văn bản cổ dùng phồn thể. Bẫy: một chữ giản thể có thể ứng với nhiều chữ phồn thể.', ex: '后 = 后 (hậu) / 後 (sau); 发 = 發 (phát) / 髮 (tóc); 干 = 干 / 乾 / 幹.', counter: 'Biến thể chữ cổ (dị thể tự) như 峰 / 峯 — cùng một chữ, khác cách viết, không do giản hoá.', rel: ['hantu'], write: '繁' },
    { id: 'hanvn', han: '漢字在越南', term: 'Chữ Hán ở Việt Nam', def: 'Vào Việt Nam từ thời Bắc thuộc; là văn tự chính thức đến đầu thế kỷ XX: Văn Miếu 1070, khoa thi đầu 1075, Quốc Tử Giám 1076, khoa thi cuối 1919. Song song có chữ Nôm.', ex: 'Nam quốc sơn hà, Hịch tướng sĩ, Bình Ngô đại cáo, Đại Việt sử ký toàn thư.', counter: 'Chữ Nôm — chữ dựa trên chữ Hán để ghi tiếng Việt, không phải chữ Hán.', rel: ['hantu'], write: '越' }
  ],
  drills: [
    { t: 'mcq', q: 'Chữ Hán được xếp vào loại chữ nào?', o: ['Chữ ghi âm thuần tuý', 'Chữ ghi ý – âm (mỗi chữ ghi một âm tiết có nghĩa)', 'Chữ tượng hình thuần tuý', 'Chữ ghi âm tiết không có nghĩa'], a: 1, why: 'Mỗi chữ thống nhất hình – âm – nghĩa, có yếu tố biểu ý và biểu âm (rõ nhất ở chữ hình thanh).' },
    { t: 'mcq', q: 'Giáp cốt văn được phát hiện năm nào, trên vật liệu gì?', o: ['1899, mai rùa và xương thú', '221 TCN, thẻ tre', '1716, giấy', '1956, đồ đồng'], a: 0, why: 'Vương Ý Vinh nhận ra chữ trên các mảnh “long cốt” năm 1899; chữ của nhà Thương khắc để bói.' },
    { t: 'mcq', q: 'Ai thống nhất văn tự, lấy tiểu triện làm chuẩn?', o: ['Chu Công', 'Tần Thuỷ Hoàng (với Lý Tư)', 'Hán Vũ Đế', 'Khổng Tử'], a: 1, why: '“書同文” — năm 221 TCN sau khi diệt sáu nước.' },
    { t: 'mcq', q: '“Lệ biến” là ranh giới giữa:', o: ['Phồn thể và giản thể', 'Cổ văn tự (còn tượng hình) và kim văn tự (nét thẳng)', 'Chữ Hán và chữ Nôm', 'Hành thư và thảo thư'], a: 1, why: 'Từ triện sang lệ, chữ mất dần tính tượng hình; vì thế tìm nguồn gốc chữ phải nhìn chữ trước lệ biến.' },
    { t: 'mcq', q: 'Thể chữ chuẩn để in và viết hiện nay là:', o: ['Tiểu triện', 'Lệ thư', 'Khải thư', 'Thảo thư'], a: 2, why: 'Khải thư (chân thư) chín muồi đời Đường, là chữ chân phương mẫu mực đến nay.' },
    { t: 'mcq', ch: '灬', q: 'Bốn chấm 灬 trong chữ 馬 (ngựa) là gì?', o: ['Bộ hoả (lửa)', 'Bốn chân ngựa, biến đổi sau lệ biến', 'Dấu chỉ số nhiều', 'Bộ thuỷ'], a: 1, why: 'Trong chữ cổ, đó là chân ngựa; sau lệ biến thành 灬, trông giống bộ hoả. Tương tự đuôi cá trong 魚.' },
    { t: 'mcq', ch: '后', q: 'Trong một bản giản thể, gặp chữ 后. Bản phồn thể có thể là:', o: ['Chỉ có 后 (hoàng hậu)', '后 (hoàng hậu) hoặc 後 (sau)', 'Chỉ có 後', '候 (chờ)'], a: 1, why: 'Giản hoá đồng âm gộp hai chữ: đây là bẫy “một giản – nhiều phồn”.' },
    { t: 'mcq', q: 'Khoa thi đầu tiên ở Việt Nam và khoa thi cuối cùng diễn ra năm nào?', o: ['1070 và 1945', '1075 và 1919', '1010 và 1884', '1076 và 1858'], a: 1, why: '1075: khoa Minh kinh bác học thời Lý Nhân Tông; 1919: khoa thi Hội cuối cùng ở Huế.' },
    { t: 'mcq', ch: '易', q: 'Chữ 易 trong 易之以書契 đọc là gì?', o: ['dị — dễ', 'dịch — thay đổi', 'dịch — Kinh Dịch (tên sách)', 'dị — khác'], a: 1, why: 'Đây là động từ “thay đổi”: thay (việc thắt nút) bằng chữ viết.' },
    { t: 'tr', src: '上古結繩而治，後世聖人易之以書契。', rd: 'Thượng cổ kết thằng nhi trị, hậu thế thánh nhân dịch chi dĩ thư khế.', a: 'Thời thượng cổ thắt nút dây mà trị việc, đời sau thánh nhân thay nó bằng chữ khắc.', why: '結繩: thắt nút dây; 易: thay; 之: nó (việc thắt nút); 以: bằng; 書契: chữ khắc.' },
    { t: 'tr', src: '車同軌，書同文字。', rd: 'Xa đồng quỹ, thư đồng văn tự.', a: 'Xe cùng một cỡ trục, chữ viết cùng một kiểu chữ.', why: '同: cùng (hình dung từ làm vị ngữ); 軌: cỡ trục xe; 書: chữ viết; 文字: kiểu chữ.' }
  ],
  socra: ['Vì sao chữ Hán có thể được đọc khác nhau ở mỗi nước mà vẫn hiểu chung một nghĩa? Chữ Quốc ngữ có làm được vậy không?', 'Lệ biến ảnh hưởng thế nào đến việc tìm hiểu nguồn gốc một chữ?', 'Bạn thử kể một trường hợp đọc bản giản thể có thể gây hiểu sai nghĩa văn cổ.'],
  feynman: 'Kể lại cho một người bạn hành trình của chữ Hán từ giáp cốt văn đến khải thư trong 6–8 câu, và giải thích vì sao học Hán Nôm phải dùng phồn thể.',
  essay: 'Tìm một văn bản Hán Nôm ở nơi bạn sống hoặc từng đến (hoành phi, câu đối, văn bia ở đình, chùa, Văn Miếu). Chụp ảnh, chép lại các chữ bạn nhận ra, và ghi những chữ chưa biết để tra ở bài 4.',
  exam: {
    points: ['Chữ Hán: chữ ghi ý – âm, mỗi chữ thống nhất hình – âm – nghĩa; từng là văn tự chung Đông Á', 'Số lượng: Thuyết văn 9.353 chữ; Khang Hy ~47.000; thường dùng ~3.500', 'Nguồn gốc: truyền thuyết Thương Hiệt, kết thằng → thư khế; giáp cốt văn (Thương, phát hiện 1899)', 'Thể chữ: giáp cốt → kim văn → đại triện → tiểu triện (Tần, thư đồng văn) → lệ → khải; hành, thảo', 'Lệ biến: ranh giới cổ văn tự / kim văn tự; 灬 trong 馬, 魚 không phải lửa', 'Phồn thể / giản thể (1956); bẫy một giản nhiều phồn (后/後, 发/發/髮, 干/乾/幹)', 'Chữ Hán ở VN: Bắc thuộc, Sĩ Nhiếp; Văn Miếu 1070, khoa thi 1075, Quốc Tử Giám 1076, khoa cuối 1919'],
    qs: ['Nếu chữ Hán là “khó”, vì sao nó tồn tại lâu hơn hầu hết mọi hệ chữ khác trên thế giới?', 'Việc thay chữ Hán bằng chữ Quốc ngữ đem lại gì và làm mất gì?']
  },
  readings: ['Giáo trình của lớp: phần Khái quát về chữ Hán', 'Xem ảnh giáp cốt văn và đỉnh Mao Công (tìm trên các trang bảo tàng) để thấy hình chữ cổ', 'Tìm hiểu về Văn Miếu – Quốc Tử Giám và 82 bia tiến sĩ']
};

const HV_LUCTHU1 = {
  id: 'hv-lucthu1', kind: 'lang', short: 'Lục thư I', title: 'Văn và tự · Lục thư (I): tượng hình, chỉ sự, hội ý', sub: 'Sáu phép cấu tạo chữ theo Hứa Thận; ba phép đầu tạo nên những chữ gốc — và cuộc tranh luận quanh chữ 武', who: 'Phần I · Chữ Hán',
  goals: ['Trình bày nguồn gốc khái niệm lục thư (Chu lễ, Ban Cố, Hứa Thận) và thuyết “tứ thể nhị dụng”', 'Định nghĩa và nhận diện chữ tượng hình, chỉ sự, hội ý, kèm ví dụ', 'Liên hệ văn / tự với lục thư', 'Phân biệt chiết tự khoa học với chiết tự dân gian'],
  q: 'Chữ 休 vẽ một người tựa vào gốc cây — “nghỉ ngơi”. Chữ 明 ghép mặt trời và mặt trăng — “sáng”. Nếu chữ Hán đều “đọc” được như tranh thế này thì học dễ biết bao. Vậy vì sao chỉ một phần nhỏ chữ Hán là như vậy?',
  context: '<p>Lục thư (六書 — sáu phép làm chữ) là khung lý thuyết truyền thống để giải thích cấu tạo chữ Hán, và là phần gần như chắc chắn có trong mọi đề thi Hán Nôm. Bài này học ba phép đầu — <b>tượng hình, chỉ sự, hội ý</b> — những phép tạo ra các chữ “gốc”. Bài sau học ba phép còn lại — <b>hình thanh, chuyển chú, giả tá</b> — những phép giúp chữ Hán sinh sôi thành hàng vạn chữ.</p>',
  lecture: [
    { h: 'Lục thư: tên gọi, nguồn gốc và cách hiểu', html: `<p>Tên “lục thư” xuất hiện sớm nhất trong <i>Chu lễ</i>: quan Bảo thị dạy con em quý tộc “lục nghệ”, trong đó có “lục thư” — nhưng không nói sáu phép ấy là gì. Đến đời Hán, ba học giả đưa ra danh mục cụ thể, với tên gọi và thứ tự hơi khác nhau:</p>
<ul><li><b>Ban Cố</b> (Hán thư · Nghệ văn chí): tượng hình, tượng sự, tượng ý, tượng thanh, chuyển chú, giả tá.</li>
<li><b>Trịnh Chúng</b>: tượng hình, hội ý, chuyển chú, xứ sự, giả tá, hài thanh.</li>
<li><b>Hứa Thận</b> (Thuyết văn giải tự tự, năm 100): chỉ sự, tượng hình, hình thanh, hội ý, chuyển chú, giả tá — kèm <b>định nghĩa và ví dụ</b> cho từng phép.</li></ul>
<p>Ngày nay người ta thường dùng <b>tên gọi của Hứa Thận theo thứ tự của Ban Cố</b>: tượng hình, chỉ sự, hội ý, hình thanh, chuyển chú, giả tá.</p>
<p>Đến đời Thanh, Đái Chấn đưa ra thuyết <b>“tứ thể nhị dụng”</b> (bốn thể, hai dụng): tượng hình, chỉ sự, hội ý, hình thanh là bốn cách <b>tạo chữ</b>; chuyển chú và giả tá là hai cách <b>dùng chữ</b> (không tạo ra chữ mới, mà dùng chữ có sẵn theo cách khác). Cách hiểu này được nhiều giáo trình hiện nay chấp nhận.</p>
<p><b>Liên hệ với văn / tự</b> (bài 6): chữ tượng hình và chỉ sự phần lớn là <b>văn</b> (chữ đơn thể, một khối); chữ hội ý và hình thanh là <b>tự</b> (chữ hợp thể, ghép từ các văn).</p>` },
    { h: 'Tượng hình 象形: vẽ hình sự vật', html: `<p>Hứa Thận: “Tượng hình là vẽ thành hình vật, theo đường nét của vật mà uốn lượn; 日, 月 là như vậy.” Tức là <b>mô phỏng hình dáng</b> sự vật cụ thể.</p>
<table class="ac-tbl"><tr><th>Chữ</th><th>Hình gốc (theo chữ cổ)</th></tr>
<tr><td>日 nhật</td><td>vòng tròn có chấm ở giữa — mặt trời</td></tr>
<tr><td>月 nguyệt</td><td>vầng trăng khuyết</td></tr>
<tr><td>山 sơn</td><td>ba đỉnh núi</td></tr>
<tr><td>水 thuỷ</td><td>dòng nước chảy, hai bên là gợn sóng</td></tr>
<tr><td>木 mộc</td><td>cái cây có cành và rễ</td></tr>
<tr><td>人 nhân</td><td>người đứng nghiêng, thấy tay và chân</td></tr>
<tr><td>目 mục</td><td>con mắt (vốn nằm ngang, sau dựng đứng)</td></tr>
<tr><td>馬 mã</td><td>con ngựa có bờm, bốn chân (灬) và đuôi</td></tr>
<tr><td>魚 ngư</td><td>con cá có đầu, vảy, đuôi (灬)</td></tr>
<tr><td>門 môn</td><td>cánh cổng hai cánh</td></tr>
<tr><td>雨 vũ</td><td>mây và những hạt mưa rơi</td></tr></table>
<p><b>Giới hạn</b>: chỉ vẽ được những <b>vật cụ thể, nhìn thấy được</b>. Những khái niệm trừu tượng (trên, dưới, yêu, ghét, tốt, xấu) không vẽ được. Vì vậy chữ tượng hình chỉ chiếm một phần rất nhỏ — theo thống kê thường được dẫn, khoảng 364 trong 9.353 chữ của Thuyết văn. Nhưng chúng là <b>vật liệu gốc</b> để ghép nên các chữ khác.</p>` },
    { h: 'Chỉ sự 指事: dùng ký hiệu chỉ ra ý', html: `<p>Hứa Thận: “Chỉ sự là nhìn thì nhận ra, xét thì thấy được ý; 上, 下 là như vậy.” Tức là dùng <b>ký hiệu</b> (vạch, chấm) để biểu thị một ý trừu tượng. Có hai kiểu:</p>
<ol><li><b>Ký hiệu thuần tuý</b>: 一, 二, 三 (số vạch); 上 thượng (một vạch ngắn ở <i>trên</i> một vạch dài), 下 hạ (vạch ngắn ở <i>dưới</i>).</li>
<li><b>Thêm ký hiệu vào chữ tượng hình</b> để chỉ vào một bộ phận:
<ul><li>本 bản: 木 + vạch ở <b>gốc</b> → gốc cây.</li><li>末 mạt: 木 + vạch ở <b>ngọn</b> → ngọn cây.</li><li>刃 nhận: 刀 (dao) + một chấm ở <b>lưỡi</b> → lưỡi dao.</li><li>朱 chu: 木 + vạch ở <b>thân</b> → lõi cây màu đỏ → màu đỏ.</li><li>甘 cam: 口 (miệng) + vạch bên trong → miệng ngậm vật ngon → ngọt.</li><li>亦 diệc: 大 (người dang tay) + hai chấm ở <b>nách</b> → nách (sau bị mượn làm phó từ “cũng”, nên phải tạo chữ 腋 cho nghĩa “nách”).</li></ul></li></ol>
<p>Chữ chỉ sự rất ít (khoảng 125 chữ trong Thuyết văn). Điểm khác với tượng hình: tượng hình vẽ <b>vật</b>, chỉ sự chỉ ra <b>một điểm, một vị trí, một quan hệ</b>.</p>` },
    { h: 'Hội ý 會意: ghép nghĩa để ra nghĩa mới', html: `<p>Hứa Thận: “Hội ý là ghép các loại lại, hợp nghĩa của chúng, để thấy được ý chỉ; 武, 信 là như vậy.” Tức là <b>ghép hai hay nhiều chữ có sẵn</b>, nghĩa của chữ mới do nghĩa các thành phần gợi ra.</p>
<p><b>Ghép các chữ giống nhau</b>:</p>
<ul><li>林 lâm (2 cây → rừng), 森 sâm (3 cây → rừng rậm, um tùm).</li><li>從 tòng — chữ gốc 从: hai người, người sau theo người trước → theo.</li><li>眾 chúng — gốc là ba người → đông người.</li></ul>
<p><b>Ghép các chữ khác nhau</b>:</p>
<ul><li>明 minh = 日 + 月 → sáng.</li><li>休 hưu = 人 + 木 → người tựa gốc cây → nghỉ.</li><li>好 hảo = 女 + 子 → người mẹ bế con → tốt, đẹp.</li><li>信 tín = 人 + 言 → lời của người (phải giữ) → tin.</li><li>男 nam = 田 + 力 → sức lực ở ruộng → đàn ông.</li><li>安 an = 宀 (mái nhà) + 女 → người phụ nữ ở trong nhà → yên.</li><li>鳴 minh = 口 + 鳥 → chim kêu.</li><li>杲 cảo (mặt trời trên ngọn cây → sáng rõ) đối với 杳 yểu (mặt trời dưới gốc cây → tối mịt).</li><li>解 giải = 角 + 刀 + 牛 → mổ trâu (nhớ bài 8).</li></ul>
<p>Hội ý giải quyết được vấn đề của tượng hình: biểu thị được hành động và khái niệm trừu tượng. Nhưng nó vẫn có giới hạn: không phải ý nào cũng ghép được bằng hình ảnh, và người đọc dễ hiểu theo nhiều cách. Hội ý chiếm khoảng 1.167 chữ trong Thuyết văn (theo thống kê thường dẫn).</p>` },
    { h: 'Chữ 武: “ngừng giáo là võ”?', html: `<p>Hứa Thận chọn 武 làm ví dụ cho hội ý, dựa vào một câu trong <i>Tả truyện</i>: Sở Trang vương nói <span class="han">夫文，止戈為武</span> — “Xét về chữ, ngừng (止) cây giáo (戈) là võ (武).” Ý nghĩa đẹp: võ thật sự là để chấm dứt chiến tranh. Cách giải thích này được truyền tụng hai nghìn năm.</p>
<p>Nhưng nghiên cứu giáp cốt văn và kim văn cho thấy: chữ 止 trong chữ cổ là hình <b>bàn chân</b> (nghĩa gốc của 止 là “chân”, về sau mới có nghĩa “dừng”). Vậy 武 = bàn chân + cây giáo → <b>vác giáo mà đi</b>, tức là hành quân, đánh trận — một nghĩa hoàn toàn ngược với “ngừng giáo”. Nhiều nhà văn tự học hiện đại nghiêng về cách giải thích này.</p>
<p><b>Bài học phương pháp</b>: (1) Hứa Thận vĩ đại nhưng không phải lúc nào cũng đúng — ông không được thấy giáp cốt văn (phát hiện năm 1899). (2) Phân tích cấu tạo chữ phải dựa vào <b>hình chữ cổ</b>, không chỉ hình chữ khải hiện nay. (3) Một cách giải thích có thể sai về văn tự học mà vẫn có giá trị về tư tưởng: “chỉ qua vi vũ” là một quan niệm đạo đức về chiến tranh, đáng nhớ theo nghĩa đó.</p>` },
    { h: 'Chiết tự khoa học và chiết tự dân gian', html: `<p>Người Việt có truyền thống <b>chiết tự</b> (tách chữ) rất phong phú — trong câu đố, câu đối, thơ, bói toán: “Chữ 好 là gái với trai”, “Chữ 囚 người ở trong vòng — là tù”. Chiết tự là cách tuyệt vời để <b>nhớ chữ</b>.</p>
<p>Nhưng cần phân biệt:</p>
<ul><li><b>Chiết tự khoa học</b> (văn tự học): dựa trên hình chữ cổ và lục thư để tìm cấu tạo thật của chữ.</li>
<li><b>Chiết tự dân gian</b>: dựa trên hình chữ hiện nay để đặt ra câu chuyện dễ nhớ — có thể trùng hoặc không trùng với nguồn gốc thật.</li></ul>
<p>Ví dụ: chữ 忍 nhẫn thường được giải là “con dao (刃) đâm vào tim (心) mà vẫn chịu” — một câu chuyện rất hay để nhớ. Nhưng về văn tự học, 忍 là <b>chữ hình thanh</b>: 心 chỉ nghĩa (thuộc về lòng), 刃 (nhận) chỉ âm (nhận – nhẫn gần âm) — bài 3. Bạn hoàn toàn có thể dùng chiết tự dân gian để nhớ, miễn là khi làm bài phân tích cấu tạo thì dùng lục thư.</p>` }
  ],
  texts: [
    { title: 'Lục thư trong Chu lễ', src: 'Chu lễ · Địa quan · Bảo thị', lang: 'zh-TW',
      orig: '保氏掌諫王惡，而養國子以道，乃教之六藝：一曰五禮，二曰六樂，三曰五射，四曰五馭，五曰六書，六曰九數。',
      reading: 'Bảo thị chưởng gián vương ác, nhi dưỡng quốc tử dĩ đạo, nãi giáo chi lục nghệ: nhất viết ngũ lễ, nhị viết lục nhạc, tam viết ngũ xạ, tứ viết ngũ ngự, ngũ viết lục thư, lục viết cửu số.',
      vi: 'Quan Bảo thị coi việc can ngăn điều sai của vua, và nuôi dạy con em quý tộc bằng đạo; bèn dạy họ sáu nghề: một là năm lễ, hai là sáu nhạc, ba là năm phép bắn, bốn là năm phép đánh xe, năm là sáu phép chữ (lục thư), sáu là chín phép tính.',
      notes: [['保氏 Bảo thị', 'chức quan dạy dỗ con em quý tộc'], ['掌 chưởng', 'nắm, coi giữ'], ['諫 gián', 'can ngăn'], ['國子 quốc tử', 'con em các nhà quý tộc'], ['乃 nãi', 'bèn'], ['六藝 lục nghệ', 'sáu nghề: lễ, nhạc, xạ, ngự, thư, số'], ['曰 viết', 'hệ từ: là'], ['馭 ngự', 'đánh xe']],
      guide: ['Lục thư được xếp vào hệ thống giáo dục nào? Điều đó nói gì về vị trí của chữ viết?', 'Tìm cấu trúc lặp lại “一曰…，二曰…”. 曰 ở đây có chức năng gì (nhớ bài 11)?'],
      comment: '<p>Đây là lần đầu tiên tên “lục thư” xuất hiện — nằm trong <b>lục nghệ</b>, sáu môn học của con em quý tộc nhà Chu (cũng chính là lục nghệ mà Khổng Tử dạy — khoá Triết học Trung Quốc, bài 3). Chu lễ không giải thích lục thư là gì; việc giải thích là công của các học giả đời Hán. Lưu ý: <i>Chu lễ</i> có lẽ được biên soạn muộn (thời Chiến Quốc – Hán), nên đoạn này phản ánh quan niệm về giáo dục nhà Chu hơn là ghi chép trực tiếp.</p><p>Cấu trúc <b>一曰…二曰…</b> — “một là…, hai là…” — dùng <b>曰</b> như hệ từ “là”, rất hay gặp khi liệt kê.</p>' },
    { title: 'Định nghĩa ba phép đầu của Hứa Thận', src: 'Hứa Thận, Thuyết văn giải tự · Tự (trích)', lang: 'zh-TW',
      orig: '周禮八歲入小學，保氏教國子，先以六書。一曰指事。指事者，視而可識，察而見意，上下是也。二曰象形。象形者，畫成其物，隨體詰詘，日月是也。……四曰會意。會意者，比類合誼，以見指撝，武信是也。',
      reading: 'Chu lễ bát tuế nhập tiểu học, Bảo thị giáo quốc tử, tiên dĩ lục thư. Nhất viết chỉ sự. Chỉ sự giả, thị nhi khả thức, sát nhi kiến ý, thượng hạ thị dã. Nhị viết tượng hình. Tượng hình giả, hoạ thành kỳ vật, tuỳ thể cật khuất, nhật nguyệt thị dã. …… Tứ viết hội ý. Hội ý giả, tỉ loại hợp nghị, dĩ kiến chỉ huy, vũ tín thị dã.',
      vi: 'Theo lễ nhà Chu, tám tuổi vào tiểu học, quan Bảo thị dạy con em quý tộc, trước hết dạy lục thư. Một là chỉ sự. Chỉ sự là nhìn thì nhận ra, xét kỹ thì thấy ý; chữ 上, 下 là như vậy. Hai là tượng hình. Tượng hình là vẽ thành hình vật, theo đường nét của vật mà uốn lượn; chữ 日, 月 là như vậy. …… Bốn là hội ý. Hội ý là ghép các loại lại, hợp nghĩa của chúng, để thấy được ý chỉ; chữ 武, 信 là như vậy.',
      notes: [['小學 tiểu học', 'bậc học vỡ lòng (học chữ); về sau “tiểu học” còn là tên ngành văn tự – âm vận – huấn hỗ'], ['識 thức', 'nhận biết'], ['詰詘 cật khuất', 'uốn lượn, quanh co'], ['比類 tỉ loại', 'đặt các loại (chữ) cạnh nhau'], ['誼 nghị', '= 義: nghĩa'], ['指撝 chỉ huy', 'ý chỉ, ý hướng tới (撝 = 揮)'], ['是也 thị dã', '“là như vậy” — 是 là đại từ chỉ thị: (chữ) này']],
      guide: ['Mỗi định nghĩa có cấu trúc “… 者，…，… 是也”. Chia mỗi định nghĩa thành hai phần: định nghĩa và ví dụ.', 'Hứa Thận xếp chỉ sự trước tượng hình. Ban Cố xếp ngược lại. Thứ tự nào hợp lý hơn theo bạn?'],
      comment: '<p>Đây là <b>đoạn văn quan trọng nhất</b> của môn văn tự học chữ Hán: Hứa Thận định nghĩa mỗi phép bằng hai câu bốn chữ, rồi cho hai chữ làm ví dụ. Học thuộc mấy câu này (chỉ sự: “thị nhi khả thức, sát nhi kiến ý”; tượng hình: “hoạ thành kỳ vật, tuỳ thể cật khuất”; hội ý: “tỉ loại hợp nghị, dĩ kiến chỉ huy”) là có nền móng để trả lời mọi câu hỏi về lục thư.</p><p>Về ngữ pháp, cấu trúc <b>…者，…也</b> là câu phán đoán (bài 26); <b>上下是也</b> có 是 là <b>đại từ chỉ thị</b> (“chữ 上 下 là cái này”), đúng như bài 11 đã nói — thời Hán 是 vẫn thường là đại từ.</p>' },
    { title: '“Ngừng giáo là võ”', src: 'Tả truyện · Tuyên công năm thứ 12 (trích)', lang: 'zh-TW',
      orig: '夫文，止戈為武。……夫武，禁暴、戢兵、保大、定功、安民、和眾、豐財者也。',
      reading: 'Phù văn, chỉ qua vi vũ. …… Phù vũ, cấm bạo, tập binh, bảo đại, định công, an dân, hoà chúng, phong tài giả dã.',
      vi: 'Xét về chữ, ngừng giáo là võ. …… Võ là để ngăn bạo tàn, cất binh khí, giữ nước lớn, định công nghiệp, yên dân, hoà hợp mọi người, làm giàu của cải vậy.',
      notes: [['夫 phù', 'trợ từ đầu câu, nêu đề tài: “xét…, phàm…”'], ['文 văn', 'chữ (văn tự)'], ['止 chỉ', 'dừng; nghĩa gốc trong chữ cổ: bàn chân'], ['戈 qua', 'cây giáo (binh khí)'], ['為 vi', 'hệ từ: là'], ['戢 tập', 'cất giấu (binh khí)'], ['者也 giả dã', 'cuối câu phán đoán: “là cái … vậy”']],
      guide: ['Theo Sở Trang vương, mục đích của “võ” là gì? Đó là một định nghĩa văn tự học hay một quan niệm đạo đức?', 'Nếu 止 vốn là “bàn chân”, chữ 武 có nghĩa gốc là gì?'],
      comment: '<p>Sau khi đại thắng quân Tấn, có người khuyên Sở Trang vương đắp gò xác quân địch để khoe võ công. Nhà vua từ chối, nói rằng chữ “võ” là “ngừng giáo”, và liệt kê bảy đức của võ (ngăn bạo, cất binh, giữ nước…). Đây là một trong những đoạn văn đẹp nhất của Tả truyện về đạo đức chiến tranh.</p><p>Về văn tự học, như bài giảng đã nói, nhiều khả năng 止 trong 武 là bàn chân (đi), và 武 vốn chỉ việc vác giáo hành quân. Hãy giữ cả hai trong đầu: một cách đọc về <b>nguồn gốc chữ</b>, một cách đọc về <b>ý nghĩa đạo đức</b> mà người xưa gửi vào chữ.</p>' }
  ],
  concepts: [
    { id: 'lucthu', han: '六書', term: 'Lục thư', def: 'Sáu phép cấu tạo / sử dụng chữ Hán: tượng hình, chỉ sự, hội ý, hình thanh, chuyển chú, giả tá. Tên có trong Chu lễ; Hứa Thận định nghĩa và cho ví dụ. Đái Chấn: “tứ thể nhị dụng” (4 cách tạo chữ, 2 cách dùng chữ).', ex: 'Tượng hình 日; chỉ sự 上; hội ý 明; hình thanh 江; chuyển chú 考 老; giả tá 令 長.', counter: 'Bộ thủ — cách xếp chữ trong từ điển, không phải phép cấu tạo chữ.', rel: ['tuonghinh', 'chisu', 'hoiy'], write: '六書' },
    { id: 'tuonghinh', han: '象形', term: 'Tượng hình', def: '“Hoạ thành kỳ vật, tuỳ thể cật khuất” — vẽ hình sự vật cụ thể. Chỉ biểu thị được vật nhìn thấy; số lượng ít nhưng là vật liệu gốc.', ex: '日, 月, 山, 水, 木, 人, 目, 馬, 魚, 門, 雨.', counter: 'Chỉ sự 上, 下 — dùng ký hiệu chỉ vị trí, không vẽ vật.', rel: ['lucthu', 'chisu'], write: '象' },
    { id: 'chisu', han: '指事', term: 'Chỉ sự', def: '“Thị nhi khả thức, sát nhi kiến ý” — dùng ký hiệu (vạch, chấm) biểu thị ý trừu tượng; thuần ký hiệu hoặc thêm ký hiệu vào chữ tượng hình.', ex: '一, 二, 三, 上, 下; 本, 末, 刃, 朱, 甘, 亦.', counter: 'Hội ý — ghép các chữ có nghĩa, không chỉ thêm ký hiệu.', rel: ['tuonghinh', 'hoiy'], write: '本末' },
    { id: 'hoiy', han: '會意', term: 'Hội ý', def: '“Tỉ loại hợp nghị, dĩ kiến chỉ huy” — ghép hai hay nhiều chữ có sẵn, nghĩa chữ mới do nghĩa các thành phần gợi ra; ghép chữ giống nhau hoặc khác nhau.', ex: '林, 森, 從, 眾; 明, 休, 好, 信, 男, 安, 鳴, 解.', counter: 'Hình thanh 江 — một phần chỉ nghĩa (氵), một phần chỉ âm (工), không phải hai phần nghĩa ghép lại.', rel: ['chisu', 'chiettu'], write: '休' },
    { id: 'chiettu', han: '拆字', term: 'Chiết tự khoa học và dân gian', def: 'Chiết tự khoa học dựa vào hình chữ cổ và lục thư để tìm cấu tạo thật; chiết tự dân gian dựa vào hình chữ hiện nay để tạo câu chuyện dễ nhớ — có thể sai về nguồn gốc.', ex: '忍: dân gian “dao đâm tim”; khoa học: hình thanh (心 nghĩa + 刃 âm). 武: “ngừng giáo” (Tả truyện) hay “vác giáo đi” (giáp cốt).', counter: 'Phân tích dựa trên chữ trước lệ biến — đó là chiết tự khoa học.', rel: ['hoiy'], write: '忍' }
  ],
  drills: [
    { t: 'mcq', ch: '日', q: 'Chữ 日 thuộc phép nào?', o: ['Tượng hình', 'Chỉ sự', 'Hội ý', 'Hình thanh'], a: 0, why: 'Vẽ hình mặt trời — tượng hình (chính là ví dụ Hứa Thận dùng).' },
    { t: 'mcq', ch: '上', q: 'Chữ 上 thuộc phép nào?', o: ['Tượng hình', 'Chỉ sự', 'Hội ý', 'Giả tá'], a: 1, why: 'Vạch ngắn đặt trên vạch dài để chỉ vị trí “trên” — chỉ sự (ví dụ của Hứa Thận).' },
    { t: 'mcq', ch: '本', q: 'Chữ 本 (gốc cây) thuộc phép nào?', o: ['Tượng hình', 'Chỉ sự (木 + vạch chỉ vào gốc)', 'Hội ý', 'Hình thanh'], a: 1, why: 'Thêm một ký hiệu vào chữ tượng hình 木 để chỉ phần gốc → chỉ sự.' },
    { t: 'mcq', ch: '休', q: 'Chữ 休 (nghỉ) thuộc phép nào?', o: ['Tượng hình', 'Chỉ sự', 'Hội ý (人 + 木)', 'Hình thanh'], a: 2, why: 'Người tựa vào gốc cây: ghép nghĩa hai chữ → hội ý.' },
    { t: 'mcq', ch: '森', q: 'Chữ 森 (rừng rậm) thuộc kiểu nào?', o: ['Tượng hình', 'Hội ý ghép các chữ giống nhau', 'Hội ý ghép các chữ khác nhau', 'Chỉ sự'], a: 1, why: 'Ba chữ 木 ghép lại → hội ý (ghép chữ giống nhau).' },
    { t: 'mcq', q: 'Định nghĩa “hoạ thành kỳ vật, tuỳ thể cật khuất” là của phép nào?', o: ['Chỉ sự', 'Tượng hình', 'Hội ý', 'Hình thanh'], a: 1, why: 'Vẽ thành hình vật, theo đường nét của vật mà uốn lượn → tượng hình.' },
    { t: 'mcq', q: 'Thuyết “tứ thể nhị dụng” của Đái Chấn cho rằng hai phép nào là cách DÙNG chữ (không tạo chữ mới)?', o: ['Tượng hình và chỉ sự', 'Hội ý và hình thanh', 'Chuyển chú và giả tá', 'Chỉ sự và giả tá'], a: 2, why: 'Bốn thể (tạo chữ): tượng hình, chỉ sự, hội ý, hình thanh; hai dụng (dùng chữ): chuyển chú, giả tá.' },
    { t: 'mcq', ch: '武', q: 'Vì sao cách giải 武 = “ngừng giáo” (止戈為武) bị nhiều nhà văn tự học hiện đại nghi ngờ?', o: ['Vì chữ 武 là chữ hình thanh', 'Vì trong chữ cổ, 止 là hình bàn chân → 武 vốn là “vác giáo mà đi”', 'Vì 戈 không phải cây giáo', 'Vì Tả truyện là sách giả'], a: 1, why: 'Nghĩa gốc của 止 là bàn chân; nghĩa “dừng” là nghĩa về sau.' },
    { t: 'mcq', ch: '忍', q: 'Về văn tự học, chữ 忍 (nhẫn) được cấu tạo theo phép nào?', o: ['Hội ý: dao đâm vào tim', 'Hình thanh: 心 chỉ nghĩa, 刃 chỉ âm', 'Tượng hình', 'Chỉ sự'], a: 1, why: '“Dao đâm tim” là chiết tự dân gian (dễ nhớ). Theo lục thư, 刃 (nhận) là thanh bàng.' },
    { t: 'tr', src: '象形者，畫成其物，隨體詰詘，日月是也。', rd: 'Tượng hình giả, hoạ thành kỳ vật, tuỳ thể cật khuất, nhật nguyệt thị dã.', a: 'Tượng hình là vẽ thành hình vật, theo đường nét của vật mà uốn lượn; chữ 日, 月 là như vậy.', why: '者…也: câu phán đoán; 其物: vật ấy; 隨體: theo hình thể; 是: đại từ chỉ thị.' },
    { t: 'tr', src: '夫文，止戈為武。', rd: 'Phù văn, chỉ qua vi vũ.', a: 'Xét về chữ, ngừng giáo là võ.', why: '夫: trợ từ đầu câu nêu đề; 文: chữ; 止: dừng; 戈: giáo; 為: là.' }
  ],
  socra: ['Cho mình một chữ bạn biết mà bạn nghĩ là hội ý. Ta cùng kiểm tra xem nó là hội ý hay hình thanh nhé.', 'Tượng hình và chỉ sự khác nhau thế nào? Chữ 刃 thuộc loại nào và vì sao?', 'Vì sao Hứa Thận lại có thể giải sai một số chữ như 武?'],
  feynman: 'Giải thích ba phép tượng hình, chỉ sự, hội ý cho một bạn cùng lớp, mỗi phép một định nghĩa của Hứa Thận và hai ví dụ, rồi kể câu chuyện chữ 武.',
  essay: 'Chọn 10 chữ Hán bạn đã gặp trong khoá (không lặp với bài), phân loại theo tượng hình / chỉ sự / hội ý, mỗi chữ giải thích ngắn cấu tạo. Đánh dấu những chữ bạn không chắc để hỏi gia sư.',
  exam: {
    points: ['Lục thư: tên trong Chu lễ (lục nghệ); danh mục của Ban Cố, Trịnh Chúng, Hứa Thận; nay dùng tên Hứa Thận theo thứ tự Ban Cố', 'Tứ thể nhị dụng (Đái Chấn): tượng hình, chỉ sự, hội ý, hình thanh tạo chữ; chuyển chú, giả tá dùng chữ', 'Văn ≈ tượng hình, chỉ sự (đơn thể); tự ≈ hội ý, hình thanh (hợp thể)', 'Tượng hình: “hoạ thành kỳ vật, tuỳ thể cật khuất” — 日 月 山 水 木 人 馬 魚', 'Chỉ sự: “thị nhi khả thức, sát nhi kiến ý” — 上 下 一 二 三; 本 末 刃 朱 甘 亦', 'Hội ý: “tỉ loại hợp nghị, dĩ kiến chỉ huy” — 武 信; 林 森 從 眾; 明 休 好 男 安 鳴', '武: “chỉ qua vi vũ” (Tả truyện) vs “vác giáo đi” (giáp cốt: 止 = bàn chân)', 'Chiết tự dân gian (忍 dao đâm tim) ≠ chiết tự khoa học (忍 hình thanh)'],
    qs: ['Vì sao tượng hình, chỉ sự, hội ý không đủ để tạo ra hàng vạn chữ Hán?', 'Một cách giải chữ sai về văn tự học (như 止戈為武) có nên dạy nữa không?']
  },
  readings: ['Giáo trình của lớp: phần Cấu tạo chữ Hán — Lục thư', 'Thiều Chửu: phần giải thích chữ thường ghi “chữ tượng hình”, “chữ hội ý” — tra 休, 明, 本, 刃', 'Tìm hình giáp cốt văn của 日, 月, 馬, 魚, 武 trên các trang tra chữ cổ (ví dụ trang “Chinese Etymology”)']
};

const HV_LUCTHU2 = {
  id: 'hv-lucthu2', kind: 'lang', short: 'Lục thư II', title: 'Lục thư (II): hình thanh, chuyển chú, giả tá', sub: 'Hình bàng và thanh bàng, sáu kiểu vị trí, họ chữ cùng thanh bàng; chuyển chú; giả tá, thông giả và chữ cổ – kim', who: 'Phần I · Chữ Hán',
  goals: ['Định nghĩa chữ hình thanh, tách được hình bàng và thanh bàng, nhận ra sáu kiểu vị trí', 'Dùng thanh bàng để đoán âm Hán Việt — và biết giới hạn của mẹo này', 'Trình bày chuyển chú theo Hứa Thận và các cách hiểu', 'Phân biệt giả tá (vốn không có chữ) và thông giả (vốn có chữ); hiểu hiện tượng chữ cổ – kim (其 → 箕)', 'Tự phân tích cấu tạo một chữ Hán bất kỳ theo quy trình'],
  q: 'Chữ 清 (trong), 請 (mời), 情 (tình), 晴 (trời tạnh), 精 (tinh) — năm nghĩa khác hẳn nhau nhưng đều có chung bộ phận 青, và âm Hán Việt đều gần “thanh”. Đây là ngẫu nhiên hay là một hệ thống?',
  context: '<p>Bài trước cho thấy tượng hình, chỉ sự, hội ý không đủ để ghi hết mọi từ của ngôn ngữ. Bài này học ba phép giúp chữ Hán sinh sôi: <b>hình thanh</b> — phép tạo chữ năng sản nhất (hơn 80% chữ Hán), và hai phép <b>dùng chữ</b>: <b>chuyển chú</b>, <b>giả tá</b>. Nắm được hình thanh là có “chìa khoá” để đoán nghĩa và âm của rất nhiều chữ chưa gặp.</p>',
  lecture: [
    { h: 'Hình thanh 形聲: một phần chỉ nghĩa, một phần chỉ âm', html: `<p>Hứa Thận: “Hình thanh là lấy sự việc làm tên (loại), lấy âm gần mà ghép thành; 江, 河 là như vậy.” Chữ hình thanh gồm hai bộ phận:</p>
<ul><li><b>Hình bàng</b> 形旁 (còn gọi nghĩa phù, ý phù): cho biết chữ thuộc <b>loại nghĩa</b> nào.</li><li><b>Thanh bàng</b> 聲旁 (âm phù): cho biết chữ <b>đọc gần</b> với âm nào.</li></ul>
<p>Ví dụ của Hứa Thận: <b>江</b> giang = 氵(nước — chỉ nghĩa: sông) + 工 công (chỉ âm); <b>河</b> hà = 氵 + 可 khả (chỉ âm). Thêm: 銅 đồng = 金 (kim loại) + 同 đồng; 媽 = 女 + 馬; 晴 tình = 日 (trời nắng) + 青 thanh.</p>
<p><b>Vì sao hình thanh chiếm đa số?</b> Vì nó là cách tạo chữ <b>linh hoạt nhất</b>: muốn có chữ cho một từ mới, chỉ cần lấy một chữ đồng âm (hoặc gần âm) làm thanh bàng và thêm một bộ chỉ loại nghĩa. Theo thống kê thường được dẫn (của các học giả đời Thanh trên chữ trong Thuyết văn): tượng hình khoảng 364, chỉ sự 125, hội ý 1.167, hình thanh 7.697 — tức hơn 80%. Trong chữ Hán hiện đại, tỉ lệ hình thanh còn cao hơn.</p>` },
    { h: 'Sáu kiểu vị trí của hình bàng và thanh bàng', html: `<table class="ac-tbl"><tr><th>Kiểu</th><th>Ví dụ (hình bàng + thanh bàng)</th></tr>
<tr><td>Trái hình – phải thanh</td><td>江 (氵+ 工), 銅 (金 + 同), 情 (忄+ 青)</td></tr>
<tr><td>Phải hình – trái thanh</td><td>鴨 áp (鳥 + 甲 giáp), 頸 cảnh (頁 + 巠 kinh)</td></tr>
<tr><td>Trên hình – dưới thanh</td><td>草 thảo (艹 + 早 tảo), 簡 giản (竹 + 間 gian)</td></tr>
<tr><td>Dưới hình – trên thanh</td><td>婆 bà (女 + 波 ba), 想 tưởng (心 + 相 tương)</td></tr>
<tr><td>Ngoài hình – trong thanh</td><td>園 viên (囗 + 袁 viên), 固 cố (囗 + 古 cổ)</td></tr>
<tr><td>Trong hình – ngoài thanh</td><td>問 vấn (口 + 門 môn), 聞 văn (耳 + 門)</td></tr></table>
<p>Trường hợp cuối rất đáng nhớ: 問 (hỏi) và 聞 (nghe) đều có 門 bên ngoài nhưng 門 ở đây <b>chỉ âm</b> (môn – vấn – văn gần âm), còn phần chỉ nghĩa nằm bên trong (口 miệng → hỏi; 耳 tai → nghe). Nếu chiết tự kiểu hội ý (“miệng ở trong cửa”) thì sai.</p>` },
    { h: 'Thanh bàng và âm Hán Việt: mẹo hữu ích có giới hạn', html: `<p>Vì âm Hán Việt kế thừa hệ thống âm Hán đời Đường, nhiều chữ cùng thanh bàng vẫn có âm Hán Việt <b>gần nhau</b>. Các “họ chữ”:</p>
<ul><li><b>青</b> thanh → 清 thanh (trong), 請 thỉnh (mời), 情 tình, 晴 tình (tạnh), 精 tinh, 睛 tình (con ngươi).</li>
<li><b>工</b> công → 功 công, 攻 công, 江 giang, 紅 hồng, 空 không, 貢 cống.</li>
<li><b>可</b> khả → 河 hà, 何 hà, 歌 ca, 柯 kha.</li>
<li><b>門</b> môn → 問 vấn, 聞 văn, 悶 muộn.</li>
<li><b>包</b> bao → 抱 bão (ôm), 飽 bão (no), 胞 bào, 泡 bào (bọt), 砲 pháo.</li></ul>
<p>Mẹo “có bên đọc bên” giúp bạn <b>đoán âm</b> chữ chưa gặp, và <b>nhớ chữ theo họ</b>. Nhưng phải nhớ giới hạn: qua hàng nghìn năm, âm đã biến đổi, nên thanh bàng thường chỉ <b>gần</b> âm (江 giang ← 工 công), có khi rất xa (海 hải ← 每 mỗi; 特 đặc ← 寺 tự). Câu đùa của các cụ: “Hữu biên đọc biên, vô biên đọc trung” (có bên thì đọc bên, không có bên thì đọc giữa) — buồn cười chính vì nó hay sai. Khi không chắc, <b>tra từ điển</b>.</p>
<p><b>Hình bàng</b> thì đáng tin hơn để đoán <b>loại nghĩa</b>: thấy 氵 nghĩ đến nước, 木 → cây, 金 → kim loại, 言 → lời nói, 心/忄 → tâm lý, 手/扌 → động tác tay, 艹 → cây cỏ. Bài 4 sẽ học bộ thủ có hệ thống.</p>` },
    { h: 'Chuyển chú 轉注: phép khó nhất', html: `<p>Hứa Thận: “Chuyển chú là lập một loại chung một bộ, cùng ý thì nhận cho nhau; 考, 老 là như vậy.” 老 lão (già) và 考 khảo (già; về sau chỉ người cha đã mất) cùng bộ 老 (耂), nghĩa giống nhau, và Thuyết văn dùng chữ này để giải thích chữ kia (老: 考也; 考: 老也).</p>
<p>Vì Hứa Thận chỉ cho một ví dụ, chuyển chú trở thành phép <b>gây tranh cãi nhất</b>; có hàng chục cách hiểu. Ba hướng chính:</p>
<ul><li><b>Hình chuyển</b>: các chữ cùng bộ thủ, cùng nghĩa (như 考, 老).</li><li><b>Nghĩa chuyển</b>: các chữ cùng nghĩa, dùng để giải thích lẫn nhau (hỗ huấn), không cần cùng bộ.</li><li><b>Âm chuyển</b>: các chữ có quan hệ về âm và nghĩa, do một từ phân hoá thành nhiều chữ.</li></ul>
<p>Theo thuyết “tứ thể nhị dụng”, chuyển chú là một <b>cách dùng chữ</b> (dùng các chữ đồng nghĩa giải thích nhau), không phải cách tạo chữ mới. Với người học, chỉ cần nắm định nghĩa, ví dụ 考 老, và biết đây là vấn đề còn tranh luận.</p>` },
    { h: 'Giả tá 假借 và thông giả 通假', html: `<p>Hứa Thận: “Giả tá là vốn không có chữ, dựa theo âm mà gửi việc; 令, 長 là như vậy.” Tức là: một từ trong lời nói <b>chưa có chữ viết</b>, người ta <b>mượn một chữ đồng âm</b> (hoặc gần âm) có sẵn để ghi nó. 令 (vốn là “ra lệnh”) được mượn ghi “quan huyện lệnh”; 長 (vốn là “dài, lớn”) mượn ghi “huyện trưởng”.</p>
<p>Giả tá đặc biệt quan trọng với <b>hư từ</b> — những từ chỉ có nghĩa ngữ pháp, khó vẽ hình:</p>
<ul><li><b>其</b> kỳ: vốn vẽ cái nia (đồ sàng gạo) → mượn làm đại từ “của nó, ấy”.</li><li><b>而</b> nhi: vốn vẽ bộ râu → mượn làm liên từ “mà”.</li><li><b>我</b> ngã: vốn vẽ một loại binh khí có răng → mượn làm đại từ “ta”.</li><li><b>來</b> lai: vốn vẽ cây lúa mạch → mượn làm động từ “đến”.</li><li><b>自</b> tự: vốn vẽ cái mũi → mượn làm “tự mình”, “từ”.</li></ul>
<p><b>Chữ cổ – kim</b> (古今字): khi nghĩa mượn chiếm hẳn chữ cũ, người ta tạo <b>chữ mới</b> (thường là hình thanh) để ghi lại nghĩa gốc: 其 → <b>箕</b> (thêm 竹: cái nia); 自 → <b>鼻</b> (thêm 畀 tý làm thanh bàng: cái mũi); 然 (vốn là đốt cháy, bị mượn làm “như thế”) → <b>燃</b> (thêm 火); 莫 (vốn là mặt trời lặn trong cỏ, bị mượn làm “không ai”) → <b>暮</b> (thêm 日: chiều tối).</p>
<p><b>Thông giả</b> (通假) khác giả tá ở một điểm then chốt: từ đó <b>vốn đã có chữ riêng</b>, nhưng người viết lại dùng một chữ đồng âm khác thay vào (gần như “viết chữ khác cùng âm”). Ví dụ: 說 = 悅 (vui) trong 不亦說乎; 女 = 汝 (anh, ngươi) trong 誨女知之乎; 知 = 智 (trí tuệ) trong 知者不惑; 蚤 = 早 (sớm); 反 = 返 (trở về). Khi đọc, phải nhận ra và đọc theo chữ gốc (說 đọc “duyệt”, 女 đọc “nhữ”).</p>
<p>Tóm lại: <b>giả tá — bản vô kỳ tự</b> (vốn không có chữ); <b>thông giả — bản hữu kỳ tự</b> (vốn có chữ).</p>` },
    { h: 'Quy trình phân tích cấu tạo một chữ Hán', html: `<p>Tổng hợp hai bài lục thư thành một quy trình bạn có thể áp dụng cho mọi chữ:</p>
<ol><li><b>Chữ có tách được thành các bộ phận không?</b> Không tách được → thường là tượng hình hoặc chỉ sự (văn). Tách được → hội ý hoặc hình thanh (tự).</li>
<li><b>Nếu là chữ đơn thể</b>: nó vẽ một vật (tượng hình — 日, 馬) hay có ký hiệu chỉ vào một điểm (chỉ sự — 本, 刃)?</li>
<li><b>Nếu là chữ hợp thể</b>: có bộ phận nào <b>gợi âm</b> (âm Hán Việt của chữ gần âm của bộ phận đó) không? Có → hình thanh: xác định hình bàng (loại nghĩa) và thanh bàng (âm). Không → các bộ phận đều góp nghĩa → hội ý.</li>
<li><b>Kiểm tra bằng chữ cổ</b> nếu có thể (giáp cốt, kim văn, triện), đặc biệt với những chữ có vẻ “quá dễ giải thích”.</li>
<li><b>Xét cách dùng trong văn bản</b>: chữ đang dùng với nghĩa gốc, nghĩa mở rộng, hay nghĩa giả tá / thông giả?</li></ol>
<p>Ví dụ áp dụng: <b>情</b> → hợp thể (忄 + 青) → 青 thanh gần âm tình → hình thanh: 忄 chỉ nghĩa (tâm lý: tình cảm), 青 chỉ âm. <b>明</b> → hợp thể (日 + 月) → không bộ phận nào gần âm “minh” → hội ý. <b>刃</b> → đơn thể (刀 + chấm) → chấm chỉ vào lưỡi dao → chỉ sự.</p>` }
  ],
  texts: [
    { title: 'Định nghĩa ba phép còn lại của Hứa Thận', src: 'Hứa Thận, Thuyết văn giải tự · Tự (trích)', lang: 'zh-TW',
      orig: '三曰形聲。形聲者，以事為名，取譬相成，江河是也。……五曰轉注。轉注者，建類一首，同意相受，考老是也。六曰假借。假借者，本無其字，依聲託事，令長是也。',
      reading: 'Tam viết hình thanh. Hình thanh giả, dĩ sự vi danh, thủ thí tương thành, giang hà thị dã. …… Ngũ viết chuyển chú. Chuyển chú giả, kiến loại nhất thủ, đồng ý tương thụ, khảo lão thị dã. Lục viết giả tá. Giả tá giả, bản vô kỳ tự, y thanh thác sự, lệnh trưởng thị dã.',
      vi: 'Ba là hình thanh. Hình thanh là lấy sự việc (loại nghĩa) làm tên, lấy âm gần để ví mà ghép thành; chữ 江, 河 là như vậy. …… Năm là chuyển chú. Chuyển chú là lập loại chung một bộ đầu, cùng ý thì nhận (giải thích) cho nhau; chữ 考, 老 là như vậy. Sáu là giả tá. Giả tá là vốn không có chữ, dựa theo âm mà gửi việc vào; chữ 令, 長 là như vậy.',
      notes: [['以事為名 dĩ sự vi danh', 'lấy loại sự việc làm phần tên — tức hình bàng'], ['取譬相成 thủ thí tương thành', 'lấy (chữ có âm) gần để ví, ghép lại thành chữ — tức thanh bàng'], ['建類一首 kiến loại nhất thủ', 'lập một loại chung một bộ (đầu)'], ['同意相受 đồng ý tương thụ', 'cùng nghĩa thì nhận cho nhau'], ['本無其字 bản vô kỳ tự', 'vốn không có chữ ấy'], ['依聲託事 y thanh thác sự', 'dựa theo âm mà gửi việc (nghĩa) vào']],
      guide: ['Trong định nghĩa hình thanh, cụm nào ứng với hình bàng, cụm nào ứng với thanh bàng?', 'Câu “bản vô kỳ tự” giúp phân biệt giả tá với thông giả thế nào?'],
      comment: '<p>Cùng với đoạn ở bài 2, đây là trọn bộ định nghĩa lục thư của Hứa Thận. Ba câu then chốt nên thuộc: hình thanh — <b>“dĩ sự vi danh, thủ thí tương thành”</b>; chuyển chú — <b>“kiến loại nhất thủ, đồng ý tương thụ”</b>; giả tá — <b>“bản vô kỳ tự, y thanh thác sự”</b>.</p><p>Ví dụ giả tá của Hứa Thận (令, 長) thật ra bị nhiều người cho là gần với nghĩa dẫn thân hơn (lệnh → người ra lệnh; trưởng → người lớn đứng đầu). Các ví dụ như 其, 而, 我, 來 minh hoạ giả tá rõ hơn, vì nghĩa mượn hoàn toàn không liên quan đến nghĩa gốc.</p>' },
    { title: 'Ba chữ thông giả trong Luận ngữ', src: 'Luận ngữ 1.1, 2.17, 9.29 (trích)', lang: 'zh-TW',
      orig: '學而時習之，不亦說乎？\n……\n由！誨女知之乎！\n……\n知者不惑，仁者不憂，勇者不懼。',
      reading: 'Học nhi thời tập chi, bất diệc duyệt hồ?\n……\nDo! Hối nhữ tri chi hồ!\n……\nTrí giả bất hoặc, nhân giả bất ưu, dũng giả bất cụ.',
      vi: 'Học rồi thường xuyên luyện tập, chẳng cũng vui sao?\n……\nDo này! Ta dạy anh thế nào là biết nhé!\n……\nNgười trí không mê hoặc, người nhân không lo buồn, người dũng không sợ hãi.',
      notes: [['說 = 悅 duyệt', 'thông giả: vui (không đọc “thuyết”)'], ['女 = 汝 nhữ', 'thông giả: anh, ngươi (không đọc “nữ”)'], ['知 = 智 trí', 'thông giả: trí tuệ (không đọc “tri”)'], ['惑 hoặc', 'mê lầm'], ['憂 ưu', 'lo'], ['懼 cụ', 'sợ']],
      guide: ['Nếu đọc 說 là “thuyết”, 女 là “nữ”, 知 là “tri”, mỗi câu sẽ sai nghĩa thế nào?', 'Ba trường hợp này là giả tá hay thông giả? Vì sao?'],
      comment: '<p>Ba câu quen thuộc, ba chữ thông giả — và cả ba đều <b>đổi âm đọc</b> khi đọc đúng: 說 đọc <b>duyệt</b>, 女 đọc <b>nhữ</b>, 知 đọc <b>trí</b>. Đây là lý do các bản Luận ngữ có chú thích thường ghi “說 âm duyệt”, “女 âm nhữ”.</p><p>Chúng là <b>thông giả</b> chứ không phải giả tá, vì các từ “vui”, “ngươi”, “trí tuệ” <b>vốn đã có chữ riêng</b> (悅, 汝, 智) — người xưa dùng chữ đồng âm khác thay vào. Thói quen này phổ biến ở văn bản Tiên Tần, một phần vì lúc đó chữ viết chưa được chuẩn hoá chặt chẽ.</p>' },
    { title: 'Phân tích một câu: tìm chữ hình thanh', src: 'Đỗ Mục, Thanh minh (thơ Đường)', lang: 'zh-TW',
      orig: '清明時節雨紛紛，\n路上行人欲斷魂。',
      reading: 'Thanh minh thời tiết vũ phân phân,\nLộ thượng hành nhân dục đoạn hồn.',
      vi: 'Tiết Thanh minh mưa lất phất bay,\nNgười đi trên đường như muốn đứt ruột (buồn đến tan nát lòng).',
      notes: [['清 thanh', 'hình thanh: 氵(nước — trong) + 青 thanh'], ['時 thời', 'hình thanh: 日 (thời gian) + 寺 tự (âm, đã biến đổi nhiều)'], ['節 tiết', 'hình thanh: 竹 (đốt tre) + 即 tức'], ['紛紛 phân phân', 'điệp tự; 紛 hình thanh: 糸 (sợi tơ — rối) + 分 phân'], ['路 lộ', 'hình thanh: 足 (chân — đi) + 各 các'], ['魂 hồn', 'hình thanh: 鬼 (quỷ, hồn) + 云 vân']],
      guide: ['Câu thơ có bao nhiêu chữ hình thanh? Với mỗi chữ, hình bàng gợi loại nghĩa gì?', 'Chữ nào trong câu không phải hình thanh? (Gợi ý: 明, 雨, 上, 人.)'],
      comment: '<p>Mười bốn chữ, hơn một nửa là hình thanh — đúng với tỉ lệ thống kê. Để ý những thanh bàng vẫn giữ âm gần (清 ← 青, 紛 ← 分) và những thanh bàng đã biến âm xa (時 ← 寺, 路 ← 各): đó chính là giới hạn của mẹo “có bên đọc bên”.</p><p>Các chữ không phải hình thanh: <b>明</b> (hội ý), <b>雨</b> (tượng hình), <b>上</b> (chỉ sự), <b>人</b> (tượng hình) — một câu thơ là một bảo tàng nhỏ của lục thư. Bài thơ “Thanh minh” còn là ví dụ cho điệp tự (紛紛 — bài 7).</p>' }
  ],
  concepts: [
    { id: 'hinhthanh', han: '形聲', term: 'Hình thanh', def: '“Dĩ sự vi danh, thủ thí tương thành” — chữ gồm hình bàng (chỉ loại nghĩa) và thanh bàng (chỉ âm gần); phép tạo chữ năng sản nhất, hơn 80% chữ Hán.', ex: '江 (氵+ 工), 河 (氵+ 可), 銅 (金 + 同), 晴 (日 + 青).', counter: 'Hội ý 明 (日 + 月) — không bộ phận nào chỉ âm.', rel: ['vitri', 'giata'], write: '江河' },
    { id: 'vitri', han: '形旁 · 聲旁', term: 'Hình bàng, thanh bàng và sáu kiểu vị trí', def: 'Trái hình phải thanh (江), phải hình trái thanh (鴨), trên hình dưới thanh (草), dưới hình trên thanh (婆), ngoài hình trong thanh (園), trong hình ngoài thanh (問, 聞). Thanh bàng gợi âm Hán Việt nhưng có thể đã biến âm.', ex: 'Họ 青: 清, 請, 情, 晴, 精; họ 工: 江, 紅, 功, 空.', counter: '問 không phải “miệng trong cửa” (hội ý) — 門 là thanh bàng.', rel: ['hinhthanh'], write: '問聞' },
    { id: 'chuyenchu', han: '轉注', term: 'Chuyển chú', def: '“Kiến loại nhất thủ, đồng ý tương thụ” — các chữ cùng bộ, cùng nghĩa, giải thích cho nhau; phép gây tranh cãi nhất (hình chuyển, nghĩa chuyển, âm chuyển). Theo Đái Chấn là cách dùng chữ.', ex: '考 và 老 (cùng bộ 老, cùng nghĩa “già”).', counter: 'Hai chữ đồng nghĩa khác bộ như 死 và 崩 — không phải ví dụ chuyển chú kiểu Hứa Thận.', rel: ['giata'], write: '考老' },
    { id: 'giata', han: '假借', term: 'Giả tá', def: '“Bản vô kỳ tự, y thanh thác sự” — từ chưa có chữ, mượn chữ đồng âm có sẵn để ghi; rất phổ biến với hư từ. Khi nghĩa mượn chiếm chữ, tạo chữ mới cho nghĩa gốc (chữ cổ – kim).', ex: '其 (nia → đại từ; 箕 cho “cái nia”), 而 (râu → liên từ), 來 (lúa mạch → đến), 自 (mũi → tự; 鼻 cho “mũi”).', counter: 'Thông giả — từ vốn có chữ riêng nhưng dùng chữ khác cùng âm (說 = 悅).', rel: ['hinhthanh', 'thonggia'], write: '其' },
    { id: 'thonggia', han: '通假', term: 'Thông giả', def: 'Từ vốn đã có chữ riêng nhưng văn bản dùng chữ đồng âm khác thay vào (“bản hữu kỳ tự”); khi đọc phải nhận ra và đọc theo chữ gốc.', ex: '說 = 悅 (duyệt), 女 = 汝 (nhữ), 知 = 智 (trí), 蚤 = 早, 反 = 返.', counter: 'Giả tá — từ vốn không có chữ (bản vô kỳ tự).', rel: ['giata'], write: '說' }
  ],
  drills: [
    { t: 'mcq', ch: '江', q: 'Trong chữ 江, bộ phận nào là thanh bàng?', o: ['氵(nước)', '工 (công)', 'Cả hai', 'Không có thanh bàng'], a: 1, why: '氵 chỉ nghĩa (sông nước), 工 chỉ âm (công – giang gần âm).' },
    { t: 'mcq', ch: '問', q: 'Chữ 問 (hỏi) được cấu tạo thế nào?', o: ['Hội ý: miệng ở trong cửa', 'Hình thanh: 口 chỉ nghĩa (trong), 門 chỉ âm (ngoài)', 'Tượng hình', 'Chỉ sự'], a: 1, why: 'Kiểu “trong hình – ngoài thanh”: 門 (môn) gợi âm vấn; 口 (miệng) gợi nghĩa hỏi.' },
    { t: 'mcq', ch: '婆', q: 'Chữ 婆 (bà) thuộc kiểu vị trí nào?', o: ['Trái hình phải thanh', 'Trên thanh (波) – dưới hình (女)', 'Ngoài hình trong thanh', 'Trên hình dưới thanh'], a: 1, why: '女 (nữ) ở dưới chỉ nghĩa; 波 (ba) ở trên chỉ âm.' },
    { t: 'mcq', q: 'Chữ nào KHÔNG thuộc “họ” thanh bàng 青?', o: ['清 thanh', '請 thỉnh', '情 tình', '明 minh'], a: 3, why: '明 là hội ý (日 + 月), không có thanh bàng 青.' },
    { t: 'mcq', q: 'Ví dụ chuyển chú của Hứa Thận là:', o: ['江, 河', '考, 老', '令, 長', '武, 信'], a: 1, why: 'Hình thanh: 江 河; chuyển chú: 考 老; giả tá: 令 長; hội ý: 武 信.' },
    { t: 'mcq', ch: '其', q: 'Chữ 其 vốn vẽ cái nia, nay là đại từ “của nó, ấy”. Đây là phép:', o: ['Hình thanh', 'Giả tá', 'Thông giả', 'Chuyển chú'], a: 1, why: 'Đại từ “kỳ” vốn không có chữ, mượn chữ đồng âm 其 → giả tá. Sau đó tạo 箕 cho nghĩa “cái nia”.' },
    { t: 'mcq', ch: '說', q: '說 trong 不亦說乎 là hiện tượng gì, đọc thế nào?', o: ['Giả tá, đọc “thuyết”', 'Thông giả = 悅, đọc “duyệt”', 'Hình thanh, đọc “thuế”', 'Chuyển chú, đọc “thuyết”'], a: 1, why: 'Từ “vui” vốn có chữ 悅 → dùng 說 thay là thông giả; đọc theo chữ gốc: duyệt.' },
    { t: 'mcq', q: 'Điểm khác nhau cốt lõi giữa giả tá và thông giả là:', o: ['Giả tá đổi âm, thông giả không', 'Giả tá: từ vốn không có chữ; thông giả: từ vốn đã có chữ', 'Giả tá chỉ dùng cho danh từ', 'Không có gì khác'], a: 1, why: 'Giả tá — bản vô kỳ tự; thông giả — bản hữu kỳ tự.' },
    { t: 'mcq', ch: '鼻', q: 'Chữ 鼻 (mũi) được tạo ra vì:', o: ['Chữ 自 (vốn là mũi) bị mượn làm “tự, từ”, nên phải tạo chữ mới cho nghĩa gốc', 'Để thay chữ 口', 'Do giản hoá chữ', 'Là chữ thông giả của 自'], a: 0, why: 'Hiện tượng chữ cổ – kim: 自 → 鼻 (thêm 畀 làm thanh bàng).' },
    { t: 'tr', src: '假借者，本無其字，依聲託事，令長是也。', rd: 'Giả tá giả, bản vô kỳ tự, y thanh thác sự, lệnh trưởng thị dã.', a: 'Giả tá là vốn không có chữ, dựa theo âm mà gửi việc vào; chữ 令, 長 là như vậy.', why: '者…也: phán đoán; 本: vốn; 無其字: không có chữ ấy; 依聲: dựa theo âm; 託事: gửi việc.' },
    { t: 'tr', src: '知者不惑，仁者不憂，勇者不懼。', rd: 'Trí giả bất hoặc, nhân giả bất ưu, dũng giả bất cụ.', a: 'Người trí không mê hoặc, người nhân không lo buồn, người dũng không sợ hãi.', why: '知 = 智 (thông giả, đọc trí); 者: người; 不: không.' }
  ],
  socra: ['Cho mình một chữ bạn chưa biết nghĩa nhưng có bộ phận quen. Thử đoán nghĩa và âm qua hình bàng, thanh bàng rồi ta kiểm tra.', 'Vì sao 問 và 聞 không phải hội ý? Bạn dùng dấu hiệu nào để quyết định?', 'Giải thích sự khác nhau giữa giả tá và thông giả bằng một ví dụ của mỗi loại.'],
  feynman: 'Giải thích cho một bạn cùng lớp vì sao hình thanh chiếm hơn 80% chữ Hán, cách tách hình bàng – thanh bàng, và vì sao mẹo “có bên đọc bên” lúc đúng lúc sai.',
  essay: 'Chọn một câu thơ hoặc văn (khoảng 10–20 chữ) trong khoá. Phân tích cấu tạo từng chữ theo quy trình năm bước của bài: tượng hình, chỉ sự, hội ý hay hình thanh (nếu hình thanh, ghi rõ hình bàng, thanh bàng). Đánh dấu những chữ bạn không chắc.',
  exam: {
    points: ['Hình thanh: “dĩ sự vi danh, thủ thí tương thành” — 江 河; hình bàng (nghĩa) + thanh bàng (âm); > 80% (thống kê thường dẫn: 7.697 / 9.353)', 'Sáu kiểu vị trí: 江 / 鴨 / 草 / 婆 / 園 / 問 聞', 'Họ thanh bàng và âm Hán Việt (青 → 清 請 情 晴 精); mẹo có giới hạn vì biến âm (時 ← 寺)', 'Chuyển chú: “kiến loại nhất thủ, đồng ý tương thụ” — 考 老; nhiều cách hiểu', 'Giả tá: “bản vô kỳ tự, y thanh thác sự” — 令 長; 其 而 我 來 自', 'Chữ cổ – kim: 其 → 箕, 自 → 鼻, 然 → 燃, 莫 → 暮', 'Thông giả (bản hữu kỳ tự): 說 = 悅, 女 = 汝, 知 = 智, 蚤 = 早, 反 = 返', 'Quy trình phân tích cấu tạo chữ năm bước'],
    qs: ['Nếu thanh bàng chỉ gợi âm “gần”, làm sao người xưa vẫn dùng nó hiệu quả?', 'Hư từ phần lớn là giả tá. Điều đó giải thích gì về việc hư từ khó học?']
  },
  readings: ['Giáo trình của lớp: phần Hình thanh, Chuyển chú, Giả tá', 'Thiều Chửu: tra 江, 問, 聞, 箕, 鼻 để xem phần giải thích cấu tạo', 'Luyện: lấy 10 chữ có bộ 氵 và 10 chữ có bộ 忄, đoán nghĩa trước rồi tra']
};

const HV_BOTHU = {
  id: 'hv-botthu', kind: 'lang', short: 'Bộ thủ', title: 'Nét, bút thuận, bộ thủ và cách tra từ điển', sub: 'Tám nét của chữ 永, bảy quy tắc bút thuận, 214 bộ thủ và các bộ biến thể, bẫy “nhục nguyệt”, tra Thiều Chửu và Đào Duy Anh', who: 'Phần I · Chữ Hán',
  goals: ['Gọi tên các nét cơ bản và viết đúng bảy quy tắc bút thuận', 'Biết lịch sử hệ thống bộ thủ (540 bộ → 214 bộ) và nhận ra các bộ biến thể thường gặp', 'Phân biệt bộ thủ với hình bàng; nhận ra bẫy 月 = 肉 (nhục nguyệt)', 'Tra được chữ trong từ điển theo bộ thủ và số nét, theo âm, và bằng công cụ trực tuyến'],
  q: 'Gặp một chữ lạ trong văn bản, không biết đọc, không biết nghĩa — bạn bắt đầu từ đâu để tìm ra nó trong một cuốn từ điển có hàng vạn chữ?',
  context: '<p>Đây là bài <b>kỹ năng</b> thuần tuý, nhưng là kỹ năng bạn dùng mỗi ngày: viết chữ cho đúng (để nhớ lâu và viết đẹp), nhận ra bộ thủ (để đoán nghĩa, nhớ chữ), và tra từ điển (để tự học). Khoá này có sẵn công cụ tập viết theo thứ tự nét ở mỗi thẻ chữ — hãy dùng nó song song với bài.</p>',
  lecture: [
    { h: 'Các nét cơ bản: tám nét của chữ 永', html: `<p>Mọi chữ Hán khải thư được tạo bởi một số <b>nét</b> (筆畫) cơ bản. Truyền thống thư pháp dạy qua <b>“Vĩnh tự bát pháp”</b> (永字八法 — tám phép của chữ 永 vĩnh), vì chữ 永 chứa gần đủ các nét:</p>
<table class="ac-tbl"><tr><th>Tên Việt thường gọi</th><th>Tên trong bát pháp</th><th>Mô tả</th></tr>
<tr><td>Chấm 點</td><td>側 trắc</td><td>nét chấm (丶)</td></tr>
<tr><td>Ngang 橫</td><td>勒 lặc</td><td>nét ngang trái → phải (一)</td></tr>
<tr><td>Sổ 豎</td><td>努 nỗ</td><td>nét thẳng trên → dưới (丨)</td></tr>
<tr><td>Móc 鉤</td><td>趯 địch</td><td>nét hất ngược lên ở cuối nét sổ (亅)</td></tr>
<tr><td>Hất 提</td><td>策 sách</td><td>nét hất từ dưới trái lên phải</td></tr>
<tr><td>Phẩy dài 撇</td><td>掠 lược</td><td>nét kéo xiên từ phải trên xuống trái dưới (丿)</td></tr>
<tr><td>Phẩy ngắn (mổ)</td><td>啄 trác</td><td>nét phẩy ngắn, nhanh</td></tr>
<tr><td>Mác 捺</td><td>磔 trách</td><td>nét kéo xiên từ trái trên xuống phải dưới (㇏)</td></tr></table>
<p>Ngoài ra có các nét kết hợp (ngang gập, sổ gập, ngang móc…). Khi đếm số nét của một chữ, mỗi lần nhấc bút là một nét: 口 có 3 nét (sổ, ngang gập, ngang), không phải 4.</p>` },
    { h: 'Bảy quy tắc bút thuận', html: `<p><b>Bút thuận</b> (筆順) là thứ tự viết các nét. Viết đúng thứ tự giúp chữ cân đối, viết nhanh, và — quan trọng nhất với người học — <b>nhớ chữ lâu hơn</b> (tay nhớ cùng mắt). Bảy quy tắc cơ bản:</p>
<ol><li><b>Ngang trước, sổ sau</b>: 十 (ngang rồi sổ).</li>
<li><b>Phẩy trước, mác sau</b>: 人, 八.</li>
<li><b>Trên trước, dưới sau</b>: 三, 言.</li>
<li><b>Trái trước, phải sau</b>: 川, 林.</li>
<li><b>Ngoài trước, trong sau</b>: 月, 同, 問.</li>
<li><b>Vào nhà rồi đóng cửa</b> (ngoài – trong – đóng đáy): 日, 回, 國 — viết khung ba mặt, viết phần trong, cuối cùng mới đóng nét ngang dưới.</li>
<li><b>Giữa trước, hai bên sau</b>: 小, 水, 承.</li></ol>
<p>Có một số ngoại lệ (火, 必, 九…). Cách tốt nhất là xem hoạt hình thứ tự nét — bấm nút <b>✍️ Tập viết</b> ở thẻ chữ của bài này để xem và tự viết.</p>` },
    { h: 'Bộ thủ: lịch sử và 214 bộ', html: `<p><b>Bộ thủ</b> (部首) là bộ phận chung dùng để <b>xếp chữ</b> trong từ điển: các chữ có cùng bộ được xếp chung một nhóm. Lịch sử:</p>
<ul><li><b>Thuyết văn giải tự</b> (Hứa Thận, năm 100): lần đầu xếp chữ theo bộ, có <b>540 bộ</b>, dựa trên nguyên tắc văn tự học (chữ cùng hình bàng).</li>
<li><b>Tự vựng</b> (Mai Ưng Tộ, đời Minh, 1615): rút gọn còn <b>214 bộ</b>, xếp theo số nét, thuận tiện để tra.</li>
<li><b>Khang Hy tự điển</b> (1716): giữ hệ thống 214 bộ — và từ đó 214 bộ trở thành chuẩn cho mọi từ điển chữ phồn thể, kể cả <b>Hán Việt tự điển của Thiều Chửu</b>.</li></ul>
<p>214 bộ được xếp theo số nét từ <b>1 nét</b> (一, 丨, 丶, 丿, 乙, 亅) đến <b>17 nét</b> (龠). Không cần thuộc cả 214 bộ ngay; hãy học trước khoảng <b>50 bộ thường gặp nhất</b> (人, 口, 女, 子, 宀, 心, 手, 水, 火, 木, 日, 月, 土, 金, 言, 糸, 艸, 竹, 足, 辵, 門, 雨, 頁, 鳥…), rồi mở rộng dần.</p>
<p><b>Lưu ý</b>: từ điển chữ giản thể ở Trung Quốc hiện nay dùng hệ thống bộ thủ khác (khoảng 200 bộ, đã điều chỉnh). Với Hán Nôm, luôn dùng hệ 214 bộ.</p>` },
    { h: 'Các bộ biến thể và bẫy “nhục nguyệt”', html: `<p>Nhiều bộ khi đứng ở một vị trí trong chữ thì <b>đổi hình</b>. Phải nhận ra các biến thể này mới tra được từ điển:</p>
<table class="ac-tbl"><tr><th>Bộ gốc</th><th>Biến thể</th><th>Ví dụ</th></tr>
<tr><td>人 nhân</td><td>亻</td><td>休, 信, 仁</td></tr>
<tr><td>水 thuỷ</td><td>氵, 氺</td><td>江, 河, 泰</td></tr>
<tr><td>心 tâm</td><td>忄, ⺗</td><td>情, 性; 恭</td></tr>
<tr><td>手 thủ</td><td>扌</td><td>打, 撫, 持</td></tr>
<tr><td>艸 thảo</td><td>艹</td><td>草, 花, 茶</td></tr>
<tr><td>刀 đao</td><td>刂</td><td>刊, 別, 利</td></tr>
<tr><td>火 hoả</td><td>灬</td><td>熱, 然, 照</td></tr>
<tr><td>犬 khuyển</td><td>犭</td><td>狗, 獅, 猛</td></tr>
<tr><td>示 thị</td><td>礻</td><td>神, 祖, 福</td></tr>
<tr><td>衣 y</td><td>衤</td><td>被, 補</td></tr>
<tr><td>玉 ngọc</td><td>王 (bên trái)</td><td>玲, 瓏, 理</td></tr>
<tr><td>辵 sước</td><td>辶</td><td>遠, 道, 通</td></tr>
<tr><td>攴 phộc</td><td>攵</td><td>教, 政, 敗</td></tr>
<tr><td>邑 ấp</td><td>阝 (bên <b>phải</b>)</td><td>郡, 都, 鄉</td></tr>
<tr><td>阜 phụ</td><td>阝 (bên <b>trái</b>)</td><td>陽, 陰, 院</td></tr>
<tr><td>肉 nhục</td><td>月 (nhục nguyệt)</td><td>肝, 胸, 腦, 脈</td></tr></table>
<p><b>Hai bẫy lớn</b>:</p>
<ul><li><b>阝</b> bên phải là bộ <b>ấp</b> (邑 — thành ấp, địa danh), bên trái là bộ <b>phụ</b> (阜 — gò đất, đồi núi). Cùng hình, khác bộ.</li>
<li><b>月</b> trong các chữ chỉ bộ phận cơ thể (肝 gan, 胸 ngực, 腦 não, 腹 bụng, 脈 mạch) <b>không phải mặt trăng</b> mà là biến thể của 肉 (thịt) — gọi là “nhục nguyệt”. Trong từ điển 214 bộ, các chữ này xếp ở bộ 肉 (6 nét), không ở bộ 月 (4 nét).</li></ul>` },
    { h: 'Bộ thủ và hình bàng: khi nào trùng, khi nào không', html: `<p>Thường thì bộ thủ trùng với <b>hình bàng</b> (bộ phận chỉ nghĩa) của chữ hình thanh: 江 thuộc bộ 水, 銅 thuộc bộ 金, 情 thuộc bộ 心. Vì thế bộ thủ giúp <b>đoán loại nghĩa</b>.</p>
<p>Nhưng bộ thủ là công cụ <b>xếp chữ để tra</b>, không phải phân tích văn tự học, nên có nhiều trường hợp không trùng:</p>
<ul><li>問 (hỏi) thuộc bộ <b>口</b> — đúng với hình bàng. Nhưng 聞 (nghe) thuộc bộ <b>耳</b>, dù 門 bao ngoài. Người mới học hay tra nhầm ở bộ 門.</li>
<li>Một số chữ được xếp vào bộ một cách quy ước, khó đoán: 也 thuộc bộ 乙, 為 (爲) thuộc bộ 爪, 年 thuộc bộ 干, 事 thuộc bộ 亅.</li>
<li>Chữ không có bộ phận rõ ràng thì bản thân nó là một bộ (日, 月, 木, 馬, 魚, 鳥).</li></ul>
<p>Mẹo khi không đoán được bộ: thử lần lượt bộ ở bên trái, bên trên, bên ngoài, rồi mới đến bên phải, bên dưới, bên trong. Nếu vẫn không thấy, dùng bảng “chữ khó tra” (nan kiểm tự) ở cuối từ điển, hoặc tra trực tuyến.</p>` },
    { h: 'Cách tra từ điển', html: `<p><b>Tra theo bộ thủ</b> (cách cơ bản, dùng khi không biết âm):</p>
<ol><li>Xác định bộ thủ của chữ (ví dụ 撫 → bộ 手, viết 扌).</li><li>Tìm bộ trong bảng bộ thủ của từ điển (xếp theo số nét của bộ: 手 có 4 nét).</li><li>Đếm số nét <b>phần còn lại</b> (無 = 12 nét).</li><li>Trong bộ 手, tìm nhóm 12 nét, dò đến chữ 撫.</li></ol>
<p><b>Tra theo âm</b>: nếu đã biết âm Hán Việt, tra theo vần a, b, c (có bảng tra âm ở cuối từ điển Thiều Chửu).</p>
<p><b>Hai từ điển nền tảng của người học Hán Nôm ở Việt Nam</b>:</p>
<ul><li><b>Thiều Chửu, <i>Hán Việt tự điển</i></b> (1942): tra <b>chữ</b> (tự). Xếp theo 214 bộ; mỗi chữ có âm Hán Việt, các nghĩa (nhiều nghĩa cổ), ví dụ, nhiều khi có giải thích cấu tạo. Đây là cuốn nên có đầu tiên.</li>
<li><b>Đào Duy Anh, <i>Hán Việt từ điển</i></b> (1932): tra <b>từ</b> (từ ghép Hán Việt). Xếp theo âm Hán Việt; giải nghĩa từ ghép như 社稷, 干戈.</li></ul>
<p><b>Công cụ trực tuyến</b>: các trang tra Hán Việt (ví dụ hvdic.thivien.net có tra theo bộ, theo âm, và vẽ chữ bằng tay), các bàn phím vẽ chữ trên điện thoại. Rất tiện, nhưng hãy kiểm tra chữ phồn / giản và đối chiếu nghĩa với Thiều Chửu khi đọc văn cổ (nhớ bài 8 về nghĩa cổ – nghĩa mới).</p>` }
  ],
  texts: [
    { title: 'Phân tích bộ thủ: bảy chặng đời', src: 'Luận ngữ 2.4 · Vi chính (thực hành tra chữ)', lang: 'zh-TW',
      orig: '子曰：「吾十有五而志于學，三十而立，四十而不惑，五十而知天命，六十而耳順，七十而從心所欲，不踰矩。」',
      reading: 'Tử viết: “Ngô thập hữu ngũ nhi chí vu học, tam thập nhi lập, tứ thập nhi bất hoặc, ngũ thập nhi tri thiên mệnh, lục thập nhi nhĩ thuận, thất thập nhi tòng tâm sở dục, bất du củ.”',
      vi: 'Khổng Tử nói: “Ta mười lăm tuổi để chí vào việc học, ba mươi tuổi đứng vững, bốn mươi tuổi không nghi hoặc, năm mươi tuổi biết mệnh trời, sáu mươi tuổi nghe gì cũng thuận tai, bảy mươi tuổi theo điều lòng muốn mà không vượt khuôn phép.”',
      notes: [['吾 ngô', 'bộ 口 · 7 nét'], ['志 chí', 'bộ 心 · 7 nét (hình thanh: 心 + 之/士)'], ['學 học', 'bộ 子 · 16 nét'], ['惑 hoặc', 'bộ 心 · 12 nét (hình thanh: 心 + 或)'], ['知 tri', 'bộ 矢 · 8 nét'], ['命 mệnh', 'bộ 口 · 8 nét'], ['順 thuận', 'bộ 頁 · 12 nét'], ['從 tòng', 'bộ 彳 · 11 nét'], ['欲 dục', 'bộ 欠 · 11 nét'], ['踰 du', 'bộ 足 · 16 nét (hình thanh: 足 + 俞)'], ['矩 củ', 'bộ 矢 · 10 nét']],
      guide: ['Chọn ba chữ trong đoạn và tự tra trong Thiều Chửu (bản giấy hoặc trực tuyến) theo bộ và số nét. Bạn có tìm thấy đúng không?', 'Chữ nào trong đoạn có bộ thủ khó đoán? (Gợi ý: 知, 矩 đều thuộc bộ 矢 — mũi tên.)'],
      comment: '<p>Đoạn văn quen thuộc này giờ trở thành bài tập tra chữ. Một vài điểm đáng chú ý: <b>知</b> (biết) và <b>矩</b> (thước vuông) đều thuộc bộ <b>矢</b> (mũi tên) — không dễ đoán. <b>順</b> thuộc bộ 頁 (đầu), không phải bộ 川. <b>從</b> thuộc bộ 彳 (bước chân trái), bộ của nhiều chữ chỉ việc đi lại (行, 往, 得, 後).</p><p>Đếm nét: 學 có 16 nét — chữ phồn thể có nhiều nét, nhưng phần lớn ghép từ các bộ phận quen thuộc. Học chữ theo bộ phận nhanh hơn nhiều so với học từng nét.</p>' },
    { title: 'Phân tích bộ thủ: câu mở đầu Luận ngữ', src: 'Luận ngữ 1.1 · Học nhi (thực hành nhận bộ)', lang: 'zh-TW',
      orig: '學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知而不慍，不亦君子乎？',
      reading: 'Học nhi thời tập chi, bất diệc duyệt hồ? Hữu bằng tự viễn phương lai, bất diệc lạc hồ? Nhân bất tri nhi bất uấn, bất diệc quân tử hồ?',
      vi: 'Học rồi thường xuyên luyện tập, chẳng cũng vui sao? Có bạn từ phương xa đến, chẳng cũng vui sao? Người ta không biết đến mình mà mình không giận, chẳng cũng là quân tử sao?',
      notes: [['時 thời', 'bộ 日 (hình thanh: 日 + 寺)'], ['習 tập', 'bộ 羽 (lông chim — tập bay)'], ['說 duyệt', 'bộ 言'], ['朋 bằng', 'bộ 月 (ở đây là 月 thật, không phải nhục nguyệt)'], ['遠 viễn', 'bộ 辵 (viết 辶) — đi xa'], ['來 lai', 'bộ 人'], ['樂 lạc', 'bộ 木'], ['慍 uấn', 'bộ 心 (viết 忄)'], ['君 quân', 'bộ 口']],
      guide: ['Tìm hai chữ có bộ biến thể (辶, 忄). Bộ gốc của chúng là gì?', 'Bộ thủ của 習 (羽 — lông chim) giúp bạn nhớ nghĩa gốc “tập bay” thế nào?'],
      comment: '<p>Bộ thủ thường cho ta một “câu chuyện” để nhớ nghĩa: <b>習</b> có bộ 羽 (lông chim) — chim non tập bay; <b>遠</b> có bộ 辶 (bước đi) — xa; <b>慍</b> có bộ 忄 (lòng) — giận trong lòng. Nhưng cũng có chữ mà bộ thủ chỉ là quy ước xếp loại: <b>來</b> thuộc bộ 人, <b>樂</b> thuộc bộ 木 — không mấy liên quan đến nghĩa “đến”, “vui”.</p><p>Chữ <b>朋</b> thuộc bộ 月 thật (trong chữ cổ, 朋 vốn vẽ hai chuỗi vỏ sò — tiền cổ — chứ không phải hai mặt trăng). Một ví dụ cho thấy hình chữ khải hiện nay không phải lúc nào cũng phản ánh nguồn gốc.</p>' }
  ],
  concepts: [
    { id: 'buthuan', han: '筆畫 · 筆順', term: 'Nét và bút thuận', def: 'Nét cơ bản (Vĩnh tự bát pháp: chấm, ngang, sổ, móc, hất, phẩy dài, phẩy ngắn, mác). Bảy quy tắc bút thuận: ngang trước sổ sau; phẩy trước mác sau; trên trước dưới sau; trái trước phải sau; ngoài trước trong sau; vào nhà rồi đóng cửa; giữa trước hai bên sau.', ex: '十, 人, 三, 川, 月, 國, 小.', counter: 'Ngoại lệ như 火, 必 — phải xem hoạt hình thứ tự nét.', rel: ['bothu'], write: '永' },
    { id: 'bothu', han: '部首', term: 'Bộ thủ (214 bộ)', def: 'Bộ phận chung dùng để xếp chữ trong từ điển. Thuyết văn 540 bộ → Tự vựng (1615) 214 bộ → Khang Hy tự điển (1716) giữ 214 bộ; xếp theo số nét 1–17. Thiều Chửu dùng 214 bộ.', ex: '江, 河 thuộc bộ 水; 情, 性 thuộc bộ 心.', counter: 'Hệ bộ thủ của từ điển giản thể hiện đại (khoảng 200 bộ) — khác hệ 214 bộ.', rel: ['bienthe', 'buthuan'], write: '部首' },
    { id: 'bienthe', han: '亻 氵 忄 扌 艹', term: 'Bộ biến thể', def: 'Bộ đổi hình theo vị trí: 人→亻, 水→氵, 心→忄, 手→扌, 艸→艹, 刀→刂, 火→灬, 犬→犭, 示→礻, 衣→衤, 玉→王, 辵→辶, 攴→攵; 阝 phải = 邑 (ấp), 阝 trái = 阜 (phụ).', ex: '郡 (ấp, bên phải) đối với 陽 (phụ, bên trái).', counter: '月 trong 肝, 胸 — không phải bộ 月 mà là 肉 (nhục nguyệt).', rel: ['bothu', 'nhucnguyet'], write: '阝' },
    { id: 'nhucnguyet', han: '肉 → 月', term: 'Bẫy nhục nguyệt', def: '月 trong các chữ chỉ bộ phận cơ thể là biến thể của 肉 (thịt), xếp ở bộ 肉 (6 nét), không phải mặt trăng.', ex: '肝 gan, 胸 ngực, 腦 não, 腹 bụng, 脈 mạch.', counter: '月 thật trong 明, 期, 朝 (liên quan đến mặt trăng, thời gian).', rel: ['bienthe'], write: '肝' },
    { id: 'tradien', han: '查字典', term: 'Tra từ điển', def: 'Theo bộ thủ: xác định bộ → tìm bộ theo số nét → đếm nét phần còn lại → dò chữ. Theo âm: tra vần. Thiều Chửu (tra chữ, xếp theo bộ) và Đào Duy Anh (tra từ ghép, xếp theo âm); công cụ trực tuyến có vẽ chữ.', ex: '撫 → bộ 手 (4 nét) → phần còn lại 無 (12 nét).', counter: 'Từ điển Hán ngữ hiện đại — cho nghĩa mới, dùng giản thể; phải cẩn trọng khi đọc văn cổ.', rel: ['bothu'], write: '典' }
  ],
  drills: [
    { t: 'mcq', ch: '十', q: 'Viết chữ 十 theo đúng bút thuận:', o: ['Sổ trước, ngang sau', 'Ngang trước, sổ sau', 'Tuỳ ý', 'Hai nét cùng lúc'], a: 1, why: 'Quy tắc 1: ngang trước, sổ sau.' },
    { t: 'mcq', ch: '國', q: 'Nét cuối cùng khi viết chữ 國 là:', o: ['Nét sổ trái', 'Nét ngang đóng đáy khung 囗', 'Nét chấm', 'Nét mác'], a: 1, why: '“Vào nhà rồi đóng cửa”: viết khung ba mặt, viết phần trong, cuối cùng đóng nét ngang dưới.' },
    { t: 'mcq', ch: '小', q: 'Chữ 小 viết theo quy tắc nào?', o: ['Trái trước phải sau', 'Giữa trước, hai bên sau', 'Ngoài trước trong sau', 'Trên trước dưới sau'], a: 1, why: 'Nét sổ móc ở giữa viết trước, rồi hai chấm hai bên.' },
    { t: 'mcq', q: 'Hệ thống 214 bộ thủ được định ra trong sách nào, sau đó được Khang Hy tự điển kế thừa?', o: ['Thuyết văn giải tự', 'Tự vựng (Mai Ưng Tộ, đời Minh)', 'Hán thư Nghệ văn chí', 'Từ hải'], a: 1, why: 'Thuyết văn có 540 bộ; Tự vựng (1615) rút gọn còn 214; Khang Hy tự điển (1716) giữ 214.' },
    { t: 'mcq', ch: '陽', q: '阝 bên trái trong chữ 陽 là bộ nào?', o: ['邑 ấp', '阜 phụ (gò đất)', '耳 nhĩ', '卩 tiết'], a: 1, why: '阝 bên trái là 阜 (phụ); bên phải là 邑 (ấp).' },
    { t: 'mcq', ch: '胸', q: '月 trong chữ 胸 (ngực) là:', o: ['Bộ 月 (mặt trăng)', 'Biến thể của bộ 肉 (thịt) — nhục nguyệt', 'Thanh bàng', 'Bộ 舟'], a: 1, why: 'Các chữ chỉ bộ phận cơ thể có 月 là bộ 肉; tra ở bộ 肉 (6 nét).' },
    { t: 'mcq', ch: '聞', q: 'Chữ 聞 (nghe) thuộc bộ nào trong từ điển 214 bộ?', o: ['門', '耳', '口', '日'], a: 1, why: '聞 là hình thanh: 耳 chỉ nghĩa, 門 chỉ âm; bộ thủ là 耳. Tra ở bộ 門 sẽ không thấy.' },
    { t: 'mcq', ch: '撫', q: 'Tra chữ 撫 theo bộ thủ, ta làm thế nào?', o: ['Tìm bộ 無, đếm 3 nét', 'Tìm bộ 手 (扌), rồi tìm nhóm 12 nét (phần 無)', 'Tìm bộ 木', 'Tìm theo tổng số nét ở bộ 一'], a: 1, why: 'Xác định bộ 手 (4 nét), phần còn lại 無 có 12 nét.' },
    { t: 'mcq', q: 'Muốn tra nghĩa của TỪ GHÉP 社稷 (xã tắc), nên dùng:', o: ['Thiều Chửu, Hán Việt tự điển', 'Đào Duy Anh, Hán Việt từ điển', 'Khang Hy tự điển', 'Từ điển giản thể'], a: 1, why: 'Thiều Chửu chủ yếu tra chữ (tự); Đào Duy Anh tra từ (từ ghép Hán Việt), xếp theo âm.' },
    { t: 'tr', src: '五十而知天命', rd: 'Ngũ thập nhi tri thiên mệnh', a: 'Năm mươi tuổi thì biết mệnh trời.', why: 'Tra: 知 (bộ 矢, 8 nét) — biết; 命 (bộ 口, 8 nét) — mệnh; 而: liên từ “thì, mà”.' },
    { t: 'tr', src: '七十而從心所欲，不踰矩。', rd: 'Thất thập nhi tòng tâm sở dục, bất du củ.', a: 'Bảy mươi tuổi thì theo điều lòng muốn mà không vượt khuôn phép.', why: '從 (bộ 彳): theo; 所欲: điều mong muốn (kết cấu 所); 踰 (bộ 足): vượt; 矩 (bộ 矢): thước vuông, khuôn phép.' }
  ],
  socra: ['Cho mình một chữ bạn thấy khó xác định bộ thủ. Ta cùng thử các bước tìm bộ.', 'Vì sao bộ thủ và hình bàng thường trùng nhau, nhưng không phải luôn luôn?', 'Bạn thử giải thích vì sao viết đúng bút thuận lại giúp nhớ chữ lâu hơn.'],
  feynman: 'Hướng dẫn một bạn mới học cách tra một chữ lạ trong Thiều Chửu theo bộ thủ, từng bước, dùng chữ 撫 (hoặc một chữ bạn chọn) làm ví dụ.',
  essay: 'Lập bảng 30 bộ thủ thường gặp nhất mà bạn thấy trong các văn bản của khoá: bộ gốc, biến thể, nghĩa, và hai chữ ví dụ cho mỗi bộ. Đây sẽ là “bảng bộ thủ” riêng của bạn để ôn.',
  exam: {
    points: ['Vĩnh tự bát pháp: chấm, ngang, sổ, móc, hất, phẩy dài, phẩy ngắn, mác', 'Bút thuận: ngang trước sổ sau; phẩy trước mác sau; trên trước dưới sau; trái trước phải sau; ngoài trước trong sau; vào nhà rồi đóng cửa; giữa trước hai bên sau', 'Bộ thủ: Thuyết văn 540 → Tự vựng (1615) 214 → Khang Hy tự điển (1716); xếp theo số nét 1–17', 'Biến thể: 亻 氵 忄 扌 艹 刂 灬 犭 礻 衤 王 辶 攵; 阝 phải = 邑, 阝 trái = 阜', 'Nhục nguyệt: 月 trong 肝 胸 腦 = 肉', 'Bộ thủ ≠ hình bàng trong một số chữ: 聞 (耳), 也 (乙), 為 (爪), 年 (干)', 'Tra theo bộ: bộ → số nét bộ → số nét phần còn lại; Thiều Chửu (chữ), Đào Duy Anh (từ)'],
    qs: ['Trong thời có phần mềm vẽ chữ, còn cần học bộ thủ và tra từ điển giấy không? Vì sao?', 'Bộ thủ giúp gì cho việc học từ vựng, ngoài việc tra từ điển?']
  },
  readings: ['Giáo trình của lớp: phần Bộ thủ và cách tra từ điển', 'Thiều Chửu, Hán Việt tự điển: đọc phần “Bảng bộ thủ” và cách tra ở đầu sách', 'Luyện tập viết: dùng nút ✍️ ở các thẻ chữ trong khoá, mỗi ngày 5 chữ']
};

const HV_AMHV = {
  id: 'hv-amhv', kind: 'lang', short: 'Âm Hán Việt', title: 'Âm Hán Việt', sub: 'Nguồn gốc cách đọc Hán Việt, âm cổ Hán Việt, thanh điệu và bằng – trắc, chữ nhiều âm, đồng âm khác chữ, từ Hán Việt và những lỗi dùng sai', who: 'Phần I · Chữ Hán',
  goals: ['Hiểu âm Hán Việt là gì và hình thành từ đâu (âm Hán đời Đường)', 'Phân biệt âm Hán Việt với âm cổ Hán Việt và Hán Việt Việt hoá', 'Nắm quan hệ thanh điệu Hán Việt với bình – thượng – khứ – nhập, và cách phân bằng – trắc', 'Đọc đúng chữ nhiều âm theo nghĩa; phân biệt chữ đồng âm khác nghĩa', 'Nhận ra và tránh các lỗi dùng từ Hán Việt phổ biến'],
  q: 'Người Bắc Kinh đọc 學 là “xué”, người Quảng Đông đọc “hok”, người Việt đọc “học”. Cách đọc của người Việt từ đâu ra — và vì sao nó lại là một lợi thế lớn khi học Hán văn cổ?',
  context: '<p>Âm Hán Việt là “giọng” mà người Việt dùng để đọc chữ Hán. Nó không phải tiếng Trung, cũng không chỉ là tiếng Việt: nó là một hệ thống đọc riêng, hình thành hơn nghìn năm trước và giữ lại nhiều đặc điểm của tiếng Hán cổ mà chính tiếng Hán hiện đại đã mất. Bài này giúp bạn hiểu hệ thống ấy để <b>đọc đúng</b>, <b>hiểu đúng</b>, và chuẩn bị cho phần thơ Đường (bằng – trắc) sau này.</p>',
  lecture: [
    { h: 'Âm Hán Việt là gì, hình thành từ đâu', html: `<p><b>Âm Hán Việt</b> là cách đọc chữ Hán theo hệ thống ngữ âm của tiếng Việt, mỗi chữ thường ứng với một âm tiết cố định: 學 học, 國 quốc, 人 nhân, 天 thiên.</p>
<p>Theo các nghiên cứu kinh điển (Vương Lực, <i>Hán Việt ngữ nghiên cứu</i>, 1948; Nguyễn Tài Cẩn, <i>Nguồn gốc và quá trình hình thành cách đọc Hán Việt</i>, 1979), cách đọc Hán Việt hình thành chủ yếu từ <b>âm Hán đời Đường</b> (khoảng thế kỷ VIII – X), khi chữ Hán được dạy và học có hệ thống ở Giao Châu. Sau khi Việt Nam độc lập (thế kỷ X), cách đọc này phát triển theo quy luật riêng của tiếng Việt, tách khỏi sự biến đổi của tiếng Hán.</p>
<p>Hệ quả: âm Hán Việt có sự <b>tương ứng có hệ thống</b> với hệ thống âm Hán trung cổ (được ghi trong các vận thư như <i>Thiết vận</i>, <i>Quảng vận</i>). Nó giữ được nhiều đặc điểm mà tiếng Bắc Kinh đã mất, ví dụ các âm cuối -p, -t, -c: 法 pháp, 日 nhật, 國 quốc (tiếng Bắc Kinh: fǎ, rì, guó — mất âm cuối). Vì thế âm Hán Việt là một “công cụ” tốt để đọc thơ cổ và hiểu luật thơ.</p>` },
    { h: 'Ba lớp: cổ Hán Việt, Hán Việt, Hán Việt Việt hoá', html: `<p>Không phải mọi từ gốc Hán trong tiếng Việt đều đọc theo âm Hán Việt chuẩn. Có thể phân ba lớp:</p>
<ul><li><b>Âm cổ Hán Việt</b> (tiền Hán Việt): những từ vào tiếng Việt <b>trước</b> đời Đường, đã Việt hoá sâu đến mức người Việt cảm thấy là từ thuần Việt:<br>房 phòng → <b>buồng</b>; 鏡 kính → <b>gương</b>; 寡 quả → <b>goá</b>; 味 vị → <b>mùi</b>; 舞 vũ → <b>múa</b>; 帆 phàm → <b>buồm</b>; 半 bán → <b>nửa</b>.</li>
<li><b>Âm Hán Việt</b> (chuẩn): cách đọc hệ thống hình thành từ đời Đường — cách đọc dùng khi đọc văn bản Hán văn.</li>
<li><b>Hán Việt Việt hoá</b>: những từ Hán Việt về sau bị đọc chệch theo thói quen tiếng Việt: 符 phù → <b>bùa</b>; 匙 thi → <b>thìa</b>.</li></ul>
<p>Khi đọc Hán văn, luôn dùng âm <b>Hán Việt chuẩn</b>. Nhưng biết hai lớp kia giúp bạn thấy những cặp từ “anh em” trong tiếng Việt (buồng – phòng, gương – kính, mùi – vị) và hiểu chiều sâu lịch sử của tiếng mẹ đẻ.</p>` },
    { h: 'Thanh điệu: bình – thượng – khứ – nhập và bằng – trắc', html: `<p>Tiếng Hán trung cổ có bốn <b>thanh</b>: <b>bình</b> (平), <b>thượng</b> (上), <b>khứ</b> (去), <b>nhập</b> (入); mỗi thanh lại chia âm (cao) và dương (thấp). Âm Hán Việt tương ứng khá đều đặn:</p>
<table class="ac-tbl"><tr><th>Thanh trung cổ</th><th>Thanh Hán Việt</th><th>Ví dụ</th></tr>
<tr><td>Bình</td><td>ngang, huyền</td><td>天 thiên, 人 nhân, 山 sơn, 年 niên</td></tr>
<tr><td>Thượng</td><td>hỏi, ngã</td><td>海 hải, 草 thảo, 馬 mã, 五 ngũ</td></tr>
<tr><td>Khứ</td><td>sắc, nặng</td><td>去 khứ, 樹 thụ, 夜 dạ, 地 địa</td></tr>
<tr><td>Nhập</td><td>sắc, nặng (với âm cuối -p, -t, -c, -ch)</td><td>法 pháp, 日 nhật, 國 quốc, 學 học, 石 thạch</td></tr></table>
<p>Trong thơ Đường luật, các thanh được chia thành hai nhóm:</p>
<ul><li><b>Bằng</b> (平): thanh bình → trong âm Hán Việt là <b>không dấu (ngang) và huyền</b>.</li>
<li><b>Trắc</b> (仄): thanh thượng, khứ, nhập → trong âm Hán Việt là <b>hỏi, ngã, sắc, nặng</b>.</li></ul>
<p>Nhờ sự tương ứng này, người Việt chỉ cần nhìn dấu thanh của âm Hán Việt là biết chữ đó bằng hay trắc — một lợi thế lớn khi học luật thơ (bài thơ Đường ở Phần VI). Ví dụ câu 床前明月光 (sàng tiền minh nguyệt quang): sàng (B) tiền (B) minh (B) nguyệt (T) quang (B).</p>` },
    { h: 'Một chữ nhiều âm, mỗi âm một nghĩa', html: `<p>Một số chữ có <b>nhiều âm Hán Việt</b>, mỗi âm ứng với một nghĩa hoặc một từ loại (hiện tượng <b>phá âm</b> — đổi âm để phân biệt nghĩa; đã giới thiệu ở bài 8). Đọc sai âm là hiểu sai nghĩa:</p>
<table class="ac-tbl"><tr><th>Chữ</th><th>Các âm và nghĩa</th><th>Ví dụ</th></tr>
<tr><td>樂</td><td>nhạc (âm nhạc) · lạc (vui) · nhạo (ưa thích)</td><td>音樂 âm nhạc · 快樂 khoái lạc · 智者樂水 trí giả nhạo thuỷ</td></tr>
<tr><td>說</td><td>thuyết (nói) · duyệt (vui = 悅) · thuế (du thuyết)</td><td>學說 · 不亦說乎 · 遊說</td></tr>
<tr><td>行</td><td>hành (đi, làm) · hàng (hàng lối) · hạnh (nết)</td><td>行人 · 行列 · 品行 phẩm hạnh</td></tr>
<tr><td>惡</td><td>ác (xấu) · ố (ghét) · ô (sao, đâu — nghi vấn)</td><td>善惡 · 好惡 hiếu ố · 惡乎</td></tr>
<tr><td>好</td><td>hảo (tốt) · hiếu (ưa thích)</td><td>好人 · 好學 hiếu học</td></tr>
<tr><td>長</td><td>trường (dài) · trưởng (lớn, đứng đầu)</td><td>長江 · 校長</td></tr>
<tr><td>重</td><td>trọng (nặng) · trùng (lặp lại)</td><td>重要 · 重陽 trùng dương</td></tr>
<tr><td>易</td><td>dịch (thay đổi) · dị (dễ)</td><td>易經 · 容易 dung dị</td></tr>
<tr><td>見</td><td>kiến (thấy) · hiện (hiện ra)</td><td>見聞 · 見龍在田 (Kinh Dịch: rồng hiện ở ruộng)</td></tr>
<tr><td>王</td><td>vương (vua) · vượng (làm vua, cai trị)</td><td>王道 · 保民而王 (bảo dân nhi vượng)</td></tr></table>
<p>Thiều Chửu luôn ghi rõ “một âm là …” cho các chữ này. Khi gặp chữ quen mà nghĩa thông thường không hợp ngữ cảnh, hãy nghĩ ngay: <b>có thể chữ này đang đọc âm khác</b>.</p>` },
    { h: 'Đồng âm khác chữ', html: `<p>Ngược lại với trường hợp trên, rất nhiều chữ <b>khác nhau</b> lại có <b>cùng một âm Hán Việt</b>. Hệ thống âm Hán Việt có ít âm tiết hơn số chữ, nên đồng âm là rất phổ biến:</p>
<ul><li><b>đồng</b>: 同 (cùng), 銅 (đồng — kim loại), 童 (trẻ con), 桐 (cây ngô đồng), 瞳 (con ngươi).</li>
<li><b>công</b>: 公 (chung, ông), 功 (công lao), 工 (thợ, việc), 攻 (đánh).</li>
<li><b>kỳ</b>: 其 (ấy), 期 (hẹn, thời kỳ), 旗 (cờ), 奇 (lạ), 棋 (cờ — trò chơi).</li>
<li><b>thế</b>: 世 (đời), 勢 (thế lực), 替 (thay).</li></ul>
<p>Hệ quả: <b>âm Hán Việt không đủ để xác định nghĩa</b>; phải nhìn chữ. Đây là lý do “đồng chí”, “nhi đồng”, “đồng tiền” có chữ “đồng” khác hẳn nhau (同志, 兒童, 銅錢). Khi học từ Hán Việt, hãy cố nhớ <b>chữ Hán</b> của từng yếu tố — nhiều nhầm lẫn sẽ tự biến mất.</p>` },
    { h: 'Từ Hán Việt trong tiếng Việt và những lỗi dùng sai', html: `<p>Từ Hán Việt chiếm một phần rất lớn trong vốn từ tiếng Việt (thường được ước tính khoảng 60%, cao hơn nữa trong lĩnh vực chính trị, khoa học, học thuật). Hiểu nghĩa từng chữ giúp dùng từ chính xác. Một số lỗi phổ biến do không hiểu chữ:</p>
<table class="ac-tbl"><tr><th>Dùng sai</th><th>Đúng</th><th>Giải thích</th></tr>
<tr><td>“yếu điểm” = điểm yếu</td><td>yếu điểm = điểm quan trọng</td><td>要點: 要 yếu = quan trọng (như “trọng yếu”), không phải “yếu đuối”</td></tr>
<tr><td>“thăm quan”</td><td>tham quan</td><td>參觀: 參 tham = dự vào, 觀 quan = xem</td></tr>
<tr><td>“sát nhập”</td><td>sáp nhập</td><td>插入: 插 sáp = cắm vào</td></tr>
<tr><td>“bàng quang” (thờ ơ)</td><td>bàng quan</td><td>旁觀: đứng bên cạnh mà xem; 膀胱 bàng quang là bọng đái</td></tr>
<tr><td>“tuyệt cảnh” = cảnh đẹp</td><td>tuyệt cảnh = tình thế tuyệt vọng / chốn cách biệt</td><td>絕境: 絕 = dứt, cùng; cảnh đẹp là “tuyệt sắc”, “thắng cảnh”</td></tr>
<tr><td>“cứu cánh” = cứu giúp</td><td>cứu cánh = mục đích cuối cùng</td><td>究竟: 究 = xét đến cùng, 竟 = cuối cùng</td></tr></table>
<p>Ngược lại, có những trường hợp tiếng Việt đã chấp nhận nghĩa mới (từ được dùng theo thói quen đến mức thành chuẩn). Thái độ đúng: hiểu chữ Hán để <b>biết nghĩa gốc</b>, rồi tôn trọng cách dùng hiện hành của tiếng Việt khi viết tiếng Việt.</p>` }
  ],
  texts: [
    { title: 'Bằng – trắc trong một bài thơ quen thuộc', src: 'Lý Bạch, Tĩnh dạ tứ (thơ Đường)', lang: 'zh-TW',
      orig: '床前明月光，\n疑是地上霜。\n舉頭望明月，\n低頭思故鄉。',
      reading: 'Sàng tiền minh nguyệt quang,\nNghi thị địa thượng sương.\nCử đầu vọng minh nguyệt,\nĐê đầu tư cố hương.',
      vi: 'Trước giường ánh trăng sáng,\nNgỡ là sương trên mặt đất.\nNgẩng đầu nhìn trăng sáng,\nCúi đầu nhớ quê nhà.',
      notes: [['床 sàng', 'giường (cũng có thuyết là thành giếng) — bằng'], ['月 nguyệt', 'thanh nhập (âm cuối -t) → trắc'], ['疑 nghi', 'ngờ, ngỡ — bằng'], ['是 thị', 'ở đây gần nghĩa “là” (thơ Đường, đã muộn hơn Tiên Tần) — trắc'], ['霜 sương', 'bằng'], ['舉 cử', 'giơ lên, ngẩng — trắc (thượng thanh)'], ['望 vọng', 'trông — trắc (khứ thanh)'], ['低 đê', 'cúi — bằng'], ['故鄉 cố hương', 'quê cũ — 故 trắc, 鄉 bằng']],
      guide: ['Đánh dấu B (bằng) / T (trắc) cho từng chữ trong bốn câu, chỉ dựa vào dấu thanh của âm Hán Việt.', 'Chữ 是 ở đây có nghĩa gần “là”. Điều đó có mâu thuẫn với bài Động từ (是 thời Tiên Tần là đại từ) không? (Gợi ý: Lý Bạch sống thời nào?)'],
      comment: '<p>Bài thơ ai cũng thuộc trở thành bài tập thanh điệu: chỉ cần nhìn dấu của âm Hán Việt — <b>không dấu, huyền → bằng; hỏi, ngã, sắc, nặng → trắc</b>. Câu đầu: sàng (B) tiền (B) minh (B) nguyệt (T) quang (B). Chữ 月 nguyệt kết thúc bằng -t, là thanh nhập → trắc; tiếng Bắc Kinh đọc “yuè”, mất âm cuối — người Bắc Kinh phải học thuộc chữ nào là nhập thanh, còn người Việt nhìn dấu là biết.</p><p>Chữ <b>是</b> trong thơ Đường đã gần nghĩa hệ từ “là” — đúng với bài 11: hệ từ 是 phát triển dần từ đời Hán trở đi. Nghĩa của chữ thay đổi theo thời đại: luôn để ý văn bản thuộc thời nào.</p>' },
    { title: 'Chữ nhiều âm: 樂 và 王', src: 'Luận ngữ 6.23 · Ung dã; Mạnh Tử · Lương Huệ vương thượng (trích)', lang: 'zh-TW',
      orig: '子曰：「知者樂水，仁者樂山。知者動，仁者靜。知者樂，仁者壽。」\n……\n保民而王，莫之能禦也。',
      reading: 'Tử viết: “Trí giả nhạo thuỷ, nhân giả nhạo sơn. Trí giả động, nhân giả tĩnh. Trí giả lạc, nhân giả thọ.”\n……\nBảo dân nhi vượng, mạc chi năng ngự dã.',
      vi: 'Khổng Tử nói: “Người trí thích nước, người nhân thích núi. Người trí động, người nhân tĩnh. Người trí vui, người nhân sống lâu.”\n……\nBảo vệ dân mà làm vua (thiên hạ), thì không ai ngăn được.',
      notes: [['知 = 智 trí', 'thông giả (bài 3)'], ['樂 nhạo', 'động từ: ưa thích (hai lần đầu)'], ['樂 lạc', 'hình dung từ: vui (lần thứ ba)'], ['壽 thọ', 'sống lâu'], ['王 vượng', 'động từ: làm vua, thống nhất thiên hạ (không đọc “vương”)'], ['莫之能禦 mạc chi năng ngự', 'không ai ngăn được (tân ngữ 之 đảo trước động từ trong câu phủ định — bài 24)']],
      guide: ['Chữ 樂 xuất hiện ba lần với hai âm khác nhau. Lần nào đọc “nhạo”, lần nào đọc “lạc”? Dựa vào đâu?', '王 trong 保民而王 đứng ở vị trí nào trong câu? Vì sao phải đọc “vượng”?'],
      comment: '<p>Chương 6.23 là ví dụ đẹp nhất cho chữ nhiều âm: <b>樂水, 樂山</b> — 樂 đứng trước tân ngữ (水, 山) nên là động từ “ưa thích”, đọc <b>nhạo</b>; <b>知者樂</b> — 樂 đứng cuối làm vị ngữ hình dung từ “vui”, đọc <b>lạc</b>. Vị trí trong câu quyết định từ loại, từ loại quyết định âm đọc. Thêm vào đó 知 đọc là <b>trí</b> (thông giả). Một câu ngắn mà đọc sai ba chữ là chuyện thường gặp!</p><p><b>王</b> trong 保民而王 là động từ (làm vua), nhiều sách chú âm <b>vượng</b>. Trong thực tế đọc ở Việt Nam, nhiều người vẫn đọc “vương”; khi làm bài, hãy ghi chú nghĩa động từ để thể hiện bạn hiểu.</p>' },
    { title: 'Anh em trong tiếng Việt: âm cổ Hán Việt', src: 'Bảng đối chiếu (không phải văn bản cổ)', lang: 'zh-TW',
      orig: '房　鏡　寡　味　舞　帆　半',
      reading: 'phòng · kính · quả · vị · vũ · phàm · bán',
      vi: 'buồng · gương · goá · mùi · múa · buồm · nửa',
      notes: [['房 phòng / buồng', 'phòng ngủ — buồng ngủ'], ['鏡 kính / gương', 'kính (mắt kính) — gương soi'], ['寡 quả / goá', 'quả phụ — goá bụa'], ['味 vị / mùi', 'hương vị — mùi'], ['舞 vũ / múa', 'vũ điệu — múa'], ['帆 phàm / buồm', 'phàm (cánh buồm) — buồm'], ['半 bán / nửa', 'bán cầu — nửa']],
      guide: ['Mỗi cặp: từ Hán Việt (cột giữa) và từ cổ Hán Việt (cột cuối) có dùng thay nhau được không? Khác nhau ở sắc thái nào?', 'Bạn có biết thêm cặp nào tương tự không?'],
      comment: '<p>Đây không phải văn bản cổ mà là một bảng đối chiếu để thấy <b>hai lớp</b> từ gốc Hán trong tiếng Việt. Lớp cổ Hán Việt (buồng, gương, goá, mùi, múa, buồm, nửa) vào tiếng Việt từ rất sớm và đã hoà hẳn vào lớp từ thường ngày; lớp Hán Việt (phòng, kính, quả, vị, vũ, phàm, bán) đi vào sau qua con đường sách vở, thường mang sắc thái trang trọng, dùng trong từ ghép.</p><p>Khi đọc Hán văn, luôn đọc theo âm <b>Hán Việt</b> (cột giữa). Biết cột cuối là để hiểu tiếng Việt của chính mình sâu hơn.</p>' }
  ],
  concepts: [
    { id: 'amhv', han: '漢越音', term: 'Âm Hán Việt', def: 'Cách đọc chữ Hán theo hệ thống ngữ âm tiếng Việt, hình thành chủ yếu từ âm Hán đời Đường (thế kỷ VIII–X); tương ứng có hệ thống với âm Hán trung cổ, giữ được âm cuối -p, -t, -c.', ex: '法 pháp, 日 nhật, 國 quốc (Bắc Kinh: fǎ, rì, guó).', counter: 'Âm cổ Hán Việt (buồng, gương) — lớp vào trước đời Đường, đã Việt hoá sâu.', rel: ['cohv', 'bangtrac'], write: '音' },
    { id: 'cohv', han: '古漢越音', term: 'Ba lớp: cổ Hán Việt, Hán Việt, Hán Việt Việt hoá', def: 'Cổ Hán Việt: vào trước đời Đường, cảm nhận như thuần Việt (buồng, gương, goá, mùi, múa). Hán Việt chuẩn: dùng để đọc văn bản. Hán Việt Việt hoá: đọc chệch về sau (bùa ← phù).', ex: '房 phòng / buồng; 鏡 kính / gương; 符 phù / bùa.', counter: 'Từ thuần Việt không có gốc Hán (ăn, uống, đi).', rel: ['amhv'], write: '鏡' },
    { id: 'bangtrac', han: '平仄', term: 'Thanh điệu và bằng – trắc', def: 'Bình → ngang, huyền; thượng → hỏi, ngã; khứ → sắc, nặng; nhập (âm cuối -p, -t, -c, -ch) → sắc, nặng. Bằng = ngang, huyền; trắc = hỏi, ngã, sắc, nặng.', ex: '床前明月光: B B B T B.', counter: 'Thanh điệu Bắc Kinh hiện đại — nhập thanh đã tan vào các thanh khác, không nhìn được bằng trắc.', rel: ['amhv'], write: '平仄' },
    { id: 'nhieuam', han: '一字多音', term: 'Chữ nhiều âm', def: 'Một chữ có nhiều âm Hán Việt, mỗi âm một nghĩa hoặc từ loại; vị trí trong câu quyết định từ loại, từ loại quyết định âm.', ex: '樂 nhạc / lạc / nhạo; 惡 ác / ố / ô; 見 kiến / hiện; 王 vương / vượng.', counter: 'Chữ đồng âm khác chữ (同, 銅, 童 đều đọc “đồng”) — nhiều chữ một âm.', rel: ['dongam'], write: '樂' },
    { id: 'dongam', han: '同音異字', term: 'Đồng âm khác chữ và lỗi dùng từ Hán Việt', def: 'Nhiều chữ khác nhau cùng một âm Hán Việt, nên âm không đủ xác định nghĩa — phải nhớ chữ. Không hiểu chữ dẫn đến lỗi dùng từ (yếu điểm, thăm quan, sát nhập, bàng quang…).', ex: '同志 đồng chí / 兒童 nhi đồng / 銅錢 đồng tiền; 要點 yếu điểm = điểm quan trọng.', counter: 'Chữ nhiều âm (một chữ nhiều âm) — hiện tượng ngược lại.', rel: ['nhieuam'], write: '同' }
  ],
  drills: [
    { t: 'mcq', q: 'Âm Hán Việt hình thành chủ yếu từ âm Hán thời kỳ nào?', o: ['Thời Tiên Tần', 'Đời Đường (khoảng thế kỷ VIII – X)', 'Đời Thanh', 'Thế kỷ XX'], a: 1, why: 'Theo Vương Lực, Nguyễn Tài Cẩn: chủ yếu từ âm Hán đời Đường.' },
    { t: 'mcq', ch: '鏡', q: '“Gương” là âm gì của chữ 鏡 (kính)?', o: ['Âm Hán Việt chuẩn', 'Âm cổ Hán Việt', 'Âm Bắc Kinh', 'Từ thuần Việt không liên quan'], a: 1, why: 'Gương là lớp cổ Hán Việt, vào tiếng Việt trước đời Đường, đã Việt hoá sâu.' },
    { t: 'mcq', q: 'Trong thơ Đường, những thanh nào của âm Hán Việt là BẰNG?', o: ['Sắc, nặng', 'Hỏi, ngã', 'Không dấu (ngang) và huyền', 'Huyền và nặng'], a: 2, why: 'Bằng (thanh bình) = ngang, huyền; trắc = hỏi, ngã, sắc, nặng.' },
    { t: 'mcq', ch: '月', q: 'Chữ 月 (nguyệt) thuộc thanh nào, bằng hay trắc?', o: ['Bình — bằng', 'Nhập (âm cuối -t) — trắc', 'Thượng — trắc', 'Khứ — bằng'], a: 1, why: 'Âm cuối -t → thanh nhập → trắc.' },
    { t: 'mcq', ch: '樂', q: 'Trong 知者樂水, chữ 樂 đọc là:', o: ['nhạc', 'lạc', 'nhạo', 'lạo'], a: 2, why: 'Đứng trước tân ngữ 水 → động từ “ưa thích” → nhạo.' },
    { t: 'mcq', ch: '好學', q: '好學 đọc đúng là:', o: ['hảo học', 'hiếu học', 'hảo hạc', 'hiếu hạc'], a: 1, why: '好 khi là động từ “ưa thích” đọc hiếu: hiếu học = ham học.' },
    { t: 'mcq', ch: '惡', q: '惡 trong 好惡 (hiếu ố — ưa ghét) đọc là:', o: ['ác', 'ố', 'ô', 'ốc'], a: 1, why: '惡 là động từ “ghét” → đọc ố.' },
    { t: 'mcq', q: '“Yếu điểm” (要點) đúng nghĩa là:', o: ['Điểm yếu', 'Điểm quan trọng', 'Điểm trung bình', 'Điểm cuối'], a: 1, why: '要 yếu = quan trọng (trọng yếu, yếu tố); “điểm yếu” là nhược điểm.' },
    { t: 'mcq', q: 'Viết đúng: “Hai công ty ___ thành một.”', o: ['sát nhập', 'sáp nhập', 'xác nhập', 'sát nhặp'], a: 1, why: 'Sáp nhập 插入 — 插 sáp = cắm vào, gộp vào.' },
    { t: 'tr', src: '舉頭望明月，低頭思故鄉。', rd: 'Cử đầu vọng minh nguyệt, đê đầu tư cố hương.', a: 'Ngẩng đầu nhìn trăng sáng, cúi đầu nhớ quê nhà.', why: '舉: giơ lên; 望: trông; 低: cúi; 思: nhớ; 故鄉: quê cũ (định ngữ 故 đứng trước).' },
    { t: 'tr', src: '知者樂水，仁者樂山。', rd: 'Trí giả nhạo thuỷ, nhân giả nhạo sơn.', a: 'Người trí thích nước, người nhân thích núi.', why: '知 = 智 (trí); 樂 đọc nhạo = ưa thích; 者: người.' }
  ],
  socra: ['Cho mình một từ Hán Việt bạn thường dùng mà bạn nghi là đang dùng sai nghĩa. Ta cùng tra chữ Hán của nó nhé.', 'Vì sao người Việt nhìn dấu thanh là biết chữ bằng hay trắc, còn người Bắc Kinh thì không?', 'Bạn thử giải thích vì sao 樂 trong 知者樂水 đọc “nhạo”, còn trong 知者樂 đọc “lạc”.'],
  feynman: 'Giải thích cho một bạn cùng lớp cách xác định bằng – trắc của một chữ chỉ bằng âm Hán Việt, và vì sao điều đó quan trọng khi học thơ Đường.',
  essay: 'Sưu tầm 10 từ Hán Việt dễ dùng sai (ngoài bài): ghi chữ Hán, nghĩa từng chữ, nghĩa đúng của từ, và một câu ví dụ dùng đúng. Kiểm tra bằng Thiều Chửu và Đào Duy Anh.',
  exam: {
    points: ['Âm Hán Việt: cách đọc chữ Hán theo hệ thống âm tiếng Việt, hình thành chủ yếu từ âm Hán đời Đường (Vương Lực 1948; Nguyễn Tài Cẩn 1979)', 'Giữ âm cuối -p, -t, -c: 法 pháp, 日 nhật, 國 quốc', 'Ba lớp: cổ Hán Việt (buồng, gương, goá, mùi, múa, buồm, nửa) — Hán Việt chuẩn — Hán Việt Việt hoá (bùa)', 'Bình → ngang, huyền; thượng → hỏi, ngã; khứ → sắc, nặng; nhập → sắc, nặng (-p -t -c -ch)', 'Bằng = ngang, huyền; trắc = hỏi, ngã, sắc, nặng', 'Chữ nhiều âm: 樂 nhạc/lạc/nhạo, 說, 行, 惡 ác/ố/ô, 好 hảo/hiếu, 長, 重, 易, 見, 王 vương/vượng', 'Đồng âm khác chữ: 同 銅 童; 公 功 工 攻', 'Lỗi từ Hán Việt: yếu điểm, tham quan, sáp nhập, bàng quan, cứu cánh'],
    qs: ['Âm Hán Việt có phải là “tiếng Trung đọc kiểu Việt” không? Lập luận bằng các đặc điểm đã học.', 'Khi tiếng Việt đã dùng một từ Hán Việt theo nghĩa mới (khác nghĩa gốc), nên “sửa” lại hay chấp nhận?']
  },
  readings: ['Giáo trình của lớp: phần Âm Hán Việt', 'Nguyễn Tài Cẩn — Nguồn gốc và quá trình hình thành cách đọc Hán Việt (đọc phần mở đầu)', 'Thiều Chửu: tra 樂, 惡, 見, 王 và đọc các mục “một âm là…”']
};

const ACAD_HANVAN = {
  format: 'chutchi-course@1', id: 'han-van', field: 'Hán Nôm', icon: '📜', color: '#ffe680',
  title: 'Cơ sở Hán văn cổ',
  desc: 'Chuẩn bị cho môn Cơ sở Hán Nôm (phần Hán văn cổ): chữ Hán, từ vựng văn ngôn, ngữ pháp (từ loại, hư từ, cú pháp), đọc – dịch văn bản cổ. 32 bài, soạn dần theo tiến độ trên lớp.',
  intro: '<p>Khoá dựng theo khung chung của môn Cơ sở Hán Nôm, kết hợp ghi chép trên lớp. Thuật ngữ theo giáo trình Việt Nam (văn/tự, thực từ/hư từ, tự động từ/tha động từ, phần đề/phần thuyết, nòng cốt câu…).</p><p>Mỗi bài: mục tiêu · bài giảng · văn bản (nguyên văn, âm Hán Việt, chú thích, lời bình) · thẻ chữ & từ (có tập viết theo thứ tự nét) · luyện tập (trắc nghiệm, dịch câu có AI chấm) · hỏi gia sư · tự dịch & tự giảng lại.</p>',
  parts: [
    { title: 'Phần I · Chữ Hán', lessons: [
      HV_KHAIQUAT,
      HV_LUCTHU1,
      HV_LUCTHU2,
      HV_BOTHU,
      HV_AMHV] },
    { title: 'Phần II · Từ vựng văn ngôn', lessons: [
      HV_TUTU,
      HV_DONDAAM,
      HV_NGHIA,
      HV_TULOAI] },
    { title: 'Phần III · Ngữ pháp từ loại: thực từ', lessons: [
      HV_DANHTU,
      HV_DONGTU,
      HV_HINHDUNG,
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
