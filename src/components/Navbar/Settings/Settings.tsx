import { Box, Button, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";

const Settings = () => {
  return (
    <Box sx={{ width: "90%", marginTop: "20px", paddingLeft: "10px" }}>
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
  );
};

export default Settings;
