import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login, logout, signup } from "../../services/apiAuth";
export function useLog() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //signup

  const { mutate: signUp, isLoading: isSignUp } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account successfully created!");
    },
  });

  //login
  const { mutate: logging, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success(`welcome ${user.user.email}`);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  //logout
  const { mutate: loggedout, isLoading: isLoggedout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logged out");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    signUp,
    isSignUp,
    logging,
    isLogging,
    loggedout,
    isLoggedout,
  };
}
