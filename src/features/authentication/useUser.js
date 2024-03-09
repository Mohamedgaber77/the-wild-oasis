import { useQuery } from "@tanstack/react-query";
import { getCurUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading: isCurUser, data: curUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurUser,
  });
  return {
    curUser,
    isCurUser,

    isAuthenticated: curUser?.role === "authenticated",
  };
}
