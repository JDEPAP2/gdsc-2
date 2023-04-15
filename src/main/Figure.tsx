import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated, config } from "@react-spring/three";
import NavBar from "./components/NavBar.jsx";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Figure = () => {
  const { n } = useParams();
  const navigate = useNavigate();
  const [dscale, setDScale] = useState(3);
  const [rot, setRot] = useState(0);
  const [wait, setWait] = useState(true);
  const [ori, setOri] = useState(
    window.screen.orientation.type == "portrait-primary" ? true : false
  );
  const { scale } = useSpring({
    scale: dscale,
    config: config.wobbly,
  });

  const figures = [
    {
      shape: <boxGeometry></boxGeometry>,
      rotation: [rot * 0.2, rot, 0],
      audio: require(`../media/Cube.mp3`),
      name: "Cube",
    },
    {
      shape: <coneGeometry args={[0.5, 1, 100]}></coneGeometry>,
      rotation: [0, rot * 0.5, rot * 0.1],
      audio: require(`../media/Cone.mp3`),
      name: "Cone",
    },
    {
      shape: <cylinderGeometry args={[0.6, 0.6]}></cylinderGeometry>,
      rotation: [rot * 0.1, 0, rot * 0.5],
      audio: require(`../media/Cylinder.mp3`),
      name: "Cylinder",
    },
    {
      shape: <dodecahedronGeometry args={[0.8]}></dodecahedronGeometry>,
      rotation: [0, rot * 0.6, rot * 0.4],
      audio: require(`../media/Dodecahedron.mp3`),
      name: "Dodecahedron",
    },
    {
      shape: <torusGeometry args={[0.5, 0.2]}></torusGeometry>,
      rotation: [0, rot, 0],
      audio: require(`../media/Torus.mp3`),
      name: "Torus",
    },
  ];

  const setAdjust = (event: DeviceOrientationEvent) => {
    if (ori) {
      const valR: number =
        event.gamma === null ? rot : event.gamma * 0.005 + rot;
      if (event.beta != null && 0 <= event.beta && event.beta <= 90) {
        let valZ = (event.beta - 90) * 0.1 + 3;
        if (valZ < 0.5 || valZ > 7) {
          if (valZ < 0.5) valZ = 0.5;
          else valZ = 7;
        }
        setDScale(valZ);
      }
      setRot(valR);
    } else {
      const valR: number = event.beta === null ? rot : event.beta * 0.01 + rot;
      if (event.gamma != null && 0 >= event.gamma && event.gamma >= -90) {
        let valZ = (event.gamma + 75) * -0.1 + 3;
        if (valZ < 0.5 || valZ > 7) {
          if (valZ < 0.5) valZ = 0.5;
          else valZ = 7;
        }
        setDScale(valZ);
      }
      setRot(valR);
    }
  };

  const setClicked = () => {
    const currentScale = dscale;
    const audio = new Audio(figures[n].audio);
    setDScale(dscale + dscale * 0.5);
    audio.play();
    setTimeout(() => setDScale(currentScale), 100);
  };

  window.addEventListener("deviceorientation", (event) => {
    if (!wait) setAdjust(event);
  });
  window
    .matchMedia("(orientation: portrait)")
    .addEventListener("change", (e) => setOri(e.matches ? true : false));

  const InitRot = () => {
    useFrame(({ clock }) => {
      console.log(clock.getElapsedTime());
      if (clock.getElapsedTime() > 7) {
        setRot(0);
        setWait(false);
      }
      setDScale(1);
      setRot(rot + 0.05);
    });
  };

  return (
    <>
      <NavBar name={figures[n].name} show={true} />
      <div style={{ zIndex: 990 }} className="absolute bottom-0">
        <div className="flex">
          <IconButton
            onClick={() => navigate(`../figure/${n == 0 ? 4 : n - 1}/`)}
          >
            <NavigateBeforeIcon fontSize="large" className="text-white" />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(`../figure/${n == 4 ? 0 : parseInt(n) + 1}/`)
            }
          >
            <NavigateNextIcon fontSize="large" className="text-white" />
          </IconButton>
        </div>
      </div>
      {wait && (
        <div
          style={{ zIndex: 999 }}
          className="absolute w-full h-full bg-black opacity-20"
        >
          <div className="flex lg:mt-32 md:mt-16 mt-12 p-5">
            <p className="text-white font-light text-md md:text-2xl lg:text-4xl">
              Rotate your phone left or right to rotate the figure
            </p>
            <div className="w-full"></div>
            <p className="text-white font-light text-md md:text-2xl lg:text-4xl">
              Rotate your phone up or down to zoom in on the figure
            </p>
          </div>
        </div>
      )}
      {n > -1 && n < 5 ? (
        <Canvas camera={{ fov: 75, position: [5, 0, 0] }}>
          <color attach="background" args={[0xc6ebf5]} />
          <ambientLight intensity={0.2} color="cyan" />
          <directionalLight color={0xffffff} position={[10, 10, 10]} />
          <pointLight color="cyan" intensity={1} position={[10, 10, 10]} />
          <mesh rotation={figures[n].rotation} position={[0, -0.5, 0]}>
            <animated.mesh scale={scale} onClick={() => setClicked()}>
              {figures[n].shape}
              <meshNormalMaterial />
            </animated.mesh>
          </mesh>
          {wait && <InitRot />}
        </Canvas>
      ) : (
        <p>Error en el numero</p>
      )}
    </>
  );
};

export default Figure;
