/* Học viện · Nhập môn Triết học phương Tây — Chữ-tchi tự biên soạn.
   Trích đoạn gốc lấy từ các bản dịch tiếng Anh đã thuộc phạm vi công cộng (Jowett, Veitch, Hume, Abbott); bản dịch Việt do Chữ-tchi dịch. */
const ACAD_PHILO = {
  format: 'chutchi-course@1', id: 'philo-west', field: 'Triết học', icon: '🏛', color: '#c9b6ff',
  title: 'Nhập môn Triết học phương Tây',
  desc: 'Sáu cuộc đối thoại lớn, từ Socrates đến chủ nghĩa hiện sinh: biết gì, sống thế nào, ta là ai. Mỗi bài đi qua văn bản gốc, khái niệm, sơ đồ lập luận và tự giải thích lại.',
  parts: [
    {
      title: 'Phần I · Cổ đại — hỏi cho đến tận cùng',
      lessons: [
        {
          id: 'socrates', title: 'Socrates: cuộc đời không được tự vấn', sub: 'Phương pháp chất vấn & sự khôn ngoan của việc biết mình không biết', who: 'Socrates (470–399 TCN) · qua Plato, “Biện hộ”',
          q: 'Có thể nào biết mình không biết lại là một dạng hiểu biết, thậm chí là dạng cao nhất?',
          context: '<p>Athens, năm 399 TCN. Socrates, 70 tuổi, bị kiện vì “làm hư hỏng thanh niên” và “không tin các vị thần của thành phố”. Ông không viết gì; ta biết ông chủ yếu qua học trò Plato.</p><p>Cả đời ông đi khắp quảng trường hỏi những người được coi là thông thái — chính trị gia, nhà thơ, thợ thủ công — “công lý là gì?”, “can đảm là gì?”. Câu trả lời của họ lần lượt sụp đổ dưới câu hỏi. Kết luận của ông: ông khôn hơn họ một chút, chỉ vì ông <b>biết rằng mình không biết</b>.</p><p>Bị kết án tử hình, ông từ chối im lặng để được tha: với ông, ngừng chất vấn là ngừng sống như một con người.</p>',
          text: {
            src: 'Plato, Apology 38a — bản dịch Benjamin Jowett (1871, công cộng)',
            en: '…if I tell you that to do as you say would be a disobedience to the God, and therefore that I cannot hold my tongue, you will not believe that I am serious; and if I say again that daily to discourse about virtue, and of those other things about which you hear me examining myself and others, is the greatest good of man, and that the unexamined life is not worth living, you are still less likely to believe me.',
            vi: '…nếu tôi nói với các ông rằng làm theo lời các ông là bất tuân thần linh, và vì thế tôi không thể im lặng, các ông sẽ không tin là tôi nói thật; và nếu tôi lại nói rằng mỗi ngày bàn luận về đức hạnh và những điều mà các ông vẫn nghe tôi tự xét mình và xét người khác, chính là điều tốt đẹp nhất của con người, và rằng một cuộc đời không được tự vấn thì không đáng sống — các ông lại càng ít tin tôi hơn nữa.',
            guide: ['Socrates coi điều gì là “điều tốt đẹp nhất của con người”? Vì sao lại là bàn luận, chứ không phải của cải hay danh tiếng?', '“Tự vấn” (examine) ở đây gồm những hành động cụ thể nào?', 'Ông đang nói trước toà sắp xử tử mình. Bối cảnh đó làm câu nói nặng thêm thế nào?']
          },
          concepts: [
            { id: 'elenchus', term: 'Phép chất vấn (elenchus)', def: 'Phương pháp hỏi – đáp: lấy một định nghĩa người kia đưa ra, rút hệ quả từ nó, rồi chỉ ra hệ quả mâu thuẫn với điều chính họ cũng tin, buộc phải xét lại định nghĩa.', ex: 'Laches nói “can đảm là đứng vững không chạy”. Socrates hỏi: thế kỵ binh Scythia đánh vừa chạy vừa bắn có can đảm không? → định nghĩa quá hẹp.', counter: 'Tranh cãi để thắng (nguỵ biện) cũng hỏi dồn, nhưng mục đích là hạ đối phương, không phải cùng tìm sự thật.', rel: ['aporia', 'socratic-ignorance'] },
            { id: 'socratic-ignorance', term: 'Sự không biết kiểu Socrates', def: 'Ý thức rõ giới hạn hiểu biết của mình — không phải không biết gì, mà không tự tin rằng mình biết khi thực ra chưa biết.', ex: 'Một bác sĩ giỏi nói “tôi chưa chắc, cần xét nghiệm thêm” thay vì đoán bừa cho xong.', counter: 'Chủ nghĩa hoài nghi tuyệt đối (“không ai biết được gì”) — đó lại là một khẳng định chắc chắn, chứ không còn là khiêm tốn.', rel: ['elenchus', 'examined-life'] },
            { id: 'aporia', term: 'Bế tắc (aporia)', def: 'Trạng thái bối rối khi mọi câu trả lời đã thử đều đổ vỡ. Với Socrates, đây là điểm khởi đầu của suy nghĩ thật, không phải thất bại.', ex: 'Nhiều đối thoại của Plato (Euthyphro, Laches) kết thúc mà không có định nghĩa nào đứng vững.', counter: 'Bối rối vì thiếu thông tin đơn thuần (không biết giờ tàu chạy) — chỉ cần tra cứu, không phải bế tắc khái niệm.', rel: ['elenchus'] },
            { id: 'examined-life', term: 'Đời sống được tự vấn', def: 'Lối sống liên tục xét lại niềm tin và giá trị của mình bằng lý lẽ, thay vì sống theo thói quen hay ý kiến đám đông.', ex: 'Tự hỏi “mình theo ngành này vì mình muốn, hay vì bố mẹ muốn?” và thực sự chịu nghe câu trả lời.', counter: 'Suy nghĩ quá mức đến tê liệt, không dám hành động — Socrates vẫn hành động rất quyết liệt (ra trận, đối mặt toà án).', rel: ['socratic-ignorance', 'eudaimonia'] },
            { id: 'eudaimonia', term: 'Sống tốt / hạnh phúc (eudaimonia)', def: 'Sự viên mãn của một đời người, gắn với việc sống có đức hạnh — không phải cảm giác vui sướng nhất thời.', ex: 'Một người làm nghề mình thấy có ý nghĩa, sống ngay thẳng, dù không phải lúc nào cũng vui.', counter: 'Cảm giác sướng sau khi lướt mạng 3 tiếng — dễ chịu nhưng không làm đời viên mãn hơn.', rel: ['examined-life'] }
          ],
          arg: {
            claim: 'Cuộc đời không được tự vấn thì không đáng sống.',
            premises: ['Điều làm con người khác loài vật là khả năng suy xét bằng lý lẽ.', 'Một cuộc đời tốt là cuộc đời phát huy điều đặc trưng nhất của con người.', 'Không tự vấn nghĩa là không dùng lý lẽ vào chính những điều quan trọng nhất (sống vì gì, đúng sai là gì).'],
            objection: 'Rất nhiều người sống giản dị, không triết lý, nhưng tử tế và hạnh phúc. Nói đời họ “không đáng sống” là kiêu ngạo trí thức.',
            reply: 'Có thể đọc “tự vấn” rộng hơn triết học hàn lâm: người nông dân tự hỏi mình đối xử với hàng xóm đã đúng chưa cũng đang tự vấn. Câu nói là lời thách thức với chính mình, không phải bản án dành cho người khác.'
          },
          socra: ['Bạn có từng tin chắc một điều rồi phát hiện mình sai không? Điều gì đã khiến bạn nhận ra?', 'Nếu không ai hỏi bạn câu nào, bạn có tự xét lại niềm tin của mình không?', 'Hiểu biết “biết mình không biết” có giúp bạn hành động tốt hơn không, hay chỉ làm bạn do dự?'],
          feynman: 'Giải thích cho một em lớp 6: vì sao Socrates nói “tôi khôn hơn họ vì tôi biết mình không biết”? Đưa một ví dụ trong trường học.',
          essay: 'Bạn đồng ý đến mức nào với câu “cuộc đời không được tự vấn thì không đáng sống”? Viết 150–250 chữ, nêu rõ một phản bác và trả lời nó.',
          read: ['Plato — Biện hộ (Apology), toàn văn ngắn, đọc trong 1 giờ', 'Plato — Euthyphro (lòng mộ đạo là gì?)']
        },
        {
          id: 'cave', title: 'Plato: hang động và thế giới ý niệm', sub: 'Thực tại, hiện tượng và giáo dục như sự “quay đầu”', who: 'Plato (427–347 TCN) · “Cộng hoà”, quyển VII',
          q: 'Nếu mọi thứ bạn từng thấy chỉ là cái bóng, làm sao bạn biết được — và bạn có muốn biết không?',
          context: '<p>Plato, học trò của Socrates, chứng kiến thầy bị xử tử bởi chính nền dân chủ Athens. Ông dành đời mình để hỏi: tri thức thật là gì, khác gì ý kiến (doxa)?</p><p>Câu trả lời của ông là <b>thuyết ý niệm (Forms)</b>: những gì ta thấy bằng giác quan luôn thay đổi, không hoàn hảo; đằng sau chúng là các ý niệm vĩnh cửu — cái Đẹp, cái Công bằng, Hình tròn hoàn hảo — chỉ nắm được bằng lý trí.</p><p>Ẩn dụ hang động là cách ông kể chuyện đó, và cũng là câu chuyện về giáo dục: học không phải đổ kiến thức vào đầu, mà là “quay cả linh hồn” về phía ánh sáng.</p>',
          text: {
            src: 'Plato, Republic VII, 514a — bản dịch Benjamin Jowett (1871, công cộng)',
            en: 'Behold! human beings living in an underground den, which has a mouth open towards the light and reaching all along the den; here they have been from their childhood, and have their legs and necks chained so that they cannot move, and can only see before them, being prevented by the chains from turning round their heads. Above and behind them a fire is blazing at a distance…',
            vi: 'Hãy nhìn xem! Những con người sống trong một cái hang dưới lòng đất, miệng hang mở về phía ánh sáng và trải dài suốt hang; họ ở đó từ thuở nhỏ, chân và cổ bị xích nên không cử động được, chỉ có thể nhìn về phía trước, vì xích ngăn họ quay đầu lại. Phía trên và đằng sau họ, ở đằng xa, một ngọn lửa đang cháy…',
            guide: ['Mỗi chi tiết tượng trưng cho gì: hang, xích, bóng trên vách, ngọn lửa, mặt trời bên ngoài?', 'Vì sao người được thả ra lúc đầu lại đau mắt và muốn quay vào hang?', 'Khi quay lại kể chuyện, người đó bị chế giễu, thậm chí có thể bị giết. Plato đang ám chỉ ai?']
          },
          concepts: [
            { id: 'forms', term: 'Ý niệm (Forms / Ideas)', def: 'Những thực thể hoàn hảo, bất biến, phi vật chất (cái Đẹp tự thân, Công bằng tự thân), là nguyên mẫu mà mọi vật cụ thể chỉ “tham dự” một phần.', ex: 'Không vòng tròn vẽ tay nào tròn tuyệt đối, nhưng ta vẫn hiểu “hình tròn hoàn hảo” là gì — đó là ý niệm.', counter: 'Khái niệm trung bình rút ra từ kinh nghiệm (kiểu “con chó điển hình”) — với Plato, ý niệm không phải trung bình cộng mà có trước kinh nghiệm.', rel: ['appearance-reality', 'rationalism'] },
            { id: 'appearance-reality', term: 'Hiện tượng và thực tại', def: 'Sự phân biệt giữa cái hiện ra với giác quan (có thể đánh lừa) và cái thực sự là.', ex: 'Cây gậy cắm trong nước trông như gãy, nhưng thật ra thẳng.', counter: 'Hai góc nhìn khác nhau về cùng một sở thích (thích/không thích sầu riêng) — đó là khác biệt khẩu vị, không phải hiện tượng che thực tại.', rel: ['forms', 'cartesian-doubt'] },
            { id: 'doxa-episteme', term: 'Ý kiến (doxa) và tri thức (epistēmē)', def: 'Ý kiến có thể tình cờ đúng nhưng không có căn cứ vững; tri thức là niềm tin đúng kèm lý do giải thích vì sao nó đúng.', ex: 'Đoán đúng đáp án trắc nghiệm là doxa; giải được bài và giải thích được cách giải là epistēmē.', counter: 'Tin chắc một điều sai (dù rất tự tin) — không phải tri thức, cũng không phải doxa đúng.', rel: ['socratic-ignorance', 'forms'] },
            { id: 'periagoge', term: 'Giáo dục như “quay đầu” (periagōgē)', def: 'Học không phải đổ thông tin vào chỗ trống, mà là xoay hướng nhìn của cả con người về điều thật, thường kèm đau đớn và kháng cự.', ex: 'Lần đầu nhận ra một định kiến của chính mình: khó chịu, muốn phủ nhận, rồi dần nhìn thế giới khác đi.', counter: 'Học thuộc lòng để thi rồi quên — thông tin vào đầu nhưng cách nhìn không đổi.', rel: ['examined-life'] }
          ],
          arg: {
            claim: 'Tri thức thật không đến từ giác quan, mà từ lý trí hướng về các ý niệm.',
            premises: ['Tri thức thật phải ổn định và chắc chắn.', 'Mọi thứ giác quan cảm nhận đều thay đổi và có thể đánh lừa.', 'Chỉ những gì bất biến mới có thể là đối tượng của tri thức ổn định — đó là các ý niệm, nắm được bằng lý trí.'],
            objection: 'Aristotle (học trò của Plato) phản bác: không cần một thế giới ý niệm riêng; “hình thức” nằm ngay trong sự vật, và ta biết nó bằng cách quan sát nhiều sự vật.',
            reply: 'Người theo Plato đáp: quan sát cho ta nhiều vòng tròn méo, nhưng không bao giờ cho ta sự hoàn hảo; vậy cái chuẩn để ta nhận ra chúng “méo” phải đến từ đâu đó ngoài kinh nghiệm.'
          },
          socra: ['Trong đời bạn, “cái hang” có thể là gì: mạng xã hội, định kiến, thói quen?', 'Nếu được chọn, bạn có muốn ra khỏi hang không, khi biết ánh sáng sẽ làm đau mắt?', 'Người ra khỏi hang có quyền ép người khác ra theo không?'],
          feynman: 'Kể lại ẩn dụ hang động trong 5 câu cho một người chưa từng nghe, rồi nói một ý nghĩa của nó với việc học.',
          essay: 'Ẩn dụ hang động còn đúng trong thời đại thuật toán đề xuất nội dung không? Viết 150–250 chữ.',
          read: ['Plato — Cộng hoà, quyển VII (514a–521b)', 'Plato — Meno: học là “nhớ lại”']
        }
      ]
    },
    {
      title: 'Phần II · Hiện đại — nền móng của tri thức và đạo đức',
      lessons: [
        {
          id: 'descartes', title: 'Descartes: tôi tư duy, vậy tôi tồn tại', sub: 'Hoài nghi có phương pháp & điểm tựa chắc chắn', who: 'René Descartes (1596–1650) · “Suy niệm về Triết học thứ nhất”',
          q: 'Nếu phải nghi ngờ mọi thứ, có điều gì vẫn còn đứng vững không?',
          context: '<p>Thế kỷ 17, khoa học mới của Galileo đang làm lung lay hàng nghìn năm niềm tin. Descartes muốn xây tri thức trên một nền móng không thể lay chuyển, như một nhà toán học.</p><p>Cách làm triệt để: tạm thời nghi ngờ <b>mọi thứ có thể nghi ngờ</b> — giác quan (có lúc đánh lừa), cả việc mình đang thức (có thể đang mơ), thậm chí toán học (có thể có một “ác thần” lừa mình). Rồi xem còn gì sót lại.</p>',
          text: {
            src: 'Descartes, Meditations II — bản dịch John Veitch (1853, công cộng)',
            en: 'But there is I know not what being, who is possessed at once of the highest power and the deepest cunning, who is constantly employing all his ingenuity in deceiving me. Doubtless, then, I exist, since I am deceived; and, let him deceive me as he may, he can never bring it about that I am nothing, so long as I shall be conscious that I am something. So that it must, in fine, be maintained, all things being maturely and carefully considered, that this proposition (pronunciatum) I am, I exist, is necessarily true each time it is expressed by me, or conceived in my mind.',
            vi: 'Nhưng có một kẻ nào đó, vừa quyền năng tột bậc vừa xảo quyệt vô cùng, không ngừng dùng hết mưu mẹo để lừa tôi. Vậy thì chắc chắn tôi tồn tại, vì tôi bị lừa; và hắn cứ lừa tôi bao nhiêu tuỳ ý, hắn cũng không bao giờ khiến tôi thành hư không được, chừng nào tôi còn ý thức rằng mình là một cái gì đó. Cho nên, sau khi đã cân nhắc kỹ càng mọi điều, phải khẳng định rằng mệnh đề “tôi là, tôi tồn tại” tất yếu đúng mỗi khi tôi nói ra hoặc nghĩ đến nó trong tâm trí.',
            guide: ['Vì sao chính việc “bị lừa” lại chứng minh “tôi tồn tại”?', 'Câu “mỗi khi tôi nói ra hoặc nghĩ đến” quan trọng thế nào? Điều gì xảy ra khi tôi không nghĩ?', 'Ở bước này, Descartes đã chắc chắn mình có thân thể chưa?']
          },
          concepts: [
            { id: 'cartesian-doubt', term: 'Hoài nghi có phương pháp', def: 'Tạm gác lại mọi niềm tin có thể nghi ngờ dù chỉ một chút, không phải để sống như thế mà để tìm ra điều tuyệt đối chắc chắn.', ex: 'Như dỡ hết táo khỏi giỏ để loại quả hỏng, rồi chỉ bỏ lại những quả chắc chắn lành.', counter: 'Hoài nghi kiểu “thuyết âm mưu” — nghi ngờ có chọn lọc những điều mình không thích, còn điều mình thích thì tin ngay.', rel: ['cogito', 'appearance-reality'] },
            { id: 'cogito', term: 'Cogito ergo sum', def: '“Tôi tư duy, vậy tôi tồn tại”: việc đang nghi ngờ/suy nghĩ tự nó cho thấy có một chủ thể đang suy nghĩ. Đây là điểm tựa đầu tiên không thể nghi ngờ.', ex: 'Thử nghi ngờ rằng mình đang nghi ngờ — chính việc thử ấy lại là một hành vi nghi ngờ.', counter: '“Tôi đi bộ, vậy tôi tồn tại” — không chắc chắn được, vì tôi có thể chỉ mơ thấy mình đi bộ.', rel: ['cartesian-doubt', 'dualism', 'rationalism'] },
            { id: 'dualism', term: 'Nhị nguyên tâm – vật', def: 'Quan điểm cho rằng tâm trí (thứ tư duy, không có quảng tính) và vật chất (thứ có quảng tính, không tư duy) là hai loại thực thể khác nhau.', ex: 'Descartes cho rằng ta có thể hình dung tâm trí tồn tại mà không có thân thể, nên chúng khác nhau.', counter: 'Chủ nghĩa duy vật: tâm trí chỉ là hoạt động của não, không có “chất liệu” riêng.', rel: ['cogito'] },
            { id: 'rationalism', term: 'Chủ nghĩa duy lý', def: 'Lập trường cho rằng tri thức chắc chắn nhất đến từ lý trí (suy luận, ý tưởng bẩm sinh), không phải từ giác quan.', ex: 'Ta biết 2 + 2 = 4 hay “tam giác có 3 góc” mà không cần đi đo hết mọi tam giác.', counter: 'Chủ nghĩa kinh nghiệm (Locke, Hume): mọi ý tưởng đều bắt nguồn từ trải nghiệm giác quan.', rel: ['forms', 'empiricism'] }
          ],
          arg: {
            claim: 'Tôi tồn tại — và điều này hoàn toàn chắc chắn.',
            premises: ['Tôi có thể nghi ngờ mọi thứ, kể cả việc có thế giới và có thân thể.', 'Nhưng nghi ngờ là một hoạt động tư duy; muốn có tư duy thì phải có một cái gì đó đang tư duy.', 'Vậy mỗi khi tôi nghi ngờ (tư duy), tôi không thể nghi ngờ việc mình tồn tại.'],
            objection: 'Lichtenberg (thế kỷ 18): Descartes chỉ được phép nói “có tư duy đang diễn ra”, không được phép nói “TÔI tư duy” — chữ “tôi” đã lén giả định một chủ thể bền vững.',
            reply: 'Có thể chấp nhận phiên bản khiêm tốn hơn: ít nhất có một dòng ý thức đang hiện hữu, điều đó vẫn đủ làm điểm tựa chống lại hoài nghi tuyệt đối; còn “tôi” là gì thì phải lập luận thêm.'
          },
          socra: ['Bạn có cách nào chứng minh lúc này mình không đang mơ không?', 'Nếu chỉ chắc chắn được “tôi tồn tại”, làm sao xây lại được niềm tin vào thế giới bên ngoài?', 'Một AI có thể nói “tôi tư duy, vậy tôi tồn tại” không? Câu đó có đúng với nó không?'],
          feynman: 'Giải thích cho bạn cùng lớp vì sao “tôi đang nghi ngờ” lại chứng minh được “tôi tồn tại”, nhưng “tôi đang chạy” thì không.',
          essay: 'Hoài nghi có phương pháp có ích gì cho một sinh viên trong thời đại tin giả? Viết 150–250 chữ, có một ví dụ cụ thể.',
          read: ['Descartes — Suy niệm I và II (khoảng 20 trang)', 'Descartes — Luận về phương pháp, phần 4']
        },
        {
          id: 'hume', title: 'Hume: mặt trời mai có mọc không?', sub: 'Kinh nghiệm, nhân quả và vấn đề quy nạp', who: 'David Hume (1711–1776) · “Khảo cứu về giác tính con người”',
          q: 'Bạn tin chắc mặt trời sẽ mọc ngày mai. Nhưng lý do của bạn thật sự là gì?',
          context: '<p>Nếu Descartes tin vào lý trí, thì Hume — triết gia Scotland theo <b>chủ nghĩa kinh nghiệm</b> — hỏi: mọi ý tưởng của ta chẳng phải đều đến từ ấn tượng giác quan sao?</p><p>Đi theo câu hỏi đó đến cùng, ông phát hiện một lỗ hổng gây chấn động: ta chưa bao giờ <b>thấy</b> “nhân quả”, chỉ thấy sự việc này thường đi sau sự việc kia. Và mọi suy luận từ quá khứ sang tương lai đều dựa vào một giả định không chứng minh được.</p>',
          text: {
            src: 'Hume, An Enquiry Concerning Human Understanding, IV.1 (1748, công cộng)',
            en: 'All the objects of human reason or enquiry may naturally be divided into two kinds, to wit, Relations of Ideas, and Matters of Fact. … That the sun will not rise to-morrow is no less intelligible a proposition, and implies no more contradiction than the affirmation, that it will rise. We should in vain, therefore, attempt to demonstrate its falsehood.',
            vi: 'Mọi đối tượng của lý trí hay sự khảo cứu của con người có thể chia một cách tự nhiên thành hai loại: Quan hệ giữa các Ý niệm, và Sự kiện thực tế. … Mệnh đề “mặt trời sẽ không mọc vào ngày mai” cũng dễ hiểu không kém, và không hàm chứa mâu thuẫn nào hơn, so với khẳng định rằng nó sẽ mọc. Vì vậy, ta sẽ uổng công nếu cố chứng minh rằng nó sai.',
            guide: ['Cho một ví dụ của “quan hệ giữa các ý niệm” và một ví dụ của “sự kiện thực tế”.', 'Vì sao “mặt trời không mọc” không mâu thuẫn, còn “hình vuông có 5 cạnh” thì mâu thuẫn?', 'Nếu không chứng minh được bằng lý trí, thì cái gì khiến ta vẫn tin mặt trời sẽ mọc?']
          },
          concepts: [
            { id: 'empiricism', term: 'Chủ nghĩa kinh nghiệm', def: 'Lập trường cho rằng mọi ý tưởng và tri thức về thế giới đều bắt nguồn từ trải nghiệm giác quan.', ex: 'Người mù bẩm sinh không thể có ý niệm về màu đỏ giống người sáng mắt.', counter: 'Ý tưởng bẩm sinh của Descartes (ví dụ ý niệm về sự hoàn hảo) — có trước mọi kinh nghiệm.', rel: ['rationalism', 'fork'] },
            { id: 'fork', term: 'Chĩa đôi của Hume', def: 'Mọi mệnh đề có ý nghĩa thuộc một trong hai loại: quan hệ ý niệm (đúng do định nghĩa, phủ định thì mâu thuẫn) hoặc sự kiện thực tế (chỉ biết qua kinh nghiệm, phủ định vẫn hình dung được).', ex: '“Mọi người độc thân đều chưa kết hôn” (ý niệm) / “Nước sôi ở 100°C ngang mực nước biển” (sự kiện).', counter: '“Mọi biến cố đều có nguyên nhân” — Kant về sau cho rằng câu này không nằm gọn trong loại nào.', rel: ['empiricism', 'a-priori'] },
            { id: 'induction', term: 'Vấn đề quy nạp', def: 'Suy từ “đã quan sát nhiều lần” sang “sẽ luôn như vậy” cần giả định tự nhiên đồng nhất; nhưng giả định đó chỉ có thể biện minh bằng chính quy nạp — một vòng luẩn quẩn.', ex: 'Con gà được cho ăn mỗi sáng suốt 1000 ngày, đến ngày 1001 thì bị làm thịt (ví dụ của Russell).', counter: 'Suy diễn toán học: từ tiên đề suy ra định lý là chắc chắn, không cần giả định tương lai giống quá khứ.', rel: ['causation', 'fork'] },
            { id: 'causation', term: 'Nhân quả như thói quen', def: 'Ta không bao giờ quan sát được “sức mạnh tất yếu” nối nguyên nhân với kết quả; ta chỉ thấy sự kế tiếp lặp lại, và tâm trí hình thành thói quen chờ đợi.', ex: 'Bi-a: ta thấy bi A chạm bi B rồi B lăn; cái “buộc phải” lăn là do ta thêm vào.', counter: 'Sự tương quan ngẫu nhiên một lần (vừa mặc áo đỏ thì trúng số) — không đủ lặp lại để tạo thói quen.', rel: ['induction'] }
          ],
          arg: {
            claim: 'Niềm tin vào tương lai giống quá khứ không thể được biện minh bằng lý trí.',
            premises: ['Mọi suy luận về sự kiện thực tế ngoài kinh nghiệm hiện tại đều dựa vào quan hệ nhân quả.', 'Hiểu biết về nhân quả chỉ đến từ kinh nghiệm quá khứ.', 'Dùng kinh nghiệm quá khứ cho tương lai lại cần giả định “tương lai giống quá khứ” — điều chỉ có thể biện minh bằng kinh nghiệm, nên lập luận bị vòng tròn.'],
            objection: 'Khoa học hiện đại dùng xác suất: ta không cần chắc chắn tuyệt đối, chỉ cần niềm tin có xác suất cao, và khoa học đã thành công rực rỡ.',
            reply: 'Nhưng “quá khứ thành công thì tương lai cũng sẽ thành công” lại là quy nạp. Popper chọn hướng khác: khoa học không chứng minh lý thuyết mà chỉ cố bác bỏ chúng (khả năng bị bác bỏ).'
          },
          socra: ['Bạn có thể nghĩ ra một niềm tin hằng ngày nào không dựa vào quy nạp không?', 'Nếu nhân quả chỉ là thói quen, thì “khoa học” khác “mê tín” ở chỗ nào?', 'Hume tự nói ông vẫn chơi bài, ăn tối với bạn bè và quên hết hoài nghi. Điều đó có làm lập luận của ông yếu đi không?'],
          feynman: 'Dùng ví dụ con gà của Russell để giải thích vấn đề quy nạp cho một người bạn, trong 4–5 câu.',
          essay: 'Nếu Hume đúng, ta có nên bớt tin vào dữ liệu và dự báo không? Viết 150–250 chữ.',
          read: ['Hume — Khảo cứu về giác tính con người, mục IV–V', 'Bertrand Russell — Những vấn đề của triết học, chương 6']
        },
        {
          id: 'kant', title: 'Kant: hành động như thể đó là luật cho mọi người', sub: 'Bổn phận, phẩm giá và mệnh lệnh tuyệt đối', who: 'Immanuel Kant (1724–1804) · “Nền tảng siêu hình học về đạo đức”',
          q: 'Nói dối để cứu một người bạn có sai không? Điều gì làm một hành động đúng — kết quả, hay nguyên tắc?',
          context: '<p>Kant nói Hume đã “đánh thức ông khỏi giấc ngủ giáo điều”. Trong đạo đức, ông cũng tìm một nền tảng không phụ thuộc vào cảm xúc hay kết quả may rủi: <b>lý trí</b>.</p><p>Một hành động có giá trị đạo đức khi được làm <b>vì bổn phận</b>, chứ không chỉ <b>phù hợp với bổn phận</b>. Người bán hàng trả lại tiền thừa vì sợ mất khách thì đúng, nhưng chưa có giá trị đạo đức. Để biết bổn phận là gì, Kant đề ra phép thử: <b>mệnh lệnh tuyệt đối</b>.</p>',
          text: {
            src: 'Kant, Groundwork of the Metaphysic of Morals, II — bản dịch Thomas K. Abbott (1873, công cộng)',
            en: 'There is therefore but one categorical imperative, namely this: Act only on that maxim whereby thou canst at the same time will that it should become a universal law. … So act as to treat humanity, whether in thine own person or in that of any other, in every case as an end withal, never as means only.',
            vi: 'Vậy chỉ có một mệnh lệnh tuyệt đối, đó là: Chỉ hành động theo châm ngôn mà qua đó ngươi đồng thời có thể muốn nó trở thành một luật phổ quát. … Hãy hành động sao cho ngươi luôn đối xử với nhân tính, dù trong bản thân ngươi hay trong bất kỳ ai khác, đồng thời như một mục đích, không bao giờ chỉ như một phương tiện.',
            guide: ['“Châm ngôn” (maxim) là gì? Hãy viết châm ngôn của hành động “vay tiền và hứa trả dù biết mình sẽ không trả”.', 'Thử “phổ quát hoá” châm ngôn đó: nếu ai cũng làm vậy, chuyện gì xảy ra với lời hứa?', 'Trong công thức thứ hai, chữ “chỉ” (only) quan trọng thế nào? Ta có được nhờ người bán hàng phục vụ mình không?']
          },
          concepts: [
            { id: 'categorical', term: 'Mệnh lệnh tuyệt đối', def: 'Mệnh lệnh đạo đức ràng buộc vô điều kiện, không phụ thuộc vào mong muốn của ta; khác với mệnh lệnh giả định (“nếu muốn X thì làm Y”).', ex: '“Đừng nói dối” (tuyệt đối) so với “nếu muốn giữ khách thì đừng nói dối” (giả định).', counter: '“Nếu muốn khoẻ thì tập thể dục” — đúng, nhưng chỉ ràng buộc người muốn khoẻ.', rel: ['universalize', 'humanity-end', 'duty'] },
            { id: 'universalize', term: 'Phép thử phổ quát hoá', def: 'Hỏi: nếu ai cũng hành động theo châm ngôn này, nó có còn tự nhất quán không? Nếu tự phá huỷ khi phổ quát hoá thì hành động đó sai.', ex: 'Nếu ai cũng hứa dối khi cần tiền, sẽ không ai tin lời hứa nữa → châm ngôn tự huỷ.', counter: '“Mình sẽ học Kant vào thứ Ba” — phổ quát hoá thì bất tiện, nhưng không tự mâu thuẫn, nên không bị cấm.', rel: ['categorical'] },
            { id: 'humanity-end', term: 'Coi con người là mục đích', def: 'Không bao giờ được chỉ dùng người khác (hay chính mình) như công cụ; phải tôn trọng khả năng tự chọn mục đích của họ.', ex: 'Thuê thợ sửa điện và trả công sòng phẳng: có dùng họ như phương tiện, nhưng không CHỈ như phương tiện.', counter: 'Lừa người khác ký giấy họ không hiểu — biến họ thành công cụ thuần tuý.', rel: ['categorical', 'autonomy'] },
            { id: 'duty', term: 'Hành động vì bổn phận', def: 'Giá trị đạo đức nằm ở động cơ: làm điều đúng vì nó đúng, không vì lợi ích hay cảm xúc dễ chịu.', ex: 'Giữ lời hứa với bạn dù việc đó giờ đã chẳng còn vui hay có lợi cho mình.', counter: 'Người bán hàng thật thà chỉ vì sợ mất uy tín — đúng bổn phận nhưng không vì bổn phận.', rel: ['categorical', 'consequentialism'] },
            { id: 'autonomy', term: 'Tự trị (autonomy)', def: 'Lý trí tự đặt ra luật đạo đức cho chính mình, thay vì bị chi phối từ bên ngoài (dục vọng, quyền lực, phần thưởng). Đây là nguồn gốc phẩm giá con người.', ex: 'Không gian lận dù chắc chắn không ai phát hiện.', counter: 'Làm điều tốt chỉ vì sợ bị phạt — tha trị (heteronomy).', rel: ['humanity-end', 'existence-essence'] },
            { id: 'consequentialism', term: 'Hệ quả luận (đối chiếu)', def: 'Lập trường đối lập (Bentham, Mill): hành động đúng là hành động tạo ra kết quả tốt nhất cho nhiều người nhất.', ex: 'Nói dối kẻ sát nhân để cứu bạn là đúng, vì cứu được một mạng người.', counter: 'Với Kant, kết quả tốt không biện minh được cho việc dùng một người như công cụ.', rel: ['duty'] }
          ],
          arg: {
            claim: 'Nói dối luôn sai, kể cả khi có thể đem lại kết quả tốt.',
            premises: ['Hành động đúng là hành động theo châm ngôn có thể phổ quát hoá mà không tự mâu thuẫn.', 'Châm ngôn “được nói dối khi có lợi” nếu phổ quát hoá sẽ phá huỷ chính lòng tin mà lời nói dối cần để thành công.', 'Nói dối còn coi người nghe như công cụ, tước đi khả năng tự quyết dựa trên sự thật.'],
            objection: 'Ví dụ kẻ sát nhân gõ cửa hỏi bạn của bạn trốn ở đâu: nói thật để bạn bị giết thì thật phi lý. Đạo đức không thể cứng nhắc như vậy.',
            reply: 'Nhiều người theo Kant ngày nay sửa lại: châm ngôn có thể cụ thể hơn (“được nói dối với kẻ đang định giết người vô tội”) và vẫn phổ quát hoá được; hoặc ưu tiên bổn phận không coi người vô tội là phương tiện. Bản thân Kant thì giữ lập trường cứng.'
          },
          socra: ['Bạn sẽ làm gì với kẻ sát nhân gõ cửa? Lý do của bạn dựa vào kết quả hay nguyên tắc?', 'Có trường hợp nào bạn làm điều đúng nhưng không vì bổn phận không? Nó có kém giá trị hơn không?', 'Mạng xã hội “miễn phí” có đang dùng ta chỉ như phương tiện không?'],
          feynman: 'Dùng ví dụ vay tiền hứa trả, giải thích cách phép thử phổ quát hoá hoạt động cho một người chưa học triết.',
          essay: 'So sánh Kant và hệ quả luận qua ví dụ kẻ sát nhân gõ cửa. Bạn nghiêng về bên nào và vì sao? 200–300 chữ.',
          read: ['Kant — Nền tảng siêu hình học về đạo đức, chương I–II', 'Michael Sandel — Công lý: điều đúng nên làm là gì? (chương về Kant)']
        }
      ]
    },
    {
      title: 'Phần III · Đương đại — tự do và ý nghĩa',
      lessons: [
        {
          id: 'existentialism', title: 'Hiện sinh: tồn tại có trước bản chất', sub: 'Tự do, trách nhiệm, phi lý — Sartre & Camus', who: 'Jean-Paul Sartre (1905–1980) · Albert Camus (1913–1960)',
          q: 'Nếu không có ai định sẵn bạn là ai và sống để làm gì, thì đó là gánh nặng hay tự do?',
          context: '<p>Châu Âu sau Thế chiến II: niềm tin vào tiến bộ, tôn giáo, các hệ thống lớn đều rạn vỡ. Sartre tuyên bố: với con người, <b>tồn tại có trước bản chất</b> — ta xuất hiện trước, rồi tự tạo nên mình qua lựa chọn.</p><p>Con dao được làm ra theo bản thiết kế (bản chất có trước); con người thì không có bản thiết kế nào. Vì thế ta “bị kết án phải tự do” — và chịu trách nhiệm hoàn toàn.</p><p>Camus đi một hướng gần đó: con người khao khát ý nghĩa, còn vũ trụ thì im lặng — đó là <b>cái phi lý</b>. Câu trả lời của ông không phải tuyệt vọng mà là nổi loạn: sống trọn vẹn dù biết vậy, như Sisyphus đẩy tảng đá.</p>',
          text: {
            src: 'Tóm lược ý của Sartre, “Thuyết hiện sinh là một thuyết nhân bản” (1946) và Camus, “Huyền thoại Sisyphus” (1942) — các tác phẩm còn bản quyền nên ở đây chỉ diễn ý, kèm vài cụm trích rất ngắn',
            en: 'Sartre: “existence precedes essence”; man is “condemned to be free” and “nothing else but what he makes of himself”.\nCamus: the absurd is born of the confrontation between the human need and “the unreasonable silence of the world”. His essay ends: “One must imagine Sisyphus happy.”',
            vi: 'Sartre: “tồn tại có trước bản chất”; con người “bị kết án phải tự do” và “không là gì khác ngoài cái mà anh ta tự làm nên”. Khi chọn cho mình, ta như đang chọn hình mẫu con người cho cả nhân loại — nên trách nhiệm là vô cùng.\nCamus: cái phi lý sinh ra từ cuộc chạm trán giữa nhu cầu (tìm ý nghĩa) của con người và “sự im lặng vô lý của thế giới”. Bài tiểu luận khép lại: “Phải tưởng tượng Sisyphus hạnh phúc.”',
            guide: ['“Tồn tại có trước bản chất” khác thế nào với câu “con người sinh ra đã có số phận”?', 'Vì sao Sartre dùng chữ “bị kết án” cho tự do? Tự do mà lại như hình phạt?', 'Sisyphus phải đẩy đá mãi mãi. Hạnh phúc của ông (nếu có) nằm ở đâu?']
          },
          concepts: [
            { id: 'existence-essence', term: 'Tồn tại có trước bản chất', def: 'Con người không có bản chất định sẵn; ta tồn tại trước, rồi tự định nghĩa mình qua các lựa chọn và hành động.', ex: 'Không ai “sinh ra để làm kế toán”; bạn trở thành người như thế nào là do những gì bạn chọn làm mỗi ngày.', counter: 'Đồ vật chế tạo: cái kéo có công dụng (bản chất) được định trước khi nó tồn tại.', rel: ['radical-freedom', 'autonomy'] },
            { id: 'radical-freedom', term: 'Tự do & trách nhiệm triệt để', def: 'Vì không có bản chất hay chuẩn mực có sẵn, ta luôn phải chọn và hoàn toàn chịu trách nhiệm về lựa chọn — kể cả lựa chọn “không chọn”.', ex: 'Không nộp đơn vào trường mơ ước vì sợ trượt — cũng là một lựa chọn mình phải chịu.', counter: 'Tự do như “muốn gì làm nấy” — Sartre nhấn mạnh gánh nặng trách nhiệm đi kèm, không phải sự thoải mái.', rel: ['existence-essence', 'bad-faith'] },
            { id: 'bad-faith', term: 'Ngụy tín (mauvaise foi)', def: 'Tự lừa mình rằng mình không có lựa chọn — đổ cho hoàn cảnh, vai trò, bản tính — để trốn trách nhiệm của tự do.', ex: '“Tôi vốn nóng tính rồi, không đổi được” — biến một thói quen thành số phận.', counter: 'Thừa nhận giới hạn thật (bị ốm không đi được) — đó là thực tế, không phải tự lừa.', rel: ['radical-freedom'] },
            { id: 'absurd', term: 'Cái phi lý (Camus)', def: 'Sự đối lập giữa khát vọng tìm ý nghĩa, sự rõ ràng của con người và một thế giới không trả lời. Phi lý không nằm ở người hay ở thế giới, mà ở mối quan hệ giữa hai bên.', ex: 'Làm việc cả tuần, cuối tuần nghỉ, lặp lại — một ngày bỗng hỏi “tất cả để làm gì?”.', counter: 'Một việc vô lý kiểu hành chính rườm rà — gây bực mình nhưng không phải phi lý theo nghĩa triết học.', rel: ['revolt'] },
            { id: 'revolt', term: 'Nổi loạn (révolte)', def: 'Phản ứng của Camus trước cái phi lý: không trốn vào hy vọng siêu hình, không tự huỷ, mà sống tỉnh táo, đam mê và tự do ngay trong giới hạn.', ex: 'Biết bản nhạc sẽ kết thúc mà vẫn chơi hết mình.', counter: '“Nhảy vọt niềm tin” — gán ý nghĩa từ bên ngoài để khỏi đối mặt; Camus gọi là tự sát triết học.', rel: ['absurd', 'examined-life'] }
          ],
          arg: {
            claim: 'Con người hoàn toàn chịu trách nhiệm về việc mình là ai.',
            premises: ['Không có bản chất con người định sẵn (không có Thượng đế thiết kế, hay một “bản tính” cố định).', 'Vì vậy, con người chỉ là tổng các lựa chọn và hành động của mình.', 'Ai là tác giả của các lựa chọn thì chịu trách nhiệm về kết quả của chúng.'],
            objection: 'Hoàn cảnh (nghèo đói, giới tính, nơi sinh, gen) giới hạn rất mạnh lựa chọn của ta. Nói “hoàn toàn chịu trách nhiệm” là bất công với người yếu thế. (Simone de Beauvoir và Sartre về sau cũng thừa nhận điều này.)',
            reply: 'Sartre phân biệt “hoàn cảnh” (situation) với tự do: ta không chọn hoàn cảnh, nhưng luôn chọn cách đối diện với nó. Bản thân ông về sau nhấn mạnh hơn vai trò của điều kiện xã hội.'
          },
          socra: ['Bạn có câu “mình vốn là người như vậy” nào hay dùng không? Đó là sự thật hay ngụy tín?', 'Nếu được chọn hoàn toàn, có phải lúc nào bạn cũng muốn tự do nhiều hơn không?', 'Sisyphus có thể hạnh phúc thật, hay đó chỉ là cách nói đẹp cho sự cam chịu?'],
          feynman: 'Giải thích “tồn tại có trước bản chất” bằng ví dụ con dao và con người, cho một người bạn chưa học triết.',
          essay: '“Phải tưởng tượng Sisyphus hạnh phúc.” Bạn hiểu câu này thế nào và có đồng ý không? 200–300 chữ, liên hệ đời sống của bạn.',
          read: ['Sartre — Thuyết hiện sinh là một thuyết nhân bản (bài nói ngắn)', 'Camus — Huyền thoại Sisyphus; Người xa lạ (tiểu thuyết)']
        }
      ]
    }
  ]
};
