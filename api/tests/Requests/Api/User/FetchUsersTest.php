<?php

namespace Tests\Requests\Api\User;

use App\Models\User;
use Tests\TestCase;

class FetchUsersTest extends TestCase
{
  public function test_returns_users_with_latest_weather_data()
  {
    $users = User::factory()->count(5)->withLastWeatherData()->create();

    $this->get(route('users.index'))
      ->assertSuccessful()
      ->assertJson([
        'message' => 'all systems are a go',
        'users' => $users->toArray()
      ]);
  }
}
