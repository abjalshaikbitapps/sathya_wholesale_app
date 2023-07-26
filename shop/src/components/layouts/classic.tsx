import Banner from '@/components/banners/banner';
import PromotionSliders from '@/components/promotions/promotions';
import Categories from '@/components/categories/categories';
import { Element } from 'react-scroll';
import FilterBar from './filter-bar';
import ProductGridHome from '@/components/products/grids/home';
import type { HomePageProps } from '@/types';
import SidebarFilter from '../search-view/sidebar-filter';
import StickyBox from 'react-sticky-box';
import PopularProductsGrid from '../products/popular-products';
import findNestedData from '@/lib/find-nested-data';
import Link from '@/components/ui/link';
import { useRouter } from 'next/router';
import { useCategories } from '@/framework/category';
import { siteSettings } from '@/config/site';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';
import { useTranslation } from 'next-i18next';
import CategoryCard from '../ui/category-card';
import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { useEffect, useRef, useState } from 'react';
import SectionBlock from '../ui/section-block';


export default function ClassicLayout({ variables }: HomePageProps) {
  const router = useRouter();
  const { pathname, query } = router;
  const { categories, isLoading } = useCategories(variables.categories);
  const parentCategories =categories?.filter(d=>d.parent_id==null);
  const selectedCategory =
    Boolean(query.category) &&
    findNestedData(categories , query.category, 'children');
   const childrenofcat=selectedCategory?.children;
   var prod:any=[];
   childrenofcat?.forEach((element:any) => {
    prod.push(element.slug);
  });
  const divRef:any= useRef<HTMLDivElement>(null);
  function scrollTop()
  {
    if (divRef.current>0) {   
         divRef.current.scrollTo({top:0, behavior: 'smooth' });
      }
  }
    useEffect(() => {
    });
  const {
    products,
    paginatorInfo,
    error,
    loadMore,
    isLoadingMore,
    hasMore,
  } = useProducts({
    limit: PRODUCTS_PER_PAGE,
    orderBy: 'created_at',
    sortedBy: 'DESC',
    ...( { categories:prod}), 
  })
  var tempProd:any = [];
  products.forEach(d=>{
      if(d.sale_price!=null)
      {
        var discountprice=((d.max_price-d.sale_price)/d.max_price)*100;
        var ct=d.categories.find(e=>e.parent_id!=null);
            tempProd.push({
              discountprice:discountprice,
              categoryName:ct?.slug
            });
      }
    });
    var mainprod:any=[];
    function checkMaxProd(searchName:any)
    {
      const maxObject = tempProd.reduce((max:any, obj:any) => {
        if (obj.categoryName === searchName && obj.discountprice > max.discountprice)
        {
          return obj;
        } else {
          return max;
        }
      }, { categoryName: "", discountprice: 0 });
      return maxObject;
    }
    if(childrenofcat!=null)
    {
     childrenofcat.forEach((element:any) => {
      var getMaxval=checkMaxProd(element.slug);
      if(getMaxval.discountprice!=0)
      {
        const updateObj={
        ...element,
        discountPriceValue:Math.round(getMaxval.discountprice)
       }
      mainprod.push(updateObj);
      }
    });
    }
   const { t } = useTranslation('common');
   const onCategoryClick = (slug: string) => {
    if(slug!=undefined)
    {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          category: slug,
        },
      });
    }
  }
  return (
    <>
      <FilterBar variables={variables.categories} />
      <Element
        name="grid"
        className="flex "
      >
     <Element
        name="grid"
        className="grid border-r border-solid border-border-200 border-opacity-70 mt-4"
      >
        <Categories layout="classic" variables={variables.categories} />
        {/* <SidebarFilter />     */}
      </Element>
      <Element
        name="grid"
        className="w-full grid items-center"
      >
        {(router.asPath == '/') ?<Element name="grid"
        className="w-full lg:flex md:flex xs:grid xs:justify-center lg:mt-4 md:mt-4 xs:mt-0" >
        {(router.asPath == '/') ? <PromotionSliders variables={variables.types} /> : null}
          <div className="grid w-full" >

     <a onClick={() => onCategoryClick('automotive')} className='mx-auto  grid ml-3 mr-3 mb-2 py-4  items-center bg-[#e5e5e5]'>
            {/* <div className="col mt-0 mx-3 my-2">
              <div  className="group card-h flex items-center bg-gray-200  overflow-hidden  relative p-4 object-cover" style={{backgroundImage: `url("https://homebasket.app/storage/2690/conversions/Automotive-shop1-thumbnail.jpg")`}}>
                <div className="grid flex-wrap content-center relative">
                  <span className="  text-gray-600 text-lg lg:text-xl md:text-sm xs:text-xs font-semibold mb-3">Automotive</span>
                  <span className="text-accent flex"><a href="/?category=automotive" className='text-lg lg:text-xl md:text-[12px] xs:text-xs lg:w-full md:w-20' >Shop by category</a><div className="material-symbols-rounded text-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 lg:mt-[5px] md:mt-[5px] xs:mt-[0px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </div>
                </span>
              </div>
            </div>
          </div> */}

        <div className="2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex items-center">

        <div className="  2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2  pl-5">
                        <span className="  text-gray-600 text-lg lg:text-xl md:text-sm xs:text-xs font-semibold mb-3 ">Automotive</span>
                        <div className=''>
                        <p className=" inline-flex  text-accent text-lg   mb-3 pt-2"><a href="/?category=automotive" className='lg:text-[1rem] md:text-[0.9rem] xs:text-[0.8rem] ' >Shop by category</a>
                      <div className="material-symbols-rounded text-md">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1 mt-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                      </div>
                      </p>
                      </div>
          </div>
    
          {/* <div className=" side-bg 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2 h-full mb-10 md:mb-0 " style={{backgroundImage: `url("https://testshopsatyawholesale.vercel.app/_next/image?url=https%3A%2F%2Fhomebasket.app%2Fstorage%2F4743%2Fconversions%2FAutomotive-shop1-thumbnail-thumbnail.jpg&w=96&q=75")`}}>

        </div> */}
        <div className='2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2 flex items-center  justify-center'>
        <Image

src="https://testshopsatyawholesale.vercel.app/_next/image?url=https%3A%2F%2Fhomebasket.app%2Fstorage%2F4747%2Fconversions%2Fautopkg-thumbnail.jpg&w=96&q=75"

alt="user"

layout="fixed"

width={100}

height={100}

className="overflow-hidden rounded"

/>
        </div>
      </div>
    </a>
   
    {/* <img src="https://testshopsatyawholesale.vercel.app/_next/image?url=https%3A%2F%2Fhomebasket.app%2Fstorage%2F4743%2Fconversions%2FAutomotive-shop1-thumbnail-thumbnail.jpg&w=96&q=75" alt='user'/>
           */}

          {/* <a href="/?category=tobacco" className=''>
          <div className="mx-auto flex  ml-3 mr-3 mb-2 py-4 md:flex-row flex-col items-center  card-h bg-[#e5e5e5]">
  <div className="lg:flex-grow md:w-1/2 lg:pl-4 md:pl-2 flex flex-col md:items-start md:text-left items-center text-center">
  <div className="grid flex-wrap content-center relative">
                <span className="  text-gray-600 text-lg lg:text-xl md:text-sm xs:text-xs font-semibold mb-3">Tobacco</span>
                <span className="text-accent flex items-center"><a href="/?category=automotive" className='lg:text-[1rem] md:text-[0.9rem] xs:text-[0.8rem] lg:w-full md:w-20' >Shop by category</a><div className="material-symbols-rounded text-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 lg:mt-[3px] md:mt-[3px] xs:mt-[0px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </div>
                </span>
                  </div>
  </div>
    <div  className=" side-bg lg:w-full md:w-1/2 h-full mb-10 md:mb-0 " style={{backgroundImage: `url("https://testadmin-zeta.vercel.app/_next/image?url=https%3A%2F%2Fhomebasket.app%2Fstorage%2F4742%2Fconversions%2Fcigrattel-thumbnail-thumbnail.jpg&w=1920&q=75")`}}>
      </div>

</div>mx-auto flex  ml-3 mr-3 mb-2 py-4 md:flex-row flex-col ite
          </a> */}
          <a onClick={() => onCategoryClick('tobacco')} className='mx-auto  ml-3 mr-3 mb-2 py-4  grid items-center bg-[#e5e5e5]' >
          <div className="2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex items-center">

<div className="  2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2  pl-5">
                <span className="  text-gray-600 text-lg lg:text-xl md:text-sm xs:text-xs font-semibold mb-3 ">Tobaco</span>
                <div className=''>
                <p className=" inline-flex  text-accent text-lg   mb-3 pt-2"><a href="/?category=automotive" className='lg:text-[1rem] md:text-[0.9rem] xs:text-[0.8rem] ' >Shop by category</a>
              <div className="material-symbols-rounded text-md" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1 mt-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
              </p>
              </div>
  </div>
          
        <div className='2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2 flex items-center  justify-center'>
        <Image src="https://testshopsatyawholesale.vercel.app/_next/image?url=https%3A%2F%2Fhomebasket.app%2Fstorage%2F4748%2Fconversions%2Fcigartph-thumbnail.jpg&w=96&q=75"

      alt="user"

      layout="fixed"

      width={100}

      height={100}
      className="overflow-hidden rounded"/>
        </div>
      </div>
          </a>

          <a onClick={() => onCategoryClick('candy')} className='mx-auto grid ml-3 mr-3 mb-2 py-4  items-center bg-[#e5e5e5]'>
        <div className="2xl:flex xl:flex lg:flex md:flex sm:flex xs:flex items-center">

<div className="  2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2  pl-5">
                <span className="  text-gray-600 text-lg lg:text-xl md:text-sm xs:text-xs font-semibold mb-3 ">Candy</span>
                <div className=''>
                <p className=" inline-flex  text-accent text-lg   mb-3 pt-2"><a href="/?category=automotive" className='lg:text-[1rem] md:text-[0.9rem] xs:text-[0.8rem] ' >Shop by category</a>
              <div className="material-symbols-rounded text-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1 mt-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
              </p>
              </div>
  </div>
          
        <div className='2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/2 flex items-center  justify-center'>
        <Image src="https://testshopsatyawholesale.vercel.app/_next/image?url=https%3A%2F%2Fhomebasket.app%2Fstorage%2F4749%2Fconversions%2Fcandysrfg-thumbnail.jpg&w=96&q=75"

      alt="user"

      layout="fixed"

      width={100}

      height={100}
      className="overflow-hidden rounded"/>
        </div>
      </div>
          </a>


          </div>
        </Element>: null}
   
        <Categories layout="minimal" variables={variables.categories} />
        {/* {query?.category&&(<Banner layout="classic" variables={variables.types} filterval={query.category} categories={categories} />)} */}
        {(query?.category!=selectedCategory?.slug||selectedCategory?.parent_id==null)&&(<span className='flex items-center justify-center mt-10 text-gray-600 text-2xl lg:text-[27px] 3xl:text-3xl font-semibold'>New Arrivals</span>)}
        {(query?.category!=selectedCategory?.slug||selectedCategory?.parent_id==null)&&(<PopularProductsGrid categoryName={selectedCategory?.name} variables={variables.popularProducts} catvariables={selectedCategory?.id} />)}

        {/* {query?.category&&(mainprod.length!=0)&&(<div>     
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-4xl font-medium title-font mb-4 text-blue-600">Offers</h1>
          </div>
           <div className="flex flex-wrap mx-4 -m-2 mb-5">
          {mainprod&&mainprod.map((item:any) => (
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={`${item.id}`} >
              <a  href={`/?category=${item.slug}`}>
              <div className="h-52 flex items-center shadow-md bg-white  p-10">
                <Image
                className="  !h-20 !w-8 object-contain"
                src={item?.image?.original ?? productPlaceholder}
                alt={item?.name ?? ''}
                layout="intrinsic"
                width={100}
                height={150}
                // width={432}
                // height={336}
                />
                <div className="flex-grow text-right">
                  <h2 className="text-gray-700 title-font text-1xl font-medium">{t(item.name)}</h2>
                  <p className="text-gray-500">Upto {item.discountPriceValue} % Off</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-4 mt-5 rounded">
                    <a  href={`/?category=${item.slug}`}>Shop Now</a>
                  </button>
                </div>
              </div>
              </a>
            </div>        
          ))}
               </div>
        </div>)}
          */}
        {/* {(router.asPath == '/?category=automotive') ?<><Banner layout="classic" variables={variables.types} filterval={definedvariable1} />
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-4xl font-medium title-font mb-4 text-blue-600">Offers</h1>
          </div>
           <div className="flex flex-wrap mx-4 -m-2 mb-5">
          {mainprod&&mainprod.map((item:any) => (
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={`${item.id}`} >
               <a  href={`/?category=${item.slug}`}>
              <div className="h-52 flex items-center shadow-md bg-white  p-10">
                <Image
                className="  !h-20 !w-8 object-contain"
                src={item?.image?.original ?? productPlaceholder}
                alt={item?.name ?? ''}
                layout="intrinsic"
                width={100}
                height={150}
                />
                <div className="flex-grow text-right">
                  <h2 className="text-gray-700 title-font text-1xl font-medium">{t(item.name)}</h2>
                  <p className="text-gray-500">Upto {item.discountPriceValue}% Off</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-4 mt-5 rounded">
                    <a  href={`/?category=${item.slug}`}>Shop Now</a>
                  </button>
                </div>
              </div>
              </a>
            </div>        
          ))}
               </div>
        </>:null}
        {(router.asPath == '/?category=candy') ?<><Banner layout="classic" variables={variables.types} filterval={definedvariable2} />
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-4xl font-medium title-font mb-4 text-blue-600">Offers</h1>
          </div>
           <div className="flex flex-wrap mx-4 -m-2 mb-5">
          {mainprod&&mainprod.map((item:any) => (
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={`${item.id}`} >
              <a  href={`/?category=${item.slug}`}>
              <div className="h-52 flex items-center shadow-md bg-white  p-10">
                <Image
                className="  !h-20 !w-8 object-contain"
                src={item?.image?.original ?? productPlaceholder}
                alt={item?.name ?? ''}
                layout="intrinsic"
                width={100}
                height={150}
                />
                <div className="flex-grow text-right">
                  <h2 className="text-gray-700 title-font text-1xl font-medium">{t(item.name)}</h2>
                  <p className="text-gray-500">Upto {item.discountPriceValue}% Off</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-4 mt-5 rounded">
                    <a  href={`/?category=${item.slug}`}>Shop Now</a>
                  </button>
                </div>
              </div>
              </a>
            </div>        
          ))}
               </div>
        </>:null}
        {(router.asPath == '/?category=accessories') ?<><Banner layout="classic" variables={variables.types} filterval={definedvariable3} />
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-4xl font-medium title-font mb-4 text-blue-600">Offers</h1>
          </div>
           <div className="flex flex-wrap mx-4 -m-2 mb-5">
          {mainprod&&mainprod.map((item:any) => (
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={`${item.id}`} >
               <a  href={`/?category=${item.slug}`}>
              <div className="h-52 flex items-center shadow-md bg-white  p-10">
                <Image
                className="  !h-20 !w-8 object-contain"
                src={item?.image?.original ?? productPlaceholder}
                alt={item?.name ?? ''}
                layout="intrinsic"
                width={100}
                height={150}
                />
                <div className="flex-grow text-right">
                  <h2 className="text-gray-700 title-font text-1xl font-medium">{t(item.name)}</h2>
                  <p className="text-gray-500">Upto {item.discountPriceValue}% Off</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-4 mt-5 rounded">
                    <a  href={`/?category=${item.slug}`}>Shop Now</a>
                  </button>
                </div>
              </div>
              </a>
            </div>        
          ))}
               </div>
        </>:null}
        {(router.asPath == '/?category=miscellaneous') ?<><Banner layout="classic" variables={variables.types} filterval={definedvariable4} />
        <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-4xl font-medium title-font mb-4 text-blue-600">Offers</h1>
          </div>
           <div className="flex flex-wrap mx-4 -m-2 mb-5">
          {mainprod&&mainprod.map((item:any) => (
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={`${item.id}`} >
              <a  href={`/?category=${item.slug}`}>
              <div className="h-52 flex items-center shadow-md bg-white  p-10">
                <Image
                className="  !h-20 !w-8 object-contain"
                src={item?.image?.original ?? productPlaceholder}
                alt={item?.name ?? ''}
                layout="intrinsic"
                width={100}
                height={150}
                />
                <div className="flex-grow text-right">
                  <h2 className="text-gray-700 title-font text-1xl font-medium">{t(item.name)}</h2>
                  <p className="text-gray-500">Upto {item.discountPriceValue}% Off</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-4 mt-5 rounded">
                    <a  href={`/?category=${item.slug}`}>Shop Now</a>
                  </button>
                </div>
              </div>
              </a>
            </div>        
          ))}
               </div>
        </>:null} */}
        {/* {(router.asPath == '/?category=tobacco') ?
        <div className="text-gray-500 body-font overflow-hidden">
          <div className="bg-local mb-5 container  mx-auto object-cover bg-cover bg-bottom"style={{backgroundImage: `url("http://localhost:8000/storage/2217/bg-tobacco.jpg")`}}>  
            <div className="lg:w-4/5 mx-auto flex flex-wrap items-center py-16">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-blue-500 text-4xl title-font  mb-4 font-bold">Top Offers of Day</h1>
                
                <p className="leading-relaxed mb-4 text-lg">Smoking accessories,Cigars,Dry Tobacco & more</p>
              </div>
               <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
               <Image
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain "
            src={"http://localhost:8000/storage/2218/Tobacco-top-offers.png"}
            alt={'my image'}
            layout="responsive"
            width={432}
            height={336}
            />
               </div>
              
            </div>
          </div>
        </div>:null}
        {(router.asPath == '/?category=candy') ?
        <div className="text-gray-500 body-font overflow-hidden">
          <div className="bg-local mb-5 container  mx-auto object-cover bg-cover bg-bottom"style={{backgroundImage: `url("http://localhost:8000/storage/2224/background.png")`}}>  
            <div className="lg:w-4/5 mx-auto flex flex-wrap items-center py-16">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-blue-500 text-4xl title-font  mb-4 font-bold">Top Offers of Day</h1>
                
                <p className="leading-relaxed mb-4 text-lg">Candy,Bulk candy,Candy changemaker,Candy Gum & more</p>
              </div>
               <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
               <Image
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain "
            src={"http://localhost:8000/storage/2221/candy.png"}
            alt={'my image'}
            layout="responsive"
            width={432}
            height={336}
            />
               </div>
              
            </div>
          </div>
        </div>:null}
        {(router.asPath == '?category=automotive') ?
        <div className="text-gray-500 body-font overflow-hidden">
          <div className="bg-local mb-5 container  mx-auto object-cover bg-cover bg-bottom"style={{backgroundImage: `url("http://localhost:8000/storage/2224/background.png")`}}>  
            <div className="lg:w-4/5 mx-auto flex flex-wrap items-center py-16">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-blue-500 text-4xl title-font  mb-4 font-bold">Top Offers of Day</h1>
                
                <p className="leading-relaxed mb-4 text-lg">Candy,Bulk candy,Candy changemaker,Candy Gum & more</p>
              </div>
               <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
               <Image
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain "
            src={"http://localhost:8000/storage/2221/candy.png"}
            alt={'my image'}
            layout="responsive"
            width={432}
            height={336}
            />
               </div>
              
            </div>
          </div>
        </div>:null} */}
        {/* {(router.asPath == '/') ? <PopularProductsGrid variables={variables.popularProducts} catvariables={variables.categories} />: null} */}
        {/* <PopularProductsGrid variables={variables.popularProducts} catvariables={variables.categories} /> */}
        {router.asPath === '/'? (
  parentCategories && parentCategories.map((categories: any) => (
    <PopularProductsGrid categoryName={categories?.name} key={categories.id} variables={variables.popularProducts} catvariables={categories.id} />
  ))
) : null}
      </Element>   
      </Element>
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
