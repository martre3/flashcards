<?php

namespace App\Services;

use App\Models\Card;
use App\Repositories\BoxRepository;
use App\Repositories\CardRepository;
use App\Utils\Builder;

class CardPickerService
{
    public function __construct(
        private CardRepository $cardRepository,
        private BoxPickerService $boxPickerService,
        private BoxRepository $boxRepository,
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
        $userCard = $this->boxRepository->getOldestCardFromBox($box, $userId, $deckId);

        return $userCard->card ?? null;
    }
}
