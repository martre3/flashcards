<?php

namespace App\Http\Controllers;

use App\Models\UserDeckSubscription;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function me(Request $request)
    {
        return $request->user();
    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function getSubscriptions(Request $request)
    {
        return $request
            ->user()
            ->load('subscriptions')
            ->subscriptions
            ->map(fn (UserDeckSubscription $subscription) => $subscription->deckId);
    }
}
