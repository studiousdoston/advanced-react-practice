import { CabinData } from "../features/cabins/CabinTable";
import supabase from "./supabase";

export async function getCabins(): Promise<CabinData[]> {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Cabins could not be loaded",
    );
  }
}

export async function deleteCabin(id:number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
