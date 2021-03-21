<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group( function () {
    Route::group(['prefix' => 'decks'], function () {
        Route::post('', [\App\Http\Controllers\DeckController::class, 'create']);
        Route::get('', [\App\Http\Controllers\DeckController::class, 'all']);

        Route::group(['prefix' => '{deck}'], function () {
            Route::get('', [\App\Http\Controllers\DeckController::class, 'get']);
            Route::patch('', [\App\Http\Controllers\DeckController::class, 'update']);

            Route::group(['prefix' => 'cards'], function () {
                Route::post('', [\App\Http\Controllers\CardController::class, 'create']);

                Route::group(['prefix' => '{card}'], function () {
                    Route::get('', [\App\Http\Controllers\CardController::class, 'get']);
                    Route::delete('', [\App\Http\Controllers\CardController::class, 'delete']);
                    Route::patch('', [\App\Http\Controllers\CardController::class, 'update']);
                });
            });
        });
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
