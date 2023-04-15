import { IconButton } from "@mui/material";
import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-cyan-700 w-full place-content-center h-full">
        <h1 className="text-white text-5xl md:scale-100 md:mb-10 lg:mb-15 lg:scale-150 font-light mt-32 mb-6">
          Geometric Figures
        </h1>
        <IconButton onClick={() => navigate("selection/")}>
          <PlayCircleOutlineIcon
            fontSize="large"
            className=" scale-100 md:scale-125 lg:scale-150 text-white"
          />
        </IconButton>
      </div>
    </>
  );
};

export default Home;
