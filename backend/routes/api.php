<?php

use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\MeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostPleaseController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UnlikeController;




Route::post('/register', RegistrationController::class)->name('register');
Route::post('/login', LoginController::class)->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', MeController::class);
    Route::post('/posts',PostController::class);
    Route::get('/get-posts',PostPleaseController::class);
    Route::post('/likes', LikeController::class);
    Route::delete('/posts/{postId}/like',UnlikeController::class);
    Route::post('/logout', LogoutController::class);

});
