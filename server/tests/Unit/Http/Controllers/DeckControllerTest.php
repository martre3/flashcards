<?php

namespace Tests\Unit\Http\Controllers;

use App\Http\Controllers\DeckController;
use App\Http\Requests\DeckRequest;
use App\Models\Deck;
use App\Models\User;
use App\Repositories\DeckRepository;
use App\Utils\LengthAwarePaginator;
use Jenssegers\Mongodb\Relations\HasMany;
use Tests\TestCase;

class DeckControllerTest extends TestCase
{
    private DeckController $controller;
    private DeckRepository $deckRepository;
    private Deck $deck;

    protected function setUp(): void
    {
        $this->deck = \Mockery::mock(Deck::class);
        $this->deckRepository = \Mockery::mock(DeckRepository::class);

        $this->controller = new DeckController($this->deckRepository);

        parent::setUp();
    }

    public function testList(): void
    {
        $page = \Mockery::mock(LengthAwarePaginator::class);

        $this->deckRepository->shouldReceive('listPage')
            ->andReturn($page);

        $this->assertEquals(
            $page,
            $this->controller->list(),
        );
    }

    public function testGet(): void
    {
        $this->deck->shouldReceive('load')
            ->with('cards')
            ->andReturn($this->deck);

        $this->assertEquals(
            $this->deck,
            $this->controller->get($this->deck),
        );
    }

    public function testUpdate(): void
    {
        $request = \Mockery::mock(DeckRequest::class);
        $request->shouldReceive('validated')->andReturn([]);

        $this->deck->shouldReceive('update')->once();

        $this->assertEquals(
            $this->deck,
            $this->controller->update($request, $this->deck),
        );
    }

    public function testCreate(): void
    {
        $user = \Mockery::mock(User::class);
        $relation = \Mockery::mock(HasMany::class);

        $relation->shouldReceive('save')->with($this->deck);
        $user->shouldReceive('ownedDecks')->andReturn($relation);

        $request = \Mockery::mock(DeckRequest::class);
        $request->shouldReceive('validated')->andReturn([]);
        $request->shouldReceive('user')->andReturn($user);

        $this->deck->shouldReceive('fill')->once();

        $this->assertEquals(
            $this->deck,
            $this->controller->create($request, $this->deck),
        );
    }
}
