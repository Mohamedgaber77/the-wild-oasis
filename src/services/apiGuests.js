import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

//all guests
export async function getAllGuests() {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) throw new Error("Guests could not get loaded");
  return data;
}
export async function getGuests({ page }) {
  let query = supabase
    .from("guests")
    .select("id, fullName, email, nationality, nationalID, countryFlag", {
      count: "exact",
    });
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error("Guests could not get loaded");
  return { data, count };
}
//single guest

export async function createEditGuest(newGuest, id) {
  console.log(newGuest, id);

  let query = supabase.from("guests");

  //Create
  if (!id) query = query.insert([newGuest]);

  // Edit
  if (id) query = query.update(newGuest).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }

  return data;
}
