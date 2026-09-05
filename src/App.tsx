import React, { useReducer, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wine,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Download,
  Sparkles,
  X,
} from "lucide-react";

// 35 個核心屬性
const ATTRIBUTES = [
  "親密貼貼",
  "接吻",
  "深吻",
  "舔陰",
  "口交",
  "實戰(插入)",
  "羽觸輕撫",
  "指交",
  "手交",
  "陰蒂高潮",
  "內部高潮",
  "腦高潮",
  "潮吹",
  "情趣用品",
  "玩弄乳頭",
  "言語調教",
  "體外子宮頸高潮",
  "挑逗寸止",
  "蒙眼",
  "打屁股",
  "扼頸窒息",
  "拘束/繩縛",
  "深喉",
  "當做飛機杯",
  "激烈猛幹",
  "肛交",
  "無套/內射",
  "多人玩法",
  "拍攝",
  "角色扮演",
  "鏡前性愛",
  "催眠",
  "NTR",
  "野外/戶外",
  "吞精",
];

// 70 題情境題庫
const QUESTIONS = [
  {
    id: "q1",
    attrIdx: 0,
    text: "在親密互動中，比起激烈的性行為，單純的肌膚相親與長時間的擁抱，更能讓我感受到深刻的滿足。",
  },
  {
    id: "q2",
    attrIdx: 0,
    text: "感受彼此毫無阻隔的體溫與心跳，這種純粹的肢體貼合是我在親密關係中不可或缺的環節。",
  },
  {
    id: "q3",
    attrIdx: 1,
    text: "我非常享受唇與唇之間溫柔而細膩的接觸，這能讓我感受到強烈的愛意傳遞。",
  },
  {
    id: "q4",
    attrIdx: 1,
    text: "在任何親密行為開始前，透過單純的親吻來醞釀氣氛，對我來說是極度重要的。",
  },
  {
    id: "q5",
    attrIdx: 2,
    text: "比起淺嚐輒止，我更渴望帶有侵略性、深入交纏的法式舌吻。",
  },
  {
    id: "q6",
    attrIdx: 2,
    text: "透過強烈的舌尖糾纏與交換彼此氣息、唾液的過程，能讓我瞬間產生強烈的性喚起。",
  },
  {
    id: "q7",
    attrIdx: 3,
    text: "針對私密處進行柔軟而濕潤的舔舐（無論是為伴侶服務或由伴侶為我服務），能帶來無可取代的愉悅。",
  },
  {
    id: "q8",
    attrIdx: 3,
    text: "用唇舌仔細探索最敏感的地帶，這種伴隨溫熱氣息與液體的感官刺激讓我深感著迷。",
  },
  {
    id: "q9",
    attrIdx: 4,
    text: "透過口腔的包覆與吞嚥動作來刺激性器官（無論給予或享受），是性愛中極具視覺與肉體張力的一環。",
  },
  {
    id: "q10",
    attrIdx: 4,
    text: "感受敏感部位被溫熱的口腔完全含住並以舌頭挑逗，這種強烈的集中刺激讓我難以抗拒。",
  },
  {
    id: "q11",
    attrIdx: 5,
    text: "生殖器緊密結合的充實感，是其他任何邊緣行為都無法完全替代的核心體驗。",
  },
  {
    id: "q12",
    attrIdx: 5,
    text: "透過最原始的律動、摩擦與肉體碰撞，達到靈肉合一的境界，是我最渴望的性愛形式。",
  },
  {
    id: "q13",
    attrIdx: 6,
    text: "指尖或羽毛在肌膚表層進行極輕微、若有似無的游移，這種酥麻感能讓我全身起雞皮疙瘩。",
  },
  {
    id: "q14",
    attrIdx: 6,
    text: "比起用力的揉捏，我更喜歡在敏感帶附近進行極度輕柔的挑逗，讓期待感無限放大。",
  },
  {
    id: "q15",
    attrIdx: 7,
    text: "運用手指深入探索內部的敏感點並靈活摳挖（無論給予或承受），能帶來極度精準的快感。",
  },
  {
    id: "q16",
    attrIdx: 7,
    text: "透過手指彎曲與探鑽的技巧來引發內部高潮，這種局部而強烈的刺激讓我十分享受。",
  },
  {
    id: "q17",
    attrIdx: 8,
    text: "單純運用手部的技巧、節奏與力道來摩擦套弄（無論給予或承受），也能帶來極致的視覺與生理快感。",
  },
  {
    id: "q18",
    attrIdx: 8,
    text: "透過雙手的包覆與熟練的上下滑動，掌控對方（或被掌控）射精邊緣的快感，讓我感到特別興奮。",
  },
  {
    id: "q19",
    attrIdx: 9,
    text: "針對外部最敏感的核心（如陰蒂）進行快速且集中的摩擦刺激，是我達到高潮最重要的途徑。",
  },
  {
    id: "q20",
    attrIdx: 9,
    text: "強烈且不間斷的外部點狀刺激，能引發極其劇烈、如觸電般的感官爆發。",
  },
  {
    id: "q21",
    attrIdx: 10,
    text: "透過深層的內部撞擊、填滿與擠壓，能帶來一種由內而外擴散的深沉愉悅感。",
  },
  {
    id: "q22",
    attrIdx: 10,
    text: "來自體內深處不斷被摩擦與頂撞，這種靈肉深層結合的高潮體驗是我最嚮往的。",
  },
  {
    id: "q23",
    attrIdx: 11,
    text: "有時不需要過多的肢體接觸，僅靠特定的氛圍、低聲耳語或特定的聲音（如ASMR），就能讓我頭皮發麻、性慾高漲。",
  },
  {
    id: "q24",
    attrIdx: 11,
    text: "精神層面的強烈共鳴與情境營造，能引發我大腦深處如高潮般的酥麻與震顫。",
  },
  {
    id: "q25",
    attrIdx: 12,
    text: "看見伴侶達到如潮水般失控噴發的高潮（或自身經歷此狀態），能為我帶來極大的視覺震撼與成就感。",
  },
  {
    id: "q26",
    attrIdx: 12,
    text: "突破身體防線，伴隨著大量透明液體釋放的極度失控感，這種瘋狂的體驗讓我深感嚮往。",
  },
  {
    id: "q27",
    attrIdx: 13,
    text: "我喜歡將震動器、跳蛋等無機玩具引入親密互動中，這能突破單純肉體的限制，帶來新奇的刺激。",
  },
  {
    id: "q28",
    attrIdx: 13,
    text: "借助情趣用品的高頻率震動或特殊構造，能讓我或伴侶體驗到人力難以企及的極致快感。",
  },
  {
    id: "q29",
    attrIdx: 14,
    text: "針對胸前敏感點的揉捏、吸吮或輕咬，能瞬間點燃我的慾火（或我喜歡看伴侶因此沉醉）。",
  },
  {
    id: "q30",
    attrIdx: 14,
    text: "胸部被強烈關注與持續刺激時所產生的電流感，會直接與下半身的快感產生強烈連結。",
  },
  {
    id: "q31",
    attrIdx: 15,
    text: "在過程中聽見（或說出）帶有粗暴、貶低、淫穢或強烈羞辱意味的詞彙，能大幅提升我的興奮度。",
  },
  {
    id: "q32",
    attrIdx: 15,
    text: "透過言語指令建立明確的「掌控者與服從者」關係，這種心理層面的權力傾斜讓我非常沉迷。",
  },
  {
    id: "q33",
    attrIdx: 16,
    text: "感受內部最深處（如子宮頸口）被強烈頂撞（無論給予或承受），這種伴隨輕微痛楚的極致快感讓我無法自拔。",
  },
  {
    id: "q34",
    attrIdx: 16,
    text: "深層宮口被不斷且猛烈地撞擊所引發的深層痙攣與酸麻感，是一種超越普通高潮的極限體驗。",
  },
  {
    id: "q35",
    attrIdx: 17,
    text: "在即將高潮的邊緣被刻意停下（或要求對方停止），這種長時間累積卻不釋放的折磨感讓我異常興奮。",
  },
  {
    id: "q36",
    attrIdx: 17,
    text: "享受高潮被剝奪、只能不斷乞求的過程，慾望被無限拉長的期待感是極具魅力的。",
  },
  {
    id: "q37",
    attrIdx: 18,
    text: "剝奪視覺後，將身體完全交由伴侶處置（或掌控被蒙眼的伴侶），這種未知的刺激讓我心跳加速。",
  },
  {
    id: "q38",
    attrIdx: 18,
    text: "在看不見的狀態下，其他感官（觸覺、聽覺）被無限放大，任何微小的碰觸都能引發劇烈的反應。",
  },
  {
    id: "q39",
    attrIdx: 19,
    text: "在性愛過程中，臀部受到帶有清脆聲響與痛感的拍打（無論給予或承受），能讓我感到特別興奮。",
  },
  {
    id: "q40",
    attrIdx: 19,
    text: "肌膚上留下的紅腫印記，以及痛覺瞬間轉化為快感的過程，帶有一種獨特的懲罰與獎賞意味。",
  },
  {
    id: "q41",
    attrIdx: 20,
    text: "頸部被用力掐住，感受短暫呼吸困難帶來的瀕死眩暈與快感（無論掌控或被掌控），讓我極度著迷。",
  },
  {
    id: "q42",
    attrIdx: 20,
    text: "掌握對方的呼吸權（或將呼吸權交給對方），這種極致危險與絕對信任交織的支配感讓我無法抗拒。",
  },
  {
    id: "q43",
    attrIdx: 21,
    text: "身體被繩索或道具綑綁，徹底失去行動能力，被迫承受各種刺激，這種無力感（或掌控感）讓我十分享受。",
  },
  {
    id: "q44",
    attrIdx: 21,
    text: "看著伴侶（或自己）在束縛中無助扭動、無法掙脫的姿態，能極大程度滿足我的特殊癖好。",
  },
  {
    id: "q45",
    attrIdx: 22,
    text: "突破嘔吐反射，讓性器官深達喉嚨深處（無論給予或承受），這種強烈的視覺與感官刺激讓我瘋狂。",
  },
  {
    id: "q46",
    attrIdx: 22,
    text: "喉嚨被完全填滿，甚至帶有輕微窒息感，這種徹底征服與被征服的行為充滿了野性魅力。",
  },
  {
    id: "q47",
    attrIdx: 23,
    text: "將伴侶（或被伴侶）當作純粹洩慾的工具般強烈對待，這種拋開溫情、充滿物化意味的情境讓我深感著迷。",
  },
  {
    id: "q48",
    attrIdx: 23,
    text: "偶爾捨棄情感交流，僅僅作為發洩性慾的肉體容器來無情使用，這種粗暴的關係設定能激發我的狂熱。",
  },
  {
    id: "q49",
    attrIdx: 24,
    text: "拋棄前戲與溫柔，直接進入狂暴、高速且毫無保留的衝刺，這才是我心目中完美的性愛。",
  },
  {
    id: "q50",
    attrIdx: 24,
    text: "伴隨汗水、急促呼吸與肉體猛烈拍打聲的野蠻交媾，能讓我完全釋放內心的野獸。",
  },
  {
    id: "q51",
    attrIdx: 25,
    text: "突破常規禁忌的後庭探索（無論給予或承受），帶來有別於一般通道的緊緻與壓迫刺激，這讓我很感興趣。",
  },
  {
    id: "q52",
    attrIdx: 25,
    text: "克服初期的不適感後，在後方孔洞中獲得的深層摩擦與征服感，是一種極具破壞性與背德感的愉悅。",
  },
  {
    id: "q53",
    attrIdx: 26,
    text: "毫無阻隔的零距離接觸，以及感受溫熱液體在體內深處（或射入對方體內）釋放，是我最渴望的結局。",
  },
  {
    id: "q54",
    attrIdx: 26,
    text: "將體液毫無保留地留在最深處，這種帶有原始繁衍本能、標記佔有慾的行為，能帶來最高的滿足感。",
  },
  {
    id: "q55",
    attrIdx: 27,
    text: "同時與兩名或以上的伴侶進行互動，這種突破一對一限制的混亂與淫蕩氛圍，讓我感到異常興奮。",
  },
  {
    id: "q56",
    attrIdx: 27,
    text: "在多重視覺、聽覺與來自四面八方的肉體刺激交織下，享受徹底沉淪於性愛派對中的背德感。",
  },
  {
    id: "q57",
    attrIdx: 28,
    text: "將私密過程錄影或拍照，享受被鏡頭記錄下的羞恥感（或是掌鏡記錄伴侶淫態的掌控感）。",
  },
  {
    id: "q58",
    attrIdx: 28,
    text: "事後回顧這些真實且充滿張力的色情影像，能夠讓我再次產生極度強烈的性喚起。",
  },
  {
    id: "q59",
    attrIdx: 29,
    text: "穿上特定的服裝（如護士、警察、學生），並完全融入虛構的情境設定中，能大幅增加我的性致。",
  },
  {
    id: "q60",
    attrIdx: 29,
    text: "在床上捨棄原本的自我，扮演另一個截然不同的角色進行互動，這種抽離現實的感覺讓我深感著迷。",
  },
  {
    id: "q61",
    attrIdx: 30,
    text: "在巨大的鏡子前，看著自己與伴侶赤裸交纏的淫蕩模樣，這會為我帶來強烈的視覺刺激與羞恥感。",
  },
  {
    id: "q62",
    attrIdx: 30,
    text: "透過鏡面反射清晰地確認雙方結合的部位、動作與沉醉的表情，是我非常喜歡的助興方式。",
  },
  {
    id: "q63",
    attrIdx: 31,
    text: "透過言語暗示或情境引導，讓對方進入大腦空白的服從狀態（或自身享受意識被剝奪的感覺），非常有吸引力。",
  },
  {
    id: "q64",
    attrIdx: 31,
    text: "享受理智被強制關閉、只能無條件聽從淫靡指令的奇異快感，這是一種極致的精神支配。",
  },
  {
    id: "q65",
    attrIdx: 32,
    text: "想像或親眼目睹伴侶與他人發生親密行為（或自己與他人背著伴侶亂來），這種痛苦與興奮交織的感覺十分強烈。",
  },
  {
    id: "q66",
    attrIdx: 32,
    text: "在關係中刻意引入「奪取」或「被奪取」的情境設定，極限的綠帽/出軌背德感會讓我慾火焚身。",
  },
  {
    id: "q67",
    attrIdx: 33,
    text: "在可能被他人發現的公共場所或戶外（如車震、暗巷、樓梯間）進行親密行為，能帶來極大的刺激感。",
  },
  {
    id: "q68",
    attrIdx: 33,
    text: "伴隨著「隨時可能曝光」的極度恐懼與緊張感，反而能讓我的性慾與敏感度大幅飆高。",
  },
  {
    id: "q69",
    attrIdx: 34,
    text: "將伴侶的體液吞入腹中，或看著伴侶毫無保留地吞下自己的體液，是一種極度深層的接納與佔有。",
  },
  {
    id: "q70",
    attrIdx: 34,
    text: "把帶有腥味的液體當作愛的證明、或臣服的象徵完全嚥下，這種充滿儀式感的行為讓我感到滿足。",
  },
];

