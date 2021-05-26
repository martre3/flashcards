<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Http\Requests\RateDeckRequest;
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

    /**
     * @return LengthAwarePaginator
     */
    public function list(): LengthAwarePaginator
    {
        return $this->repository->listPage();
    }

    /**
     * @param Group $group
     *
     * @return LengthAwarePaginator
     */
    public function listGroupDecks(Group $group): LengthAwarePaginator
    {
        return $group->decks()->with('deck')->orderByDesc('active')->paginate();
    }

    /**
     * @param Group $group
     *
     * @return LengthAwarePaginator
     */
    public function listGroupUsers(Group $group): LengthAwarePaginator
    {
        return $group->members()->paginate();
    }

    /**
     * @param Request $request
     * @param Deck $deck
     * @param UserDeckSubscription $subscription
     *
     * @return JsonResponse
     */
    public function subscribeToDeck(Request $request, Deck $deck, UserDeckSubscription $subscription): JsonResponse
    {
        $subscription->user()->associate($request->user());
        $subscription->active = true;
        $deck->subscriptions()->save($subscription);

        return response()->json([], 204);
    }

    /**
     * @param UpdateDeckStatusRequest $request
     * @param Group $group
     * @param string $deck
     *
     * @return JsonResponse
     */
    public function setDeckActive(UpdateDeckStatusRequest $request, Group $group, string $deck)
    {
        $group->decks()
            ->where('deckId', '=', $deck)
            ->first()
            ->update(['active' => $request->get('active')]);

        return response()->json([], 204);
    }

    public function setUserDeckActive(Request $request, Deck $deck) {
        $sub = $deck->subscriptions()
            ->where('userId', '=', $request->user()->id)
            ->first();

        if ($sub) {
            $sub->update(['active' => $request->get('active')]);
        } else {
            UserDeckSubscription::create(['active' => $request->get('active'), 'userId' => $request->user()->id, 'deckId' => $deck->id]);
//            $deck->subscriptions()->create(['active' => $request->get('active'), 'userId' => $request->user()->id]);
        }

//        dd($deck->subscriptions()->where('userId', '=', $request->user()->id)->count());

        return $deck->refresh()->append(['subscription']);
    }

    public function rate(RateDeckRequest $request, Deck $deck)
    {
        $subscription = $deck->subscriptions()
            ->where('userId', '=', $request->user()->id)
            ->firstOrCreate();

        $subscription->update($request->validated());

        return response()->json($deck->refresh()->append(['subscription']), 200);
    }
//
//    public function delete(Deck $deck, Card $card): JsonResponse
//    {
//        $card->delete();
//
//        return response()->json(null, 204);
//    }
}
