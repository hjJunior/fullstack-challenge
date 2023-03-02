<script setup lang="ts">
import { computed } from "vue";
import gravatarUrl from "gravatar-url";
import { storeToRefs } from "pinia";
import type { User } from "@/types/user";
import { useUsers } from "@/stores/users";
const props = defineProps<{ user: User }>();

const { selectedUserId } = storeToRefs(useUsers());
const avatar = computed(() => gravatarUrl(props.user.email, { size: 40 }));
const selected = computed(() => props.user.id === selectedUserId.value);
</script>

<template>
  <li class="bg-white">
    <div
      class="relative flex items-center space-x-3 px-6 py-5 hover:bg-gray-50"
      @click="selectedUserId = user.id"
    >
      <div
        class="absolute top-0 left-0 bottom-0 bg-gray-700 transition-all"
        :class="[selected ? 'w-2' : 'w-0']"
      />
      <div class="flex-shrink-0">
        <img class="h-10 w-10 rounded-full" :src="avatar" alt="" />
      </div>
      <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
          <p class="truncate text-sm text-gray-500">{{ user.email }}</p>
        </a>
      </div>
    </div>
  </li>
</template>
