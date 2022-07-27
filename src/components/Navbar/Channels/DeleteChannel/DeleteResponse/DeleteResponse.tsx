import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useChannel } from "../../../../../store/useChannel";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Success response
export const DeleteSuccess = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    // ifDeleted(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Link to={"/"} style={{ textDecoration: "none", color: "#90caf9" }}>
        <Button onClick={handleClick}>Delete</Button>
      </Link>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Channel Deleted.
        </Alert>
      </Snackbar>
    </Stack>
  );
};

// Error response
export const DeleteError = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button onClick={handleClick}>Delete</Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Only the creator can delete this channel.
        </Alert>
      </Snackbar>
    </Stack>
  );
};
