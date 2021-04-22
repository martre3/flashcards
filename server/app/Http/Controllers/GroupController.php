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
     * @return Group
     */
    public function get(Group $group): Group
    {
        return $group->load('invitations');
    }

    /**
     * @param Group $group
     *
     * @return GroupDeck[]|\Illuminate\Support\Collection
     */
    public function getSubscriptions(Group $group)
    {
        return $group->load('decks')->decks->map(fn (GroupDeck $groupDeck) => $groupDeck->deckId);
    }
//
//    public function update(CardRequest $request, Deck $deck, Card $card): Card
//    {
//        $card->update($request->validated());
//
//        return $card;
//    }
//
    /**
     * @param GroupRequest $request
     * @param Group $group
     *
     * @return Group
     */
    public function create(GroupRequest $request, Group $group): Group
    {
        $group->fill($request->validated());
        $request->user()->ownedGroups()->save($group);

        return $group;
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
     * @param SetGroupDecksRequest $request
     * @param string $group
     *
     * @return JsonResponse
     */
    public function setGroupDecks(SetGroupDecksRequest $request, string $group): JsonResponse
    {
        $this->repository->associateDecks($group, $request->get('ids'))->refresh()->load('decks');

        return response()->json([], 204);
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
//
//    public function delete(Deck $deck, Card $card): JsonResponse
//    {
//        $card->delete();
//
//        return response()->json(null, 204);
//    }
}
