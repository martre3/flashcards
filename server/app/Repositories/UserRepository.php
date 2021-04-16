<?php

namespace App\Repositories;

use App\Models\Deck;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class UserRepository
{
    /**
     * @param string $identifier
     *
     * @return User|null
     */
    public function findByAnyIdentifier(string $identifier): ?Model
    {
        return User::query()
            ->where('id', '=', $identifier)
            ->orWhere('email', '=', $identifier)
            ->orWhere('username', '=', $identifier)
            ->first();
    }

    public function get(): Collection
    {
        return Deck::all();
    }
}
