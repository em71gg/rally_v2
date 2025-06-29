<?php

use App\Http\Controllers\ApiController;
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

Route::middleware(['auth:sanctum', 'role:administrador'])->post('rally', [ApiController::class, 'createRally']);
Route::middleware(['auth:sanctum', 'role:participante'])->post('createphoto', [ApiController::class, 'createPhoto']);
Route::middleware(['auth:sanctum', 'role:participante'])->post('submit-photo', [ApiController::class, 'submitPhotoToRally']);
Route::middleware(['auth:sanctum', 'role:participante'])->post('remove-photo', [ApiController::class, 'removePhotoToRally']);
Route::middleware(['auth:sanctum', 'role:participante'])->post('register-for-rally', [ApiController::class, 'registerUserOnRally']);
Route::middleware(['auth:sanctum', 'role:administrador'])->put('validate-rally', [ApiController::class, 'validateRally']);
Route::middleware(['auth:sanctum', 'role:administrador'])->put('delete-rally', [ApiController::class, 'deleteRally']);



Route::get('categories', [ApiController::class, 'getCategories']);
Route::get('rallies', [ApiController::class, 'getRallies']);
Route::get('user-rallies', [ApiController::class, 'getUserRallies']);
Route::post('photosRally', [ApiController::class, 'getPhotosRally']);
Route::post('vote', [ApiController::class, 'vote']);
Route::get('results', [ApiController::class, 'getRallyResults']);
Route::get('uservotes', [ApiController::class, 'getUserVotes']);
Route::delete('deleteVote', [ApiController::class, 'deleteVote']);
