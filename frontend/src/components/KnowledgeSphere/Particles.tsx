import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles() {
  const points = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (!points.current) return;

    points.current.rotation.y += delta * 0.03;
    points.current.rotation.x += delta * 0.01;
  });

  const particles = useMemo(() => {
    const positions: number[] = [];

    const totalParticles = 2000;

    for (let i = 0; i < totalParticles; i++) {
      const radius = 1.8 + Math.random() * 0.7;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }

    return new Float32Array(positions);
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#60a5fa"
        size={0.025}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}