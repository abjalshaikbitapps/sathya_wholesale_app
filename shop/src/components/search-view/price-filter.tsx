import Slider from '@/components/ui/forms/range-slider';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
const { Range } = Slider;
const defaultPriceRange = [0, 1000];
const PriceFilter = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  var isHome=(router.asPath == '/')
  const selectedValues = useMemo(
    () =>
      router.query.price
        ? (router.query.price as string).split(',')
        : defaultPriceRange,
    [router.query.price]
  );
  const [state, setState] = useState<number[] | string[]>(selectedValues);
 
  useEffect(() => {
    setState(selectedValues);
  }, [selectedValues]);

  function handleChange(value: number[]) {
    // if(isHome)
    // {

    // }
    // else
    // {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          price: value.join(','),
        },
      });
    // }
   
  }

  return (
    <>
      <span className="sr-only">{t('text-sort-by-price')}</span>
       <ul>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([0,10]);handleChange([0,10])}}>$0- $10</li>   
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([10,20]);handleChange([10,20])}}>$10- $20</li>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([20,30]);handleChange([20,30])}}>$20- $30</li>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([30,40]);handleChange([30,40])}}>$30- $40</li>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([40,1000]);handleChange([40,1000])}}>Over  $40</li>
       </ul>
      {/* <Range
        allowCross={false}
        min={0}
        max={2000}
        //@ts-ignore
        defaultValue={state}
        //@ts-ignore
        value={state}
        onChange={(value) =>{console.log(value,"pricechange"); setState(value)}}
        onAfterChange={handleChange}
      /> */}
      {/* <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex flex-col items-start p-2 bg-gray-100 border border-gray-200 rounded">
          <label className="text-sm font-semibold text-gray-400">Min</label>
          <span className="text-sm font-bold text-heading">{state[0]}</span>
        </div>
        <div className="flex flex-col p-2 bg-gray-100 border border-gray-200 rounded">
          <label className="text-sm font-semibold text-gray-400">Max</label>
          <span className="text-sm font-bold text-heading">{state[1]}</span>
        </div>
      </div> */}
    </>
  );
};

export default PriceFilter;
