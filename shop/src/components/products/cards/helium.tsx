import { Image } from '@/components/ui/image';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { productPlaceholder } from '@/lib/placeholders';
import CartIcon from '@/components/icons/cart';
import { StarIcon } from '@/components/icons/star-icon';
import { useToken } from '@/lib/hooks/use-token';
import { useUser } from '@/framework/user';
import { useState } from 'react';
import { EmptyStarIcon } from '@/components/icons/emptystar-icon';
import classNames from 'classnames';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useInWishlist, useToggleWishlist } from '@/framework/wishlist';
import { HeartFillIcon } from '@/components/icons/heart-fill';
import { HeartOutlineIcon } from '@/components/icons/heart-outline';

function FavoriteButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { me,isAuthorized } = useUser();
  const { toggleWishlist, isLoading: adding } = useToggleWishlist(productId);
  const { inWishlist, isLoading: checking } = useInWishlist({
    enabled: isAuthorized,
    product_id: productId,
  });

  const { openModal } = useModalAction();
  function toggle() {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      return;
    }
    toggleWishlist({ product_id: productId });
  }
  const isLoading = adding || checking;
  if (isLoading) {
    return (
      <div
        className={classNames(
          'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300',
          className
        )}
      >
        <Spinner simple={true} className="flex h-5 w-5" />
      </div>
    );
  }
  return (
    <button
      type="button"
      className={classNames(
        'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center  border-gray-300 transition-colors',
        // {
        //   '!border-accent': inWishlist,
        // },
        className
      )}
      onClick={toggle}
    >
      {inWishlist ? (
        <HeartFillIcon className="h-5 w-5 text-accent" />
      ) : (
        <HeartOutlineIcon className="h-5 w-5 text-accent" />
      )}
    </button>
  );
}
type HeliumProps = {
  product: any;
  className?: string;
  isTbc:boolean;
  className2?: string;
};

const displayValues=["Please signin to see the price","Please upload Document","Please upload Tobacco License","Verification Under Process","Rejected"];

