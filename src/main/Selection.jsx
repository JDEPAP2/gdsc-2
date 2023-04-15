import React from "react";
import NavBar from "./components/NavBar.jsx";
import { Box, IconButton } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const Selection = () => {
  const navigate = useNavigate();
  const figures = [
    {
      shape: <boxGeometry></boxGeometry>,
      name: "Cube",
    },
    {
      shape: <coneGeometry args={[0.5, 1, 100]}></coneGeometry>,
      name: "Cone",
    },
    {
      shape: <cylinderGeometry args={[0.6, 0.6]}></cylinderGeometry>,
      name: "Cylinder",
    },
    {
      shape: <dodecahedronGeometry args={[0.8]}></dodecahedronGeometry>,
      name: "Dodecahedron",
    },
    {
      shape: <torusGeometry args={[0.5, 0.2]}></torusGeometry>,
      name: "Torus",
    },
  ];

  return (
    <>
      <NavBar name="Geometric Figures" />
      <div className="gap-5 pt-[100px] md:pt-[500px] grid w-auto h-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {figures.map((v, i) => {
          return (
            <Box className="bg-white place-content-center rounded-md h-30 w-full">
              <p className="my-1 text-cyan-800 sm:text-lg md:text-2xl lg:text-3xl font-light">
                {v.name}
              </p>
              <div className="flex place-content-center">
                <div className="h-20 w-20 md:h-32 md:w-32 lg:h-40 lg:w-40 ml-5 ">
                  <Canvas camera={{ fov: 75, position: [1.5, 0, 1] }}>
                    <mesh>
                      {v.shape}
                      <meshNormalMaterial />
                    </mesh>
                  </Canvas>
                </div>
                <div className="mr-5 mt-5 sm:mt-10 md:mt-20 lg:mt-30">
                  <IconButton onClick={() => navigate(`../figure/${i}`)}>
                    <PlayCircleOutlineIcon
                      fontSize="large"
                      className="text-amber-800 sm:scale-100 md:scale-125 lg:scale-150"
                    />
                  </IconButton>
                </div>
              </div>
            </Box>
          );
        })}
      </div>
    </>
  );
};

export default Selection;
