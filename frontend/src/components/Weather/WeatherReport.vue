<script setup lang="ts">
import type { Weather } from "@/types/weather";
import useWeatherIcon from "@/composable/useWeatherIcon";
import useWeatherTemperature from "@/composable/useWeatherTemperature";
import type { TemperatureUnit } from "@/composable/useWeatherTemperature";
import WeatherWindyIcon from "@/components/Icons/WeatherWindyIcon.vue";
import WeatherHailIcon from "@/components/Icons/WeatherHailIcon.vue";
import { ref, computed } from "vue";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps<{ weather: Weather }>();

const unit = ref<TemperatureUnit>("celsius");

const icon = useWeatherIcon(props.weather);
const { temp, tempMax, tempMin } = useWeatherTemperature(props.weather, unit);
const unitSymbol = computed(() => (unit.value === "celsius" ? "°C" : "°F"));
</script>

<template>
  <div
    class="flex flex-col items-center justify-center p-2"
    data-testid="weather-report"
  >
    <img :src="icon" class="h-24" />
    <div class="flex">
      <div class="text-2xl mr-2" data-testid="temp">{{ temp }}</div>
      <div class="flex items-center justify-center space-x-2">
        <button
          :class="{ 'font-bold': unit === 'celsius' }"
          @click="unit = 'celsius'"
        >
          °C
        </button>
        <div class="w-[1px] bg-gray-300 h-5" />
        <button
          :class="{ 'font-bold': unit === 'fahrenheit' }"
          @click="unit = 'fahrenheit'"
        >
          °F
        </button>
      </div>
    </div>
    <div>{{ weather.data.weather[0].description }}</div>
    <div class="text-gray-500 text-sm self-start w-full mt-8 space-y-2">
      <div class="flex items-center">
        <ArrowTrendingDownIcon class="w-6 h-6 mr-3" />
        Min: {{ tempMin }} {{ unitSymbol }}
      </div>
      <div class="flex items-center">
        <ArrowTrendingUpIcon class="w-6 h-6 mr-3" />
        Max: {{ tempMax }} {{ unitSymbol }}
      </div>
      <div class="flex items-center">
        <WeatherHailIcon class="w-6 h-6 mr-3" />
        Humidity: {{ weather.data.main.humidity }}%
      </div>
      <div class="flex items-center">
        <WeatherWindyIcon class="w-6 h-6 mr-3" />
        Wind: {{ weather.data.wind.speed }} mph
      </div>
    </div>
  </div>
</template>
