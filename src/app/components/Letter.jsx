import { Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export default function Letter({
  letter,
  position = [0, 0, 0],
  color = "#f8f9fa",
  font = "/fonts/Despairs1.json",
  textSize = 3.2,
  textHeight = 0.2,
  textCurveSegments = 10,
  textBevelSize = 0.02,
  textBevelThickness = 0.5,
  yRotation = 0,
  motionZinit = -2, // Initial Z position for the animation
  motionZ = 0, // Final Z position for the animation
  motionDuration = 1, // Duration of the animation
  motionDelay = 2, // Delay before the animation starts
}) {
  return (
    <motion.group
      initial={{
        z: motionZinit, // Correctly setting initial Z position
      }}
      animate={{
        z: motionZ, // Final Z position to animate to
      }}
      transition={{
        duration: motionDuration, // Duration of the animation
        delay: motionDelay, // Delay before the animation starts
      }}
    >
      <Text3D
        position={position}
        font={font}
        size={textSize}
        height={textHeight}
        curveSegments={textCurveSegments}
        bevelEnabled
        bevelSize={textBevelSize}
        bevelThickness={textBevelThickness}
        rotation={[0, yRotation, 0]}
        castShadow
        receiveShadow
      >
        {letter}
        <meshStandardMaterial color={color} />
      </Text3D>
    </motion.group>
  );
}
