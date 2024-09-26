"use client";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

function DraggableBox() {
  const meshRef = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // État pour stocker la position et la rotation de l'objet
  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  // Utilisation de useDrag pour permettre le déplacement avec le clic gauche
  const bindDrag = useDrag(({ offset: [x, y], buttons }) => {
    // Si clic gauche (bouton 1), on déplace
    if (buttons === 1) {
      setPosition([x / aspect, -y / aspect, position[2]]); // Met à jour la position en fonction du drag
    }
    // Si clic droit (bouton 2), on fait la rotation
    else if (buttons === 2) {
      setRotation([y / aspect, x / aspect, rotation[2]]); // Rotation selon le mouvement de la souris
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} {...bindDrag()}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <ambientLight intensity={0.5} />
      <DraggableBox />
    </Canvas>
  );
}

export default Scene;
