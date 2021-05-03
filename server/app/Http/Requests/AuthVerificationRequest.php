<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuthVerificationRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'provider' => [
              'required',
              Rule::in(['google']),
            ],
            'token' => 'required',
        ];
    }
}
