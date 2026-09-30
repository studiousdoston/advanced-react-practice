import { supabase } from "./supabase";

class GuestService {
  // Guests are uniquely identified by their email address
  async getGuest(email: string) {
    const { data } = await supabase
      .from("guests")
      .select("*")
      .eq("email", email)
      .single();

    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
  }

  async createGuest(newGuest: Record<string, unknown>) {
    const { data, error } = await supabase.from("guests").insert([newGuest]);

    if (error) {
      console.error(error);
      throw new Error("Guest could not be created");
    }

    return data;
  }

  // The updatedFields object should ONLY contain the updated data
  async updateGuest(id: string, updatedFields: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("guests")
      .update(updatedFields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Guest could not be updated");
    }

    return data;
  }

  async getCountries() {
    try {
      const res = await fetch(
        "https://api.restcountries.com/countries/v5?response_fields=names.common,flag",
        {
          headers: {
            Authorization: `Bearer ${process.env.GET_COUNTRIES_API_KEY}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const payload = await res.json();
      return payload.data.objects; // Country array lives in payload.data.objects
    } catch (error) {
      throw new Error("Could not fetch countries");
    }
  }
}

export default new GuestService();
