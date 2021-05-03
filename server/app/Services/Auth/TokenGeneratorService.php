<?php

namespace App\Services\Auth;

use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Token\Plain;

class TokenGeneratorService
{
    public function __construct(private Configuration $configuration) {}

    /**
     * @param string $userId
     *
     * @return Plain
     */
    public function generate(string $userId): Plain
    {
        return $this->configuration->builder()
            ->identifiedBy('4f1g23a12aa')
            ->issuedBy('localhost')
            ->withHeader('foo', 'bar')
            ->issuedAt(new \DateTimeImmutable())
            ->withClaim('uid', $userId)
            ->getToken($this->configuration->signer(), $this->configuration->signingKey());
    }
}
