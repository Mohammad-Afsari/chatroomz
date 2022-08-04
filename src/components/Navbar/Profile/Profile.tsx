import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";
import { useAuth } from "../../../store/useAuth";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { useProfile } from "../../../services/useProfile";
import { queryClient } from "../../../App";

const Profile = () => {
  const { session } = useAuth();
  const [avatarImage, setAvatarImage] = useState<any>();
  const { data, error } = useProfile();
  const [avatarURL, setAvatarURL] = useState<string>();

  // If there's an image, update the profile card
  useEffect(() => {
    const fetchProfileAvatar = async () => {
      const { data } = await supabase.from("profile");
      data?.map((prof: any) => {
        if (session?.user?.id === prof.id) {
          setAvatarImage(prof.avatar_url);
        }
      });
    };
    fetchProfileAvatar();
    queryClient.resetQueries(["userData"]);
    queryClient.resetQueries(["messageData"]);
  }, [avatarURL]);

  // Update / Upload avatar to storage
  const handleAvatar = async (e: any) => {
    const avatarFile = e.target.files[0];

    const { data } = await supabase.storage
      .from("avatars")
      // was previously update
      .upload(`${session?.user?.id}.jpg`, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });
    if (data) {
      // setAvatarURL(data?.Key.slice(8, 44));
      setAvatarURL(data?.Key.slice(8, 44));
    }

    queryClient.resetQueries(["userData"]);
    queryClient.resetQueries(["messageData"]);
  };

  // Once the avatar has been uploaded to storage, get the public url and save it to local state
  useEffect(() => {
    if (avatarURL) {
      const fetchAvatarImage = async () => {
        const { publicURL } = await supabase.storage
          .from("avatars")
          .getPublicUrl(`${avatarURL}.jpg`);
        if (publicURL) {
          setAvatarImage(publicURL);
        }
      };
      fetchAvatarImage();
    }
  }, [avatarURL]);

  // From storage, update the profile table
  useEffect(() => {
    if (avatarURL && avatarImage) {
      const updateProfileAvatar = async () => {
        await supabase
          .from("profile")
          .update({ avatar_url: avatarImage })
          .match({ id: avatarURL });
      };
      updateProfileAvatar();
    }
  }, [avatarImage, avatarURL]);

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
                    src={data?.avatar_url + "?" + Date.now()}
                    sx={{ height: 50, width: 50 }}
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatar}
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
                {data && data.username}
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
