<?php

namespace App\OpenWeather\Api;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class ApiClient
{
  protected const BASE_URL = 'https://api.openweathermap.org';
  protected PendingRequest $http;

  public function __construct()
  {
    $this->http = Http::baseUrl(self::BASE_URL)
      ->acceptJson()
      ->throw();
  }

  public function get(string $url, $query = [])
  {
    $appid = config('services.openweather.key');
    $queryParams = compact('appid') + $query;

    return $this->http->get($url, $queryParams);
  }
}
