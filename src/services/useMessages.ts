import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useChannel } from "../store/useChannel";
import { useMessage } from "../store/useMessage";
import { supabase } from "./supabaseClient";

const useMessages = () => {
  const { channel, currentChannel } = useChannel();
  const { message, setMessages } = useMessage();
  const { roomId } = useParams();

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("message")
      .select("*, profile (username)")
      .match({ channel_id: roomId })
      .order("message_sent_at", { ascending: true });
    if (data) {
      setMessages(data);
    }
    return data;
  };

  return useQuery<any>(["messageData", channel, message], fetchMessages, {
    keepPreviousData: true,
  });
};

export default useMessages;
