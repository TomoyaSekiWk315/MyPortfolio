'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Showcase() {
  return (
    <section className="relative w-full h-screen bg-background">
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-text absolute top-10 left-10 z-10">
        <span className="text-primary">3D Showcase</span>
      </h2>
      
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
      </Canvas>
    </section>
  );
} 