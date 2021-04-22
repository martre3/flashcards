<?php

namespace App\Models;

use App\Enums\GroupInvitationStatus;
use App\Models\Base\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;

/**
 * @property string $_id
 * @property User $owner
 * @property string $ownerId
 * @property string $status
 * @property User $invitee
 * @property string $inviteeId
 * @property Group $group
 * @property string $groupId
 */
class GroupInvitation extends Model
{
    /**
     * @var array
     */
    protected $attributes = [
      'status' => GroupInvitationStatus::PENDING,
    ];

    /**
     * @var string[]
     */
    protected $fillable = [
        'status'
    ];

    /**
     * @return BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'groupId');
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    /**
     * @return BelongsTo
     */
    public function invitee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inviteeId');
    }
}
