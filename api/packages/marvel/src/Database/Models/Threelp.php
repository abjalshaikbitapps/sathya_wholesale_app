<?php

namespace Marvel\Database\Models;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Marvel\Traits\Excludable;
use Kodeine\Metable\Metable;
use Marvel\Exceptions\MarvelException;
use Marvel\Traits\TranslationTrait;


class Threelp extends Model
{

    // protected $guard_name = 'api';
    protected $table = 'threelp';
    protected $casts = [
         'image' => 'json',     

         ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'sub_name', 'description', 'image'
    ];
}
