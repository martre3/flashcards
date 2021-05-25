<?php

use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
        Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
        Route::post('access', [\App\Http\Controllers\AuthController::class, 'access']);
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


            Route::group(['prefix' => 'decks'], function () {
                Route::get('', [\App\Http\Controllers\GroupController::class, 'listGroupDecks']);
                Route::put('', [\App\Http\Controllers\GroupController::class, 'setGroupDecks']);

                Route::group(['prefix' => 'subscriptions'], function () {
                    Route::get('', [\App\Http\Controllers\GroupController::class, 'getSubscriptions']);
                });

                Route::group(['prefix' => '{deck}'], function () {
                    Route::put('active', [\App\Http\Controllers\GroupController::class, 'setDeckActive']);
                });
            });

            Route::group(['prefix' => 'users'], function () {
                Route::get('', [\App\Http\Controllers\GroupController::class, 'listGroupUsers']);
            });

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
        Route::get('', [\App\Http\Controllers\DeckController::class, 'list']);

        Route::group(['prefix' => 'subscriptions'], function () {
            Route::get('', [\App\Http\Controllers\UserController::class, 'getSubscriptions']);
        });


        Route::group(['prefix' => '{deck}'], function () {
            Route::get('', [\App\Http\Controllers\DeckController::class, 'get']);
            Route::patch('', [\App\Http\Controllers\DeckController::class, 'update']);
            Route::post('subscribe', [\App\Http\Controllers\UserDeckController::class, 'subscribeToDeck']);
            Route::post('rate', [\App\Http\Controllers\UserDeckController::class, 'rate']);

            Route::group(['prefix' => 'comments'], function () {
                Route::get('', [\App\Http\Controllers\CommentController::class, 'list']);
                Route::post('', [\App\Http\Controllers\CommentController::class, 'create']);
            });

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

    Route::group(['prefix' => 'study'], function () {
        Route::group(['prefix' => 'decks'], function () {
            Route::group(['prefix' => '{deck}'], function () {
                Route::get('', [\App\Http\Controllers\StudyController::class, 'getCard']);
                Route::post('submit', [\App\Http\Controllers\StudyController::class, 'submit']);
            });
        });
    });

    Route::group(['prefix' => 'boxes'], function () {
        Route::post('', [\App\Http\Controllers\BoxController::class, 'create']);
    });
});

