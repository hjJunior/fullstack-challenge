<?php

namespace App\Actions\User;

use App\Models\User;

class UpdateUserLastWeather
{
  public function __invoke(User $user, array $data)
  {
    $user->lastWeather()->updateOrCreate([], compact('data'));
  }
}
