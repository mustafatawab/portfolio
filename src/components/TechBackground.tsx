"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere, Torus, Box } from "@react-three/drei"

function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [count])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    points.current.rotation.y = time * 0.05
    points.current.rotation.x = time * 0.03
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f2ff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function IndustrialObject({ position, type }: { position: [number, number, number], type: 'torus' | 'box' | 'sphere' }) {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.x = time * 0.2
    mesh.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} ref={mesh}>
        {type === 'torus' && <torusGeometry args={[1, 0.4, 16, 100]} />}
        {type === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {type === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        <MeshDistortMaterial
          color="#00f2ff"
          speed={2}
          distort={0.4}
          radius={1}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

function Grid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.05} />
    </mesh>
  )
}

export function TechBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-background pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
          
          <Particles count={2000} />
          
          <IndustrialObject position={[-10, 5, -5]} type="torus" />
          <IndustrialObject position={[12, -5, -8]} type="box" />
          <IndustrialObject position={[-5, -8, -10]} type="sphere" />
          <IndustrialObject position={[8, 8, -5]} type="torus" />
          
          <Grid />
          <fog attach="fog" args={["#020617", 10, 50]} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  )
}