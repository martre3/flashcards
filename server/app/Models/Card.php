<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $question
 * @property string $type
 * @property string[] $correctAnswers
 * @property string[] $posibleAnswers
 */
class Card extends Model
{
    protected $fillable = [
        'question', 'type', 'correctAnswers', 'possibleAnswers',
    ];

    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class);
    }
}
