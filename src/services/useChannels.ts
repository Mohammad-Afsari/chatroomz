import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";
import { useParams } from "react-router-dom";
import { useChannel } from "../store/useChannel";

export const useChannels = () => {
  const { roomId } = useParams();
  const roomIdAddon = roomId ? roomId : "home";
  const { channel } = useChannel();

  const fetchChannels = async () => {
    const { data } = await supabase
      .from("channel")
      .select()
      .order("created_at", { ascending: true });
    return data;
  };

  return useQuery<any>(["channelData", roomIdAddon, channel], fetchChannels, {
    keepPreviousData: true,
  });
};
