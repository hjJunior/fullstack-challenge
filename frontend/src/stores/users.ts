import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import useUsersFetch from "@/composable/api/useUsersFetch";
import groupBy from "lodash.groupby";
import { useGlobalSearch } from "./globalSearch";
import type { User } from "@/types/user";

const filterUser = (search: string) => (user: User) => {
  if (!search) return true;
  const searchTerm = search.toLocaleLowerCase();
  const name = user.name.toLocaleLowerCase();
  const email = user.email.toLocaleLowerCase();

  return name.includes(searchTerm) || email.includes(searchTerm);
};

export const useUsers = defineStore("users", () => {
  const { search } = storeToRefs(useGlobalSearch());
  const { users, isLoading, isError } = useUsersFetch();

  const selectedUserId = ref<string | null>(null);

  const filteredUsers = computed(() =>
    users.value?.filter(filterUser(search.value))
  );

  const usersByFirstLetter = computed(() =>
    groupBy(filteredUsers.value ?? [], ({ name }) => name.charAt(0))
  );

  const selectedUser = computed(() =>
    users.value?.find(({ id }) => id === selectedUserId.value)
  );

  const hasUsers = computed(() => (filteredUsers.value ?? []).length >= 1);

  return {
    selectedUser,
    selectedUserId,
    isLoading,
    isError,
    usersByFirstLetter,
    hasUsers,
  };
});
