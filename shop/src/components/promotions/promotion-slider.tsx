import { ArrowNext, ArrowPrev } from '@/components/icons';
import { Swiper, SwiperSlide, Navigation,Pagination } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  // 580: {
  //   slidesPerView: 2,
  //   spaceBetween: 16,
  // },
  // 1024: {
  //   slidesPerView: 3,
  //   spaceBetween: 16,
  // },
  // 1920: {
  //   slidesPerView: 4,
  //   spaceBetween: 24,
  // },
};

export default function PromotionSlider({ sliders }: { sliders: any[] }) {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      const interval = setInterval(() => {
        swiper.slideNext();
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [swiper]);

  const handleSwiperInit = (swiperInstance: any) => {
    setSwiper(swiperInstance);
  };

  return (
      <div className=" flex relative  ml-0 banner-img lg:mb-0 md:mb:0 xs:mb-3" >
        <Swiper
          id="offer"
          //TODO: need discussion
          loop={true}
          onSwiper={handleSwiperInit}
          breakpoints={offerSliderBreakpoints}
          // modules={[Navigation]}
          pagination={{clickable: true}}
           modules={[Pagination,Navigation]}
          // pagination={{ clickable: true }}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {sliders?.map((d) => (
            <SwiperSlide key={d.id} className="bg-br ">
              {/* <p className="Banner-txt z-1+ text-red-500">Hello</p> */}
              <Image 
                className="bg-br banner-img"
                src={d.original}
                alt={d.id}
                layout="fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer prev top-2/4 ltr:-left-2 rtl:-right-4 ltr:md:-left-0 rtl:md:-right-5 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-previous')}</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer next top-2/4 ltr:-right-2 rtl:-left-4 ltr:md:-right-0 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">{t('common:text-next')}</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
  );
}

