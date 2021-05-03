<?php

namespace Tests;

use Mockery\Adapter\Phpunit\MockeryTestCase;

abstract class TestCase extends MockeryTestCase
{
    use CreatesApplication;

    protected function tearDown(): void {
        \Mockery::close();
    }
}
