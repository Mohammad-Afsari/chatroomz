import { Box, Button, List, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabaseClient";
import SendIcon from "@mui/icons-material/Send";
import { useChannel } from "../../../../store/useChannel";
import { useAuth } from "../../../../store/useAuth";
import { useMessage } from "../../../../store/useMessage";

const Chat = () => {
  const [singleMessage, setSingleMessage] = useState<string>();
  const [id, setId] = useState<string>();
  const [channelName, setChannelName] = useState<string>();
  const { session } = useAuth();
  const { currentChannel } = useChannel();
  const { message, setMessages, addMessage } = useMessage();

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
        .select()
        .match({ channel_id: currentChannel });
      setMessages(data);
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
    // addMessage(singleMessage);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Typography variant="h6" component="span">
        # {channelName}
      </Typography>
      {
        <Paper
          sx={{
            maxHeight: 700,
            overflow: "auto",
            width: "100%",
            // margin: "0px auto",
            // backgroundColor: "red",
          }}
        >
          {message?.map((m: any) => {
            // if (m.channel_id === currentChannel) {
            return <List key={m.id}>{m.message}</List>;
            // }
          })}
        </Paper>
      }
      <Box sx={{ display: "flex" }} component="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Enter your Message"
          sx={{ marginTop: "40px", width: "95%" }}
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
