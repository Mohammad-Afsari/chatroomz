import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../services/auth";
import NavBar from "../Navbar/Navbar";

const Signup = () => {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [username, setUsername] = useState<any>();

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Calls `signUp` function from the context
    await signUp({ email, password, username });
  }

  return (
    <>
      <NavBar />
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "40vw",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h2"
            component="span"
            sx={{
              textAlign: "left",
              width: "40vw",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "40px",
            }}
          >
            Create an Account
          </Typography>
          <Typography
            component="span"
            variant="h5"
            sx={{
              textAlign: "left",
              width: "40vw",
              margin: "0px auto",
              marginBottom: "40px",
            }}
          >
            Access the best chatroom service
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "40vw",
            margin: "0 auto",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              height: "300px",
              width: "40vw",
              borderRadius: "20px",
              margin: "0 auto",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              sx={{ width: "40vw", textAlign: "left", marginBottom: "20px" }}
            />
            <TextField
              variant="outlined"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{ width: "40vw", marginBottom: "20px" }}
            />
            <TextField
              variant="outlined"
              placeholder="Password (atleast 6 characters)"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{ width: "40vw", marginBottom: "20px" }}
            />
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "15vw",
                  textAlign: "right",
                }}
                type="submit"
              >
                {" "}
                Sign up
              </Button>
            </Box>
          </Box>
          <Typography variant="h6">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "white",
              }}
            >
              Log in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
