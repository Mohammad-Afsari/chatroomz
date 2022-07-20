import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { supabase } from "../../../services/supabaseClient";
import { useEffect, useState } from "react";
import CreateChannel from "./CreateChannel/CreateChannel";
import { useChannel } from "../../../store/useChannel";
import { Link, useLocation } from "react-router-dom";
import { useMessage } from "../../../store/useMessage";

import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Channel = () => {
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
      supabase
        .from(`message:channel_id=eq.${currentChannel}`)
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
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{ marginBottom: "10px" }}
        >
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
                    onClick={(event) => {
                      handleListItemClick(event, key + 2);
                    }}
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
