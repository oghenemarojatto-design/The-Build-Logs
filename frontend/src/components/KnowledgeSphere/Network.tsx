import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Network() {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.15;
    group.current.rotation.x += delta * 0.02;
  });

  const nodes = useMemo(() => {
    const positions: number[] = [];

    const totalNodes = 700;
    const radius = 1.55;

    for (let i = 0; i < totalNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalNodes);
      const theta = Math.sqrt(totalNodes * Math.PI) * phi;

      positions.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    }

    return new Float32Array(positions);
  }, []);

  return (
    <group ref={group}>
      {/* Glass Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          roughness={0}
          clearcoat={1}
          transparent
          opacity={0.06}
          color="#7dd3fc"
        />
      </mesh>

      {/* Wireframe Globe */}
      <mesh>
        <icosahedronGeometry args={[1.56, 6]} />
        <meshBasicMaterial
          wireframe
          color="#3b82f6"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodes, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#93c5fd"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={1}
        />
      </points>
    </group>
  );
}