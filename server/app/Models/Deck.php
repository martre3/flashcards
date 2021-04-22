<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
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
    /**
     * @var string[]
     */
    protected $fillable = [
        'title', 'description', 'isPublic',
    ];

    /**
     * @var string[]
     */
    protected $appends = [
        'totalCards',
    ];

    /**
     * @return HasMany
     */
    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'deckId');
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    /**
     * @return HasMany
     */
    public function groups(): HasMany
    {
        return $this->hasMany(GroupDeck::class,'deckId');
    }

    /**
     * @return HasMany
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserDeckSubscription::class, 'deckId');
    }

    /**
     * @return int
     */
    public function getTotalCardsAttribute(): int
    {
        return $this->cards()->count();
    }
}
