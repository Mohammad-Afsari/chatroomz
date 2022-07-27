import create from "zustand";

export const useTitle = create<any>()((set) => ({
  channelTitle: "",
  setChannelTitle: (channelTitle: string) => {
    return set((state: any) => ({ channelTitle: channelTitle }));
  },
  channelDescription: "",
  setChannelDescription: (channelDescription: string) => {
    return set((state: any) => ({ channelDescription: channelDescription }));
  },
}));
