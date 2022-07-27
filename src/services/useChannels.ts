import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";
import { useParams } from "react-router-dom";
import { useChannel } from "../store/useChannel";

export const useChannels = () => {
  const { roomId } = useParams();
  const roomIdTest = roomId ? roomId : "home";
  const { channel } = useChannel();

  console.log(channel);
  const fetchChannels = async () => {
    const { data } = await supabase.from("channel").select();
    return data;
  };

  return useQuery<any>(["channelData", roomIdTest, channel], fetchChannels, {
    enabled: !!roomIdTest,
  });
};
