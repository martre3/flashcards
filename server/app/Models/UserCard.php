<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $_id
 * @property string $question
 * @property string $type
 * @property Card $card
 * @property Box $box
 * @property string[] $correctAnswers
 * @property string[] $possibleAnswers
 */
class UserCard extends Model
{
    protected $fillable = ['boxId', 'cardId', 'userId'];

    public function box(): BelongsTo
    {
        return $this->belongsTo(Box::class, 'boxId');
    }

    public function card(): BelongsTo
    {
        return $this->belongsTo(Card::class, 'cardId');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
