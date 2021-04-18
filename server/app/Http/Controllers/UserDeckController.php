<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Http\Requests\SetGroupDecksRequest;
use App\Http\Requests\UpdateDeckStatusRequest;
use App\Models\Deck;
use App\Models\Group;
use App\Models\GroupDeck;
use App\Models\UserDeckSubscription;
use App\Repositories\GroupRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UserDeckController extends Controller
{
    public function __construct(private GroupRepository $repository) {}

    public function list(): LengthAwarePaginator
    {
        return $this->repository->listPage();
    }

    public function listGroupDecks(Group $group): LengthAwarePaginator
    {
        return $group->decks()->with('deck')->orderByDesc('active')->paginate();
    }

    public function listGroupUsers(Group $group): LengthAwarePaginator
    {
        return $group->members()->paginate();
    }

    public function subscribeToDeck(Request $request, Deck $deck, UserDeckSubscription $subscription): JsonResponse
    {
        $subscription->user()->associate($request->user());
        $subscription->active = true;
        $deck->subscriptions()->save($subscription);

        return response()->json([], 204);
    }

    public function setDeckActive(UpdateDeckStatusRequest $request, Group $group, string $deck)
    {
        $group->decks()
            ->where('deckId', '=', $deck)
            ->first()
            ->update(['active' => $request->get('active')]);

        return response()->json([], 204);
    }
//
//    public function delete(Deck $deck, Card $card): JsonResponse
//    {
//        $card->delete();
//
//        return response()->json(null, 204);
//    }
}
