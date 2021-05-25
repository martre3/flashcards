<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $_id
 */
class Comment extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'message',
    ];

    protected $with = [
        'user',
    ];

    /**
     * @return BelongsTo
     */
    public function deck(): BelongsTo
    {
        return $this->belongsTo(Deck::class,'deckId');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'userId');
    }
}
