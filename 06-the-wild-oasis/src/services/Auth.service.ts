/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignUp, T, UpdateUser } from "../libs/common.type";
import supabase, { supabaseUrl } from "./supabase";

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

  //* -------- LOGOUT --------
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  //* -------- GET_CURRENT_USER --------
  async getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    return data?.user;
  }

  //* -------- UPDATE_CURRENT_USER --------
  async updateCurrentUser({ password, fullName, avatar }: UpdateUser) {
    // 1 Update password OR fullName
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };
    const { data, error } = await supabase.auth.updateUser(updateData!);
    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2. Upload the avatar image
    const fileName = `avatar=${data.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
      {
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
      },
    );
    if (error2) throw new Error(error2.message);

    return updatedUser;
  }
}

const authService = new AuthService();
export default authService;
