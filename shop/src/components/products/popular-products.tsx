import ProductLoader from '@/components/ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import ProductCard from '@/components/products/cards/card';
import ErrorMessage from '@/components/ui/error-message';
import { usePopularProducts } from '@/framework/product';
import SectionBlock from '@/components/ui/section-block';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useSearch } from '../ui/search/search.context';
import { useCategories } from '@/framework/category';
import { Swiper, SwiperSlide, Navigation,Pagination } from '@/components/ui/slider';
import { ArrowNext, ArrowPrev } from '@/components/icons';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/button';
import { useRouter } from 'next/router';



interface Props {
  className?: string;
  limit?: number;
  variables: any;
  catvariables:any;
  categoryName:any;
}
// const offerSliderBreakpoints = {
//   320: {
//     slidesPerView: 3,
//     spaceBetween: 0,
//   },
// };

export default function PopularProductsGrid({
  className,
  limit = 10,
  variables,
  catvariables,
  categoryName,
}: Props) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const onCategoryClick = (slug: string) => {
    if(slug!=undefined)
    {
      router.push({
        pathname: 'newarrivals/[slug]',
        query: {
         slug:slug
        },
      });
    }
  }
  // const [swiper, setSwiper] = useState<any>(null);
  // useEffect(() => {
  //   if (swiper&&!swiper.destroyed) {
  //     const interval = setInterval(() => {
  //       if(swiper&&!swiper.destroyed)
  //       {
  //         swiper.slideNext();
  //       }
  //       else{
  //         clearInterval(interval);
  //       }
       
  //     }, 3000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [swiper]);

  // const handleSwiperInit = (swiperInstance: any) => {
  //   setSwiper(swiperInstance);
  // };
  variables.catvariables=[catvariables];
  variables.limit=4;
  const { products, isLoading, error } = usePopularProducts(variables);
  // const { categories, isLoading:load, error:er } = useCategories(catvariables);
  // console.log(categories,'pluy');
  const {searchTerm}=useSearch()
  var catfilter:any=products;
  if(searchTerm!=""){
    catfilter=catfilter.filter((d:any)=>d.name.toUpperCase( ).includes(searchTerm.toUpperCase( )));
  }
  if(catfilter.length==0)
  {
    catfilter=products;
  }
  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return (
      <div></div>
      // <SectionBlock title={t('New Arrivals')}>
      //   <NotFound text="text-not-found" className="mx-auto w-7/12" />
      // </SectionBlock>
    );
  }
const hval='newarrivals/'+catvariables
  return (
    <SectionBlock href={hval} title={categoryName}>
       {/* <Button
      className="h-11 w-40 text-sm font-semibold md:text-base place-self-end " onClick={()=>{onCategoryClick(catvariables)}}>

            {t('text-view-more')}
          </Button> */}
      <div className={classNames(className, 'w-full  py-2 px-2')}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:gap-8 xl:gap-y-12 2xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
          {isLoading && !catfilter.length
            ? rangeMap(limit, (i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))
            : catfilter.map((product:any) => (
                <ProductCard product={product} className='product-card shadow-md border border-1 border-gray-200 rounded-xl cart-type-helium h-full overflow-hidden bg-light transition-shadow duration-200 relative w-full h-35 rounded-lg p-1 bg-light transition-shadow hover:shadow-downfall-lg group 'key={product?.id} />
              ))}
        </div>
      </div>
    </SectionBlock>
    // <div className=" flex relative  ml-0 banner-img2 lg:mb-0 md:mb:0 xs:mb-3" >
    //   <Swiper
    //       id="offer"
    //       //TODO: need discussion
    //       loop={true}
    //       onSwiper={handleSwiperInit}
    //       breakpoints={offerSliderBreakpoints}
    //       // modules={[Navigation]}
    //       // pagination={{clickable: true}}
    //        modules={[Pagination,Navigation]}
    //       // pagination={{ clickable: true }}
    //       navigation={{
    //         nextEl: '.next',
    //         prevEl: '.prev',
    //       }}
    //     >
        
    // {isLoading && !catfilter.length
    //   ? rangeMap(limit, (i) => (
    //       <ProductLoader key={i} uniqueKey={`product-${i}`} />
    //     ))
    //   : catfilter.map((product:any) => (
    //     <SwiperSlide key={product?.id}>
    //       <ProductCard product={product} className2='product-card cart-type-helium h-full overflow-hidden border-r border-solid border-border-200 bg-light transition-shadow duration-200' />
    //       </SwiperSlide>
    //     ))}
        
    //     </Swiper>
    //     </div>
  );
}
