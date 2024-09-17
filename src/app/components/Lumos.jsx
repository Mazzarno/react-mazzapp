import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { PointLightHelper } from "@react-three/drei";

export default function Lumos() {
  const lightRef = useRef(null);
  const [mouseMoved, setMouseMoved] = useState(false); // Track if the mouse has moved
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update the position based on mouse movement
  const updatePosition = (x, y) => {
    const posX = (x / window.innerWidth) * 30 - 15;
    const posY = -(y / window.innerHeight) * 10 + 5;

    // Animate light position using gsap
    if (lightRef.current) {
      gsap.to(lightRef.current.position, {
        x: posX,
        y: posY,
        z: 3.5,
        duration: 2.5,
        ease: "power2",
      });
    }
  };

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
      setMouseMoved(true); // Set the flag when the mouse moves
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update position based on mouse movement
  useEffect(() => {
    if (mouseMoved) {
      updatePosition(mousePos.x, mousePos.y);
    }
  }, [mousePos, mouseMoved]);

  return (
    <>
      <ambientLight intensity={1.2} color={"#f8f9fa"} />
      <directionalLight
        color={"#f8f9fa"}
        intensity={0.1}
        position={[0, 0, 5]}
      />
      <pointLight
        ref={lightRef}
        position={[0, 0, 3.5]}
        color={"#faedcd"}
        castShadow
        intensity={15}
        scale={[10, 10, 10]}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />
    </>
  );
}
