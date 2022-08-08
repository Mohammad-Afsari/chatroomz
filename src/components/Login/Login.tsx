import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../../services/auth";
import NavBar from "../Navbar/Navbar";
import { Box } from "@mui/system";
import { useAuth } from "../../store/useAuth";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [loading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session } = useAuth();
  const { mutate, data, isLoading, error } = useMutation((data: any) => {
    return signIn(data);
  });

  console.log(error);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Calls `signIn` function from the context
    await signIn({ email, password });
  };

  return (
    <>
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
              width: "80vw",
              maxWidth: "800px",
              margin: "0px auto",
              marginTop: "100px",
            }}
            component={"span"}
          >
            Sign in
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "left",
              width: "80vw",
              maxWidth: "800px",
              margin: "40px auto",
            }}
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
              width: "80vw",
              maxWidth: "800px",
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
                          width: "30vw",
                          maxWidth: "200px",
                        }}
                        onClick={() => {
                          handleClick();
                          mutate({ email, password });
                        }}
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
      {error && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{
              width: "100%",
            }}
          >
            Error — Incorrect login credentials.
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
