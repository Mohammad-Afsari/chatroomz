import { Box, Button, Typography } from "@mui/material";
import Members from "../Members";

const Settings = () => {
  return (
    <Box sx={{ width: "90%", marginTop: "20px", paddingLeft: "10px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        <Members />
      </Typography>
    </Box>
  );
};

export default Settings;
