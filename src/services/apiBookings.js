import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, guests(*), cabins(*)"
    );
  if (error) throw new Error("All Bookings could not get loaded");
  return data;
}

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, guests(fullName,email,id), cabins(name,id)",
      { count: "exact" }
    );

  if (filter) {
    query = query[filter.method || "eq"](filter.filterName, filter.value);
  }
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  // console.log(data);
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();
  // console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  // console.log(data);
  return data;
}

//  Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data: data1, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice,status")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Recent bookings could not get loaded");
  }
  //console.log(data1);
  return data1;
}

//  Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data: data2, error } = await supabase
    .from("bookings")
    .select("*")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Stays bookings could not get loaded");
  }
  //console.log(data2);
  return data2;
}

export async function recentActivity(date) {
  const { data: recent, error } = await supabase
    .from("bookings")
    .select("*,guests(fullName, nationality, countryFlag)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))
    .or(`and(status.eq.unconfirmed),and(status.eq.checked-in)`)
    .order("created_at");
  if (error) {
    throw new Error("recent activity fuuuuck could not get loaded");
  }
  //console.log(recent);
  return recent;
}

//  Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  //  Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  //  (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  //  (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  console.log(data);
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  //    REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert(newBooking)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("the new Booking could not be created");
  }
  return data;
}
