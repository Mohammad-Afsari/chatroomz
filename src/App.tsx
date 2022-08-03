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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { session, setSession } = useAuth();

  // const queryClient = new QueryClient();

  useEffect(() => {
    setSession(supabase.auth.session()); // removed for example

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // removed for example
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* Add in react router in here with all the components */}
            <Route path="/" element={<PrivateOutlet />}>
              {/* Can put multiple private route elements in here */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/:roomId" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<AuthOutlet />}>
              {/* Can put multiple private route elements in here */}
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
