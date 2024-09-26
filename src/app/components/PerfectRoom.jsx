"use client";
import { Plane } from "@react-three/drei";

// Main Scene Component
export default function PerfectRoom() {
  return (
    <>
      {/* FORWARD WALL */}
      <Plane
        receiveShadow
        args={[50, 50]}
        position={[0, 15, 0]}
        rotation={[0, 0, 0]}
      >
        <meshToonMaterial color="#e9ecef" receiveShadow />
      </Plane>
      {/* RIGHT WALL */}
      <Plane
        receiveShadow
        args={[50, 50]}
        position={[25, 15, 25]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshToonMaterial color="#e9ecef" receiveShadow />
      </Plane>
      {/* LEFT WALL */}
      <Plane
        receiveShadow
        args={[50, 50]}
        position={[-25, 15, 25]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshToonMaterial color="#e9ecef" receiveShadow />
      </Plane>
      {/* FLOOR */}
      <Plane
        receiveShadow
        args={[50, 50]}
        position={[0, -10, 25]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshToonMaterial color="#e9ecef" receiveShadow />
      </Plane>
    </>
  );
}
