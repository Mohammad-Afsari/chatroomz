import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../services/auth";
import NavBar from "../Navbar/Navbar";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const { mutate, data, isLoading, error } = useMutation((data: any) => {
    return signUp(data);
  });

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

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Calls `signUp` function from the context
    await signUp({ email, password, username });
  }

  useEffect(() => {
    if (username?.length > 10) {
      setIsUsernameInvalid(true);
    } else if (username?.length < 10) {
      setIsUsernameInvalid(false);
    }
  }, [username]);

  useEffect(() => {
    if (password?.length >= 6) {
      setIsPasswordInvalid(false);
    } else if (password?.length < 6) {
      setIsPasswordInvalid(true);
    }
  }, [password]);

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
            width: "80vw",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h2"
            component="span"
            sx={{
              textAlign: "left",
              width: "80vw",
              maxWidth: "800px",
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
              width: "80vw",
              maxWidth: "800px",
              margin: "0px auto",
              marginBottom: "40px",
            }}
          >
            Access the best chatroom service.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "80vw",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              height: "300px",
              width: "80vw",
              maxWidth: "800px",
              borderRadius: "20px",
              margin: "0 auto",
            }}
          >
            <TextField
              required
              // inputProps={{ maxLength: 10 }}
              error={isUsernameInvalid}
              helperText={isUsernameInvalid && "Max: 10 characters."}
              variant="outlined"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              inputProps={{ maxLength: 11 }}
              sx={{
                width: "80vw",
                maxWidth: "800px",
                textAlign: "left",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              variant="outlined"
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{ width: "80vw", maxWidth: "800px", marginBottom: "20px" }}
            />
            <TextField
              required
              error={isPasswordInvalid}
              helperText={isPasswordInvalid && "Min: 6 characters."}
              variant="outlined"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{ width: "80vw", maxWidth: "800px", marginBottom: "20px" }}
            />
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "30vw",
                  maxWidth: "150px",
                  textAlign: "right",
                }}
                type="submit"
                onClick={() => {
                  mutate({ username, email, password });
                  handleClick();
                }}
              >
                {" "}
                Sign up
              </Button>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ marginTop: "40px", marginBottom: "200px" }}
          >
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
            Error — Please enter a valid username, email and password.
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Signup;
