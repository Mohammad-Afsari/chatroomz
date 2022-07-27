import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { supabase } from "../../../services/supabaseClient";
import { useEffect, useState } from "react";
import CreateChannel from "./CreateChannel/CreateChannel";
import { useChannel } from "../../../store/useChannel";
import { Link, useLocation, useParams } from "react-router-dom";
import { useMessage } from "../../../store/useMessage";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useChannels } from "../../../services/useChannels";

const Channel = () => {
  const { addMessage } = useMessage();
  const { roomId } = useParams();
  const { data } = useChannels();
  const { currentChannel, setChannels, setCurrentChannel } = useChannel();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const getChannels = async () => {
      const { data } = await supabase.from("channel").select();
      setChannels(data);
    };
    getChannels();
  }, [roomId]);

  console.log(data);

  useEffect(() => {
    setCurrentChannel(roomId);
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
      <Box
        sx={{
          width: "90%",
          paddingLeft: "20px",
          height: "50vh",
          overflow: "auto",
        }}
      >
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{ marginBottom: "10px" }}
        >
          {/* {ifChosen &&} */}
          {data &&
            data?.map((chan: any, key: number) => {
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
      </Box>
      <Box sx={{ paddingLeft: "20px", marginTop: "30px" }}>
        <CreateChannel />
        <Divider sx={{ marginTop: "30px" }} />
      </Box>
    </>
  );
};

export default Channel;
