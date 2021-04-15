<?php

namespace App\Providers;

use App\Auth\JwtGuard;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        $this->app->singleton(Configuration::class, function ($app) {
            return Configuration::forSymmetricSigner(
                new Sha256(),
                InMemory::base64Encoded('mBC5v1sOKVvbdEitdSBenu59nfNfhwkedkJVNabosTw=')
        );
        });

        Auth::extend('jwt', function ($app, $name, array $config) {
            return new JwtGuard(Auth::createUserProvider($config['provider']), $app['request'], app(Configuration::class));
        });
    }
}
