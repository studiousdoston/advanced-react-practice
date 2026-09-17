/* eslint-disable @typescript-eslint/no-unused-vars */
import { T } from "../libs/common.type";
import supabase from "./supabase";

class AuthService {
  async login({ email, password }: T) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    return data;
  }
}

const authService = new AuthService();
export default authService;
    