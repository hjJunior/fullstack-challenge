import type { User } from "@/types/user";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const getUsers = () => {
  return axios.get("/users").then(({ data }) => data.users);
};

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const useUsersFetch = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchInterval: FIVE_MINUTES_IN_MS,
  });

  return {
    users,
    isLoading,
    isError,
  };
};

export default useUsersFetch;
