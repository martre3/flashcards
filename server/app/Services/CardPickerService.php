<?php

namespace App\Services;

use App\Models\Card;
use App\Repositories\CardRepository;
use App\Utils\Builder;

class CardPickerService
{
    public function __construct(
        private CardRepository $cardRepository,
        private BoxPickerService $boxPickerService
    ) {}

    /**
     * @param string $userId
     * @param string $deckId
     *
     * @return Card|null
     */
    public function getNextCard(string $userId, string $deckId): ?Card
    {
        $unusedCard = $this->cardRepository->getUnusedCard($userId, $deckId);

        if ($unusedCard) {
            return $unusedCard;
        }

        $box = $this->boxPickerService->getNextBox($userId, $deckId);

        $userCard = $box->userCards()
            ->where('userId', '=', $userId)
            ->whereHas('card', fn (Builder $builder) => $builder->where('deckId', '=', $deckId))
            ->orderBy('updatedAt')
            ->with('card')
            ->first();

        return $userCard->card ?? null;
    }
}
