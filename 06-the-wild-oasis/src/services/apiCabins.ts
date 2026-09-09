import supabase from "./supabase";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) console.log(error);
    return data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Cabins could not be loaded",
    );
  }
}
