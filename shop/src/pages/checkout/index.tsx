import { useTranslation } from 'next-i18next';
import { billingAddressAtom, deliveryTimeAtom, shippingAddressAtom } from '@/store/checkout';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import { getLayout } from '@/components/layouts/layout';
import { AddressType } from '@/framework/utils/constants';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
export { getStaticProps } from '@/framework/general.ssr';
import Card from '@/components/ui/cards/card';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { useSettings } from '@/framework/settings';
// const ScheduleGrid = dynamic(
//   () => import('@/components/checkout/schedule/schedule-grid')
// );
const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false }
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid')
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false }
);

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { id, address, profile, } = me ?? {};
  const { openModal } = useModalAction();
  const [userPhone,setUserPhone]=useState(me?.phone_number);
  useEffect(() => {
   localStorage.setItem("Phone",JSON.stringify(userPhone));
  }, [userPhone]);
  const {
    settings: { deliveryTime: schedules },
  }: any = useSettings();
  const [selectedSchedule, setSchedule] = useAtom(deliveryTimeAtom);
  useEffect(() => {
    setSchedule(schedules[0]);
  }, []);
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

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="px-4 py-8 bg-gray-100 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="flex flex-col items-center w-full max-w-5xl m-auto rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <Card className="flex w-full flex-col">
              <div className="mb-5 flex items-center justify-between md:mb-8">
              <p className="text-lg capitalize text-heading lg:text-xl">
                {t('text-contact-number')}
              </p>
      </div>
      <div>

        {/* <input
        className={cn(
          'flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0',
          false && 'focus:shadow',
          variantClasses['normal'],
          sizeClasses['medium'],
          false && 'cursor-not-allowed bg-gray-100',
          'mb-5'
          )}
          type="text"
          onChange={(e)=>setUserPhone(e.target.value)}
          value={userPhone}
          /> */}
          <PhoneInput
            country="us"
            inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rtl:!rounded-l-none focus:!border-accent !h-12"
            dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
            value={userPhone}
            onChange={setUserPhone}
          />
          </div>
          </Card>
                <AddressGrid
                userId={id!}
                className="p-5 bg-light shadow-700 md:p-8"
                label={t('text-billing-address')}
                count={2}
                //@ts-ignore
                addresses={address?.filter(
                  (item) => item?.type === AddressType.Billing
                )}
                atom={billingAddressAtom}
                type={AddressType.Billing}
                />
                <AddressGrid
                userId={me?.id!}
                className="p-5 bg-light shadow-700 md:p-8"
                label={t('text-shipping-address')}
                count={3}
                //@ts-ignore
                addresses={address?.filter(
                  (item) => item?.type === AddressType.Shipping
                )}
                atom={shippingAddressAtom}
                type={AddressType.Shipping}
                />
                {/* <ScheduleGrid
                className="p-5 bg-light shadow-700 md:p-8"
                label={t('text-delivery-schedule')}
                count={4}
                /> */}
                </div>
                <div className="w-full mt-10 mb-10 sm:mb-12 lg:mb-0 lg:w-96 md:w-4/5">
                  <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;
