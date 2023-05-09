import type { Weather } from "@/types/weather";
import { computed, type Ref } from "vue";

export type TemperatureUnit = "celsius" | "fahrenheit";

const celsiusToFahrenheit = (value: number) => Math.round(value * 9) / 5 + 32;

const getTemp = (unit: TemperatureUnit, value: number) => {
  if (unit === "celsius") return value;
  return celsiusToFahrenheit(value);
};

const useWeatherTemperature = (
  weather: Weather,
  unit: Ref<TemperatureUnit>
) => {
  const celsius = computed(() => weather.data.main.temp);
  const celsiusMax = computed(() => weather.data.main.temp_max);
  const celsiusMin = computed(() => weather.data.main.temp_min);

  return {
    temp: computed(() => getTemp(unit.value, celsius.value)),
    tempMax: computed(() => getTemp(unit.value, celsiusMax.value)),
    tempMin: computed(() => getTemp(unit.value, celsiusMin.value)),
  };
};

export default useWeatherTemperature;
