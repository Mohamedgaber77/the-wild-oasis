import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurUser,
    onSuccess: ({ user }) => {
      console.log(user);
      toast.success("Account successfully updated");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
