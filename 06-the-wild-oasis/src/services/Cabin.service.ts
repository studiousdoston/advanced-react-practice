import { CabinData } from "../features/cabins/CabinTable";
import supabase, { supabaseUrl } from "./supabase";

class CabinService {
  //* -----------  CREATE_CABIN  ----------- *\\
  public async createEditCabin(newCabin: CabinData, id: number) {
    const hasImagePath =
      typeof newCabin.image === "string" &&
      newCabin.image.startsWith(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.name}`.replace(/\//g, "");
    const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/Edit Cabin
    let query;

    //* A) CREATE
    if (!id)
      query = query = supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }]);
    //* B) EDIT
    if (id)
      query = supabase
        .from("cabins")
        .update({ ...newCabin, image: imagePath })
        .eq("id", id);

    const { data, error } = await query!.select().single();

    if (error) {
      console.log(error);
      throw new Error("Cabin could not be created");
    }

    // 2. Upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was en error uploading image
    if (storageError) {
      if (!id) await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "Cabin image could not be uploaded, cabin was not created",
      );
    }
    return data;
  }

  //* -----------  GET_CABIN  ----------- *\\
  public async getCabins(): Promise<CabinData[]> {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) throw error;
    return data ?? [];
  }

  //* -----------  DELETE_CABIN  ----------- *\\
  public async deleteCabin(id: number) {
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
