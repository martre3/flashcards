<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $message
 * @property string $status
 */
class Issue extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'message', 'status',
    ];

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
