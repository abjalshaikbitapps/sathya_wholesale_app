import { useWishlist } from '@/framework/wishlist';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';

export interface State {
  wishlistTerm: string;
}

const initialState = {
  wishlistTerm: '',
};

export const WishlistContext = React.createContext<State | any>(initialState);

WishlistContext.displayName = 'WishlistContext';

export const WishlistProvider: FC = (props) => {
  const { query } = useRouter();
  const [wishlistTerm, updateWishlistTerm] = useState(0);
  const value = useMemo(
    () => ({
      wishlistTerm,
      updateWishlistTerm,
    }),
    [wishlistTerm]
  );

  return <WishlistContext.Provider value={value} {...props} />;
};
export const useWishlistHeader = () => {
  const context = React.useContext(WishlistContext);
  if (context === undefined) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  return context;
};