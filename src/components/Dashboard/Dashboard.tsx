import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { useChannel } from "../../store/useChannel";
import { useMessage } from "../../store/useMessage";
import NavbarAuth from "../Navbar/NavbarAuth";

const Dashboard = () => {
  const { currentChannel } = useChannel();
  const { addMessage } = useMessage();
  let { roomId } = useParams();

  // useEffect(() => {
  //   supabase.removeAllSubscriptions();
  //   // if (roomId) {
  //   supabase
  //     .from(`message:channel_id=eq.${roomId}`)
  //     .on("INSERT", (payload) => {
  //       console.log("Change received!", payload);
  //       addMessage(payload.new);
  //     })
  //     .subscribe();
  //   // }

  //   // return () => supabase.removeAllSubscriptions();
  // }, [roomId]);

  // console.log(roomId);

  // useEffect(() => {
  //   supabase.removeAllSubscriptions();
  //   // if (roomId) {
  //   supabase
  //     .from(`message:channel_id=eq.${roomId}`)
  //     .on("INSERT", (payload) => {
  //       console.log("Change received!", payload);
  //       addMessage(payload.new);
  //     })
  //     .subscribe();
  //   // }

  //   // return () => supabase.removeAllSubscriptions();
  // }, []);

  return (
    <>
      <NavbarAuth />
    </>
  );
};

export default Dashboard;
