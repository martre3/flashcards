<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Hashing\Hasher;

class UserService
{
    public function __construct(private Hasher $hasher, private UserRepository $userRepository) {}

    /**
     * @param array $data
     * @param string|null $password
     *
     * @return User
     */
    public function findOrCreate(array $data, string $password = null): User
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if ($user) {
            return $user;
        }

        $user = new User($data);

        if ($password) {
            $user->password = $this->hasher->make($password);
        }

        $user->save();

        return $user;
    }
}
