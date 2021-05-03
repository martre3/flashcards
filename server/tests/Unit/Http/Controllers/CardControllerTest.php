<?php

namespace Tests\Unit\Http\Controllers;

use App\Http\Controllers\CardController;
use App\Http\Requests\CardRequest;
use App\Models\Card;
use App\Models\Deck;
use Jenssegers\Mongodb\Relations\HasMany;
use Tests\TestCase;

class CardControllerTest extends TestCase
{
    private CardController $controller;
    private Card $card;

    protected function setUp(): void
    {
        $this->card = \Mockery::mock(Card::class);

        $this->controller = new CardController();

        parent::setUp();
    }

    public function testGet(): void
    {
        $this->assertEquals(
            $this->card,
            $this->controller->get(\Mockery::mock(Deck::class), $this->card),
        );
    }

    public function testUpdate(): void
    {
        $request = \Mockery::mock(CardRequest::class);
        $request->shouldReceive('validated')->andReturn([]);

        $this->card->shouldReceive('update')->once();

        $this->assertEquals(
            $this->card,
            $this->controller->update($request, \Mockery::mock(Deck::class), $this->card),
        );
    }

    public function testCreate(): void
    {
        $request = \Mockery::mock(CardRequest::class);
        $request->shouldReceive('validated')->andReturn([]);

        $deck = \Mockery::mock(Deck::class);

        $relation = \Mockery::mock(HasMany::class);
        $relation->shouldReceive('save')->with($this->card);

        $deck->shouldReceive('cards')->andReturn($relation);
        $this->card->shouldReceive('fill')->once();

        $this->assertEquals(
            $this->card,
            $this->controller->create($request, $deck, $this->card),
        );
    }
}
