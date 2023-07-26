import { Product, ProductQueryOptions } from '@/types';
import { useQuery } from 'react-query';
import { API_ENDPOINTS } from './client/api-endpoints';
import { dashboardClient } from '@/data/client/dashboard';
import { productClient } from '@/data/client/product';

export function useAnalyticsQuery() {
  return useQuery([API_ENDPOINTS.ANALYTICS], dashboardClient.analytics);
}

export function useAnalyticQuery(options: Partial<ProductQueryOptions>) {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.ANALYTICS, options],
    ({ queryKey, pageParam }) =>
      dashboardClient.analytic(Object.assign({}, pageParam, queryKey[1]))
  );
}

export function useAnalyticMonthQuery(options: Partial<ProductQueryOptions>) {
  var endpoint=API_ENDPOINTS.ANALYTICS
  // if(options.type=="Week")
  // {
  //   endpoint=API_ENDPOINTS.ANALYTICSWEEK
  // }
  // else if(options.type=="Month")
  // {
  //   endpoint=API_ENDPOINTS.ANALYTICSMONTH


  // }
  // else if(options.type=="Year")
  // {
  //   endpoint=API_ENDPOINTS.ANALYTICSYEAR


  // }
  // else if(options.type=="Today")
  // {
  //   endpoint=API_ENDPOINTS.ANALYTICSTODAY


  // }
  // else
  // {
  //   endpoint=API_ENDPOINTS.ANALYTICS

  // }
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.ANALYTICSMONTH, options],
    ({ queryKey, pageParam }) =>
      dashboardClient.analyticMonth(Object.assign({}, pageParam, queryKey[1]))
  );
 
}

export function useAnalyticWeekQuery(options: Partial<ProductQueryOptions>) {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.ANALYTICSWEEK, options],
    ({ queryKey, pageParam }) =>
      dashboardClient.analyticWeek(Object.assign({}, pageParam, queryKey[1]))
  );
}


export function useAnalyticTodayQuery(options: Partial<ProductQueryOptions>) {
  return useQuery<any, Error>(
    [API_ENDPOINTS.ANALYTICSTODAY, options],
    ({ queryKey, pageParam }) =>
      dashboardClient.analyticToday(Object.assign({}, pageParam, queryKey[1]))
  );
}

export function useAnalyticYearQuery(options: Partial<ProductQueryOptions>) {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.ANALYTICSYEAR, options],
    ({ queryKey, pageParam }) =>
      dashboardClient.analyticYear(Object.assign({}, pageParam, queryKey[1]))
  );
}

export function useAnalyticDaterangeQuery(options: Partial<ProductQueryOptions>) {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.ANALAYTICSDATERANGE, options],
    ({ queryKey, pageParam }) =>
      dashboardClient.analyticDaterange(Object.assign({}, pageParam, queryKey[1]))
  );
}

export function usePopularProductsQuery(options: Partial<ProductQueryOptions>) {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    ({ queryKey, pageParam }) =>
      productClient.popular(Object.assign({}, pageParam, queryKey[1]))
  );
}
