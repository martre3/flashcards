<?php

namespace App\Models;

use App\Models\Base\Model;
use Illuminate\Support\Collection;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\EmbedsMany;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property User $owner
 * @property Collection|GroupDeck[] $decks
 * @property GroupInvitation[] $invitations
 */
class Group extends Model
{
    protected $fillable = [
        'title',
    ];

    protected $appends = ['deckIds'];

    protected $hidden = ['decks'];

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

    public function decks(): HasMany
    {
        return $this->hasMany(GroupDeck::class, 'groupId', '_id');
    }

    /**
     * @return Collection
     */
    public function getDeckIdsAttribute(): Collection
    {
        return $this->decks->map(fn (GroupDeck $groupDeck) => $groupDeck->deckId);
    }
}
