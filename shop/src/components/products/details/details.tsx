import BackButton from '@/components/ui/back-button';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import usePrice from '@/lib/use-price';
import { ThumbsCarousel } from '@/components/ui/thumb-carousel';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@/lib/get-variations';
import { useEffect, useMemo, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@/components/ui/truncate';
import { scroller, Element } from 'react-scroll';
import CategoryBadges from './category-badges';
import VariationPrice from './variation-price';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import type { Product } from '@/types';
import { useAtom } from 'jotai';
import VariationGroups from './variation-groups';
import { isVariationSelected } from '@/lib/is-variation-selected';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { stickyShortDetailsAtom } from '@/store/sticky-short-details-atom';
import { useAttributes } from './attributes.context';
import classNames from 'classnames';
import { displayImage } from '@/lib/display-product-preview-images';
import { HeartOutlineIcon } from '@/components/icons/heart-outline';
import { HeartFillIcon } from '@/components/icons/heart-fill';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useUser } from '@/framework/user';
import { useInWishlist, useToggleWishlist } from '@/framework/wishlist';
import { useIntersection } from 'react-use';
import { StarIcon } from '@/components/icons/star-icon';
import { useToken } from '@/lib/hooks/use-token';
import { useState } from 'react';
import { EmptyStarIcon } from '@/components/icons/emptystar-icon';

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
          'mt-0.5 flex h-14 w-12 shrink-0 items-center justify-center rounded-full border border-gray-300',
          className
        )}
      >
        <Spinner simple={true} className="flex h-5 w-5" />
      </div>
    );
  }
  return (
    <p></p>
    // <button
    //   type="button"
    //   className={classNames(
    //     'mt-0.5 flex h-14 w-12 shrink-0 items-center justify-center rounded border border-gray-300 transition-colors',
    //     {
    //       '!border-accent': inWishlist,
    //     },
    //     className
    //   )}
    //   onClick={toggle}
    // >
    //   {inWishlist ? (
    //     <HeartFillIcon className="h-5 w-5 text-accent" />
    //   ) : (
    //     <HeartOutlineIcon className="h-5 w-5 text-accent" />
    //   )}
    // </button>
  );
}
type Props = {
  product: Product;
  backBtn?: boolean;
  isModal?: boolean;
};
const displayValues=[{text:"Please signin to see the price",enableBtn:false,id:0},{text:"Please upload Document",enableBtn:false,id:1},{text:"Please upload Tobacco License",enableBtn:true,id:2},{text:"Verification Under Process",enableBtn:true,id:3},{text:"Rejected",enableBtn:true,id:4}];
const Details: React.FC<Props> = ({
  product,
  backBtn = true,
  isModal = false,
}) => {
  const {
    id,
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    categories,
    gallery,
    type,
    quantity,
    shop,
    slug,
    ratings,
  } = product ?? {};
  
  const { t } = useTranslation('common');
  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const router = useRouter();
  const { closeModal } = useModalAction();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setShowStickyShortDetails(false);
      return;
    }
    if (intersection && !intersection.isIntersecting) {
      setShowStickyShortDetails(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);
  const { attributes } = useAttributes();

  const {getToken} =useToken();
  const checkToken=getToken();
  const { me} = useUser();
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
  });
  var rtval=Math.round(ratings);
