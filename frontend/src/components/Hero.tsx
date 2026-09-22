import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Sphere,
  Ring,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { useRef } from "react";
import * as THREE from "three";

import "./Hero.css";

/* =========================================
   PREMIUM GLOBE
========================================= */

function PremiumGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Rotate the Earth
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }

    // Slowly rotate the orbital rings
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.04;
      ringRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <group>

      {/* =====================================
          EARTH
      ===================================== */}

      <group ref={globeRef}>

        {/* Main Earth */}
        <Sphere args={[2.7, 96, 96]}>
          <meshStandardMaterial
            color="#0755d9"
            roughness={0.45}
            metalness={0.25}
          />
        </Sphere>

        {/* Subtle inner glow */}
        <Sphere args={[2.73, 96, 96]}>
          <meshBasicMaterial
            color="#1683ff"
            transparent
            opacity={0.12}
          />
        </Sphere>

        {/* Futuristic network grid */}
        <Sphere args={[2.76, 64, 64]}>
          <meshBasicMaterial
            color="#60a5fa"
            wireframe
            transparent
            opacity={0.08}
          />
        </Sphere>

        {/* =====================================
            GLOWING GLOBAL CONNECTION POINTS
        ===================================== */}

        <mesh position={[1.4, 1.1, 2.25]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh position={[-1.2, 0.8, 2.35]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#93c5fd" />
        </mesh>

        <mesh position={[0.6, -1.2, 2.45]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh position={[-1.8, -0.7, 1.9]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>

        <mesh position={[1.9, -0.3, 1.8]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#bfdbfe" />
        </mesh>

      </group>

      {/* =====================================
          ATMOSPHERE
      ===================================== */}

      <Sphere args={[2.9, 96, 96]}>
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </Sphere>

      <Sphere args={[3.05, 96, 96]}>
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* =====================================
          ORBIT RINGS
      ===================================== */}

      <group ref={ringRef}>

        <Ring
          args={[3.15, 3.17, 96]}
          rotation={[Math.PI / 2.8, 0.15, 0]}
        >
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </Ring>

        <Ring
          args={[3.35, 3.37, 96]}
          rotation={[Math.PI / 2.3, -0.3, 0.2]}
        >
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </Ring>

        <Ring
          args={[3.55, 3.57, 96]}
          rotation={[Math.PI / 2.1, 0.4, 0.5]}
        >
          <meshBasicMaterial
            color="#93c5fd"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </Ring>

      </group>

      {/* =====================================
          LIGHTING
      ===================================== */}

      <ambientLight intensity={0.25} />

      <directionalLight
        position={[5, 4, 6]}
        intensity={4}
        color="#ffffff"
      />

      <directionalLight
        position={[-5, -2, -3]}
        intensity={1.5}
        color="#2563eb"
      />

      <pointLight
        position={[2, 1, 3]}
        intensity={7}
        distance={10}
        color="#60a5fa"
      />

      <pointLight
        position={[-3, -1, 2]}
        intensity={5}
        distance={8}
        color="#2563eb"
      />

    </group>
  );
}

/* =========================================
   HERO SECTION
========================================= */

export default function Hero() {
  return (
    <section className="hero">

      {/* Background */}
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="hero-content">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >

          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-dot" />

            The future of connected knowledge
          </motion.div>

          {/* Heading */}
          <h1>
            Ideas that
            <br />

            <span>connect</span>

            <br />

            the world.
          </h1>

          {/* Description */}
          <p>
            Discover powerful ideas, insightful stories,
            and connected knowledge from creators,
            developers, scientists, and thinkers around
            the world.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            <Link
              to="/posts"
              className="hero-primary-btn"
            >
              Explore Articles

              <FaArrowRight />
            </Link>

            <Link
              to="/register"
              className="hero-secondary-btn"
            >
              <FaPlay />

              Start Writing
            </Link>

          </div>

          {/* Stats */}
          <div className="hero-stats">

            <div className="hero-stat">
              <strong>12K+</strong>
              <span>Articles</span>
            </div>

            <div className="hero-stat">
              <strong>3.5K+</strong>
              <span>Writers</span>
            </div>

            <div className="hero-stat">
              <strong>120+</strong>
              <span>Countries</span>
            </div>

          </div>

        </motion.div>

        {/* =====================================
            RIGHT SIDE — GLOBE
        ===================================== */}

        <motion.div
          className="hero-globe"
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            ease: "easeOut",
          }}
        >

          {/* Glow behind Earth */}
          <div className="globe-glow" />

          <div className="globe-container">

            <Canvas
              camera={{
                position: [0, 0, 6.5],
                fov: 45,
              }}
            >

              <PremiumGlobe />

              {/* Space */}
              <Stars
                radius={80}
                depth={40}
                count={1800}
                factor={3}
                saturation={0}
                fade
                speed={0.35}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                enableDamping
                dampingFactor={0.05}
              />

            </Canvas>

          </div>

          {/* =====================================
              FLOATING CARD 1
          ===================================== */}

          <motion.div
            className="floating-card card-one"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <span className="floating-icon">
              ✦
            </span>

            <div>
              <strong>Connected Ideas</strong>

              <small>
                Discover something new
              </small>
            </div>

          </motion.div>

          {/* =====================================
              FLOATING CARD 2
          ===================================== */}

          <motion.div
            className="floating-card card-two"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <span className="floating-icon">
              ↗
            </span>

            <div>
              <strong>Global Community</strong>

              <small>
                120+ countries
              </small>
            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="hero-bottom-fade" />

    </section>
  );
}