const Helium: React.FC<HeliumProps> = ({ product, className ,className2,isTbc}) => {
  const {getToken} =useToken();
  const checkToken=getToken();
  const {me}=useUser();
  const [viewtbc,setTbc]=useState(checkToken!=null?1:0);
    const [viewbsc,setBsc]=useState(checkToken!=null?1:0);
    
    var vtbc=viewtbc;
    var vbsc=viewbsc;if(checkToken!=null)
    {
    vtbc=me?.tobacco_license!=null||me?.tobacco_license_verify==1?(me?.tobacco_license_verify==1?4:(me?.tobacco_license_reason!=null?5:3)):1;
    vbsc=me?.business_license!=null||me?.business_license_verify==1?(me?.business_license_verify==1?4:(me?.business_license_reason!=null?5:3)):1;
    if(vbsc==3&&vtbc!=3)
    {
      vtbc=2;
      vbsc=3;
    }
   
    }
    if(vbsc==5)
    {
      displayValues[4]= (me?.business_license_reason||"Please Upload valid Document  ");
    }
    if(vtbc==5)
    {
      displayValues[4]= (me?.tobacco_license_reason||"Please Upload valid Document  ");
    }
  const { t } = useTranslation('common');
  const { id, name, image, unit, quantity, min_price, max_price,ratings, product_type, shop_id} =
    product ?? {};
    var checkTbc=(vtbc==3&&shop_id==6)?true:false;
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  var rtval=Math.round(ratings);
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });
  // var renderval:any=[];
  // for(var k=1;k<rtval;k++)
  // {
  //   renderval.push(`*`);
  // }
  // var remainval=5-rtval;
  // for(var k=1;k<remainval;k++)
  // {
  //   renderval.push("0");
  // }
  //For demo purpose
  if(rtval==0)
  {
    rtval=1;
  }
  const remval = 5-rtval
  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product.slug);
  }

  return (
    <article onClick={handleProductQuickView}
      className={cn(
        className2,
        // 'product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm',
        className 
      )}
    >
      {/* <div className='float-right	'>
      <FavoriteButton
        productId={id}
        className={classNames({ 'mr-1':true })}
      />
      </div> */}
     
      <div
        // onClick={handleProductQuickView}
        className="relative flex h-28 w-auto items-center justify-between sm:h-28 row-reverse my-5"
        role="button"
      >
 
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image?.original ?? productPlaceholder}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image bg-right float-right"
        />    
       
        {/* {discount && (
          <div className="absolute top-3 rounded-full bg-yellow-500 px-1.5 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
            {discount}
          </div>
        )} */}
      </div>
      {/* End of product image */}

      <header className="relative p-3 text-center md:p-5 md:py-6">
        <h3
          onClick={handleProductQuickView}
          role="button"
          className="mb-2 truncate text-sm font-semibold text-heading"
        >
          {name}
        </h3>
        <p className="text-xs text-muted">{unit}</p>
        {/* End of product info */}

        <div className="relative mt-2 flex min-h-6 justify-center justify-start md:mt-2">
          {product_type.toLowerCase() === 'variable' ? (
            <>
              <div>
                <span className="text-sm font-semibold text-accent md:text-[15px]">
                  {minPrice}
                </span>
                <span> - </span>
                <span className="text-sm font-semibold text-accent md:text-[15px]">
                  {maxPrice}
                </span>
              </div>
              {/* {renderval} */}
              {Number(quantity) > 0 && (
                <button
                  onClick={handleProductQuickView}
                  className="order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light py-2 px-3 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none sm:order-4 sm:justify-start sm:px-4"
                >
                  <CartIcon className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  <span>{t('text-cart')}</span>
                </button>
              )}
            </>
          ) : (
            <>
              <div className="relative">
                {(vbsc==4&&(shop_id==6?(vtbc==4):true))?(
                <div>
                  {/* <del className="absolute -top-4 text-xs italic text-muted text-opacity-75 md:-top-5">
                    {price}
                  </del> */}
                  <span className="text-sm font-semibold text-accent md:text-base">
                  {basePrice}
                 </span>
                </div>):
                (<div>
                  <div>
                  </div>
                </div>)}
                {/* {checkToken && (isTbc) && (
                  <del className="absolute -top-4 text-xs italic text-muted text-opacity-75 md:-top-5">
                    {basePrice}
                  </del>
                )}
                {checkToken && (isTbc) &&(
                <span className="text-sm font-semibold text-accent md:text-base">
                  {price}
                </span>
                )} */}
              </div>
              <div>
                  {/* {renderval}
                  <StarIcon className="h-2.5 w-2.5 ltr:ml-1 rtl:mr-1" /> */}
                  {/* <div className="flex">
                    {[...Array(rtval)].map((star) => {        
                      return (         
                        // eslint-disable-next-line react/jsx-key
                        <StarIcon className="h-2.5 w-2.5 ltr:ml-1 rtl:mr-1" />        
                      );
                    })}
                 
                    {[...Array(remval)].map((star) => {        
                      return (         
                        // eslint-disable-next-line react/jsx-key
                        <EmptyStarIcon className="h-2.5 w-2.5 ltr:ml-1 rtl:mr-1" />        
                      );
                    })}
                  </div> */}
                  </div>
                  {checkToken && (isTbc) &&(
                  <AddToCart data={product} variant="single" />)}
              {/* {Number(quantity) > 0 && (
                <AddToCart data={product} variant="single" />
              )} */}
            </>
          )}

          {Number(quantity) <= 0 && (
            <div className="rounded bg-red-500 px-2 py-1 text-xs text-light">
              {t('text-out-stock')}
            </div>
          )}
          {/* End of product price */}
        </div>
      </header>
    </article>
  );
};

export default Helium;
