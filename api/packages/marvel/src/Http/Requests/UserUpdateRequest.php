<?php


namespace Marvel\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'   => ['email'],
            'shop_id' => ['nullable', 'exists:Marvel\Database\Models\Shop,id'],
            'profile' => ['array'],
            'address' => ['array'],
            // 'shop' => ['array'],
        ];
    }

    /**
     * Get the error messages that apply to the request parameters.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.email'        => 'email is not a valid email address',
            'email.unique:users' => 'email must be unique',
            'address.array'      => 'address is not a valid json',
            'profile.array'      => 'profile is not a valid json',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
