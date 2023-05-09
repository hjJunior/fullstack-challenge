<?php

namespace App\OpenWeather\Api;

class WeatherApiClient
{
  protected const API_RESOURCE_PATH = '/data/2.5/weather';

  public function __construct(private ApiClient $client)
  {
  }

  public function get(array $params = [])
  {
    return $this
      ->client
      ->get(self::API_RESOURCE_PATH, $params)
      ->json();
  }
}
