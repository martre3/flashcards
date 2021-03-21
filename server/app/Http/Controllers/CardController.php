<?php

namespace App\Http\Controllers;

use App\Http\Requests\CardRequest;
use App\Models\Card;
use App\Models\Deck;
use Illuminate\Http\JsonResponse;

class CardController extends Controller
{
    public function get(Deck $deck, Card $card): Card
    {
        return $card;
    }

    public function update(CardRequest $request, Deck $deck, Card $card): Card
    {
        $card->update($request->validated());

        return $card;
    }

    public function create(CardRequest $request, Deck $deck, Card $card): Card
    {
        $card->fill($request->validated());
        $deck->cards()->save($card);

        return $card;
    }

    public function delete(Deck $deck, Card $card): JsonResponse
    {
        $card->delete();

        return response()->json(null, 204);
    }
}
