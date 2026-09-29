import { notFound } from "next/navigation";
import { supabase } from "./supabase";

class CabinService {
  async getCabin(id: string) {
    const { data, error } = await supabase
      .from("cabins")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      notFound();
    }

    return data;
  }

  async getCabinPrice(id: string) {
    const { data, error } = await supabase
      .from("cabins")
      .select("regularPrice, discount")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    }

    return data;
  }

  async getCabins() {
    const { data, error } = await supabase
      .from("cabins")
      .select("id, name, maxCapacity, regularPrice, discount, image")
      .order("name");

    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }

    return data;
  }
}

export default new CabinService();
