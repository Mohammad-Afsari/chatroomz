import { Box, Grid, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { signOut } from "../../services/auth";
import { supabase } from "../../services/supabaseClient";
import NavBarMenu from "../Navbar/NavbarMenu";

interface IDashboardProps {}

const Dashboard = () => {
  const handleSignOut = async () => {
    // Ends user session
    await signOut();
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("participant")
      .delete()
      .match({ id: "18dd5097-7721-4122-80db-b92c22e3cef0" });
    console.log(data, error);
  };

  // use async await instead by using a variable (look at supabase docs)
  useEffect(() => {
    handleDelete();

    // supabase
    //   .from("message")
    //   .delete()
    //   .match({ id: "58bc7e16-de24-4290-a6a4-4489b2ca25d0" });
    // .then((d) => {
    //   console.log(d);
    // });
    // .insert([
    //   {
    //     channel_name: "MusTV+knowledge",
    //     channel_desc: "dev genius",
    //     creator_id: "f278ff1e-3cb3-4daf-bb35-1a72a01e9f99",
    //   },
    // ])
    // .match({ id: "22ce2da9-befa-44ba-8f49-52fd3afb8dff" })
    // .then(
    //   (d) => {
    //     console.log(d);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }, []);

  return (
    <>
      <NavBarMenu />
      {/* <Typography>Hello</Typography> */}
      <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3} lg={2} sx={{ border: 1, height: "100vh" }}>
            <Typography sx={{ paddingLeft: "16px" }} variant="h6">
              Channels
            </Typography>
          </Grid>
          <Grid item xs={6} lg={8} sx={{ border: 1, height: "100vh" }}>
            <Typography variant="h6">Chat</Typography>
          </Grid>
          <Grid item xs={3} lg={2} sx={{ border: 1, height: "100vh" }}>
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
