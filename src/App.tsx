import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./services/supabaseClient";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "55px 0 100px 0" }}>
      {!session ? (
        <Login />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}

export default App;
