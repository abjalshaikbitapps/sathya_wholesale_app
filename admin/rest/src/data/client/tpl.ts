import {
    AuthResponse,
    RegisterInput,
    User,
    UpdateUser,
    UserPaginator,
    UserQueryOptions,
    Tpl,
    TplPaginator,
    TplQueryOptions,
    CreateTpl,
  } from '@/types';
  import { API_ENDPOINTS } from './api-endpoints';
  import { HttpClient } from './http-client';
  
  export const tplClient = {
    me: () => {
      return HttpClient.get<Tpl>(API_ENDPOINTS.ME);
    },
    register: (variables: CreateTpl) => {
      return HttpClient.post<AuthResponse>(API_ENDPOINTS.TPLCREATE, variables);
    },
    update: ({ id, input }: { id: string; input: CreateTpl }) => {
      return HttpClient.put<Tpl>(`${API_ENDPOINTS.TPL}/${id}`, input);
    },
    delete({ id }: { id: string }) {
      return HttpClient.delete<boolean>(`${API_ENDPOINTS.TPL}/${id}`);
    },

   
    fetchTplList: ({ ...params }: Partial<TplQueryOptions>) => {
      return HttpClient.get<TplPaginator>(API_ENDPOINTS.TPL_LIST, {
        searchJoin: 'and',
        ...params,
      });
    },
    fetchTPL: ({ id }: { id: string }) => {
      return HttpClient.get<Tpl>(`${API_ENDPOINTS.TPL}/${id}`);
    },
   
  };
  