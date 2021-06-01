<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeckRequest;
use App\Http\Requests\SetGroupDecksRequest;
use App\Models\Deck;
use App\Models\Group;
use App\Models\UserDeckSubscription;
use App\Repositories\DeckRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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
    public function list(Request $request): LengthAwarePaginator
    {
        return $this->deckRepository->listPage($request->query->get('tab'), $request->user()->id, $request->query->get('query'));
    }

    /**
     * @param Deck $deck
     *
     * @return Deck
     */
    public function get(Deck $deck): Deck
    {
        return $deck->load('cards')->append(['subscription']);
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
        $request->user()->ownedDecks()->save($deck);
        UserDeckSubscription::create([
            'deckId' => $deck->id,
            'userId' => $request->user()->id,
        ]);

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
