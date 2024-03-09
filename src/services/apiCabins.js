import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://iqsgtgenjbslcjvmzzbv.supabase.co/storage/v1/object/sign/img/cabin-002.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWcvY2FiaW4tMDAyLmpwZyIsImlhdCI6MTcwODM3MTEyOSwiZXhwIjoxNzcxNDQzMTI5fQ.wxG5QRhtBTEoP1Qp0lF0omaeS6aVUp7jUIdrk97Mpzk&t=2024-02-19T19%3A32%3A09.396Z

  // https://iqsgtgenjbslcjvmzzbv.supabase.co/storage/v1/object/public/img/cabin-003.jpg?t=2024-02-19T19%3A41%3A26.084Z

  //https://xavooookwwfhfjyszcpz.supabase.co/storage/v1/object/public/cabins-image/cabin-001.jpg
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/img/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  if (hasImage) return data;
  const { error: imageError } = await supabase.storage
    .from("img")
    .upload(imageName, newCabin.image);

  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(imageError);
    throw new Error("image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
