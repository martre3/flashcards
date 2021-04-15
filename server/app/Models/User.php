<?php

namespace App\Models;

use App\Models\Base\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Relations\HasMany;

/**
 * @property string $_id
 * @property string $email
 * @property string $password
 * @property Deck[] $decks
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
        'password',
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

    public function ownedDecks(): HasMany
    {
        return $this->hasMany(Deck::class, 'ownerId');
    }

    public function ownedGroups(): HasMany
    {
        return $this->hasMany(Group::class, 'ownerId');
    }
}
