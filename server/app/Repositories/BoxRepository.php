<?php

namespace App\Repositories;

use App\Models\Box;
use App\Models\Card;
use App\Models\User;
use App\Models\UserCard;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class BoxRepository
{
    /**
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection|Box
     */
    public function all()
    {
        return Box::query()->orderBy('order')->get();
    }

    /**
     * @param string $userId
     * @param string $deckId
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection|Box[]
     */
    public function getNonEmptyBoxes(string $userId, string $deckId)
    {
        return Box::query()
            ->whereHas(
                'userCards',
                fn (Builder $builder) => $builder
                    ->where('userId', '=', $userId)
                    ->whereHas('card', fn (Builder $builder) => $builder->where('deckId', '=', $deckId))
            )->get();
    }

    /**
     * @param Box $box
     * @param string $userId
     * @param string $deckId
     *
     * @return UserCard|null
     */
    public function getOldestCardFromBox(Box $box, string $userId, string $deckId): ?UserCard
    {
        return $box->userCards()
            ->where('userId', '=', $userId)
            ->whereHas('card', fn (\App\Utils\Builder $builder) => $builder->where('deckId', '=', $deckId))
            ->with('card')
            ->orderBy('updatedAt')
            ->first();
    }
}
