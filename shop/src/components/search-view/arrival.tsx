import Slider from '@/components/ui/forms/range-slider';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
const defaultPriceRange = [0, 1000];
const ArrivalFilter = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  var isHome=(router.asPath == '/')
  const selectedValues = useMemo(
    () =>
      router.query.arrival
        ? (router.query.arrival as string).split(',')
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
          arrival: value.join(','),
        },
      });
    }
  }
  return (
    <>
      <span className="sr-only">{t('text-sort-by-price')}</span>
       <ul>
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([30]);handleChange([30])}}>Last 30 days </li>   
             <li className='mb-2 text-body text-sm secondary' onClick={()=>{setState([90]);handleChange([90])}}>Last 90 days</li>
       </ul>
    </>
  );
};

export default ArrivalFilter;
