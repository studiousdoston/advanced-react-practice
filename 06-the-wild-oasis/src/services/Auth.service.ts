/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignUp, T } from "../libs/common.type";
import supabase from "./supabase";

class AuthService {
  //* -------- SIGNUP --------
  async signup({ fullName, email, password }: SignUp) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          avatar: "",
        },
      },
    });
    if (error) throw new Error(error.message);

    return data;
  }

  //* -------- LOGIN --------
  async login({ email, password }: T) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    return data;
  }

  //* -------- GET_CURRENT_USER --------
  async getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
  }

  //* -------- LOGOUT --------
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }
}

const authService = new AuthService();
export default authService;
