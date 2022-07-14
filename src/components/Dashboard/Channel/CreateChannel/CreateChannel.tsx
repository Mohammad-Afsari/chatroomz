import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabaseClient";
import { useAuth } from "../../../../store/useAuth";
import { useChannel } from "../../../../store/useChannel";

const CreateChannel = () => {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState<string>();
  const [channelDesc, setChannelDesc] = useState<string>();
  const [id, setId] = useState<string>();
  const { addChannel } = useChannel();

  useEffect(() => {
    setId(session?.user?.id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createChannel = async () => {
    const { data } = await supabase.from("channel").insert([
      {
        channel_name: channelName,
        channel_desc: channelDesc,
        creator_id: id,
      },
    ]);
    addChannel(data![0]);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Channel
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a unique channel name and description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="channelName"
            label="Channel Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Channel Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createChannel}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
