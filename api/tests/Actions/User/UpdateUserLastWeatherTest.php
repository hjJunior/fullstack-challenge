<?php

namespace Tests\Actions\User;

use App\Actions\User\UpdateUserLastWeather;
use App\Models\User;
use Tests\TestCase;

class UpdateUserLastWeatherTest extends TestCase
{
  public function test_when_already_have_last_weather()
  {
    $new_weather_data = ['fake' => 'new-weather-data'];
    $user = User::factory()->withLastWeatherData()->create();
    $update = app(UpdateUserLastWeather::class);

    $update($user, $new_weather_data);

    $this->assertEquals($new_weather_data, $user->lastWeather->data);
  }

  public function test_when_do_not_have_last_weather()
  {
    $new_weather_data = ['fake' => 'new-weather-data'];
    $user = User::factory()->create();
    $update = app(UpdateUserLastWeather::class);

    $update($user, $new_weather_data);

    $this->assertEquals($new_weather_data, $user->lastWeather->data);
  }
}
