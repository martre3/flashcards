<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDeckStatusRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'active' => 'required|boolean',
        ];
    }
}
