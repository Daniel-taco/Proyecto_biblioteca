<?php

use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register',[RegisterController::class,'register']);
Route::post('login',[RegisterController::class,'login']);


Route::get('/user_index', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);



Route::get('/book_index', [BookController::class,'index']);
Route::post('/book_show', [BookController::class,'show']);
Route::post('/book_update', [BookController::class,'update']);
Route::post('/book_delete', [BookController::class,'destroy']);






Route::get('/category_index', [BookCategoryController::class,'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
