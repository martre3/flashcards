<?php

namespace App\Models;

use App\Models\Base\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property string $socialId
 * @property string $email
 * @property string $password
 * @property Deck[] $ownedDecks
 * @property Group[] $ownedGroups
 * @property Group[] $groups
 * @property GroupInvitation[] $groupInvitations
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
    ];

    /**
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return HasMany
     */
    public function ownedDecks(): HasMany
    {
        return $this->hasMany(Deck::class, 'ownerId');
    }

    /**
     * @return HasMany
     */
    public function ownedGroups(): HasMany
    {
        return $this->hasMany(Group::class, 'ownerId');
    }

    /**
     * @return BelongsToMany
     */
    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, null, 'userIds', 'groupIds');
    }

    /**
     * @return HasMany
     */
    public function groupInvitations(): HasMany
    {
        return $this->hasMany(GroupInvitation::class, 'inviteeId');
    }

    /**
     * @return HasMany
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserDeckSubscription::class, 'userId');
    }

    /**
     * @return HasMany
     */
    public function credentials(): HasMany
    {
        return $this->hasMany(SocialCredentials::class, 'userId');
    }
}
