import {
  Box,
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../services/auth";
import NavBar from "../Navbar/Navbar";
import { baseTheme } from "../../style/theme";

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
      <ThemeProvider theme={baseTheme}>
        <NavBar />
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "30px", width: "60vw", margin: "0 auto" }}
            >
              Create an Account.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                height: "300px",
                width: "60vw",
                margin: "0 auto",
                marginTop: "50px",
                paddingTop: "100px",
                background: "navy",
                borderRadius: "20px",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                inputProps={{
                  style: {
                    color: "white",
                    width: "50vw",
                  },
                }}
              />
              <TextField
                variant="outlined"
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                inputProps={{ style: { color: "white", width: "50vw" } }}
              />
              <TextField
                variant="outlined"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                inputProps={{ style: { color: "white", width: "50vw" } }}
              />
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  background: "grey",
                  width: "20vw",
                }}
                type="submit"
              >
                {" "}
                Sign up
              </Button>
            </Box>

            <Typography sx={{}}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Log in
              </Link>
            </Typography>
          </Grid>
        </Grid>
        {/* <form onSubmit={handleSubmit}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={emailRef} />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={passwordRef} />

          <br />

          <button type="submit">Sign up</button>
        </form> */}
      </ThemeProvider>
    </>
  );
};

export default Signup;
