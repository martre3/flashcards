<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $_id
 * @property User $owner
 */
class Group extends Model
{
    protected $fillable = [
        'title',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }
}
