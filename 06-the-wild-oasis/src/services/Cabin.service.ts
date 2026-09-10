import { CabinData } from "../features/cabins/CabinTable";
import supabase, { supabaseUrl } from "./supabase";

class CabinService {
  async createCabin(newCabin: CabinData) {
    const imageName = `${Math.random()}-${newCabin.name}`.replace(/\//g, "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create Cabin
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select();
    if (error) {
      console.log(error);
      throw new Error("Cabin could not be created");
    }
    const createdCabin = data?.[0];

    // 2. Upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was en error uploading image
    if (storageError && createdCabin) {
      await supabase.from("cabins").delete().eq("id", createdCabin.id);
      console.log(error);
      throw new Error(
        "Cabin image could not be uploaded, cabin was not created",
      );
    }
    return createdCabin;
  }

  async getCabins(): Promise<CabinData[]> {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) throw error;
    return data ?? [];
  }

  async deleteCabin(id: number) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
      console.log(error);
      throw new Error("Cabin could not be deleted");
    }
    return data;
  }
}

const cabinService = new CabinService();
export default cabinService;
