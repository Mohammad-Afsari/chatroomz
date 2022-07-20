import {
  Box,
  Button,
  Grid,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import SendIcon from "@mui/icons-material/Send";
import { useChannel } from "../../../store/useChannel";
import { useAuth } from "../../../store/useAuth";
import { useMessage } from "../../../store/useMessage";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import DeleteIcon from "@mui/icons-material/Delete";

const Chat = () => {
  const [singleMessage, setSingleMessage] = useState<string>();
  const [id, setId] = useState<string>();
  const [channelName, setChannelName] = useState<string>();
  const [channelDesc, setChannelDesc] = useState<string>();
  const { session } = useAuth();
  const { currentChannel } = useChannel();
  const { message, setMessages, addMessage } = useMessage();

  console.log(currentChannel);

  // no longer req
  const [value, setValue] = useState<string>();

  // Get user Id
  useEffect(() => {
    setId(session!.user?.id);
  }, []);

  // Get Channel name on click
  useEffect(() => {
    const getChannelName = async () => {
      const { data } = await supabase
        .from("channel")
        .select()
        .match({ id: currentChannel });
      setChannelName(data![0].channel_name);
      setChannelDesc(data![0].channel_desc);
    };
    if (currentChannel) {
      getChannelName();
    }
  }, [currentChannel]);

  // Set messages to global store after fetching from supabase
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("message")
        .select("*, profile (username)")
        // .select()
        .match({ channel_id: currentChannel });
      setMessages(data);

      console.log(message);
      //   console.log(message);
    };
    if (currentChannel) {
      fetchMessages();
    }
  }, [currentChannel]); // message was in here hence why we cant see the message instand anymore, also, before the console.log(data ) wasnt here and now it's re-rendering multiple times

  const sendMessage = async () => {
    const { data } = await supabase
      .from("message")
      .insert([
        { user_id: id, channel_id: currentChannel, message: singleMessage },
      ]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setValue("");
  };

  const handleDelete = () => {
    console.log("hey");
  };

  return (
    <>
      {/* <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          width: "95%",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "rgba(144, 202, 249, 0.16)",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Grid item xs={6}>
            <Typography
              variant="h6"
              sx={{
                color: "#90caf9",
              }}
            >
              # {channelName}
              <Typography paragraph>{channelDesc}</Typography>
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              justifyContent: "flex-end",
              textAlign: "right",
              marginRight: 3,
            }}
            onClick={handleDelete}
          >
            <Button
              sx={{ cursor: "pointer", minWidth: "0px", maxWidth: "25px" }}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Paper>
      </Grid> */}
      {
        <Paper
          sx={{
            // maxHeight: 700,
            height: "80vh",
            overflow: "auto",
            width: "100%",
            margin: "0 auto",
            marginTop: "10px",
          }}
        >
          <List sx={{ width: "100%" }}>
            {/* <ListItem sx={{ height: "57vh" }}></ListItem> */}
            {message?.map((m: any) => {
              //   console.log(message);
              let date = new Date(m.message_sent_at).toISOString();
              let messageSent =
                date.substring(11, 16) +
                " " +
                date.substring(8, 10) +
                "/" +
                date.substring(5, 7) +
                "/" +
                date.substring(0, 4);
              return (
                <List key={m.id} sx={{ width: "100%" }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonPinIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Grid container spacing={0} direction="column">
                      <Grid item xs={10} sx={{ fontSize: "12px" }}>
                        {/* {m.profile.username} */}
                        {messageSent}
                      </Grid>
                      <Grid item xs={2} sx={{ fontSize: "16px" }}>
                        {m.message}
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              );
            })}
          </List>
        </Paper>
      }
      <Box sx={{ display: "flex" }} component="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter your Message"
          //   value={value}
          sx={{
            margin: "0 auto",
            // marginTop: "20px",
            width: "100%",
            // position: "fixed",
          }}
          onChange={(e) => {
            setSingleMessage(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <Button type="submit" onClick={sendMessage}>
                <SendIcon />
              </Button>
            ),
          }}
        ></TextField>
      </Box>
    </>
  );
};

export default Chat;
