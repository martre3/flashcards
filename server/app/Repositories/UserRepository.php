<?php

namespace App\Repositories;

use App\Models\Deck;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    public function get(): Collection
    {
        return Deck::all();
    }
}
