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
import DeleteIcon from "@mui/icons-material/Delete";
import useMessages from "../../../services/useMessages";

const Chat = () => {
  const [singleMessage, setSingleMessage] = useState<string>();
  const [id, setId] = useState<string>();
  const [channelName, setChannelName] = useState<string>();
  const [channelDesc, setChannelDesc] = useState<string>();
  const { session } = useAuth();
  const { currentChannel } = useChannel();
  const { setMessages } = useMessage();
  const { data } = useMessages();
  const scrollRef = React.useRef<any>(null);
  const [avatarImage, setAvatarImage] = useState<string>();
  const [avatars, setAvatars] = useState<any>();

  const runScroll = () =>
    scrollRef!.current!.scrollIntoView({ behaviour: "smooth" });

  // no longer req
  const [value, setValue] = useState<string>();

  // Get user Id
  useEffect(() => {
    setId(session!.user?.id);
  }, []);

  // Get Channel name on click
  useEffect(() => {
    if (data & currentChannel) {
      setChannelName(data![0].channel_name);
      setChannelDesc(data![0].channel_desc);
    }
  }, [channelName, currentChannel]);

  // Set messages to global store after fetching from supabase
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("message")
        .select("*, profile (username)")
        .match({ channel_id: currentChannel });
      setMessages(data);
    };
    if (currentChannel) {
      fetchMessages();
    }
  }, [currentChannel]);

  const sendMessage = async () => {
    await supabase
      .from("message")
      .insert([
        { user_id: id, channel_id: currentChannel, message: singleMessage },
      ]);

    setTimeout(() => {
      runScroll();
    }, 1000);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  // Fetch all avatars
  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.storage.from("avatars").list();

      console.log(data![1].name);

      const { publicURL } = await supabase.storage
        .from("avatars")
        .getPublicUrl(`${data![1].name}`);
      console.log(publicURL);
      // setAvatars(data);
    };
    fetchAvatars();
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(`${session?.user?.id}.jpg`);
      console.log(data);
      setAvatarImage(data?.publicURL);
    };
    fetchAvatar();
  }, []);

  return (
    <>
      {
        <Paper
          sx={{
            // maxHeight: 700,
            height: "80vh",
            flexFlow: "column",
            overflow: "auto",
            width: "100%",
            margin: "0 auto",
            marginTop: "10px",
          }}
          // ref={scrollRef}
        >
          <List sx={{ height: "87%" }}></List>
          <List sx={{ width: "100%" }}>
            {data?.map((m: any) => {
              // console.log(m);
              let date = new Date(m.message_sent_at).toISOString();
              let messageTimeSent =
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
                      {avatars?.map((a: any) => {
                        // console.log(a);
                        // if (m.user_id === a.name) {
                        // }
                      })}
                      {/* <Avatar variant="rounded" src={avatarImage} /> */}
                    </ListItemAvatar>
                    <Grid container spacing={0} direction="column">
                      <Grid item xs={10} sx={{}}>
                        {data && m.profile.username + " "}
                        <Typography
                          component="span"
                          sx={{ fontSize: "10px", color: "#828784" }}
                        >
                          {data && messageTimeSent}
                        </Typography>
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
          <List ref={scrollRef}></List>
        </Paper>
      }
      <Box sx={{ display: "flex" }} component="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter your Message"
          //   value={value}
          sx={{
            margin: "0 auto",
            marginTop: "20px",
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