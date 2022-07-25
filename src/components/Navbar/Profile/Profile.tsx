import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import Image from "../../../imgs/loginbg.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";
import { useAuth } from "../../../store/useAuth";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { session } = useAuth();
  const [username, setUsername] = useState<string>();
  const [avatarImage, setAvatarImage] = useState<string>();

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profile")
      .select("*")
      .match({ id: session?.user?.id })
      .single();
    return data;
  };

  // Using React-Query
  const { data, isLoading, error } = useQuery<any>(["userData"], () =>
    fetchUsers()
  );

  useEffect(() => {
    // console.log(avatarImage);
  }, [avatarImage]);

  useEffect(() => {
    const uploadAvatar = async () => {
      const { data, error } = await supabase.storage.getBucket("avatars");

      // console.log(data);
    };
    // uploadAvatar();
  }, []);

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
  console.log(data);

  if (error) return <p>'An error has occursed'</p>;

  return (
    <>
      <Paper sx={{ height: "80px", width: "90%", margin: "20px auto" }}>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            height: "100%",
            justifyContent: "left",
          }}
        >
          <Grid
            container
            spacing={0}
            sx={{
              alignItems: "center",
            }}
          >
            <Grid item xs={4}>
              {" "}
              <Typography component="span">
                <Button
                  variant="text"
                  component="label"
                  sx={{ maxWidth: "50px", marginLeft: "5px" }}
                >
                  <Avatar
                    variant="rounded"
                    //   src={Image}
                    sx={{ height: 50, width: 50 }}
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      setAvatarImage(e.target.value);
                    }}
                  ></input>
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Typography
                variant="h6"
                sx={{ paddingLeft: "10px", height: "25px" }}
                component="span"
              >
                {/* {username} */}
                {data && data.username}
                {/* donkey */}
              </Typography>
              <Typography sx={{ paddingLeft: "10px" }}>
                <CircleIcon
                  sx={{
                    fontSize: "10px",
                    color: "green",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    paddingLeft: "5px",
                  }}
                >
                  Active
                </span>
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <ProfileSettings />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Profile;
