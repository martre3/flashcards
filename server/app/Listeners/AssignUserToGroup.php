<?php

namespace App\Listeners;

use App\Enums\GroupInvitationStatus;
use App\Models\GroupInvitation;

class AssignUserToGroup
{
    /**
     * @param GroupInvitation $invitation
     *
     * @return void
     */
    public function handle(GroupInvitation $invitation): void
    {
        if ($invitation->wasChanged('status')
            && $invitation->getOriginal('status') === GroupInvitationStatus::PENDING
            && $invitation->status === GroupInvitationStatus::ACCEPTED
        ) {
            $invitation->load('group');
            $invitation->group->members()->attach($invitation->inviteeId);
        }
    }
}
