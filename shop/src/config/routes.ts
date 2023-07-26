export const Routes = {
  home: '/',
  checkout: '/checkout',
  checkoutDigital: '/checkout/digital',
  checkoutGuest: '/checkout/guest',
  profile: '/profile',
  tobacco:'/?category=tobacco',
  candy:'/?category=candy',
  automotive:'/?category=automotive',
  accessories:'/?category=accessories',
  miscellaneous:'/?category=miscellaneous',
  changePassword: '/change-password',
  orders: '/orders',
  order: (tracking_number: string) =>
    `/orders/${encodeURIComponent(tracking_number)}`,
  thankyou: (tracking_number: string) =>
    `/thankyou/${encodeURIComponent(tracking_number)}`,
  refunds: '/refunds',
  help: '/help',
  logout: '/logout',
  coupons: '/offers',
  orderReceived: '/order-received',
  products: '/products',
  product: (slug: string) => {
    // if (asPath) {
    //   return `/products/${encodeURIComponent(slug)}?type=${asPath}`;  
    // }
    return `/productsearch/${encodeURIComponent(slug)}`;
  },
  privacy: '/privacy',
  terms: '/terms',
  contactUs: '/contact',
  shops: '/shops',
  cards: '/cards',
  shop: (slug: string) => `/shops/${encodeURIComponent(slug)}`,
  downloads: '/downloads',
  authors: '/authors',
  author: (slug: string) => `/authors/${encodeURIComponent(slug)}`,
  manufacturers: '/manufacturers',
  manufacturer: (slug: string) => `/manufacturers/${encodeURIComponent(slug)}`,
  search: '/search',
  wishlists: '/wishlists',
  questions: '/questions',
  reports: '/reports',
};
