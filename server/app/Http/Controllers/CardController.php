<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardRequest;
use App\Models\Card;
use App\Models\Deck;
use Illuminate\Http\JsonResponse;

class CardController extends Controller
{
    /**
     * @param Deck $deck
     * @param Card $card
     *
     * @return Card
     */
    public function get(Deck $deck, Card $card): Card
    {
        return $card;
    }

    /**
     * @param CardRequest $request
     * @param Deck $deck
     * @param Card $card
     *
     * @return Card
     */
    public function update(CardRequest $request, Deck $deck, Card $card): Card
    {
        $card->update($request->validated());

        return $card;
    }

    /**
     * @param CardRequest $request
     * @param Deck $deck
     * @param Card $card
     *
     * @return Card
     */
    public function create(CardRequest $request, Deck $deck, Card $card): Card
    {
        $card->fill($request->validated());
        $deck->cards()->save($card);

        return $card;
    }

    /**
     * @param Deck $deck
     * @param Card $card
     *
     * @return JsonResponse
     */
    public function delete(Deck $deck, Card $card): JsonResponse
    {
        $card->delete();

        return response()->json(null, 204);
    }
}
