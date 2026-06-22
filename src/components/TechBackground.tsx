"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { Points, PointMaterial, MeshDistortMaterial } from "@react-three/drei"

function StaticParticles() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f2ff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function StaticGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[100, 100, 30, 30]} />
      <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.04} />
    </mesh>
  )
}

export function TechBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-background pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} frameloop="demand">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <StaticParticles />
          <StaticGrid />
          <fog attach="fog" args={["#020617", 10, 50]} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  )
}
