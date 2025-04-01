'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Hero() {
  return (
    <section className="h-screen w-full relative">
      <div className="absolute inset-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          {/* 3Dロゴをここに追加 */}
        </Canvas>
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">Welcome to My Portfolio</h1>
      </div>
    </section>
  );
} 