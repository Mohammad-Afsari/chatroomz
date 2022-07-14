import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { supabase } from "../../../services/supabaseClient";
import { useAuth } from "../../../store/useAuth";
import { useEffect, useState } from "react";
import CreateChannel from "./CreateChannel/CreateChannel";
import { useChannel } from "../../../store/useChannel";
import { Link, useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Channel = () => {
  const { session } = useAuth();
  const [username, setUsername] = useState<string>();
  const [activeChannel, setActiveChannel] = useState<string>();
  const location = useLocation();

  // Global store
  const { channel, setChannels, setCurrentChannel } = useChannel();

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
    setCurrentChannel(activeChannel);
  }, [activeChannel, setCurrentChannel]);

  useEffect(() => {
    setCurrentChannel(location.pathname.slice(1, location.pathname.length));
  }, [setCurrentChannel, location]);

  return (
    <>
      <Box sx={{ width: "90%", marginTop: "20px" }}>
        <Paper sx={{ height: "80px" }}>
          <Box
            sx={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{username}</Typography>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: "90%", marginTop: "20px" }}>
        {/* Make this a box with a direction of row + put this in for  */}
        <Typography variant="h6">
          <Button variant="text" sx={{ marginBottom: "14px" }}>
            <GroupIcon sx={{ fontSize: "20px", color: "#90caf9" }} />
            <span style={{ paddingLeft: "10px" }}>Members</span>
          </Button>
        </Typography>
        <Typography>
          <Button variant="text" sx={{ marginBottom: "14px" }}>
            <SettingsIcon sx={{ fontSize: "20px", color: "#90caf9" }} />
            <span style={{ paddingLeft: "10px" }}>Settings</span>
          </Button>
        </Typography>
      </Box>

      <Box sx={{ width: "90%", marginTop: "20px" }}>
        <Typography sx={{ paddingBottom: "20px", textDecoration: "underline" }}>
          Channels
        </Typography>
        <Stack spacing={2}>
          {channel?.map((chan: any) => {
            return (
              <Link
                to={"/" + chan.id}
                style={{ textDecoration: "none" }}
                key={chan.id}
                onClick={() => setActiveChannel(chan.id)}
              >
                <Item key={chan.id}>{chan.channel_name}</Item>
              </Link>
            );
          })}
        </Stack>
        <Box sx={{ marginTop: "20px" }}></Box>
        <CreateChannel />
      </Box>
    </>
  );
};

export default Channel;
