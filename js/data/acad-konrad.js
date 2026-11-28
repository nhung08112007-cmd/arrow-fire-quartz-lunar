/* Học viện · Konrad — “Phương Tây và Phương Đông”. Biên soạn từ ghi chép của bạn, Chữ-tchi bổ sung nguyên văn (Sử ký, Nguyên đạo, Đại học, Thu hứng — đều thuộc phạm vi công cộng)
   và sửa vài số liệu. Trường “exam” là ý chính của bài + câu hỏi để nghĩ tiếp. */
const ACAD_KONRAD = {
  format: 'chutchi-course@1', id: 'konrad', field: 'Văn học phương Đông', icon: '🌏', color: '#ffc0b0',
  title: 'Konrad: Phương Tây và Phương Đông',
  desc: 'Đọc Konrad để nhìn Đông – Tây trong cùng một dòng lịch sử: Pôlibi & Tư Mã Thiên, khái niệm Trung thế kỷ, Phục hưng Đường – Tống, Tống Nho, ba nhà thơ Lý Bạch – Vương Duy – Đỗ Phủ. Dựng từ ghi chép của bạn, kèm nguyên văn chữ Hán.',
  parts: [
    {
      title: 'Phần I · Triết học lịch sử: Pôlibi và Tư Mã Thiên',
      lessons: [
        {
          id: 'polybius', short: 'Pôlibi', title: 'Pôlibi: sáu chính thể và vòng tuần hoàn', sub: 'Anacyclosis, tính biện chứng, thể chế hỗn hợp La Mã', who: 'Pôlibi (khoảng 200–118 TCN) · “Lịch sử”, quyển VI',
          q: 'Vì sao một thể chế tốt đẹp lại tự biến chất? Và có cách nào làm một nhà nước không sụp đổ không?',
          context: '<p>Konrad mở đầu bằng việc phân biệt hai kiểu nghiên cứu lịch sử cổ đại: <b>suy luận triết học thuần tuý</b> (áp quan điểm triết học có sẵn vào tư liệu) và <b>chủ nghĩa kinh nghiệm lịch sử</b> (đi từ tư liệu cụ thể để rút ra quy luật, bài học). Pôlibi và Tư Mã Thiên đều thuộc kiểu thứ hai.</p><p>Hai người sống cùng một giai đoạn chuyển mình: chế độ chiếm hữu nô lệ đạt đỉnh cao và các <b>đế chế lớn</b> hình thành — La Mã ở phương Tây, nhà Hán ở phương Đông.</p><p>Pôlibi, người Hy Lạp làm con tin ở La Mã, muốn giải thích một hiện tượng chưa từng có: La Mã khuất phục gần như toàn bộ thế giới đã biết <b>trong chưa đầy 53 năm</b>. Câu trả lời của ông nằm ở <b>thể chế</b>.</p>',
          text: {
            src: 'Pôlibi, “Lịch sử” I.1 — bản dịch Anh của W. R. Paton (1922, công cộng)',
            lang: 'en-GB', orig: 'For who is so worthless or indolent as not to wish to know by what means and under what system of polity the Romans in less than fifty-three years have succeeded in subjecting nearly the whole inhabited world to their sole government — a thing unique in history?',
            vi: 'Bởi có ai tầm thường hay lười nhác đến mức không muốn biết La Mã đã dùng phương cách nào, dưới chính thể nào, mà trong chưa đầy năm mươi ba năm đã khuất phục được gần như toàn bộ thế giới có người ở dưới quyền cai trị duy nhất của mình — một điều chưa từng có trong lịch sử?',
            guide: ['Câu hỏi của Pôlibi hướng vào “phương cách” và “chính thể”. Điều đó cho thấy ông coi đâu là nguyên nhân của lịch sử?', 'Kể tên 6 chính thể theo cặp tốt – xấu. Tiêu chí phân loại của Pôlibi là số lượng hay chất lượng?', 'Vì sao Konrad nói vòng tuần hoàn của Pôlibi là “biện chứng”, không phải lặp lại máy móc?']
          },
          concepts: [
            { id: 'six-forms', term: 'Sáu hình thức chính thể', def: 'Ba hình thức tốt — quân chủ, quý tộc, dân chủ — và ba hình thức biến chất tương ứng — chuyên chế, quả đầu (tập đoàn quân phiệt), vô chính phủ. Tiêu chí quan trọng nhất là chất lượng điều hành (vì lợi ích chung hay lợi ích riêng), không chỉ số người nắm quyền.', ex: 'Quân chủ: một người cai trị bằng lý tính, được dân tôn trọng → biến chất thành chuyên chế: một người cai trị bằng sợ hãi.', counter: 'Phân loại chỉ theo số lượng (một – ít – nhiều) mà không xét tốt – xấu.', rel: ['anacyclosis', 'mixed'] },
            { id: 'anacyclosis', term: 'Vòng tuần hoàn chính thể (anacyclosis)', def: 'Quân chủ → chuyên chế → quý tộc → quả đầu → dân chủ → vô chính phủ; khi xã hội rơi vào dã man, một kẻ mạnh xuất hiện lập lại quân chủ, vòng mới bắt đầu.', ex: 'Đám đông vô luật pháp ở cuối vòng tạo điều kiện cho một kẻ độc tài nắm quyền.', counter: 'Học thuyết Pythagore về sự lặp lại y hệt — Konrad nhấn mạnh Pôlibi không nói thế.', rel: ['six-forms', 'dialectic-cycle'] },
            { id: 'dialectic-cycle', term: 'Tuần hoàn biện chứng', def: 'Mỗi lần lịch sử quay lại điểm cũ là trên một cơ sở mới, với nội dung mới — vận động như đường xoắn ốc chứ không phải vòng tròn khép kín. Đây là điểm Konrad thấy chung ở cả Pôlibi và Tư Mã Thiên.', ex: 'Nhà Hán quay về nguyên tắc Trung của nhà Hạ, nhưng trên quy mô một đế chế thống nhất.', counter: 'Lặp lại cơ học: mọi thứ diễn ra y hệt lần trước.', rel: ['anacyclosis', 'three-principles'] },
            { id: 'mixed', term: 'Thể chế hỗn hợp La Mã', def: 'Viện chấp chính (nguyên tắc quân chủ), Viện Nguyên lão (quý tộc), Đại hội nhân dân (dân chủ) cân bằng, kiềm chế lẫn nhau, nhờ đó La Mã tránh được sự biến chất nhanh của các hình thức đơn lẻ.', ex: 'Chấp chính quan chỉ huy quân đội nhưng cần Nguyên lão cấp ngân sách và nhân dân phê chuẩn hoà ước.', counter: 'Một chính thể đơn thuần dù tốt (chỉ quân chủ) — theo Pôlibi sớm muộn sẽ biến chất.', rel: ['six-forms'] }
          ],
          arg: {
            claim: 'La Mã chinh phục thế giới vì có thể chế hỗn hợp.',
            premises: ['Mọi chính thể đơn lẻ đều tự biến chất theo quy luật tự nhiên (anacyclosis).', 'Thể chế hỗn hợp kết hợp ba nguyên tắc quân chủ – quý tộc – dân chủ, để chúng kiềm chế lẫn nhau.', 'Nhờ vậy La Mã ổn định lâu dài hơn các nhà nước khác và đủ sức mở rộng.'],
            objection: 'Giải thích chỉ bằng thể chế bỏ qua kinh tế, quân sự, chế độ nô lệ — điều mà Konrad (nhà sử học mácxít) cũng sẽ lưu ý. Và chính La Mã về sau vẫn sụp đổ.',
            reply: 'Pôlibi không phủ nhận các yếu tố khác, nhưng chọn thể chế làm “chìa khoá” giải thích sự bền vững. Việc La Mã sụp đổ về sau lại chứng minh luận điểm tuần hoàn của chính ông: thể chế hỗn hợp chỉ làm chậm, không chặn được sự biến chất.'
          },
          socra: ['Một thể chế tốt có thể biến chất vì những người cai trị đổi khác, hay vì chính cấu trúc của nó? Pôlibi nghĩ gì?', 'Bạn có thấy ý tưởng “kiềm chế và đối trọng” trong các nhà nước hiện đại không?', 'Nếu lịch sử là tuần hoàn, thì con người còn có thể làm gì để thay đổi nó?'],
          feynman: 'Vẽ (hoặc kể) vòng tuần hoàn 6 chính thể của Pôlibi và giải thích vì sao thể chế hỗn hợp giúp La Mã bền vững.',
          essay: 'Theo bạn, ý “mọi thể chế đơn lẻ đều tự biến chất” còn đúng với thế giới hôm nay không? Chọn một ví dụ và dùng khái niệm của Pôlibi để soi nó. 250–350 chữ.',
          exam: {
            points: ['Hai kiểu nghiên cứu lịch sử: suy luận triết học thuần tuý / chủ nghĩa kinh nghiệm lịch sử — Pôlibi & Tư Mã Thiên thuộc kiểu 2', 'Bối cảnh chung: đỉnh cao chiếm hữu nô lệ, hình thành đế chế La Mã và Hán', '6 chính thể: quân chủ ↔ chuyên chế, quý tộc ↔ quả đầu, dân chủ ↔ vô chính phủ — tiêu chí chất lượng', 'Anacyclosis: quân chủ → chuyên chế → quý tộc → quả đầu → dân chủ → vô chính phủ → quân chủ', 'Tuần hoàn biện chứng (xoắn ốc), không phải lặp lại kiểu Pythagore', 'Thể chế hỗn hợp: Chấp chính (quân chủ) – Nguyên lão (quý tộc) – Đại hội nhân dân (dân chủ)', 'La Mã chinh phục thế giới trong chưa đầy 53 năm'],
            qs: ['Thể chế hỗn hợp của La Mã giống và khác các nhà nước hiện đại có phân quyền ở đâu?', 'Nếu lịch sử tuần hoàn, liệu có “tiến bộ” thật sự không?']
          },
          read: ['Konrad — Phương Tây và Phương Đông, bài “Pôlibi và Tư Mã Thiên”', 'Pôlibi — Lịch sử, quyển VI']
        },
        {
          id: 'sima-qian', short: 'Tư Mã Thiên', title: 'Tư Mã Thiên: Trung – Kính – Văn và cái “tệ”', sub: 'Nguyên tắc cầm quyền, lỗi lầm nhà Tần, quân tử – tiểu nhân, Ngũ hành – Thiên mệnh', who: 'Tư Mã Thiên (khoảng 145–86 TCN) · “Sử ký”, Cao Tổ bản kỷ',
          q: 'Nếu Pôlibi tìm nguyên nhân lịch sử ở thể chế, thì Tư Mã Thiên tìm ở đâu — và cách nhìn nào nói được nhiều hơn về con người?',
          context: '<p>Tư Mã Thiên không nhìn lịch sử qua hình thức thể chế mà đi tìm <b>phẩm chất bản tính con người</b> làm cơ sở cho chính quyền. Ông đúc kết ba đời Hạ – Ân – Chu thành ba nguyên tắc: <b>Trung</b> (thành thực), <b>Kính</b> (tôn kính), <b>Văn</b> (văn hoá, lễ nhạc).</p><p>Mỗi nguyên tắc khi bị đẩy quá đà sinh ra một cái <b>tệ</b> (ghi chép gọi là cái “Họa”): Trung → <b>dã</b> (thô lậu), Kính → <b>quỷ</b> (mê tín cúng tế), Văn → <b>tắc/giả nguy</b> (hình thức giả tạo). Triều sau sửa cái tệ của triều trước bằng nguyên tắc kế tiếp.</p><p>Nhà Tần đáng lẽ phải sửa cái tệ của Văn bằng Trung, nhưng lại dùng <b>Pháp</b> hà khắc — một “lỗi lầm” khiến nhà Tần sụp đổ chỉ sau 15 năm (221–206 TCN). Nhà Hán quay về Trung và “được mối giềng của trời” (thiên thống).</p>',
          text: {
            src: 'Tư Mã Thiên, Sử ký · Cao Tổ bản kỷ, lời Thái sử công (nguyên văn, công cộng)',
            lang: 'zh-TW',
            orig: '夏之政忠。忠之敝，小人以野，故殷人承之以敬。敬之敝，小人以鬼，故周人承之以文。文之敝，小人以僿，故救僿莫若以忠。三王之道若循環，終而復始。周秦之間，可謂文敝矣。秦政不改，反酷刑法，豈不繆乎？故漢興，承敝易變，使人不倦，得天統矣。',
            reading: 'Hạ chi chính trung. Trung chi tệ, tiểu nhân dĩ dã, cố Ân nhân thừa chi dĩ kính. Kính chi tệ, tiểu nhân dĩ quỷ, cố Chu nhân thừa chi dĩ văn. Văn chi tệ, tiểu nhân dĩ tắc, cố cứu tắc mạc nhược dĩ trung. Tam vương chi đạo nhược tuần hoàn, chung nhi phục thuỷ. Chu Tần chi gian, khả vị văn tệ hĩ. Tần chính bất cải, phản khốc hình pháp, khởi bất mậu hồ? Cố Hán hưng, thừa tệ dịch biến, sử nhân bất quyện, đắc thiên thống hĩ.',
            vi: 'Chính sự nhà Hạ lấy Trung (thành thực). Cái tệ của Trung là kẻ tiểu nhân thành thô dã, nên người nhà Ân nối tiếp bằng Kính. Cái tệ của Kính là kẻ tiểu nhân sa vào quỷ thần, nên người nhà Chu nối tiếp bằng Văn. Cái tệ của Văn là kẻ tiểu nhân thành giả dối thiếu thành thực, nên cứu cái giả dối không gì bằng lấy Trung. Đạo của ba vua như vòng tuần hoàn, hết rồi lại bắt đầu. Khoảng giữa Chu và Tần có thể gọi là lúc Văn đã thành tệ. Nhà Tần không sửa chính sự, lại dùng hình pháp hà khắc, há chẳng phải sai lầm sao? Cho nên nhà Hán dấy lên, nhân cái tệ mà thay đổi, khiến người ta không mỏi mệt, được mối giềng của trời vậy.',
            guide: ['Tìm trong nguyên văn chữ 敝 (tệ). Đó chính là cái “Họa” trong ghi chép của bạn — vì sao dịch là “tệ” lại sát hơn?', 'Ai là người biểu hiện cái tệ: “tiểu nhân” hay người cầm quyền? Konrad thấy điều gì độc đáo ở đây?', 'Câu “三王之道若循環，終而復始” (đạo ba vua như vòng tuần hoàn) so sánh thế nào với anacyclosis của Pôlibi?']
          },
          concepts: [
            { id: 'three-principles', term: 'Ba nguyên tắc Trung – Kính – Văn', def: 'Hạ: Trung (thành thực, ngay thẳng tự nhiên); Ân: Kính (từ hiếu kính cha mẹ mở rộng tới người cầm quyền, lễ pháp, thần linh); Chu: Văn (vốn nghĩa “hoa văn” — trang sức bản tính mộc bằng lễ, nhạc, thơ, thư).', ex: 'Nhà Chu giáo hoá xã hội bằng Lễ, Nhạc, Thi, Thư.', counter: 'Pháp của nhà Tần — không phải một phẩm chất bản tính mà là công cụ trừng phạt.', rel: ['bi-tệ', 'dialectic-cycle'] },
            { id: 'bi-tệ', term: 'Cái tệ (敝): Dã – Quỷ – Tắc', def: 'Mỗi nguyên tắc bị đẩy quá mức sinh ra mặt trái: Trung → dã (thô lậu, thiếu văn hoá điều tiết); Kính → quỷ (cúng tế thần linh tràn lan, mê tín — Konrad dẫn chú giải của Trịnh Huyền); Văn → tắc/giả nguy (hình thức phô trương, giả tạo).', ex: 'Lễ nghi chỉ còn hình thức, người ta làm vì sĩ diện chứ không vì lòng thành — đó là “văn tệ”.', counter: 'Sự sụp đổ do ngoại xâm hay thiên tai — không phải sự thoái hoá từ bên trong một nguyên tắc.', rel: ['three-principles', 'junzi'] },
            { id: 'qin-error', term: '“Lỗi lầm” nhà Tần và bước ngoặt nhà Hán', def: 'Nhà Tần không sửa cái tệ của Văn bằng Trung mà dùng Pháp (hình pháp hà khắc, doạ nạt) — Giả Nghị và Tư Mã Thiên coi là sai lầm, khiến Tần mất sau 15 năm. Nhà Hán quay về Trung, giải phóng con người khỏi sự mỏi mệt (“sử nhân bất quyện”), khơi dậy sức sáng tạo.', ex: 'Giả Nghị, “Quá Tần luận”: Tần mất vì “nhân nghĩa bất thi” (không thi hành nhân nghĩa).', counter: 'Coi nhà Tần chỉ là một mắt xích bình thường trong vòng tuần hoàn — Tư Mã Thiên coi nó là chệch quỹ đạo.', rel: ['three-principles', 'tianming'] },
            { id: 'junzi', term: 'Quân tử và tiểu nhân', def: 'Theo Konrad, điểm độc đáo của Tư Mã Thiên: cái tệ bộc lộ ở quần chúng (tiểu nhân — hành động theo bản năng), không ở tầng lớp đặc tuyển; quân tử là người nhận ra nguyên nhân sâu xa và lập trật tự mới.', ex: 'Khi chính sự suy thoái, tiểu nhân thành thô dã, cuồng tín hoặc giả dối; quân tử đứng lên thay đổi chế độ.', counter: 'Quan niệm của Pôlibi: sự biến chất nằm ở cơ quan quyền lực (người cầm quyền tiếm quyền).', rel: ['bi-tệ'] },
            { id: 'tianming', term: 'Ngũ hành và Thiên mệnh', def: 'Thay đổi triều đại ứng với vận Ngũ hành (Hạ – Mộc, Ân – Kim, Chu – Hoả, Tần – Thuỷ, Hán – Thổ). Thiên mệnh theo Konrad không phải sức mạnh thần bí mà là trật tự tối cao của vũ trụ, quy định tính tất yếu của vận động lịch sử.', ex: 'Nhà Hán đổi sang đức Thổ (năm 104 TCN, đời Hán Vũ Đế) để khẳng định mình thay Tần (Thuỷ) là hợp mệnh trời.', counter: 'Thiên mệnh hiểu như ý muốn tuỳ tiện của một vị thần.', rel: ['qin-error', 'dialectic-cycle'] }
          ],
          arg: {
            claim: 'So với Pôlibi, Tư Mã Thiên tìm nguyên nhân lịch sử ở phẩm chất con người, không ở hình thức thể chế.',
            premises: ['Pôlibi phân loại và giải thích bằng hình thức chính thể, sự biến chất nằm ở cơ quan quyền lực.', 'Tư Mã Thiên giải thích bằng nguyên tắc tinh thần (Trung – Kính – Văn) và cái tệ của chúng bộc lộ ở bản tính quần chúng.', 'Giải pháp cũng khác: Pôlibi — cân bằng quyền lực; Tư Mã Thiên — quay về phẩm chất nguyên sơ (Trung) trên cơ sở mới.'],
            objection: 'Hai người thực ra rất giống nhau: đều tuần hoàn, đều biện chứng, đều rút quy luật từ kinh nghiệm. Nhấn mạnh khác biệt là làm lu mờ điểm chung mà chính Konrad muốn chứng minh.',
            reply: 'Konrad làm cả hai: chỉ ra điểm chung (phương pháp kinh nghiệm, tuần hoàn biện chứng, bối cảnh đế chế) để chứng minh tính phổ quát của tư duy nhân loại, và chỉ ra khác biệt (thể chế vs phẩm chất) để thấy đặc sắc từng nền văn minh. Hiểu Konrad là thấy được cả hai vế cùng lúc.'
          },
          socra: ['Hãy tìm một ví dụ hôm nay về “văn tệ” — hình thức lấn át lòng thành.', 'Bạn đồng ý rằng cái tệ bộc lộ ở quần chúng trước, hay ở người cầm quyền trước?', 'Nếu phải chọn: sửa xã hội bằng thể chế (Pôlibi) hay bằng phẩm chất con người (Tư Mã Thiên)?'],
          feynman: 'Giải thích sơ đồ Hạ (Trung → dã) → Ân (Kính → quỷ) → Chu (Văn → tắc) → Tần (sai: Pháp) → Hán (về Trung) cho một bạn chưa học.',
          essay: 'Đặt Pôlibi và Tư Mã Thiên cạnh nhau: mỗi người thấy được điều gì mà người kia bỏ sót? Cách nhìn nào giúp bạn hiểu xã hội hôm nay hơn? 300–400 chữ.',
          exam: {
            points: ['Tư Mã Thiên: phẩm chất bản tính con người làm cơ sở chính quyền (khác Pôlibi: thể chế)', 'Hạ – Trung → tệ: dã; Ân – Kính → tệ: quỷ (Trịnh Huyền chú); Chu – Văn → tệ: tắc/giả nguy', '“Tam vương chi đạo nhược tuần hoàn, chung nhi phục thuỷ”', 'Tần dùng Pháp hà khắc = lỗi lầm (Giả Nghị, Tư Mã Thiên) → mất sau 15 năm', 'Hán quay về Trung → “sử nhân bất quyện, đắc thiên thống”', 'Cái tệ bộc lộ ở tiểu nhân; quân tử nhận ra và lập trật tự mới', 'Ngũ hành: Hạ Mộc – Ân Kim – Chu Hoả – Tần Thuỷ – Hán Thổ; Thiên mệnh = trật tự vũ trụ', 'Bảng so sánh 5 tiêu chí Pôlibi / Tư Mã Thiên'],
            qs: ['Một thời đại có thể mắc cả ba cái tệ dã – quỷ – tắc cùng lúc không? Thời của bạn thì sao?', 'Tư Mã Thiên bị Hán Vũ Đế xử cung hình, vậy mà vẫn viết nhà Hán “được mối giềng của trời”. Điều đó nói gì về cách ông viết sử?']
          },
          read: ['Sử ký · Cao Tổ bản kỷ (đoạn Thái sử công viết)', 'Giả Nghị — Quá Tần luận']
        }
      ]
    },
    {
      title: 'Phần II · Trung thế kỷ và Phục hưng phương Đông',
      lessons: [
        {
          id: 'middle-ages', short: 'Trung thế kỷ', title: 'Trung thế kỷ: một quy luật toàn cầu', sub: 'Phê phán sử học Âu châu trung tâm, bốn đặc trưng, niên biểu Đông – Tây', who: 'Konrad · chương “Trung thế kỷ trong khoa học lịch sử”',
          q: 'Có phải chỉ châu Âu mới có “thời Trung cổ”? Nếu phương Đông cũng có, thì ai đi trước?',
          context: '<p>Thuật ngữ “Trung thế kỷ” do các nhà nhân văn châu Âu thế kỷ XV đặt ra, chia lịch sử thành ba: Cổ đại (đến khi Tây La Mã sụp đổ, thế kỷ V) — Trung thế kỷ (V–XV) — Thời đại mới (từ Phục hưng). Suốt nhiều thế kỷ, khái niệm này chỉ áp cho châu Âu; cả Trung Quốc, Ấn Độ, Ả Rập, Nhật Bản… bị dồn vào một ngăn mơ hồ gọi là “Phương Đông”, chỉ được nhắc khi va chạm với châu Âu.</p><p>Konrad lật lại: Trung thế kỷ là <b>một giai đoạn có tính quy luật của toàn nhân loại</b>, với cùng nội dung kinh tế – xã hội: chế độ phong kiến hình thành, củng cố, thay thế xã hội chiếm hữu nô lệ.</p><p>Ông chứng minh bằng bốn hiện tượng diễn ra trên khắp Cựu lục địa, và kết luận: suốt Trung thế kỷ, <b>phương Đông đi trước</b>. Chỉ đến cận đại, vì phong kiến phương Đông quá vững, mầm tư bản chậm lớn, trung tâm phát triển mới dịch sang phương Tây.</p>',
          text: {
            src: 'Tóm lược luận điểm của Konrad theo ghi chép của bạn (không trích nguyên văn)',
            vi: '1. Sự sụp đổ đồng loạt của các đế chế cổ đại (thế kỷ III–V): Hán (Đông Á), Kusan (Trung Á), Parthia (Iran), Tây La Mã (thế kỷ V).\n2. Làn sóng di dân của các dân tộc “trẻ”: Hung Nô, Tây Tạng, Đột Quyết ở Bắc Trung Quốc; Goth, Vandal, Frank, Slav ở châu Âu — tiếp thu di sản cổ đại, đẩy nhanh phong kiến hoá.\n3. Sự thống trị của các tôn giáo thế giới: Phật giáo (Đông Á, Trung Á), Hồi giáo (Trung Á, Tiền Á, Bắc Phi), Kitô giáo (châu Âu) — tôn giáo ôm trùm pháp luật, chính trị, đạo đức, triết học, nghệ thuật.\n4. Khởi nghĩa nông dân là động lực: Khăn Vàng (cuối Hán), Hoàng Sào (cuối Đường), Lý Tự Thành (cuối Minh).\nNiên biểu: Trung Quốc III → VIII; Trung Á – Iran III → IX–XI; châu Âu V → XV.',
            guide: ['Bốn đặc trưng này thuộc những bình diện nào (chính trị, dân tộc, tư tưởng, giai cấp)? Vì sao Konrad cần đủ bốn bình diện?', 'Theo niên biểu, Trung thế kỷ ở Trung Quốc kết thúc sớm hơn châu Âu bao nhiêu thế kỷ? Mốc kết thúc được đánh dấu bằng hiện tượng gì?', 'Konrad giải thích vì sao phương Đông đi trước thời Trung cổ nhưng lại tụt hậu thời cận đại?']
          },
          concepts: [
            { id: 'eurocentrism', term: 'Sử học lấy châu Âu làm trung tâm', def: 'Lối viết lịch sử dùng các phân kỳ, khái niệm rút từ châu Âu làm chuẩn, coi phương Đông là “thế giới khác” chỉ đáng nhắc khi va chạm với châu Âu.', ex: 'Giáo trình lịch sử thế giới chỉ nói về Trung Quốc khi kể chuyện Marco Polo hay Chiến tranh Nha phiến.', counter: 'Lịch sử so sánh coi các nền văn minh có tiến trình riêng nhưng chung quy luật — chính là cách Konrad làm.', rel: ['global-ma'] },
            { id: 'global-ma', term: 'Trung thế kỷ như quy luật toàn cầu', def: 'Luận điểm của Konrad: Trung thế kỷ là giai đoạn chung của nhân loại, nội dung là sự hình thành, củng cố và thịnh vượng của chế độ phong kiến thay thế chế độ chiếm hữu nô lệ.', ex: 'Trung Quốc bước vào Trung thế kỷ từ thế kỷ III, sau khi nhà Hán sụp đổ.', counter: 'Quan niệm “Trung cổ” chỉ là một thời kỳ riêng của châu Âu Kitô giáo.', rel: ['eurocentrism', 'four-features'] },
            { id: 'four-features', term: 'Bốn đặc trưng toàn cầu của Trung thế kỷ', def: '(1) Các đế chế cổ đại sụp đổ đồng loạt thế kỷ III–V; (2) các dân tộc “trẻ” di cư, tiếp thu văn minh cũ; (3) tôn giáo thế giới thống trị thượng tầng; (4) khởi nghĩa nông dân thúc đẩy lịch sử.', ex: 'Hán sụp – Tây La Mã sụp; Hung Nô – Goth; Phật giáo – Kitô giáo; Khăn Vàng – các cuộc nổi dậy nông dân châu Âu.', counter: 'Một sự kiện riêng lẻ ở một nơi — Konrad cần tính đồng thời trên khắp Cựu lục địa.', rel: ['global-ma'] },
            { id: 'east-lead', term: 'Phương Đông tiên phong – tụt hậu cận đại', def: 'Phương Đông xác lập phong kiến và có thành tựu khoa học, triết học, văn học sớm và phong phú hơn; nhưng vì phong kiến quá vững chắc nên mầm tư bản chậm lớn, trung tâm phát triển thời cận đại dịch sang phương Tây, dẫn tới thực dân hoá.', ex: 'Phục hưng Đường – Tống (thế kỷ VIII) đi trước Phục hưng Ý (XIV–XV) hàng thế kỷ.', counter: 'Thuyết phương Đông “trì trệ muôn đời”, không có lịch sử phát triển.', rel: ['global-ma', 'oriental-renaissance'] }
          ],
          arg: {
            claim: 'Khái niệm Trung thế kỷ có thể và cần áp dụng cho phương Đông.',
            premises: ['Nội dung thực chất của Trung thế kỷ là sự hình thành và thịnh vượng của chế độ phong kiến.', 'Ở phương Đông cũng diễn ra đúng quá trình đó, cùng bốn hiện tượng đồng thời với châu Âu.', 'Vậy giữ khái niệm này riêng cho châu Âu là phiến diện; áp dụng chung giúp thấy quy luật phổ quát và cả vị trí tiên phong của phương Đông.'],
            objection: 'Dùng một khung khái niệm châu Âu (và khung năm hình thái của chủ nghĩa Mác) cho phương Đông có thể lại là một dạng lấy châu Âu làm chuẩn — ép phương Đông vào khuôn có sẵn.',
            reply: 'Konrad đổi nghĩa khái niệm: không còn là “thời kỳ của châu Âu Kitô giáo” mà là một giai đoạn phát triển chung, và cho thấy phương Đông thậm chí đi trước. Dù vậy, phản bác này vẫn đáng giữ trong đầu: nó chỉ ra giới hạn của chính cách tiếp cận Konrad.'
          },
          socra: ['Gọi một thời kỳ là “trung gian” (middle) giữa hai thời rực rỡ nói lên định kiến gì?', 'Lịch sử Việt Nam có thể chia theo khung Cổ đại – Trung đại – Cận đại không? Có gì gượng ép?', 'Nếu phương Đông đi trước, vì sao trong đầu nhiều người “phát triển” vẫn đồng nghĩa với “phương Tây”?'],
          feynman: 'Giải thích bốn đặc trưng toàn cầu của Trung thế kỷ, mỗi đặc trưng một ví dụ phương Đông và một ví dụ phương Tây.',
          essay: 'Konrad muốn phá cái nhìn lấy châu Âu làm trung tâm. Theo bạn ông làm được đến đâu, và cách làm của ông có giới hạn gì? 300–400 chữ.',
          exam: {
            points: ['Thuật ngữ do các nhà nhân văn châu Âu thế kỷ XV đặt: Cổ đại – Trung thế kỷ – Thời đại mới', 'Phê phán: phương Đông bị dồn thành “thế giới khác”', 'Konrad: Trung thế kỷ = hình thành, củng cố, thịnh vượng của phong kiến thay chiếm hữu nô lệ — quy luật toàn nhân loại', '4 đặc trưng: đế chế sụp (III–V) / dân tộc trẻ di cư / tôn giáo thế giới / khởi nghĩa nông dân', 'Niên biểu: TQ III→VIII; Trung Á – Iran III→IX–XI; châu Âu V→XV', 'Phương Đông tiên phong; tụt hậu cận đại vì phong kiến quá vững, tư bản chậm lớn'],
            qs: ['Lịch sử Việt Nam có “Trung thế kỷ” theo nghĩa của Konrad không? Đặc trưng nào khớp, đặc trưng nào không?', 'Khung “Cổ đại – Trung cổ – Cận đại” có còn hữu ích, hay chính nó cũng là một đại tự sự (nối với khoá Hậu hiện đại)?']
          },
          read: ['Konrad — Phương Tây và Phương Đông, chương “Trung thế kỷ trong khoa học lịch sử”']
        },
        {
          id: 'han-yu', short: 'Hàn Dũ', title: 'Phục hưng Đường – Tống: Hàn Dũ và phong trào Cổ văn', sub: 'Quay về cổ học, chủ nghĩa nhân đạo, Nguyên đạo, Gián Phật cốt biểu', who: 'Hàn Dũ (768–824) · “Nguyên đạo”',
          q: 'Phục hưng Ý quay về Hy – La. Phục hưng phương Đông quay về đâu — và để thoát khỏi cái gì?',
          context: '<p>Theo Konrad, giống Phục hưng Ý (XIV–XV) mượn ngọn cờ phục hồi cổ đại Hy – La, phong trào Phục hưng đời Đường – Tống phát triển dưới khẩu hiệu <b>Cổ văn</b> — quay về học thuật, văn phong thời cổ (Khổng – Mạnh), vượt qua giai đoạn Trung thế kỷ mê tín, kinh viện. Bản chất: đề cao giá trị con người — <b>chủ nghĩa nhân đạo</b> (Nhân), giải phóng tinh thần khỏi giáo điều Phật giáo và Đạo giáo thần bí.</p><p><b>Hàn Dũ</b> được Konrad coi là người mở màn. Ông dâng biểu can vua rước xương Phật (<i>Gián nghênh Phật cốt biểu</i>), bị giáng chức đi Triều Châu; viết <i>Nguyên đạo</i> đưa Nho giáo trở lại tính thế tục, định nghĩa Nhân là “bác ái”; và đề cao <i>Mạnh Tử</i>, <i>Đại học</i>, mở đường cho bộ Tứ thư thay lối học thuộc Ngũ kinh.</p>',
          text: {
            src: 'Hàn Dũ, Nguyên đạo (原道), câu mở đầu (nguyên văn, công cộng)',
            lang: 'zh-TW', orig: '博愛之謂仁，行而宜之之謂義。由是而之焉之謂道，足乎己無待於外之謂德。',
            reading: 'Bác ái chi vị nhân, hành nhi nghi chi chi vị nghĩa. Do thị nhi chi yên chi vị đạo, túc hồ kỷ vô đãi ư ngoại chi vị đức.',
            vi: 'Yêu thương rộng khắp mọi người gọi là nhân; làm điều đó cho thích đáng gọi là nghĩa. Theo đó mà đi gọi là đạo; tự mình đầy đủ, không phải chờ vào bên ngoài gọi là đức.',
            guide: ['Định nghĩa “nhân” bằng “bác ái” có gì mới so với cách hiểu nhân như một phẩm chất tu dưỡng riêng tư?', '“Không chờ vào bên ngoài” (vô đãi ư ngoại) ngầm phê phán ai? (Gợi ý: cầu phúc ở Phật, cầu tiên ở Đạo.)', 'Vì sao Konrad thấy ở Hàn Dũ tinh thần “nhân văn chủ nghĩa” tương tự các nhà nhân văn châu Âu?']
          },
          concepts: [
            { id: 'oriental-renaissance', term: 'Phục hưng phương Đông (Đường – Tống)', def: 'Luận điểm của Konrad: từ thế kỷ VIII, Trung Quốc có một phong trào Phục hưng — quay về cổ học, đề cao con người — sớm hơn châu Âu hàng thế kỷ. Phục hưng không phải đặc quyền châu Âu mà là quy luật toàn cầu.', ex: 'Hàn Dũ, Lý Bạch, Đỗ Phủ (Đường) → Chu Đôn Di, Trình Hạo, Trình Di, Chu Hy (Tống).', counter: 'Mọi sự “phục cổ” — chỉ khi nó mang nội dung nhân đạo, chống giáo điều thì mới là Phục hưng theo Konrad.', rel: ['east-lead', 'guwen', 'humanism-ren'] },
            { id: 'guwen', term: 'Phong trào Cổ văn', def: 'Khẩu hiệu quay về văn phong và học thuật cổ (thời Khổng – Mạnh), chống lối văn biền ngẫu hoa mỹ và tinh thần kinh viện; đối ứng với việc phục hồi Hy – La ở châu Âu.', ex: 'Hàn Dũ và Liễu Tông Nguyên viết tản văn giản dị, mạnh mẽ thay cho biền văn.', counter: 'Học thuộc lòng kinh điển theo chú giải có sẵn — chính là cái Cổ văn chống lại.', rel: ['oriental-renaissance'] },
            { id: 'humanism-ren', term: 'Chủ nghĩa nhân đạo (Nhân)', def: 'Đặt giá trị và phẩm giá con người vào trung tâm; với Hàn Dũ, Nhân là bác ái — yêu thương mọi người, chăm sóc người cô quả, tàn tật, ốm đau. Konrad đặt nó ngang hàng với humanism châu Âu.', ex: '“Bác ái chi vị nhân.”', counter: 'Từ bi của Phật giáo hướng tới giải thoát khỏi đời; Nhân của Hàn Dũ hướng vào đời sống xã hội thế tục.', rel: ['oriental-renaissance', 'li-xin'] },
            { id: 'buddha-bone', term: 'Gián nghênh Phật cốt biểu', def: 'Biểu năm 819 Hàn Dũ can vua Đường Hiến Tông rước xương Phật vào cung; coi Phật giáo là ngoại giáo làm hại đời sống xã hội. Ông bị giáng chức đi Triều Châu.', ex: 'Ví dụ tiêu biểu cho việc tấn công sự cuồng tín tôn giáo của triều đình.', counter: 'Phê phán một nhà sư cụ thể — đây là phê phán cả một thiết chế tôn giáo – chính trị.', rel: ['humanism-ren'] }
          ],
          arg: {
            claim: 'Phong trào Cổ văn đời Đường là một cuộc Phục hưng, tương đương Phục hưng châu Âu.',
            premises: ['Cả hai lấy ngọn cờ quay về cổ đại (Khổng – Mạnh / Hy – La) để vượt qua Trung thế kỷ.', 'Cả hai chống giáo điều tôn giáo thống trị (Phật – Đạo / Giáo hội).', 'Cả hai đề cao giá trị con người — Nhân / humanism.'],
            objection: 'Phục hưng châu Âu gắn với giai cấp tư sản đô thị và mở đường cho chủ nghĩa tư bản, còn Phục hưng Đường – Tống diễn ra trong lòng phong kiến tập quyền và không dẫn tới tư bản. Gọi chung một tên có thể khiên cưỡng.',
            reply: 'Konrad thừa nhận khác biệt môi trường (chính bảng so sánh trong ghi chép của bạn có tiêu chí này), nhưng coi điểm chung về nội dung tư tưởng — chủ nghĩa nhân đạo — là quyết định. Đọc kỹ thì thấy cả điểm giống lẫn khác đều làm rõ thêm cho nhau.'
          },
          socra: ['“Quay về cổ đại” để tiến lên — nghe như nghịch lý. Bạn giải thích thế nào?', 'Hàn Dũ phê phán Phật giáo là “ngoại giáo”. Đó là tinh thần nhân văn hay một dạng bài ngoại?', 'Định nghĩa “nhân” của Hàn Dũ còn hợp với hôm nay không?'],
          feynman: 'Giải thích vì sao Konrad gọi Hàn Dũ là người “mở màn” Phục hưng phương Đông, nêu ba việc tiêu biểu của ông.',
          essay: '“Quay về cổ đại để đi tới” — bạn nghĩ gì về nghịch lý này? Liên hệ Hàn Dũ và một ví dụ của riêng bạn. 250–350 chữ.',
          exam: {
            points: ['Phục hưng Đường – Tống: khẩu hiệu Cổ văn, quay về Khổng – Mạnh ↔ Phục hưng Ý quay về Hy – La', 'Bản chất: chủ nghĩa nhân đạo (Nhân), giải phóng khỏi giáo điều Phật – Đạo', 'Hàn Dũ (768–824) mở màn: Gián nghênh Phật cốt biểu (819) — Nguyên đạo: “Bác ái chi vị nhân” — đề cao Mạnh Tử, Đại học → nền móng Tứ thư', 'Bảng so sánh: thời điểm (VIII–XVI / XIV–XVI), đòn bẩy (Cổ văn / Hy – La), giá trị (Nhân / Humanism), môi trường (phong kiến tập quyền đô thị / tư sản đô thị)', 'Kết luận Konrad: Phục hưng là quy luật toàn cầu, phương Đông đi trước'],
            qs: ['Hàn Dũ chống Phật giáo nhân danh tinh thần nhân văn. Có thể vừa nhân văn vừa bài xích một tôn giáo không?', 'Hôm nay có phong trào nào “quay về cổ” để làm mới không?']
          },
          read: ['Hàn Dũ — Nguyên đạo; Gián nghênh Phật cốt biểu', 'Konrad — các bài về Phục hưng phương Đông']
        },
        {
          id: 'song-neo', short: 'Tống Nho', title: 'Tống Nho: Lý học Trình – Chu và Tâm học Lục – Vương', sub: 'Cách vật trí tri, trình tự đọc Tứ thư, “Tâm tức là Lý”, tri hành hợp nhất', who: 'Chu Đôn Di, Trương Tái, Trình Hạo, Trình Di, Chu Hy · Lục Tượng Sơn, Vương Dương Minh',
          q: 'Muốn hiểu chân lý, nên đi ra thế giới để nghiên cứu từng sự vật, hay quay vào lòng mình?',
          context: '<p>Đến đời Tống, Phục hưng đạt đỉnh cao triết học. Các nhà Tống Nho chống lối chú giải vụn vặt và việc biến triết học thành công cụ của quan quyền; họ tìm <b>Lý</b> — quy luật của tự nhiên và xã hội.</p><p>Anh em họ Trình rút <i>Đại học</i>, <i>Trung dung</i> ra khỏi <i>Lễ ký</i>, đặt ngang <i>Luận ngữ</i>, <i>Mạnh Tử</i>; Chu Hy biến Tứ thư thành giáo trình với trình tự đọc: <b>Đại học → Luận ngữ → Mạnh Tử → Trung dung</b>.</p><p>Tống Nho chia hai khuynh hướng: <b>Trình – Chu</b> (Lý học, hướng ngoại: “cách vật trí tri”) và <b>Lục – Vương</b> (Tâm học, hướng nội: “Tâm tức là Lý”, “tri hành hợp nhất”). Konrad cho rằng dù phương pháp ngược nhau, cả hai gặp nhau ở chủ nghĩa nhân đạo: con người ở trung tâm.</p>',
          text: {
            src: 'Đại học (大學), chương mở đầu (nguyên văn, công cộng) · kèm câu của Lục Tượng Sơn',
            lang: 'zh-TW', orig: '大學之道，在明明德，在親民，在止於至善。…欲誠其意者，先致其知；致知在格物。\n——陸九淵：六經注我，我注六經。',
            reading: 'Đại học chi đạo, tại minh minh đức, tại thân dân, tại chỉ ư chí thiện. … Dục thành kỳ ý giả, tiên trí kỳ tri; trí tri tại cách vật.\n— Lục Cửu Uyên (Tượng Sơn): Lục kinh chú ngã, ngã chú Lục kinh.',
            vi: 'Đạo của sự học lớn là ở chỗ làm sáng cái đức sáng, ở chỗ gần dân (Chu Hy đọc là “tân dân” — làm dân đổi mới), ở chỗ dừng tại chỗ chí thiện. … Muốn ý thành thực thì trước hết phải đạt tới hiểu biết; đạt tới hiểu biết là ở chỗ xét đến tận cùng sự vật.\n— Lục Tượng Sơn: Sáu kinh chú thích cho ta, ta chú thích sáu kinh (tức: kinh điển chỉ là lời minh hoạ cho cái tâm của ta).',
            guide: ['Tìm “cách vật” và “trí tri” trong nguyên văn. Chu Hy hiểu hai chữ này theo hướng nào?', 'Câu của Lục Tượng Sơn đảo ngược quan hệ giữa người đọc và kinh điển thế nào? Nó gần với tinh thần nào trong bài Hàn Dũ?', 'Vì sao Chu Hy cho đọc Đại học đầu tiên và Trung dung cuối cùng?']
          },
          concepts: [
            { id: 'li', term: 'Lý (理)', def: 'Quy luật, lẽ tự nhiên chi phối vũ trụ, vạn vật và xã hội; với Tống Nho, nhận thức Lý là mục đích của học vấn — một cách tiếp cận duy lý theo Konrad.', ex: 'Mỗi cây cỏ, mỗi quan hệ cha con đều có “lý” của nó.', counter: 'Ý chí của thần linh hay số mệnh thần bí.', rel: ['gewu', 'li-xin'] },
            { id: 'gewu', term: 'Cách vật trí tri (格物致知)', def: 'Phương pháp của Chu Hy: xét đến tận cùng từng sự vật thực tế để thu nhận tri thức, tích luỹ dần đến chỗ thông suốt Lý.', ex: 'Học từng bài, từng sự việc cụ thể rồi mới khái quát quy luật.', counter: 'Tâm học: không cần tìm bên ngoài, Lý có sẵn trong tâm.', rel: ['li', 'four-books'] },
            { id: 'four-books', term: 'Tứ thư & trình tự đọc của Chu Hy', def: 'Đại học (cương lĩnh: cách vật → trí tri → … → tu thân, tề gia, trị quốc, bình thiên hạ) → Luận ngữ (gốc rễ: Nhân) → Mạnh Tử (Nhân mở rộng vào chính trị, tính thiện) → Trung dung (bản thể luận, hoà hợp trời – người).', ex: 'Như học một ngành: đọc đề cương → nền tảng → ứng dụng → lý thuyết sâu nhất.', counter: 'Ngũ kinh học thuộc lòng theo chú giải — lối học kinh viện mà Tống Nho muốn thay.', rel: ['gewu'] },
            { id: 'li-xin', term: 'Lý học (Trình – Chu) và Tâm học (Lục – Vương)', def: 'Lý học: Lý là quy luật khách quan, phải hướng ngoại nghiên cứu sự vật. Tâm học: “Tâm tức là Lý”, chân lý có sẵn trong tâm, phải hướng nội; Vương Dương Minh phát triển thành “tri hành hợp nhất”.', ex: 'Chu Hy: đọc sách, xét vật; Vương Dương Minh: biết mà không làm thì chưa phải là biết.', counter: 'Hai phái đối lập hoàn toàn — Konrad cho rằng họ gặp nhau ở điểm tựa nhân đạo.', rel: ['li', 'humanism-ren'] }
          ],
          arg: {
            claim: 'Dù đối lập về phương pháp, Lý học và Tâm học cùng thuộc chủ nghĩa nhân đạo Phục hưng.',
            premises: ['Lý học hướng ngoại (cách vật trí tri), Tâm học hướng nội (Tâm tức là Lý) — phương pháp nhận thức ngược nhau.', 'Nhưng cả hai đều chống kinh viện, chống biến triết học thành công cụ quan quyền.', 'Và cả hai đều đặt con người — khả năng nhận thức và đạo đức của con người — vào trung tâm thế giới.'],
            objection: 'Về sau Lý học Chu Hy trở thành hệ tư tưởng chính thống của khoa cử, chính nó lại thành giáo điều kinh viện. Gọi nó là “nhân đạo, khai phóng” chỉ đúng với lúc ra đời.',
            reply: 'Đây là biện chứng mà Konrad hẳn chấp nhận: một tư tưởng tiến bộ ở thời của nó có thể thành giáo điều khi được thể chế hoá — giống chính vòng Trung – Kính – Văn của Tư Mã Thiên. Nhận ra điều này là thấy được các phần của sách nối với nhau.'
          },
          socra: ['Khi học, bạn thuộc kiểu “cách vật” (đi từ nhiều ví dụ) hay kiểu “tâm học” (tin trực giác rồi kiểm chứng)?', '“Biết mà không làm thì chưa phải là biết” — bạn đồng ý không? Cho một ví dụ trong việc học của bạn.', 'Một tư tưởng khai phóng có thể biến thành giáo điều như thế nào?'],
          feynman: 'Giải thích sự khác nhau giữa Trình – Chu và Lục – Vương bằng ví dụ “học cách viết một bài văn hay”.',
          essay: 'Bạn học theo kiểu “cách vật trí tri” hay “tâm tức là lý”? Kể lại một trải nghiệm học của mình qua lăng kính hai phái. 250–350 chữ.',
          exam: {
            points: ['Tống Nho: Chu Đôn Di, Trương Tái, Trình Hạo, Trình Di, Chu Hy', 'Chống chú giải vụn vặt và triết học phục vụ quan quyền; tìm Lý (quy luật tự nhiên & xã hội)', 'Họ Trình rút Đại học, Trung dung khỏi Lễ ký; Chu Hy: Đại học → Luận ngữ → Mạnh Tử → Trung dung', 'Trình – Chu: Lý học, cách vật trí tri (hướng ngoại)', 'Lục – Vương: Tâm học, “Tâm tức là Lý”, “Lục kinh chú ngã, ngã chú Lục kinh”, tri hành hợp nhất (hướng nội)', 'Konrad: hai phái gặp nhau ở chủ nghĩa nhân đạo; thơ ca là lực lượng báo hiệu Phục hưng đầu tiên → chuyển sang chương Ba nhà thơ'],
            qs: ['Chu Hy đề cao cách vật — vì sao Lý học về sau lại bị coi là giáo điều khoa cử?', '“Tri hành hợp nhất” có giống “học đi đôi với hành”, hay sâu hơn?']
          },
          read: ['Đại học, Trung dung (bản dịch Việt có chú Hán)', 'Vương Dương Minh — Truyền tập lục (trích)']
        }
      ]
    },
    {
      title: 'Phần III · Văn học Phục hưng: ba nhà thơ đời Đường',
      lessons: [
        {
          id: 'three-poets', short: 'Ba nhà thơ', title: 'Lý Bạch – Vương Duy – Đỗ Phủ và tám bài Thu hứng', sub: 'Tự do cá nhân, hoà hợp nội tâm, đỉnh cao nhân đạo', who: 'Lý Bạch (701–762) · Vương Duy (701–761) · Đỗ Phủ (712–770)',
          q: 'Vì sao Konrad nói thơ ca — chứ không phải triết học — mới là lực lượng báo hiệu đầu tiên của thời Phục hưng?',
          context: '<p>Konrad đối sánh ba ngọn cờ thơ Đường với các nhà thơ Phục hưng châu Âu (Dante, Petrarca):</p><p><b>Lý Bạch — Thi Tiên</b>: tiếng nói của tự do cá nhân, khẳng định cái “Tôi” đầy hứng khởi, quyền được sống và tận hưởng vẻ đẹp đời sống; Konrad đặt ông bên cạnh Petrarca. (Lý Bạch từng tự nhận mình là hậu thân của “Kim Túc Như Lai”, tức tiền kiếp của Duy-ma-cật — hình tượng cư sĩ sống giữa đời.)</p><p><b>Vương Duy — Thi Phật</b> (tên tự là Ma Cật, lấy từ Duy-ma-cật): dùng Thiền tông thế tục và thơ – hoạ để khám phá chiều sâu tâm hồn, hoà vào thiên nhiên mà không rời bỏ đời sống.</p><p><b>Đỗ Phủ — Thi Thánh</b>: đắm mình vào nỗi đau của nhân dân và vận nước trong và sau loạn An Lộc Sơn. Konrad gọi ông là nhà thơ nhân đạo theo nghĩa cao quý nhất: qua nỗi đau của đồng bào, ông thấy con người của cả nhân loại. Tám bài <b>Thu hứng</b> (viết ở Quỳ Châu, năm 766) là trọng tâm một chương của Konrad.</p>',
          text: {
            src: 'Đỗ Phủ, Thu hứng — bài 1 (秋興八首·其一), nguyên văn, công cộng',
            lang: 'zh-TW', orig: '玉露凋傷楓樹林，\n巫山巫峽氣蕭森。\n江間波浪兼天湧，\n塞上風雲接地陰。\n叢菊兩開他日淚，\n孤舟一繫故園心。\n寒衣處處催刀尺，\n白帝城高急暮砧。',
            reading: 'Ngọc lộ điêu thương phong thụ lâm,\nVu sơn Vu giáp khí tiêu sâm.\nGiang gian ba lãng kiêm thiên dũng,\nTái thượng phong vân tiếp địa âm.\nTùng cúc lưỡng khai tha nhật lệ,\nCô chu nhất hệ cố viên tâm.\nHàn y xứ xứ thôi đao xích,\nBạch Đế thành cao cấp mộ châm.',
            vi: 'Sương móc trắng như ngọc làm tàn úa rừng phong,\nNúi Vu, kẽm Vu hơi thu hiu hắt âm u.\nGiữa lòng sông, sóng tung vọt lên tận trời,\nTrên cửa ải, mây gió sa sầm xuống sát đất.\nKhóm cúc nở hai lần, giọt lệ của những ngày qua,\nChiếc thuyền lẻ loi buộc mãi một tấm lòng nhớ vườn cũ.\nKhắp nơi giục giã dao thước may áo rét,\nThành Bạch Đế cao, tiếng chày đập vải chiều dồn dập.',
            guide: ['Bốn câu đầu tả cảnh, bốn câu sau tả tình. Tìm chỗ cảnh và tình chạm vào nhau (gợi ý: “lưỡng khai”, “nhất hệ”).', 'Sóng “vọt lên trời”, mây “sa xuống đất” — không gian ấy nói gì về thời cuộc sau loạn An Lộc Sơn?', 'Nỗi nhớ quê riêng của Đỗ Phủ trở thành nỗi đau chung ở đâu trong bài? Đó có phải điều Konrad gọi là “nhân đạo theo nghĩa cao quý nhất”?']
          },
          concepts: [
            { id: 'li-bai', term: 'Lý Bạch — Thi Tiên: tự do cá nhân', def: 'Theo Konrad, Lý Bạch là sức bứt phá phá tan rào cản sáng tạo, khẳng định cái Tôi cá nhân, quyền tự do sống và tận hưởng cái đẹp; tương đương Petrarca ở Ý.', ex: '“Thiên sinh ngã tài tất hữu dụng” (Trời sinh ra ta có tài ắt có chỗ dùng) — Tương tiến tửu.', counter: 'Thơ ứng chế ca tụng vua theo khuôn phép — cái Tôi bị xoá mờ.', rel: ['wang-wei', 'du-fu', 'humanism-ren'] },
            { id: 'wang-wei', term: 'Vương Duy — Thi Phật: hoà hợp nội tâm', def: 'Dùng Thiền tông thế tục và thơ ca (“trong thơ có hoạ”) để khám phá chiều sâu tâm hồn, đưa con người hoà vào thiên nhiên mà không rời bỏ đời sống thực.', ex: '“Không sơn bất kiến nhân, đãn văn nhân ngữ hưởng” (Núi vắng không thấy người, chỉ nghe tiếng người vọng) — Lộc trại.', counter: 'Tu khổ hạnh, xuất gia lánh đời.', rel: ['li-bai', 'du-fu'] },
            { id: 'du-fu', term: 'Đỗ Phủ — Thi Thánh: nhân đạo cao quý nhất', def: 'Đắm mình vào nỗi khổ của nhân dân và số phận đất nước trong biến loạn An Lộc Sơn; qua nỗi đau đồng bào mà thấy con người toàn nhân loại.', ex: '“Chu môn tửu nhục xú, lộ hữu đống tử cốt” (Cửa son rượu thịt ôi, ngoài đường xương chết rét).', counter: 'Lãng mạn bay bổng, lấy cái Tôi làm trung tâm như Lý Bạch.', rel: ['qiuxing', 'humanism-ren'] },
            { id: 'qiuxing', term: 'Thu hứng bát thủ', def: 'Chùm 8 bài thất ngôn luật thi Đỗ Phủ viết ở Quỳ Châu năm 766: từ cảnh thu Vu sơn Vu giáp đến nỗi nhớ Trường An; nỗi buồn cá nhân hoà với nỗi đau thời loạn. Đối tượng một chương riêng trong sách của Konrad.', ex: 'Bài 1: “Tùng cúc lưỡng khai tha nhật lệ, cô chu nhất hệ cố viên tâm.”', counter: 'Thơ thu tả cảnh thuần tuý không gắn với thời thế.', rel: ['du-fu'] }
          ],
          arg: {
            claim: 'Thơ Đường là lực lượng báo hiệu đầu tiên của Phục hưng phương Đông.',
            premises: ['Phục hưng có bản chất là khẳng định giá trị con người, giải phóng cá nhân.', 'Thơ Lý Bạch (tự do cá nhân), Vương Duy (chiều sâu nội tâm), Đỗ Phủ (tình thương nhân loại) đã thể hiện đủ ba mặt của tinh thần đó ngay từ thế kỷ VIII.', 'Triết học Tống Nho chỉ hệ thống hoá tinh thần ấy về sau (thế kỷ XI–XII).'],
            objection: 'Vương Duy chịu ảnh hưởng Phật giáo sâu sắc, trong khi Phục hưng phương Đông lại được định nghĩa là chống giáo điều Phật – Đạo. Xếp ông vào đây có mâu thuẫn không?',
            reply: 'Konrad phân biệt Thiền tông thế tục (khám phá tâm hồn ngay trong đời sống) với Phật giáo giáo điều, cúng bái (thứ Hàn Dũ phê phán). Vương Duy thuộc vế trước — đó chính là mấu chốt.'
          },
          socra: ['Trong ba nhà thơ, ai gần với bạn nhất? Lý do đó nói gì về điều bạn coi trọng ở con người?', 'Nỗi buồn cá nhân trở thành “nhân đạo” khi nào?', 'So sánh Lý Bạch với Petrarca có làm ta hiểu Lý Bạch hơn, hay lại đo phương Đông bằng thước phương Tây?'],
          feynman: 'Giới thiệu ba nhà thơ trong 6 câu (mỗi người 2 câu: biệt danh + tinh thần + một câu thơ).',
          essay: 'Đọc chậm Thu hứng bài 1 và viết cảm nhận: nỗi buồn riêng của Đỗ Phủ chạm tới bạn ở đâu? Bạn có đồng ý với Konrad rằng đó là “nhân đạo theo nghĩa cao quý nhất”? 300–400 chữ.',
          exam: {
            points: ['Konrad: thơ ca là lực lượng báo hiệu đầu tiên của Phục hưng (trước triết học Tống)', 'Lý Bạch – Thi Tiên – tự do cá nhân, cái Tôi – đối sánh Petrarca', 'Vương Duy – Thi Phật – Thiền tông thế tục, hoà hợp nội tâm – thiên nhiên', 'Đỗ Phủ – Thi Thánh – nỗi đau nhân dân, loạn An Lộc Sơn – nhân đạo cao quý nhất', 'Thu hứng: 8 bài, Quỳ Châu 766; bài 1: 4 câu cảnh – 4 câu tình; “cô chu nhất hệ cố viên tâm”'],
            qs: ['Nếu chỉ được chọn một bài thơ để hiểu “Phục hưng phương Đông”, bạn chọn bài nào, của ai?', 'Thử đặt Đỗ Phủ cạnh Nguyễn Du — cả hai cùng “đau đớn lòng” trước những điều trông thấy: giống và khác ở đâu?']
          },
          read: ['Konrad — chương “Ba nhà thơ” và “Tám bài Thu hứng của Đỗ Phủ”', 'Đỗ Phủ — Thu hứng bát thủ (đọc kèm một bản dịch thơ, ví dụ bản mở đầu “Lác đác rừng phong hạt móc sa…”)']
        }
      ]
    }
  ]
};
