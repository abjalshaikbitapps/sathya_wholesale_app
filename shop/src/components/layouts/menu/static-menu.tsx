import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const headerLinks = [
  { href: Routes.home, label: 'Home' },
  { href: Routes.tobacco, icon: null, label: 'Tobacco' },
  { href: Routes.automotive, icon: null, label: 'Automotive' },
  { href: Routes.candy, label: 'Candy' },
  { href: Routes.accessories, label: 'Accessories' },
  { href: Routes.miscellaneous, label: 'Miscellaneous' },
];

const StaticMenu = (categories:any) => {
  const { t } = useTranslation('common');

  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    const filteredData = categories.categories.filter((item:any) => {
      return item.parent == null;
    });

    setFilteredArray(filteredData);
  }, [categories.categories]);
  return (
    <>
    <li>
          <Link
            href={Routes.home}
            className="ml-5 flex items-center font-normal text-heading no-underline transition duration-200 categorie-header"
          >
            {/* {icon && <span className="ltr:mr-2 rtl:ml-2">{icon}</span>} */}
            Home
          </Link>
        </li>
      {filteredArray&&filteredArray.map((item:any) => (
        <li key={`${item.id}`}>
          <Link
            href={`/?category=${item.slug}`}
            className="flex items-center font-normal text-heading no-underline transition duration-200 categorie-header"
          >
            {t(item.name)}
          </Link>
        </li>
      ))}
      {/* {headerLinks.map((item:any) => (
        <li key={`${item.id}`}>
          <Link
            href={item.href}
            className="flex items-center font-normal text-heading no-underline transition duration-200 categorie-header"
          >
            {t(item.label)}
          </Link>
        </li>
      ))} */}
      <li>
          <a href="/newarrivals/0" className="ml-5 flex items-center font-normal text-heading no-underline transition duration-200 categorie-header">
            New Arrivals
          </a>
        </li>
      <li>
          <a href="/3pl" className="ml-5 flex items-center font-normal text-heading no-underline transition duration-200 categorie-header">
            3pl Solutions
          </a>
        </li>
    </>
  );
};

export default StaticMenu;
