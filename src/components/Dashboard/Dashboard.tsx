import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import Members from "../Navbar/Members";
import NavbarAuth from "../Navbar/NavbarAuth";
import NavBarMenu from "../Navbar/NavbarMenu";
import ProfileSettings from "../Navbar/Profile/ProfileSettings/ProfileSettings";
import Channel from "./Channel/Channel";
import Chat from "./Channel/Chat/Chat";

const Dashboard = () => {
  const { roomId } = useParams();

  const handleDelete = async () => {
    await supabase
      .from("participant")
      .delete()
      .match({ id: "18dd5097-7721-4122-80db-b92c22e3cef0" });
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <>
      {/* <NavBarMenu /> */}

      <NavbarAuth />

      <Box sx={{ flexGrow: 1, marginTop: "65px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3} lg={2} sx={{ border: 1, height: "200vh" }}>
            <Typography sx={{ paddingLeft: "16px" }} variant="h6">
              <Channel />
            </Typography>
          </Grid>
          <Grid item xs={9} lg={8} sx={{ border: 1, height: "100vh" }}>
            <Typography variant="h6">
              <Chat />
              <Members />
              <ProfileSettings />
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
              <p>hi</p>
            </Typography>
          </Grid>
          <Grid item xs={0} lg={2} sx={{ border: 1, height: "100vh" }}>
            <Typography variant="h6">Information</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
