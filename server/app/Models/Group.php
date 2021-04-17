<?php

namespace App\Models;

use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property User $owner
 * @property Deck[] $decks
 * @property GroupInvitation[] $invitations
 */
class Group extends Model
{
    protected $fillable = [
        'title',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(GroupInvitation::class, 'groupId');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, null, 'groupIds', 'userIds');
    }

    public function decks(): BelongsToMany
    {
        return $this->belongsToMany(Deck::class, null, 'groupIds', 'deckIds');
    }
}
