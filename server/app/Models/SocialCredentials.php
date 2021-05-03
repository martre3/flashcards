<?php

namespace App\Models;

use App\Models\Base\Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $_id
 * @property string $provider
 * @property string $socialId
 * @property User $user
 */
class SocialCredentials extends Authenticatable
{
    /**
     * @var array
     */
    protected $fillable = [
        'provider',
        'socialId',
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
