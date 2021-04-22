<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property int $order
 * @property int $interval
 */
class Box extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'interval', 'order'
    ];

    /**
     * @return HasMany
     */
    public function userCards(): HasMany
    {
        return $this->hasMany(UserCard::class, 'boxId');
    }
}
