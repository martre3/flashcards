<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
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
            'question' => 'string|nullable',
            'type' => 'required|in:single,single-look,multiple,test',
            'correctAnswers' => 'array',
            'possibleAnswers' => 'array'
        ];
    }
}
