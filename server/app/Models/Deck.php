<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $title
 * @property string $description
 * @property boolean $isPublic
 */
class Deck extends Model
{
    protected $fillable = [
        'title', 'description', 'isPublic',
    ];

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
