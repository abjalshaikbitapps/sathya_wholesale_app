import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { useRouter } from 'next/router';
import { useOrder } from '@/framework/order';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import Thankyou from '@/components/orders/thankyou-view';

export { getServerSideProps } from '@/framework/order.ssr';

export default function ThankyPage() {
  const { query } = useRouter();
  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number!.toString(),
  });

  if (isLoading) {
    return <Spinner showText={false} />;
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Thankyou order={order} loadingStatus={!isLoading && isFetching} />
    </>
  );
}

ThankyPage.getLayout = getLayout;
