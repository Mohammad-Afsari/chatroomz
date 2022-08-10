import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";
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
