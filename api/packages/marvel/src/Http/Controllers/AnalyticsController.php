<?php

namespace Marvel\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Marvel\Database\Models\Shop;
use Marvel\Database\Repositories\AddressRepository;
use Marvel\Enums\OrderStatus;
use Marvel\Enums\Permission;
use Marvel\Exceptions\MarvelException;
use Spatie\Permission\Models\Permission as ModelsPermission;
use DateTime;
use \stdClass;


class AnalyticsController extends CoreController
{
    public $repository;

    public function __construct(AddressRepository $repository)
    {
        $this->repository = $repository;
    }
    public function analyticYear(Request $request)
    {
        $user = $request->user();
        if ($user && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER))) {
            // $dbRevenueQuery = DB::table('orders as A')
            //     ->whereDate('A.created_at', '>', $request->fromDate)
            //     ->whereDate('A.created_at', '<', $request->toDate)

            //     ->where('A.order_status', OrderStatus::COMPLETED)
            //     ->where('A.parent_id', '!=', null)
            //     ->join('orders as B', 'A.parent_id', '=', 'B.id')
            //     ->where('B.order_status', OrderStatus::COMPLETED)
            //     ->select(
            //         'A.id',
            //         'A.parent_id',
            //         'A.paid_total',
            //         'B.delivery_fee',
            //         'B.sales_tax',
            //         'A.created_at')->get();

            // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            //     $totalRevenue = $dbRevenueQuery->sum('paid_total') +
            //         $dbRevenueQuery->unique('parent_id')->sum('delivery_fee') + $dbRevenueQuery->unique('parent_id')->sum('sales_tax');
            // }

            // $totalRefundQuery = DB::table('refunds')->whereDate('created_at', '>', Carbon::now()->subDays(30));
            // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            //     $totalRefunds = $totalRefundQuery->where('shop_id', null)->sum('amount');
            // }
            // else {
            //     $totalRevenue = $totalRevenueQuery->where('shop_id', '=', $user->id)->sum('paid_total');
            // }

           $todaysRevenueQuery =  DB::table('orders as A')
                    ->whereDate('A.created_at', '>',$request->fromDate)
                    ->whereDate('A.created_at', '<',$request->toDate)
                    ->where('A.order_status', OrderStatus::COMPLETED)
                    ->where('A.parent_id', '!=', null)
                    ->join('orders as B', 'A.parent_id', '=', 'B.id')
                    ->where('B.order_status', OrderStatus::COMPLETED)
                    ->select(
                        'A.id',
                        'A.parent_id',
                        'A.paid_total',
                        'B.delivery_fee',
                        'B.sales_tax',
                        'A.created_at')->get();

            // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            //     $todaysRevenue =  $todaysRevenueQuery->sum('paid_total') +
            //         $todaysRevenueQuery->unique('parent_id')->sum('delivery_fee') + $todaysRevenueQuery->unique('parent_id')->sum('sales_tax');
            // }
            // else {
            //     $todaysRevenue = $todaysRevenueQuery->where('shop_id', '=', $user->id)->sum('paid_total');
            // }
            // $totalOrdersQuery = DB::table('orders')->whereDate('created_at', '>', $request->fromDate)
            // ->whereDate('created_at', '<', $request->toDate);
            // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            //     $totalOrders = $totalOrdersQuery->where('parent_id', null)->count();
            // }
            //  else {
            //     $totalOrders = $totalOrdersQuery->where('shop_id', '=', $user->id)->count();
            // }
            // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            //     $totalShops = Shop::count();
            // } else {
            //     $totalShops = Shop::where('owner_id', '=', $user->id)->count();
            // }
            // $customerPermission = ModelsPermission::where('name', Permission::CUSTOMER)->first();
            // $newCustomers = $customerPermission->users()->whereDate('created_at', '>', Carbon::now()->subDays(30))->count();
            $newYearSaleByMonthQuery=[];
            if($request['type']=='Year')
            {

                $newYearSaleByMonthQuery =
                DB::table('orders as A')
                    ->select(
                        'A.id',
                        'A.parent_id',
                        'A.payment_status',
                        'A.payment_gateway',
                        'A.payment_status',
                        'A.paid_total',
                        'A.created_at',
                        'A.shop_id',
                    )
                    ->join('orders as B', 'A.parent_id', '=', 'B.id')
                    ->where('A.order_status', OrderStatus::COMPLETED)
                    ->where('A.parent_id', '!=', null)
                    
                    ->where('B.order_status', OrderStatus::COMPLETED)
                  
                    ->whereDate('A.created_at', '>',$request->fromDate)
                    ->whereDate('A.created_at', '<',$request->toDate)
                 ->selectRaw(
                        // "DATE_FORMAT(A.created_at,'%M') as month",
                        // "DATE_FORMAT(A.created_at,'%Y') as year",
                        'YEAR(A.created_at) as year, MONTH(A.created_at) as month,COUNT(*) as total_sales'

                    )
                    // ->whereYear('A.created_at', date('Y'))
                    // >groupBy('year,month')
                    ->get()->groupBy('year','month');


            }
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                // $totalYearSaleByMonth = $newYearSaleByMonthQuery->groupBy('year');
                $totalYearSaleByMonth= $newYearSaleByMonthQuery;
            } else {
                $totalYearSaleByMonth = $newYearSaleByMonthQuery->where('shop_id', '=', $user->id)->groupBy('month')->get();

                $monthlySalesTax = collect(['January' => 0, 'February' => 0, 'March' => 0, 'April' => 0, 'May' => 0, 'June' => 0, 'July' => 0, 'August' => 0, 'September' => 0, 'October' => 0, 'November' => 0, 'December' => 0]);
                $monthlyDeliveryFee = collect(['January' => 0, 'February' => 0, 'March' => 0, 'April' => 0, 'May' => 0, 'June' => 0, 'July' => 0, 'August' => 0, 'September' => 0, 'October' => 0, 'November' => 0, 'December' => 0]);
            }
            $months = [
                1=> "January",
                2=> "February",
                3=> "March",
                4=> "April",
                 5=>"May",
                 6=>"June",
                 7=>"July",
                 8=>"August",
                 9=>"September",
                 10=>"October",
                 11=>"November",
                 12=>"December",
             ];
            $processedData = [];
            $monthlySaleOnly = [];    
            $yearwise=[];

            foreach ($totalYearSaleByMonth as $key => $value) {
                // return response()->json('hello');
          
                $resarr=$value->groupBy('month');
                foreach ($resarr as $keyres => $valueres)
                {
                    $myObject = new stdClass();
                    $myObject->amount = $valueres->sum('paid_total');
                    $myObject->count = $valueres->sum('total_sales');
                    $monthlySaleOnly[$keyres] =$myObject ;
                }
               
                $yearwise[$key]=$monthlySaleOnly;
            }
            // return response()->json($yearwise);
            //old code
            // foreach ($totalYearSaleByMonth as $key => $value) {
            //     $tax = 0;
            //     $deliveryFee = 0;
            //     if (isset($monthlySalesTax[$key])) {
            //         $tax = $monthlySalesTax[$key];
            //     }
            //     if (isset($monthlyDeliveryFee[$key])) {
            //         $deliveryFee = $monthlyDeliveryFee[$key];
            //     }
            //     $monthlySaleOnly[$key] = $value->sum('paid_total')+ $tax + $deliveryFee;
            // }
               $array=[];
               $collection=collect($array);
               foreach ($yearwise as $keyyearwise => $valueyr) {
                $processedData=[];
                foreach ($months as $key => $month) {
                    foreach ($valueyr as $keyMonth => $value) {
                        // return response()->json($month);
                        if ($keyMonth === $key) {
                            $processedData[$key] = ['total' => $value->amount, 'month' => $month.$keyyearwise,'count'=>$value->count];
                        }
                        else
                        {
                            $processedData[$key] = ['total' => 0, 'month' => $month.$keyyearwise,'count'=>0];
                        }
                    }
                }
                // foreach ($months as $key => $month) {
                //     if (!isset($processedData[$key])) {
                //         $processedData[$key] = ['total' => 0, 'month' => $month];
                //     }
                // }
                $collection->push(...$processedData);
               }
               return $collection;

    }
}

