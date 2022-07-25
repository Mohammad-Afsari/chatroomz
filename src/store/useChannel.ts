import create from "zustand";

export const useChannel = create<any>()((set) => ({
  channel: [],
  setChannels: (channel: any[]) => {
    return set((state: any) => ({ channel: channel }));
  },
  addChannel: (channel: string) => {
    return set((state: any) => ({ channel: [...state.channel, channel] }));
  },
  currentChannel: "",
  setCurrentChannel: (currentChannel: string) => {
    return set((state: any) => ({ currentChannel: currentChannel }));
  },
  clearChannel: () => set(() => ({ channel: [""] })),
  ifDeleted: "", // need to think about
}));
