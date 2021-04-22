<?php

namespace App\Http\Controllers;

use App\Http\Requests\InviteToGroupRequest;
use App\Http\Requests\UpdateInvitationToGroupRequest;
use App\Models\Group;
use App\Models\GroupInvitation;
use App\Repositories\GroupInvitationRepository;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

class GroupInvitationController extends Controller
{
    public function __construct(private GroupInvitationRepository $repository) {}

    /**
     * @param string $group
     *
     * @return LengthAwarePaginator
     */
    public function listGroup(string $group): LengthAwarePaginator
    {
        return $this->repository->listGroupsPage($group);
    }

    /**
     * @param string $user
     *
     * @return LengthAwarePaginator
     */
    public function listUser(string $user): LengthAwarePaginator
    {
        return $this->repository->listUsersPage($user);
    }

    /**
     * @param InviteToGroupRequest $request
     * @param Group $group
     * @param GroupInvitation $invitation
     * @param UserRepository $userRepository
     *
     * @return JsonResponse
     */
    public function create(
        InviteToGroupRequest $request,
        Group $group,
        GroupInvitation $invitation,
        UserRepository $userRepository
    ): JsonResponse {
        $user = $userRepository->findByAnyIdentifier($request->get('identifier'));

        if (!$user) {
            return response()->json(['errors' => ['identifier' => ['User does not exist']]], 422);
        }
        
        $invitation->group()->associate($group);
        $invitation->owner()->associate($request->user());

        $user->groupInvitations()->save($invitation);

        return response()->json($invitation->load('invitee')->refresh());
    }

    /**
     * @param UpdateInvitationToGroupRequest $request
     * @param Group $group
     * @param GroupInvitation $invitation
     *
     * @return GroupInvitation
     */
    public function update(
        UpdateInvitationToGroupRequest $request,
        Group $group,
        GroupInvitation $invitation
    ): GroupInvitation {
        $invitation->update($request->validated());

        return $invitation;
    }
}
