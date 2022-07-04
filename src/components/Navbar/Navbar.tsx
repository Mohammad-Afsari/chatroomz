import { Typography } from "@mui/material";
import * as React from "react";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import SendIcon from "@mui/icons-material/Send";
import { SiFoodpanda } from "react-icons/si";
import { ImMakeGroup } from "react-icons/im";

interface INavBarProps {}

const NavBar = () => {
  return (
    <Typography
      sx={{
        textAlign: "left",
        paddingLeft: "20px",
        paddingTop: "20px",
      }}
    >
      {/* <FlutterDashIcon style={{ fontSize: "40px" }} /> */}
      {/* <SiFoodpanda style={{ fontSize: "40px" }} /> */}
      {/* <SendIcon style={{ fontSize: "40px" }} /> */}
      <ImMakeGroup style={{ fontSize: "30px" }} />
    </Typography>
  );
};

export default NavBar;
