<?php

namespace App\Actions\User;

use App\Models\User;
use App\OpenWeather\Api\WeatherApiClient;

class FetchUserWeather
{
  public function __construct(private WeatherApiClient $weatherApi)
  {
  }

  public function __invoke(User $user)
  {
    $params = [
      'lat' => $user->latitude,
      'lon' => $user->longitude,
      'units' => 'imperial'
    ];

    return $this->weatherApi->get($params);
  }
}
