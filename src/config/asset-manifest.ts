import { ArchiveItem } from "@/lib/store"

/*
  ASSET_MANIFEST (The Registry)
  アプリケーションが認識するすべてのモデル定義。
  増やすときはここに行を追加するだけ。
  Manifestの型はStoreの型を継承、あるいは同一視する
*/
export const ASSET_MANIFEST: ArchiveItem[] = [
  {
    id: "item-001-radio",
    active: true, // Modeling Party Target: ON
    name: "Radio",
    path: "/models/React_Logo.glb", // Placeholder: React Logo
    quote: "最期まで日常らしい時間を感じたいから。",
    description: "いつもの時間、いつものチャンネル。",
    contributor: "Nana",
  },
  // 以下、ID-002以降も同様に
    {
    id: "item-002-piano",
    active: false, // まだモデルがないので false
    name: "Piano",
    path: "/models/piano.glb",
    quote: "人間たちに音楽があったことを、知ってもらえるから。",
    description: "私にとって唯一の、絶対に裏切らない友人として。そして、いつかこれを拾うかもしれない人類ではない誰かが、音を楽しんでくれることを願って。",
    contributor: "Yuduki",
  },

    {
    id: "item-003-can_coffee",
    active: false, // まだモデルがないので false
    name: "缶コーヒー",
    path: "/models/can_coffee.glb",
    quote: "一日の始まりの一杯",
    description: "毎朝飲んでいたショート缶。",
    contributor: "Anonymous",
  },

    {
    id: "item-004-acoustic_guitar",
    active: false, // まだモデルがないので false
    name: "アコースティックギター",
    path: "/models/acoustic_guitar.glb",
    quote: "外に出せなかった憧れを、こんな時ぐらいは出してもいいんじゃないでしょうか",
    description: "ずっと弾けずにしまってあったギター。",
    contributor: "Aya",
  },

    {
    id: "item-005-favorite_mug",
    active: false, // まだモデルがないので false
    name: "お気に入りのマグカップ",
    path: "/models/favorite_mug.glb",
    quote: "世界が終わっても喉は乾くし腹は減るから",
    description: "最後の一杯",
    contributor: "Anonymous",
  },

    {
    id: "item-006-Camera",
    active: false, // まだモデルがないので false
    name: "Camera",
    path: "/models/camera.glb",
    quote: "今まで撮ってきた景色を見ながら最後を迎えたいから",
    description: "いつかの景色を、いつまでも",
    contributor: "クエリ伍長",
  },

    {
    id: "item-007-Game_Boy",
    active: false, // まだモデルがないので false
    name: "Game Boy",
    path: "/models/game_boy.glb",
    quote: "一人でも暇つぶしできるから",
    description: "最後の相棒",
    contributor: "わし",
  },

    {
    id: "item-008-Lantern",
    active: false, // まだモデルがないので false
    name: "Lantern",
    path: "/models/lantern.glb",
    quote: "最後を迎えるなら明るいほうがいいから",
    description: "最後の灯火",
    contributor: "葉月ひさめ",
  },

    {
    id: "item-009-Family_Photo",
    active: false, // まだモデルがないので false
    name: "Family Photo",
    path: "/models/family_photo.glb",
    quote: "",
    description: "",
    contributor: "ひるねこ",
  },
];