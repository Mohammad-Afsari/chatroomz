import { Box, Grid, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { signOut } from "../../services/auth";
import { supabase } from "../../services/supabaseClient";
import NavBarMenu from "../Navbar/NavbarMenu";
import Channel from "./Channel/Channel";

const Dashboard = () => {
  const { roomId } = useParams();

  console.log(roomId);

  const handleSignOut = async () => {
    // Ends user session
    await signOut();
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("participant")
      .delete()
      .match({ id: "18dd5097-7721-4122-80db-b92c22e3cef0" });
    // console.log(data, error);
  };

  // use async await instead by using a variable (look at supabase docs)
  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <>
      <NavBarMenu />
      <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3} lg={3} sx={{ border: 1, height: "100vh" }}>
            <Typography sx={{ paddingLeft: "16px" }} variant="h6">
              <Channel />
            </Typography>
          </Grid>
          <Grid item xs={6} lg={6} sx={{ border: 1, height: "100vh" }}>
            <Typography variant="h6">Chat</Typography>
          </Grid>
          <Grid item xs={3} lg={3} sx={{ border: 1, height: "100vh" }}>
            <Typography variant="h6">Information</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

{
  /* <Paper
sx={{
  maxHeight: 500,
  overflow: "auto",
  width: "90vw",
  margin: "100px auto",
  // backgroundColor: "red",
}}
>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
<List>Hello</List>
</Paper> */
}
