<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RateDeckRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'rating' => 'required|integer',
        ];
    }
}
