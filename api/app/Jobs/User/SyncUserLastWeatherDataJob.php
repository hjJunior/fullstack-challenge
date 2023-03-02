<?php

namespace App\Jobs\User;

use App\Actions\User\FetchUserWeather;
use App\Actions\User\UpdateUserLastWeather;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\RateLimitedMiddleware\RateLimited;

class SyncUserLastWeatherDataJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public User $user)
    {
    }

    public function handle(): void
    {
        $fetchWeather = app(FetchUserWeather::class);
        $updateLastWeather = app(UpdateUserLastWeather::class);

        $weather_data = $fetchWeather($this->user);
        $updateLastWeather($this->user, $weather_data);
    }

    public function middleware()
    {
        return [new RateLimited()];
    }
}
