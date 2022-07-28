import { useQuery } from "@tanstack/react-query";
import { useChannel } from "../store/useChannel";
import { useMessage } from "../store/useMessage";
import { supabase } from "./supabaseClient";

const useMessages = () => {
  const { channel, currentChannel } = useChannel();
  const { message, setMessages } = useMessage();

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("message")
      .select("*, profile (username)")
      .match({ channel_id: currentChannel })
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
