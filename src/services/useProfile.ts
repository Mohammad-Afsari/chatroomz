import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";
import { useAuth } from "../store/useAuth";

export const useProfile = () => {
  const { session } = useAuth();

  const fetchUser = async () => {
    const { data } = await supabase
      .from("profile")
      .select()
      .match({ id: session?.user?.id })
      .single();
    return data;
  };

  return useQuery<any>(["userData", session?.user?.id], fetchUser, {
    enabled: !!session,
  });
};
