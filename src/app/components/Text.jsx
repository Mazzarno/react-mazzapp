import { Float } from "@react-three/drei";
import Letter from "./Letter";
import Start from "./Start";

export default function Text() {
  return (
    <>
      <group position={[0, 0, 0]}>
        <AlexisGermain />
        <FloatingLetter />
        <Start />
      </group>
    </>
  );
}

function AlexisGermain() {
  return (
    <group position={[-2, -0.5, 0]}>
      <group position={[0.5, 0.8, 0]}>
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={1.5}
          letter="A"
          position={[-6.2, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2}
          letter="L"
          position={[-3, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={2.5}
          letter="E"
          position={[-0.5, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={3}
          letter="X"
          position={[2.2, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={3.5}
          letter="I"
          position={[5.3, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={4}
          letter="S"
          position={[6, 0, 0.7]}
        />
      </group>

      <group position={[0, -2.9, 0]}>
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={3}
          letter="G"
          position={[-8, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={3.5}
          letter="E"
          position={[-4.5, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={4}
          letter="R"
          position={[-1.8, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={4.5}
          letter="M"
          position={[1, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={5}
          letter="A"
          position={[4.2, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={5.5}
          letter="I"
          position={[7.4, 0, 0.7]}
        />
        <Letter
          motionZinit={-1.7}
          motionZ={0}
          motionDelay={6}
          letter="N"
          position={[8.2, 0, 0.7]}
        />
      </group>
    </group>
  );
}

function FloatingLetter() {
  const floatSpeed = 1;
  const floatRotationIntensity = 0.1;
  const floatIntensities = 1;
  const floatRange = [-1, 1];

  return (
    <group>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={7}
          letter="?"
          position={[-14, 2, 1]}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={6}
          letter="<"
          position={[-14, -3, 1]}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={6.5}
          letter="/"
          position={[8, 1, 1]}
          textSize={2}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={6}
          letter=">"
          position={[10, 0.5, 1]}
        />
      </Float>
      <Float
        speed={floatSpeed}
        rotationIntensity={floatRotationIntensity}
        floatIntensity={floatIntensities}
        floatingRange={floatRange}
      >
        <Letter
          motionZinit={-2}
          motionZ={0}
          motionDelay={7}
          letter="@"
          position={[10, -4, 1]}
          textSize={2}
        />
      </Float>
    </group>
  );
}
