<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Box;
use App\Models\Deck;
use App\Models\User;
use App\Models\UserCard;
use App\Repositories\BoxRepository;
use App\Services\CardPickerService;
use App\Services\CardReassignService;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\JsonResponse;
use Lcobucci\JWT\Configuration;
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

    public function submit(Request $request, string $deck): JsonResponse
    {
        $isCorrect = $this->cardReassignService->reassignCard(
            $request->user()->_id,
            $request->get('cardId'),
            $request->get('answers')
        );

        return response()->json(['success' => $isCorrect]);
    }
}
