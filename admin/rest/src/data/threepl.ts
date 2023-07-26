
import { useTranslation } from 'next-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from './client/api-endpoints';
import { userClient } from './client/user';
import { QueryOptionsType, Tpl, TplPaginator, User } from '@/types';
import { tplClient } from './client/tpl';
import { mapPaginatorData } from '@/utils/data-mappers';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';


export const useCreateTplMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  return useMutation(tplClient.register, {
    
    onSuccess: () => {
      
      toast.success(t('common:successfully-register'));
      router.push(Routes.threeplsol.list);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REGISTER);
    },
  });
};
export const useTplListQuery = (params: Partial<QueryOptionsType>) => {
    const { data, isLoading, error } = useQuery<TplPaginator, Error>(
      [API_ENDPOINTS.TPL_LIST, params],
      () => tplClient.fetchTplList(params),
      {
        keepPreviousData: true,
      }
    );
    return {
      tpls: data?.data ?? [],
      paginatorInfo: mapPaginatorData(data as any),
      loading: isLoading,
      error,
    };
  };
export const useUpdateTplMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(tplClient.update, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
      router.push(Routes.threeplsol.list);

    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME);
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};


export const useTplQuery = ({ id }: { id: string }) => {
  return useQuery<Tpl, Error>(
    [API_ENDPOINTS.TPL, id],
    () => tplClient.fetchTPL({ id }),
    {
      enabled: Boolean(id),
    }
  );
};

export const useDeleteThreeplMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(tplClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.TPL_LIST);
    },
  });
};
