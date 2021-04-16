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
    protected $attributes = [
      'status' => GroupInvitationStatus::PENDING,
    ];

    protected $fillable = [
        'status'
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'groupId');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ownerId');
    }

    public function invitee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inviteeId');
    }
}
