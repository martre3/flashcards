<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Http\Requests\SetGroupDecksRequest;
use App\Http\Requests\UpdateDeckStatusRequest;
use App\Models\Deck;
use App\Models\Group;
use App\Models\GroupDeck;
use App\Repositories\GroupRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;

class GroupController extends Controller
{
    public function __construct(private GroupRepository $repository) {}

    public function list(): LengthAwarePaginator
    {
        return $this->repository->listPage();
    }

    public function get(Group $group): Group
    {
        return $group->load('invitations');
    }

//
//    public function update(CardRequest $request, Deck $deck, Card $card): Card
//    {
//        $card->update($request->validated());
//
//        return $card;
//    }
//
    public function create(GroupRequest $request, Group $group): Group
    {
        $group->fill($request->validated());
        $request->user()->ownedGroups()->save($group);

        return $group;
    }

    public function listGroupDecks(Group $group): LengthAwarePaginator
    {
        return $group->decks()->with('deck')->orderByDesc('active')->paginate();
    }

    public function setGroupDecks(SetGroupDecksRequest $request, string $group): JsonResponse
    {
        $this->repository->associateDecks($group, $request->get('ids'))->refresh()->load('decks');

        return response()->json([], 204);
    }

    public function listGroupUsers(Group $group): LengthAwarePaginator
    {
        return $group->members()->paginate();
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
