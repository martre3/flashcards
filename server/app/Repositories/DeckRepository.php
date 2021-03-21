<?php

namespace App\Repositories;

use App\Models\Deck;
use Illuminate\Database\Eloquent\Collection;

class DeckRepository
{
    public function all(): Collection
    {
        return Deck::all();
    }
}
