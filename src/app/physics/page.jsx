"use client";
import {
  PerspectiveCamera,
  OrbitControls,
  Environment,
  Sphere,
} from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import PerfectRoom from "../components/PerfectRoom";

function AttractedSphere({ position }) {
  const sphereRef = useRef();
  const [dispersed, setDispersed] = useState(false);

  // Fonction pour gérer les clics/tap et calculer la direction de la dispersion
  const handlePointerDown = (event) => {
    const { point } = event; // Point d'intersection avec la sphère (position de la souris ou du tap)
    const spherePosition = sphereRef.current.translation();

    // Calculer la direction de l'impulsion à partir du point d'interaction
    const directionToHover = {
      x: point.x - spherePosition.x,
      y: point.y - spherePosition.y,
      z: point.z - spherePosition.z,
    };

    // Limiter la force d'impulsion pour empêcher les sphères d'aller trop loin
    const impulseStrength = 2; // Impulsion plus faible pour limiter la dispersion

    // Appliquer l'impulsion dans la direction du hover ou tap
    sphereRef.current.applyImpulse(
      {
        x: directionToHover.x * impulseStrength,
        y: directionToHover.y * impulseStrength,
        z: directionToHover.z * impulseStrength,
      },
      true
    );

    setDispersed(true);

    // Timer pour réactiver l'attraction après dispersion
    setTimeout(() => {
      setDispersed(false);
    }, 500); // Réduit le temps de dispersion à 0.5 seconde
  };

  useFrame(() => {
    if (sphereRef.current && !dispersed) {
      const spherePosition = sphereRef.current.translation();
      const directionToCenter = {
        x: -spherePosition.x,
        y: -spherePosition.y,
        z: -spherePosition.z,
      };

      // Augmenter l'attraction pour rendre les sphères plus "attractives"
      const attractionStrength = 1.5; // Impulsion vers le centre plus forte

      // Appliquer l'impulsion pour attirer les sphères vers le centre
      sphereRef.current.applyImpulse(
        {
          x: directionToCenter.x * attractionStrength,
          y: directionToCenter.y * attractionStrength,
          z: directionToCenter.z * attractionStrength,
        },
        true
      );
    }
  });

  return (
    <RigidBody
      ref={sphereRef}
      colliders="ball"
      restitution={1} // Rebondir avec restitution parfaite
      position={position}
      onPointerDown={handlePointerDown} // Gérer les clics et les interactions tactiles
    >
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color={"#ff0000"} />
      </Sphere>
    </RigidBody>
  );
}

export default function PhysicsPage() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <Environment preset="sunset" />
        <color attach="background" args={["#7674b3"]} />
        <ambientLight intensity={2} color={"#f8f9fa"} />
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0, 0, 60]} fov={60} />
        <Suspense>
          <Physics gravity={[0, -9.81, 0]}>
            <PerfectRoom />
            {/* Ajout des 8 sphères */}
            <AttractedSphere position={[10, 5, 0]} />
            <AttractedSphere position={[-10, 5, 0]} />
            <AttractedSphere position={[0, 5, 10]} />
            <AttractedSphere position={[5, 10, -5]} />
            <AttractedSphere position={[-5, 10, -5]} />
            <AttractedSphere position={[10, 10, 10]} />
            <AttractedSphere position={[-10, 10, -10]} />
            <AttractedSphere position={[0, 10, 0]} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
