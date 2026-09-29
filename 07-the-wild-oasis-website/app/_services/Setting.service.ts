import { supabase } from "./supabase";

class SettingsService {
  async getSettings() {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("Settings could not be loaded");
    }

    return data;
  }
}

export default new SettingsService();
