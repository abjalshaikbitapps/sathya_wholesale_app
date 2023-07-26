import { useType } from '@/framework/type';
import { Attachment } from '@/types';
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

const Banner: React.FC<{ layout: string; variables: any ;filterval:any,categories:any}> = ({
  layout,
  variables,
  filterval,
  categories
}) => {
  const { type, error } = useType(variables.type);
  var banners=type?.banners;
  if(filterval)
  {
    banners=type?.banners.filter(d=>d.category==filterval)
  }
  var isCategory=categories?.find((d:any)=>d.slug==filterval);
  // if(isCategory!=undefined)
  // {
    if(banners?.length==0)
    {
      const img:Attachment={ } as Attachment;
      banners=[{
        category:"",
        description:"",
        image:img,
        id:"0",
        title: filterval
  
    
      }]
      
    }
  // }
 
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_BANNER_TO_GROUP[layout];
  return (
    <Component banners={banners} layout={layout} slug={type?.slug} isCategory={isCategory==undefined} />
  );
};

export default Banner;
