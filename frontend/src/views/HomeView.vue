<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import UsersList from "@/components/User/UsersList.vue";
import AppCard from "@/components/Shared/AppCard.vue";
import WeatherCardContent from "@/components/Weather/WeatherCardContent.vue";
import useScrollToWeatherCard from "@/composable/useScrollToWeatherCard";

const { weatherCardRef } = useScrollToWeatherCard();
</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col px-2 gap-2 md:flex-row">
      <AppCard class="flex-1 h-96 flex">
        <UsersList />
      </AppCard>
      <AppCard class="p-2 md:w-72" ref="weatherCardRef">
        <WeatherCardContent />
      </AppCard>
    </div>
  </DefaultLayout>
</template>
