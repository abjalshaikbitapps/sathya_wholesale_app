import type { NextPageWithLayout, Product } from '@/types';
import type { InferGetStaticPropsType } from 'next';
import { getLayout } from '@/components/layouts/layout';
import { AttributesProvider } from '@/components/products/details/attributes.context';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/reviews/average-ratings';
import ProductReviews from '@/components/reviews/product-reviews';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useRouter } from 'next/router';
import { useProduct, useProductSearch } from '@/framework/product';

//FIXME: typescript and layout
const Details = dynamic(() => import('@/components/products/details/details'));
const BookDetails = dynamic(
  () => import('@/components/products/details/book-details')
);
const RelatedProducts = dynamic(
  () => import('@/components/products/details/related-products')
);
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);
export const getServerSideProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common'])),
    },
  });
  export default function ProductsPage()
  {
  const { width } = useWindowSize();
  const {query}=useRouter();
  const { data, isLoading } = useProductSearch({ id:query.slug? query.slug?.toString():"" });
  console.log(data,'lpou');
  const product=data as Product;
  console.log(product,'puhg');

  return (

    <>
      <Seo
        title={product?.name}
        url={product?.slug}
        images={!isEmpty(product?.image) ? [product?.image] : []}
      />
      <AttributesProvider>
        <div className="min-h-screen bg-light">
          {product?.type?.slug === 'books' ? (
            <BookDetails product={product} />
          ) : (
            <>
              <Details product={product} />
              {/* <AverageRatings
                title={product?.name}
                ratingCount={product?.rating_count}
                totalReviews={product?.total_reviews}
                ratings={product?.ratings}
              /> */}
            </>
          )}

          {/* <ProductReviews
            productId={product?.id}
            productType={product?.type?.slug}
          />
          <ProductQuestions
            productId={product?.id}
            shopId={product?.shop?.id}
            productType={product?.type?.slug}
          />
          {product.type?.slug !== 'books' &&
            product?.related_products?.length > 1 && (
              <div className="p-5 lg:p-14 xl:p-16">
                <RelatedProducts
                  products={product.related_products}
                  currentProductId={product.id}
                  gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
                />
              </div>
            )} */}
        </div>
        {width > 1023 && <CartCounterButton />}
      </AttributesProvider>
    </>
  );
};
ProductsPage.getLayout = getLayout;
