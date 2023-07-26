import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { Grid } from '@/components/products/grid';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useSearch } from '@/components/ui/search/search.context';
interface Props {
  className?: string;
  variables: any;
  column?: any;
  gridClassName?: string;
}
export default function ProductGridHome({
  className,
  variables,
  column,
  gridClassName,
}: Props) {
  const { query } = useRouter();
  const  tobaccovariables=[''];
  // const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
  //   useProducts({
  //     ...variables,
  //     ...(query.category && { categories: query.category }),
  //     ...(query.text && { name: query.text }),
  //   });
  const between = (x:any,sale_price: number, max_price: number) => {
    return x >= sale_price && x <= max_price;
  }
  const { searchType, ...restQuery }: any = query;
    const {
    products,
    isLoading,
  paginatorInfo,
    error,
    loadMore,
    isLoadingMore,
    hasMore,
  } = useProducts({
    limit: PRODUCTS_PER_PAGE,
    orderBy: 'created_at',
    sortedBy: 'DESC',
    ...(query?.category && { categories: (query.category as string).split(',')}),
    ...(searchType && { type: searchType }),
    ...restQuery,
  });
  var tempProd:any=[];
  // tempProd=products;
   if(query?.discountprice)
   {
    var disprice=query.discountprice as string;
    var splitvalues= disprice.split(',');
    products.forEach(d=>{
      if(d.sale_price!=null)
      {
        var discountprice=((d.max_price-d.sale_price)/d.max_price)*100;
        if(discountprice>0&&between(discountprice,Number(splitvalues[0]),Number( splitvalues[1])))
        {
            tempProd.push(d);
        }
      }
    });
   }
   if(query?.arrival)
   {
    var arival=query.arrival as string;
    var splitarrvalues= arival.split(',');
    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() -Number(splitarrvalues[0])));
    tempProd.forEach((d:any)=>{
      var createddate=new Date(d.created_at);
      if(d.created_at!=null)
      {
        if(createddate>=priorDate&&createddate<today)
        {
            tempProd.push(d);
        }
      }
    });
   }
   if(!query?.discountprice&&!query?.arrival)
   {
    tempProd=products;
   }
   const {searchTerm}=useSearch()
  var catfilter:any=tempProd;
  if(searchTerm!=""){
    catfilter=catfilter.filter((d:any)=>d.name.toUpperCase( ).includes(searchTerm.toUpperCase()) );
  }
  if(catfilter.length==0)
  {
    catfilter=tempProd;
  }
  var resultofdef=tobaccovariables.find(d=>d==query.category)!=undefined;
  const productsItem:any = products;
  return (
    <Grid
      products={catfilter}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      limit={PRODUCTS_PER_PAGE}
      className={className}
      variables={variables}
      gridClassName={gridClassName}
      column={column}
      isLicensed={resultofdef}
    />
  );
}
