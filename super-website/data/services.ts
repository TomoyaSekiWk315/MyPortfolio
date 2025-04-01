// data/services.ts
export interface Service {
    id: number;
    title: string;
    description: string;
    features: string[];
    imageUrl: string;
    color: string;
    icon: string; // SVGパスまたはコンポーネント名
  }
  
  export const services: Service[] = [
    {
      id: 1,
      title: "モバイルアプリ開発",
      description: "SwiftUIやFlutterを使用した、高性能で使いやすいモバイルアプリケーションの開発。",
      features: [
        "iOSアプリ開発（SwiftUI）",
        "クロスプラットフォーム開発（Flutter）",
        "Firebaseを活用したバックエンド連携",
        "AI機能の統合（Dify）",
        "ユーザー体験を重視したUI/UX設計"
      ],
      imageUrl: "/images/service1.png",
      color: "#FFB866",
      icon: "mobile"
    },
    {
      id: 2,
      title: "AI駆動開発",
      description: "RAGベースのAIサービスを活用した、インテリジェントなアプリケーション開発。",
      features: [
        "24時間AI相談システムの構築",
        "RAGを使用したカスタムAI開発",
        "AIによるデータ分析と予測",
        "自然言語処理による機能実装",
        "AIを活用した効率的な開発プロセス"
      ],
      imageUrl: "/images/service2.png",
      color: "#3D6CB3",
      icon: "brain"
    },
    {
      id: 3,
      title: "Webアプリケーション開発",
      description: "最新のWeb技術を活用した、スケーラブルで保守性の高いアプリケーション開発。",
      features: [
        "Next.js/Reactを使用したフロントエンド開発",
        "TypeScriptによる型安全な開発",
        "Tailwind CSSによる効率的なスタイリング",
        "Node.js/Expressによるバックエンド開発",
        "データベース設計と実装（Oracle/MySQL）"
      ],
      imageUrl: "/images/service-web.png",
      color: "#FF7A00",
      icon: "code"
    },
    {
      id: 4,
      title: "システム開発",
      description: "C言語やJavaを使用した、堅牢なシステム開発と保守。",
      features: [
        "C言語による組み込みシステム開発",
        "Javaによるバックエンドシステム開発",
        "PHPによるWebシステム開発",
        "データベース設計と実装",
        "システム保守とパフォーマンス最適化"
      ],
      imageUrl: "/images/service3.png",
      color: "#1A365D",
      icon: "server"
    }
  ];