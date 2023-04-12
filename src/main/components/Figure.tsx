import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

const Figure = () => {
  const [scale, setScale] = useState(3);
  const [rot, setRot] = useState(0);

  const setAdjust = (event: DeviceOrientationEvent) => {
    const valR: number = event.beta === null ? rot : event.beta * 0.01 + rot;

    if (event.gamma != null && 0 >= event.gamma && event.gamma >= -90) {
      let valZ = (event.gamma + 75) * -0.1 + 3;
      if (valZ < 0.5 || valZ > 7) {
        if (valZ < 0.5) valZ = 0.5;
        else valZ = 7;
      }
      setScale(valZ);
    }

    setRot(valR);
  };

  window.addEventListener("deviceorientation", (event) => setAdjust(event));

  return (
    <>
      <Canvas camera={{ fov: 75, position: [5, 0, 0] }}>
        <ambientLight intensity={0.2} color="cyan" />

        <directionalLight color={0x11e8bb} position={[10, 10, 10]} />
        <pointLight color="cyan" intensity={1} position={[10, 10, 10]} />
        <mesh scale={[scale, scale, scale]} rotation={[0, rot, 0]}>
          <boxGeometry></boxGeometry>
          <meshStandardMaterial color={0xffffff}></meshStandardMaterial>
        </mesh>
      </Canvas>
    </>
  );
};

export default Figure;