public function analyticMonth(Request $request)
{
    $user = $request->user();
    if ($user && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER))) {
       

       $todaysRevenueQuery =  DB::table('orders as A')
                ->whereDate('A.created_at', '>',$request->fromDate)
                ->whereDate('A.created_at', '<',$request->toDate)
                ->where('A.order_status', OrderStatus::COMPLETED)
                ->where('A.parent_id', '!=', null)
                ->join('orders as B', 'A.parent_id', '=', 'B.id')
                ->where('B.order_status', OrderStatus::COMPLETED)
                ->select(
                    'A.id',
                    'A.parent_id',
                    'A.paid_total',
                    'B.delivery_fee',
                    'B.sales_tax',
                    'A.created_at')->get();

     
        $newYearSaleByMonthQuery=[];
        if($request['type']=='Month'||$request['type']=='Week')
        {

            $newYearSaleByMonthQuery =
            DB::table('orders as A')
                ->select(
                    'A.id',
                    'A.parent_id',
                    'A.payment_status',
                    'A.payment_gateway',
                    'A.payment_status',
                    'A.paid_total',
                    'A.created_at',
                    'A.shop_id',
                )
                ->join('orders as B', 'A.parent_id', '=', 'B.id')
                ->where('A.order_status', OrderStatus::COMPLETED)
                ->where('A.parent_id', '!=', null)
                
                ->where('B.order_status', OrderStatus::COMPLETED)
              
                ->whereDate('A.created_at', '>',$request->fromDate)
                ->whereDate('A.created_at', '<',$request->toDate)
             ->selectRaw(
                    // "DATE_FORMAT(A.created_at,'%M') as month",
                    // "DATE_FORMAT(A.created_at,'%Y') as year",
                    'DATE(A.created_at) as date,COUNT(*) as total_sales'

                )
                // ->whereYear('A.created_at', date('Y'))
                // >groupBy('year,month')
                ->get()->groupBy('date');
                $processedData = [];
                    $monthlySaleOnly = [];
                  //   return response()->json($newYearSaleByMonthQuery);
  
                    foreach ($newYearSaleByMonthQuery as $key => $value) {
  
                        $monthlySaleOnly[$key] = $value->sum('paid_total');
                    }
                    // return response()->json($monthlySaleOnly);
                //    $var= getDateRangeData($request->fromDate,$request->toDate,$monthlySaleOnly);
                $dateRangeData = [];
    // Create Carbon instances for the start and end dates
    $start = Carbon::parse($request->fromDate);
    $end = Carbon::parse($request->toDate);

    // Iterate through each date within the range

    while ($start->lte($end)) {
        $formattedDate = $start->format('Y-m-d');
        // foreach ($monthlySaleOnly as $keyMonth => $value) {
        // Check if data exists for the current date
        if (isset($monthlySaleOnly[$formattedDate])) {
            $dateRangeData[$formattedDate] = ['total' => $monthlySaleOnly[$formattedDate], 'month' => $formattedDate];
        } else {
            $dateRangeData[$formattedDate] = ['total' => 0, 'month' => $formattedDate];
        }
    // }

        // Move to the next day
        $start->addDay();
    }
                    

            }
            $processedData = [];
            $i=0;
            foreach($dateRangeData as $key => $value)
            {
                $processedData[$i]=$value;
                $i++;
            }
            return  $processedData;
            //   return response()->json($newYearSaleByMonthQuery);

        

}
}

