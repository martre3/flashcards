<?php

namespace App\Services\Auth;

use App\Exceptions\InvalidSocialTokenException;
use App\Models\User;
use App\Repositories\SocialCredentialsRepository;
use Laravel\Socialite\SocialiteManager;

class SocialAuthService
{
    public function __construct(
        private SocialiteManager $socialite,
        private SocialCredentialsRepository $credentialsRepository,
        private UserService $userService,
    ) {}

    /**
     * @param string $provider
     * @param string $token
     *
     * @return User
     *
     * @throws InvalidSocialTokenException
     */
    public function getOrCreate(string $provider, string $token): User
    {
        $socialUser = $this->socialite->driver($provider)->userFromToken($token);

        if (!$socialUser) {
            throw new InvalidSocialTokenException();
        }

        $credentials = $this->credentialsRepository->findOrCreate($provider, $socialUser->id);

        if (!$credentials->user) {
            $credentials->user()
                ->associate($this->userService->findOrCreate([
                    'email' => $socialUser->email,
                    'name' => $socialUser->name,
                    ]
                ));

            $credentials->save();
        }

        return $credentials->user;
    }
}
