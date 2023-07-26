import Slider from '@/components/ui/forms/range-slider';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
const defaultPriceRange = [0, 1000];
const DiscountPriceFilter = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  var isHome=(router.asPath == '/')
  const selectedValues = useMemo(
    () =>
      router.query.discountprice
        ? (router.query.discountprice as string).split(',')
        : defaultPriceRange,
    [router.query.dicountprice]
  );
  const [state, setState] = useState<number[] | string[]>(selectedValues);
 
  useEffect(() => {
    setState(selectedValues);
  }, [selectedValues]);

  function handleChange(value: number[]) {
    if(isHome)
    {

    }
    else
    {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          discountprice: value.join(','),
        },
      });
    }
  }
  return (
    <>
      {/* <span className="sr-only">{t('text-sort-by-price')}</span>
       <ul>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([0,10]);handleChange([10,25])}}>10% Off or more </li>   
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([10,20]);handleChange([25,35])}}>25% Off or more</li>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([20,30]);handleChange([35,50])}}>35% Off or more</li>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([30,40]);handleChange([50,60])}}>50% Off or more</li>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([30,40]);handleChange([60,100])}}>60% Off or more</li>
       </ul> */}
    </>
  );
};

export default DiscountPriceFilter;
