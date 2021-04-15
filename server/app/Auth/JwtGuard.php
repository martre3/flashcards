<?php

namespace App\Auth;

use Illuminate\Validation\ValidationData;
use Lcobucci\JWT\Configuration;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Illuminate\Auth\GuardHelpers;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Lcobucci\JWT\UnencryptedToken;

class JwtGuard implements Guard
{
    use GuardHelpers;

    /**
     * @param UserProvider $provider
     * @param Request $request
     * @param Configuration $configuration
     * @param string $key
     */
    public function __construct(
        UserProvider $provider,
        private Request $request,
        private Configuration $config,
        private $key = 'Authorization')
    {
        $this->provider = $provider;
    }

    /**
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        if (! is_null($this->user)) {
            return $this->user;
        }

        $parts = explode(' ', $this->request->header($this->key));

        if (count($parts) !== 2) {
            return null;
        }

        try {
            /**
             * @var $token UnencryptedToken
             */
            $token = $this->config->parser()->parse($parts[1]);

            return $this->user = $this->provider->retrieveById($token->claims()->get('uid'));
        } catch (InvalidArgumentException $exception) {
            return null;
        }
    }

    /**
     * Validate a user's credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {
        if (empty($credentials['id'])) {
            return false;
        }

        if ($this->provider->retrieveById($credentials['id'])) {
            return true;
        }

        return false;
    }
}
