import { supabase } from "./supabaseClient";

export const signIn = async ({
  email,
  password,
}: {
  email: any;
  password: any;
}) => {
  const { error } = await supabase.auth.signIn({ email, password });

  if (error) {
    throw Error(error.message);
  }
};

export const signUp = async ({
  email,
  password,
}: {
  email: any;
  password: any;
}) => {
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw Error(error.message);
  }
};
