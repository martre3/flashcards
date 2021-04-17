<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetGroupDecksRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'ids.*' => 'exists:decks,_id',
        ];
    }
}
