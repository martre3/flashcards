<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeckRequest;
use App\Http\Requests\SetGroupDecksRequest;
use App\Models\Deck;
use App\Models\Group;
use App\Repositories\DeckRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class DeckController extends Controller
{
    /**
     * @param DeckRepository $deckRepository
     */
    public function __construct(
        private DeckRepository $deckRepository,
    ) {}

    /**
     * @return LengthAwarePaginator
     */
    public function all(): LengthAwarePaginator
    {
        return $this->deckRepository->listPage();
    }

    public function listGroupDecks(Group $group): LengthAwarePaginator
    {
        return $group->decks()->paginate();
    }

    public function setGroupDecks(SetGroupDecksRequest $request, Group $group): JsonResponse
    {
        $group->decks()->sync($request->get('ids'));

        return response()->json([], 204);
    }

    /**
     * @param Deck $deck
     *
     * @return Deck
     */
    public function get(Deck $deck): Deck
    {
        return $deck->load('cards');
    }

    /**
     * @param DeckRequest $request
     * @param Deck $deck
     *
     * @return Deck
     */
    public function create(DeckRequest $request, Deck $deck): Deck
    {
        $deck->fill($request->validated());
        $request->user()->decks()->save($deck);

        return $deck;
    }

    /**
     * @param DeckRequest $request
     * @param Deck $deck
     *
     * @return Deck
     */
    public function update(DeckRequest $request, Deck $deck): Deck
    {
        $deck->update($request->validated());

        return $deck;
    }
}
