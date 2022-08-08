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
import useMessages from "../../../services/useMessages";

const Chat = () => {
  const [singleMessage, setSingleMessage] = useState<string>();
  const [id, setId] = useState<string>();
  const [channelName, setChannelName] = useState<string>();
  const [channelDesc, setChannelDesc] = useState<string>();
  const [value, setValue] = useState<string | undefined>("");
  const { session } = useAuth();
  const { currentChannel } = useChannel();
  const { setMessages } = useMessage();
  const { data } = useMessages();
  const scrollRef = React.useRef<any>(null);

  const runScroll = () =>
    scrollRef!.current!.scrollIntoView({ behaviour: "smooth" });

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

  useEffect(() => {
    setTimeout(() => {
      runScroll();
    }, 500);
  }, [currentChannel, session?.user?.id]);

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
    setValue("");
  };

  return (
    <>
      {
        <Paper
          sx={{
            height: [
              "calc(81vh - 48px)", // xs 0px
              "calc(85vh - 48px)", // sm 600px
              "calc(80vh - 48px)", // md 900px
              "calc(82vh - 48px)", // lg 1200px
              "calc(85vh - 48px)", // xl 1536px
            ],
            flexFlow: "column",
            overflow: "auto",
            width: "100%",
            margin: "0 auto",
            marginTop: "7px",
          }}
        >
          <List sx={{ height: "87%" }}></List>
          <List sx={{ width: "100%" }}>
            {data?.map((m: any) => {
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
                      {data && (
                        <Avatar
                          variant="rounded"
                          src={m.profile.avatar_url + "?" + Date.now()}
                        />
                      )}
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
          value={value}
          sx={{
            margin: "0 auto",
            marginTop: "20px",
            width: "100%",
          }}
          onChange={(e) => {
            setSingleMessage(e.target.value);
            setValue(e.target.value);
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
