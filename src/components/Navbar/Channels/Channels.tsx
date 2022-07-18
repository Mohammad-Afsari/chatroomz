import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { supabase } from "../../../services/supabaseClient";
import { useAuth } from "../../../store/useAuth";
import { useEffect, useState } from "react";
import CreateChannel from "./CreateChannel/CreateChannel";
import { useChannel } from "../../../store/useChannel";
import { Link, useLocation } from "react-router-dom";
import { useMessage } from "../../../store/useMessage";
import Image from "../../../imgs/loginbg.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

const Channel = () => {
  const { session } = useAuth();
  const [username, setUsername] = useState<string>();
  const location = useLocation();
  const { addMessage } = useMessage();
  const [ifChosen, setIfChosen] = useState<boolean>(false);

  // Global store
  const { channel, currentChannel, setChannels, setCurrentChannel } =
    useChannel();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  // Get username from supabase
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase
        .from("profile")
        .select("*")
        .match({ id: session?.user?.id })
        .single();
      setUsername(data.username);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    // If global store channel is empty then populate it with what's on supabase
    if (channel.length === 0) {
      supabase
        .from("channel")
        .select("*")
        .then((d) => setChannels(d.data));
    }
  }, []);

  useEffect(() => {
    setCurrentChannel(location.pathname.slice(1, location.pathname.length));
    setIfChosen(true);
  }, []);

  useEffect(() => {
    if (currentChannel) {
      // const channelSubscription =
      supabase
        .from("message")
        .on("INSERT", (payload) => {
          console.log("Change received!", payload);
          addMessage(payload.new);
        })
        .subscribe();
    }
  }, [currentChannel]);

  return (
    <>
      <Typography variant="h6" sx={{ paddingLeft: "20px", color: "white" }}>
        # Channels
      </Typography>
      <Box sx={{ width: "90%", paddingLeft: "20px" }}>
        <List component="nav" aria-label="main mailbox folders">
          {ifChosen &&
            channel?.map((chan: any, key: number) => {
              return (
                <Link
                  to={"/" + chan.id}
                  style={{ textDecoration: "none" }}
                  key={chan.id}
                  onClick={() => setCurrentChannel(chan.id)}
                >
                  <ListItemButton
                    selected={selectedIndex === key + 2}
                    onClick={(event) => handleListItemClick(event, key + 2)}
                    sx={{ borderRadius: "10px", color: "lightGray" }}
                  >
                    <ListItemText primary={chan.channel_name} />
                  </ListItemButton>
                </Link>
              );
            })}
        </List>
        <CreateChannel />
        <Divider sx={{ marginTop: "20px" }} />
      </Box>
    </>
  );
};

export default Channel;
