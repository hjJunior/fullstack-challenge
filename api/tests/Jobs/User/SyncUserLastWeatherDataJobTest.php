<?php

namespace Tests\Jobs\User;

use App\Actions\User\FetchUserWeather;
use App\Jobs\User\SyncUserLastWeatherDataJob;
use App\Models\User;
use Mockery;
use Tests\TestCase;

class SyncUserLastWeatherDataJobTest extends TestCase
{
  public function test_update_last_weather()
  {
    $user = User::factory()->create();
    $fetchMock = Mockery::mock(FetchUserWeather::class)
      ->shouldReceive("__invoke")
      ->with($user)
      ->andReturns(["fake" => "weather"])
      ->getMock();

    app()->instance(FetchUserWeather::class, $fetchMock);


    $job = new SyncUserLastWeatherDataJob($user);
    $job->handle();

    $this->assertEquals($user->lastWeather->data, ["fake" => "weather"]);
  }
}
