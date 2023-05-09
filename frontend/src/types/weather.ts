export interface Sys {
  sunset: number;
  country: string;
  sunrise: number;
}

export interface Main {
  temp: number;
  humidity: number;
  pressure: number;
  temp_max: number;
  temp_min: number;
  sea_level: number;
  feels_like: number;
  grnd_level: number;
}

export interface Wind {
  deg: number;
  gust: number;
  speed: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Clouds {
  all: number;
}

export interface OpenWeather {
  id: number;
  icon: string;
  main: string;
  description: string;
}

export type WeatherData = {
  dt: number;
  id: number;
  cod: number;
  sys: Sys;
  base: string;
  main: Main;
  name: string;
  wind: Wind;
  coord: Coord;
  clouds: Clouds;
  weather: OpenWeather[];
  timezone: number;
  visibility: number;
};

export type Weather = {
  id: string;
  data: WeatherData;
};
