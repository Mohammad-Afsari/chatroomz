import React from "react";
import "./App.css";
import { useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import Login from "./components/Login/Login";

// Version 6 of react-router-dom 'Switch' is replaced by routers 'Routes'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateOutlet from "./services/PrivateOutlet";
import { useAuth } from "./store/useAuth";
import AuthOutlet from "./services/AuthOutlet";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./style/theme";
import { CssBaseline } from "@mui/material";

function App() {
  const { setSession } = useAuth();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(_event, session);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Add in react router in here with all the components */}
          <Route path="/" element={<PrivateOutlet />}>
            {/* Can put multiple private route elements in here */}
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<AuthOutlet />}>
            {/* Can put multiple private route elements in here */}
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
