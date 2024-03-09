import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSetting, updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useSetting() {
  const {
    isLoading: loadSetting,
    data: setting,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSetting,
  });

  return { loadSetting, setting, error };
}

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updatingSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Settings are successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updatingSetting, isUpdating };
}
