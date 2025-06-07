<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/user', function (Request $request) {   
    $user = $request->user();
    $user->role = $user->getRoleNames();
    return $user;
})->middleware('auth:sanctum');

Route::get('/users', function (Request $request) {
    return User::all();
});