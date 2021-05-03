<?php

namespace Tests\Unit\Services;

use App\Models\Box;
use App\Models\Card;
use App\Models\UserCard;
use App\Repositories\BoxRepository;
use App\Repositories\CardRepository;
use App\Services\BoxPickerService;
use App\Services\CardPickerService;
use Tests\TestCase;

class CardPickerServiceTest extends TestCase
{
    private CardPickerService $service;
    private CardRepository $cardRepository;
    private BoxRepository $boxRepository;
    private BoxPickerService $boxPickerService;
    private Card $card;

    protected function setUp(): void
    {
        $this->cardRepository = \Mockery::mock(CardRepository::class);
        $this->boxRepository = \Mockery::mock(BoxRepository::class);
        $this->boxPickerService = \Mockery::mock(BoxPickerService::class);

        $this->card = \Mockery::mock(Card::class);

        $this->service = new CardPickerService($this->cardRepository, $this->boxPickerService, $this->boxRepository);

        parent::setUp();
    }

    public function testReturnsCorrectCardWhenUnusedCardExists(): void
    {
        $this->cardRepository->shouldReceive('getUnusedCard')->andReturn($this->card);
        $this->boxPickerService->shouldReceive('getNextBox')->never();

        $this->assertEquals(
            $this->card,
            $this->service->getNextCard('11', '22')
        );
    }

    public function testReturnsCorrectCardFromBox()
    {
        $userCard = \Mockery::mock(UserCard::class);
        $userCard->shouldReceive('getAttribute')
            ->with('card')
            ->andReturn($this->card);

        $userCard->shouldReceive('offsetExists')->andReturn(true);

        $box = \Mockery::mock(Box::class);
        $this->cardRepository->shouldReceive('getUnusedCard')->andReturn(null);
        $this->boxPickerService->shouldReceive('getNextBox')->andReturn($box);
        $this->boxRepository->shouldReceive('getOldestCardFromBox')
            ->once()
            ->andReturn($userCard);

        $this->assertEquals(
            $this->card,
            $this->service->getNextCard('11', '22')
        );
    }
}
