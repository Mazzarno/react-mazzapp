"use client";
import {
  Box,
  Torus,
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

export default function PhysicsPage() {
  return (
    <div className='w-screen h-screen'>
      <Canvas>
        <Environment preset='sunset' />
        <color attach='background' args={["#7674b3"]} />
        <ambientLight intensity={2} color={"#f8f9fa"} />
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
        <Suspense>
          <Physics
            gravity={[0, -100, 0]}
            interpolation={false}
            colliders={false}
          >
            <RigidBody colliders={"hull"} restitution={2}>
              <Torus />
            </RigidBody>
            <CuboidCollider
              color='#3a34eb'
              position={[0, -2, 0]}
              args={[20000, 0.5, 20000]}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
