<?php

namespace App\Models\Base;


use App\Utils\Builder;

trait ModelOverrides
{
    /**
     * @param \Illuminate\Database\Query\Builder $query
     *
     * @return \App\Utils\Builder
     */
    public function newEloquentBuilder($query): Builder
    {
        return new Builder($query);
    }
}
