import {
  Button,
  Card,
  FormControl,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../../services/auth";
import { supabase } from "../../services/supabaseClient";
import { baseTheme } from "../../style/theme";
import NavBar from "../Navbar/Navbar";
import { TestAnimation } from "./TextAnimation";
import Image from "../../imgs/loginbg.jpg";
import { Box } from "@mui/system";
import { SiStyleshare } from "react-icons/si";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   // supabase
  //   //   .from("profile")
  //   //   .update({ username: "hello" })
  //   //   .match({ id: "f278ff1e-3cb3-4daf-bb35-1a72a01e9f99" })
  //   //   .then((d) => {
  //   //     console.log(d);
  //   //   });
  //   supabase
  //     .from("participant")
  //     .delete()
  //     .match({ id: "18dd5097-7721-4122-80db-b92c22e3cef0" })
  //     .then((d) => {
  //       console.log(d);
  //     });
  // }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Get email and password input values
    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    await signIn({ email, password });
  };

  return (
    <Box>
      <NavBar />
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "center",
            display: "flex",
          }}
        >
          <Typography
            variant="h2"
            sx={{ marginBottom: "50px", marginTop: "120px" }}
          >
            Sign In
          </Typography>
          {/* <TestAnimation /> */}
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", display: "flex" }}>
          <Typography>
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <Box
                  component="form"
                  sx={{
                    height: "200px",
                    width: "60vw",
                    margin: "0 auto",
                  }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                    InputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    inputProps={{ style: { color: "white", width: "50vw" } }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                    InputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    inputProps={{
                      style: {
                        // color: "white",
                        width: "50vw",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      // background: "grey",
                      width: "20vw",
                    }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Box>
                <Typography>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "white" }}>
                    Sign Up
                  </Link>
                </Typography>
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
