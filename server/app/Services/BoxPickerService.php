<?php

namespace App\Services;

use App\Models\Box;
use App\Repositories\BoxRepository;
use App\Repositories\DeckRepository;

class BoxPickerService
{
    public function __construct(
        private BoxRepository $boxRepository,
        private DeckRepository $deckRepository
    ) {}

    /**
     * @param string $userId
     * @param string $deckId
     *
     * @return Box|null
     */
    public function getNextBox(string $userId, string $deckId): ?Box
    {
        $intervals = [];
        $boxes = $this->boxRepository->getNonEmptyBoxes($userId, $deckId)->sortByDesc('interval');

        $boxes->each(function (Box $box) use (&$intervals) {
            $intervals[] = last($intervals) + $box->interval;
        });

        $subscription = $this->deckRepository->getSubscription($userId, $deckId);

        $intervals = array_reverse($intervals);
        $boxes = $boxes->reverse()->values();

        $box = $boxes->first(fn (Box $box, int $index) => $subscription->timesSubmitted % $intervals[$index] === 0);

        return $box ?? $boxes->last();
    }
}
