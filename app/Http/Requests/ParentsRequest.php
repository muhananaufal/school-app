<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ParentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $parentId = $this->route('parent') ?? $this->route('id');
        return [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'student_id' => [
                'required',
                'exists:students,id',
                Rule::unique('parents', 'student_id')->ignore($parentId),
            ],
        ];
    }
}