const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);

const getLevelData = (score) => {
  if (score >= 10)
    return {
      label: "狂熱",
      color: "bg-rose-500",
      text: "text-rose-400",
      percent: "100%",
      glow: "rgba(244,63,94,0.6)",
    };
  if (score >= 8)
    return {
      label: "喜歡",
      color: "bg-pink-500",
      text: "text-pink-400",
      percent: "75%",
      glow: "rgba(236,72,153,0.5)",
    };
  if (score >= 6)
    return {
      label: "好奇",
      color: "bg-purple-500",
      text: "text-purple-400",
      percent: "50%",
      glow: "rgba(168,85,247,0.4)",
    };
  if (score >= 4)
    return {
      label: "無感",
      color: "bg-blue-500",
      text: "text-blue-400",
      percent: "25%",
      glow: "rgba(59,130,246,0.3)",
    };
  return {
    label: "抵觸",
    color: "bg-transparent",
    text: "text-slate-500",
    percent: "0%",
    glow: "transparent",
  };
};

const generateTitle = (scores) => {
  const dominance = [15, 19, 20, 21, 31];
  const hardcore = [22, 23, 24, 25, 26, 34];
  const taboo = [27, 28, 30, 32, 33];
  const gentle = [0, 1, 6, 11];

  let domScore = 0,
    hardScore = 0,
    tabooScore = 0,
    gentleScore = 0;

  scores.forEach((s, idx) => {
    if (s >= 8) {
      if (dominance.includes(idx)) domScore++;
      if (hardcore.includes(idx)) hardScore++;
      if (taboo.includes(idx)) tabooScore++;
      if (gentle.includes(idx)) gentleScore++;
    }
  });

  if (domScore >= 3) return "午夜的狂熱支配/臣服者";
  if (tabooScore >= 3) return "無所畏懼的禁忌探索者";
  if (hardScore >= 4) return "純粹肉慾的狂熱信徒";
  if (gentleScore >= 3) return "極致感官的浪漫沉迷者";
  return "深藏不露的慾望品鑑家";
};

