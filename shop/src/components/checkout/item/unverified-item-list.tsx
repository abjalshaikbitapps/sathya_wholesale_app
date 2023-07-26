import { useCart } from '@/store/quick-cart/cart.context';
import { useTranslation } from 'next-i18next';
import ItemCard from './item-card';
import EmptyCartIcon from '@/components/icons/empty-cart';
import usePrice from '@/lib/use-price';
import { ItemInfoRow } from './item-info-row';
import { Image } from '@/components/ui/image';
import { CheckAvailabilityAction } from '@/components/checkout/check-availability-action';
import { siteSettings } from '@/config/site';
import { useToggleWishlist } from '@/framework/wishlist';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useUser } from '@/framework/user';

const UnverifiedItemList = ({ hideTitle = false }: { hideTitle?: boolean }) => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty } = useCart();
  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );
  const { clearItemFromCart } = useCart();
  const { isAuthorized } = useUser();
  const { toggleWishlist, isLoading: adding } = useToggleWishlist('');
  const { openModal } = useModalAction();
  function toggle(productId:any) {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    toggleWishlist({ product_id: productId });
  }
  return (
    <div className="w-full">
      {!hideTitle && (
        <div className="mb-4 flex flex-col items-center space-x-4 rtl:space-x-reverse">
          <span className="text-base font-bold text-heading">
            {t('text-your-order')}
          </span>
        </div>
      )}
      <div className="flex flex-col py-3">
        {isEmpty ? (
          <div className="mb-4 flex h-full flex-col items-center justify-center">
            <EmptyCartIcon width={140} height={176} />
            <h4 className="mt-6 text-base font-semibold">
              {t('text-no-products')}
            </h4>
          </div>
        ) : (
          items?.map((item) =><div className="border-b border-solid border-border-200 border-opacity-75 py-1 px-1" key={item.id}> 
          <div className="lg:hidden md:hidden xs:block flex justify-center text-center mb-2 lg:ml-80 md:ml-80 xs:ml-0">
              <a className="mr-2" onClick={()=>clearItemFromCart(item.id)}>Remove</a>
              <a className="mr-2">|</a>
              <a className="ml-1 mr-1" onClick={()=>{toggle(item.id);clearItemFromCart(item.id)}}>Move </a>
              <a className="mr-1" onClick={()=>{toggle(item.id);clearItemFromCart(item.id)}}> to </a>
              <a className="mr-1" onClick={()=>{toggle(item.id);clearItemFromCart(item.id)}}>wishlist</a>
          </div>
          <div className="relative mx-4 flex h-10 lg:w-42 shrink-0 items-center justify-center bg-gray-100 sm:h-16 sm:w-16 ">
          <div>
            <Image 
              src={item?.image ?? siteSettings?.product?.placeholderImage}
              alt={item.name}
              layout="fill"
              objectFit="contain"/>
              </div>
              <div className="lg:block md:block xs:hidden flex justify-between lg:ml-80 md:ml-80 xs:ml-0 whitespace-nowrap">
              <a className="mr-2" onClick={()=>clearItemFromCart(item.id)}>Remove</a>
              <a className="mr-2">|</a>
              <a className="ml-1 mr-1" onClick={()=>{toggle(item.id);clearItemFromCart(item.id)}}>Move </a>
              <a className="mr-1" onClick={()=>{toggle(item.id);clearItemFromCart(item.id)}}> to </a>
              <a className="mr-1" onClick={()=>{toggle(item.id);clearItemFromCart(item.id)}}>wishlist</a>
          </div>
          </div>
          <ItemCard item={item}/></div>)
        )}
      </div>
      <div className="mt-4 space-y-2">
        <ItemInfoRow title={t('text-sub-total')} value={subtotal} />
        <ItemInfoRow
          title={t('text-tax')}
          value={t('text-calculated-checkout')}
        />
        <ItemInfoRow
          title={t('text-estimated-shipping')}
          value={t('text-calculated-checkout')}
        />
      </div>
      <CheckAvailabilityAction>
        {t('text-check-availability')}
      </CheckAvailabilityAction>
    </div>
  );
};
export default UnverifiedItemList;
