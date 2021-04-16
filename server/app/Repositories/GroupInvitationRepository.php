<?php

namespace App\Repositories;

use App\Enums\GroupInvitationStatus;
use App\Models\GroupInvitation;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GroupInvitationRepository
{
    public function listGroupsPage(string $groupId): LengthAwarePaginator
    {
        return GroupInvitation::query()
            ->where('groupId', '=', $groupId)
            ->with('invitee')
            ->paginate();
    }

    public function listUsersPage(string $userId): LengthAwarePaginator
    {
        return GroupInvitation::query()
            ->where('inviteeId', '=', $userId)
            ->where('status', '=', GroupInvitationStatus::PENDING)
            ->with('group')
            ->paginate();
    }
}