const initialState = {
  status: "start",
  answers: {},
  currentPage: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_QUIZ":
      return { ...state, status: "quiz", currentPage: 0 };
    case "ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.id]: action.payload.score,
        },
      };
    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, TOTAL_PAGES - 1),
      };
    case "PREV_PAGE":
      return { ...state, currentPage: Math.max(state.currentPage - 1, 0) };
    case "FINISH":
      return { ...state, status: "result" };
    case "RESET":
      return { status: "start", answers: {}, currentPage: 0 };
    case "LOAD_STATE":
      return { ...action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null); // 新增：用來儲存生成的圖片網址
  const resultRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("desire_cocktail_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) dispatch({ type: "LOAD_STATE", payload: parsed });
      }
    } catch (e) {
      console.warn("目前環境不支援進度自動儲存", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("desire_cocktail_state", JSON.stringify(state));
    } catch (e) {
      // 靜默失敗
    }
  }, [state]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  // 修改後的圖片生成邏輯：改成設定圖片狀態，讓畫面彈出供用戶長按儲存
  const handleDownload = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);
    try {
      if (!window.html2canvas) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      window.scrollTo(0, 0);
      await new Promise((res) => setTimeout(res, 500)); // 等待畫面歸位

      const canvas = await window.html2canvas(resultRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
      });

      const image = canvas.toDataURL("image/png", 1.0);
      setGeneratedImage(image); // 觸發彈出視窗，顯示這張圖
    } catch (err) {
      console.error("Screenshot failed:", err);
      alert("圖片生成失敗，請確保環境支援截圖功能。");
    } finally {
      setIsDownloading(false);
    }
  };

  const renderStart = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 relative z-10"
    >
      <div className="w-28 h-28 mb-8 rounded-full bg-gradient-to-tr from-blue-600 via-purple-500 to-rose-500 p-[2px] mx-auto shadow-[0_0_50px_rgba(219,39,119,0.3)]">
        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden">
          <Wine className="w-12 h-12 text-pink-400 relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 tracking-wider">
        慾望調酒
      </h1>
      <h2 className="text-lg md:text-xl text-slate-300 font-medium mb-8 tracking-widest flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" /> 成人向喜好探索測驗
      </h2>

      <div className="bg-slate-900/60 border border-slate-700/50 px-6 py-5 rounded-2xl mb-10 text-sm md:text-base text-slate-300 max-w-lg leading-relaxed shadow-xl">
        <p className="mb-2">
          歡迎來到午夜 Lounge Bar。這裡有 70 道情境，將深度解析您的私密渴望。
        </p>
        <p className="text-slate-400">
          請依據您內心最真實的感受作答。測驗結束後，將為您調製出一杯杯專屬的「慾望調酒圖鑑」。
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          dispatch({ type: "START_QUIZ" });
          scrollToTop();
        }}
        className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(219,39,119,0.5)] flex items-center gap-3 transition-shadow hover:shadow-[0_0_40px_rgba(219,39,119,0.7)]"
      >
        開始測驗 <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );

  const renderLikertScale = (questionId) => {
    const options = [
      {
        value: 1,
        size: "w-12 h-12 md:w-14 md:h-14",
        defaultClass: "border-slate-700 text-slate-500",
        activeClass: "bg-slate-700 border-slate-500 text-white shadow-inner",
      },
      {
        value: 2,
        size: "w-10 h-10 md:w-12 md:h-12",
        defaultClass: "border-slate-800 text-slate-600",
        activeClass: "bg-slate-600 border-slate-500 text-white",
      },
      {
        value: 3,
        size: "w-8 h-8 md:w-10 md:h-10",
        defaultClass: "border-slate-800/50 text-slate-700",
        activeClass: "bg-blue-900/60 border-blue-500/50 text-blue-300",
      },
      {
        value: 4,
        size: "w-10 h-10 md:w-12 md:h-12",
        defaultClass: "border-purple-900/50 text-purple-800",
        activeClass:
          "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]",
      },
      {
        value: 5,
        size: "w-12 h-12 md:w-14 md:h-14",
        defaultClass: "border-pink-900/50 text-pink-800",
        activeClass:
          "bg-pink-600 border-pink-500 text-white shadow-[0_0_20px_rgba(219,39,119,0.6)]",
      },
    ];

    return (
      <div className="flex flex-col items-center mt-6">
        <div className="flex justify-between items-center w-full max-w-md gap-2 px-2">
          <span className="text-xs font-medium text-slate-500 w-12 text-right">
            強烈
            <br />
            不同意
          </span>
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-1">
            {options.map((opt) => {
              const isSelected = state.answers[questionId] === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    dispatch({
                      type: "ANSWER",
                      payload: { id: questionId, score: opt.value },
                    })
                  }
                  className={`rounded-full border-2 transition-all duration-200 flex-shrink-0 flex items-center justify-center text-sm font-bold ${
                    opt.size
                  } ${
                    isSelected
                      ? opt.activeClass
                      : `bg-slate-900 hover:bg-slate-800 ${opt.defaultClass}`
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
          <span className="text-xs font-medium text-pink-500/70 w-12 text-left">
            強烈
            <br />
            同意
          </span>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const startIndex = state.currentPage * QUESTIONS_PER_PAGE;
    const currentQuestions = QUESTIONS.slice(
      startIndex,
      startIndex + QUESTIONS_PER_PAGE
    );
    const progress = (state.currentPage / TOTAL_PAGES) * 100;
    const isLastPage = state.currentPage === TOTAL_PAGES - 1;
    const isCurrentPageComplete = currentQuestions.every(
      (q) => state.answers[q.id]
    );

    const handleNext = () => {
      if (!isCurrentPageComplete) {
        setErrorMsg("請完成本頁所有題目再繼續哦！");
        return;
      }
      if (isLastPage) dispatch({ type: "FINISH" });
      else dispatch({ type: "NEXT_PAGE" });
      scrollToTop();
    };

    return (
      <motion.div
        key={`page-${state.currentPage}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-3xl mx-auto py-6 px-4"
      >
        <div className="mb-8 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 sticky top-4 z-40 shadow-lg">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>
              進度 {state.currentPage + 1} / {TOTAL_PAGES} ({startIndex + 1}-
              {Math.min(startIndex + 5, 70)}題)
            </span>
            <span className="text-pink-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              initial={{ width: `${(state.currentPage / TOTAL_PAGES) * 100}%` }}
              animate={{ width: `${progress + 100 / TOTAL_PAGES}%` }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="absolute inset-0 bg-white/20 w-full h-full"
                style={{ animation: "shimmer 2s infinite" }}
              />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-rose-400 text-sm mb-4 font-medium bg-rose-950/30 py-2 rounded-lg border border-rose-900/50"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6 mb-10">
          {currentQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 md:p-8 rounded-3xl shadow-xl transition-all hover:border-purple-500/30"
            >
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-slate-500 tracking-wider bg-slate-900 px-3 py-1 rounded-full">
                  Q{startIndex + idx + 1}
                </span>
              </div>
              <p className="text-slate-200 text-base md:text-lg text-center leading-relaxed font-medium">
                {q.text}
              </p>
              {renderLikertScale(q.id)}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pb-12">
          <button
            onClick={() => {
              dispatch({ type: "PREV_PAGE" });
              scrollToTop();
            }}
            disabled={state.currentPage === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
              state.currentPage === 0
                ? "opacity-0 pointer-events-none"
                : "text-slate-400 bg-slate-900 border border-slate-700 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> 上一頁
          </button>
          <button
            onClick={handleNext}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold transition-all ${
              isCurrentPageComplete
                ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.4)] hover:scale-105"
                : "bg-slate-800 text-slate-500 border border-slate-700"
            }`}
          >
            {isLastPage ? "調製圖鑑" : "下一頁"}{" "}
            {isLastPage ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  const renderResult = () => {
    const attrScores = ATTRIBUTES.map((_, idx) => {
      const q1Score = state.answers[`q${idx * 2 + 1}`] || 0;
      const q2Score = state.answers[`q${idx * 2 + 2}`] || 0;
      return q1Score + q2Score;
    });

    const userTitle = generateTitle(attrScores);

    const stats = { fanatic: 0, like: 0, neutral: 0, dislike: 0 };
    attrScores.forEach((score) => {
      if (score >= 10) stats.fanatic++;
      else if (score >= 8) stats.like++;
      else if (score >= 6) stats.neutral++;
      else stats.dislike++;
    });

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1200px] mx-auto py-10 px-2 md:px-6 flex flex-col items-center"
      >
        <div className="mb-6 flex gap-4 z-20 relative">
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              scrollToTop();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700 backdrop-blur-md"
          >
            <RotateCcw className="w-4 h-4" /> 重新測驗
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold transition-all border border-pink-500/50 backdrop-blur-md ${
              isDownloading
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_15px_rgba(219,39,119,0.5)]"
            }`}
          >
            {isDownloading ? (
              <span className="animate-pulse">生成中...</span>
            ) : (
              <>
                <Download className="w-4 h-4" /> 儲存圖鑑
              </>
            )}
          </button>
        </div>

        <div
          ref={resultRef}
          className="w-full bg-[#0a0f1c] p-6 md:p-10 rounded-[2rem] border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(88,28,135,0.15) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(219,39,119,0.1) 0%, transparent 50%)",
          }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center relative z-10 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 text-slate-300 border border-slate-700 text-sm mb-4">
              <Wine className="w-4 h-4 text-pink-400" /> 專屬慾望調酒分析
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 mb-2 tracking-widest drop-shadow-sm">
              {userTitle}
            </h2>

            <div className="flex justify-center gap-3 md:gap-6 mt-6">
              <div className="bg-slate-900/60 border border-rose-500/30 px-4 py-2 rounded-xl text-center shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                <div className="text-rose-400 text-xs font-bold mb-1">
                  狂熱 (100%)
                </div>
                <div className="text-white text-xl md:text-2xl font-black">
                  {stats.fanatic}
                </div>
              </div>
              <div className="bg-slate-900/60 border border-pink-500/30 px-4 py-2 rounded-xl text-center">
                <div className="text-pink-400 text-xs font-bold mb-1">
                  喜歡 (75%)
                </div>
                <div className="text-white text-xl md:text-2xl font-black">
                  {stats.like}
                </div>
              </div>
              <div className="bg-slate-900/60 border border-purple-500/30 px-4 py-2 rounded-xl text-center hidden md:block">
                <div className="text-purple-400 text-xs font-bold mb-1">
                  好奇 (50%)
                </div>
                <div className="text-white text-xl md:text-2xl font-black">
                  {stats.neutral}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-10 gap-x-2 md:gap-x-6 relative z-10 mx-auto max-w-5xl">
            {ATTRIBUTES.map((attr, idx) => {
              const score = attrScores[idx];
              const level = getLevelData(score);

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative flex flex-col items-center">
                    <div className="w-14 h-16 md:w-16 md:h-20 rounded-b-full rounded-t-sm border-[2px] border-white/20 overflow-hidden relative shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] bg-white/5 backdrop-blur-sm z-10">
                      <div className="absolute inset-0 flex items-end">
                        <motion.div
                          className={`w-full ${level.color} relative`}
                          style={{ boxShadow: `0 -5px 25px ${level.glow}` }}
                          initial={{ height: "0%" }}
                          animate={{ height: level.percent }}
                          transition={{
                            duration: 1.5,
                            delay: 0.1 * (idx % 10),
                            ease: "easeOut",
                          }}
                        >
                          {level.percent !== "0%" && (
                            <div className="absolute top-0 left-0 right-0 h-1 md:h-1.5 bg-white/40 backdrop-blur-md" />
                          )}
                        </motion.div>
                      </div>
                    </div>
                    <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-white/30 to-white/10 z-0" />
                    <div className="w-8 md:w-10 h-1 md:h-1.5 bg-white/20 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.5)] z-0" />

                    <div
                      className="absolute -bottom-2 w-12 h-2 rounded-[100%] blur-md z-0 transition-opacity duration-1000 pointer-events-none"
                      style={{
                        backgroundColor: level.glow,
                        opacity: level.percent === "0%" ? 0 : 0.6,
                      }}
                    />
                  </div>

                  <div className="text-center mt-3 w-full px-1">
                    <div className="text-[11px] md:text-sm font-bold text-slate-200 leading-tight">
                      {attr}
                    </div>
                    <div
                      className={`text-[10px] md:text-xs font-semibold mt-0.5 ${level.text}`}
                    >
                      {level.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 pt-6 border-t border-slate-800/50 text-center relative z-10 flex flex-col items-center justify-center text-slate-500 text-xs md:text-sm font-medium">
            <div className="flex items-center gap-2 mb-1 text-slate-400">
              <Sparkles className="w-4 h-4 text-purple-500/70" />{" "}
              專屬慾望調酒測驗
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-center">
              <span>Twitter: @kevin98651312</span>
              <span className="hidden sm:inline">|</span>
              <span>https://x.com/kevin98651312?s=11</span>
            </div>
          </div>
        </div>

        {/* 新增：長按儲存的彈出視窗 Modal */}
        <AnimatePresence>
          {generatedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-4 py-8"
              onClick={() => setGeneratedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-slate-800 p-4 rounded-3xl max-w-[500px] w-full flex flex-col items-center relative shadow-2xl border border-slate-700"
                onClick={(e) => e.stopPropagation()} // 避免點擊內部關閉
              >
                <button
                  onClick={() => setGeneratedImage(null)}
                  className="absolute -top-4 -right-4 bg-slate-700 text-white p-2 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-pink-400 font-black text-xl mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> 圖鑑生成成功！
                </h3>
                <p className="text-slate-300 text-sm mb-4 font-medium">
                  請 <strong className="text-white">長按下方圖片</strong>{" "}
                  並選擇「儲存到照片」
                </p>

                {/* 用戶長按的真實圖片 */}
                <div className="w-full max-h-[60vh] overflow-y-auto rounded-xl border-2 border-slate-600/50 scrollbar-hide">
                  <img
                    src={generatedImage}
                    alt="專屬慾望調酒圖鑑"
                    className="w-full h-auto block"
                  />
                </div>

                <button
                  onClick={() => setGeneratedImage(null)}
                  className="mt-6 px-8 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-bold transition-colors w-full"
                >
                  完成並返回
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-200 selection:bg-pink-500/30 overflow-x-hidden pb-10 relative">
      <main className="w-full">
        <AnimatePresence mode="wait">
          {state.status === "start" && renderStart()}
          {state.status === "quiz" && renderQuiz()}
          {state.status === "result" && renderResult()}
        </AnimatePresence>
      </main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        /* 隱藏彈出視窗內的滾動條，保持美觀 */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
}
