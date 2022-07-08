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

interface INavBarProps {}

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
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
            ChatRoomz
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
