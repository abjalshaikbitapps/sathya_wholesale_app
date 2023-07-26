<?php

namespace Marvel\Database\Repositories;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Exception;
use Illuminate\Support\Facades\Log;
use Marvel\Database\Models\Availability;
use Marvel\Database\Models\Threelp;
use Marvel\Database\Models\Resource;
use Marvel\Database\Models\Variation;
use Marvel\Enums\ProductType;
use Marvel\Exceptions\MarvelException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Prettus\Validator\Exceptions\ValidatorException;
use Spatie\Period\Boundaries;
use Spatie\Period\Period;
use Spatie\Period\Precision;

class ThreelpRepository extends BaseRepository
{
    /**
     * @var array
     */
    /**
     * Configure the Model
     **/
    public function model()
    {
        return Threelp::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeThreelp($request)
    {
        try {
            // return response()->json($request);
            $user = $this->create([
                'name'     => $request->name,
                // 'sub_name'    => $request->sub_name,
                'description' => $request->description,
                'image' => $request->image[0]['original'],
            ]);
            return $user;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

    public function updateThreelp($request, $user)

    {

        try {

            $name = NULL;

            $name = [];

            if (isset($request['name'])) {

                $name =

                ['name' =>$request['name']];

            }

            $sub_name = NULL;

            $sub_name = [];

            if (isset($request['sub_name'])) {

                $sub_name =

                ['sub_name' => $request['sub_name']];

            }

            $description = NULL;

            $description = [];

            if (isset($request['description'])) {

                $description =

                ['description' => $request['description']];

            }

            $image = NULL;

            $image = [];

            if (isset($request['image'])) {

                $image =

                ['image' => $request['image']];

            }

            

            $user->update($name);

            $user->update($sub_name);

            $user->update($description);

            $user->update($image);

            return $user;

        } catch (ValidationException $e) {

            throw new MarvelException(SOMETHING_WENT_WRONG);

        }

    }
}
