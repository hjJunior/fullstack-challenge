<?php

namespace Tests\Jobs\User;

use App\Jobs\User\SyncAllUsersWeatherDataJob;
use App\Jobs\User\SyncUserLastWeatherDataJob;
use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class SyncAllUsersWeatherDataJobTest extends TestCase
{
  public function test_dispatch_job_for_each_user()
  {
    Bus::fake();
    $users = User::factory()->count(2)->create();

    $job = new SyncAllUsersWeatherDataJob();
    $job->handle();

    Bus::assertDispatchedTimes(SyncUserLastWeatherDataJob::class, 2);

    $this->assertDispatchedJobForUser($users[0]);
    $this->assertDispatchedJobForUser($users[1]);
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