public function analyticWeek(Request $request)
{
    $user = $request->user();
    if ($user && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER))) {
     

       $todaysRevenueQuery =  DB::table('orders as A')
                ->whereDate('A.created_at', '>',$request->fromDate)
                ->whereDate('A.created_at', '<',$request->toDate)
                ->where('A.order_status', OrderStatus::COMPLETED)
                ->where('A.parent_id', '!=', null)
                ->join('orders as B', 'A.parent_id', '=', 'B.id')
                ->where('B.order_status', OrderStatus::COMPLETED)
                ->select(
                    'A.id',
                    'A.parent_id',
                    'A.paid_total',
                    'B.delivery_fee',
                    'B.sales_tax',
                    'A.created_at')->get();

      
        $newYearSaleByMonthQuery=[];
        if($request['type']=='Week')
            {

                $newYearSaleByMonthQuery =
                DB::table('orders as A')
                    ->select(
                        'A.id',
                        'A.parent_id',
                        'A.payment_status',
                        'A.payment_gateway',
                        'A.payment_status',
                        'A.paid_total',
                        'A.created_at',
                        'A.shop_id',
                    )
                    ->join('orders as B', 'A.parent_id', '=', 'B.id')
                    // ->where('A.order_status', OrderStatus::COMPLETED)
                    ->where('A.parent_id', '!=', null)
                    
                    // ->where('B.order_status', OrderStatus::COMPLETED)
                  
                    ->whereDate('A.created_at', '>',$request->fromDate)
                    ->whereDate('A.created_at', '<',$request->toDate)
                 ->selectRaw(
                        
                        'DATE(A.created_at) as date,COUNT(*) as total_sales'

                    )
                    
                    ->get()->groupBy('date');
                    $processedData = [];
                    $monthlySaleOnly = [];
                  //   return response()->json($newYearSaleByMonthQuery);
  
                    foreach ($newYearSaleByMonthQuery as $key => $value) {
  
                        $monthlySaleOnly[$key] = $value->sum('paid_total');
                    }
                    // return response()->json($monthlySaleOnly);
                //    $var= getDateRangeData($request->fromDate,$request->toDate,$monthlySaleOnly);
                $dateRangeData = [];
    // Create Carbon instances for the start and end dates
    $start = Carbon::parse($request->fromDate);
    $end = Carbon::parse($request->toDate);

    // Iterate through each date within the range

    while ($start->lte($end)) {
        $formattedDate = $start->format('Y-m-d');
        // foreach ($monthlySaleOnly as $keyMonth => $value) {
        // Check if data exists for the current date
        if (isset($monthlySaleOnly[$formattedDate])) {
            $dateRangeData[$formattedDate] = ['total' => $monthlySaleOnly[$formattedDate], 'month' => $formattedDate];
        } else {
            $dateRangeData[$formattedDate] = ['total' => 0, 'month' => $formattedDate];
        }
    // }

        // Move to the next day
        $start->addDay();
    }
                    

            }
            $processedData = [];
            $i=0;
            foreach($dateRangeData as $key => $value)
            {
                $processedData[$i]=$value;
                $i++;
            }
            return  $processedData;

}
}

