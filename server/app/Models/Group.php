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
    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
    ];

    /**
     * @var string[]
     */
    protected $appends = ['deckIds'];

    /**
     * @var string[]
     */
    protected $hidden = ['decks'];

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    /**
     * @return HasMany
     */
    public function invitations(): HasMany
    {
        return $this->hasMany(GroupInvitation::class, 'groupId');
    }

    /**
     * @return BelongsToMany
     */
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, null, 'groupIds', 'userIds');
    }

    /**
     * @return HasMany
     */
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
