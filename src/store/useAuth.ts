import { supabase } from "../services/supabaseClient";
import { Session } from "@supabase/supabase-js";
import create from "zustand";

interface AuthState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useAuth = create<AuthState>()((set) => ({
  session: supabase.auth.session(),
  setSession: (session: Session | null) => set({ session }),
}));
