<?php

namespace App\Repositories;

use App\Models\Group;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GroupRepository
{
    public function listPage(): LengthAwarePaginator
    {
        return Group::query()
            ->paginate(2);
    }
}
