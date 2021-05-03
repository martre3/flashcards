<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidSocialTokenException;
use App\Http\Requests\AuthVerificationRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Auth\SocialAuthService;
use App\Services\Auth\TokenGeneratorService;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(
        private TokenGeneratorService $tokenGeneratorService,
        private UserRepository $userRepository,
        private Hasher $hasher
    ) {}

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
     *
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $user = $this->userRepository->findByEmail($request->get('email'));

        if (!$user || !$this->hasher->check($request->get('password'), $user->password)) {
            return new JsonResponse(['message' => 'Incorrect credentials'], 401);
        }

        return $this->getTokenResponse($user);
    }

    /**
     * @param AuthVerificationRequest $request
     * @param SocialAuthService $authService
     *
     * @return JsonResponse
     */
    public function access(AuthVerificationRequest $request, SocialAuthService $authService): JsonResponse
    {
        try {
            $user = $authService->getOrCreate($request->get('provider'), $request->get('token'));

            return $this->getTokenResponse($user);
        } catch (InvalidSocialTokenException $e) {
            return new JsonResponse(['message' => 'Invalid token'], 422);
        }
    }

    /**
     * @param User $user
     *
     * @return JsonResponse
     */
    private function getTokenResponse(User $user): JsonResponse
    {
        return new JsonResponse([
            'user' => $user,
            'jwt' => $this->tokenGeneratorService->generate($user->_id)->toString(),
        ]);
    }
}
