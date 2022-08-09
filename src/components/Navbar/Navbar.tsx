import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { ImMakeGroup } from "react-icons/im";
import { RiWechatPayFill } from "react-icons/ri";
import { SiRocketdotchat } from "react-icons/si";
import { TbBrandHipchat } from "react-icons/tb";
import { GiAbstract018 } from "react-icons/gi";
import { AiFillDingtalkSquare } from "react-icons/ai";
import { GiLion } from "react-icons/gi";
import { FaWolfPackBattalion } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2, color: "whitesmoke" }}
            >
              <FaWolfPackBattalion />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Strife
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
