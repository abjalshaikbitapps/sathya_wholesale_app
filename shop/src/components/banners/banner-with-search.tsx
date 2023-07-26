import cn from 'classnames';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { bannerPlaceholder, productPlaceholder } from '@/lib/placeholders';
import Search from '@/components/ui/search/search';
import type { Banner } from '@/types';
import { useHeaderSearch } from '@/layouts/headers/header-search-atom';
import { useIntersection } from 'react-use';
import { useEffect, useRef } from 'react';
import { scrollToBottom } from 'react-scroll/modules/mixins/animate-scroll';

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
  isCategory?:boolean;
}

const BannerWithSearch: React.FC<BannerProps> = ({ banners, layout,isCategory }) => {
  const { showHeaderSearch, hideHeaderSearch } = useHeaderSearch();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
   const divRef:any= useRef<HTMLDivElement>(null);
function scrollToBottom()
{
  if (divRef.current) {   
       divRef.current.scrollIntoView({ behavior: 'smooth' });

    }
}
  useEffect(() => {
    
  });

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      hideHeaderSearch();
      return;
    }
    if (intersection && !intersection.isIntersecting) {
      showHeaderSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return (
    <div
      className={cn('relative hidden lg:block banner-mock', {
        '!block': layout === 'minimal',


      })}
    >
      <div className="w-full max-w-3xl" ref={intersectionRef}></div>
                  
      {<div className="-z-1 overflow-hidden">
        <div 
        className={cn(
          'relative mt-0 mx-5 ',
          {
            '!hidden': isCategory === true,
          }
        )}
         >
          <Swiper
            id="banner"
            // loop={true}
            modules={[Navigation]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
          >
            {banners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="h-full min-h-140 w-full"
                >
                  <Image
                   className={cn('rh-full min-h-140 w-full', {
                    'hidden': isCategory==true
                    
                  })}
                    src={banner.image?.original ?? bannerPlaceholder}
                    alt={banner.title ?? ''}
                    layout="fill"
                    objectFit="contain"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 mt-8 grid w-full flex-col items-center justify-start p-5 text-center md:px-20 lg:space-y-10',
                      {
                        'space-y-5 md:!space-y-8': layout === 'minimal',
                      }
                    )}
                  >
                    
            {/* <div className="grid justify-start w-[1/2 ]lg:pr-0 lg:py-6 mb-6 lg:mb-0">
              <h1 className={cn(
                        ' font-light tracking-tight xl:text-3xl text-blue-500 text-4xl title-font  mb-4 ',
                        {
                          '!text-accent': layout === 'minimal',
                        }
                      )}
                    >
                      {banner?.title} 
                      </h1>
              
              <p className="leading-relaxed mb-4 text-sm text-gray-500"> {banner?.description}</p>
            
            </div> */}
          
                    <div className="w-full max-w-3xl" ref={intersectionRef} hidden>
                      <Search label="search" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> }
    </div>
  );
};

export default BannerWithSearch;
