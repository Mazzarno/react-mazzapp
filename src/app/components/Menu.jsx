import { motion } from "framer-motion-3d";
import { Gltf } from "@react-three/drei";
import { useState } from "react";
import { Float } from "@react-three/drei";
import Font2Letter from "./Font2Letter";

export default function Menu() {
  const [isHovering, setIsHovering] = useState(false);
  const floatSpeed = 2;
  const floatRotationIntensity = 0.1;
  const floatIntensities = 10;
  const floatRange = [-0.01, 0.01];
  return (
    <>
      {/*  NOKIA  */}
      <motion.group
        position={[45, 2, 45]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <motion.group
            whileHover={{
              rotateY: [0, Math.PI * 2],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              },
            }}
            animate={
              isHovering
                ? {}
                : {
                    rotateY: Math.PI * 2,
                    transition: {
                      duration: 2,
                      ease: "linear",
                    },
                  }
            }
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Gltf
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Nokia.glb"}
              scale={10}
            />
          </motion.group>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="CONTACT" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  PC  */}
      <motion.group
        position={[45, 2, 50]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <motion.group
            position={[0, -0.7, 0]}
            whileHover={{
              rotateY: [0, Math.PI * 2],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              },
            }}
            animate={
              isHovering
                ? {}
                : {
                    rotateY: Math.PI * 2,
                    transition: {
                      duration: 2,
                      ease: "linear",
                    },
                  }
            }
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Gltf
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Notebook.glb"}
              scale={1.2}
            />
          </motion.group>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="RESEAUX" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  Dualshock  */}
      <motion.group
        position={[45, 2, 55]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <motion.group
            rotation={[0, Math.PI / -2, Math.PI / 2]}
            position={[0, -0.1, 0]}
            whileHover={{
              rotateY: [0, Math.PI * 2],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              },
            }}
            animate={
              isHovering
                ? {}
                : {
                    rotateY: Math.PI * 2,
                    transition: {
                      duration: 2,
                      ease: "linear",
                    },
                  }
            }
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Gltf
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Dualshock.glb"}
              scale={0.8}
            />
          </motion.group>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="GAME" position={[2, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      {/*  Case  */}
      <motion.group
        position={[45, -2, 45]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <motion.group
            rotation={[0, Math.PI / -2, Math.PI / 2]}
            position={[0, -0.1, 0]}
            whileHover={{
              rotateY: [0, Math.PI * 2],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              },
            }}
            animate={
              isHovering
                ? {}
                : {
                    rotateY: Math.PI * 2,
                    transition: {
                      duration: 2,
                      ease: "linear",
                    },
                  }
            }
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Gltf
              rotation={[0, Math.PI / -2, 0]}
              src={"models/Case.glb"}
              scale={1.9}
            />
          </motion.group>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="PORTFOLIO" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
      <motion.group
        position={[45, -2, 50]}
        whileTap={{
          scaleY: 0.9,
          scaleZ: 0.9,
          scaleX: 0.9,
        }}
      >
        <Float
          speed={floatSpeed}
          rotationIntensity={floatRotationIntensity}
          floatIntensity={floatIntensities}
          floatingRange={floatRange}
        >
          <motion.group
            rotation={[0, Math.PI / -2, Math.PI / 2]}
            position={[0, -0.1, 0]}
            whileHover={{
              rotateY: [0, Math.PI * 2],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              },
            }}
            animate={
              isHovering
                ? {}
                : {
                    rotateY: Math.PI * 2,
                    transition: {
                      duration: 2,
                      ease: "linear",
                    },
                  }
            }
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
       
          </motion.group>
          <motion.group
            position={[0, -1.6, -1.4]}
            rotation={[0, Math.PI / -2, 0]}
            scale={0.3}
          >
            <Font2Letter Font2Letter="LIGHT" position={[0, 0, 0]} />
          </motion.group>
        </Float>
      </motion.group>
    </>
  );
}
