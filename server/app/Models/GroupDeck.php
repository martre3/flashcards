<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $_id
 * @property Deck $deck
 * @property string $deckId
 * @property Group $group
 * @property string $groupId
 */
class GroupDeck extends Model
{
    protected $fillable = [
        'active', 'deckId', 'groupId'
    ];

    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class,'deckId');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class,'groupId');
    }
}
