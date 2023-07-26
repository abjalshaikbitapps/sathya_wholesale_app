import Layout from '@/components/layouts/admin';
import { useRouter } from 'next/router';
import CreateOrUpdateShippingForm from '@/components/shipping/shipping-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useShippingQuery } from '@/data/shipping';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useUpdateUserMutation, useUserQuery } from '@/data/user';
import { productPlaceholder } from '@/utils/placeholders';
import Image from 'next/image';
import { User } from '@/types';
import Card from '@/components/common/card';
import {useState } from 'react';
import cn from 'classnames';
import CustomerCreateForm from '@/components/customer/customer-form';


export default function UpdateUserPage() {
  const { query } = useRouter();
  const { mutate: updateProfile } = useUpdateUserMutation();
  const [ischeck,setCheck]=useState(false);
  const [ischecktobacco,setChecktobacco]=useState(false);

  const { t } = useTranslation();
  var id=query.id as string;
  const {
    data,
    isLoading: loading,
    error,
  } = useUserQuery ({id});
  const dt=data as  User;
  const [businessvalue,setBusinessLicense]=useState(0);
  const [tobaccovalue,setTobaccoLicense]=useState(0);
  const [businesslicensereason,setbusinesslicensereason]=useState('');
  const [tobaccolicensereason,settobaccolicensereason]=useState('');
  function setBusiness(valu:any,reason:any)
  {
    if((reason==null||reason=='')&&valu==0){
      alert("Please fill reason");
      return;
     }     
       setCheck(false);
       setBusinessLicense(valu);
       updateProfile({
        id: dt?.id,
        input: {
        businessLicenseVerify:valu,
        businessLicenseReason:reason
      },
    });

  }
  function setTobacco(valu:any,reason:any)
  {
    if((reason==null||reason=='')&&valu==0){
     alert("Please fill reason");
     return;
    }
    setChecktobacco(false);
    setTobaccoLicense(valu);
    updateProfile({
      id: dt?.id,
      input: {
        tobaccoLicenseVerify:valu,
        tobaccoLicenseReason:reason
      },
    });
  }
  const imgTypes = [
    'tif',
    'tiff',
    'bmp',
    'jpg',
    'jpeg',
    'gif',
    'png',
    'eps',
    'raw',
  ];
  // function handleClick(ev:any)
  // {
  //   window.open((ev=='buse')? dt?.business_license:dt?.tobacco_license,'_blank')
  // }
  const splitArray = dt?.business_license?.split('.');
  const splitArray1 = dt?.tobacco_license?.split('.');
      const isImage = dt?.business_license && imgTypes.includes(splitArray[1]); // check if the original filename has the img ext
      const isImage1 = dt?.tobacco_license && imgTypes.includes(splitArray1[1]); 
      const variantClasses = {
        normal:
          'bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent',
        solid:
          'bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent',
        outline: 'border border-border-base rounded focus:border-accent',
        line: 'ltr:pl-0 rtl:pr-0 border-b border-border-base rounded-none focus:border-accent',
      };
    
      const sizeClasses = {
        small: 'text-sm h-9',
        medium: 'h-12',
        big: 'h-14',
      };
      if (loading) return <Loader text={t('common:text-loading')} />;
      if (error) return <ErrorMessage message={error.message} />;
      return (
      <>
      <div className='text-xl font-sans '>Document verification</div>
      <Card className="w-full">
      <div className="flex items-center justify-between mb-5 md:mb-8">
      {(dt?.business_license == null&&dt?.business_license_verify==0)?
      (
      <div className='text-center'>
        There is no business license documents
      </div>
      ):null
      }
      {(dt?.business_license != null)?
              (
      <div className="block mb-3 text-sm font-semibold leading-none text-body-dark mt-1">
          Verify Business License
          {isImage ? (
          <figure className="relative w-28 h-16">
            <Image
            src={data?.business_license ?? productPlaceholder}
            alt={ t('text-no-result-found')}
            className="object-contain w-full h-full"
            layout="fill"
            objectFit="contain"
            onClick={(ev)=>{window.open(dt?.business_license,'_blank')}}
            />
            </figure>
            ) : (
            <button 
            className="flex items-center justify-center w-20 h-10 rounded bg-accent text-light"
            onClick={(ev)=>{window.open(dt?.business_license,'_blank')}}> Open </button>)}
            </div>
            ):null
          }
          
            <div className ="flex">
            <button
            onClick={()=>setBusiness(1,"")}
            disabled={dt.business_license_verify!=0}
            className={cn("flex items-center justify-center w-20 h-10 rounded bg-accent text-light mr-1",
            {
              'bg-sky-500/50': dt.business_license_verify!=0
            }
            )}> Approve
            </button>
            <button
            onClick={()=>{setCheck(true)}}
            className="flex items-center justify-center w-20 h-10 rounded bg-red-600 text-light"> Reject
            </button>
            </div>
             
            </div>
            <div className='flex items-center justify-between mb-5 md:mb-8'>
            {ischeck&&(<div className='flex'><input className={cn(
          'flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0 mr-2',
          false && 'focus:shadow',
          variantClasses['normal'],
          sizeClasses['medium'],
          false && 'cursor-not-allowed bg-gray-100',
          'mb-5'
          )} value={businesslicensereason} onChange={(e) =>{setbusinesslicensereason(e.target.value)}} />
            <button 
            onClick={()=>setBusiness(0,businesslicensereason)} className="flex items-center  justify-center w-20 h-10 rounded bg-accent text-light mr-1" type='button' >Submit</button>
            </div>)}
            </div>
          <div className="flex items-center justify-between mb-5 md:mb-8">
          {(dt?.tobacco_license == null&&dt?.tobacco_license_verify==0)?
          (
          <div className='text-center'>
            There is no tobacco license documents
          </div>
          ):null
        }
          {(dt?.tobacco_license != null)?
            (
            <div className="block mb-3 text-sm font-semibold leading-none text-body-dark">
              Verify Tobacco License
              {isImage1 ? (
              <figure className="relative w-28 h-16">
                <Image
                src={data?.tobacco_license ?? productPlaceholder}
                alt={ t('text-no-result-found')}
                className="object-contain w-full h-full"
                layout="fill"
                objectFit="contain" 
                onClick={(ev)=>{window.open(dt?.tobacco_license,'_blank')}}
                />
                </figure>
                ) : (
                <button 
                className="flex items-center justify-center w-20 h-10 rounded bg-accent text-light"
                onClick={(ev)=>{window.open(dt?.tobacco_license,'_blank')}}> Open </button>)}
                </div>
                ):null
              }
              
                <div className ="flex">
                <button
                onClick={()=>setTobacco(1,"")}
                disabled={dt.tobacco_license_verify!=0}
                className={cn("flex items-center justify-center w-20 h-10 rounded bg-accent text-light mr-1",
                {
                  'bg-sky-500/50' : dt.tobacco_license_verify!=0
                }
                )}> Approve
                </button>
                <button
                onClick={()=>{setChecktobacco(true)}}
                className="flex items-center justify-center w-20 h-10 rounded bg-red-600 text-light"> Reject
                </button>
                </div>
                
                </div>
                <div className='flex items-center justify-between mb-5 md:mb-8'>
            {ischecktobacco&&(<div className='flex'>
              <input className={cn(
          'flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0 mr-2',
          false && 'focus:shadow',
          variantClasses['normal'],
          sizeClasses['medium'],
          false && 'cursor-not-allowed bg-gray-100',
          'mb-5'
          )}
             value={tobaccolicensereason} onChange={(e) =>{settobaccolicensereason(e.target.value)}} />
            <button 
            onClick={()=>setTobacco(0,tobaccolicensereason)} className="flex items-center justify-center w-20 h-10 rounded bg-accent text-light" type='button' >Submit</button>
            </div>)}
            </div>
                </Card>
                <Card>
                  <CustomerCreateForm initialValues={data}/>
                </Card>
          </>
        );
      }
      UpdateUserPage.Layout = Layout;
      export const getServerSideProps = async ({ locale }: any) => ({
        props: {
          ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
        },
      });
