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
    /**
     * @var string[]
     */
    protected $fillable = ['boxId', 'cardId', 'userId'];

    public $timestamps = true;
    /**
     * @return BelongsTo
     */
    public function box(): BelongsTo
    {
        return $this->belongsTo(Box::class, 'boxId');
    }

    /**
     * @return BelongsTo
     */
    public function card(): BelongsTo
    {
        return $this->belongsTo(Card::class, 'cardId');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
