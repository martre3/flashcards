<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\JsonResponse;
use Lcobucci\JWT\Configuration;

class AuthController extends Controller
{
    /**
     * @param Hasher $hasher
     */
    public function __construct(private Hasher $hasher) {}

    /**
     * @param CreateUserRequest $request
     * @param User $user
     *
     * @return JsonResponse
     */
    public function register(CreateUserRequest $request, User $user): JsonResponse
    {
        $user->fill($request->validated());
        $user->password = $this->hasher->make($request->get('password'));
        $user->save();

        return response()->json([], 201);
    }

    /**
     * @param LoginRequest $request
     * @param Configuration $config
     *
     * @return JsonResponse
     */
    public function login(LoginRequest $request, Configuration $config)
    {
        $user = User::query()->where('email', '=', $request->get('email'))->first();

        if (!$user || !$this->hasher->check($request->get('password'), $user->password)) {
            return response()->json(['message' => 'Incorrect credentials'], 401);
        }

        $token = $config->builder()
            ->identifiedBy('4f1g23a12aa')
            ->issuedBy('localhost')
            ->withHeader('foo', 'bar')
            ->issuedAt(new \DateTimeImmutable())
            ->withClaim('uid', $user->_id)
            ->getToken($config->signer(), $config->signingKey());

        return response()->json([
            'user' => $user,
            'jwt' => $token->toString(),
        ]);
    }
}
