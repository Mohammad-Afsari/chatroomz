import { Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { signOut } from "../../services/auth";
import { supabase } from "../../services/supabaseClient";

interface IDashboardProps {}

const Dashboard = () => {
  const handleSignOut = async () => {
    // Ends user session
    await signOut();
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("participant")
      .delete()
      .match({ id: "18dd5097-7721-4122-80db-b92c22e3cef0" });
    console.log(data, error);
  };

  // use async await instead by using a variable (look at supabase docs)
  useEffect(() => {
    handleDelete();

    // supabase
    //   .from("message")
    //   .delete()
    //   .match({ id: "58bc7e16-de24-4290-a6a4-4489b2ca25d0" });
    // .then((d) => {
    //   console.log(d);
    // });
    // .insert([
    //   {
    //     channel_name: "MusTV+knowledge",
    //     channel_desc: "dev genius",
    //     creator_id: "f278ff1e-3cb3-4daf-bb35-1a72a01e9f99",
    //   },
    // ])
    // .match({ id: "22ce2da9-befa-44ba-8f49-52fd3afb8dff" })
    // .then(
    //   (d) => {
    //     console.log(d);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }, []);

  return (
    <div>
      <Typography>Welcome to ChatRoomz!</Typography>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Dashboard;
