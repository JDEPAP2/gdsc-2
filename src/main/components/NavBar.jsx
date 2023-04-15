import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const { name, show } = props;
  const navigate = useNavigate();
  return (
    <AppBar position="absolute" color="background" elevation={0}>
      <Toolbar>
        <IconButton
          onClick={() => navigate(`../`)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <HomeOutlinedIcon
            sx={{ fontSize: "30px" }}
            className="text-green-800 "
          />
        </IconButton>
        <div className="text-cyan-800  text-2xl lg:text-4xl md:text-3xl font-light w-full">
          <h1>{name}</h1>
        </div>
        {show && (
          <IconButton
            onClick={() => navigate(`../selection`)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
          >
            <InterestsOutlinedIcon
              sx={{ fontSize: "30px" }}
              className="text-amber-800"
            />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
