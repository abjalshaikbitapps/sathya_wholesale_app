<?php

namespace Marvel\Database\Repositories;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Marvel\Database\Models\User;
use Prettus\Validator\Exceptions\ValidatorException;
use Spatie\Permission\Models\Permission;
use Marvel\Enums\Permission as UserPermission;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Marvel\Mail\ForgetPassword;
use Illuminate\Support\Facades\Mail;
use Marvel\Database\Models\Address;
use Marvel\Database\Models\Profile;
use Marvel\Database\Models\Shop;
use Marvel\Exceptions\MarvelException;

class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name' => 'like',
        'email' => 'like',
    ];

    /**
     * @var array
     */
    protected $dataArray = [
        'name',
        'email',
        'shop_id',
         'Role',
        'deletedBy'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeUser($request)
    {
        try {
            $user = $this->create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user->givePermissionTo(UserPermission::CUSTOMER);
            if (isset($request['address']) && count($request['address'])) {
                $user->address()->createMany($request['address']);
            }
            if (isset($request['profile'])) {
                $user->profile()->create($request['profile']);
            }
            $user->profile = $user->profile;
            $user->address = $user->address;
            $user->shop = $user->shop;
            $user->managed_shop = $user->managed_shop;
            return $user;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

    public function updateUser($request, $user)
    {
        try {
            if (isset($request['address']) && count($request['address'])) {
                foreach ($request['address'] as $address) {
                    if (isset($address['id'])) {
                        Address::findOrFail($address['id'])->update($address);
                    } else {
                        $address['customer_id'] = $user->id;
                        Address::create($address);
                    }
                }
            }
            if (isset($request['profile'])) {
                if (isset($request['profile']['id'])) {
                    Profile::findOrFail($request['profile']['id'])->update($request['profile']);
                } else {
                    $profile = $request['profile'];
                    $profile['customer_id'] = $user->id;
                    Profile::create($profile);
                }
            }
            $license = NULL;
            $business_license = [];
            if (isset($request['business_license'][0]['original'])) {
                $business_license = 
                ['business_license' =>$request['business_license'][0]['original']];
            }
            $password = NULL;
            $password= [];
           
            $name= NULL;
            $name= [];
            if (isset($request['name'])) {
                $name = 
                ['name' =>$request['name']];
            }
            $tobaccolicense = NULL;
            $tobacco_license = [];
            if (isset($request['tobacco_license'][0]['original'])) {
                $tobacco_license = 
                ['tobacco_license' => $request['tobacco_license'][0]['original']];
            }
            $phonenumber = NULL;
            $phone_number = [];
            if (isset($request['phonenumber'])) {
                $phone_number = 
                ['phone_number' => $request['phonenumber']];
            }
            $businesslicenseverify = NULL;
            $business_license_verify = [];
            if (isset($request['businessLicenseVerify'])) {
                $business_license_verify = 
                ['business_license_verify' => $request['businessLicenseVerify']];
            }
            $tobaccolincenseverify = NULL;
            $tobacco_license_verify = [];
            if (isset($request['tobaccoLicenseVerify'])) {
                $tobacco_license_verify = 
                ['tobacco_license_verify' => $request['tobaccoLicenseVerify']];
            }
            $businesslicensereason = NULL;
            $business_license_reason = [];
            if (isset($request['businessLicenseReason'])) {
                $business_license_reason = 
                ['business_license_reason' => $request['businessLicenseReason']];
            }
            $tobaccolicensereason = NULL;
            $tobacco_license_reason = [];
            if (isset($request['tobaccoLicenseReason'])) {
                $tobacco_license_reason = 
                ['tobacco_license_reason' => $request['tobaccoLicenseReason']];
            }
             if (isset($request['deletedDate'])) {
                $deltedate = ['deleteddate' => $request['deletedDate']];
                $user->update($deltedate);
            }
            $deletedby=NULL;
            if (isset($request['deletedby'])) {
                $deletedby = ['deletedBy' => $request->user()->id];
            }
            if (isset($request['password'])) {
                $user->password = Hash::make($request->password);
                $user->save();
            }
            $permission=Null;
            if (isset($request['permission'])) {
                $user->givePermissionTo($request->permission);
            }
            $role = NULL;
            $role = [];
            if (isset($request['permission'])) {
                $role = 
                ['role' => $request['permission']];
            }

            $user->update($business_license);
            $user->update($name);
            $user->update($phone_number);
            $user->update($tobacco_license);
            $user->update($phone_number);
            $user->update($business_license_verify);
            $user->update($tobacco_license_verify);
            $user->update($business_license_reason);
            $user->update($tobacco_license_reason);
            $user->update($role);
            $user->update($request->only($this->dataArray));

            $user->profile = $user->profile;
            // $user = Address::where('email', $request->email)->where('id', $request->address->id)->first();
            $user->address = $user->address;
            $user->shop = $user->shop;
            $user->managed_shop = $user->managed_shop;               
            
            return $user;
        } catch (ValidationException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

    public function sendResetEmail($email, $token)
    {
        try {
            Mail::to($email)->send(new ForgetPassword($token));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
