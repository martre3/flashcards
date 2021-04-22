<?php

namespace App\Repositories;

use App\Models\Card;
use App\Models\UserCard;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CardRepository
{
    /**
     * @param string $id
     *
     * @return Card|null
     */
    public function get(string $id): ?Card
    {
        return Card::find($id);
    }

    /**
     * @param string $userId
     * @param string $cardId
     *
     * @return UserCard|Model|null
     */
    public function getOrCreateUserCard(string $userId, string $cardId): ?UserCard
    {
        $userCard = UserCard::query()
            ->where('userId', '=', $userId)
            ->where('cardId', '=', $cardId)
            ->with(['card', 'box'])
            ->first();

        return $userCard ?? new UserCard(compact('userId', 'cardId'));
    }

    /**
     * @param string $userId
     * @param string $deckId
     *
     * @return Builder|Model|Card|null
     */
    public function getUnusedCard(string $userId, string $deckId): ?Card
    {
        return Card::query()
            ->where('deck_id', '=', $deckId)
            ->whereDoesntHave(
                'users',
                fn (Builder $builder) => $builder
                    ->where('userId', '=', $userId)
                    ->whereHas('card', fn (Builder $builder) => $builder->where('deck_id', '=', $deckId))
            )->first();
    }
}
