<?php

namespace Tests\Unit\Services;

use App\Models\Box;
use App\Models\UserDeckSubscription;
use App\Repositories\BoxRepository;
use App\Repositories\DeckRepository;
use App\Services\BoxPickerService;
use Illuminate\Support\Collection;
use Mockery\MockInterface;
use Tests\TestCase;

class BoxPickerServiceTest extends TestCase
{
    private BoxPickerService $service;
    private BoxRepository $boxRepository;
    private DeckRepository $deckRepository;
    private UserDeckSubscription $subscription;

    /**
     * @var array|Box[]|MockInterface[]
     */
    private array $boxes = [];

    protected function setUp(): void
    {
        $this->boxRepository = \Mockery::mock(BoxRepository::class);
        $this->deckRepository = \Mockery::mock(DeckRepository::class);
        $this->subscription = \Mockery::mock(UserDeckSubscription::class);

        $this->boxes = [];

        $this->createBox(1);
        $this->createBox(3);
        $this->createBox(5);
        $this->createBox(10);

        $boxCollection = \Mockery::mock(Collection::class);
        $boxCollection->shouldReceive('sortBy')->andReturn(collect($this->boxes));

        $this->boxRepository->shouldReceive('getNonEmptyBoxes')->andReturn($boxCollection);
        $this->deckRepository->shouldReceive('getSubscription')->andReturn($this->subscription);
        $this->service = new BoxPickerService($this->boxRepository, $this->deckRepository);

        parent::setUp();
    }

    protected function tearDown(): void
    {
        $this->addToAssertionCount(
            \Mockery::getContainer()->mockery_getExpectationCount()
        );

        parent::tearDown();
    }

    /**
     * @dataProvider testSuccessCases
     */
    public function testReturnsCorrectBox(int $timesSubmitted, int $expectedBox): void
    {
        $this->subscription->shouldReceive('getAttribute')
            ->with('timesSubmitted')
            ->andReturn($timesSubmitted);

        $this->assertEquals(
            $this->boxes[$expectedBox],
            $this->service->getNextBox('11', '22')
        );
    }

    /**
     * @dataProvider testFailCases
     */
    public function testReturnsWrongBox(int $timesSubmitted, int $expectedBox): void
    {
        $this->subscription->shouldReceive('getAttribute')
            ->with('timesSubmitted')
            ->andReturn($timesSubmitted);

        $this->assertNotEquals(
            $this->boxes[$expectedBox],
            $this->service->getNextBox('11', '22')
        );
    }

    /**
     * @return array
     */
    public function testSuccessCases(): array
    {
        return [
            [19, 3],
            [9, 2],
            [38, 3],
            [18, 2],
            [17, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 1],
            [5, 0],
            [180, 2],
        ];
    }

    /**
     * @return array
     */
    public function testFailCases(): array
    {
        return [
            [20, 3],
            [8, 2],
            [10, 2],
            [180, 1],
        ];
    }

    /**
     * @param int $interval
     */
    private function createBox(int $interval): void
    {
        $box = \Mockery::mock(Box::class);

        $box->shouldReceive('getAttribute')
            ->with('interval')
            ->zeroOrMoreTimes()
            ->andReturn($interval);

        array_push($this->boxes, $box);
    }
}
