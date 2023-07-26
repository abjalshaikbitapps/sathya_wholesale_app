import Logo from '@/components/ui/logo';
import cn from 'classnames';
import StaticMenu from './menu/static-menu';
import { useAtom } from 'jotai';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@/store/authorization-atom';
import { useIsHomePage } from '@/lib/use-is-homepage';
import { useMemo } from 'react';
import { useHeaderSearch } from '@/layouts/headers/header-search-atom';
import LanguageSwitcher from '@/components/ui/language-switcher';
import CartCheckBagIcon from '@/components/icons/cart-check-bag';
import { formatString } from '@/lib/format-string';
import { useCart } from '@/store/quick-cart/cart.context';
import { drawerAtom } from '@/store/drawer-atom';
import { useLogout, useUser } from '@/framework/user';
import { useCategories } from '@/framework/category';
import { HeartOutlineIcon } from '../icons/heart-outline';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import findNestedData from '@/lib/find-nested-data';
import Link from '@/components/ui/link';
import { useWishlistHeader } from '@/store/quick-cart/wishlist.context';
import SearchWithSuggestion from '../ui/search/search-with-suggestion';
import { useWishlist } from '@/framework/wishlist';

const Search = dynamic(() => import('@/components/ui/search/search'));
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const Contactdropdown = dynamic(() => import('./menu/contact-dropdown'),{ssr:false,});

