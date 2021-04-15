<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

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
    protected $fillable = [
        'question', 'type', 'correctAnswers', 'possibleAnswers',
    ];

    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class, 'deckId');
    }
}
