import type { Weather } from "./weather";

export type User = {
  id: string;
  name: string;
  email: string;
  longitude: number;
  latitude: number;
  last_weather?: Weather;
};
