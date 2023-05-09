import type { Weather } from "@/types/weather";
import { computed } from "vue";

const getUrl = (iconId: string) =>
  `http://openweathermap.org/img/wn/${iconId}@2x.png`;

const useWeatherIcon = (weather: Weather) => {
  return computed(() => getUrl(weather.data.weather[0].icon));
};

export default useWeatherIcon;
