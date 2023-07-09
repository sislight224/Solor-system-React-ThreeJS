import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three";

import fragmentShader from "./Shader/fragmentShader";
import vertexShader from "./Shader/vertexShader";

import "./Sphere.css";

export default function Sphere() {
  const distance = 1.4;
  const CustomGeometryParticles = props => {
    const { count, shape } = props;
    const radius = 2;

    // This reference gives us direct access to our points
    const points = useRef();

    // Generate our positions attributes array
    const particlesPosition = useMemo(
      () => {
        const positions = new Float32Array(count * 3);

        if (shape === "box") {
          for (let i = 0; i < count; i++) {
            let x = (Math.random() - 0.5) * 5;
            let y = (Math.random() - 0.5) * 0.2;
            let z = (Math.random() - 0.5) * 5;

            positions.set([x, y, z], i * 3);
          }
        }

        if (shape === "sphere") {
          for (let i = 0; i < count; i++) {
            let x = distance * (Math.random() - 0.5) * 2;
            let y = distance * (Math.random() - 0.5) * 2;
            let z = distance * (Math.random() - 0.5) * 2;
            let norm = x * x + y * y + z * z;
            if (norm > distance || norm < distance * 0.1) {
              continue;
            }

            positions.set([x, y, z], i * 3);
          }
        }

        if (shape === "outline") {
          for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x =
              1.1 * Math.sin(phi) * Math.cos(theta) +
              (Math.random() - 0.5) * 0.2;
            const y =
              1.1 * Math.sin(phi) * Math.sin(theta) +
              (Math.random() - 0.5) * 0.2;
            const z = 1.1 * Math.cos(phi) + (Math.random() - 0.5) * 0.2;
            positions.set([x, y, z], i * 3);
          }
        }

        return positions;
      },
      [count, shape]
    );
    const uniforms = useMemo(
      () => ({
        uTime: {
          value: 0.0
        },
        uRadius: {
          value: radius
        },
        uColor: {
          value: "0x000000"
        }
      }),
      []
    );

    useFrame(state => {
      const { clock } = state;

      points.current.material.uniforms.uTime.value = clock.elapsedTime;
    });

    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    );
  };

  const Scene = () => {
    return (
      <Canvas camera={{ position: [1.0, 0.3, 1.6] }}>
        <ambientLight intensity={0.5} />
        {/* Try to change the shape prop to "box" and hit reload! */}
        <CustomGeometryParticles count={1000} shape="sphere" />
        <CustomGeometryParticles count={4000} shape="outline" />
        <CustomGeometryParticles count={1000} shape="box" />
        <OrbitControls
          enableZoom={false}
          enableDamping={false}
          enabled={false}
        />
      </Canvas>
    );
  };

  return (
    <div className="sphere-container">
      <Scene />
    </div>
  );
}
