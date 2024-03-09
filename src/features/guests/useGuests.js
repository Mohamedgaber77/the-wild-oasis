import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  createEditGuest,
  deleteGuest,
  getAllGuests,
  getGuests,
} from "../../services/apiGuests";
import { PAGE_SIZE } from "../../utils/constants";
import toast from "react-hot-toast";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isLoading: fetchingGuests,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey: ["guests", page],
    queryFn: () => getGuests({ page }),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", page + 1],
      queryFn: () => getGuests({ page: page + 1 }),
    });
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getGuests({ page: page - 1 }),
      queryKey: ["guests", page - 1],
    });
  }

  const { mutate: editingGuest, isLoading: isEditing } = useMutation({
    mutationFn: ({ newGuest, id }) => createEditGuest(newGuest, id),
    onSuccess: () => {
      toast.success("Guest has been edited");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: creatingGuest, isLoading: isCreating } = useMutation({
    mutationFn: createEditGuest,
    onSuccess: () => {
      toast.success("Guest has been created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: deletingGuest, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteGuest(id),
    onSuccess: () => {
      toast.success("Guest has been deleted");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });
  const {
    isLoading: isAllGuests,
    data: allGuests,
    error: isError,
  } = useQuery({
    queryKey: ["allGuests"],
    queryFn: getAllGuests,
  });

  return {
    fetchingGuests,
    guests,
    count,
    error,
    isAllGuests,
    allGuests,
    isError,
    isEditing,
    editingGuest,
    isCreating,
    creatingGuest,
    isDeleting,
    deletingGuest,
  };
}
