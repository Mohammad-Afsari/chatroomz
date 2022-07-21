import NavbarAuth from "../Navbar/NavbarAuth";

const Dashboard = () => {
  return (
    <>
      {/* <NavBarMenu /> */}

      <NavbarAuth />

      {/* <Box sx={{ flexGrow: 1, marginTop: "1000px" }}>
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
      </Box> */}
    </>
  );
};

export default Dashboard;
