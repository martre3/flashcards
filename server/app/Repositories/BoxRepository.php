<?php

namespace App\Repositories;

use App\Models\Box;
use App\Models\Card;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class BoxRepository
{
    public function all()
    {
        return Box::query()->orderBy('order')->get();
    }

    public function getNonEmptyBoxes(string $userId, string $deckId)
    {
        return Box::query()
            ->whereHas(
                'userCards',
                fn (Builder $builder) => $builder
                    ->where('userId', '=', $userId)
                    ->whereHas('card', fn (Builder $builder) => $builder->where('deck_id', '=', $deckId))
            )->get();

//        $total = $notSeenCardsQuery->count();
//
//        if ($total === 0) {
//            /**
//             * @var Box $box
//             */
//            $box = $boxes->first();
//
//            return $box->userCards()->with('card')->first()->card;
//        }
//
//        return $notSeenCardsQuery->skip(rand(0, $total - 1))->first();
    }
}
