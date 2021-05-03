<?php

namespace Tests\Unit\Services;

use App\Models\Card;
use App\Services\Auth\CardAnswersCheckerService;
use Tests\TestCase;

class CardAnswersCheckerTest extends TestCase
{
    private CardAnswersCheckerService $service;
    private Card $card;

    protected function setUp(): void
    {
        $this->service = new CardAnswersCheckerService();
        $this->card = \Mockery::mock(Card::class);
        $this->card->shouldReceive('getAttribute')
            ->with('correctAnswers')
            ->andReturn(['first', 'second', 'third']);

        parent::setUp();
    }

    /**
     * @dataProvider answersCases
     *
     * @param bool $isValid
     * @param array $answers
     */
    public function testValid(bool $isValid, array $answers): void
    {
        $this->assertEquals(
            $isValid,
            $this->service->answersValid($this->card, $answers),
        );
    }

    /**
     * @return array
     */
    public function answersCases(): array
    {
        return [
            [false, ['first', 'third']],
            [false, ['first', 'second', 'third', 'fourth']],
            [true, ['first', 'second', 'third']],
            [true, ['second', 'third', 'first']],
            [true, ['third', 'second', 'first']],
            [false, ['first', 'second', 'second']],
            [false, ['first']],
        ];
    }
}
