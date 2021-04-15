<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return $request->user();
    }
}
