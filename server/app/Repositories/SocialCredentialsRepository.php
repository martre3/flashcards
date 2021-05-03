<?php

namespace App\Repositories;

use App\Models\SocialCredentials;
use Illuminate\Database\Eloquent\Model;

class SocialCredentialsRepository
{
    /**
     * @param string $provider
     * @param string $id
     *
     * @return SocialCredentials
     */
    public function findOrCreate(string $provider, string $id): Model
    {
        return SocialCredentials::query()
            ->where('provider', '=', $provider)
            ->where('socialId', '=', $id)
            ->with('user')
            ->firstOrCreate([
                'provider' => $provider,
                'socialId' => $id,
            ]);
    }
}
