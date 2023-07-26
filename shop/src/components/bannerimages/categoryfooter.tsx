import { useType } from '@/framework/type';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/ui/error-message'));
const BannerWithSearch = dynamic(
  () => import('@/components/banners/banner-with-search')
);
const BannerShort = dynamic(() => import('@/components/banners/banner-short'));
const BannerWithoutSlider = dynamic(
  () => import('@/components/banners/banner-without-slider')
);
const BannerWithPagination = dynamic(
  () => import('@/components/banners/banner-with-pagination')
);
const MAP_BANNER_TO_GROUP: Record<string, any> = {
  classic: BannerWithSearch,
  modern: BannerShort,
  minimal: BannerWithoutSlider,
  standard: BannerWithSearch,
  compact: BannerWithPagination,
  default: BannerWithSearch,
};

const CategoryFooter: React.FC<{ layout: string; variables: any ;filterval:any}> = ({
  layout,
  variables,
  filterval
}) => {
  const { type, error } = useType(variables.type);
  var banners=type?.banners;
  if(filterval?.title!=undefined)
  {
    banners=type?.banners.filter(d=>d.title==filterval?.title)
  }
  
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_BANNER_TO_GROUP[layout];
  return (
    <Component banners={banners} layout={layout} slug={type?.slug} />
  );
};

export default CategoryFooter;