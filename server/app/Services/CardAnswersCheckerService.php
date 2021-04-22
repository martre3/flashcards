<?php


namespace App\Services;


use App\Models\Card;

class CardAnswersCheckerService
{
    public function answersValid(Card $card, array $answers): bool
    {
        $answersMap = array_flip($answers);
        $correctAnswers = collect($card->correctAnswers);

        if ($correctAnswers->count() !== count($answers)) {
            return false;
        }

        if ($correctAnswers->filter(fn (string $answer) => !array_key_exists($answer, $answersMap))->count() > 0) {
            return false;
        }

        return true;
    }
}
