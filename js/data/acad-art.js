/* Học viện · Cách xem một bức tranh — Chữ-tchi tự biên soạn. Ảnh: Wikimedia Commons (tác phẩm thuộc phạm vi công cộng). */
const ACAD_ART = {
  format: 'chutchi-course@1', id: 'art-looking', field: 'Nghệ thuật', icon: '🎨', color: '#ffd9b0',
  title: 'Cách xem một bức tranh',
  desc: 'Học nhìn chậm qua ba kiệt tác: mô tả → phân tích → diễn giải → đánh giá. Mỗi bài gắn với một khái niệm nền của lịch sử nghệ thuật.',
  parts: [
    {
      title: 'Phần I · Nhìn chậm ba kiệt tác',
      lessons: [
        {
          id: 'great-wave', kind: 'art', title: 'Hokusai: Sóng lừng ngoài khơi Kanagawa', sub: 'Bố cục, điểm nhìn và tranh khắc gỗ ukiyo-e', who: 'Katsushika Hokusai · khoảng 1831 · tranh khắc gỗ màu, 25,7 × 37,9 cm',
          q: 'Một con sóng, ba chiếc thuyền, một ngọn núi nhỏ xíu. Vì sao bức tranh bé bằng tờ A4 này lại thành một trong những hình ảnh nổi tiếng nhất thế giới?',
          look: { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tsunami_by_hokusai_19th_century.jpg?width=1200', link: 'https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg', credit: 'Katsushika Hokusai, Thirty-six Views of Mount Fuji · Wikimedia Commons, công cộng',
            hints: ['Mắt bạn nhìn vào đâu đầu tiên, rồi đi theo đường nào?', 'Núi Phú Sĩ ở đâu? Nó to hay nhỏ so với con sóng?', 'Ngọn sóng giống với hình gì? Bọt sóng trông như gì?', 'Những người trên thuyền đang làm gì? Gương mặt họ thế nào?'] },
          context: '<p>Tranh nằm trong loạt <i>Ba mươi sáu cảnh núi Phú Sĩ</i>, in bằng bản khắc gỗ nên có hàng nghìn bản, bán rẻ như tranh dân gian. Đây là <b>ukiyo-e</b> — “tranh thế giới phù du” của đô thị Edo.</p><p>Hokusai khi đó đã ngoài 70. Ông dùng màu <b>xanh Phổ</b> mới nhập từ châu Âu, và học cách vẽ phối cảnh phương Tây từ tranh Hà Lan. Ngược lại, khi tranh khắc Nhật sang Paris cuối thế kỷ 19, nó làm chấn động Monet, Van Gogh, Debussy — một dòng chảy văn hoá hai chiều.</p>',
          concepts: [
            { id: 'composition', term: 'Bố cục', def: 'Cách sắp xếp các yếu tố trong khung tranh (vị trí, kích thước, hướng, khoảng trống) để dẫn mắt người xem và tạo nghĩa.', ex: 'Ở Sóng lừng, đường cong khổng lồ của con sóng bên trái “khung” ngọn núi nhỏ ở giữa, tạo một vòng xoáy kéo mắt.', counter: 'Chủ đề của tranh (sóng, núi) — đó là cái được vẽ, còn bố cục là cách sắp đặt nó.', rel: ['viewpoint', 'negative-space'] },
            { id: 'viewpoint', term: 'Điểm nhìn & tỉ lệ', def: 'Vị trí giả định của người xem và cách kích thước tương đối của các vật cho cảm giác xa – gần, lớn – nhỏ, mạnh – yếu.', ex: 'Ta nhìn từ chỗ thấp như đang ở trên thuyền, nên sóng cao hơn cả núi Phú Sĩ ở xa.', counter: 'Kích thước thật của bức tranh (25 × 38 cm) — không quyết định cảm giác lớn hay nhỏ bên trong tranh.', rel: ['composition', 'linear-perspective'] },
            { id: 'negative-space', term: 'Khoảng trống (không gian âm)', def: 'Phần “trống” quanh và giữa các hình; nó cũng là một hình và góp phần tạo nhịp, căng thẳng hay tĩnh lặng.', ex: 'Khoảng trời nhạt dưới vòm sóng làm con sóng sẫm màu càng dữ dội.', counter: 'Phần tranh bị hỏng, bạc màu — không phải khoảng trống có chủ ý.', rel: ['composition'] },
            { id: 'ukiyoe', term: 'Ukiyo-e', def: 'Dòng tranh khắc gỗ Nhật Bản thời Edo (thế kỷ 17–19) về đời sống đô thị, phong cảnh, diễn viên kịch; in hàng loạt, giá rẻ, mảng màu phẳng và nét viền rõ.', ex: 'Hokusai và Hiroshige vẽ các loạt phong cảnh để người dân mua như bưu thiếp.', counter: 'Tranh thuỷ mặc Trung Hoa — vẽ tay bằng mực, độc bản, gắn với giới văn nhân.', rel: ['japonisme'] },
            { id: 'japonisme', term: 'Trào lưu Nhật Bản (Japonisme)', def: 'Sự say mê nghệ thuật Nhật ở châu Âu cuối thế kỷ 19, ảnh hưởng tới Ấn tượng và Hậu ấn tượng: mảng màu phẳng, góc nhìn lạ, bố cục lệch.', ex: 'Van Gogh chép lại tranh của Hiroshige bằng sơn dầu.', counter: 'Đơn giản là treo đồ trang trí Nhật — Japonisme là sự thay đổi trong cách vẽ.', rel: ['ukiyoe', 'expression'] }
          ],
          arg: {
            claim: 'Sóng lừng không chỉ là tranh phong cảnh, mà là hình ảnh về sự mong manh của con người trước thiên nhiên.',
            premises: ['Con sóng chiếm phần lớn khung tranh và vươn ra như móng vuốt về phía thuyền.', 'Con người nhỏ bé, cúi rạp, không thấy rõ mặt.', 'Núi Phú Sĩ — biểu tượng vĩnh cửu — bé xíu và tĩnh lặng ở xa, như đứng ngoài cơn nguy.'],
            objection: 'Đây là tranh bán đại trà cho dân thành thị, mục đích chính là đẹp và lạ mắt; đọc ra “thông điệp triết lý” là áp ý của người hiện đại.',
            reply: 'Ý định thương mại và chiều sâu ý nghĩa không loại trừ nhau. Cách tổ chức thị giác (tỉ lệ, hướng) vẫn tạo ra cảm giác đó cho người xem, dù tác giả có nói ra hay không.'
          },
          socra: ['Nếu bỏ ba chiếc thuyền đi, bức tranh còn mạnh như vậy không? Vì sao?', 'Bạn thấy con sóng đáng sợ hay đẹp? Có thể vừa sợ vừa đẹp không?', 'Một bức tranh in hàng nghìn bản có kém giá trị hơn một bức độc bản không?'],
          feynman: 'Mô tả cho một người đang nghe điện thoại (không thấy tranh) cách Hokusai làm cho núi Phú Sĩ vừa nhỏ bé vừa quan trọng.',
          essay: 'Chọn một chi tiết nhỏ trong tranh và lập luận rằng nó quan trọng với ý nghĩa cả bức. 150–250 chữ.',
          read: ['Xem các bức khác trong “Ba mươi sáu cảnh núi Phú Sĩ”, đặc biệt “Gió nam, trời quang” (Phú Sĩ đỏ)', 'Bảo tàng Met / British Museum có trang giới thiệu chi tiết']
        },
        {
          id: 'meninas', kind: 'art', title: 'Velázquez: Các cô hầu (Las Meninas)', sub: 'Ai đang nhìn ai? Hội hoạ như suy nghĩ về chính nó', who: 'Diego Velázquez · 1656 · sơn dầu, 318 × 276 cm · Prado, Madrid',
          q: 'Bức tranh này vẽ ai — công chúa, người hoạ sĩ, nhà vua, hay chính bạn đang đứng xem?',
          look: { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Las_Meninas,_by_Diego_Velázquez,_from_Prado_in_Google_Earth.jpg?width=1200', link: 'https://commons.wikimedia.org/wiki/File:Las_Meninas,_by_Diego_Vel%C3%A1zquez,_from_Prado_in_Google_Earth.jpg', credit: 'Diego Velázquez, Las Meninas · Museo del Prado · Wikimedia Commons, công cộng',
            hints: ['Đếm xem có bao nhiêu nhân vật đang nhìn thẳng ra phía bạn.', 'Tấm gương ở cuối phòng phản chiếu ai?', 'Người đàn ông cầm cọ bên trái đang vẽ lên tấm toan nào? Ta có thấy mặt tấm toan không?', 'Ánh sáng đến từ đâu? Nó rơi lên ai rõ nhất?'] },
          context: '<p>Velázquez là hoạ sĩ cung đình của vua Felipe IV Tây Ban Nha. Ở giữa là công chúa nhỏ Margarita, quanh cô là các thị nữ, người lùn, chú chó, và — bên trái — chính Velázquez, cầm cọ, đứng sau một tấm toan khổng lồ.</p><p>Trong tấm gương phía xa thấp thoáng nhà vua và hoàng hậu, như thể họ đang đứng đúng chỗ ta đứng. Từ thế kỷ 17 đến nay, giới phê bình (Michel Foucault mở đầu cuốn <i>Les Mots et les Choses</i> bằng bức này) vẫn tranh luận: tranh vẽ <b>cái gì</b>, và <b>cho ai</b> xem?</p>',
          concepts: [
            { id: 'gaze', term: 'Cái nhìn (gaze)', def: 'Hướng nhìn của nhân vật trong tranh và của người xem; nó tạo quan hệ quyền lực, sự chú ý và vị trí cho người xem.', ex: 'Velázquez và công chúa nhìn thẳng ra ngoài, khiến ta cảm thấy mình bị nhìn lại — ta thành một phần của cảnh.', counter: 'Nhân vật nhìn vào trong tranh (vào nhau) — người xem đứng ngoài như khán giả.', rel: ['metapicture', 'viewpoint'] },
            { id: 'metapicture', term: 'Tranh về tranh (metapicture)', def: 'Tác phẩm tự phản tư về hội hoạ: về việc vẽ, việc nhìn, việc biểu hiện — thay vì chỉ kể một câu chuyện.', ex: 'Las Meninas cho ta thấy hoạ sĩ đang vẽ, tấm toan quay lưng, tấm gương, khung cửa — toàn là “khung trong khung”.', counter: 'Tranh chân dung bình thường — vẽ một người, không bình luận về chính việc vẽ.', rel: ['gaze', 'artist-status'] },
            { id: 'chiaroscuro', term: 'Sáng tối (chiaroscuro)', def: 'Dùng tương phản mạnh giữa sáng và tối để tạo khối, chiều sâu và hướng sự chú ý.', ex: 'Ánh sáng từ cửa sổ bên phải rọi sáng công chúa; phần trần nhà phía trên chìm trong bóng tối.', counter: 'Ánh sáng đều khắp mặt tranh như tranh khắc ukiyo-e — mảng màu phẳng, ít bóng đổ.', rel: ['composition'] },
            { id: 'artist-status', term: 'Địa vị người nghệ sĩ', def: 'Câu hỏi hoạ sĩ là thợ thủ công hay người trí thức sáng tạo; ở châu Âu thế kỷ 16–17, hoạ sĩ đấu tranh để nghề mình được coi là “nghệ thuật tự do”.', ex: 'Velázquez tự vẽ mình đứng ngang hàng cạnh hoàng tộc, ngực đeo huân chương Santiago (được vẽ thêm sau).', counter: 'Thợ sơn tường — công việc kỹ thuật, không ai đòi hỏi tư cách trí thức.', rel: ['metapicture'] }
          ],
          arg: {
            claim: 'Nhân vật chính thật sự của Las Meninas là người xem.',
            premises: ['Nhiều nhân vật quan trọng nhìn thẳng về phía ngoài khung tranh.', 'Tấm gương cho thấy ở vị trí ta đứng là nhà vua và hoàng hậu — đối tượng mà hoạ sĩ đang vẽ.', 'Vì vậy toàn bộ cảnh được tổ chức xoay quanh một điểm ở ngoài tranh, nơi người xem chiếm chỗ.'],
            objection: 'Tranh được vẽ cho nhà vua treo trong phòng riêng; “người xem” lúc đó chính là vua. Đọc thành “mọi người xem” là áp lý thuyết hiện đại.',
            reply: 'Đúng là người xem ban đầu là vua, điều đó càng làm rõ trò chơi: vua vừa ở trong tranh (gương) vừa ở ngoài tranh (đang xem). Về sau, mỗi người xem đều bước vào chỗ đứng ấy — tác phẩm mở ra nhiều hơn ý định ban đầu.'
          },
          socra: ['Nếu bức tranh treo ở phòng riêng của vua, nó có ý nghĩa khác so với khi treo ở bảo tàng không?', 'Bạn có từng chụp ảnh mà chính mình (hay cái bóng của mình) lọt vào khung không? Nó thay đổi bức ảnh thế nào?', 'Một bức tranh có thể “có ý nghĩa” mà tác giả không cố ý không?'],
          feynman: 'Giải thích cho một người bạn vì sao tấm gương nhỏ ở cuối phòng lại là chi tiết quan trọng nhất của bức tranh.',
          essay: 'Ý định của nghệ sĩ có phải là thước đo cuối cùng cho ý nghĩa của tác phẩm không? Dùng Las Meninas làm ví dụ, 200–300 chữ.',
          read: ['Michel Foucault — Les Mots et les Choses, chương 1 (bàn về Las Meninas)', 'Picasso vẽ lại Las Meninas 58 lần (1957) — xem ở Museu Picasso, Barcelona']
        },
        {
          id: 'starry-night', kind: 'art', title: 'Van Gogh: Đêm đầy sao', sub: 'Biểu hiện, màu sắc và nét cọ như cảm xúc', who: 'Vincent van Gogh · 1889 · sơn dầu, 73,7 × 92,1 cm · MoMA, New York',
          q: 'Bầu trời trong tranh không giống bầu trời thật. Vậy nó “đúng” theo nghĩa nào?',
          look: { img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=1200', link: 'https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', credit: 'Vincent van Gogh, The Starry Night · MoMA · Wikimedia Commons, công cộng',
            hints: ['Hãy nhìn riêng nét cọ: chúng đi theo hướng nào ở bầu trời, ở ngôi làng, ở cây bách?', 'Màu nào chiếm nhiều nhất? Màu nào nổi bật nhất dù chiếm ít?', 'Cây bách đen bên trái nối những gì với nhau?', 'Ngôi làng phía dưới có chuyển động như bầu trời không?'] },
          context: '<p>Tháng 6/1889, Van Gogh đang tự nguyện điều trị tại nhà thương Saint-Rémy, sau những cơn khủng hoảng tinh thần. Ông vẽ cảnh nhìn từ cửa sổ phòng mình lúc trước bình minh — nhưng vẽ theo trí nhớ và tưởng tượng: ngôi làng và nhà thờ được thêm vào, bầu trời biến thành dòng xoáy.</p><p>Ông viết cho em trai Theo rằng ông muốn diễn tả cảm xúc bằng màu sắc. Bản thân ông khi đó không coi đây là bức thành công. Ngày nay nó thuộc nhóm tranh được tái hiện nhiều nhất trong lịch sử.</p>',
          concepts: [
            { id: 'expression', term: 'Biểu hiện (expression)', def: 'Hướng nghệ thuật ưu tiên truyền đạt cảm xúc, trải nghiệm nội tâm hơn là mô phỏng chính xác thế giới bên ngoài.', ex: 'Bầu trời xoáy cuộn không phải để ghi lại thời tiết, mà để cho ta cảm thấy sự rung động, bất an, kỳ vĩ.', counter: 'Mô phỏng (mimesis) — như tranh hiện thực vẽ chính xác từng chi tiết như ảnh chụp.', rel: ['impasto', 'color-emotion', 'japonisme'] },
            { id: 'impasto', term: 'Nét cọ dày (impasto)', def: 'Đắp sơn dày lên mặt tranh để nét cọ nổi lên rõ rệt, khiến chính hành động vẽ trở thành một phần ý nghĩa.', ex: 'Ở Đêm đầy sao, từng vệt sơn ngắn, dày chạy theo hình xoáy, như dấu vết của nhịp tay và hơi thở.', counter: 'Kỹ thuật láng mịn (sfumato) của Leonardo — giấu nét cọ đi.', rel: ['expression'] },
            { id: 'color-emotion', term: 'Màu sắc mang cảm xúc', def: 'Dùng màu không theo màu thật mà theo cảm xúc và tương phản; ví dụ cặp màu bổ túc (xanh lam – cam vàng) đặt cạnh nhau làm nhau rực lên.', ex: 'Những ngôi sao vàng cam rực lên giữa nền xanh lam đậm.', counter: 'Màu ghi chép (màu “đúng” với vật thật), như trong tranh minh hoạ thực vật học.', rel: ['expression', 'chiaroscuro'] },
            { id: 'biographical-fallacy', term: 'Ngụy biện tiểu sử', def: 'Lỗi giải thích tác phẩm chỉ bằng đời tư hay bệnh tật của tác giả, bỏ qua những gì thực sự có trên mặt tranh.', ex: '“Tranh xoáy vì ông ấy bị điên” — vừa giản lược, vừa bỏ qua sự kiểm soát bố cục rất chặt của bức tranh.', counter: 'Dùng bối cảnh tiểu sử để mở thêm tầng nghĩa, nhưng vẫn kiểm chứng bằng chi tiết trong tác phẩm.', rel: ['expression', 'metapicture'] }
          ],
          arg: {
            claim: 'Đêm đầy sao “thật” hơn một bức ảnh chụp bầu trời đêm.',
            premises: ['Một bức tranh có thể đúng theo nhiều nghĩa: đúng với hình dáng bên ngoài, hoặc đúng với trải nghiệm.', 'Trải nghiệm khi nhìn trời đêm (rộng lớn, choáng ngợp, sống động) không hiện ra trong ảnh chụp tối om.', 'Van Gogh dùng màu, nét cọ, bố cục để tái tạo trải nghiệm đó cho người xem.'],
            objection: 'Gọi tranh “thật hơn” là lạm dụng chữ “thật”: tranh rõ ràng sai so với bầu trời thực. Đó là đẹp, là cảm xúc, không phải sự thật.',
            reply: 'Có thể phân biệt sự thật về sự kiện và sự thật về trải nghiệm. Phản bác buộc ta nói rõ hơn ta đang dùng nghĩa nào — đó chính là việc của tư duy phản biện.'
          },
          socra: ['Nếu biết Van Gogh vẽ trong bệnh viện, cách bạn xem tranh có thay đổi không? Thay đổi như thế có công bằng với bức tranh không?', 'Một bức tranh có thể “đúng” mà không giống thật không? Cho một ví dụ khác.', 'Vì sao một bức chính tác giả thấy chưa đạt lại trở nên nổi tiếng như vậy? Ai quyết định giá trị một tác phẩm?'],
          feynman: 'Giải thích cho một người hay nói “vẽ thế này em bé cũng vẽ được” điều gì làm nét cọ của Van Gogh đặc biệt.',
          essay: 'So sánh cách Hokusai và Van Gogh vẽ chuyển động (sóng – bầu trời). Mỗi người khiến bạn cảm thấy gì? 200–300 chữ.',
          read: ['Thư của Vincent gửi Theo (vangoghletters.org)', 'So sánh với “Đêm đầy sao trên sông Rhône” (1888)']
        }
      ]
    }
  ]
};
