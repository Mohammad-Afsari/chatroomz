import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";
import { useAuth } from "../../../store/useAuth";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { useProfile } from "../../../services/useProfile";

const Profile = () => {
  const { session } = useAuth();
  const [avatarImage, setAvatarImage] = useState<string>();
  const { data, error } = useProfile();

  useEffect(() => {
    // console.log(avatarImage);
  }, [avatarImage]);

  const handleAvatar = async (e: any) => {
    const avatarFile = e.target.files[0];
    console.log(avatarFile);
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${session?.user?.id}.jpg`, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data);
  };

  useEffect(() => {
    const uploadAvatar = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(`${session?.user?.id}.jpg`);
      console.log(data?.publicURL);
      setAvatarImage(data?.publicURL);
    };
    uploadAvatar();
  }, []);

  // useEffect(() => {
  //   const uploadAvatar = async () => {
  //     const { data, error } = await supabase.storage.from("avatars").list();
  //     console.log(data);
  //     return data;
  //   };
  //   uploadAvatar();
  // }, [avatarImage]);

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
                    src={avatarImage}
                    sx={{ height: 50, width: 50 }}
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    // onChange={(e) => {
                    // console.log(e.target.value);
                    // setAvatarUrl(e.target.value);
                    // setAvatarImage(e.target.value);
                    // }}
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
