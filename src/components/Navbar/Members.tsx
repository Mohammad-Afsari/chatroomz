import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import Avatar from "@mui/material/Avatar";
import {
  Divider,
  Grid,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useChannels } from "../../services/useChannels";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const { data } = useChannels();
  const { roomId } = useParams();
  const [channelTitle, setChannelTitle] = useState<string>();
  const [channelDescription, setChannelDescription] = useState<string>();
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase
        .from("profile")
        .select()
        .order("created_at", { ascending: true });
      if (data) {
        setMembers(data);
      }
    };
    fetchMembers();
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      data?.map((chan: any) => {
        if (chan.id === roomId) {
          setChannelTitle(chan.channel_name);
          setChannelDescription(chan.channel_desc);
        }
      });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {" "}
      <Typography
        variant="h6"
        sx={{
          color: "#90caf9",
          width: "80%",
          margin: "0 auto",
          marginTop: "20px",
          paddingLeft: "10px",
        }}
      >
        {channelTitle && channelTitle}
      </Typography>
      <Typography
        // variant="h6"
        sx={{
          width: "80%",
          margin: "0 auto",
          marginBottom: "20px",
          fontSize: "16px",
          paddingLeft: "10px",
        }}
      >
        {channelDescription && channelDescription}
      </Typography>
      <Typography component="div" sx={{ width: "80%", margin: "0 auto" }}>
        <Divider />
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#90caf9",
          width: "80%",
          margin: "0 auto",
          marginTop: "20px",
          fontSize: "16px",
          paddingLeft: "10px",
        }}
      >
        Members:
      </Typography>
      <List>
        {members?.map((text: any, index: number) => (
          <Paper
            sx={{
              width: "75%",
              margin: "0 auto",
              marginTop: "10px",
              height: "40px",
              textAlign: "center",
              display: "flex",
            }}
            key={index}
          >
            <Grid container sx={{ alignItems: "center" }}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={text.avatar_url}
                sx={{ textAlign: "left" }}
              />
              <ListItemText
                primary={text.username}
                sx={{
                  textAlign: "left",
                  paddingLeft: "20px",
                  maxWidth: "120px",
                }}
              />
            </Grid>
          </Paper>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <GroupIcon
              sx={{ fontSize: "20px", color: "#90caf9", marginRight: "10px" }}
            />{" "}
            Channel Info
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
