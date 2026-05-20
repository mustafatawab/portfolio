"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function useThemeColors() {
  const [colors, setColors] = useState({
    cyan: "#009bb0",
    purple: "#9d17bd",
  });

  useEffect(() => {
    const update = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setColors({
        cyan: isDark ? "#00f2ff" : "#009bb0",
        purple: isDark ? "#bc13fe" : "#9d17bd",
      });
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}

function FloatingShape({
  geometry,
  position,
  color,
  scale,
  speed,
  wireframe = true,
  distort = false,
}: {
  geometry: "icosahedron" | "torus" | "octahedron" | "sphere" | "dodecahedron";
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  wireframe?: boolean;
  distort?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotSpeed = useMemo(
    () => [
      (Math.random() - 0.5) * speed,
      (Math.random() - 0.5) * speed,
      (Math.random() - 0.5) * speed,
    ],
    [speed]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotSpeed[0] * delta;
      meshRef.current.rotation.y += rotSpeed[1] * delta;
      meshRef.current.rotation.z += rotSpeed[2] * delta;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return new THREE.IcosahedronGeometry(1, 0);
      case "torus":
        return new THREE.TorusGeometry(0.7, 0.25, 16, 40);
      case "octahedron":
        return new THREE.OctahedronGeometry(1, 0);
      case "sphere":
        return new THREE.SphereGeometry(0.8, 32, 32);
      case "dodecahedron":
        return new THREE.DodecahedronGeometry(1, 0);
    }
  }, [geometry]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geo}>
        {distort ? (
          <MeshDistortMaterial
            color={color}
            wireframe={wireframe}
            distort={0.4}
            speed={3}
            transparent
            opacity={0.8}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            wireframe={wireframe}
            transparent
            opacity={0.7}
            emissive={color}
            emissiveIntensity={0.15}
          />
        )}
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 150, color }: { count?: number; color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15 - 3;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.02 * delta;
      pointsRef.current.rotation.x += 0.01 * delta;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const { cyan, purple } = useThemeColors();

  const shapes = useMemo(
    () => [
      {
        geometry: "icosahedron" as const,
        position: [-4, 2, -3] as [number, number, number],
        color: cyan,
        scale: 1.5,
        speed: 0.3,
      },
      {
        geometry: "torus" as const,
        position: [4, -1.5, -4] as [number, number, number],
        color: purple,
        scale: 1.2,
        speed: 0.4,
      },
      {
        geometry: "octahedron" as const,
        position: [-3, -2.5, -2] as [number, number, number],
        color: cyan,
        scale: 1,
        speed: 0.5,
      },
      {
        geometry: "sphere" as const,
        position: [3, 2.5, -5] as [number, number, number],
        color: purple,
        scale: 1.8,
        speed: 0.2,
        distort: true,
      },
      {
        geometry: "dodecahedron" as const,
        position: [0, -3.5, -3] as [number, number, number],
        color: cyan,
        scale: 0.9,
        speed: 0.6,
      },
      {
        geometry: "torus" as const,
        position: [-5, -0.5, -4.5] as [number, number, number],
        color: purple,
        scale: 0.8,
        speed: 0.35,
      },
      {
        geometry: "icosahedron" as const,
        position: [5, 0.5, -3.5] as [number, number, number],
        color: cyan,
        scale: 1.1,
        speed: 0.45,
      },
      {
        geometry: "octahedron" as const,
        position: [1, 3.5, -4] as [number, number, number],
        color: purple,
        scale: 0.7,
        speed: 0.55,
      },
    ],
    [cyan, purple]
  );

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={cyan} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={purple} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color={cyan} />
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      <ParticleField count={200} color={cyan} />
      <ParticleField count={100} color={purple} />
    </>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
