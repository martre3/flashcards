<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $_id
 * @property Deck $deck
 * @property string $deckId
 * @property User $user
 * @property string $userId
 * @property bool $active
 * @property int $timesSubmitted
 */
class UserDeckSubscription extends Model
{
    protected $fillable = [
        'active', 'deckId', 'userId'
    ];

    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class,'deckId');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(Group::class,'userId');
    }
}
