"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Generate particle buffers once at module scope to ensure pure idempotent render
function generateParticleBuffers(count = 1600) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  const cyan = new THREE.Color("#00E5FF");
  const violet = new THREE.Color("#8B5CF6");
  const amber = new THREE.Color("#FFB86B");
  const white = new THREE.Color("#FFFFFF");

  for (let i = 0; i < count; i++) {
    const u = (i * 0.6180339887) % 1;
    const v = ((i + 1) * 0.4142135623) % 1;
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const radius = 2.2 + (((i % 17) / 17) - 0.5) * 1.8;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;

    // Color distribution based on index
    let chosenColor = cyan;
    const pick = (i % 10) / 10;
    if (pick > 0.75) {
      chosenColor = amber;
    } else if (pick > 0.4) {
      chosenColor = violet;
    } else if (pick < 0.1) {
      chosenColor = white;
    }

    col[i * 3] = chosenColor.r;
    col[i * 3 + 1] = chosenColor.g;
    col[i * 3 + 2] = chosenColor.b;
  }

  return { pos, col };
}

const { pos: staticPositions, col: staticColors } = generateParticleBuffers();

interface ParticleFieldProps {
  reducedMotion?: boolean;
}

function ParticleField({ reducedMotion = false }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Auto-rotation + mouse parallax lerp
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -pointer.y * 0.35 + Math.sin(time * 0.2) * 0.05,
        0.05
      );
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        pointer.x * 0.35,
        0.05
      );
    }

    // Inner geometric core rotation
    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.15;
      coreRef.current.rotation.y += delta * 0.2;
    }

    // Orbital ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
      ringRef.current.rotation.x = THREE.MathUtils.lerp(
        ringRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      );
      ringRef.current.rotation.y = THREE.MathUtils.lerp(
        ringRef.current.rotation.y,
        pointer.x * 0.2,
        0.05
      );
    }
  });

  return (
    <group>
      {/* 3D Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[staticPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[staticColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Center glowing geometric wireframe */}
      <mesh ref={coreRef} scale={[1.3, 1.3, 1.3]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          wireframe
          color="#8B5CF6"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Subtle glowing orbital rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.008, 16, 100]} />
          <meshBasicMaterial
            color="#00E5FF"
            transparent
            opacity={0.25}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.9, 0.006, 16, 100]} />
          <meshBasicMaterial
            color="#FFB86B"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroScene({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ParticleField reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
