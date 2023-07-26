
import { useRouter } from 'next/router';
import { useRegister, useVerifyMutation } from '@/framework/user';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GeneralLayout from '@/components/layouts/_general';
import { usePopularProducts } from '@/framework/product';
import SectionBlock from '@/components/ui/section-block';
import classNames from 'classnames';
import rangeMap from '@/lib/range-map';
import ProductLoader from '@/components/ui/loaders/product-loader';
import ProductCard from '@/components/products/cards/card';
import Button from '@/components/ui/button';
import { siteSettings } from '@/config/site';


interface Props {
    className?: string;
    limit?: number;
    variables: any;
    catvariables:any;
    categoryName:any;
  }

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
export default function NewArrivalPage({
    className,
    limit = 10,
    catvariables,
    categoryName,
  }: Props) {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const slugval=query.id as string;
  var variables={
    "type_slug": "satya-wholesale",
    "limit": 30,
    "with": "type;author",
    "language": "en",
    "catvariables": [
        slugval
    ],
}
  const { products, isLoading, error } = usePopularProducts(variables);
  var catfilter:any=products;


  return (
    <>
      <div>
      <SectionBlock title={t('New Arrivals')}>
      <div className={classNames(className, 'w-full  py-2 px-2')}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:gap-8 xl:gap-y-12 2xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
          {isLoading && !catfilter.length
            ? rangeMap(limit, (i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))
            : catfilter.map((product:any) => (
                <ProductCard product={product} className='product-card cart-type-helium h-full overflow-hidden border-r border-solid border-border-200 bg-light transition-shadow duration-200 relative w-full h-35rounded-lg p-1 bg-light border border-1 border-gray-300 transition-shadow hover:shadow-downfall-lg group 'key={product?.id} />
              ))}
        </div>
      </div>
      {/* <Button
      className="h-11 w-40 text-sm font-semibold md:text-base place-self-center " onClick={()=>{onCategoryClick(catvariables)}}>

            {t('text-view-more')}
          </Button> */}
    </SectionBlock>
      </div>
      <footer className=" bg-blue-900 text-gray-600 body-font">
  <div className="container md:px-0 sm:px-0 pt-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
  <div className="flex-grow flex flex-wrap md:pl-0 md:text-left text-center justify-between order-first">
  <div className="lg:w-1/6 md:w-1/2 w-full px-4 lg:pl-4 md:pl-24">
  <h2 className="title-font font-medium text-blue-500  text-sm mb-3">Company</h2>
  <nav className="list-none text-xs mb-10">
  <li className="py-1">
  <a className="text-white">Products</a>
  </li>
  <li className="py-1">
  <a className="text-white">Contact Us</a>
  </li>
  <li className="py-1">
  <a className="text-white">About Us</a>
  </li>
  <li className="py-1">
  <a className="text-white">Blog</a>
  </li>
  </nav>
  </div>
  <div className="lg:w-1/6 md:w-1/2 w-full px-4">
  <h2 className="title-font font-medium text-blue-500  text-sm mb-3">Privacy &amp; Policy</h2>
  <nav className="list-none text-xs mb-10">
  <li className="py-1">
  <a className="text-white">Privacy</a>
  </li>
  <li className="py-1">
  <a className="text-white">Return Policy</a>
  </li>
  <li className="py-1">
  <a className="text-white">Team of Use</a>
  </li>
  <li className="py-1">
  <a className="text-white">Security</a>
  </li>
  </nav>
  </div>
  <div className="lg:w-1/6 md:w-1/2 w-full px-4 lg:pl-4 md:pl-24">
  <h2 className="title-font font-medium text-blue-500  text-sm mb-3">Social</h2>
  <nav className="list-none text-xs mb-10">
  <li className="py-1">
  <a className="text-white">Facebook</a>
  </li>
  <li className="py-1">
  <a className="text-white">Twitter</a>
  </li>
  <li className="py-1">
  <a className="text-white">Instagram</a>
  </li>
  </nav>
  </div>
  <div className="lg:w-1/6 md:w-1/2 w-full px-4">
  <h2 className="title-font font-medium text-blue-500  text-sm mb-3">Mail Us</h2>
  <nav className="list-none text-xs mb-10">
  <li className="py-1">
  <a className="text-white">satyawholesaleinfo@gmail.com</a>
  </li>
  <li className="py-1">
  <a className="text-white">satyawholesale,</a>
  </li>
  <li className="py-1">
  <a className="text-white">1303 W Walnut Hill,Suite</a>
  </li>
  <li className="py-1">
  <a className="text-white">260Irving TX 75038,USA</a>
  </li>
  </nav>
  </div>
  <div className="lg:w-1/6 md:w-1/2 w-full px-4 lg:pl-4 md:pl-24">
  <h2 className="title-font font-medium text-blue-600  text-sm mb-3">Registered Office</h2>
  <nav className="list-none text-xs mb-10">
  <li className="py-1">
  <a className="text-white">1303 W Walnut Hill,</a>
  </li>
  <li className="py-1">
  <a className="text-white">Suite 260Irving TX 75038</a>
  </li>
  </nav>
  </div>
  <div className="lg:w-1/6 md:w-1/2 w-full px-4 lg:mb-0 md:mb-0 xs:pb-2">
 <a href="https://testadmin-zeta.vercel.app/login" className="text-white flex xs:justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -mt-0">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>
<span className='text-xs'>Admin Login</span></a>
  </div>
  </div>
 

  </div>
 {/* <div className='flex justify-end py-2 pr-3'>
 <a onClick={scrollTop} className="font-medium text-gray-500 ">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</a>
 </div> */}
  </footer>

  <div className="container px-5 md:px-14 sm:px-6 py-5  mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="flex-grow flex flex-wrap md:pl-2 items-center md:text-left text-center order-first md:flex md:justify-between ">
      <div className="lg:w-2/12 mx-4 flex lg:pb-0 md:pb-0 xs:pb-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent mr-2">
  <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" /></svg>
        <h2 className="title-font font-medium text-gray-500  text-sm">GiftCards</h2>
        </div>
        <div className="lg:w-2/12 mx-4 flex items-center">
          <div className='h-4 w-4 bg-accent flex items-center justify-center rounded-full mr-2 lg:mb-0 md:mb-0 xs:mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 text-white">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
</svg>

          </div>
          <h2 className="title-font font-medium text-gray-500  text-sm">Advertise</h2>
          </div>
          <div className="lg:w-2/12 mx-4 flex lg:pb-0 md:pb-0 xs:pb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent mr-2">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>
<h2 className="title-font font-medium text-gray-500  text-sm">Help Center</h2>
</div>
<div className="lg:w-2/12 mx-4 flex lg:pb-0 md:pb-0 xs:pb-2">
  
  <h2 className="title-font font-medium text-gray-500  text-sm">&#169; 2023 satyawholesale.com</h2>
  </div>
  {siteSettings.footer.payment_methods && (
    <div></div>
          // <div className="order-1 mb-5 lg:w-2/12 mx-4 flex items-center space-x-5 rtl:space-x-reverse lg:order-2 lg:mb-0 lg:mt-0 md:w-full md:mt-10">
          //   {siteSettings.footer.payment_methods.map((method, idx) => (
          //     <a
          //       className="relative flex h-5 w-auto items-center overflow-hidden md:w-full"
          //       key={`${method.url}-${idx}`}
          //       href={method.url}
          //     >
          //       {/* eslint-disable */}
          //       <img src={method.img} className="max-h-full max-w-full" />
          //     </a>
          //   ))}
          // </div>
        )}
      </div>

  </div> 
    </>
  );
}
NewArrivalPage.getLayout = getLayout;

