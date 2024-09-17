import { Text3D, Center, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
export default function Text() {
  const fontUrl = "/fonts/Despairs1.json";
  const { width: w, height: h } = useThree((state) => state.viewport);
  const textSize = w / 14;
  const TextMaxWidth = [-w / 5, -h * 2, 3];
  const textCurveSegments = 10;
  const textBevelSize = 0.02;
  const textBevelThickness = 0.5;
  const textHeight = 0.2;
  const textLetterSpacing = 0.2;

  return (
    <>

      <Center>
        <group position={[-7, -1, 0.7]}>
          <Text3D
            position={[3, 2, 0]}
            size={textSize}
            maxWidth={TextMaxWidth}
            font={fontUrl}
            curveSegments={textCurveSegments}
            bevelEnabled
            bevelSize={textBevelSize}
            bevelThickness={textBevelThickness}
            height={textHeight}
            letterSpacing={textLetterSpacing}
            castShadow
          >
            {`ALEXIS`}
            <meshStandardMaterial color="#f8f9fa" />
          </Text3D>
          <Text3D
            position={[0, -2, 0]}
            size={textSize}
            maxWidth={TextMaxWidth}
            font={fontUrl}
            curveSegments={textCurveSegments}
            bevelEnabled
            bevelSize={textBevelSize}
            bevelThickness={textBevelThickness}
            height={textHeight}
            letterSpacing={textLetterSpacing}
            castShadow
          >
            {`GERMAIN`}
            <meshStandardMaterial color="#f8f9fa" />
          </Text3D>
        </group>
      </Center>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text3D
          position={[-14, 2, 2]}
          size={w / 12}
          maxWidth={[-w / 5, -h * 2, 3]}
          font={fontUrl}
          curveSegments={10}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.5}
          height={0.2}
          letterSpacing={0.2}
          castShadow
          rotation-y="0.5"
        >
          {`?`}
          <meshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Float>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text3D
          position={[-15, -4, 2]}
          size={w / 12}
          maxWidth={[-w / 5, -h * 2, 3]}
          font={fontUrl}
          curveSegments={10}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.5}
          height={0.2}
          letterSpacing={0.2}
          castShadow
          rotation-y="1.1"
        >
          {`<`}
          <meshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Float>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text3D
          position={[10, 1, 2]}
          size={w / 16}
          maxWidth={[-w / 5, -h * 2, 3]}
          font={fontUrl}
          curveSegments={10}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.5}
          height={0.2}
          letterSpacing={0.2}
          castShadow
          rotation-y="-1.2"
        >
          {`/`}
          <meshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Float>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text3D
          position={[12, 0.5, 2]}
          size={w / 12}
          maxWidth={[-w / 5, -h * 2, 3]}
          font={fontUrl}
          curveSegments={10}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.5}
          height={0.2}
          letterSpacing={0.2}
          rotation-y="-1"
          castShadow
        >
          {`>`}
          <meshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Float>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text3D
          position={[12, -6, 2]}
          size={w / 16}
          maxWidth={[-w / 5, -h * 2, 3]}
          font={fontUrl}
          curveSegments={10}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.5}
          height={0.2}
          letterSpacing={0.2}
          castShadow
          rotation-y="-1"
        >
          {`@`}
          <meshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Float>
    </>
  );
}
