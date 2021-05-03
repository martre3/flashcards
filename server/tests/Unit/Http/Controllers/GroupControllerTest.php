<?php

namespace Tests\Unit\Http\Controllers;

use App\Http\Controllers\GroupController;
use App\Http\Requests\GroupRequest;
use App\Models\Group;
use App\Models\GroupDeck;
use App\Models\User;
use App\Repositories\GroupRepository;
use App\Utils\LengthAwarePaginator;
use Jenssegers\Mongodb\Relations\HasMany;
use Tests\TestCase;

class GroupControllerTest extends TestCase
{
    private GroupController $controller;
    private GroupRepository $groupRepository;
    private Group $group;

    protected function setUp(): void
    {
        $this->group = \Mockery::mock(Group::class);
        $this->groupRepository = \Mockery::mock(GroupRepository::class);

        $this->controller = new GroupController($this->groupRepository);

        parent::setUp();
    }

    public function testList(): void
    {
        $page = \Mockery::mock(LengthAwarePaginator::class);

        $this->groupRepository->shouldReceive('listPage')
            ->andReturn($page);

        $this->assertEquals(
            $page,
            $this->controller->list(),
        );
    }

    public function testGet(): void
    {
        $this->group->shouldReceive('load')
            ->with('invitations')
            ->andReturn($this->group);

        $this->assertEquals(
            $this->group,
            $this->controller->get($this->group),
        );
    }

    public function testGetSubscriptions(): void
    {
        $groupDeck1 = \Mockery::mock(GroupDeck::class);
        $groupDeck1->shouldReceive('getAttribute')
            ->with('deckId')
            ->andReturn('2');

        $groupDeck2 = \Mockery::mock(GroupDeck::class);
        $groupDeck2->shouldReceive('getAttribute')
            ->with('deckId')
            ->andReturn('5');


        $this->group->shouldReceive('load')
            ->with('decks')
            ->andReturn($this->group);

        $this->group->shouldReceive('getAttribute')
            ->with('decks')
            ->andReturn(collect([$groupDeck1, $groupDeck2]));

        $this->assertEquals(
            ['2', '5'],
            $this->controller->getSubscriptions($this->group)->toArray(),
        );
    }

    public function testCreate(): void
    {
        $user = \Mockery::mock(User::class);
        $relation = \Mockery::mock(HasMany::class);

        $relation->shouldReceive('save')->with($this->group);
        $user->shouldReceive('ownedGroups')->andReturn($relation);

        $request = \Mockery::mock(GroupRequest::class);
        $request->shouldReceive('validated')->andReturn([]);
        $request->shouldReceive('user')->andReturn($user);

        $this->group->shouldReceive('fill')->once();

        $this->assertEquals(
            $this->group,
            $this->controller->create($request, $this->group),
        );
    }
}
