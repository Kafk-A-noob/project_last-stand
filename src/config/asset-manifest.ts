import { ArchiveItem } from "@/lib/store"

/*
  ASSET_MANIFEST (The Registry)
  アプリケーションが認識するすべてのモデル定義。
  増やすときはここに行を追加するだけ。
  Manifestの型はStoreの型を継承、あるいは同一視する
*/
export const ASSET_MANIFEST: ArchiveItem[] = [
  {
    id: "Item-000",
    active: true, // Modeling Party Target: ON
    name: "React_Logo",
    path: "/models/00_React_Logo.glb", // Placeholder: React Logo
    // 初期値として記述
    techSpecs: {
      fileSize: "0.0752 MB", // 容量は手動で書く
    },
    rotationSpeed: [2, 3, 1], // 個別の回転速度定義
    quote: "仮置き",
    description: "このシステムの心臓部。",
    contributor: "KafkA＿",
  },
  {
    id: "Item-001",
    active: true, // Modeling Party Target: ON
    name: "Radio",
    path: "/models/01_radio.glb", // Placeholder: 
    techSpecs: {
      fileSize: "0.983 MB", // 容量
    },
    rotationSpeed: [0,-0.5,0],
    scale: [5,5,5],
    position: [0,-1.2,0],
    quote: "最期まで日常らしい時間を感じたいから。",
    description: "いつもの時間、いつものチャンネル。",
    contributor: "Nana",
  },
  // 以下、ID-002以降も同様に
    {
    id: "Item-002",
    active: true, // まだモデルがないので false
    name: "Piano",
    path: "/models/02_Piano.glb",
    techSpecs: {
      fileSize: "1.076MB",
    },
    rotationSpeed: [0,-0.5,0],
    scale: [3,3,3],
    position: [0,-0.3,0],
    quote: "人間たちに音楽があったことを、知ってもらえるから。",
    description: "私にとって唯一の、絶対に裏切らない友人として。そして、いつかこれを拾うかもしれない誰かが、音を楽しんでくれることを願って。",
    contributor: "Yuduki",
  },

    {
    id: "Item-003",
    active: false, // まだモデルがないので false
    name: "Can Coffee",
    path: "/models/can_coffee.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "一日の始まりの一杯",
    description: "毎朝飲んでいたショート缶。",
    contributor: "Anonymous",
  },

    {
    id: "Item-004",
    active: false, // まだモデルがないので false
    name: "Acoustic Guitar",
    path: "/models/acoustic_guitar.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "外に出せなかった憧れを、こんな時ぐらいは出してもいいんじゃないでしょうか",
    description: "ずっと弾けずにしまってあったギター。",
    contributor: "Aya",
  },

    {
    id: "Item-005",
    active: false, // まだモデルがないので false
    name: "Favorite Mug",
    path: "/models/favorite_mug.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "世界が終わっても喉は乾くし腹は減るから",
    description: "最後の一杯",
    contributor: "Anonymous",
  },

    {
    id: "Item-006",
    active: false, // まだモデルがないので false
    name: "Camera",
    path: "/models/camera.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "今まで撮ってきた景色を見ながら最後を迎えたいから",
    description: "いつかの景色を、いつまでも",
    contributor: "クエリ伍長",
  },

    {
    id: "Item-007",
    active: false, // まだモデルがないので false
    name: "Retro Console",
    path: "/models/game_boy.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "一人でも暇つぶしできるから",
    description: "最後の相棒",
    contributor: "わし",
  },

    {
    id: "Item-008",
    active: false, // まだモデルがないので false
    name: "Lantern",
    path: "/models/lantern.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "最後を迎えるなら明るいほうがいいから",
    description: "最後の灯火",
    contributor: "葉月ひさめ",
  },

    {
    id: "Item-009",
    active: false, // まだモデルがないので false
    name: "Family Photo",
    path: "/models/family_photo.glb",
    techSpecs: {
      fileSize: "TBD",
    },
    rotationSpeed: [0,0,0],
    scale: [1,1,1],
    position: [0,0,0],
    quote: "",
    description: "最期まで一緒に",
    contributor: "ひるねこ",
  },
];
