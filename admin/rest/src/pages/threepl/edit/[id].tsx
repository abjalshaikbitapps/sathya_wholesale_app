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
import { Tpl, User } from '@/types';
import Card from '@/components/common/card';
import {useState } from 'react';
import cn from 'classnames';
import {  useTplQuery } from '@/data/threepl';
import ThreeplCreateForm from '@/components/threepl/threepl-form';


export default function UpdateTplPage() {
  const { query } = useRouter();

  const { t } = useTranslation();
  var id=query.id as string;
  const {
    data,
    isLoading: loading,
    error,
  } = useTplQuery ({id});
  var data1={description:"test",name:"user",image:""}
  const dt=data as  Tpl;
  
      if (loading) return <Loader text={t('common:text-loading')} />;
      if (error) return <ErrorMessage message={error.message} />;
      return (
      <>
    <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('Edit')}
        </h1>
      </div>
      <ThreeplCreateForm  initialValues={data}/>
          </>
        );
      }
      UpdateTplPage.Layout = Layout;
      export const getServerSideProps = async ({ locale }: any) => ({
        props: {
          ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
        },
      });
