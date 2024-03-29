<?php

namespace App\Http\Controllers;

use App\Models\UserDeckSubscription;
use App\Services\CardPickerService;
use App\Services\CardReassignService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class StudyController extends Controller
{
    public function __construct(
        private CardReassignService $cardReassignService,
        private CardPickerService $cardPickerService,
    ) {}

    /**
     * @return JsonResponse
     */
    public function getCard(Request $request, string $deck)
    {
        return $this->cardPickerService->getNextCard($request->user()->_id, $deck);
    }

    /**
     * @param Request $request
     * @param string $deck
     *
     * @return JsonResponse
     */
    public function submit(Request $request, string $deck): JsonResponse
    {
        $isCorrect = $this->cardReassignService->reassignCard(
            $request->user()->_id,
            $request->get('cardId'),
            $request->get('answers')
        );

        /**
         * @var UserDeckSubscription $subscription
         */
        $subscription = UserDeckSubscription::query()
            ->where('deckId', '=', $deck)
            ->where('userId', '=', $request->user()->_id)
            ->first();

        if ($subscription) {
            $subscription->timesSubmitted++;
            $subscription->save();
        }

        return response()->json(['success' => $isCorrect]);
    }
}
