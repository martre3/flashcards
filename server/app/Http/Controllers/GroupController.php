<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\Group;
use App\Repositories\GroupRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GroupController extends Controller
{
    public function __construct(private GroupRepository $repository) {}

    public function list(): LengthAwarePaginator
    {
        return $this->repository->listPage();
    }
//
//    public function update(CardRequest $request, Deck $deck, Card $card): Card
//    {
//        $card->update($request->validated());
//
//        return $card;
//    }
//
    public function create(GroupRequest $request, Group $group): Group
    {
        $group->fill($request->validated());
        $request->user()->ownedGroups()->save($group);

        return $group;
    }
//
//    public function delete(Deck $deck, Card $card): JsonResponse
//    {
//        $card->delete();
//
//        return response()->json(null, 204);
//    }
}
