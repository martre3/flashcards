<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvitationToGroupRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'status' => 'required',
        ];
    }
}
