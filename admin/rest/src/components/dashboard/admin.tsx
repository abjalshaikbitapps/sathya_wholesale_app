import { CartIconBig } from '@/components/icons/cart-icon-bag';
import ColumnChart from '@/components/widgets/column-chart';
import StickerCard from '@/components/widgets/sticker-card';
import ErrorMessage from '@/components/ui/error-message';
import usePrice from '@/utils/use-price';
import Loader from '@/components/ui/loader/loader';
import RecentOrders from '@/components/order/recent-orders';
import PopularProductList from '@/components/product/popular-product-list';
import { useOrdersQuery } from '@/data/order';
import { useTranslation } from 'next-i18next';
import { useWithdrawsQuery } from '@/data/withdraw';
import WithdrawTable from '@/components/withdraw/withdraw-table';
import {  useAnalyticMonthQuery, useAnalyticTodayQuery, useAnalyticWeekQuery, useAnalyticYearQuery, useAnalyticsQuery, usePopularProductsQuery } from '@/data/dashboard';
import { useRouter } from 'next/router';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker'
// import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
// import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCallback, useEffect, useState } from 'react';
import LineChart from '../widgets/line-chart';


export default function Dashboard() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  

  const [todayvalue, onChangeTodayValue] = useState([new Date(), new Date()]);
  const [weekvalue, onChangeWeekValue] = useState([new Date(), new Date()]);

  const [monthvalue, onChangeMonthValue] = useState([new Date(), new Date()]);

  const [yearvalue, onChangeYearValue] = useState([new Date(), new Date()]);

  // const [daterangevalue, onDaterangechangeValue] = useState([new Date(new Date().setHours(0, 0, 0, 0)),new Date( new Date().setHours(23, 59, 59, 999))]);

  const [weekval,onWeekVal]=useState(0);
  // const [typevalue,onTypevalue]=useState('');
  const [monthval,onMonthVal]=useState(0);
  const [todayval,onTodayval]=useState(0);
  const [yearval,onYearval]=useState(0);
  const [startDateRange, setStartDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [endDateRange, setEndDate] = useState(new Date());
  const [daterangePickerval,setDateRangePicker]=useState([new Date(), new Date()])
 console.log(startDateRange,endDateRange,"enddates")
 
  // const [rangeval,onRangeval]=useState(0);
  const {data,isLoading:loading}=useAnalyticsQuery();

  const {data:todayv,isLoading:todayloading}=useAnalyticTodayQuery({
    language: locale,
    limit: 10,
    page: 1,
    fromDate:todayvalue?todayvalue[0]:new Date(),
    toDate:todayvalue?todayvalue[1]:new Date(),
    type:"Today"
  });
  const {data:week,isLoading:weekloading}=useAnalyticWeekQuery({
    language: locale,
    limit: 10,
    page: 1,
    fromDate:weekvalue?weekvalue[0]:new Date(),
    toDate:weekvalue?weekvalue[1]:new Date(),
    type:"Week"
  });
  const {data:monthdata,isLoading:monthloading}=useAnalyticMonthQuery({
    language: locale,
    limit: 10,
    page: 1,
    fromDate:monthvalue?monthvalue[0]:new Date(),
    toDate:monthvalue?monthvalue[1]:new Date(),
    type:"Month"
  });
  const {data:yeardata,isLoading:getyearloading}=useAnalyticYearQuery({
    language: locale,
    limit: 10,
    page: 1,
    fromDate:yearvalue?yearvalue[0]:new Date(),
    toDate:yearvalue?yearvalue[1]:new Date(),
    type:"Year"
  });
  const handleDateChange = (dates:any) => {
    const [start, end] = dates;
    // var initaldate=new Date(start);
    // var endeddate=new Date(end);
    // initaldate.setHours(0, 0, 0, 0);
    // endeddate.setHours(23, 59, 59, 999);
    setStartDate(start);
    setEndDate(end);
    setDateRangePicker([start,end]);
  };
  const {data:daterangedata,isLoading:daterangeloading}=useAnalyticMonthQuery({
    language: locale,
    limit: 10,
    page: 1,
    fromDate:daterangePickerval?daterangePickerval[0]:new Date(),
    toDate:daterangePickerval?daterangePickerval[1]:new Date(),
    type:"Month"
  });
  const removeOneDayToDate = (date:Date,beforeval:any) => {
    date.setDate(date.getDate() - beforeval)
    
    return date
  }
   //today useeffect function
   useEffect(() => {
    console.log()
    const todayvl=  getDatePreselectsFuture().Today.subDates[todayval].value;

    const startDateTime = new Date(todayvl);
    startDateTime.setHours(0, 0, 0, 0); // Set to the beginning of the day
   
    
    const endDateTime = new Date(todayvl);
    endDateTime.setHours(23, 59, 59, 999); // Set to the end of the day

    
  
   

      var newdateval=[startDateTime,endDateTime];
      onChangeTodayValue(newdateval);
   
  }, [todayval]);

  //Week useeffect function
  useEffect(() => {
      const testva=getDatePreselectsFuture().week.subDates[weekval].value;
   
      testva[1].setHours(23, 59, 59, 999); // Set to the end of the day
      testva[0].setHours(0, 0, 0, 0); // Set to the beginning of the day
      
  var newdateval=[testva[0],testva[1]];
  onChangeWeekValue(newdateval);
   
  }, [weekval]);
  //Month useEffect function
  useEffect(() => {
    const arrayres=getLastFiveYearsDropdownValues();
    const yearsingval=arrayres[yearval]
    const fromDate = new Date(yearsingval, 0, 1); // January 1st of the selected year
    const toDate = new Date(yearsingval, 11, 31); // December 31st of the selected year
   const frmto=[fromDate,toDate];
    // onTypevalue("Year");
    onChangeYearValue(frmto);
 
 
}, [yearval]);
useEffect(() => {
  // const monthName = event.target.value;
  const monthName=getDatePreselectsFuture().month.subDates[monthval].value;
  // const monthName=e.target.value;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const curveal=monthName.split(" ");
// Convert month name to month number (0-indexed)
  const monthNumber = new Date(`${curveal[0]} 1, ${curveal[1]}`).getMonth();
  const year=new Date(`${curveal[0]} 1, ${curveal[1]}`).getFullYear();
  // Set the fromDate to the first day of the selected month
  const fromDate = new Date(year, monthNumber, 1);

  // Set the toDate to the last day of the selected month
  const toDate = new Date(year, monthNumber + 1, 0);
  var vf=[fromDate,toDate]
  // onChangeValue(vf);
  // onMonthVal(monthName);
  // onTypevalue("Month");
  onChangeMonthValue(vf);


}, [monthval]);
 
//   const handleDropdownChange = useCallback(
//     (event) => {
//       const monthName = event.target.value;
//       // const monthName=e.target.value;
//       const currentDate = new Date();
//       const currentYear = currentDate.getFullYear();
//       const curveal=monthName.split(" ");
// // Convert month name to month number (0-indexed)
//       const monthNumber = new Date(`${curveal[0]} 1, ${curveal[1]}`).getMonth();
//       const year=new Date(`${curveal[0]} 1, ${curveal[1]}`).getFullYear();
//       // Set the fromDate to the first day of the selected month
//       const fromDate = new Date(year, monthNumber, 1);
    
//       // Set the toDate to the last day of the selected month
//       const toDate = new Date(year, monthNumber + 1, 0);
//       var vf=[fromDate,toDate]
//       console.log(vf,monthName,"user");
//       // onChangeValue(vf);
//       onMonthVal(monthName);
//       // onTypevalue("Month");
//       onChangeMonthValue(vf);
//     },
//     [onMonthVal]
//   );

  // function getQuarterRange(quarterName: string, year: number): { fromDate: Date; toDate: Date } {
  //   const quarters : { [key: string]: number[] } = {
  //     'Q1': [0, 2],
  //     'Q2': [3, 5],
  //     'Q3': [6, 8],
  //     'Q4': [9, 11],
  //   };
  
  //   const quarterRange = quarters[quarterName];
  
  //   if (!quarterRange) {
  //     throw new Error("Invalid quarter name. Valid values are Q1, Q2, Q3, Q4.");
  //   }
  
  //   // Set the fromDate to the first day of the selected quarter
  //   const fromDate = new Date(year, quarterRange[0], 1);
  
  //   // Set the toDate to the last day of the selected quarter
  //   const toDate = new Date(year, quarterRange[1] + 1, 0);
   
  //   return { fromDate, toDate };
  // }
  function getLastFiveYearsDropdownValues(): number[] {
    const currentYear = new Date().getFullYear();
    const dropdownValues: number[] = [];
  
    for (let i = currentYear; i > currentYear - 5; i--) {
      dropdownValues.push(i);
    }
  
    return dropdownValues;
  }
function getMonthval(num:any){
  const currentDate = new Date();

  const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - num, 28);
  
  const previousMonthString = previousMonthDate.toLocaleString("default", { month: "short", year: "2-digit" });
  
  return previousMonthString;
  
}
// function getWeekRange(evt:any){
//   const weekval=evt.target.value;
//   const realval=weekval.split(',');
//   var newdateval=[realval[0],realval[1]];
//   console.log(newdateval);
//   // onWeekVal(weekval);
//   // onChange(newdateval);


