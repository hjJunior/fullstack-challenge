<?php

namespace Tests\Actions\User;

use App\Actions\User\FetchUserWeather;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Request;
use Tests\TestCase;

class FetchUserWeatherTest extends TestCase
{
  public function test_can_fetch_weather_data()
  {
    Http::fake([
      'https://api.openweathermap.org/data/2.5/weather?*' => Http::response(['fake' => true])
    ]);

    $user = User::factory()->create();
    $fetch = app(FetchUserWeather::class);

    $result = $fetch($user);

    $this->assertEquals(['fake' => true], $result);
    $this->assertHttpRequestForWeatherFetchToUser($user);
  }

  private function assertHttpRequestForWeatherFetchToUser($user)
  {
    Http::assertSentCount(1);
    Http::assertSent(function (Request $request) use ($user) {
      $this->assertEquals(
        $user->latitude,
        $request['lat'],
        'Failed to assert that fetched the correctly user latitude'
      );

      $this->assertEquals(
        $user->longitude,
        $request['lon'],
        'Failed to assert that fetched the correctly user longitude'
      );

      return true;
    });
  }
}
