import { Settings } from "../features/settings/UpdateSettingsForm";
import supabase from "./supabase";

class SettingsService {
  public async getSettings() {
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

  // We expect a newSetting object that looks like {setting: newValue}
  public async updateSetting(newSetting: Settings) {
    const { data, error } = await supabase
      .from("settings")
      .update(newSetting)
      // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Settings could not be updated");
    }
    return data;
  }
}

const settingsService = new SettingsService();
export default settingsService;
