import { Grid, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../../services/auth";
import { supabase } from "../../services/supabaseClient";
import { baseTheme } from "../../style/theme";
import NavBar from "../Navbar/Navbar";
import { TestAnimation } from "./TextAnimation";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

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
          <Typography variant="h2" sx={{ color: "whitesmoke" }}>
            ChatRoomz
          </Typography>
          {/* <TestAnimation /> */}
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography component={"span"}>
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <form onSubmit={handleLogin}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="inputField"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: "4px" }}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    value={password}
                    // type="password"
                    ref={passwordRef}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: "4px" }}
                  ></input>
                  <button className="button block" aria-live="polite">
                    Login
                  </button>
                </form>
                <Typography>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
