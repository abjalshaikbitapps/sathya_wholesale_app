import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Button from '@/components/ui/button';
import ProductLoader from '@/components/ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import ProductCard from '@/components/products/cards/card';
import ErrorMessage from '@/components/ui/error-message';
import { useProducts } from '@/framework/product';
import { useCategories } from '@/framework/category';

import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import type { Product } from '@/types';
import { useRouter } from 'next/router';
import { HomeIcon } from '../icons/home-icon';
import { Routes } from '@/config/routes';
import Sorting from '../search-view/sorting';

interface Props {
  limit?: number;
  sortedBy?: string;
  orderBy?: string;
  column?: 'five' | 'auto';
  shopId?: string;
  variables?:any;
  gridClassName?: string;
  products: Product[] | undefined;
  isLoading?: boolean;
  error?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
  isLicensed?:boolean;
}

export function Grid({
  className,
  gridClassName,
  products,
  isLoading,
  error,
  loadMore,
  variables,
  isLoadingMore,
  hasMore,
  limit = PRODUCTS_PER_PAGE,
  column = 'auto',
  isLicensed
}: Props) {
  const { t } = useTranslation('common');
  const router = useRouter();

  // @ts-ignore
  const { categories } = useCategories(variables);
  var arraycat:any[]=[];
  const results = categories?.filter((parent:any) =>
    parent.children.some((child:any) => child.slug === router.query.category)
    ).map((parent:any) => {
    var val=parent.children.find((child:any) => child.slug === router.query.category)
      arraycat.push({name:parent.name,slug:parent.slug});
      arraycat.push({name:val.name,slug:val.slug});
      return arraycat;
    });  
  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !products?.length) {
    return (
      <div className="min-h-full w-full px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="text-not-found" className="mx-auto w-7/12" />
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="py-6">
      <nav className="flex justify-between" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
      <li>
      <div>
      <a href={Routes.home} className="text-gray-400 hover:text-gray-500">
      <HomeIcon className="h-5 w-5 flex-shrink-0 ml-4" aria-hidden="true" />
      <span className="sr-only">Home</span>
      </a>
      </div>
      </li>
      {arraycat&&arraycat.map((page:any) => (
      <li key={page.name}>
      <div className="flex items-center">
      <svg
      className="h-5 w-5 flex-shrink-0 text-gray-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
      >
      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
      </svg>
      <a
      href={`/?category=${page.slug}`}
      className="text-sm font-medium text-gray-500 hover:text-gray-700"
      aria-current={page.slug ? 'page' : undefined}
      >
      {page.name}
      </a>
      </div>
      </li>
      ))}
      </ol>      
      <Sorting variant='dropdown'/>
      </nav>
      </div>
      <div
        className={cn(
          {
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3':
              column === 'auto',
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'five',
          },
          gridClassName
        )}
      >
        {isLoading && !products?.length
          ? rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : products?.map((product) => (
              <ProductCard product={product} key={product.id} className2="product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm transition-shadow hover:shadow-downfall-lg group" isTobacco={isLicensed}/>
            ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="h-11 text-sm font-semibold md:text-base"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </div>
  );
}
interface ProductsGridProps {
  className?: string;
  gridClassName?: string;
  variables?: any;
  column?: 'five' | 'auto';
}
export default function ProductsGrid({
  className,
  gridClassName,
  variables,
  column = 'auto',
}: ProductsGridProps) {
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts(variables);

  const productsItem:any = products;
  return (
    <Grid
      products={productsItem}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
}
