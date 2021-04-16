<?php

use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
        Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
    });

    Route::group(['prefix' => 'users'], function () {
    });
});

Route::middleware('auth:api')->group(function () {
    Route::group(['prefix' => 'users'], function () {
        Route::get('me', [\App\Http\Controllers\UserController::class, 'me']);

        Route::group(['prefix' => '{user}'], function () {
            Route::group(['prefix' => 'invitations'], function () {
                Route::get('', [\App\Http\Controllers\GroupInvitationController::class, 'listUser']);
            });
        });
    });

    Route::group(['prefix' => 'groups'], function () {
        Route::get('', [\App\Http\Controllers\GroupController::class, 'list']);
        Route::post('', [\App\Http\Controllers\GroupController::class, 'create']);

        Route::group(['prefix' => '{group}'], function () {
            Route::get('', [\App\Http\Controllers\GroupController::class, 'get']);

            Route::group(['prefix' => 'invitations'], function () {
                Route::post('', [\App\Http\Controllers\GroupInvitationController::class, 'create']);
                Route::get('', [\App\Http\Controllers\GroupInvitationController::class, 'listGroup']);

                Route::group(['prefix' => '{invitation}'], function () {
                    Route::patch('', [\App\Http\Controllers\GroupInvitationController::class, 'update']);
                });
            });
        });
    });

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

