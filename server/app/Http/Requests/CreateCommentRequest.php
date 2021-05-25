<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'message' => 'required',
        ];
    }
}
