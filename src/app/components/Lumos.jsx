"use client";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useLumos } from "./LumosContext";
import gsap from "gsap";
import * as THREE from "three";

export default function Lumos() {
  const { lightRef, trackMouse, setTrackMouse } = useLumos();
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(0, 0, 3.5));
  const mouseTween = useRef();

  useEffect(() => {
    if (!trackMouse) return;

    const handleMove = (e) => {
      const x = e.touches?.[0]?.clientX || e.clientX;
      const y = e.touches?.[0]?.clientY || e.clientY;

      const targetX = (x / window.innerWidth) * 30 - 15;
      const targetY = -(y / window.innerHeight) * 10 + 5;

      mouseTween.current?.kill();
      mouseTween.current = gsap.to(pos.current, {
        x: targetX,
        y: targetY,
        duration: 2.5,
        ease: "power2",
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      mouseTween.current?.kill();
    };
  }, [trackMouse]);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(pos.current);
      lightRef.current.updateMatrixWorld();
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight intensity={1} position={[0, 0, 10]} />
      <pointLight
        ref={lightRef}
        castShadow
        intensity={25}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
    </>
  );
}
