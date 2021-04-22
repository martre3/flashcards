<?php

namespace App\Repositories;

use App\Models\Deck;
use App\Models\UserDeckSubscription;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DeckRepository
{
    public function listPage(): LengthAwarePaginator
    {
        return Deck::query()->paginate();
    }

    /**
     * @param string $userId
     * @param string $deckId
     *
     * @return UserDeckSubscription|null
     */
    public function getSubscription(string $userId, string $deckId): ?UserDeckSubscription
    {
        return UserDeckSubscription::query()
            ->where('userId', '=', $userId)
            ->where('deckId', '=', $deckId)
            ->first();
    }
}
