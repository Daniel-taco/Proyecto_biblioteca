<?php

use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookLendingController;
use App\Http\Controllers\LendController;
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

Route::middleware('auth:api')->group(function () {

    //Rutes Book
    Route::post('/book_store', [BookController::class, 'store']);
    Route::post('/book_show', [BookController::class,'show']);
    Route::post('/book_update', [BookController::class,'update']);
    Route::post('/book_delete', [BookController::class,'destroy']);
    Route::post('/book_decrement_copies/{id}', [BookController::class, 'decrementCopies']);
    Route::post('/book_increment_copies/{id}', [BookController::class, 'bookIncrementCopies']);
    Route::get('/book_index', [BookController::class,'index']);

    //Rutes User
    Route::get('/user_index', [UserController::class, 'index']);
    Route::get('/user_show/{id}', [UserController::class, 'show']);
    Route::post('/user_update/{id}', [UserController::class,'update']);
    Route::post('/user_delete', [UserController::class,'destroy']);

    //Rutes Lend
    Route::post('/lend_store', [LendController::class,'store']);
    Route::get('/lend_index', [LendController::class,'index']);
    Route::post('/lend_update', [LendController::class,'update']);
    Route::post('/lend_show/{id}', [LendController::class,'show']);
    Route::post('/lend_delete', [LendController::class,'destroy']);

    //Rutes Category
    Route::get('/category_index', [BookCategoryController::class,'index']);
    Route::post('/category_store', [BookCategoryController::class,'store']);
    Route::post('/category_update', [BookCategoryController::class,'update']);
    Route::post('/category_delete', [BookCategoryController::class,'destroy']);

    //Rutes Book Lending
    Route::post('/book_lending_store', [BookLendingController::class,'store']);
    Route::get('/book_lending_index', [BookLendingController::class,'index']);
    Route::get('/lend_books/{id}', [BookLendingController::class, 'lendBooks']);
    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
