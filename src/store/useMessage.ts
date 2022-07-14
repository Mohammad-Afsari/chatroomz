import create from "zustand";

export const useMessage = create<any>()((set) => ({
  message: [],
  setMessages: (message: any[]) => {
    return set((state: any) => ({ message: message }));
  },
  addMessage: (message: string) => {
    return set((state: any) => ({ message: [...state.message, message] }));
  },
  clearMessages: () => set(() => ({ message: [""] })),
}));
