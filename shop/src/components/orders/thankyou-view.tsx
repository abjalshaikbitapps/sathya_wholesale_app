/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import dayjs from 'dayjs';
import Link from '@/components/ui/link';
import usePrice from '@/lib/use-price';
import { formatAddress } from '@/lib/format-address';
import { formatString } from '@/lib/format-string';
import { Routes } from '@/config/routes';
import { useTranslation } from 'next-i18next';
import { useCart } from '@/store/quick-cart/cart.context';
import { CheckMark } from '@/components/icons/checkmark';
import { OrderItems } from '@/components/orders/order-items';
import { useAtom } from 'jotai';
import { clearCheckoutAtom } from '@/store/checkout';
import SuborderItems from '@/components/orders/suborder-items';
import isEmpty from 'lodash/isEmpty';
import { OrderStatus, PaymentStatus } from '@/types';
import { HomeIconNew } from '@/components/icons/home-icon-new';
import OrderViewHeader from './order-view-header';
import OrderStatusProgressBox from '@/components/orders/order-status-progress-box';
import { useRouter } from 'next/router';

function ThankYouView({ order, language, loadingStatus }: any) {
  const { t } = useTranslation('common');
  const { resetCart } = useCart();
  const [, resetCheckout] = useAtom(clearCheckoutAtom);
  const router = useRouter();

  useEffect(() => {
    resetCart();
    resetCheckout();
  }, [resetCart, resetCheckout]);

  const { price: total } = usePrice({ amount: order?.paid_total! });
  const { price: wallet_total } = usePrice({
    amount: order?.wallet_point?.amount!,
  });
  const { price: sub_total } = usePrice({ amount: order?.amount! });
  const { price: shipping_charge } = usePrice({
    amount: order?.delivery_fee ?? 0,
  });
  const { price: tax } = usePrice({ amount: order?.sales_tax ?? 0 });
  const { price: discount } = usePrice({ amount: order?.discount ?? 0 });
  return (
    <div>
      <div className="text-center mt-60">
<div className='thank-you'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-24 h-24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
<p className="my-2 text-gray-600 font-normal">THANK YOU FOR YOUR PURCHASE</p>
 <p className="my-1 text-gray-500">Your order number is: <b> {order?.tracking_number}</b></p>
 <p className="my-2 mt-4 text-gray-500"> We'll email you an order confirmation with details and tracking info

</p>
<button onClick={()=>{router.push(Routes.home)}} className="bg-green-500 rounded-md px-24 py-2 my-1 font-bold text-[#ffffff]">Continue Shopping</button>

</div>
{/* <div className="container-fluid">
<div className='grid mt-28 justify-center items-center'>
     <h5>THANK YOU FOR YOUR PURCHASE</h5>

<p className="text-sm text-body-dark">
Your order number is :
    {order?.tracking_number}
  </p>
  <div>We'll email your an order confirmation with details and tracking info </div>
  <div> <button className='w-100 rounded-none bg-green-500 text-gray-300' onClick={()=>{router.push(Routes.home)}} >Continue Shopping </button></div>
    </div>
</div> */}
    </div>
    
   //old code for orders page 
    // <div className="p-4 sm:p-8">
    //   <div className="mx-auto w-full max-w-screen-lg">
    //     <div className="mb-5">
    //       <Link
    //         href={Routes.home}
    //         className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
    //       >
    //         <HomeIconNew />
    //         {t('text-back-to-home')}
    //       </Link>
    //     </div>
    //     <div className="relative overflow-hidden rounded border shadow-sm">
    //       <OrderViewHeader order={order} buttonSize="small" loading={loadingStatus} />
    //       <div className="bg-light p-6 sm:p-8 lg:p-12">
    //         <div className="mb-6 grid gap-4 sm:grid-cols-2 md:mb-12 lg:grid-cols-4">
    //           <div className="rounded border border-border-200 py-4 px-5 shadow-sm">
    //             <h3 className="mb-2 text-sm font-semibold text-heading">
    //               {t('text-order-number')}
    //             </h3>
    //             <p className="text-sm text-body-dark">
    //               {order?.tracking_number}
    //             </p>
    //           </div>
    //           <div className="rounded border border-border-200 py-4 px-5 shadow-sm">
    //             <h3 className="mb-2 text-sm font-semibold text-heading">
    //               {t('text-date')}
    //             </h3>
    //             <p className="text-sm text-body-dark">
    //               {dayjs(order?.created_at).format('MMMM D, YYYY')}
    //             </p>
    //           </div>
    //           <div className="rounded border border-border-200 py-4 px-5 shadow-sm">
    //             <h3 className="mb-2 text-sm font-semibold text-heading">
    //               {t('text-total')}
    //             </h3>
    //             <p className="text-sm text-body-dark">{total}</p>
    //           </div>
    //           <div className="rounded border border-border-200 py-4 px-5 shadow-sm">
    //             <h3 className="mb-2 text-sm font-semibold text-heading">
    //               {t('text-payment-method')}
    //             </h3>
    //             <p className="text-sm text-body-dark">
    //               {order?.payment_gateway ?? 'N/A'}
    //             </p>
    //           </div>
    //         </div>
    //         {/* end of order received  */}

    //         {/* start of order Status */}
    //         <div className="mb-8 flex w-full items-center justify-center md:mb-12">
    //           <OrderStatusProgressBox
    //             orderStatus={order?.order_status as OrderStatus}
    //             paymentStatus={order?.payment_status as PaymentStatus}
    //           />
    //         </div>
    //         {/* end of order Status */}

    //         <div className="flex flex-col lg:flex-row">
    //           <div className="mb-12 w-full lg:mb-0 lg:w-1/2 ltr:lg:pr-3 rtl:lg:pl-3">
    //             <h2 className="mb-6 text-xl font-bold text-heading">
    //               {t('text-total-amount')}
    //             </h2>
    //             <div>
    //               <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-5/12 text-sm font-semibold text-heading sm:w-4/12">
    //                   {t('text-sub-total')}
    //                 </strong>
    //                 :
    //                 <span className="w-7/12 text-sm ltr:pl-4 rtl:pr-4 sm:w-8/12 ">
    //                   {sub_total}
    //                 </span>
    //               </p>
    //               <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-5/12 text-sm font-semibold text-heading sm:w-4/12">
    //                   {t('text-shipping-charge')}
    //                 </strong>
    //                 :
    //                 <span className="w-7/12 text-sm ltr:pl-4 rtl:pr-4 sm:w-8/12 ">
    //                   {shipping_charge}
    //                 </span>
    //               </p>
    //               <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-5/12 text-sm font-semibold text-heading sm:w-4/12">
    //                   {t('text-tax')}
    //                 </strong>
    //                 :
    //                 <span className="w-7/12 text-sm ltr:pl-4 rtl:pr-4 sm:w-8/12 ">
    //                   {tax}
    //                 </span>
    //               </p>
    //               <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-5/12 text-sm font-semibold text-heading sm:w-4/12">
    //                   {t('text-discount')}
    //                 </strong>
    //                 :
    //                 <span className="w-7/12 text-sm ltr:pl-4 rtl:pr-4 sm:w-8/12 ">
    //                   {discount}
    //                 </span>
    //               </p>
    //               <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-5/12 text-sm font-semibold text-heading sm:w-4/12">
    //                   {t('text-total')}
    //                 </strong>
    //                 :
    //                 <span className="w-7/12 text-sm ltr:pl-4 rtl:pr-4 sm:w-8/12">
    //                   {total}
    //                 </span>
    //               </p>
    //               {wallet_total && (
    //                 <p className="mt-5 flex text-body-dark">
    //                   <strong className="w-5/12 text-sm font-semibold text-heading sm:w-4/12">
    //                     {t('text-paid-from-wallet')}
    //                   </strong>
    //                   :
    //                   <span className="w-7/12 text-sm ltr:pl-4 rtl:pr-4 sm:w-8/12">
    //                     {wallet_total}
    //                   </span>
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //           {/* end of total amount */}

    //           <div className="w-full lg:w-1/2 ltr:lg:pl-3 rtl:lg:pr-3">
    //             <h2 className="mb-6 text-xl font-bold text-heading">
    //               {t('text-order-details')}
    //             </h2>
    //             <div>
    //             <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-4/12 text-sm font-semibold text-heading">
    //                   {t('text-name')}
    //                 </strong>
    //                 :
    //                 <span className="w-8/12 text-sm ltr:pl-4 rtl:pr-4 ">
    //                   {order?.customer_name}
    //                 </span>
    //               </p>

    //               <p className="mt-5 flex text-body-dark">
    //                 <strong className="w-4/12 text-sm font-semibold text-heading">
    //                   {t('text-total-item')}
    //                 </strong>
    //                 :
    //                 <span className="w-8/12 text-sm ltr:pl-4 rtl:pr-4 ">
    //                   {formatString(order?.products?.length, t('text-item'))}
    //                 </span>
    //               </p>
    //               {!isEmpty(order?.delivery_time) && (
    //                 <p className="mt-5 flex text-body-dark">
    //                   <strong className="w-4/12 text-sm font-semibold text-heading">
    //                     {t('text-deliver-time')}
    //                   </strong>
    //                   :
    //                   <span className="w-8/12 text-sm ltr:pl-4 rtl:pr-4 ">
    //                     {order?.delivery_time}
    //                   </span>
    //                 </p>
    //               )}
    //               {!isEmpty(order?.shipping_address) && (
    //                 <p className="mt-5 flex text-body-dark">
    //                   <strong className="w-4/12 text-sm font-semibold text-heading">
    //                     {t('text-shipping-address')}
    //                   </strong>
    //                   :
    //                   <span className="w-8/12 text-sm ltr:pl-4 rtl:pr-4 ">
    //                     {formatAddress(order?.shipping_address!)}
    //                   </span>
    //                 </p>
    //               )}
    //               {!isEmpty(order?.billing_address) && (
    //                 <p className="mt-5 flex text-body-dark">
    //                   <strong className="w-4/12 text-sm font-semibold text-heading">
    //                     {t('text-billing-address')}
    //                   </strong>
    //                   :
    //                   <span className="w-8/12 text-sm ltr:pl-4 rtl:pr-4">
    //                     {formatAddress(order?.billing_address!)}
    //                   </span>
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //           {/* end of order details */}
    //         </div>
    //         <div className="mt-12">
    //           <OrderItems products={order?.products} orderId={order?.id} />
    //         </div>
    //         {order?.children?.length > 1 ? (
    //           <div>
    //             <h2 className="mt-12 mb-6 text-xl font-bold text-heading">
    //               {t('text-sub-orders')}
    //             </h2>
    //             <div>
    //               <div className="mb-12 flex items-start rounded border border-gray-700 p-4">
    //                 <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-sm bg-dark px-2 ltr:mr-3 rtl:ml-3">
    //                   <CheckMark className="h-2 w-2 shrink-0 text-light" />
    //                 </span>
    //                 <p className="text-sm text-heading">
    //                   <span className="font-bold">{t('text-note')}:</span>{' '}
    //                   {t('message-sub-order')}
    //                 </p>
    //               </div>
    //               {Array.isArray(order?.children) && order?.children.length && (
    //                 <div className="">
    //                   <SuborderItems items={order?.children} />
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         ) : null}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

interface Props {
  order: any;
  loadingStatus?: boolean;
}

const Thankyou: React.FC<Props> = ({ order, loadingStatus }) => {
  return (
    <ThankYouView
      order={order}
      language={order?.language}
      loadingStatus={loadingStatus}
    />
  );
};

export default Thankyou;
