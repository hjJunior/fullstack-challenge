<?php

namespace Tests\Jobs\User;

use App\Jobs\User\SyncAllUsersWeatherDataJob;
use App\Jobs\User\SyncUserLastWeatherDataJob;
use App\Models\User;
use App\Models\WeatherData;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class SyncAllUsersWeatherDataJobTest extends TestCase
{
  public function test_dispatch_for_users_without_weather_data()
  {
    Bus::fake();
    $users = User::factory()->count(2)->create();

    $job = new SyncAllUsersWeatherDataJob();
    $job->handle();

    Bus::assertDispatchedTimes(SyncUserLastWeatherDataJob::class, 2);

    $this->assertDispatchedJobForUser($users[0]);
    $this->assertDispatchedJobForUser($users[1]);
  }

  public function test_do_not_dispatch_for_users_with_recently_updated_weather()
  {
    Bus::fake();
    User::factory()->withLastWeatherData()->count(2)->create();

    $job = new SyncAllUsersWeatherDataJob();
    $job->handle();

    Bus::assertNothingBatched();
  }

  public function test_dispatch_for_user_with_outdated_weather()
  {
    Bus::fake();
    $user = User::factory()->withLastWeatherData()->create();
    $user->lastWeather()->update(["updated_at" => now()->subMinutes(WeatherData::OUTDATED_AFTER_MINUTES)]);

    $job = new SyncAllUsersWeatherDataJob();
    $job->handle();

    Bus::assertDispatchedTimes(SyncUserLastWeatherDataJob::class, 1);
    $this->assertDispatchedJobForUser($user);
  }

  public function test_if_is_scheduled()
  {
    $everyFifteenMinutesExpression = '*/15 * * * *';

    $scheduled = collect(app()->make(Schedule::class)->events())
      ->where('description', SyncAllUsersWeatherDataJob::class)
      ->first();

    $this->assertNotNull($scheduled, 'SyncAllUsersWeatherDataJob is not added to scheduler');
    $this->assertEquals($scheduled->expression, $everyFifteenMinutesExpression);
  }

  private function assertDispatchedJobForUser($user)
  {
    Bus::assertDispatched(
      SyncUserLastWeatherDataJob::class,
      fn ($job) => $user->id === $job->user->id
    );
  }
}
