"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate particle buffers once at module scope to ensure pure idempotent render
function generateParticleBuffers(count = 1800) {
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
    const radius = 2.2 + (((i % 23) / 23) - 0.5) * 2.0;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;

    // Color distribution based on index
    let chosenColor = cyan;
    const pick = (i % 12) / 12;
    if (pick > 0.75) {
      chosenColor = amber;
    } else if (pick > 0.35) {
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
  const containerGroupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Smooth mouse coordinates tracking via window listener
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      // Normalize mouse to [-1, 1] range with inverted Y so moving up moves particles up
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current.x = normX;
      mouseTarget.current.y = normY;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Smooth damping interpolation (MathUtils.lerp with frame-rate independent factor)
    const damping = Math.min(delta * 2.5, 0.08);

    if (containerGroupRef.current) {
      // Fluid mouse parallax: position shift + tilt follow cursor smoothly
      const targetPosX = mouseTarget.current.x * 0.3;
      const targetPosY = mouseTarget.current.y * 0.3;

      containerGroupRef.current.position.x = THREE.MathUtils.lerp(
        containerGroupRef.current.position.x,
        targetPosX,
        damping
      );
      containerGroupRef.current.position.y = THREE.MathUtils.lerp(
        containerGroupRef.current.position.y,
        targetPosY,
        damping
      );

      const targetRotX = -mouseTarget.current.y * 0.35;
      const targetRotY = mouseTarget.current.x * 0.4;

      containerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        containerGroupRef.current.rotation.x,
        targetRotX,
        damping
      );
      containerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        containerGroupRef.current.rotation.y,
        targetRotY,
        damping
      );
    }

    // Continuous smooth auto-rotation on the inner points independently
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
      pointsRef.current.rotation.z += delta * 0.02;
    }

    // Inner geometric core rotation
    if (coreRef.current) {
      coreRef.current.rotation.x -= delta * 0.1;
      coreRef.current.rotation.y += delta * 0.15;
    }

    // Orbital rings rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={containerGroupRef}>
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
          opacity={0.18}
        />
      </mesh>

      {/* Subtle glowing orbital rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.008, 16, 100]} />
          <meshBasicMaterial
            color="#00E5FF"
            transparent
            opacity={0.28}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.9, 0.006, 16, 100]} />
          <meshBasicMaterial
            color="#FFB86B"
            transparent
            opacity={0.22}
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
