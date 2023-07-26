import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useCategories } from '@/framework/category';
import { useSearch } from '../ui/search/search.context';

const StickySidebarListCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-list-categories')
);
const StaticSidebarVerticalRectangleCategories = dynamic(
  () => import('@/components/categories/sliding-vertical-rectangle-categories')
);
const StickySidebarBoxedCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-boxed-categories')
);
const FilterCategoryGrid = dynamic(
  () => import('@/components/categories/filter-category-grid')
);
const SlidingCardCategories = dynamic(
  () => import('@/components/categories/sliding-card-category')
);
const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,
  modern: StickySidebarBoxedCategories,
  standard: StaticSidebarVerticalRectangleCategories,
  minimal: FilterCategoryGrid,
  compact: SlidingCardCategories,
  default: StickySidebarListCategories,
};
interface CategoriesProps {
  layout: string;
  variables: any;
  className?: string;
}
export default function Categories({
  layout,
  className,
  variables,
}: CategoriesProps) {
  const { categories, isLoading, error } = useCategories(variables);
  const {searchTerm}=useSearch()
  var catfilter:any=categories;
  if(searchTerm!=""){
    catfilter=catfilter.filter((d:any)=>d.name.toUpperCase( ).includes(searchTerm.toUpperCase( )));
  }
  if(catfilter.length==0)
  {
    catfilter=categories;
  }
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_CATEGORY_TO_GROUP[layout];
  return (
    <>
    <Component
      notFound={!Boolean(catfilter.length)}
      categories={catfilter}
      loading={isLoading}
      className={className}
      variables={variables}
    />
    </>
  );
}
