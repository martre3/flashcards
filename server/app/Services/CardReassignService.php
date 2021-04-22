<?php

namespace App\Services;

use App\Models\Box;
use App\Models\UserCard;
use App\Repositories\BoxRepository;
use App\Repositories\CardRepository;
use Illuminate\Support\Collection;

class CardReassignService
{
    private Collection $boxes;

    public function __construct(
        private BoxRepository $boxRepository,
        private CardRepository $cardRepository,
        private CardAnswersCheckerService $answersChecker,
    )
    {
        $this->boxes = $this->boxRepository->all();
    }

    /**
     * @param string $userId
     * @param string $cardId
     * @param array $answers
     *
     * @return bool
     */
    public function reassignCard(string $userId, string $cardId, array $answers): bool
    {
        $userCard = $this->cardRepository->getOrCreateUserCard($userId, $cardId);
        $isCorrect = $this->answersChecker->answersValid($userCard->card, $answers);
        $moveBy =  $isCorrect ? 1 : -1;

        $this->moveCard($userCard, $moveBy);

        return $isCorrect;
    }

    /**
     * @param UserCard $userCard
     * @param int $moveBy
     */
    private function moveCard(UserCard $userCard, int $moveBy): void
    {
        $box = $this->boxes->first();

        if ($userCard->box) {
            $box = $this->getBoxWithOrder($userCard->box->order + $moveBy);
        }

        $box->userCards()->save($userCard);
    }

    /**
     * @param int $order
     * 
     * @return Box
     */
    private function getBoxWithOrder(int $order): Box
    {
        if ($order <= 1) {
            return $this->boxes->first();
        }

        $box = $this->boxes->first(fn (Box $box) => $box->order === $order);

        return $box ?? $this->boxes->last();
    }
}
