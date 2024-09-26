"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import {
  PerspectiveCamera,
  CameraShake,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import Text from "./Text.jsx";
import Lumos from "./Lumos.jsx";
import PerfectRoom from "./PerfectRoom.jsx";
import gsap from "gsap";

export default function Scene() {
  const { x, y, z } = useControls({
    x: {
      value: 0, // Position initiale de l'axe X
      min: -50, // Limite minimum pour X
      max: 50, // Limite maximum pour X
      step: 0.1, // Pas d'incrémentation
      label: "X Axis", // Label pour clarification dans Leva UI
    },
    y: {
      value: 0, // Position initiale de l'axe Y
      min: -50, // Limite minimum pour Y
      max: 50, // Limite maximum pour Y
      step: 0.1, // Pas d'incrémentation
      label: "Y Axis", // Label pour clarification
    },
    z: {
      value: 20, // Position initiale de l'axe Z
      min: -50, // Limite minimum pour Z
      max: 50, // Limite maximum pour Z
      step: 0.1, // Pas d'incrémentation
      label: "Z Axis", // Label pour clarification
    },
  });

  return (
    <>
      <Canvas shadows>
        <Environment preset="sunset" />
        <PerspectiveCamera makeDefault position={[x, y, z]} fov={60} />
        <OrbitControls />
        <color attach="background" args={["#e9ecef"]} />
        <ResponsiveGroup textSize={16} />
        <Lumos />
      </Canvas>
    </>
  );
}

function ResponsiveGroup() {
  const { width: w } = useThree((state) => state.viewport);
  const scale = w / 40;
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
