"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import {
  Plane,
  PerspectiveCamera,
  CameraShake,
  PositionalAudio,
} from "@react-three/drei";
import * as THREE from "three";
import Text from "./Text.jsx";
import Lumos from "./Lumos.jsx";
import gsap from "gsap";

export default function Scene() {
  return (
    <>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
        <CameraShakeWithMouse />
        <group position={[0, 0, 0]}>
          <PositionalAudio autoplay loop url='/music.mp3' distance={3} />
        </group>
        <Plane receiveShadow args={[100, 100]} position={[0, 0, 0]}>
          <meshToonMaterial color='#e9ecef' receiveShadow />
        </Plane>
        <color attach='background' args={["#e9ecef"]} />
        <ResponsiveGroup textSize={16} />

        <Lumos />
      </Canvas>
    </>
  );
}

// Responsive Group Component with scale based on viewport width
function ResponsiveGroup() {
  const { width: w } = useThree((state) => state.viewport); // Get the viewport width
  const scale = w / 40; // Calculate responsive scale

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
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0}
      yawFrequency={0.1}
      pitchFrequency={0.1}
      rollFrequency={0}
    />
  );
}
