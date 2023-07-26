import { useTranslation } from 'next-i18next';
import { getLayout } from '@/components/layouts/layout';
import { useThreeplQuery, useUser } from '@/framework/user';
export { getStaticProps } from '@/framework/general.ssr';
import 'react-phone-input-2/lib/bootstrap.css';
import Image from 'next/image';
import { productPlaceholder } from '@/lib/placeholders';


export default function ThreeplPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const {data}=useThreeplQuery();
  
  console.log(data);


  return (
   <>
 <div className="h-96 bg-gray-50 flex items-center">
	<section className="w-full xs:grid xs:items-center bg-cover bg-center py-32 bg-[url('https://keenitsolutions.com/products/wordpress/dabble/wp-content/uploads/2021/06/22.jpg')]">
  
		<div className="container mx-auto text-center text-white lg:mt-0 md:mt-10 xs:mt-24">
			<h1 className="text-5xl font-medium mb-6">3PL Solutions</h1>
      <nav className="flex justify-center" aria-label="Breadcrumb">
  <ol role="list" className="flex items-center space-x-4">
    <li>
      <div>
        <a href="/" className="text-gray-400 hover:text-gray-500">
          <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Home</span>
        </a>
      </div>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        <a href="/3pl" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">3PL Solutions</a>
      </div>
    </li>
  
  </ol>
</nav>
<div className='flex justify-center lg:w-1/2 md:w-1/2 xs:w-full m-auto '>
			<p className="text-md mt-12 ">To provide pivotal supply chain management solutions and simplify the process of logistics while prioritising quality management in supply chain. We focus on logistics & supply chain management as a whole.</p>
      </div>
		</div>
	</section>
</div>
{data&&data.data.map((item:any) => (
        <section className="text-gray-600 body-font bg-gray-200 " key={item.id}>
          {item.id%2==0?(
             <div className="container px-5 py-24 mx-auto flex flex-wrap">
             <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
             {/* <div  className="group card-h flex items-center bg-gray-200  overflow-hidden  relative p-4 object-cover w-1/2" style={{backgroundImage: `url("https://satyawholesalers.com/wp-content/themes/dabble/assets/custompage/images/Warehouse.png")`}}></div> */}
             <Image
             className="!h-20 !w-8 object-contain"
             src={item.image[0].original??productPlaceholder }
             alt=""
             layout="intrinsic"
             width={800}
             height={500}/>
         
             </div>
             <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center items-center">
               <div className="flex flex-col mb-10 lg:items-start items-center">
               
                 <div className="flex-grow lg:mr-8 md:mr-8 xs:mr-0">
                   {/* <h2 className="text-[#0088ff]  lg:text-[36px] md:text-[36px] xs:text-[26px] title-font font-medium  mb-3">{item.sub_name}</h2>
                   <p className="leading-relaxed text-[16px] text-[#454545] text-justify">Satya Wholesale has laid the foundation of several state of the art warehouses for storage and distribution across India. With its abundant knowledge of global systems and processes adapting, along with adapting the latest technical know-how, it reliably fulfills the needs of various industries by offering Customized and sustainable solutions. PISPL implements unique strategies to raise the standards, strength and scalability of our Customers. </p> */}
                   <div
             className="prose prose-sm"
             dangerouslySetInnerHTML={{ __html: item.description }}
           />
                   {/* <p className="text-highlight my-4 font-bold text-[#1e3a8a]">Why trust our expertise?</p>
         
                   <p className="leading-relaxed text-base text-[#454545] text-justify">As a long-standing business partner for over 4 decades, to a wide range of reputed organizations, PISPL has played a strategic role in Customizing, delivering and delighting Customers by adding value and contributing to their growth story. Our commitment to provide customized logistics solutions has resulted in a flawless experience  across the entire value chain from freight forwarding to last mile distribution.</p> */}
                 </div>
               </div>
              
                                       
                                     
         
             </div>
           </div>
          ):(
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
 
            <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center items-center">
              <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="lg:mr-8 md:mr-8 xs:mr-0 flex-grow">
                  {/* <h2 className="title-font mb-3  lg:text-[36px] md:text-[36px] xs:text-[26px] font-medium text-[#0088ff]">{item.sub_name}</h2> */}
                  <div
             className="prose prose-sm"
             dangerouslySetInnerHTML={{ __html: item.description }}
           />
                  {/* <p className="mb-3 text-justify text-base leading-relaxed text-[#454545]">Satya wholesale has built a seamless transportation process and an effective logistics management system by integrating carriers, expanding networks, multi-mode transportation services and professional expertise with which we endeavor to provide reliable distribution of your products across the USA.</p>
                  <p className="mb-3 text-justify text-base leading-relaxed text-[#454545]">Our highly specialized logistics experts across the system appropriately coordinate transportation and distribution networks that ensure accurate implementation of processes, communication, data and <strong>timely&nbsp;deliveries.</strong></p>
                  <p className="text-justify text-base leading-relaxed text-[#454545]">Our <strong>pick-up services </strong>are immaculate as our customer service executives, and delivery teams work round the clock and pick up inventories or goods from the given points/warehouses/center at the earliest and transport them to their respective destinations speedily.</p> */}
                </div>
              </div> 
                                                           
            </div>
               <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden lg:mt-0 md:mt-0 xs:mt-5">
             
               <Image
            className="!h-20 !w-8 object-contain"
            src={item.image[0].original??productPlaceholder}
            alt=""
            layout="intrinsic"
            width={800}
            height={500}/>
            </div>
        
          </div>
          )}
       
      </section>
      ))}



   </>
  );
}
ThreeplPage.getLayout = getLayout;