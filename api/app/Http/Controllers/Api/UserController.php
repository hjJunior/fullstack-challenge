<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'all systems are a go',
            'users' => User::with('lastWeather')->get(),
        ]);
    }
}
