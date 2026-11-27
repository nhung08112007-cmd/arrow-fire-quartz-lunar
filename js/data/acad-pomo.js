/* Học viện · Hiểu Hậu hiện đại — Chữ-tchi tự biên soạn, đi theo cấu trúc 8 chương của sách “Understand Postmodernism” (Glenn Ward).
   Nội dung là lời giảng riêng; chỉ trích rất ngắn câu nổi tiếng của các nhà tư tưởng, có ghi nguồn. */
const ACAD_POMO = {
  format: 'chutchi-course@1', id: 'postmodern', field: 'Lý luận văn hoá', icon: '🌀', color: '#9fdcff',
  title: 'Hiểu Hậu hiện đại',
  desc: 'Tám bài đi theo tám chương của “Understand Postmodernism” (Glenn Ward): kiến trúc & văn chương, nghệ thuật, Baudrillard, giải cấu trúc, bản sắc, chủ thể, chính trị. Đọc sách song song, học ở đây bằng khái niệm, lập luận và đối thoại.',
  parts: [
    {
      title: 'Phần I · Hậu hiện đại là gì, và nó hiện ra ở đâu',
      lessons: [
        {
          id: 'pm-what', short: 'Khái quát', title: 'Hậu hiện đại: “sau” cái hiện đại là gì?', sub: 'Hiện đại, Khai sáng, hiện đại hoá — và tâm thế hoài nghi', who: 'Sách: Chương 1 · Postmodernisms',
          book: 'Chương 1 “Postmodernisms” — tr. 1–17 (PDF tr. 19–35)',
          q: 'Nếu “hiện đại” nghĩa là “bây giờ”, thì làm sao có thể ở “sau” bây giờ? Và bạn có thấy mình đang sống trong một thời đại khác thời của bố mẹ không?',
          context: '<p>Chữ “hậu hiện đại” tự mâu thuẫn ngay từ cái tên. Sách mở đầu bằng cách tách ba thứ hay bị lẫn: <b>hiện đại tính</b> (modernity — một thời kỳ lịch sử, từ Khai sáng thế kỷ 18, tin vào lý trí, tiến bộ, khoa học), <b>hiện đại hoá</b> (modernization — công nghiệp, đô thị, máy móc), và <b>chủ nghĩa hiện đại</b> (modernism — các trào lưu nghệ thuật đầu thế kỷ 20 muốn “làm mới”).</p><p>Hậu hiện đại vì thế có thể là: một <b>phong cách</b> trong nghệ thuật, một <b>điều kiện xã hội</b> (truyền thông đại chúng, tiêu dùng, công nghệ thông tin), hoặc một <b>cách lý thuyết hoá</b> (hoài nghi chân lý phổ quát). Ward chọn nhìn nó như một tập hợp tranh luận về việc sống trong thời nay nghĩa là gì, hơn là một “thứ” có định nghĩa gọn.</p><p>Bảy nét hay được gán cho hậu hiện đại: <b>san phẳng</b> cao – thấp, <b>tự ý thức & mỉa mai</b>, <b>trích dẫn – tham chiếu</b>, <b>chơi trên bề mặt</b>, <b>pha trộn</b>, <b>bản sắc như hình ảnh</b>, <b>phân mảnh</b>.</p>',
          text: {
            src: 'Câu định nghĩa nổi tiếng nhất về hậu hiện đại — Jean-François Lyotard, “The Postmodern Condition” (1979), trích rất ngắn',
            lang: 'en-GB', orig: 'Simplifying to the extreme, I define postmodern as incredulity toward metanarratives.',
            vi: 'Đơn giản hoá đến cùng cực, tôi định nghĩa hậu hiện đại là sự hoài nghi đối với các đại tự sự.',
            guide: ['“Đại tự sự” có thể là gì? Thử kể 2–3 câu chuyện lớn mà thời hiện đại tin (gợi ý: tiến bộ khoa học, giải phóng con người, lịch sử có mục đích).', 'Lyotard nói “hoài nghi” (incredulity), không phải “bác bỏ”. Khác nhau thế nào?', 'Theo sách, vì sao không nên tìm một định nghĩa duy nhất cho hậu hiện đại?']
          },
          concepts: [
            { id: 'modernity', term: 'Hiện đại tính (modernity)', def: 'Thời kỳ và tâm thế bắt đầu từ Khai sáng: tin rằng lý trí, khoa học và tiến bộ sẽ giải phóng con người và làm thế giới tốt dần lên.', ex: 'Niềm tin rằng học hành, khoa học, phát triển kinh tế tất yếu dẫn tới cuộc sống tốt hơn.', counter: 'Chủ nghĩa hiện đại (modernism) — đó là các phong trào nghệ thuật, không phải cả một thời kỳ xã hội.', rel: ['metanarrative', 'modernism'] },
            { id: 'modernism', term: 'Chủ nghĩa hiện đại (modernism)', def: 'Các trào lưu nghệ thuật cuối 19 – giữa 20 thế kỷ (lập thể, kiến trúc Bauhaus, Joyce, Woolf) đề cao cái mới, thử nghiệm hình thức, tính tự trị và sự nghiêm túc của nghệ thuật cao.', ex: 'Tháp kính – thép vuông vức, “bớt là nhiều” của Mies van der Rohe.', counter: 'Mọi thứ “hiện đại” theo nghĩa thường ngày (điện thoại mới) — không phải modernism.', rel: ['modernity', 'high-low'] },
            { id: 'metanarrative', term: 'Đại tự sự (metanarrative)', def: 'Câu chuyện lớn hợp thức hoá mọi tri thức và hành động bằng một mục đích chung: tiến bộ, giải phóng, khai sáng, lịch sử tiến tới một đích.', ex: '“Khoa học sẽ giải quyết mọi vấn đề của nhân loại.”', counter: 'Một câu chuyện nhỏ, cục bộ (tiểu tự sự): cách một cộng đồng tự giải thích đời mình mà không đòi đúng cho mọi người.', rel: ['modernity', 'little-narratives'] },
            { id: 'postmodernity', term: 'Hậu hiện đại tính & chủ nghĩa hậu hiện đại', def: 'Phân biệt: postmodernity là điều kiện xã hội (truyền thông, tiêu dùng, toàn cầu hoá, công nghệ thông tin); postmodernism là phong cách hoặc thái độ văn hoá – lý thuyết đáp lại điều kiện ấy.', ex: 'Sống giữa dòng ảnh, quảng cáo, mạng xã hội là postmodernity; một bộ phim cố ý ghép mảnh, mỉa mai thể loại là postmodernism.', counter: 'Một tác phẩm đơn giản ra đời sau năm 1970 — “sau” về thời gian không tự động là hậu hiện đại.', rel: ['metanarrative'] },
            { id: 'knowingness', term: 'Tự ý thức & mỉa mai (knowingness)', def: 'Thái độ “biết rằng mình đang diễn”: tác phẩm hay con người tự chỉ ra quy ước, tự giễu, nói bằng ngoặc kép.', ex: 'Meme tự châm biếm chính trend mình đang theo; nhân vật phim quay sang nói với khán giả.', counter: 'Sự chân thành ngây thơ, không chút khoảng cách với điều mình nói.', rel: ['pastiche'] }
          ],
          arg: {
            claim: 'Chúng ta đang sống trong một thời đại thực sự khác — thời hậu hiện đại.',
            premises: ['Truyền thông đại chúng, tiêu dùng và công nghệ thông tin đã thay đổi căn bản cách ta sống và trải nghiệm thế giới.', 'Những thay đổi ấy tác động tới cả những điều trừu tượng: ý nghĩa, bản sắc, cái thật.', 'Các công cụ phân tích cũ (của thời hiện đại) không còn đủ để mô tả hiện tại, nên cần từ vựng mới.'],
            objection: 'Habermas: hiện đại là “dự án dang dở”; những gì gọi là hậu hiện đại chỉ là giai đoạn muộn của chính hiện đại (Giddens gọi là “hiện đại cao độ”). Nói “sau” là phóng đại.',
            reply: 'Có thể giữ lập trường mềm: không cần một đứt gãy tuyệt đối, chỉ cần thấy tâm thế đã đổi — niềm tin vào tiến bộ phổ quát đã lung lay. Ward cũng coi hậu hiện đại là một tập tranh luận, không phải một kỷ nguyên có ngày bắt đầu rõ ràng.'
          },
          socra: ['Bạn tin vào “đại tự sự” nào? (tiến bộ, thành công nhờ cố gắng, khoa học…) Bạn có từng nghi ngờ nó không?', 'Thế hệ bạn khác thế hệ bố mẹ ở cách tin vào cái gì?', 'Hoài nghi mọi đại tự sự — đó có phải lại là một đại tự sự mới không?'],
          feynman: 'Giải thích cho bạn cùng lớp sự khác nhau giữa hiện đại tính, chủ nghĩa hiện đại và hậu hiện đại, mỗi cái một ví dụ.',
          essay: '“Hậu hiện đại là sự hoài nghi đối với các đại tự sự.” Lấy ví dụ từ đời sống Việt Nam hôm nay để ủng hộ hoặc phản bác. 200–300 chữ.',
          read: ['Sách: Introduction & Chương 1', 'Lyotard — The Postmodern Condition, phần Introduction (rất ngắn)']
        },
        {
          id: 'pm-arch-lit', short: 'Kiến trúc & văn', title: 'Kiến trúc & văn chương: cái chết của toà tháp', sub: 'Pruitt-Igoe, “less is a bore”, siêu hư cấu và cao – thấp lẫn lộn', who: 'Sách: Chương 2 · Issues in “high” and “low” culture (I)',
          book: 'Chương 2 “Architecture and literature” — tr. 18–48 (PDF tr. 36–66)',
          q: 'Một khu chung cư bị đánh sập lúc 3 giờ 32 chiều — vì sao có người coi đó là thời điểm chủ nghĩa hiện đại chết?',
          context: '<p>Kiến trúc là nơi hậu hiện đại hiện ra rõ nhất. Kiến trúc hiện đại (Le Corbusier, Mies) muốn dùng hình khối thuần lý, chức năng, không trang trí để cải tạo xã hội. Khu nhà ở xã hội Pruitt-Igoe (St. Louis) là biểu tượng: được khen khi xây, rồi xuống cấp, tội phạm, và bị đánh sập. Nhà phê bình Charles Jencks tuyên bố kiến trúc hiện đại “chết” vào ngày 15/7/1972, lúc 3:32 chiều.</p><p>Robert Venturi đáp lại câu “less is more” của Mies bằng <b>“less is a bore”</b> (bớt là chán): ông đề cao sự phức tạp, mâu thuẫn, học từ biển hiệu Las Vegas. Kiến trúc hậu hiện đại thì <b>pha trộn</b> phong cách, trích cột cổ điển, màu sắc vui, <b>mã kép</b> (vừa nói với giới chuyên môn vừa với công chúng).</p><p>Trong văn chương: <b>siêu hư cấu</b> (metafiction) tự phơi bày việc mình là truyện (Calvino, Vonnegut, John Fowles), trộn văn chương cao với thể loại bình dân (trinh thám, khoa học viễn tưởng). Ranh giới “cao – thấp” mờ đi.</p>',
          text: {
            src: 'Robert Venturi, “Complexity and Contradiction in Architecture” (1966), trích rất ngắn',
            lang: 'en-GB', orig: 'Architects can no longer afford to be intimidated by the puritanically moral language of orthodox Modern architecture. I like elements which are hybrid rather than "pure", compromising rather than "clean"… I am for messy vitality over obvious unity.',
            vi: 'Kiến trúc sư không còn có thể để mình bị doạ nạt bởi thứ ngôn ngữ đạo đức khắc khổ của kiến trúc Hiện đại chính thống. Tôi thích những yếu tố lai tạp hơn là “thuần khiết”, thoả hiệp hơn là “sạch sẽ”… Tôi chọn sức sống lộn xộn hơn là sự thống nhất hiển nhiên.',
            guide: ['Venturi gọi ngôn ngữ của kiến trúc hiện đại là “đạo đức khắc khổ”. Kiến trúc thì liên quan gì tới đạo đức?', 'Tìm một công trình ở Việt Nam pha trộn nhiều phong cách (nhà ống mái Thái, cột La Mã…). Đó là hậu hiện đại hay chỉ là… lộn xộn?', 'Theo sách, Pruitt-Igoe thất bại vì kiến trúc, hay vì chính sách xã hội? Vì sao điều đó quan trọng?']
          },
          concepts: [
            { id: 'double-coding', term: 'Mã kép (double coding)', def: 'Khái niệm của Jencks: công trình/tác phẩm hậu hiện đại nói cùng lúc với hai nhóm — giới chuyên môn (bằng trích dẫn tinh tế) và công chúng (bằng hình ảnh dễ hiểu, vui mắt).', ex: 'Phim Shrek: trẻ con cười vì truyện cổ tích, người lớn cười vì các trò nhại phim khác.', counter: 'Tác phẩm hiện đại chủ nghĩa khó hiểu, chỉ dành cho giới tinh hoa.', rel: ['high-low', 'eclecticism'] },
            { id: 'eclecticism', term: 'Chiết trung (eclecticism)', def: 'Pha trộn các phong cách, thời kỳ, nguồn gốc khác nhau trong một tác phẩm, không theo một nguyên tắc thống nhất.', ex: 'Toà nhà AT&T của Philip Johnson: thân chọc trời hiện đại, đỉnh như tủ đồ cổ thế kỷ 18.', counter: 'Phong cách nhất quán, “thuần chủng” như Bauhaus.', rel: ['pastiche', 'double-coding'] },
            { id: 'metafiction', term: 'Siêu hư cấu (metafiction)', def: 'Truyện tự ý thức mình là truyện: phơi bày quá trình kể, nói chuyện với người đọc, chơi với quy ước của chính tiểu thuyết.', ex: 'Calvino, “Nếu một đêm đông có người lữ khách”: nhân vật chính là “bạn” đang đọc cuốn sách.', counter: 'Tiểu thuyết hiện thực cố làm người đọc quên mình đang đọc truyện.', rel: ['knowingness', 'death-author'] },
            { id: 'high-low', term: 'Xoá nhoà cao – thấp', def: 'Ranh giới giữa văn hoá cao (bảo tàng, văn học kinh điển) và văn hoá đại chúng (quảng cáo, truyện tranh, nhạc pop) mất đi tính tuyệt đối; hai bên vay mượn, trộn lẫn.', ex: 'Tiểu thuyết văn chương dùng cốt truyện trinh thám; bảo tàng trưng bày thiết kế bao bì.', counter: 'Văn hoá đại chúng tồn tại song song mà không ai so với văn hoá cao — cái mới là sự trộn lẫn, không chỉ là sự tồn tại.', rel: ['modernism', 'double-coding', 'warhol'] }
          ],
          arg: {
            claim: 'Sự sụp đổ của kiến trúc hiện đại cho thấy dự án cải tạo xã hội bằng lý trí thuần tuý đã thất bại.',
            premises: ['Kiến trúc hiện đại tin rằng hình khối thuần lý, chức năng sẽ tạo ra con người và xã hội tốt hơn.', 'Những khu nhà như Pruitt-Igoe, xây đúng nguyên tắc ấy, lại xuống cấp và bị dân bỏ đi.', 'Vậy niềm tin rằng một thiết kế duy lý từ trên xuống có thể áp cho mọi người đã sai.'],
            objection: 'Pruitt-Igoe thất bại chủ yếu vì thiếu kinh phí bảo trì, phân biệt chủng tộc và chính sách nhà ở — đổ lỗi cho kiến trúc là đơn giản hoá.',
            reply: 'Có thể thu hẹp luận điểm: điều thất bại không chỉ là các bức tường mà là thái độ “kiến trúc sư biết điều tốt cho bạn” — chính thái độ ấy bỏ qua các yếu tố xã hội. Câu chuyện về “ngày chết” là một huyền thoại hữu ích hơn là sự thật lịch sử.'
          },
          socra: ['Bạn thích sống trong căn hộ tối giản trắng tinh hay ngôi nhà nhiều đồ, nhiều màu? Lựa chọn đó nói gì về quan niệm “đẹp” của bạn?', 'Một tác phẩm nói với cả hai nhóm (mã kép) có bị “nhạt” đi với mỗi nhóm không?', 'Nếu cao – thấp không còn khác nhau, thì dựa vào đâu để nói một tác phẩm hay hơn tác phẩm khác?'],
          feynman: 'Giải thích “less is more” và “less is a bore” bằng hai ví dụ trong đời sống (nhà cửa, quần áo, thiết kế app).',
          essay: 'Chọn một công trình, bộ phim hay cuốn sách bạn biết có tính “mã kép”. Phân tích hai tầng nó nói với hai nhóm người xem. 200–300 chữ.',
          read: ['Sách: Chương 2', 'Robert Venturi, Denise Scott Brown & Steven Izenour — Learning from Las Vegas']
        },
        {
          id: 'pm-art', short: 'Nghệ thuật', title: 'Nghệ thuật thị giác: Warhol và cái kết của cái mới', sub: 'Tính tự trị của nghệ thuật, chiếm dụng, nghệ thuật như hàng hoá', who: 'Sách: Chương 3 · Issues in “high” and “low” culture (II)',
          book: 'Chương 3 “Visual art” — tr. 49–71 (PDF tr. 67–89)',
          q: 'Một hộp súp Campbell trong siêu thị và một bức tranh hộp súp Campbell trong bảo tàng — cái gì làm cái sau thành nghệ thuật?',
          context: '<p>Chủ nghĩa hiện đại trong hội hoạ mang khẩu hiệu “Make it new!” (Ezra Pound): mỗi thế hệ phải vượt thế hệ trước, nghệ thuật tiến tới sự thuần khiết của chính nó. Nhà phê bình Clement Greenberg coi hội hoạ trừu tượng là đỉnh cao: nghệ thuật <b>tự trị</b>, tách khỏi đời sống thương mại và “kitsch”.</p><p>Andy Warhol phá tan điều đó: in lụa hàng loạt hộp súp, chai Coca, Marilyn Monroe; xưởng vẽ gọi là “The Factory”; nói muốn làm một cái máy. Nghệ thuật trở thành giống hàng hoá, và hàng hoá trở thành nghệ thuật.</p><p>Sau đó là các thế hệ nghệ sĩ <b>chiếm dụng</b> (appropriation): Sherrie Levine chụp lại ảnh của người khác và ký tên mình; Cindy Sherman tự chụp mình trong vai những người phụ nữ của phim ảnh không có thật. Câu hỏi về tính độc đáo, tác giả và “cái mới” bị đặt lại.</p>',
          text: {
            src: 'Andy Warhol, phỏng vấn trên tạp chí ARTnews (1963), trích rất ngắn',
            lang: 'en-GB', orig: 'The reason I\'m painting this way is that I want to be a machine.',
            vi: 'Lý do tôi vẽ theo cách này là vì tôi muốn trở thành một cái máy.',
            guide: ['Vì sao một hoạ sĩ lại muốn “trở thành một cái máy”? Câu này đả kích ai?', 'Nghệ thuật “tự trị” theo Greenberg là gì? Warhol vi phạm nó ở điểm nào?', 'Sherrie Levine chụp lại ảnh của Walker Evans. Đó là đạo nhái hay nghệ thuật? Dựa vào tiêu chí nào?']
          },
          concepts: [
            { id: 'autonomy-art', term: 'Tính tự trị của nghệ thuật', def: 'Quan niệm (Greenberg, chủ nghĩa hiện đại) rằng nghệ thuật có giá trị tự thân, tách khỏi đời sống, thương mại và mục đích thực dụng; mỗi môn tự khám phá bản chất riêng.', ex: 'Hội hoạ trừu tượng chỉ còn màu và mặt phẳng — “hội hoạ về chính hội hoạ”.', counter: 'Tranh quảng cáo, tranh cổ động — phục vụ mục đích bên ngoài.', rel: ['warhol', 'new'] },
            { id: 'new', term: 'Huyền thoại cái mới (avant-garde)', def: 'Niềm tin hiện đại rằng nghệ thuật tiến bộ bằng cách liên tục phá bỏ cái cũ; tiền phong là người đi trước thời đại.', ex: 'Ấn tượng → Lập thể → Trừu tượng: mỗi trào lưu tự coi là bước tiến tiếp theo.', counter: 'Hậu hiện đại tái chế, trích dẫn cái cũ mà không cần “vượt” nó.', rel: ['autonomy-art', 'pastiche'] },
            { id: 'warhol', term: 'Nghệ thuật như hàng hoá (Pop Art)', def: 'Pop Art dùng hình ảnh và kỹ thuật sản xuất hàng loạt của văn hoá tiêu dùng, xoá ranh giới giữa tác phẩm nghệ thuật và sản phẩm.', ex: 'Warhol in hàng chục Marilyn giống nhau, như tem dán trên kệ hàng.', counter: 'Tranh độc bản thể hiện “tâm hồn” cá nhân của nghệ sĩ (Biểu hiện trừu tượng).', rel: ['high-low', 'simulacrum'] },
            { id: 'appropriation', term: 'Chiếm dụng (appropriation)', def: 'Lấy hình ảnh, đồ vật có sẵn của người khác và đặt vào bối cảnh mới để tạo nghĩa mới, thách thức khái niệm độc đáo và quyền tác giả.', ex: 'Levine chụp lại ảnh nổi tiếng; meme dùng ảnh phim với chữ mới.', counter: 'Sao chép để bán như hàng thật — không đặt vào bối cảnh mới để đặt câu hỏi.', rel: ['death-author', 'pastiche'] }
          ],
          arg: {
            claim: 'Sau Warhol, “cái mới” không còn là thước đo giá trị của nghệ thuật.',
            premises: ['Chủ nghĩa hiện đại đo giá trị nghệ thuật bằng sự đổi mới và tính thuần khiết, tách khỏi đời sống thương mại.', 'Warhol đưa thẳng hàng hoá, sự lặp lại và sản xuất máy móc vào nghệ thuật — và được công nhận.', 'Khi lặp lại và sao chép cũng có thể là nghệ thuật, thì tiêu chí “mới” và “độc đáo” mất vị trí trung tâm.'],
            objection: 'Chính Warhol lại cực kỳ “mới” vào năm 1962; hậu hiện đại chỉ thay một kiểu cái mới bằng kiểu khác. Và thị trường nghệ thuật vẫn săn lùng “cái mới” hơn bao giờ hết.',
            reply: 'Đây là nghịch lý mà sách nêu: hậu hiện đại vừa phủ nhận cái mới vừa bị đóng gói thành xu hướng mới. Có thể nói cái mới không biến mất, nhưng mất vai trò “tiến bộ lịch sử” — nó chỉ còn là thời trang.'
          },
          socra: ['Nếu AI vẽ được tranh y như của một hoạ sĩ, bức tranh ấy có giá trị gì? Câu hỏi này khác gì câu hỏi về Warhol?', 'Bạn có từng mua thứ gì vì “bao bì đẹp như tác phẩm nghệ thuật” không?', 'Có nên coi meme là một dạng nghệ thuật chiếm dụng không?'],
          feynman: 'Giải thích cho một người hay nói “cái này ai chả làm được” vì sao tranh hộp súp của Warhol lại quan trọng trong lịch sử nghệ thuật.',
          essay: 'Chiếm dụng trong thời mạng xã hội (meme, remix, AI) có còn là hành động phê phán như với Levine không? 200–300 chữ.',
          read: ['Sách: Chương 3', 'Cindy Sherman — loạt ảnh Untitled Film Stills (1977–80)']
        }
      ]
    },
    {
      title: 'Phần II · Cái thật, ý nghĩa và chủ thể',
      lessons: [
        {
          id: 'pm-real', short: 'Baudrillard', title: 'Baudrillard: sự biến mất của cái thật', sub: 'Truyền hình, mô phỏng, simulacra và siêu thực', who: 'Sách: Chương 4 · The loss of the real',
          book: 'Chương 4 “The loss of the real” — tr. 72–113 (PDF tr. 90–131)',
          q: 'Bạn chắc chắn có một thế giới thật đằng sau các hình ảnh trên màn hình. Nhưng nếu phần lớn những gì bạn biết về thế giới đến từ màn hình thì sao?',
          context: '<p>Truyền hình (và nay là mạng xã hội) không chỉ phản ánh thế giới — nó định hình điều gì được coi là sự kiện. Jean Baudrillard đẩy ý này tới cực đoan: trong xã hội tiêu dùng – truyền thông, ký hiệu không còn trỏ tới thực tại nữa mà trỏ tới các ký hiệu khác.</p><p>Ông mô tả bốn giai đoạn của hình ảnh: (1) phản ánh thực tại; (2) che giấu, bóp méo thực tại; (3) che giấu sự <b>vắng mặt</b> của thực tại; (4) không còn liên hệ gì với thực tại — thành <b>simulacrum</b> thuần tuý. Kết quả là <b>siêu thực</b> (hyperreal): “thật hơn cả thật”, như Disneyland — một nước Mỹ tưởng tượng để ta tin rằng phần còn lại là thật.</p><p>Tiểu luận gây sốc nhất: “Chiến tranh vùng Vịnh đã không xảy ra” (1991) — không phủ nhận có người chết, mà nói rằng cuộc chiến mà công chúng phương Tây “trải nghiệm” là một sự kiện truyền hình được dàn dựng.</p>',
          text: {
            src: 'Jean Baudrillard, “Simulacra and Simulation” (1981), trích rất ngắn',
            lang: 'en-GB', orig: 'Simulation is no longer that of a territory, a referential being, or a substance. It is the generation by models of a real without origin or reality: a hyperreal.',
            vi: 'Mô phỏng không còn là mô phỏng một lãnh thổ, một thực thể quy chiếu hay một bản chất. Đó là việc các mô hình sinh ra một cái thật không có nguồn gốc hay thực tại: một siêu thực.',
            guide: ['“Lãnh thổ” và “bản đồ” ở đây ẩn dụ cho gì? (Gợi ý: truyện của Borges về tấm bản đồ to bằng đế chế.)', 'Cho một ví dụ trong đời bạn về một “bản sao không có bản gốc”.', 'Sách nêu những ảnh hưởng nào lên Baudrillard (Marx, McLuhan, ký hiệu học…)? Ông khác họ ở đâu?']
          },
          concepts: [
            { id: 'simulacrum', term: 'Simulacrum (bản sao không bản gốc)', def: 'Hình ảnh/ký hiệu không còn sao chép một thực tại có trước, mà tự tồn tại và được coi như thật.', ex: 'Ảnh “sống ảo” đã chỉnh sửa trở thành chuẩn mực cho “gương mặt đẹp”, dù không gương mặt thật nào như vậy.', counter: 'Một bức ảnh thẻ chụp đúng người — có bản gốc rõ ràng.', rel: ['hyperreal', 'warhol'] },
            { id: 'hyperreal', term: 'Siêu thực (hyperreality)', def: 'Tình trạng mà mô phỏng trở nên thật hơn cả thật, đến mức không phân biệt được hoặc không cần phân biệt thật – giả.', ex: 'Khu du lịch “phố cổ châu Âu” dựng mới, sạch đẹp hơn phố cổ thật.', counter: 'Ảo giác nhất thời mà ta biết rõ là giả (xem ảo thuật).', rel: ['simulacrum', 'media-event'] },
            { id: 'orders', term: 'Bốn giai đoạn của hình ảnh', def: 'Hình ảnh (1) phản ánh thực tại → (2) che giấu/bóp méo thực tại → (3) che giấu sự vắng mặt của thực tại → (4) không liên hệ gì với thực tại.', ex: '(1) ảnh tư liệu; (2) ảnh tuyên truyền; (3) Disneyland; (4) nhân vật ảo/idol ảo có triệu fan.', counter: 'Chia theo chất lượng kỹ thuật ảnh (mờ → nét) — không phải ý Baudrillard.', rel: ['simulacrum'] },
            { id: 'media-event', term: 'Sự kiện truyền thông', def: 'Sự kiện được cấu trúc, dàn dựng và tiếp nhận chủ yếu qua màn hình, đến mức “cái đã xảy ra” với công chúng chính là phiên bản truyền thông.', ex: 'Một vụ việc “nổ” trên mạng: ai cũng có ý kiến dựa trên clip 30 giây.', counter: 'Sự việc ta trực tiếp trải qua (cơn bão nhà mình).', rel: ['hyperreal'] }
          ],
          arg: {
            claim: 'Trong xã hội truyền thông, ta không còn tiếp cận được “cái thật” — chỉ còn các mô phỏng.',
            premises: ['Phần lớn hiểu biết của ta về thế giới đến qua hình ảnh và ký hiệu do truyền thông tạo ra.', 'Các hình ảnh ấy ngày càng tham chiếu tới nhau hơn là tới thực tại bên ngoài.', 'Khi không còn điểm quy chiếu độc lập, ranh giới giữa thật và giả mất ý nghĩa.'],
            objection: 'Christopher Norris và nhiều người phê phán: nói “chiến tranh không xảy ra” là vô trách nhiệm với nạn nhân thật; cái thật vẫn đó (đau đớn, cái chết), và vẫn kiểm chứng được bằng báo chí, nhân chứng.',
            reply: 'Đọc thiện ý: Baudrillard cố tình phóng đại (khiêu khích) để chỉ ra cách truyền thông thay thế trải nghiệm. Nhưng phê phán vẫn đúng ở chỗ: nếu bỏ hẳn khái niệm sự thật, ta mất luôn công cụ để phê phán chính sự dàn dựng ấy.'
          },
          socra: ['Bạn biết về một nơi chưa từng đến (Paris, Seoul) chủ yếu qua đâu? Khi đến thật, bạn so nó với cái gì?', 'Nếu không phân biệt được thật – giả, thì có cần phân biệt không? Vì sao?', 'Lời của Baudrillard có giúp gì cho việc chống tin giả, hay làm nó khó hơn?'],
          feynman: 'Giải thích “simulacrum” và “siêu thực” bằng ví dụ filter làm đẹp và ảnh du lịch trên mạng.',
          essay: '“Chiến tranh vùng Vịnh đã không xảy ra.” Đây là một luận điểm sâu sắc hay vô trách nhiệm? Trình bày cả hai phía và lập trường của bạn. 250–350 chữ.',
          read: ['Sách: Chương 4', 'Borges — truyện cực ngắn “Về sự chính xác trong khoa học” (tấm bản đồ)', 'Phim The Truman Show (1998)']
        },
        {
          id: 'pm-decon', short: 'Giải cấu trúc', title: 'Giải cấu trúc: ý nghĩa không bao giờ dừng lại', sub: 'Saussure, Barthes, Derrida — cái chết của tác giả', who: 'Sách: Chương 5 · The deconstruction of meaning',
          book: 'Chương 5 “The deconstruction of meaning” — tr. 114–151 (PDF tr. 132–169)',
          q: 'Khi bạn đọc một bài thơ, ý nghĩa nằm ở đâu — trong đầu nhà thơ, trên trang giấy, hay trong đầu bạn?',
          context: '<p><b>Chủ nghĩa cấu trúc</b> bắt đầu từ nhà ngôn ngữ học Saussure: ký hiệu gồm <b>cái biểu đạt</b> (âm/chữ) và <b>cái được biểu đạt</b> (khái niệm), nối với nhau một cách võ đoán; nghĩa của một từ đến từ <b>khác biệt</b> với các từ khác trong hệ thống, không từ sự vật. Roland Barthes áp dụng vào văn hoá đại chúng: quảng cáo, đấu vật, thời trang đều là hệ thống ký hiệu và “huyền thoại”.</p><p><b>Hậu cấu trúc</b> đẩy xa hơn: nếu nghĩa chỉ đến từ khác biệt, thì nó không bao giờ “dừng” ở một điểm cố định — mỗi ký hiệu dẫn tới ký hiệu khác, vô tận. Derrida gọi đó là <b>différance</b> (vừa khác biệt, vừa trì hoãn). <b>Giải cấu trúc</b> là cách đọc tìm ra những cặp đối lập (nói/viết, nam/nữ, lý trí/cảm xúc) mà văn bản ngầm đặt một bên cao hơn, rồi cho thấy chúng tự lật đổ nhau.</p><p>Barthes tuyên bố “cái chết của tác giả”: ý định tác giả không phải chìa khoá duy nhất; nghĩa được tạo ra ở người đọc.</p>',
          text: {
            src: 'Roland Barthes, “The Death of the Author” (1967), câu kết, trích rất ngắn',
            lang: 'en-GB', orig: 'The birth of the reader must be at the cost of the death of the Author.',
            vi: 'Sự ra đời của người đọc phải trả giá bằng cái chết của Tác giả.',
            guide: ['Vì sao chữ “Tác giả” được viết hoa? Barthes muốn “giết” ai — con người thật, hay một quan niệm?', 'Theo sách, “cái biểu đạt” và “cái được biểu đạt” khác nhau thế nào? Cho ví dụ bằng tiếng Việt và tiếng Anh cho cùng một khái niệm.', 'Giải cấu trúc có phải là “phá huỷ” văn bản không? Sách trả lời ra sao?']
          },
          concepts: [
            { id: 'sign', term: 'Ký hiệu: biểu đạt / được biểu đạt', def: 'Theo Saussure, ký hiệu gồm cái biểu đạt (hình thức: âm, chữ) và cái được biểu đạt (khái niệm); quan hệ giữa chúng là võ đoán, do quy ước.', ex: '“Cây”, “tree”, “木” — ba cái biểu đạt khác nhau cho cùng một khái niệm.', counter: 'Từ tượng thanh (“ầm”, “meo”) — ít võ đoán hơn, nhưng vẫn khác nhau giữa các ngôn ngữ.', rel: ['difference', 'myth'] },
            { id: 'difference', term: 'Nghĩa do khác biệt (différance)', def: 'Nghĩa của một ký hiệu đến từ chỗ nó khác các ký hiệu khác; với Derrida, nghĩa vì thế luôn bị trì hoãn, không bao giờ hiện diện trọn vẹn.', ex: 'Tra từ điển: mỗi định nghĩa lại dẫn sang những từ khác cần tra tiếp.', counter: 'Quan niệm “mỗi từ dán nhãn cho một vật” — nghĩa nằm sẵn trong sự vật.', rel: ['sign', 'deconstruction'] },
            { id: 'deconstruction', term: 'Giải cấu trúc', def: 'Cách đọc chỉ ra các cặp đối lập thứ bậc ngầm trong văn bản (A cao hơn B) và cho thấy văn bản tự làm lung lay chính thứ bậc ấy.', ex: 'Đọc một truyện đề cao “lý trí” và tìm ra những chỗ chính nhân vật lý trí lại hành động vì cảm xúc.', counter: 'Phá huỷ, bác bỏ văn bản; hay đọc tuỳ tiện kiểu “muốn hiểu sao cũng được”.', rel: ['difference', 'binary'] },
            { id: 'binary', term: 'Cặp đối lập nhị nguyên', def: 'Các cặp khái niệm (nói/viết, tự nhiên/văn hoá, nam/nữ, phương Tây/phương Đông) mà tư duy phương Tây thường xếp một bên cao hơn.', ex: '“Văn minh / man rợ” trong văn học thuộc địa.', counter: 'Phân loại trung tính không hàm ý hơn kém (chẵn / lẻ).', rel: ['deconstruction', 'orientalism'] },
            { id: 'death-author', term: 'Cái chết của tác giả', def: 'Luận điểm của Barthes: ý định của tác giả không khoá nghĩa của văn bản; văn bản là tấm dệt các trích dẫn, và nghĩa được tạo ra nơi người đọc.', ex: 'Một bài hát chia tay được người nghe dùng để nói về nỗi nhớ quê — nghĩa đó cũng “thật”.', counter: 'Đọc văn bản pháp luật: ý định nhà làm luật vẫn rất quan trọng.', rel: ['metafiction', 'appropriation'] },
            { id: 'myth', term: 'Huyền thoại (Barthes)', def: 'Tầng nghĩa thứ hai khiến một giá trị văn hoá, lịch sử trông như tự nhiên, hiển nhiên.', ex: 'Quảng cáo sữa với đồng cỏ xanh: “sữa = tự nhiên = tốt cho con” như một sự thật hiển nhiên.', counter: 'Nghĩa đen của bức ảnh (một con bò trên cỏ).', rel: ['sign'] }
          ],
          arg: {
            claim: 'Không có một nghĩa duy nhất, cố định của văn bản.',
            premises: ['Nghĩa của ký hiệu đến từ khác biệt với các ký hiệu khác, không từ một điểm cố định bên ngoài ngôn ngữ.', 'Hệ thống khác biệt ấy mở, liên tục thay đổi theo bối cảnh và người đọc.', 'Ý định tác giả cũng chỉ được biết qua ngôn ngữ, nên không thể là điểm neo tuyệt đối.'],
            objection: 'Nếu nghĩa không bao giờ cố định, sao ta vẫn hiểu nhau hằng ngày? Và chính các bài viết của Derrida cũng mong được hiểu đúng (Searle và nhiều nhà phê bình khác nêu ý này).',
            reply: 'Giải cấu trúc không nói ta không hiểu được gì, mà nói sự hiểu luôn dựa vào bối cảnh và luôn có phần dư thừa, bất ổn. Giao tiếp hằng ngày “đủ ổn” vì bối cảnh ổn định; văn chương và triết học là nơi phần bất ổn lộ ra.'
          },
          socra: ['Bài hát hay bài thơ nào bạn hiểu khác hẳn ý tác giả? Cách hiểu của bạn có “sai” không?', 'Nếu mọi cách đọc đều hợp lệ, thì làm bài văn phân tích còn có đúng – sai không?', 'Hãy tìm một cặp đối lập trong cách bạn nói về bản thân (ví dụ: lý trí/cảm xúc). Bên nào bạn ngầm đề cao?'],
          feynman: 'Giải thích “cái chết của tác giả” cho một bạn học văn đang quen phân tích “tác giả muốn gửi gắm…”, kèm một ví dụ.',
          essay: 'Ý định của tác giả có nên là thước đo cuối cùng để hiểu một tác phẩm không? Lấy một tác phẩm văn học bạn đang học làm ví dụ. 250–350 chữ.',
          read: ['Sách: Chương 5', 'Roland Barthes — Mythologies (các tiểu luận ngắn về văn hoá đại chúng)']
        },
        {
          id: 'pm-identity', short: 'Bản sắc', title: 'Bản sắc hậu hiện đại: cái tôi như một bộ sưu tập', sub: 'Phong cách sống, đô thị, cyborg, Madonna và mặt nạ', who: 'Sách: Chương 6 · Postmodern identities (I)',
          book: 'Chương 6 “Transformations of the self” — tr. 152–180 (PDF tr. 170–198)',
          q: 'Bạn trên mạng, bạn ở nhà, bạn ở trường — ai mới là “bạn thật”? Và có nhất thiết phải có một “bạn thật” không?',
          context: '<p>Quan niệm hiện đại: mỗi người có một cái tôi bền vững, bên trong, cần được “tìm thấy” và “thể hiện”. Hậu hiện đại thay “cái tôi” bằng <b>bản sắc</b> — thứ được tạo dựng, trình diễn, thay đổi.</p><p>Sách đi qua: <b>phong cách sống</b> (ta định nghĩa mình bằng tiêu dùng, gu, thương hiệu), <b>bản sắc đô thị</b> (người dạo chơi, đám đông vô danh), <b>cyberpeople</b> (Donna Haraway: cyborg làm mờ ranh giới người – máy, tự nhiên – nhân tạo), và <b>Madonna</b> như ví dụ điển hình: liên tục tái tạo hình ảnh, chơi với các mặt nạ nữ tính.</p><p>Câu hỏi trung tâm: nếu bản sắc là trình diễn, đó là <b>tự do</b> (ta tự chọn mình là ai) hay <b>cái bẫy</b> của thị trường (ta chỉ chọn giữa các hình ảnh được bán sẵn)?</p>',
          text: {
            src: 'Donna Haraway, “A Cyborg Manifesto” (1985), trích rất ngắn',
            lang: 'en-GB', orig: 'By the late twentieth century, our time, a mythic time, we are all chimeras, theorized and fabricated hybrids of machine and organism; in short, we are cyborgs.',
            vi: 'Đến cuối thế kỷ hai mươi, thời của chúng ta, một thời huyền thoại, tất cả chúng ta đều là quái thể lai ghép, những dạng lai giữa máy móc và sinh vật được lý thuyết hoá và chế tạo ra; tóm lại, chúng ta là cyborg.',
            guide: ['Bạn “là cyborg” theo nghĩa nào? Liệt kê những thứ máy móc đã thành một phần của cơ thể và trí nhớ của bạn.', 'Haraway gọi đó là “huyền thoại”. Vì sao bà lại thấy cyborg là hình ảnh giải phóng (đặc biệt với nữ giới)?', 'Theo sách, Madonna minh hoạ ý “bản sắc như mặt nạ” thế nào? Có thể thay bằng ví dụ ca sĩ nào hôm nay?']
          },
          concepts: [
            { id: 'identity-construct', term: 'Bản sắc như kiến tạo', def: 'Bản sắc không phải bản chất có sẵn bên trong mà được tạo dựng qua ngôn ngữ, văn hoá, lựa chọn và sự nhìn nhận của người khác.', ex: 'Một người “trở thành” dân văn phòng qua cách ăn mặc, nói chuyện, đồ dùng.', counter: 'Quan niệm “mình sinh ra đã là người như thế” — bản chất cố định.', rel: ['performativity', 'decentred'] },
            { id: 'lifestyle', term: 'Phong cách sống & tiêu dùng', def: 'Định nghĩa bản thân qua gu tiêu dùng, thương hiệu, sở thích — “tôi là thứ tôi mua và trưng ra”.', ex: '“Aesthetic” trên Instagram: cà phê, sách, máy ảnh film như một bản sắc.', counter: 'Bản sắc dựa vào giai cấp, quê quán, nghề cha truyền con nối.', rel: ['identity-construct', 'simulacrum'] },
            { id: 'cyborg', term: 'Cyborg (Haraway)', def: 'Hình ảnh lai ghép người – máy dùng để phá các ranh giới cứng (tự nhiên/nhân tạo, người/máy, nam/nữ) và tưởng tượng những bản sắc không cố định.', ex: 'Điện thoại như “trí nhớ ngoài”; người dùng chân giả thi đấu thể thao.', counter: 'Robot trong phim khoa học viễn tưởng thuần tuý — Haraway nói về chính con người hôm nay.', rel: ['binary', 'identity-construct'] },
            { id: 'performativity', term: 'Tính trình diễn (performativity)', def: 'Ý (phát triển bởi Judith Butler) rằng các bản sắc như giới được tạo ra qua việc lặp đi lặp lại các hành vi, cử chỉ — không có “bản gốc” đứng đằng sau màn trình diễn.', ex: 'Cách “ngồi cho ra dáng con gái” được học và lặp lại hằng ngày.', counter: 'Diễn kịch có ý thức (đóng vai rồi về nhà làm chính mình) — trình diễn ở đây là không có “hậu trường”.', rel: ['identity-construct', 'masquerade'] },
            { id: 'masquerade', term: 'Mặt nạ nữ tính (masquerade)', def: 'Ý (từ Joan Riviere) rằng nữ tính có thể là một chiếc mặt nạ được đeo; nếu phô ra nó như mặt nạ, người ta có thể chơi với và phê phán nó.', ex: 'Madonna liên tục đổi hình ảnh: cô dâu, Marilyn, nữ tu, người tình — không cái nào là “thật”.', counter: 'Trang điểm hằng ngày đơn thuần không có ý châm biếm hay phơi bày quy ước.', rel: ['performativity'] }
          ],
          arg: {
            claim: 'Bản sắc linh hoạt, tự tạo dựng là một dạng tự do.',
            premises: ['Nếu không có cái tôi bản chất cố định, ta không bị giam trong một vai do gia đình, giới tính hay xã hội định sẵn.', 'Ta có thể thử, chọn, phối các mảnh văn hoá để tạo hình mình.', 'Khả năng tự định hình chính là tự do.'],
            objection: 'Các lựa chọn ấy phần lớn do thị trường và thuật toán bày sẵn; “tự do chọn bản sắc” thực ra là tự do chọn giữa các gói hàng. Và không phải ai cũng đủ tiền, đủ quyền để “chơi” với bản sắc (giai cấp, chủng tộc vẫn cố định với nhiều người).',
            reply: 'Có thể phân biệt: bản sắc là kiến tạo (điều đó đúng), nhưng tự do kiến tạo được phân phối không đều. Phê phán vì thế không bác bỏ ý tưởng, mà buộc ta hỏi “ai được tự do kiến tạo, và trong giới hạn của ai?”.'
          },
          socra: ['Bạn có một “phiên bản” nào của mình chỉ xuất hiện trên mạng không? Nó kém thật hơn bạn ngoài đời ở chỗ nào?', 'Nếu bản sắc là trình diễn, thì “sống thật với bản thân” còn nghĩa là gì?', 'Bạn chọn gu thẩm mỹ của mình, hay thuật toán chọn giúp bạn?'],
          feynman: 'Giải thích khác biệt giữa “cái tôi” kiểu hiện đại và “bản sắc” kiểu hậu hiện đại bằng ví dụ hồ sơ mạng xã hội.',
          essay: '“Tôi là những gì tôi đăng.” Đồng ý hay phản đối? Dùng ít nhất hai khái niệm trong bài. 250–350 chữ.',
          read: ['Sách: Chương 6', 'Donna Haraway — A Cyborg Manifesto (đoạn đầu)']
        },
        {
          id: 'pm-subject', short: 'Chủ thể', title: 'Chủ thể bị phân tán: Foucault & Lacan', sub: '“Con người” là một phát minh, quyền lực – tri thức, giai đoạn gương', who: 'Sách: Chương 7 · Postmodern identities (II)',
          book: 'Chương 7 “Theories of subjectivity” — tr. 181–216 (PDF tr. 199–234)',
          q: 'Bạn nghĩ mình tự do suy nghĩ. Nhưng những phạm trù bạn dùng để nghĩ về chính mình — “bình thường”, “lệch lạc”, “khoẻ mạnh tâm lý” — từ đâu mà có?',
          context: '<p>Chương 6 nói về bản sắc trong đời sống; chương 7 đi vào lý thuyết về <b>chủ thể</b> — câu hỏi “cái tôi” được hình thành thế nào.</p><p><b>Michel Foucault</b>: “con người” như đối tượng của khoa học (tâm lý học, y học, tội phạm học) là phát minh gần đây. Tri thức và <b>quyền lực</b> gắn chặt: các ngành khoa học phân loại ai là bình thường, ai bất thường, và qua đó điều khiển hành vi. Mô hình <b>nhà tù toàn cảnh</b> (panopticon): khi biết mình có thể bị nhìn, ta tự kỷ luật. Trong lịch sử tính dục, ông cho thấy xã hội không “đàn áp” tình dục mà liên tục bắt ta <b>nói</b> về nó, phân loại nó.</p><p><b>Jacques Lacan</b> (đọc lại Freud qua ngôn ngữ): đứa trẻ hình thành cái tôi ở <b>giai đoạn gương</b> — nhận ra mình qua một hình ảnh bên ngoài, toàn vẹn hơn cảm giác rời rạc bên trong. Cái tôi vì thế ngay từ đầu là một ảo ảnh, và chủ thể bị chia tách bởi ngôn ngữ và vô thức.</p>',
          text: {
            src: 'Michel Foucault, “The Order of Things” (1966), câu kết, trích rất ngắn',
            lang: 'en-GB', orig: 'As the archaeology of our thought easily shows, man is an invention of recent date. And one perhaps nearing its end… man would be erased, like a face drawn in sand at the edge of the sea.',
            vi: 'Như khảo cổ học về tư tưởng của chúng ta dễ dàng cho thấy, con người là một phát minh có niên đại gần đây. Và có lẽ là một phát minh sắp đến hồi kết… con người sẽ bị xoá đi, như một gương mặt vẽ trên cát ở mép biển.',
            guide: ['Foucault không nói con người sinh học mới xuất hiện. “Con người” ở đây là gì?', 'Hình ảnh “gương mặt vẽ trên cát” gợi điều gì về bản chất của các khái niệm?', 'Theo sách, panopticon liên quan gì tới đời sống hôm nay (camera, mạng xã hội, điểm tín dụng)?']
          },
          concepts: [
            { id: 'power-knowledge', term: 'Quyền lực – tri thức', def: 'Foucault: tri thức không trung lập; các ngành khoa học về con người tạo ra phạm trù (bình thường/bất thường) và nhờ đó thực thi quyền lực; quyền lực lại sản sinh tri thức mới.', ex: 'Khái niệm “trẻ tăng động” giúp chăm sóc trẻ tốt hơn, nhưng cũng là công cụ phân loại và quản lý.', counter: 'Quyền lực kiểu vua ra lệnh, cấm đoán từ trên xuống — Foucault quan tâm quyền lực lan toả, sản sinh.', rel: ['panopticon', 'discourse'] },
            { id: 'panopticon', term: 'Panopticon & tự kỷ luật', def: 'Mô hình nhà tù có tháp canh nhìn thấy mọi phòng; tù nhân không biết khi nào bị nhìn nên tự giám sát mình. Foucault dùng nó để mô tả xã hội kỷ luật hiện đại.', ex: 'Tự chỉnh hành vi vì biết lớp học có camera, hay vì “mọi người sẽ thấy trên story”.', counter: 'Bị giám sát nhưng không hề biết (nên không tự điều chỉnh).', rel: ['power-knowledge'] },
            { id: 'discourse', term: 'Diễn ngôn (discourse)', def: 'Hệ thống cách nói, khái niệm, quy tắc xác định điều gì có thể nghĩ và nói một cách “có nghĩa” về một đề tài trong một thời kỳ.', ex: 'Diễn ngôn y khoa về “sức khoẻ tinh thần” thay cho cách nói “bị ma làm” ngày xưa.', counter: 'Một bài phát biểu đơn lẻ — diễn ngôn là cả hệ thống quy tắc đứng sau nhiều phát ngôn.', rel: ['power-knowledge', 'metanarrative'] },
            { id: 'mirror-stage', term: 'Giai đoạn gương (Lacan)', def: 'Khoảnh khắc đứa trẻ nhận ra mình trong gương như một hình ảnh toàn vẹn; cái tôi hình thành từ một hình ảnh bên ngoài, nên luôn mang tính ảo tưởng và xa lạ với chính mình.', ex: 'Cảm giác “đó không phải mình” khi nghe lại giọng mình trong ghi âm.', counter: 'Tự nhận thức qua suy ngẫm nội tâm thuần lý (kiểu cogito của Descartes).', rel: ['decentred'] },
            { id: 'decentred', term: 'Chủ thể bị phi trung tâm', def: 'Chủ thể không còn là trung tâm tự chủ, minh bạch của ý nghĩa (như cogito của Descartes); nó được tạo thành bởi ngôn ngữ, vô thức, diễn ngôn và quyền lực.', ex: 'Nhiều mong muốn “của mình” thật ra học từ gia đình, quảng cáo, văn hoá.', counter: 'Chủ thể Khai sáng: lý trí tự chủ, biết rõ mình muốn gì.', rel: ['mirror-stage', 'identity-construct'] }
          ],
          arg: {
            claim: 'Chủ thể không phải nguồn gốc tự do của ý nghĩa, mà là sản phẩm của ngôn ngữ và quyền lực.',
            premises: ['Ta chỉ có thể nghĩ về mình bằng các phạm trù, ngôn ngữ có sẵn trong xã hội.', 'Các phạm trù ấy do các diễn ngôn (y học, tâm lý, luật pháp) tạo ra và gắn với quyền lực.', 'Vậy cái tôi được tạo hình từ bên ngoài trước khi nó có thể “tự chọn”.'],
            objection: 'Nếu chủ thể chỉ là sản phẩm của quyền lực, thì lấy đâu ra khả năng phản kháng? Và lấy đâu ra trách nhiệm đạo đức? (Habermas, nhiều nhà nữ quyền và nhà phê bình mácxít đã hỏi Foucault điều này.)',
            reply: 'Foucault về sau nói: nơi nào có quyền lực, nơi đó có phản kháng, và giai đoạn cuối ông bàn về “kỹ thuật của cái tôi” — cách cá nhân tự tạo hình mình. Chủ thể không tự do tuyệt đối, nhưng có không gian để tái tạo trong và chống lại các diễn ngôn.'
          },
          socra: ['Hãy kể một phạm trù bạn dùng để đánh giá bản thân (“lười”, “hướng nội”, “thành công”). Nó đến từ đâu?', 'Bạn có tự “kỷ luật” mình vì biết có người nhìn không? Có lúc nào điều đó tốt?', 'Nếu cái tôi là ảo ảnh, ai đang đọc bài này?'],
          feynman: 'Giải thích panopticon cho một người bạn qua ví dụ camera lớp học hoặc mạng xã hội, rồi nói Foucault rút ra điều gì từ nó.',
          essay: 'So sánh chủ thể của Descartes (“tôi tư duy, vậy tôi tồn tại”) với chủ thể “bị phi trung tâm” của Foucault và Lacan. Bạn thấy mình gần bên nào hơn? 250–350 chữ.',
          read: ['Sách: Chương 7', 'Foucault — Discipline and Punish, phần “Panopticism”']
        }
      ]
    },
    {
      title: 'Phần III · Chính trị, sự thật và thời đại sau hậu hiện đại',
      lessons: [
        {
          id: 'pm-politics', short: 'Chính trị', title: 'Chính trị hậu hiện đại: khi các thế giới va chạm', sub: 'Lyotard, Jameson, không gian, hậu thuộc địa, chủ nghĩa tương đối', who: 'Sách: Chương 8 · Postmodern politics',
          book: 'Chương 8 “Postmodern politics” — tr. 217–264 (PDF tr. 235–282)',
          q: 'Nếu không còn chân lý chung cho mọi người, thì làm sao nói được điều gì là bất công?',
          context: '<p>Chương cuối hỏi: hậu hiện đại có chính trị không, và chính trị ấy tốt hay xấu?</p><p><b>Lyotard</b>: thay cho đại tự sự, chỉ còn các <b>trò chơi ngôn ngữ</b> và <b>tiểu tự sự</b> với luật riêng. Đôi khi chúng va chạm mà không có trọng tài chung — ông gọi đó là <b>bất đồng</b> (le différend).</p><p><b>Fredric Jameson</b> (mácxít): hậu hiện đại là “logic văn hoá của chủ nghĩa tư bản muộn”. Các nét của nó — <b>chắp ghép</b> (pastiche) thay cho nhại, mất cảm thức lịch sử, bề mặt nông, không gian rối như khách sạn Bonaventure — phản ánh một thế giới tư bản toàn cầu mà ta không còn vẽ được bản đồ.</p><p>Thêm vào đó: <b>toàn cầu hoá vs cục bộ</b>, và <b>hậu thuộc địa</b> (Edward Said: “phương Đông” là hình ảnh phương Tây tạo ra để định nghĩa chính mình). Cuối cùng là câu hỏi khó: hậu hiện đại có dẫn tới <b>chủ nghĩa tương đối</b> — “không tin vào điều gì cả” — không? Và nay đã có “hậu – hậu hiện đại” chưa?</p>',
          text: {
            src: 'Fredric Jameson, “Postmodernism, or, The Cultural Logic of Late Capitalism” (1991), trích rất ngắn',
            lang: 'en-GB', orig: 'Pastiche is, like parody, the imitation of a peculiar or unique, idiosyncratic style… But it is a neutral practice of such mimicry, without any of parody\'s ulterior motives… pastiche is blank parody.',
            vi: 'Chắp ghép, giống như nhại, là sự bắt chước một phong cách đặc thù, độc nhất, riêng biệt… Nhưng đó là một thực hành bắt chước trung tính, không có bất kỳ động cơ ngầm nào của nhại… chắp ghép là sự nhại trống rỗng.',
            guide: ['Nhại (parody) có “động cơ ngầm” gì mà chắp ghép (pastiche) không có?', 'Tìm một ví dụ chắp ghép trong phim, nhạc hoặc quảng cáo gần đây (“vibe retro”, “Y2K aesthetic”…). Nó có phê phán gì không?', 'Theo sách, Jameson và Lyotard khác nhau ở điểm nào khi đánh giá hậu hiện đại?']
          },
          concepts: [
            { id: 'little-narratives', term: 'Trò chơi ngôn ngữ & tiểu tự sự', def: 'Lyotard: tri thức và giá trị tồn tại trong nhiều “trò chơi” với luật riêng (khoa học, đạo đức, nghệ thuật, cộng đồng), không quy về một đại tự sự chung.', ex: 'Một cộng đồng dân tộc thiểu số có cách giải thích thế giới riêng, không cần được “khoa học” hợp thức hoá.', counter: 'Mọi tri thức được đo bằng một chuẩn duy nhất (ví dụ hiệu quả kinh tế).', rel: ['metanarrative', 'differend'] },
            { id: 'differend', term: 'Bất đồng (le différend)', def: 'Xung đột giữa hai bên mà không có quy tắc chung nào để phân xử công bằng, vì phán xét theo luật của bên này là bất công với bên kia.', ex: 'Cộng đồng bản địa đòi đất theo luật tục, nhưng toà án chỉ công nhận giấy tờ sở hữu.', counter: 'Tranh chấp có luật chung cả hai bên chấp nhận (một trận bóng có trọng tài).', rel: ['little-narratives', 'relativism'] },
            { id: 'pastiche', term: 'Chắp ghép (pastiche)', def: 'Bắt chước, ghép nối các phong cách quá khứ một cách trung tính, không có ý châm biếm hay phê phán — “nhại trống rỗng” (Jameson).', ex: 'Phim “hoài niệm” dựng lại thập niên 80 với nhạc, màu, quần áo, nhưng không nói gì về thời đó.', counter: 'Nhại (parody) có chủ đích chế giễu, phê phán bản gốc.', rel: ['eclecticism', 'late-capitalism', 'knowingness'] },
            { id: 'late-capitalism', term: 'Logic văn hoá của tư bản muộn', def: 'Jameson: hậu hiện đại là biểu hiện văn hoá của giai đoạn tư bản toàn cầu, đa quốc gia, nơi mọi thứ (kể cả văn hoá, nổi loạn) đều có thể thành hàng hoá.', ex: 'Áo in hình Che Guevara bán trong trung tâm thương mại.', counter: 'Quan điểm coi hậu hiện đại thuần tuý là phong cách nghệ thuật, không liên quan kinh tế.', rel: ['pastiche', 'warhol'] },
            { id: 'orientalism', term: 'Hậu thuộc địa & Đông phương luận', def: 'Edward Said: “phương Đông” trong tri thức và nghệ thuật phương Tây là hình ảnh do phương Tây kiến tạo (huyền bí, cảm tính, lạc hậu) để định nghĩa chính mình là lý trí, tiến bộ, và hợp thức hoá thống trị.', ex: 'Phim phương Tây chỉ cho thấy Việt Nam là ruộng lúa, nón lá và chiến tranh.', counter: 'Nghiên cứu châu Á dựa trên tiếng nói và tư liệu của chính người trong cuộc.', rel: ['binary', 'little-narratives'] },
            { id: 'relativism', term: 'Chủ nghĩa tương đối văn hoá', def: 'Quan điểm cho rằng chân lý và giá trị chỉ đúng trong một nền văn hoá; không có chuẩn chung để phán xét. Bị phê phán vì có thể dẫn đến việc không thể lên án bất công.', ex: '“Đó là văn hoá của họ, mình không có quyền đánh giá.”', counter: 'Thừa nhận đa dạng nhưng vẫn giữ vài chuẩn tối thiểu (nhân quyền) — đa nguyên, không phải tương đối tuyệt đối.', rel: ['differend', 'metanarrative'] }
          ],
          arg: {
            claim: 'Hậu hiện đại không dẫn tới việc “không tin vào điều gì”, mà dạy ta tin một cách khiêm tốn và nghi ngờ quyền lực của các câu chuyện lớn.',
            premises: ['Các đại tự sự từng được dùng để hợp thức hoá thống trị (thuộc địa “khai hoá”, kế hoạch hoá từ trên xuống).', 'Hoài nghi chúng cho phép những tiếng nói nhỏ, bị gạt ra lề được lắng nghe.', 'Lắng nghe nhiều tiếng nói là một giá trị đạo đức — tức vẫn có điều để tin.'],
            objection: 'Nếu mọi chân lý đều cục bộ, thì “nên lắng nghe tiếng nói bị gạt ra lề” cũng chỉ là một quan điểm cục bộ, không có sức buộc ai. Hậu hiện đại tự cưa cành mình đang ngồi, và mở đường cho “sự thật thay thế” (post-truth).',
            reply: 'Một hướng trung dung: hoài nghi đại tự sự không bắt buộc phải theo tương đối tuyệt đối. Có thể giữ một số chuẩn tối thiểu (công bằng, phẩm giá) như cam kết thực tiễn, đồng thời luôn tự xét lại chúng. Thời “post-truth” cho thấy cái giá của việc quên vế sau.'
          },
          socra: ['Một bạn nói: “Sự thật là tương đối, mỗi người một sự thật.” Bạn sẽ hỏi lại câu gì?', 'Hình ảnh Việt Nam trong phim nước ngoài khiến bạn thấy được “nhìn đúng” hay “bị kể hộ”? Vì sao?', 'Theo bạn, ta đã bước sang thời “sau hậu hiện đại” chưa? Dấu hiệu nào cho thấy điều đó?'],
          feynman: 'Giải thích cho một người bạn sự khác nhau giữa “nhại” và “chắp ghép”, và vì sao Jameson lo lắng về chắp ghép.',
          essay: '“Hậu hiện đại có nghĩa là không tin vào điều gì cả?” Trả lời bằng một bài nghị luận có luận điểm, ví dụ, phản bác và trả lời. 300–400 chữ.',
          read: ['Sách: Chương 8, Timeline, Glossary', 'Edward Said — Orientalism, phần Introduction', 'Đọc thêm về “metamodernism” — cách gọi thời sau hậu hiện đại']
        }
      ]
    }
  ]
};
