import supabase, { supabaseUrl } from "./supabase";
//login
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  //console.log(data);
  return data;
}
//current user
export async function getCurUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return "there is no session or no user";
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  //console.log(data);
  return data?.user;
}
//signup
export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  //console.log(data);
  return data;
}
//logout
export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
//update user info
export async function updateCurUser({ fullName, password, avatar }) {
  //update password or name
  let updateData;
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  //update avatar
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