const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });
const Header = ({ layout ,variableType}: { layout?: string,variableType:any }) => {
  const { t } = useTranslation('common');
  const { show, hideHeaderSearch } = useHeaderSearch();
  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const [isAuthorize] = useAtom(authorizationAtom);
  const { totalUniqueItems, total } = useCart();
  const { wishlistTerm,updateWishlistTerm} = useWishlistHeader();
  const [_, setDisplayCart] = useAtom(drawerAtom);
  const isHomePage = useIsHomePage();
  const { me } : any = useUser();
  const router = useRouter();
  const isMultilangEnable =
    process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
    !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;
  // useEffect(() => {
  //   if (!isHomePage) {
  //     hideHeaderSearch();
  //   }
  // }, [isHomePage]);
  // var wishlists:any=[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {wishlists,count}=useWishlist();
  // console.log(wishlists,count,"wishlist");
  // const {wishlists=[]}=me?useWishlist():{};
  // if(me)

  // {


  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   ({ wishlists } =useWishlist())

  // }
  const { mutate: logout } = useLogout();

  const { categories, isLoading, error } = useCategories(variableType?.categories);
  const { pathname, query } = router;
  const filteredParents = categories.filter((parent) =>
   parent.slug == query.category || parent?.children.some((child:any) => child.slug==query.category)
);
var childrenofcat:any=[];
if (filteredParents.length > 0) {
  var childrenofcat = filteredParents[0].children;
  console.log(childrenofcat);
} else {
  console.log("No matching parents found.");
}
// const childrenofcat=children;

  var isHome=(childrenofcat&&childrenofcat.length!=0)

  // const selectedCategory =
  // Boolean(query.category) &&
  // findNestedData(categories , query.category, 'children');
  // const childrenofcat=selectedCategory?.children;
  

  var isHome=(childrenofcat&&childrenofcat.length!=0)




  const isFlattenHeader = useMemo(
    () => !show&& isHomePage && layout !== 'modern',
    [show, isHomePage, layout]
  );
  function handleCartSidebar() {
    setDisplayCart({ display: true, view: 'cart' });
  }
  return (
    <header
      className={cn(
        'site-header-with-search sticky top-0 z-50',
        {
          'lg:h-auto': isFlattenHeader,
        },
        {
          'h-auto md:h-auto lg:!h-auto':isHome
        },
        {
          'h-28 xs:!h-[75px] md:h-28 lg:!h-28':!isHome
        }  
      )}
    >
      <div
        className={cn(
          'lg:flex md:flex xs:hidden h-6 w-full transform-gpu items-center justify-between border-b border-border-200 bg-white px-4 py-5 shadow-sm transition-transform duration-300 md:h-6 lg:h-6 lg:px-6 z-10',
          {
            'lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none':
              isFlattenHeader,
          }
        )}
      >
      <div className="flex items-end ml-3 lg:w-1/2 md:w-[70%] xs:w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mb-2"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>&nbsp;
          <a href="tel:+91 999 555 4565" className="block mb-1 mr-3 text-sm font-medium text-gray-400 hover:text-gray-500">+91 999 555 4565</a>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mb-2"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>&nbsp;
          <a href="mailto:ecominfo@gmail.com" className="block mb-1 text-sm font-medium text-gray-400 hover:text-gray-500">satyawholesaleinfo@gmail.com</a>
          </div>
          <div className="lg:flex items-center justify-end lg:w-1/2 md:flex md:w-[30%] xs:w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <label className="block mr-3 text-sm font-medium text-gray-400 hover:text-gray-500">(USA)</label>
            <label className="block  text-sm font-medium text-gray-400 hover:text-gray-500"><div className="flex  items-center">
            <div className='ml-2'>
              EN
            </div>
          </div>
        </label>
        </div>
      </div>
      <div
        className={cn(
        'flex w-full transform-gpu items-center justify-between border-b border-border-200 bg-white px-4 py-6 shadow-sm transition-transform duration-300 md:h-10 lg:h-10 lg:px-8 z-50',
          {
            'lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none':
              isFlattenHeader,
          }
        )}
      >
        <div className="lg:flex items-center w-full lg:w-auto">
          <Logo
            className={`${
              !isMultilangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
            }`}
          />
          {isMultilangEnable ? (
            <div className="ltr:ml-auto rtl:mr-auto lg:hidden">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}
        </div>
        <SearchWithSuggestion
            label="search"
            className="hidden lg:block !z-50"
            variant="with-shadow"
          />  
        {isHomePage ? (
          <>
            {/* {(show || layout === 'modern') && (
              <div className="w-full xs:hidden px-10 mx-auto overflow-hidden md:block lg:block xl:w-11/12 2xl:w-10/12">
                <Search label={t('text-search-label')} variant="minimal" /> 
              </div>
            )} */}
            {displayMobileHeaderSearch && (
              
                <div className="absolute top-0 block h-full w-full bg-light px-5 pt-1.5 ltr:left-0 rtl:right-0 md:pt-2 lg:hidden !z-20">
                   <div className="lg:flex items-center w-full lg:w-auto">
                  <Logo
                  className={`${
                    !isMultilangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
                  }`}
          />
          {isMultilangEnable ? (
            <div className="ltr:ml-auto rtl:mr-auto lg:hidden">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}
        </div>  
                {/* <Search label={t('text-search-label')} variant="minimal" /> */}
                <SearchWithSuggestion
                label="search"
                className=" lg:block"
                variant="with-shadow"
                /> 
              </div>
            )}
          </>
        ) : null}
        {(me==undefined||me?.business_license!=null||me?.business_license_verify==1)?
        (<ul className="items-center shrink-0 space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a
              href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
              target="_blank"
              rel="noreferrer"
            >
            </a>
            <li className='xl-block lg-block md-block sm-hidden xs-hidden xl-hide'>{isAuthorize ? <AuthorizedMenu /> : <JoinButton />}</li>
            {/* <button onClick={()=>(router.push(Routes.wishlists))} className='xl-block lg-block md-block sm-hidden xs-hidden xl-hide'>
              <HeartOutlineIcon className="h-5 w-5 text-accent" />
              <p className='uniqueWishlist'>{formatString(count, t(''))}</p>
            </button> */}
            <button
              className="xl-block lg-block md-block sm-hidden xs-hidden product-cart lg:flex flex-col items-center pt-2 xl-hide"
              onClick={handleCartSidebar}
            >
            <span className="flex pb-0.5">
        <CartCheckBagIcon className="shrink-0 relative" width={14} height={16} />
        <p className='uniqueCart'>{formatString(totalUniqueItems, t(''))}</p>
        {/* <span className="flex ltr:ml-2 rtl:mr-2 ">Cart
        </span> */}
      </span>
      </button>
      <Contactdropdown></Contactdropdown>
          </div>
          {isMultilangEnable ? (
            <div className="flex-shrink-0 hidden ms-auto lg:me-5 xl:me-8 2xl:me-10 lg:block">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}
        </ul>):<div>
       <button 
       onClick={() => logout()}>
          Logout
        </button>
        </div> }
      </div>
      
      <div
        className={cn(
         'md:hidden lg:flex h-6 w-full transform-gpu items-center justify-between border-b border-border-200 categorie-header px-10 py-5 shadow-sm transition-transform duration-300 md:h-6 lg:h-6 lg:px-8 z-10 contents displa',
          {
            'lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none':
              isFlattenHeader,
          }
        )}
      >
        {(me==undefined||me?.business_license!=null||me?.business_license_verify==1)?
        (<ul className="lg:pl-5  categorie-header py-5 md:h-6 lg:h-6 items-center hidden shrink-0 space-x-5 rtl:space-x-reverse lg:flex 2xl:space-x-5 m-right">
         <StaticMenu categories={categories}/>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a
              href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
              target="_blank"
              rel="noreferrer"
            >
            </a>
          </div>
          {isMultilangEnable ? (
            <div className="flex-shrink-0 hidden ms-auto lg:me-5 xl:me-8 2xl:me-10 lg:block">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}
        </ul>):<div>
       <button 
       onClick={() => logout()}>
          Logout
        </button>
        </div> }
      </div>

      {(childrenofcat&&childrenofcat.length!=0) ?
      <div className="bg-white z-50 displa">
   
      <div className="relative flex items-center justify-center h-10 displa max-w-7xl mx-auto px-2 sm:px-6 lg:px-1">
      <div className="hidden md:block h-10 bg-gray-200 ">
      <ul className="lg:pl-[40px] items-center hidden shrink-0 space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10 whitespace-nowrap h-10 category-submenu" >
      {Array.isArray(childrenofcat) &&
          childrenofcat?.map((item: any, idx: number) => (
        // eslint-disable-next-line react/jsx-key
        <Link
          href={`/?category=${item.slug}`}
          className={`text-sm font-medium text-gray-500 hover:text-gray-700 ${item.slug==query.category?'text-blue-500':''}`}
        >
          {item.name}
        </Link>
          ))}
      </ul>
      </div>
      </div>
 
      </div>: null}

    </header>
  );
};

export default Header;