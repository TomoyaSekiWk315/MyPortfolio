// data/skills.ts
export interface Skill {
    id: number;
    name: string;
    level: number; // 0.0～1.0の値
    category: 'frontend' | 'backend' | 'design' | '3d' | 'other';
    description?: string;
    color?: string;
  }
  
  export interface SkillCategory {
    id: string;
    name: string;
    color: string;
  }
  
  export const skillCategories: SkillCategory[] = [
    { id: 'frontend', name: 'フロントエンド', color: '#FF7A00' },
    { id: 'backend', name: 'バックエンド', color: '#1A365D' },
    { id: 'design', name: 'デザイン', color: '#FF4D6D' },
    { id: '3d', name: '3D/アニメーション', color: '#7209B7' },
    { id: 'other', name: 'その他', color: '#4CC9F0' }
  ];
  
  export const skills: Skill[] = [
    { 
      id: 1, 
      name: 'React', 
      level: 0.5, 
      category: 'frontend',
      description: '1年以上の経験。AI駆動開発経験あり。'
    },
    { 
      id: 2, 
      name: 'Three.js', 
      level: 0.2, 
      category: '3d',
      description: 'WebGLを活用した3Dインタラクティブ体験の構築。'
    },
    { 
      id: 3, 
      name: 'GSAP', 
      level: 0.4, 
      category: '3d',
      description: '高度なアニメーションとインタラクション制御。'
    },
    { 
      id: 4, 
      name: 'TypeScript', 
      level: 0.5, 
      category: 'frontend',
      description: '型安全なコード設計によるスケーラブルな開発。'
    },
    { 
      id: 5, 
      name: 'Node.js', 
      level: 0.6, 
      category: 'backend',
      description: 'Express, NestJSを使ったバックエンド開発経験。'
    },
    { 
      id: 6, 
      name: 'C', 
      level: 0.8, 
      category: 'backend',
      description: 'C言語を使った組み込み、バックエンドの開発経験あり。'
    },
    { 
      id: 7, 
      name: 'Java', 
      level: 0.6, 
      category: 'backend',
      description: 'Javaを使ったバックエンド開発経験あり。'
    },
    { 
      id: 8, 
      name: 'HTML/CSS/JavaScript', 
      level: 0.7, 
      category: 'frontend',
      description: 'HTML/CSS/JavaScriptを使ったフロントエンド開発経験あり。'
    },
    { 
      id: 9, 
      name: 'PHP', 
      level: 0.4, 
      category: 'backend',
      description: 'PHPを使ったバックエンド開発経験あり。'
    },
    { 
      id: 10, 
      name: 'Figma', 
      level: 0.5, 
      category: 'design',
      description: 'UIデザインからプロトタイピングまで。'
    },
    { 
      id: 11, 
      name: 'Tailwind CSS', 
      level: 0.5, 
      category: 'frontend',
      description: '効率的なUIスタイリングとコンポーネント設計。'
    },
    { 
      id: 12, 
      name: 'WebGL', 
      level: 0.3, 
      category: '3d',
      description: 'シェーダープログラミングとパフォーマンス最適化。'
    },
    { 
      id: 13, 
      name: 'Oracle', 
      level: 0.7, 
      category: 'backend',
      description: 'DB設計および開発経験'
    },
    { 
      id: 14, 
      name: 'MySQL', 
      level: 0.5, 
      category: 'backend',
      description: 'DB設計および開発経験'
    },
    { 
      id: 15, 
      name: 'Dify', 
      level: 0.5, 
      category: 'other',
      description: 'RAGベースのAIサービス'
    },
  ];