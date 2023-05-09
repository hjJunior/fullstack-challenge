<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherData extends Model
{
    use HasFactory;

    public const OUTDATED_AFTER_MINUTES = 15;

    protected $casts = [
        'data' => 'json'
    ];

    protected $guarded = [];

    public function scopeOutdated($query)
    {
        return $query->where("updated_at", "<=", now()->subMinutes(self::OUTDATED_AFTER_MINUTES));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
