<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property string $title
 * @property string $description
 * @property Card[] $cards
 * @property User $owner
 * @property Group[] $groups
 * @property boolean $isPublic
 */
class Deck extends Model
{
    protected $fillable = [
        'title', 'description', 'isPublic',
    ];

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'cardId');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, null, 'deckIds', 'groupIds');
    }
}
