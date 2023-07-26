import { HttpClient } from '@/data/client/http-client';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Product, ProductQueryOptions } from '@/types';

export const dashboardClient = {
  analytics() {
    return HttpClient.get<any>(API_ENDPOINTS.ANALYTICS);
  },

  analytic({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.ANALYTICS, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  analyticMonth({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.ANALYTICSMONTH, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  analyticYear({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.ANALYTICSYEAR, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  analyticWeek({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.ANALYTICSWEEK, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  analyticToday({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.ANALYTICSTODAY, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },

  analyticDaterange({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(API_ENDPOINTS.ANALAYTICSDATERANGE, {
      searchJoin: 'and',
      with: 'type;shop',
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  
};