// }



  
  function weekYear(date:Date,weeknumber:any) {
    var get = date;
    var currentDate:any = new Date(get);
    var year:any =  new Date(currentDate.getFullYear(), 0, 1);
    var days =  Math.floor((currentDate - year) / (24 * 60 * 60 * 1000));
    var week = Math.ceil(( currentDate.getDay() + 1 + days) / 7);
    return  week;
    }
    // console.log(weekYear(new Date(),2))
  function getDatePreselectsFuture() {
    const quickDate = {
      Today: {
        value: "today",
        name: "today",
        selector: "today",
        subDates: [
           {
            name:'Today',
            selector: "0 days",
            value:new Date()
          },
           {
            name: 'Yesterday',
            selector: "-1 days",
            value:removeOneDayToDate(new Date(),1)
          },
          {
            name: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleString("en-US", { weekday: "long" }),
            selector: "-2 days",
            value:removeOneDayToDate(new Date(),2)
          },
          {
            name: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toLocaleString("en-US", { weekday: "long" }),
            selector: "-3 days",
            value:removeOneDayToDate(new Date(),3)
          },
         {
            name: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000).toLocaleString("en-US", { weekday: "long" }),
            selector: "-4 days",
            value:removeOneDayToDate(new Date(),4)
          },
          {
            name: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleString("en-US", { weekday: "long" }),
            selector: "-5 days",
            value:removeOneDayToDate(new Date(),5)
          },
         {
            name: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).toLocaleString("en-US", { weekday: "long" }),
            selector: "-6 days",
            value:removeOneDayToDate(new Date(),6)
          },
           {
            name: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleString("en-US", { weekday: "long" }),
            selector: "-7 days",
            value:removeOneDayToDate(new Date(),7)
          },
        ],
      },
      week: {
        value: "thisWeek",
        name: "thisweek",
        selector: "today",
        subDates: [
           {
            name: 'Last week',
            value:[
              new Date(new Date().getTime() - 1 * 7 * 24 * 60 * 60 * 1000),

             new Date(new Date()),
            ],
            selector: "-1 week",
          },
         {
            name:"week"+ weekYear( new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000),

             new Date(new Date().getTime() - 1 * 7 * 24 * 60 * 60 * 1000),
            ],
            selector: "-2 week",
          },
          {
            name:"week"+ weekYear( new Date(new Date().getTime() - 3 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 3 * 7 * 24 * 60 * 60 * 1000),

            new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000),
            ],
            selector: "-3 week",
          },
        {
            name:"week"+ weekYear( new Date(new Date().getTime() - 4 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 4 * 7 * 24 * 60 * 60 * 1000),

             new Date(new Date().getTime() - 3 * 7 * 24 * 60 * 60 * 1000),
            ],         
            selector: "-4 week",
          },
          {
            name:"week"+ weekYear( new Date(new Date().getTime() - 5 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 5 * 7 * 24 * 60 * 60 * 1000),

           new Date(new Date().getTime() - 4 * 7 * 24 * 60 * 60 * 1000),
            ],
            selector: "-5 week",
          },
          {
            name:"week"+ weekYear( new Date(new Date().getTime() - 6 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 6 * 7 * 24 * 60 * 60 * 1000),

            new Date(new Date().getTime() - 5 * 7 * 24 * 60 * 60 * 1000),
            ],
            selector: "-6 week",
          },
         {
            name:"week"+ weekYear( new Date(new Date().getTime() - 7 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 7 * 7 * 24 * 60 * 60 * 1000), 

             new Date(new Date().getTime() - 6 * 7 * 24 * 60 * 60 * 1000),
            ],           
            selector: "-7 week",
          },
          {
            name:"week"+ weekYear( new Date(new Date().getTime() - 8 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 8 * 7 * 24 * 60 * 60 * 1000),  

           new Date(new Date().getTime() - 7 * 7 * 24 * 60 * 60 * 1000),
            ],        
            selector: "-8 week",
          },
          {
            name:"week"+ weekYear( new Date(new Date().getTime() - 9 * 7 * 24 * 60 * 60 * 1000),2) ,
            value:[
              new Date(new Date().getTime() - 9 * 7 * 24 * 60 * 60 * 1000),     

            new Date(new Date().getTime() - 8 * 7 * 24 * 60 * 60 * 1000),
            ], 
            selector: "-9 week",
          },
        ],
      },
     month: {
        value: "thisMonth",
        name: "thismonth",
        selector: "today",
        subDates: [
          {
            name:"This Month",
            value:getMonthval(0),
            selector: "first day of -1 months",
          },
           {
          name: "Last Month",
            value: getMonthval(1),
            selector: "first day of -2 months",
          },
           {
            name:getMonthval(2),
            value: getMonthval(2),
            selector: "first day of -3 months",
          },
           {
            name: getMonthval(3),
            value: getMonthval(3),
            selector: "first day of -4 months",
          },
          //  {
          //   name: new Date(new Date().getTime() - 5 * 30 * 24 * 60 * 60 * 1000).toLocaleString("default", { month: "short", year: "2-digit" }),
          //   value: new Date(new Date().getTime() - 5 * 30 * 24 * 60 * 60 * 1000).toLocaleString("default", { month: "short", year: "2-digit" }),
          //   selector: "first day of -5 months",
          // },
           {
            name: getMonthval(4),
            value: getMonthval(4),
            selector: "first day of -6 months",
          },
           {
            name: getMonthval(5),
            value: getMonthval(5),
            selector: "first day of -7 months",
          },
           {
            name: getMonthval(6),
            value: getMonthval(6),
            selector: "first day of -8 months",
          },
           {
            name: getMonthval(7),
            value: getMonthval(7),
            selector: "first day of -9 months",
          },
          {
            name: getMonthval(8),
            value: getMonthval(8),
            selector: "first day of -10 months",
          },
          {
            name: getMonthval(9),
            value: getMonthval(9),
            selector: "first day of -11 months",
          },
           {
            name: getMonthval(10),
            value: getMonthval(10),
            selector: "first day of -12 months",
          },
           {
            name: getMonthval(11),
            value: getMonthval(11),
            selector: "first day of -13 months",
          },
           {
            name: getMonthval(12),
            value: getMonthval(12),
            selector: "first day of -14 months",
          },
           {
            name: getMonthval(13),
            value: getMonthval(13),
            selector: "first day of -15 months",
          },
        ],
      },
      quarter: {
        value: "thisQuarter",
        name: "thisquarter",
        selector: "today",
        subDates: [
          {
            name:`Q${Math.ceil((new Date(new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000).getMonth() + 1) / 3)} ${new Date(new Date().getTime() - 3 * 30 * 24 * 60 * 60 * 1000).getFullYear()}`,
            selector: "first day of -3 months",
          },
           {
            name: `Q${Math.ceil((new Date(new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000).getMonth() + 1) / 3)} ${new Date(new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000).getFullYear()}`,
            selector: "first day of -6 months",
          },
           {
            name: `Q${Math.ceil((new Date(new Date().getTime() - 9 * 30 * 24 * 60 * 60 * 1000).getMonth() + 1) / 3)} ${new Date(new Date().getTime() - 9 * 30 * 24 * 60 * 60 * 1000).getFullYear()}`,
            selector: "first day of -9 months",
          },
           {
            name: `Q${Math.ceil((new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000).getMonth() + 1) / 3)} ${new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000).getFullYear()}`,
            selector: "first day of -12 months",
          },
           {
            name: `Q${Math.ceil((new Date(new Date().getTime() - 15 * 30 * 24 * 60 * 60 * 1000).getMonth() + 1) / 3)} ${new Date(new Date().getTime() - 15 * 30 * 24 * 60 * 60 * 1000).getFullYear()}`,
            selector: "first day of -15 months",
          },
        ],
      },
    };
  
    return quickDate;
  }
  
  


  // const { data, isLoading: loading } = useAnalyticsQuery();
  const { price: total_revenue } = usePrice(
    data && {
      amount: data?.totalRevenue!,
    }
  );
  const { price: todays_revenue } = usePrice(
    data && {
      amount: data?.todaysRevenue!,
    }
  );
  const {
    error: orderError,
    orders: orderData,
    loading: orderLoading,
    paginatorInfo,
  } = useOrdersQuery({
    language: locale,
    limit: 10,
    page: 1,
  });
  // const {
  //   data: popularProductData,
  //   isLoading: popularProductLoading,
  //   error: popularProductError,
  // } = usePopularProductsQuery({ limit: 10, language: locale });
  const { withdraws, loading: withdrawLoading } = useWithdrawsQuery({
    limit: 10,
  });

  // if (loading || orderLoading || popularProductLoading || withdrawLoading) {
  //   return <Loader text={t('common:text-loading')} />;
  // }
  // if (orderError || popularProductError) {
  //   return (
  //     <ErrorMessage
  //       message={orderError?.message || popularProductError?.message}
  //     />
  //   );
  // }
  // let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0);
  var salesByYear=[];
  var salesByMonth=[];
  if (yeardata&&yeardata!=undefined) {
    // console.log(data.totalYearSaleByMonth,'salebymonth')
     salesByYear = yeardata.map((item: any) =>
      item.total.toFixed(2)
  );
     salesByMonth = yeardata.map((item: any) =>
      item.month
    );
  }
  var salesByDaterange=[];
  var salesByDaterangeLabel=[];
  if (daterangedata&&daterangedata!=undefined) {
    // console.log(data.totalYearSaleByMonth,'salebymonth')
     salesByDaterange = daterangedata.map((item: any) =>
      item.total.toFixed(2)
  );
     salesByDaterangeLabel = daterangedata.map((item: any) =>
      item.month
    );
  }
  var salesByDay:any=[];
  var salesByHour:any=[];
  if (todayv&&todayv!=undefined) {
    console.log(todayv);
    // // console.log(data.totalYearSaleByMonth,'salebymonth')
    salesByDay = todayv.map((item: any) =>
      item?item?.total?.toFixed(2):0
    );
    salesByHour =todayv.map((item: any) =>
      item?item?.month:0
    );
  }
  var salesByDate:any=[];
  var salesByWeek:any=[];
  if (week&&week!=undefined) {
    console.log(week);
    // // console.log(data.totalYearSaleByMonth,'salebymonth')
    salesByDate = week.map((item: any) =>
      item?item?.total?.toFixed(2):0
    );
    salesByWeek =week.map((item: any) =>
      item?item?.month:0
    );
  }
  var salesByMonthDate:any=[];
  var salesByMonthLabel:any=[];
  if (monthdata&&monthdata!=undefined) {
    console.log(monthdata);
    // // console.log(data.totalYearSaleByMonth,'salebymonth')
    salesByMonthDate = monthdata.map((item: any) =>
      item?item?.total?.toFixed(2):0
    );
    salesByMonthLabel =monthdata.map((item: any) =>
      item?item?.month:0
    );
  }
  
  // console.log(salesByMonthDate,salesByMonth);
  // salesByYear = data?.totalYearSaleByMonth.map((item: any) =>
  //     item.total.toFixed(2)
  //   );
  // console.log('sale',salesByYear);
  return (
    <>
          <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<DollarIcon className="h-7 w-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: '#A7F3D0' }}
            price={total_revenue}
          />
        </div> */}
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-order"
            subtitleTransKey="sticker-card-subtitle-order"
            icon={<CartIconBig />}
            price={data?.totalOrders}
          />
        </div>
        {/* <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-today-rev"
            icon={<CoinIcon />}
            price={todays_revenue}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-total-shops"
            icon={<ShopIcon className="w-6" color="#1D4ED8" />}
            iconBgStyle={{ backgroundColor: '#93C5FD' }}
            price={data?.totalShops}
          />
        </div> */}
      </div>
      <div className="mb-6 flex ">
      <div className="mb-6 grid w-2/6 flex-wrap md:flex-nowrap">
        <div>
        <select  onChange={(evt:any)=>{onTodayval(evt.target.value)}} value={todayval}>
      {getDatePreselectsFuture().Today.subDates.map((item:any,index) => (
       <option value={index} key={item.id}>
       {item.name}
     </option>
      ))}
    
     </select>
        </div>
      <LineChart
          widgetTitle={t('common:today-sale-history')}
          colors={['#03D3B5']}
          series={salesByDay}
          typeData={getDatePreselectsFuture().Today.subDates[todayval].name}
          categories={salesByHour?salesByHour:[
           
          ]}
          // categories={[
          //   t('common:january'),
          //   t('common:february'),
          //   t('common:march'),
          //   t('common:april'),
          //   t('common:may'),
          //   t('common:june'),
          //   t('common:july'),
          //   t('common:august'),
          //   t('common:september'),
          //   t('common:october'),
          //   t('common:november'),
          //   t('common:december'),
          // ]}
        />
        </div>
        <div className="mb-6 grid w-2/6 flex-wrap md:flex-nowrap">
          <div>
          <select  onChange={(evt:any)=>{onWeekVal(evt.target.value)}} value={weekval} >
      {getDatePreselectsFuture().week.subDates.map((item:any,index) => (
       <option value={index} key={item.id}>
       {item.name}
     </option>
      ))}
           
     </select>
          </div>
      <LineChart
          widgetTitle={t('common:weekly-sale-history')}
          colors={['#03D3B5']}
          series={salesByDate}
          typeData={getDatePreselectsFuture().week.subDates[weekval].name}
          categories={salesByWeek?salesByWeek:[
          
          ]}
          // categories={[
          //   t('common:january'),
          //   t('common:february'),
          //   t('common:march'),
          //   t('common:april'),
          //   t('common:may'),
          //   t('common:june'),
          //   t('common:july'),
          //   t('common:august'),
          //   t('common:september'),
          //   t('common:october'),
          //   t('common:november'),
          //   t('common:december'),
          // ]}
        />
        </div>
        <div className="mb-6 grid w-2/6 flex-wrap md:flex-nowrap">
          <div>
          <select  onChange={(evt:any)=>{onMonthVal(evt.target.value)}} value={monthval} >
      {getDatePreselectsFuture().month.subDates.map((item:any,index) => (
       <option value={index} key={index}>
       {item.name}
     </option>
      ))}
           
     </select>
          </div>
      <LineChart
          widgetTitle={t('common:monthly-sale-history')}
          colors={['#03D3B5']}
          series={salesByMonthDate}
          typeData={getDatePreselectsFuture().month.subDates[monthval].name}
          categories={salesByMonthLabel?salesByMonthLabel:[
            // t('common:january'),
            // t('common:february'),
            // t('common:march'),
            // t('common:april'),
            // t('common:may'),
            // t('common:june'),
            // t('common:july'),
            // t('common:august'),
            // t('common:september'),
            // t('common:october'),
            // t('common:november'),
            // t('common:december'),
          ]}
          // categories={[
          //   t('common:january'),
          //   t('common:february'),
          //   t('common:march'),
          //   t('common:april'),
          //   t('common:may'),
          //   t('common:june'),
          //   t('common:july'),
          //   t('common:august'),
          //   t('common:september'),
          //   t('common:october'),
          //   t('common:november'),
          //   t('common:december'),
          // ]}
        />
        </div>
     
      </div>

      <div className="mb-6 grid w-full flex-wrap md:flex-nowrap">
      <div className="mb-6 grid w-1/6 flex-wrap md:flex-nowrap">
          <div>
      <DatePicker
        selected={startDateRange}
        onChange={handleDateChange}
        startDate={startDateRange}
        endDate={endDateRange}
        selectsRange
      />
      </div>
      {/* <DateRangePicker onChange={onDaterangechangeValue} value={daterangevalue} /> */}
    </div>
        <ColumnChart
          widgetTitle={t('common:range-sale-history')}
          colors={['#0345d3']}
          series={salesByDaterange}
          categories={salesByDaterangeLabel?salesByDaterangeLabel:[
            // t('common:january'),
            // t('common:february'),
            // t('common:march'),
            // t('common:april'),
            // t('common:may'),
            // t('common:june'),
            // t('common:july'),
            // t('common:august'),
            // t('common:september'),
            // t('common:october'),
            // t('common:november'),
            // t('common:december'),
          ]}
          // categories={[
          //   t('common:january'),
          //   t('common:february'),
          //   t('common:march'),
          //   t('common:april'),
          //   t('common:may'),
          //   t('common:june'),
          //   t('common:july'),
          //   t('common:august'),
          //   t('common:september'),
          //   t('common:october'),
          //   t('common:november'),
          //   t('common:december'),
          // ]}
        />
      </div>

      <div className="mb-6 grid w-full flex-wrap md:flex-nowrap">
        <div>
      <select  onChange={(evt:any)=>{onYearval(evt.target.value)}} value={yearval} >
      {getLastFiveYearsDropdownValues().map((item,index) => (
       <option value={index} key={item}>
       {item}
     </option>
      ))}
           
     </select>
     </div>
        <ColumnChart
          widgetTitle={t('common:yearly-sale-history')}
          colors={['#0345d3']}
          series={salesByYear}
          categories={salesByMonth?salesByMonth:[
            t('common:january'),
            t('common:february'),
            t('common:march'),
            t('common:april'),
            t('common:may'),
            t('common:june'),
            t('common:july'),
            t('common:august'),
            t('common:september'),
            t('common:october'),
            t('common:november'),
            t('common:december'),
          ]}
          // categories={[
          //   t('common:january'),
          //   t('common:february'),
          //   t('common:march'),
          //   t('common:april'),
          //   t('common:may'),
          //   t('common:june'),
          //   t('common:july'),
          //   t('common:august'),
          //   t('common:september'),
          //   t('common:october'),
          //   t('common:november'),
          //   t('common:december'),
          // ]}
        />
      </div>


      <div className="mb-6 flex w-full flex-wrap space-y-6 rtl:space-x-reverse xl:flex-nowrap xl:space-y-0 xl:space-x-5">
        <div className="w-full">
          <RecentOrders
            orders={orderData}
            title={t('table:recent-order-table-title')}
          />
        </div>

        {/* <div className="w-full xl:w-1/2">
          <WithdrawTable
            withdraws={withdraws}
            title={t('table:withdraw-table-title')}
          />
        </div> */}
      </div>
      {/* <div className="mb-6 w-full xl:mb-0">
        <PopularProductList
          products={popularProductData}
          title={t('table:popular-products-table-title')}
        />
      </div> */}
    </>
  );
}
