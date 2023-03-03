<script setup lang="ts">
import { useUsers } from "@/stores/users";
import { MoonIcon, UserIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import EmptyState from "../Shared/EmptyState.vue";
import WeatherReport from "./WeatherReport.vue";

const { selectedUser } = storeToRefs(useUsers());
</script>

<template>
  <EmptyState
    v-if="!selectedUser"
    title="No user selected!"
    message="Get started by selecting a user."
    :icon="UserIcon"
  />
  <EmptyState
    v-else-if="!selectedUser.last_weather"
    title="No weather data"
    message="We are getting this data"
    :icon="MoonIcon"
  />
  <WeatherReport
    v-else
    :weather="selectedUser.last_weather"
    :key="selectedUser.id"
  />
</template>
