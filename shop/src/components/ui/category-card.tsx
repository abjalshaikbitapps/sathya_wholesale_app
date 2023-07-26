import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import { formatString } from '@/lib/format-string';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CategoryItemProps {
  item: any;
  isHome:boolean;
  onClick: () => void;
}
const CategoryCard: React.FC<CategoryItemProps> = ({ item,isHome, onClick }) => {
  const { t } = useTranslation('common');
  return (
    <>

{(isHome==true)?(
<div
      className="relative w-full h-52 rounded-lg p-1 bg-light border border-1 border-gray-300 transition-shadow hover:shadow-downfall-lg group"
      onClick={onClick}
      role="button"
    >
      <div className="flex flex-col flex-1 h-full relative">
        <div className="border-solid border-2 border-gray-100 h-60 rounded-lg overflow-hidden">
          <Image
          className="lock h-52 w-60 object-cover object-center cursor-pointer rounded-lg"
          src={item?.image?.original ?? productPlaceholder}
          alt={item?.name ?? ''}
          layout="responsive"
          width={432}
          height={336}
        />
        </div>
        <div className="bg-gray-100 border-solid border-2 border-gray-100 h-10 rounded-b-lg flex justify-center"></div>
        <h3 className="text-center text-heading font-semibold text-lg mb-3 ml-p" >{item.name}</h3>
        {/* <span className="text-body text-s">
          {item?.children?.length
            ? `${item?.children?.length} ${
                item?.children?.length > 1
                  ? t('text-categories')
                  : t('text-category')
              }`
            : item?.children?.length ? formatString(item?.products_count, 'Item') : ''}
        </span> */}
        {/* <button className="mt-auto flex text-accent font-semibold text-sm underline opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100">
          {t('text-view-more')}
        </button> */}
        </div>
        </div>
        
        ):(
        <div
      className="relative client-inners w-full h-52 rounded-full my-2 p-2 bg-light border border-1 border-gray-300 transition-shadow hover:shadow-downfall-lg group"
      onClick={onClick}
      role="button"
    >
      <div className="flex flex-col flex-1 h-full relative z-10">
        <div className="border-solid border-2 border-gray-100 h-60 rounded-full overflow-hidden">
          <Image
          className="lock h-60 w-60 object-cover object-center cursor-pointer rounded-full bg-center	"
          src={item?.image?.original ?? productPlaceholder}
          alt={item?.name ?? ''}
          layout="responsive"
          width={432}
          height={432}
        />
        </div>
      {/* <div className="bg-gray-100 border-solid border-2 border-gray-100 h-10 rounded-b-lg flex justify-center"></div> */}
        {/* <span className="text-body text-s">
          {item?.children?.length
            ? `${item?.children?.length} ${
                item?.children?.length > 1
                  ? t('text-categories')
                  : t('text-category')
              }`
            : item?.children?.length ? formatString(item?.products_count, 'Item') : ''}
        </span> */}
        {/* <button className="mt-auto flex text-accent font-semibold text-sm underline opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100">
          {t('text-view-more')}
        </button> */}
        </div>
        <h3 className="text-center text-heading font-semibold text-lg mb-3 ml-p my-2" >{item.name}</h3>
        </div>
        )}
        
        </>
        );
      };
      export default CategoryCard;
