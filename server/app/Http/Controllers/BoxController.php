<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Box;
use App\Models\Deck;
use App\Models\User;
use App\Repositories\BoxRepository;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\JsonResponse;
use Lcobucci\JWT\Configuration;
use Symfony\Component\HttpFoundation\Request;

class BoxController extends Controller
{
    public function __construct(private BoxRepository $boxRepository) {}

    public function list()
    {
        return Box::query()->orderBy('order')->get();
    }

    /**
     * @return JsonResponse
     */
    public function create(Request $request, Box $box)
    {
        return $box->fill(['interval' => 1, 'order' => 1])->save();
    }

    public function update(Request $request, Box $box)
    {
        return $box->update($request->toArray());
    }
}
