import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../../services/auth";
import NavBar from "../Navbar/Navbar";
import { Box } from "@mui/system";

export default function Login() {
  const [loading] = useState(false);
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
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "left",
              width: "40vw",
              margin: "0px auto",
              marginTop: "100px",
            }}
            component={"span"}
          >
            Sign in
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: "left", width: "40vw", margin: "40px auto" }}
            component={"span"}
          >
            Login to access ChatRoomz
          </Typography>
          {/* <TestAnimation /> */}
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "left",
              width: "40vw",
              margin: "0 auto",
            }}
            component={"span"}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <Box
                  component="form"
                  sx={{
                    height: "200px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: "20px", width: "100%" }}
                    InputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    inputProps={{ style: { color: "white" } }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: "20px", width: "100%" }}
                    InputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    inputProps={{
                      style: {
                        // color: "white",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                    component={"span"}
                  >
                    <Typography sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          color: "white",
                          width: "15vw",
                        }}
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                    </Typography>
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center" }}
                    component={"span"}
                    variant="h6"
                  >
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      style={{
                        color: "white",
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Typography>
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
