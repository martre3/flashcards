<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InviteToGroupRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'identifier' => 'required',
        ];
    }
}
