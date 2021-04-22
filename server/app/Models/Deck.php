<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;
use PhpParser\Node\Scalar\DNumber;

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

    protected $appends = [
        'totalCards',
    ];

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'deckId');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    public function groups(): HasMany
    {
        return $this->hasMany(GroupDeck::class,'deckId');
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserDeckSubscription::class, 'deckId');
    }

    public function getTotalCardsAttribute(): int
    {
        return $this->cards()->count();
    }
}
