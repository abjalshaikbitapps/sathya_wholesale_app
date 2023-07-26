import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import LinkButton from '@/components/ui/link-button';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useCustomersQuery, useUsersListQuery, useUsersQuery } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import { SortOrder } from '@/types';
import { adminOnly } from '@/utils/auth-utils';
import UserMasterList from '@/components/user/user-list';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPagesize] = useState(5);
  const { t } = useTranslation();

  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { users, paginatorInfo, loading, error } = useUsersListQuery({
    limit: pageSize,
    page,
    name: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">
            Users
          </h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.user.create}`}
            className="ms-4 md:ms-6 h-12"
          >
            <span>+ Add User </span>
          </LinkButton>
        </div>
      </Card>

      {loading ? null : (
        <UserMasterList
          customers={users}
          paginatorInfo={paginatorInfo}
          onPagesize={(evt:any)=>setPagesize(evt)}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
          isCustomer={false}
        />
      )}
    </>
  );
}

Users.authenticate = {
  permissions: adminOnly,
};
Users.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
