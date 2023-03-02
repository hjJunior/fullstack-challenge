<script setup lang="ts">
import { useUsers } from "@/stores/users";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import EmptyState from "../Shared/EmptyState.vue";
import StickySection from "../Shared/StickySection.vue";
import UserRow from "./UserRow.vue";
import UserRowSkeleton from "./UserRowSkeleton.vue";

const { isLoading, usersByFirstLetter, hasUsers, isError } = storeToRefs(
  useUsers()
);
</script>

<template>
  <nav class="w-full h-full overflow-y-auto">
    <ul v-if="isLoading" class="w-full">
      <UserRowSkeleton v-for="n in 4" :key="n" />
    </ul>
    <EmptyState
      v-else-if="isError"
      title="Something went wrong"
      message="We couldn't get the users"
      :icon="ExclamationTriangleIcon"
    />
    <EmptyState
      v-else-if="!hasUsers"
      title="No users found!"
      message="Try different search terms"
      :icon="MagnifyingGlassIcon"
    />
    <StickySection
      v-else
      v-for="letter in Object.keys(usersByFirstLetter)"
      :key="letter"
      :title="letter"
      class="relative"
    >
      <ul role="list" class="relative z-0 divide-y divide-gray-200">
        <UserRow
          v-for="user in usersByFirstLetter[letter]"
          :key="user.id"
          v-bind="{ user }"
        />
      </ul>
    </StickySection>
  </nav>
</template>
