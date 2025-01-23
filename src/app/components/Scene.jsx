"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import {
  PerspectiveCamera,
  CameraShake,
  Environment,
  Plane,
  CameraControls,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import Text from "./Text.jsx";
import Lumos from "./Lumos.jsx";
import Menu from "./Menu.jsx";
import gsap from "gsap";

export default function Scene() {
  return (
    <>
      <div className="screen_pc"></div>
      <div className="noisy"></div>
      <Canvas shadows>
        <Environment preset="sunset" />
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={20} />
        {/*  <CameraShakeWithMouse />*/}
        <OrbitControls />

        <Plane receiveShadow args={[100, 100]} position={[0, 0, 0]}>
          <meshToonMaterial color="#e9ecef" receiveShadow />
        </Plane>
        <Plane
          receiveShadow
          args={[100, 100]}
          position={[50, 0, 50]}
          rotation={[0, Math.PI / -2, 0]}
        >
          <meshToonMaterial color="#e9ecef" receiveShadow />
        </Plane>
        <TextResponsiveGroup textSize={16} />
        <Lumos />
        <Menu />
        <color attach="background" args={["#e9ecef"]} />
      </Canvas>
    </>
  );
}

function TextResponsiveGroup() {
  const { width: w } = useThree((state) => state.viewport);
  const scale = w / 55;
  return (
    <group scale={scale}>
      <Text />
    </group>
  );
}

function CameraShakeWithMouse() {
  const { camera } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [vec] = useState(() => new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const shakeIntensity = 3;
    const targetX = mousePos.x * shakeIntensity;
    const targetY = mousePos.y * shakeIntensity;
    gsap.to(camera.rotation, {
      x: targetY,
      y: targetX,
      duration: 1,
      ease: "power2.out",
    });
    camera.position.lerp(vec.set(mousePos.x * 1, 1, 20), 0.05);
  });

  return (
    <CameraShake
      maxYaw={0.001}
      maxPitch={0.001}
      maxRoll={0}
      yawFrequency={0.01}
      pitchFrequency={0.01}
      rollFrequency={0}
    />
  );
}