const [viewtbc,setTbc]=useState(checkToken!=null?1:0);
const [viewbsc,setBsc]=useState(checkToken!=null?1:0);
    
    var vtbc=viewtbc;
    var vbsc=viewbsc;
    if(checkToken!=null)
    {
    vtbc=me?.tobacco_license!=null||me?.tobacco_license_verify==1?(me?.tobacco_license_verify==1?5:(me?.tobacco_license_reason!=null?4:3)):1;
    vbsc=me?.business_license!=null||me?.business_license_verify==1?(me?.business_license_verify==1?5:(me?.business_license_reason!=null?4:3)):1;
    if(vbsc==3&&vtbc!=3)
    {
      vtbc=2;
      vbsc=3;
    }
   
    }
    if(vbsc==4)
    {
      displayValues[4].text= (me?.business_license_reason||"Please Upload valid Document  ");
    }
    if(vtbc==4)
    {
      displayValues[4].text= (me?.tobacco_license_reason||"Please Upload valid Document  ");
    }
  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };

  const hasVariations = !isEmpty(variations);
  const previewImages = displayImage(selectedVariation?.image, gallery, image);
  
  const { openModal } = useModalAction();
  function handleJoin(prop:any) {
    switch(prop)
    {
      case 0:
        return openModal('LOGIN_VIEW');
      case 1:
        router.push(Routes.profile);
        closeModal();
        break;
        default :
        break;
    }
  }
  //For demo purpose
  // console.log(rtval,'lkli');
  if(rtval==0 || isNaN(rtval))
  {
    rtval=1;
  }
  const remval = 5-rtval

  return (
    <article className="rounded-lg bg-light">
      <div className="flex flex-col border-b border-border-200 border-opacity-70 md:flex-row">
        <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="mb-8 flex items-center justify-between lg:mb-10">
            {backBtn && <BackButton />}
            {/* {discount && (
              <div className="rounded-full bg-yellow-500 px-3 text-xs font-semibold leading-6 text-light ltr:ml-auto rtl:mr-auto">
                {discount}
              </div>
            )} */}
          </div>

          <div className="product-gallery h-full">
            <ThumbsCarousel
              gallery={previewImages}
              hideThumbs={previewImages.length <= 1}
            />
          </div>
        </div>

        <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="w-full" ref={intersectionRef}>
            <div className="flex w-full items-start justify-between space-x-8 rtl:space-x-reverse">
              <h1
                className={classNames(
                  `text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-2xl`,
                  {
                    'cursor-pointer transition-colors hover:text-accent':
                      isModal,
                  }
                )}
                {...(isModal && {
                  onClick: () => navigate(Routes.product(slug)),
                })}
              >
                {name}
              </h1>

              {/* <span>
              <FavoriteButton
                productId={id}
                className={classNames({ 'mr-1':true })}
              />
              </span> */}
            </div>
            <div className="mt-2 flex items-center justify-between">
              {unit && !hasVariations && (
                <span className="block text-sm font-normal text-body">
                  {unit}
                </span>
              )}
            </div>

            {description && (
              <div className="mt-3 text-sm leading-7 text-body md:mt-4">
                <Truncate
                  character={150}
                  {...(!isModal && {
                    onClick: () => scrollDetails(),
                    compressText: 'common:text-see-more',
                  })}
                >
                  {description}
                </Truncate>
              </div>
            )}

            {hasVariations ? (
              <>
                <div className="my-5 flex items-center md:my-10">
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={product.min_price}
                    maxPrice={product.max_price}
                  />
                </div>
                <div>
                  <VariationGroups variations={variations} />
                </div>
              </>
            ) : (
              <span className="my-5 flex items-center md:my-10">
                {(vbsc==5&&(shop?.name =='Tobacco'?(vtbc==5):true))?(
                <div>
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
                <ins className="text-2xl font-semibold text-accent no-underline md:text-3xl">
                  {basePrice}
                </ins>
                {/* <del className="text-sm font-normal text-muted ltr:ml-2 rtl:mr-2 md:text-base">
                    {price}
                  </del> */}
                </div>):(<div> {(shop?.id=='6')?(<div>
                  <button className='flex  ont-semibold text-accent underline transition-colors text-blue-500 duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none ltr:ml-1 rtl:mr-1' disabled={displayValues[vtbc].enableBtn} onClick={()=>handleJoin(displayValues[vtbc].id)}>
                    {!displayValues[vtbc].enableBtn&&(
                   <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor" height="20" width="25"><path fill="blue" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z" id="mainIconPathAttribute"></path></svg>)}
                    {displayValues[vtbc].text}</button> </div>):(<div> 
                      <button disabled={displayValues[vbsc].enableBtn} onClick={()=>handleJoin(displayValues[vbsc].id)}>
                    {!displayValues[vbsc].enableBtn&&(
                   <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor" height="20" width="25"><path fill="blue" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z" id="mainIconPathAttribute"></path></svg>)}
                    {displayValues[vbsc].text}</button>         
                      </div>)}</div>)}
              </span>
            )}
            {/* <div>
              {!checkToken &&(
              <button>
                <div className="mr-5 flex items-center" onClick={handleJoin}>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor" height="20" width="25"><path fill="blue" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z" id="mainIconPathAttribute"></path></svg>
                  <a href="#" className="font-medium text-gray-500">
                    Please signin to see the price
                    </a>
                    </div>
                    </button>
              )}
                    </div> */}
            <div className="mt-6 flex flex-col items-center md:mt-6 lg:flex-row">
              <div className="mb-3 w-full lg:mb-0 lg:max-w-[400px]">
                 {(vbsc==5&&(shop?.id =='6'?(vtbc==5):true))?(
                <AddToCart
                  data={product}
                  variant="big"
                  variation={selectedVariation}
                  disabled={selectedVariation?.is_disable || !isSelected}
                />):null}
              </div>
              <div className='ml-1'>
              <FavoriteButton
                productId={id}
                className={classNames({ 'mr-1':true })}
              />
              </div>
              {!hasVariations && (
                <>
                  {Number(quantity) > 0 ? (
                    <span className="whitespace-nowrap text-base text-body ltr:lg:ml-7 rtl:lg:mr-7">
                      {quantity} {t('text-pieces-available')}
                    </span>
                  ) : (
                    <div className="whitespace-nowrap text-base text-red-500 ltr:lg:ml-7 rtl:lg:mr-7">
                      {t('text-out-stock')}
                    </div>
                  )}
                </>
              )}
              {!isEmpty(selectedVariation) && (
                <span className="whitespace-nowrap text-base text-body ltr:lg:ml-7 rtl:lg:mr-7">
                  {selectedVariation?.is_disable ||
                  selectedVariation.quantity === 0
                    ? t('text-out-stock')
                    : `${selectedVariation.quantity} ${t(
                        'text-pieces-available'
                      )}`}
                </span>
              )}
            </div>
          </div>
          <div className='text-center w-full my-2 lg:hidden md:hidden xs:block'>
          <a href="/checkout" className="bg-green-400 rounded-md px-5 py-2 my-1 font-bold text-[#ffffff]">Go To Cart</a></div>
          {!!categories?.length && (
            <CategoryBadges
              categories={categories}
              basePath={`/${type?.slug}`}
              onClose={closeModal}
            />
          )}

          {shop?.name && (
            <div className="mt-2 flex items-center">
              {/* <span className="py-1 text-sm font-semibold capitalize text-heading ltr:mr-6 rtl:ml-6">
                {t('common:text-sellers')}
              </span> */}

              {/* <button
                onClick={() => navigate(Routes.shop(shop?.slug))}
                className="text-sm tracking-wider text-accent underline transition hover:text-accent-hover hover:no-underline"
              >
                {shop?.name}
              </button> */}
            </div>
          )}
        </div>
      </div>
    {description&&( <Element
        name="details"
        className="border-b border-border-200 border-opacity-70 px-5 py-4 lg:px-16 lg:py-14"
      >
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-heading md:mb-6">
          {t('text-details')}
        </h2>
        <p className="text-sm text-body">{description}</p>
      </Element>)}
     
    </article>
  );
};

export default Details;
