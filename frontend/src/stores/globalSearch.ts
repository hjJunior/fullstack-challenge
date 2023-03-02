import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalSearch = defineStore("globalSearch", () => {
  const search = ref("");

  return { search };
});
