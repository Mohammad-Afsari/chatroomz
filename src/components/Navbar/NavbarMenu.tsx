import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import SendIcon from "@mui/icons-material/Send";
import { SiFoodpanda } from "react-icons/si";
import { ImMakeGroup } from "react-icons/im";
import { useState } from "react";
import { signOut } from "../../services/auth";

interface INavBarMenuProps {}

const NavBarMenu = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            // aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ImMakeGroup />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBarMenu;
