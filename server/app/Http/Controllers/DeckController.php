<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeckRequest;
use App\Models\Deck;
use App\Repositories\DeckRepository;
use Illuminate\Database\Eloquent\Collection;

class DeckController extends Controller
{
    /**
     * @param DeckRepository $deckRepository
     */
    public function __construct(
        private DeckRepository $deckRepository,
    ) {}

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->deckRepository->all();
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
        $deck->fill($request->validated())->save();

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
