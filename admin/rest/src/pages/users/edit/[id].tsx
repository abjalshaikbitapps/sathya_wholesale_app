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
import UserCreateForm from '@/components/user/user-form';


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

  // function handleClick(ev:any)
  // {
  //   window.open((ev=='buse')? dt?.business_license:dt?.tobacco_license,'_blank')
  // }
  
      return (
      <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-user')}
        </h1>
      </div>
      <UserCreateForm  initialValues={data}/>
          </>
        );
      }
      UpdateUserPage.Layout = Layout;
      export const getServerSideProps = async ({ locale }: any) => ({
        props: {
          ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
        },
      });
