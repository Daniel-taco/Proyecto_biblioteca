<?php

use App\Http\Controllers\RolController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/user_store', [UserController::class, 'store']);
Route::post('/user_show', [UserController::class,'show']);
Route::get('/user', [UserController::class, 'index']);
Route::get('/token', [UserController::class, 'token']);

Route::post('/rol_show', [RolController::class,'show']);
Route::get('/rol', [RolController::class, 'index']);

