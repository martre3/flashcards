<?php

namespace App\Repositories;

use App\Models\Deck;
use App\Models\UserDeckSubscription;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class DeckRepository
{
    /**
     * @return LengthAwarePaginator
     */
    public function listPage($type, $userId, $query): LengthAwarePaginator
    {
        if ($type === 'Active') {
            $query = Deck::query()
                ->whereHas('subscriptions', fn (Builder $builder) => $builder
                    ->where('userId', '=', $userId)
                    ->where('active', '=', true)
                );
        } else if ($type === 'All') {
            $query = Deck::query()
                ->whereHas('subscriptions', fn (Builder $builder) => $builder
                    ->where('userId', '=', $userId)
                );
        } else {
            $query = Deck::query()
                ->where('title', 'like', '%' . $query . '%');
        }

        return $query->orderByDesc('createdAt')->paginate();
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
