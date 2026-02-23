<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
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
        $id = $this->route('teacher');
        return [
            'nip' => 'required|string|max:255|unique:teachers,nip,' . $id,
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'classroom_id' => 'required|exists:classrooms,id',
        ];
    }
}
