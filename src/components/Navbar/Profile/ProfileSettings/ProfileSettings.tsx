import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { signOut } from "../../../../services/auth";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../store/useTitle";
import { useEffect } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { useChannel } from "../../../../store/useChannel";

const ProfileSettings = () => {
  const { setChannelTitle, setChannelDescription } = useTitle();
  const { currentChannel, channel, setCurrentChannel } = useChannel();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(currentChannel);
  useEffect(() => {
    const getChannelInfo = async () => {
      const { data } = await supabase
        .from("channel")
        .select()
        .match({ id: currentChannel });
      setChannelTitle(data![0].channel_name);
      setChannelDescription(data![0].channel_desc);
    };
    if (currentChannel) {
      getChannelInfo();
    }
  }, [currentChannel]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    setChannelTitle("Home");
    setChannelDescription("");
    setCurrentChannel("");
  };

  const handleSignOut = async () => {
    setChannelTitle("Home");
    setChannelDescription("");
    setCurrentChannel("");
    await signOut();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ minWidth: "0px", maxWidth: "25px" }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleNavigate}
          >
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileSettings;
