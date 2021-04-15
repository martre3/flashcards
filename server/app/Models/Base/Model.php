<?php

namespace App\Models\Base;

use App\Utils\Builder;
use Jenssegers\Mongodb\Eloquent\Model as BaseModel;

abstract class Model extends BaseModel
{
    use ModelOverrides;

    public static $snakeAttributes = false;

    public const CREATED_AT = 'createdAt';
    public const UPDATED_AT = 'updatedAt';
}
