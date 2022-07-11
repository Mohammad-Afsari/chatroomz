import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import Image from "../../../imgs/loginbg.jpg";
import SettingsIcon from "@mui/icons-material/Settings";
import { supabase } from "../../../services/supabaseClient";
import { useAuth } from "../../../store/useAuth";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Channel = () => {
  const { session } = useAuth();
  const [username, setUsername] = useState<any>();

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

  const createChannel = async () => {
    const { data, error } = await supabase.from("channel").insert([
      {
        channel_name: "Mohs channel",
        channel_desc: "Front end devs",
        creator_id: "f278ff1e-3cb3-4daf-bb35-1a72a01e9f99",
      },
    ]);
  };

  const getChannel = async () => {
    const { data, error } = await supabase.from("channel").select();
    console.log(data);
  };

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
          <Item>Channel 1</Item>
          <Item>Channel 2</Item>
          <Item>Channel 3</Item>
        </Stack>
        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={createChannel}
        >
          Create Channel
        </Button>
        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={getChannel}
        >
          Display channels
        </Button>
      </Box>
    </>
  );
};

export default Channel;
