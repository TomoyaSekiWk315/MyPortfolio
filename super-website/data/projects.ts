// data/projects.ts
import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: "DogLife+",
    description: "愛犬との生活を支援するアプリ\n機能：\n24時間のRAGを使用したAI相談・AIトレーニング相談\n日々の投薬や運動量の記録とリマインド\n日々の記録を分析してリスクを調べる分析AI",
    imageUrl: "/images/project1.png",
    mobileImageUrl: "/images/mobileImageUrl1.png",
    videoUrl: "/videos/video1.mp4",
    category: "アプリ",
    technologies: ["Swift", "SwiftUI", "Firebase", "Dify"],
    color: "#FFB866",
    url: "https://apps.apple.com/jp/app/doglife/id6739449826"
  },
  {
    id: 2,
    title: "AI上司(開発中)",
    description: "あなたのタスクをAI上司が管理、アドバイスするアプリ\n機能：\nタスクの管理・AIによる細分化、アドバイス、進捗チャート、通知、日毎のアドバイス、24時間AI相談\n",
    imageUrl: "/images/project2.png",
    mobileImageUrl: "/images/mobileImageUrl2.png",
    videoUrl: "/videos/video2.mp4",
    category: "アプリ",
    technologies: ["flutter", "Firebase", "Dify", "node.js"],
    color: "#FF7A00"
  },
  {
    id: 3,
    title: "えがく日記(開発中)",
    description: "あなたのオリジナル日記を支援するアプリ\n機能：\n日記の管理、AIによる日記支援、画像生成・合成、通知、PDF出力、SNSシェア",
    imageUrl: "/images/project3.png",
    mobileImageUrl: "/images/mobileImageUrl3.png",
    videoUrl: "/videos/video3.mp4",
    category: "アプリ",
    technologies: ["flutter", "Firebase", "Dify", "node.js"],
    color: "#CC6200"
  },
  {
    id: 4,
    title: "MISEMAP(開発予定)",
    description: "お店の中をマッピングしてみんなで買い物をスムーズにするアプリ",
    imageUrl: "/images/project4.png",
    mobileImageUrl: "/images/mobileImageUrl4.png",
    videoUrl: "/videos/video4.mp4",
    category: "アプリ",
    technologies: ["flutter", "Firebase", "Dify", "node.js"],
    color: "#3D6CB3"
  },
  {
    id: 5,
    title: "CatLife+(開発予定)",
    description: "愛猫との生活を支援するアプリ\n機能：\n24時間のRAGを使用したAI相談\n日々の投薬や運動量の記録とリマインド\n日々の記録を分析してリスクを調べる分析AI",
    imageUrl: "/images/project6.png",
    mobileImageUrl: "",
    videoUrl: "/videos/video5.mp4",
    category: "IOS App",
    technologies: ["flutter", "Firebase", "Dify", "node.js"],
    color: "#FFB866"
  },
  {
    id: 6,
    title: "portfolio",
    description: "ポートフォリオサイト",
    imageUrl: "/images/project5.png",
    mobileImageUrl: "",
    videoUrl: "/videos/video6.mp4",
    category: "Web",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    color: "#FF7A00"
  }
];