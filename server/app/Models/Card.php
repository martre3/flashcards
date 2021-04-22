<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property string $question
 * @property string $type
 * @property Deck $deck
 * @property string[] $correctAnswers
 * @property string[] $possibleAnswers
 */
class Card extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'question', 'type', 'correctAnswers', 'possibleAnswers',
    ];

    /**
     * @return BelongsTo
     */
    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class, 'deckId');
    }

    /**
     * @return HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(UserCard::class, 'cardId');
    }
}
