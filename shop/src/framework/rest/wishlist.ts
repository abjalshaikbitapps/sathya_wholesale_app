import type { WishlistPaginator, WishlistQueryOptions } from '@/types';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { toast } from 'react-toastify';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import { mapPaginatorData } from './utils/data-mappers';
import { useRouter } from 'next/router';
import { useWishlistHeader } from '@/store/quick-cart/wishlist.context';

export function useToggleWishlist(product_id: string) {
  const queryClient = useQueryClient();
  const { t } = useTranslation('common');
  const { wishlistTerm, updateWishlistTerm } = useWishlistHeader();
  const {
    mutate: toggleWishlist,
    isLoading,
    isSuccess,
  } = useMutation(client.wishlist.toggle, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        [`${API_ENDPOINTS.WISHLIST}/in_wishlist`, product_id],
        (old:any) => !old
      );
      queryClient.refetchQueries([API_ENDPOINTS.USERS_WISHLIST]);
      updateWishlistTerm(wishlistTerm+(data?data:-1));
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(t(error.response?.data.message));
      }
    },
  });

  return { toggleWishlist, isLoading, isSuccess };
}

export function useRemoveFromWishlist() {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const { wishlistTerm,updateWishlistTerm} = useWishlistHeader();
  const {
    mutate: removeFromWishlist,
    isLoading,
    isSuccess,
  } = useMutation(client.wishlist.remove, {
    onSuccess: () => {
      toast.success(t('text-removed-from-wishlist'));
      updateWishlistTerm(wishlistTerm-1);
      queryClient.refetchQueries([API_ENDPOINTS.USERS_WISHLIST]);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(t(error.response?.data.message));
      }
    },
  });

  return { removeFromWishlist, isLoading, isSuccess };
}

export function useWishlist(options?: WishlistQueryOptions) {
  
  const { locale } = useRouter();

  const { wishlistTerm,updateWishlistTerm} = useWishlistHeader();
  const formattedOptions = {
    ...options,
    // language: locale
  };
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<WishlistPaginator, Error>(
    [API_ENDPOINTS.USERS_WISHLIST, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.wishlist.all(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    },
  );
  function handleLoadMore() {
    fetchNextPage();
  }
  // console.log(data?.pages[0],"data");
  return {
    wishlists: data?.pages?.flatMap((page) => page.data) ?? [],
    count:(data?.pages[0])?data?.pages?.flatMap((page) => page.data).length:0,
    paginatorInfo: Array.isArray(data?.pages)
      ? mapPaginatorData(data?.pages[data.pages.length - 1])
      : null,
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}

export function useWishlistCount(options?: WishlistQueryOptions) {
  const { locale } = useRouter();
  const { wishlistTerm,updateWishlistTerm} = useWishlistHeader();
  const formattedOptions = {
    ...options,
    // language: locale
  };
  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useQuery<WishlistPaginator, Error>(
    [API_ENDPOINTS.USERS_WISHLIST, formattedOptions],
    ({ queryKey, pageParam }) =>
      client.wishlist.all(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    },
  );
  return {
    wishlists: data,
    count:data,
    isLoading,
    error,
    isFetching,
  };
}
export function useInWishlist({
  enabled,
  product_id,
}: {
  product_id: string;
  enabled: boolean;
}) {
  const { data, isLoading, error, refetch } = useQuery<boolean, Error>(
    [`${API_ENDPOINTS.WISHLIST}/in_wishlist`, product_id],
    () => client.wishlist.checkIsInWishlist({ product_id }),
    {
      enabled,
    }
  );
  return {
    inWishlist: Boolean(data) ?? false,
    isLoading,
    error,
    refetch,
  };
}
