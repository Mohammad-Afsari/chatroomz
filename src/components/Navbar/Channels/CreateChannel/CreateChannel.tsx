import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { useAuth } from "../../../../store/useAuth";
import { useChannel } from "../../../../store/useChannel";
import { Box } from "@mui/material";

const CreateChannel = () => {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState<string>();
  const [channelDesc, setChannelDesc] = useState<string>();
  const [id, setId] = useState<string>();
  const { addChannel } = useChannel();
  const formRef = useRef<any>();
  const [isChannelNameInvalid, setIsChannelNameInvalid] =
    useState<boolean>(false);
  const [isChannelDescInvalid, setIsChannelDescInvalid] =
    useState<boolean>(false);

  useEffect(() => {
    setId(session?.user?.id);
  }, []);

  useEffect(() => {
    if (channelName) {
      if (channelName!.length >= 12) {
        setIsChannelNameInvalid(true);
      } else {
        setIsChannelNameInvalid(false);
      }

      if (channelDesc) {
        if (channelDesc!.length >= 20) {
          setIsChannelDescInvalid(true);
        } else {
          setIsChannelDescInvalid(false);
        }
      }
    }
  }, [channelName, channelDesc]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createChannel = async () => {
    if (formRef.current.reportValidity()) {
      const { data } = await supabase.from("channel").insert([
        {
          channel_name: channelName,
          channel_desc: channelDesc,
          creator_id: id,
        },
      ]);
      addChannel(data![0]);
      setOpen(false);
    } else {
      formRef.current.reportValidity();
    }

    console.log(formRef.current.reportValidity());
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Channel
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" ref={formRef}>
          {" "}
          <DialogTitle>Create Channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a unique channel name and description.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="channelName"
              label="Channel Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setChannelName(e.target.value)}
              inputProps={{ maxLength: 12 }}
              error={isChannelNameInvalid}
              helperText={isChannelNameInvalid && "Max: 12 characters."}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="description"
              label="Channel Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setChannelDesc(e.target.value)}
              inputProps={{ maxLength: 50 }}
              error={isChannelDescInvalid}
              helperText={isChannelDescInvalid && "Max: 50 characters."}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createChannel}>Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
