<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeckRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'isPublic' => 'required|boolean',
        ];
    }
}
