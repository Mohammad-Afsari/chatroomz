import { supabase } from "../services/supabaseClient";
import { Session } from "@supabase/supabase-js";
import create from "zustand";

const getChannels = async () => {
  const { data, error } = await supabase.from("channel").select("*");
};

export const useChannel = create<any>()((set) => ({
  channel: [],
  setChannels: (channel: any[]) => {
    return set((state: any) => ({ channel: channel }));
  },
  addChannel: (channel: string) => {
    console.log(channel);
    return set((state: any) => ({ channel: [...state.channel, channel] }));
  },
  clearChannel: () => set(() => ({ channel: [""] })),
}));
