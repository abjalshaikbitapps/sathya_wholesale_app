<?php

namespace Marvel\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Marvel\Database\Models\Product;
use Marvel\Database\Models\Profile;
use Marvel\Database\Models\Shop;
use Marvel\Database\Models\Threelp;
use Marvel\Database\Models\Wallet;
use Marvel\Database\Repositories\ThreelpRepository;
use Marvel\Enums\Permission;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\ChangePasswordRequest;
use Marvel\Http\Resources\UserResource;
use Marvel\Mail\ContactAdmin;
use Marvel\Otp\Gateways\OtpGateway;
use Marvel\Traits\WalletsTrait;
use Newsletter;

class ThreelpController extends CoreController
{
    use WalletsTrait;

public $repository;

    public function __construct(ThreelpRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    /**
     * Store a newly created resource in storage.
     *Í
     * @return bool[]
     */
    public function store($request)
    {
        return $this->repository->storeThreelp($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return array
     */

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @return array
     */
     protected $dataArray = [

         'name',
       
         'sub_name',
       
         'description',
       
         'image'
       
       
       
         ];
    public function update(Request $request,$id)
    {

        // return $this->repository->updateThreelp($request, $id);
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            $user = $this->repository->findOrFail($id);
            return $this->repository->updateThreelp($request, $user);
        } elseif ($request->user()->id == $id) {
            $user = $request->user();
            return $this->repository->updateThreelp($request, $user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @param Request $request
     * @return array
     */
    public function index(Request $request)
    {

        $limit = $request->limit ? $request->limit : 15;
        return $this->repository->paginate($limit);
    }

    
    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return array
     */
    public function show($id)
    {
        try {

            // return response()->json($id);

            return $this->repository->findOrFail($id);
        } catch (Exception $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }
    public function threelp(Request $request )
    {
        $data = $request->only($this->dataArray);
        if(isset($request['image']))
        {
            $data['image']=$request['image'];
        }
        $threelpc = $this->repository->create($data);
        $threelpc->save();
        return $threelpc;
    }

    
    public function treepllist(Request $request)
    {
        // return response()->json($request);
        // $admins = User::with(['profile', 'address', 'permissions'])
        // ->where('is_active', true)
        // ->whereRaw('(SELECT COUNT(*) FROM model_has_permissions mhp WHERE mhp.model_id = users.id) = 1 ')
        // ->whereHas('permissions', function ($query) {
        //     return $query->where('name', Permission::CUSTOMER);
        // })->get();
        // ->whereNotIn('name',[Permission::SUPER_ADMIN, Permission::STORE_OWNER])
        $limit = $request->limit ? $request->limit : 15;

        return $this->repository->paginate($limit);
        // return $this->repository->with(['profile', 'address', 'permissions'])->where('is_active', true)
        // ->where('deleteddate','=',null)
        // ->whereRaw('(SELECT COUNT(*) FROM model_has_permissions mhp WHERE mhp.model_id = users.id) = 1 ')
        // ->whereHas('permissions', function ($query) {
        //     return $query->where('name', Permission::CUSTOMER);
        // })->paginate($limit);
    }

    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }
}
