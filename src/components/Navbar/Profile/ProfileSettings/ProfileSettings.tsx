import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { signOut } from "../../../../services/auth";

const ProfileSettings = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
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
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileSettings;

{
  /* <Box sx={{ width: "90%", marginTop: "20px", paddingLeft: "20px" }}>
<Typography sx={{ paddingBottom: "20px" }} variant="h6">
  # Channels
</Typography>
<Stack spacing={2}>
  {channel?.map((chan: any) => {
    return (
      <Link
        to={"/" + chan.id}
        style={{ textDecoration: "none" }}
        key={chan.id}
        onClick={() => setCurrentChannel(chan.id)}
      >
        <Item key={chan.id}>{chan.channel_name}</Item>
      </Link>
    );
  })}
</Stack>
<Box sx={{ marginTop: "20px" }}></Box>
<CreateChannel />
</Box> */
}
