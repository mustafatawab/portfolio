"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Scene({ cyanColor, purpleColor }: { cyanColor: string; purpleColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.08;
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
      particlesRef.current.rotation.x += delta * 0.01;
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const radius = 4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <torusKnotGeometry args={[2.5, 0.8, 128, 16]} />
          <meshStandardMaterial color={cyanColor} wireframe transparent opacity={0.4} />
        </mesh>
        <mesh>
          <torusKnotGeometry args={[1.6, 0.45, 96, 12]} />
          <meshStandardMaterial color={purpleColor} wireframe transparent opacity={0.3} />
        </mesh>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} color={cyanColor} transparent opacity={0.5} sizeAttenuation />
      </points>
    </>
  );
}

export default function HeroBackground3D() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <Scene
          cyanColor={isDark ? "#00f2ff" : "#009bb0"}
          purpleColor={isDark ? "#bc13fe" : "#9d17bd"}
        />
      </Canvas>
    </div>
  );
}
