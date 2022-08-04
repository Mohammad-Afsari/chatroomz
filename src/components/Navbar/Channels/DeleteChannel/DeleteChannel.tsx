import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useChannel } from "../../../../store/useChannel";
import { supabase } from "../../../../services/supabaseClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../store/useAuth";
import { DeleteSuccess, DeleteError } from "./DeleteResponse/DeleteResponse";
import { Typography } from "@mui/material";
import { useTitle } from "../../../../store/useTitle";

const DeleteChannel = () => {
  const [open, setOpen] = useState(false);
  const { currentChannel, setCurrentChannel } = useChannel();
  const [ifDeleteValid, setIfDeleteValid] = useState<boolean>(false);
  const { session } = useAuth();
  const [channelCreator, setChannelCreator] = useState<string>();
  const { roomId } = useParams();
  const { setChannelTitle, setChannelDescription } = useTitle();

  // Temporarily put in to resolve UI feedback on form issue
  useEffect(() => {
    const fetchChannelCreator = async () => {
      const { data } = await supabase.from("channel").select();
      data?.map((chan: any) => {
        if (chan.id === roomId) {
          setChannelCreator(chan.creator_id);
        }
      });
    };
    fetchChannelCreator();
  }, [roomId]);

  useEffect(() => {
    if (channelCreator) {
      if (channelCreator === session?.user?.id) {
        setIfDeleteValid(true);
      } else {
        setIfDeleteValid(false);
      }
    }
  }, [roomId, channelCreator, session?.user?.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (channelCreator === session?.user?.id) {
      console.log("valid");

      const deleteChannel = async () => {
        await supabase
          .from("channel")
          .delete()
          .match({ id: currentChannel, creator_id: session?.user?.id });
        setOpen(false);
      };

      const deleteMessages = async () => {
        await supabase
          .from("message")
          .delete()
          .match({ channel_id: currentChannel });
      };

      deleteChannel();
      deleteMessages();
      setChannelTitle("Home");
      setChannelDescription("");
      setCurrentChannel("");
      // fetchNewChannels();
    } else {
      setIfDeleteValid(false);
    }
  };

  return (
    <div>
      <Button
        sx={{ minWidth: "0px", maxWidth: "25px" }}
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#90caf9" }}>
          Are you sure you want to delete this channel?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This channel will be deleted immediately. You can't undo this
            action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Typography onClick={handleDelete} component="span">
            {ifDeleteValid && <DeleteSuccess />}
            {!ifDeleteValid && <DeleteError />}
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteChannel;
