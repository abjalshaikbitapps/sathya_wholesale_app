import cn from 'classnames';
import NotFound from '@/components/ui/not-found';
import CategoriesLoader from '@/components/ui/loaders/categories-loader';
import CategoryCard from '@/components/ui/category-card';
import { useRouter } from 'next/router';
import CategoryBreadcrumb from '@/components/ui/category-breadcrumb-card';
import Scrollbar from '@/components/ui/scrollbar';
import isEmpty from 'lodash/isEmpty';
import { ArrowNext, ArrowPrev } from '@/components/icons';
// import SwiperCore from 'swiper';
import { Swiper, SwiperSlide, Navigation,Pagination } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import findNestedData from '@/lib/find-nested-data';
import type { Category } from '@/types';
import ProductGridHome from '@/components/products/grids/home';
import { useEffect, useMemo, useRef, useState } from 'react';
import { productPlaceholder } from '@/lib/placeholders';

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
  1920: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
};

function findParentCategories(
  treeItems: any[],
  parentId: number | null = null,
  link = 'id'
): any[] {
  let itemList: any[] = [];
  if (parentId) {
    const parentItem = treeItems?.find((item) => item[link] === parentId);
    itemList = parentItem?.parent_id
      ? [
          ...findParentCategories(treeItems, parentItem.parent_id),
          parentItem,
          ...itemList,
        ]
      : [parentItem, ...itemList];
  }
  return itemList;
}

interface FilterCategoryGridProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
  className?: string;
  variables: any;
}
const FilterCategoryGrid: React.FC<FilterCategoryGridProps> = ({
  notFound,
  categories,
  loading,
  variables,
}) => {
  const { t } = useTranslation('common');
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper&&!swiper.destroyed) {
      const interval = setInterval(() => {
        if(swiper&&!swiper.destroyed)
        {
          swiper.slideNext();
        }
        else{
          clearInterval(interval);
        }
       
      }, 4000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [swiper]);

  const handleSwiperInit = (swiperInstance: any) => {
    setSwiper(swiperInstance);
  };

  const router = useRouter();
  const { pathname, query } = router;
 

  const selectedCategory =
    Boolean(query.category) &&
    findNestedData(categories, query.category, 'children');

 
  const parentCategories = findParentCategories(
    categories,
    selectedCategory?.parent_id
  );
  const renderCategories = Boolean(selectedCategory)
    ? selectedCategory?.children
    : categories?.filter((category) => !category?.parent_id);
    // var slidelength=5;
    // if(renderCategories?.length<5)
    // {
    //   slidelength=renderCategories?.length;
    // }
    // const swiperRef = useRef<any>(null);
    const remainingSlides = 5 - renderCategories?.length;
  
    // Create dummy data for the remaining slides
    const dummyData = Array.from({ length: remainingSlides }).map((_, index) => ({
      id: index + renderCategories?.length, // Assign a unique ID
      image:[], // Provide a placeholder image URL for the dummy slide
    }));

    // Merge the dummy data with your actual data
    const mergedData = [...renderCategories, ...dummyData];
    // useEffect(() => {
    //   // Calculate the number of remaining slides
     
    //   const remainingSlides = 5 - renderCategories.length;
  
    //   // Create dummy data for the remaining slides
    //   const dummyData = Array.from({ length: remainingSlides }).map((_, index) => ({
    //     id: index + renderCategories.length, // Assign a unique ID
    //     image:[], // Provide a placeholder image URL for the dummy slide
    //   }));
  
    //   // Merge the dummy data with your actual data
    //   const mergedData = [...yourData, ...dummyData];
    //   setYourData(mergedData);
    // }, [slidelength]);
    // console.log(mergedData,"mergedata")
    // useEffect(() => {
    //   const swiperInstance = swiperRef.current?.swiper;
    //   if (swiperInstance) {
    //     swiperInstance.params.slidesPerView = slidelength;
    //     var obj=5-slidelength;
    //     swiperInstance.params.spaceBetween = obj==0?30:obj *(100*obj);
    //     swiperInstance.update(); // Update the Swiper instance after the content has finished rendering
    //   }
    // }, [slidelength]); 
  const onCategoryClick = (slug: string) => {
    console.log(slug);
    if(slug!=undefined)
    {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          category: slug,
        },
      });
    }
    
  
    
    // router.push(
    //   {
    //     pathname,
    //     query: { ...query, category: slug },
    //   },
    //   undefined,
    //   {
    //     scroll: false,
    //   }
    // );
  };

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="mt-8 w-72 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }
  if (notFound) {
    return (
      <div className="bg-light">
        <div className="min-h-full p-5 md:p-8 lg:p-12 2xl:p-16">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      </div>
    );
  }
  function changeSwiper(){
      setTimeout(() => {        
         // Force update the swiper component to adjust its size     
        window.dispatchEvent(new Event('resize'));       }, 0);   
        
  }
  return (
     <div className="bg-light">
       {isEmpty(renderCategories) && (
          <ProductGridHome
            gridClassName="!grid-cols-[repeat(auto-fill,minmax(290px,1fr))] mb-5"
            variables={variables}
          />
        )}
              <div className="flex justify-center">{renderCategories.length!=0&&renderCategories?(
            <div className={cn('flex relative  ml-0 mt-5  ',{
              'flex relative  ml-0 mt-5 banner-img2  ':
                selectedCategory,
            },{
              'flex relative  ml-0 mt-5 banner-img5  ':
                selectedCategory ==false,
            })}>
        <Swiper
          id="offer"
          //TODO: need discussion
          loop={true}
          onSwiper={handleSwiperInit}
          breakpoints={offerSliderBreakpoints}
          // modules={[Navigation]}
          // pagination={{clickable: true}}
           modules={[Pagination,Navigation]}
          // pagination={{ clickable: true }}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {mergedData?.map((item: any, idx: number)=> (
          <SwiperSlide key={idx} className=" my-2 " onClick={() => onCategoryClick(item?.slug!)}>

              {/* <p className="Banner-txt z-1+ text-red-500">Hello</p> */}
              {/* <Image 
                className="bg-br banner-img"
                src={d.image.original}
                alt={d.id}
                layout="fill"
              /> */}
              <div className={cn('',{
              'relative w-full rounded-lg px-2 h-70 bg-light border border-1 border-gray-300 transition-shadow hover:shadow-downfall-lg group ':
                selectedCategory==false,
            })}>
                 <div className={cn('overflow-hidden',{
              'rounded-full border-solid border border-gray-400   ':
                selectedCategory,
            })} >
          <Image
         className={cn(' rounded-md h-20 overflow-hidden',{
          'rounded-full ':
            selectedCategory,
        })}
          src={item?.image?.original ?? productPlaceholder}
          alt={item?.name ?? ''}
          layout="responsive"
          width={432}
          height={432}
        />
        
        </div>
        <div className="rounded-b-lg flex justify-center">
        <h3 className="text-center text-heading font-semibold lg:text-lg md:text-md sm:text-sm xs:text-xs  py-3 ml-p" >{item.name}</h3>
        </div>
        </div>
        
        </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer prev top-2/4 ltr:-left-2 rtl:-right-4 ltr:md:-left-0 rtl:md:-right-5 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-previous')}</span>
          <ArrowPrev width={15} height={15} />
        </div>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer next top-2/4 ltr:-right-2 rtl:-left-4 ltr:md:-right-0 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-next')}</span>
          <ArrowNext width={15} height={15} />
        </div>
        
      </div>):null}</div>
    </div>
  );
};

export default FilterCategoryGrid;