function getDateRangeData($startDate, $endDate, $data)
{
    
    return response()->json($dateRangeData);
    return $dateRangeData;
}
    public function analytictoday(Request $request)
    {
        $user = $request->user();
        if ($user && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER))) {

           $todaysRevenueQuery =  DB::table('orders as A')
                    ->whereDate('A.created_at', '>',$request->fromDate)
                    ->whereDate('A.created_at', '<',$request->toDate)
                    ->where('A.order_status', OrderStatus::COMPLETED)
                    ->where('A.parent_id', '!=', null)
                    ->join('orders as B', 'A.parent_id', '=', 'B.id')
                    ->where('B.order_status', OrderStatus::COMPLETED)
                    ->select(
                        'A.id',
                        'A.parent_id',
                        'A.paid_total',
                        'B.delivery_fee',
                        'B.sales_tax',
                        'A.created_at')->get();

            $newYearSaleByMonthQuery=[];
            if($request['type']=='Today')
            {
               $newYearSaleByMonthQuery =
               DB::table('orders as A')
                   ->select(
                       'A.id',
                       'A.parent_id',
                       'A.payment_status',
                       'A.payment_gateway',
                       'A.payment_status',
                       'A.paid_total',
                       'A.created_at',
                       'A.shop_id',
                   )
                   ->join('orders as B', 'A.parent_id', '=', 'B.id')
                   ->where('A.order_status', OrderStatus::COMPLETED)
                   ->where('A.parent_id', '!=', null)
                   
                   ->where('B.order_status', OrderStatus::COMPLETED)
                 
                   ->whereDate('A.created_at', '>',$request->fromDate)
                   ->whereDate('A.created_at', '<',$request->toDate)
                ->selectRaw(
                       // "DATE_FORMAT(A.created_at,'%M') as month",
                       // "DATE_FORMAT(A.created_at,'%Y') as year",
                       'HOUR(A.created_at) as hour'

                   )
                   // ->whereYear('A.created_at', date('Y'))
                   // >groupBy('year,month')
                   ->get()->groupBy('hour');
            }
            // if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            //     $totalYearSaleByMonth = $newYearSaleByMonthQuery->groupBy('hour');
            // } else {
            //     $totalYearSaleByMonth = $newYearSaleByMonthQuery->where('shop_id', '=', $user->id)->groupBy('hour')->get();

            //       }
                  $processedData = [];
                  $monthlySaleOnly = [];
                //   return response()->json($newYearSaleByMonthQuery);

                  foreach ($newYearSaleByMonthQuery as $key => $value) {

                      $monthlySaleOnly[$key] = $value->sum('paid_total');
                  }
                  
                  for ($hour = 0; $hour <= 23; $hour++) {
                    foreach ($monthlySaleOnly as $keyMonth => $value) {
                    $hourval = str_pad($hour, 2, '0', STR_PAD_LEFT); // Pad single-digit hours with leading zeros
                
                    // Check if data exists for the current hour
                    if ($keyMonth==$hourval) {
                        $processedData[$hour] = ['total' => $value, 'month' => $hourval];
                    } else {
                        $processedData[$hour] = ['total' => 0, 'month' => $hour];
                    }
                }
                }
                // $array=[];
                // $collection=collect($array);
                // $collection->push(...$processedData);
                return 
                   $processedData
                ;
        }
    }


    public function analytics(Request $request)
    {
        $user = $request->user();
        if ($user && ($user->hasPermissionTo(Permission::SUPER_ADMIN) || $user->hasPermissionTo(Permission::STORE_OWNER))) {
            $dbRevenueQuery = DB::table('orders as A')
                ->whereDate('A.created_at', '>', Carbon::now()->subDays(30))
                ->where('A.order_status', OrderStatus::COMPLETED)
                ->where('A.parent_id', '!=', null)
                ->join('orders as B', 'A.parent_id', '=', 'B.id')
                ->where('B.order_status', OrderStatus::COMPLETED)
                ->select(
                    'A.id',
                    'A.parent_id',
                    'A.paid_total',
                    'B.delivery_fee',
                    'B.sales_tax',
                    'A.created_at')->get();

            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalRevenue = $dbRevenueQuery->sum('paid_total') +
                    $dbRevenueQuery->unique('parent_id')->sum('delivery_fee') + $dbRevenueQuery->unique('parent_id')->sum('sales_tax');
            }

            $totalRefundQuery = DB::table('refunds')->whereDate('created_at', '>', Carbon::now()->subDays(30));
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalRefunds = $totalRefundQuery->where('shop_id', null)->sum('amount');
            }
            // else {
            //     $totalRevenue = $totalRevenueQuery->where('shop_id', '=', $user->id)->sum('paid_total');
            // }

           $todaysRevenueQuery =  DB::table('orders as A')
                    ->whereDate('A.created_at', '>', Carbon::now()->subDays(1))
                    ->where('A.order_status', OrderStatus::COMPLETED)
                    ->where('A.parent_id', '!=', null)
                    ->join('orders as B', 'A.parent_id', '=', 'B.id')
                    ->where('B.order_status', OrderStatus::COMPLETED)
                    ->select(
                        'A.id',
                        'A.parent_id',
                        'A.paid_total',
                        'B.delivery_fee',
                        'B.sales_tax',
                        'A.created_at')->get();

            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $todaysRevenue =  $todaysRevenueQuery->sum('paid_total') +
                    $todaysRevenueQuery->unique('parent_id')->sum('delivery_fee') + $todaysRevenueQuery->unique('parent_id')->sum('sales_tax');
            }
            // else {
            //     $todaysRevenue = $todaysRevenueQuery->where('shop_id', '=', $user->id)->sum('paid_total');
            // }
            $totalOrdersQuery = DB::table('orders')->whereDate('created_at', '>', Carbon::now()->subDays(30));
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalOrders = $totalOrdersQuery->where('parent_id', null)->count();
            }
            //  else {
            //     $totalOrders = $totalOrdersQuery->where('shop_id', '=', $user->id)->count();
            // }
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalShops = Shop::count();
            } else {
                $totalShops = Shop::where('owner_id', '=', $user->id)->count();
            }
            $customerPermission = ModelsPermission::where('name', Permission::CUSTOMER)->first();
            $newCustomers = $customerPermission->users()->whereDate('created_at', '>', Carbon::now()->subDays(30))->count();
            $newYearSaleByMonthQuery =
                DB::table('orders as A')
                    ->where('A.order_status', OrderStatus::COMPLETED)
                    ->where('A.parent_id', '!=', null)
                    ->join('orders as B', 'A.parent_id', '=', 'B.id')
                    ->where('B.order_status', OrderStatus::COMPLETED)
                    ->select(
                        'A.id',
                        'A.parent_id',
                        'A.payment_status',
                        'A.payment_gateway',
                        'A.payment_status',
                        'A.paid_total',
                        'A.created_at',
                        'A.shop_id',
                    )
                    ->selectRaw(
                        "
                         DATE_FORMAT(A.created_at,'%M') as month",
                    )->whereYear('A.created_at', date('Y'))->get();


            $calculateDeliveryFee = DB::table('orders as A')
                ->where('A.order_status', OrderStatus::COMPLETED)
                ->where('A.parent_id', null)
                ->join('orders as B', 'A.id', '=', 'B.parent_id')
                ->where('B.order_status', OrderStatus::COMPLETED)
                ->whereYear('A.created_at', date('Y'))
                ->select(
                    'A.id',
                    'A.parent_id',
                    'A.payment_status',
                    'A.payment_gateway',
                    'A.paid_total',
                    'A.delivery_fee',
                    'A.sales_tax',
                    'A.created_at',
                    'A.shop_id',

                )
                ->groupBy('A.id')
                ->selectRaw(
                    "DATE_FORMAT(A.created_at,'%M') as month",
                )
                ->get()->groupBy('month');
            $monthlyDeliveryFee = [];
            $monthlySalesTax = [];
            foreach ($calculateDeliveryFee as $key => $value) {
                $monthlyDeliveryFee[$key] = $value->sum('delivery_fee');
                $monthlySalesTax[$key] = $value->sum('sales_tax');
            }
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                $totalYearSaleByMonth = $newYearSaleByMonthQuery->groupBy('month');
            } else {
                $totalYearSaleByMonth = $newYearSaleByMonthQuery->where('shop_id', '=', $user->id)->groupBy('month')->get();

                $monthlySalesTax = collect(['January' => 0, 'February' => 0, 'March' => 0, 'April' => 0, 'May' => 0, 'June' => 0, 'July' => 0, 'August' => 0, 'September' => 0, 'October' => 0, 'November' => 0, 'December' => 0]);
                $monthlyDeliveryFee = collect(['January' => 0, 'February' => 0, 'March' => 0, 'April' => 0, 'May' => 0, 'June' => 0, 'July' => 0, 'August' => 0, 'September' => 0, 'October' => 0, 'November' => 0, 'December' => 0]);
            }

            $months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            $processedData = [];
            $monthlySaleOnly = [];
            foreach ($totalYearSaleByMonth as $key => $value) {
                $tax = 0;
                $deliveryFee = 0;
                if (isset($monthlySalesTax[$key])) {
                    $tax = $monthlySalesTax[$key];
                }
                if (isset($monthlyDeliveryFee[$key])) {
                    $deliveryFee = $monthlyDeliveryFee[$key];
                }
                $monthlySaleOnly[$key] = $value->sum('paid_total')+ $tax + $deliveryFee;
            }


            foreach ($months as $key => $month) {
                foreach ($monthlySaleOnly as $keyMonth => $value) {
                   if ($keyMonth === $month) {
                        $processedData[$key] = ['total' => $value, 'month' => $month];
                    }
                }
            }
            foreach ($months as $key => $month) {
                if (!isset($processedData[$key])) {
                    $processedData[$key] = ['total' => 0, 'month' => $month];
                }
            }
            ksort($processedData);
            return [
                'totalRevenue' => $totalRevenue,
                'totalRefunds' => $totalRefunds,
                'totalShops' => $totalShops,
                'todaysRevenue' => $todaysRevenue,
                'totalOrders' => $totalOrders,
                'newCustomers' =>  $newCustomers,
                'totalYearSaleByMonth' => $processedData
            ];
        }
        throw new MarvelException(NOT_AUTHORIZED);
    }

    


}


