import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookings,
} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import toast from "react-hot-toast";
export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filterName: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading: fetchBookings,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  //
  const { isLoading: isDeleting, mutate: deletingBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted");
      queryClient.invalidateQueries({ queryKey: "bookings" });
    },
    onError: (err) => toast.error(err.message),
  });
  const {
    isLoading: isAll,
    data: allBookings,
    error: allError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    retry: false,
  });
  //   const { isLoading: isUpdate, mutate: updatingBooking } = useMutation({
  //     mutationFn: updateBooking,
  //     onSuccess: () => {
  //       toast.success("Booking updated");
  //       queryClient.invalidateQueries({ queryKey: "bookings" });
  //     },
  //     onError: (err) => toast.error(err.message),
  //   });
  //console.log(bookings);
  const { mutate: creatingBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("New Booking created");
      queryClient.invalidateQueries({ queryKey: "bookings" });
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    bookings,
    count,
    fetchBookings,
    error,
    deletingBooking,
    isDeleting,
    creatingBooking,
    isCreating,
    isAll,
    allBookings,
    allError,
  };
}
