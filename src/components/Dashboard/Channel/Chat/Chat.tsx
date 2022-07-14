import { Box, Button, List, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabaseClient";
import SendIcon from "@mui/icons-material/Send";
import { useChannel } from "../../../../store/useChannel";
import { useAuth } from "../../../../store/useAuth";
import { useMessage } from "../../../../store/useMessage";

const Chat = () => {
  const [singleMessage, setSingleMessage] = useState<string>();
  const [id, setId] = useState<string>();
  const { session } = useAuth();
  const { currentChannel } = useChannel();
  const { message, setMessages, addMessage } = useMessage();

  useEffect(() => {
    setId(session!.user?.id);
  }, []);

  console.log(currentChannel);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("message")
        .select()
        .match({ channel_id: currentChannel });
      if (message.length === 0) {
        setMessages(data);
      }
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    const { data } = await supabase
      .from("message")
      .insert([
        { user_id: id, channel_id: currentChannel, message: singleMessage },
      ]);
    addMessage(data![0]);
    console.log(data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <>
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
            if (m.channel_id === currentChannel) {
              return <List key={m.id}>{m.message}</List>;
            }
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
