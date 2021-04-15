<?php

namespace App\Models\Base;

use Jenssegers\Mongodb\Auth\User;

abstract class Authenticatable extends User
{
    use ModelOverrides;

    public static $snakeAttributes = false;

    public const CREATED_AT = 'createdAt';
    public const UPDATED_AT = 'updatedAt';
}
