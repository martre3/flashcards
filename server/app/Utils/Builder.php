<?php

namespace App\Utils;

use Illuminate\Container\Container;

class Builder extends \Jenssegers\Mongodb\Eloquent\Builder
{
    protected function paginator($items, $total, $perPage, $currentPage, $options)
    {
        return Container::getInstance()->makeWith(LengthAwarePaginator::class, compact(
            'items', 'total', 'perPage', 'currentPage', 'options'
        ));
    }
}
