import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { Mesh } from "three";

import Network from "./Network";
import Connections from "./Connections";
import Particles from "./Particles";

function EarthMesh() {
  const earthRef = useRef<Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 3.8],
        fov: 35,
      }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#eef5ff"]} />

      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        color="#ffffff"
      />

      <pointLight
        position={[3, 3, 3]}
        intensity={20}
        color="#60a5fa"
      />

      <pointLight
        position={[-3, -3, -3]}
        intensity={10}
        color="#3b82f6"
      />

      <Stars
        radius={80}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <EarthMesh />

      <Network />
      <Connections />
      <Particles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}