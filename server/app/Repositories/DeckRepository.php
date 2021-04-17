<?php

namespace App\Repositories;

use App\Models\Deck;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DeckRepository
{
    public function listPage(): LengthAwarePaginator
    {
        return Deck::query()->paginate();
    }
}
