<?php

namespace App\Providers;

use App\Listeners\AssignUserToGroup;
use App\Models\GroupInvitation;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $listen = [];

    /**
     * @return void
     */
    public function boot(): void
    {
        GroupInvitation::updated(AssignUserToGroup::class);
    }
}
