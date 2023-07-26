import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import { siteSettings } from '@/settings/site.settings';
import usePrice from '@/utils/use-price';
import Badge from '@/components/ui/badge/badge';
import { Router, useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Product,
  MappedPaginatorInfo,
  ProductType,
  Shop,
  SortOrder,
} from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import { format } from 'date-fns';
import PagesizeComponent from '../ui/pagesize';

export type IProps = {
  products: Product[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagesize:(sizepage: number) => void;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

type SortingObjType = {
  sort: SortOrder;
  column: string | null;
};

const ProductList = ({
  products,
  paginatorInfo,
  onPagesize,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  // const { data, paginatorInfo } = products! ?? {};
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<SortingObjType>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  let columns = [
    // {
    //   title: t('table:table-item-image'),
    //   dataIndex: 'image',
    //   key: 'image',
    //   align: alignLeft,
    //   width: 74,
    //   render: (image: any, { name }: { name: string }) => (
    //     <Image
    //       src={image?.thumbnail ?? siteSettings.product.placeholder}
    //       alt={name}
    //       layout="fixed"
    //       width={42}
    //       height={42}
    //       className="overflow-hidden rounded"
    //     />
    //   ),
    // },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 300,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('table:table-item-sku'),
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (sku: any) => (
        <span className="truncate whitespace-nowrap">{sku}</span>
      ),
    },
    // {
    //   title: t('table:table-item-group'),
    //   dataIndex: 'type',
    //   key: 'type',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (type: any) => (
    //     <span className="truncate whitespace-nowrap">{type?.name}</span>
    //   ),
    // },
    {
      title: t('table:table-item-description'),
      dataIndex: 'description',
      key: 'description',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (description: any) => (
        <span className="truncate whitespace-nowrap">{description}</span>
      ),
    },
    {
      title: t('table:table-item-price'),
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (price: any) => (
        <span className="truncate whitespace-nowrap">{price}</span>
      ),
    },
    // {
    //   title: t('table:table-item-unit'),
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (unit: any) => (
    //     <span className="truncate whitespace-nowrap">{unit}</span>
    //   ),
    // },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-unit')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'price'
          }
          isActive={sortingObj.column === 'price'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'price',
      key: 'price',
      align: alignRight,
      width: 180,
      onHeaderCell: () => onHeaderClick('price'),
      render: function Render(value: number, record: Product) {
        const { price: max_price } = usePrice({
          amount: record?.max_price as number,
        });
        const { price: min_price } = usePrice({
          amount: record?.min_price as number,
        });

        const { price } = usePrice({
          amount: value,
        });

        const renderPrice =
          record?.product_type === ProductType.Variable
            ? `${min_price} - ${max_price}`
            : price;

        return (
          <span className="whitespace-nowrap" title={renderPrice}>
            {renderPrice}
          </span>
        );
      },
    },

    {
      title: t('table:table-item-saleprice'),
      dataIndex: 'sale_price',
      key: 'sale_price',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (sale_price: any) => (
        <span className="truncate whitespace-nowrap">{sale_price}</span>
      ),
    },
    {
      title: t('table:table-item-createdat'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      align: 'center',
      ellipsis: true,
      render: (created_at: any) => (
        <span className="truncate whitespace-nowrap">{format(new Date(created_at),'yyyy-MM-dd')}</span>
      ),
    },
    // {
    //   title: t('table:table-item-statetax'),
    //   dataIndex: 'statetax',
    //   key: 'statetax',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (statetax: any) => (
    //     <span className="truncate whitespace-nowrap">{statetax}</span>
    //   ),
    // },
    // {
    //   title: t('table:table-item-countrytax'),
    //   dataIndex: 'countrytax',
    //   key: 'countrytax',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (countrytax: any) => (
    //     <span className="truncate whitespace-nowrap">{countrytax}</span>
    //   ),
    // },
    // {
    //   title: t('table:table-item-buyingprice'),
    //   dataIndex: 'buyingprice',
    //   key: 'buyingprice',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (buyingprice: any) => (
    //     <span className="truncate whitespace-nowrap">{buyingprice}</span>
    //   ),
    // },
    // {
    //   title: t('table:table-item-localtax'),
    //   dataIndex: 'localtax',
    //   key: 'localtax',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (localtax: any) => (
    //     <span className="truncate whitespace-nowrap">{localtax}</span>
    //   ),
    // },
    // {
    //   title: t('table:table-item-shop'),
    //   dataIndex: 'shop',
    //   key: 'shop',
    //   width: 120,
    //   align: 'center',
    //   ellipsis: true,
    //   render: (shop: Shop) => (
    //     <span className="truncate whitespace-nowrap">{shop?.name}</span>
    //   ),
    // },
    // {
    //   title: 'Product Type',
    //   dataIndex: 'product_type',
    //   key: 'product_type',
    //   width: 120,
    //   align: 'center',
    //   render: (product_type: string) => (
    //     <span className="truncate whitespace-nowrap">{product_type}</span>
    //   ),
    // },
    // {
    //   title: (
    //     <TitleWithSort
    //       title={t('table:table-item-quantity')}
    //       ascending={
    //         sortingObj.sort === SortOrder.Asc &&
    //         sortingObj.column === 'quantity'
    //       }
    //       isActive={sortingObj.column === 'quantity'}
    //     />
    //   ),
    //   className: 'cursor-pointer',
    //   dataIndex: 'quantity',
    //   key: 'quantity',
    //   align: 'center',
    //   width: 150,
    //   onHeaderCell: () => onHeaderClick('quantity'),
    //   render: (quantity: number) => {
    //     if (quantity < 2) {
    //       return (
    //         <Badge
    //           text={t('common:text-out-of-stock')}
    //           color="bg-red-500 text-white"
    //         />
    //       );
    //     }
    //     return <span>{quantity}</span>;
    //   },
    // },
    // {
    //   title: t('table:table-item-status'),
    //   dataIndex: 'status',
    //   key: 'status',
    //   align: 'left',
    //   width: 180,
    //   render: (status: string, record: any) => (
    //     <div
    //       className={`flex justify-start ${
    //         record?.quantity > 0 && record?.quantity < 10
    //           ? 'flex-col items-baseline space-y-3 3xl:flex-row 3xl:space-x-3 3xl:space-y-0 rtl:3xl:space-x-reverse'
    //           : 'items-center space-x-3 rtl:space-x-reverse'
    //       }`}
    //     >
    //       <Badge
    //         text={status}
    //         color={
    //           status.toLocaleLowerCase() === 'draft'
    //             ? 'bg-yellow-400'
    //             : 'bg-accent'
    //         }
    //       />
    //       {record?.quantity > 0 && record?.quantity < 10 && (
    //         <Badge
    //           text={t('common:text-low-quantity')}
    //           color="bg-red-600"
    //           animate={true}
    //         />
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (slug: string, record: Product) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_PRODUCT"
          routes={Routes?.product}
        />
      ),
    },
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== 'shop');
  }

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={products}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>
    
      {!!paginatorInfo?.total && (
        
        <div className="flex items-center justify-between">
          <PagesizeComponent
          onChange={onPagesize}
          value={paginatorInfo?.perPage}
          />
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
