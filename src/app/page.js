"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, PerspectiveCamera } from "@react-three/drei";
import Text from "./components/Text";
import Lumos from "./components/Lumos";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60}/>
        <OrbitControls />
        <color attach="background" args={["#e9ecef"]} />
        <group>
          <Lumos />
          <Text />
          <Plane receiveShadow args={[100, 100]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#e9ecef" receiveShadow />
          </Plane>
        </group>
      </Canvas>
    </div>
  );
}
