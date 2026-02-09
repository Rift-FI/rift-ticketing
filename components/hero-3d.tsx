'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, GradientTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Luma-style Abstract "Event Pulse"
// Instead of literal people/mics, we use abstract, organic glass orbs
function AbstractPulse({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} position={position} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        >
          {/* Subtle gradient for that high-end look */}
          <GradientTexture stops={[0, 1]} colors={['#ffffff', color]} size={1024} />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <group>
      {/* Central "Hero" Orb - The Heart of the Event */}
      <AbstractPulse position={[0, 0, 0]} color="#f97316" speed={2} distort={0.4} />
      
      {/* Supporting Orbs - The Community */}
      <AbstractPulse position={[-2.5, 1, -2]} color="#60a5fa" speed={1.5} distort={0.3} />
      <AbstractPulse position={[2.5, -0.5, -1.5]} color="#4ade80" speed={1.8} distort={0.5} />
      
      {/* Background ambient lighting for depth */}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Scene />

        {/* Floating particles that look like "confetti" or "members" */}
        {Array.from({ length: 40 }).map((_, i) => (
          <Float key={i} speed={1} rotationIntensity={2} floatIntensity={2}>
            <mesh position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 5
            ]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#94a3b8" transparent opacity={0.4} />
            </mesh>
          </Float>
        ))}
      </Canvas>
      
      {/* Luma-style Vignette Overlay for that "Photo" look */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}