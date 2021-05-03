<?php

namespace Tests\Unit\Services;

use App\Models\Box;
use App\Models\Card;
use App\Models\UserCard;
use App\Repositories\BoxRepository;
use App\Repositories\CardRepository;
use App\Services\Auth\CardAnswersCheckerService;
use App\Services\Auth\CardReassignService;
use Jenssegers\Mongodb\Relations\HasMany;
use Mockery\MockInterface;
use Tests\TestCase;

class CardReassignServiceTest extends TestCase
{
    private CardReassignService $service;
    private BoxRepository $boxRepository;
    private CardRepository $cardRepository;
    private CardAnswersCheckerService $checkerService;
    private UserCard $userCard;
    /**
     * @var array|Box[]|MockInterface[]
     */
    private array $boxes = [];

    /**
     * @var array|HasMany[]|MockInterface[]
     */
    private array $cardsRelations = [];

    protected function setUp(): void
    {
        $this->boxRepository = \Mockery::mock(BoxRepository::class);
        $this->cardRepository = \Mockery::mock(CardRepository::class);
        $this->checkerService = \Mockery::mock(CardAnswersCheckerService::class);

        $this->boxes = [];
        $this->cardsRelations = [];

        $this->createBox(1);
        $this->createBox(2);
        $this->createBox(3);

        $this->boxRepository->shouldReceive('all')->andReturn(collect($this->boxes));

        $this->userCard = \Mockery::mock(UserCard::class);
        $this->userCard->shouldReceive('getAttribute')
            ->with('card')
            ->andReturn(\Mockery::mock(Card::class));

        $this->userCard->shouldReceive('touch');

        $this->cardRepository->shouldReceive('getOrCreateUserCard')
            ->with('11', '22')
            ->andReturn($this->userCard);

        $this->service = new CardReassignService($this->boxRepository, $this->cardRepository, $this->checkerService);

        parent::setUp();
    }

    protected function tearDown(): void
    {
        $this->addToAssertionCount(
            \Mockery::getContainer()->mockery_getExpectationCount()
        );

        parent::tearDown();
    }

    public function testAssignsToFirstOnFirstSubmit(): void
    {
        $this->checkerService->shouldReceive('answersValid')->andReturn(true);

        $this->userCard->shouldReceive('getAttribute')
            ->with('box')
            ->andReturn(null);

        $this->cardsRelations[0]->shouldReceive('save')
            ->with($this->userCard)
            ->once();

        $this->service->reassignCard('11', '22', ['answer']);
    }

    public function testMovesBoxUp(): void
    {
        $this->checkerService->shouldReceive('answersValid')->andReturn(true);

        $this->userCard->shouldReceive('getAttribute')
            ->with('box')
            ->andReturn($this->boxes[0]);

        $this->cardsRelations[1]->shouldReceive('save')
            ->with($this->userCard)
            ->once();

        $this->cardsRelations[0]->shouldReceive('save')
            ->withAnyArgs()
            ->never();

        $this->service->reassignCard('11', '22', ['answer']);
    }

    public function testMovesBoxDown(): void
    {
        $this->checkerService->shouldReceive('answersValid')->andReturn(false);

        $this->userCard->shouldReceive('getAttribute')
            ->with('box')
            ->andReturn($this->boxes[1]);

        $this->cardsRelations[0]->shouldReceive('save')
            ->with($this->userCard)
            ->once();

        $this->service->reassignCard('11', '22', ['answer']);
    }

    public function testMovesBoxUpOutOfRange(): void
    {
        $this->checkerService->shouldReceive('answersValid')->andReturn(true);

        $this->userCard->shouldReceive('getAttribute')
            ->with('box')
            ->andReturn($this->boxes[2]);

        $this->cardsRelations[2]->shouldReceive('save')
            ->with($this->userCard);

        $this->service->reassignCard('11', '22', ['answer']);
    }

    public function testMovesBoxDownOutOfRange(): void
    {
        $this->checkerService->shouldReceive('answersValid')->andReturn(false);

        $this->userCard->shouldReceive('getAttribute')
            ->with('box')
            ->andReturn($this->boxes[0]);

        $this->cardsRelations[0]->shouldReceive('save')
            ->with($this->userCard);

        $this->service->reassignCard('11', '22', ['answer']);
    }

    private function createBox(int $order): void
    {
        $box = \Mockery::mock(Box::class);
        $userCard = \Mockery::mock(HasMany::class);

        $box->shouldReceive('getAttribute')
            ->with('order')
            ->zeroOrMoreTimes()
            ->andReturn($order);

        $box->shouldReceive('userCards')
            ->zeroOrMoreTimes()
            ->andReturn($userCard);

        array_push($this->boxes, $box);
        array_push($this->cardsRelations, $userCard);
    }
}
