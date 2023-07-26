import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useLogout, useUser } from '@/framework/user';

const Contactdropdown: React.FC<{ minimal?: boolean }> = ({ minimal }) => {
  const { mutate: logout } = useLogout();
  const { me } = useUser();
  const router = useRouter();
  const { t } = useTranslation('common');

  function handleClick(path: string) {
    router.push(path);
  }

  return (
    <Menu
      as="div"
      className="relative inline-block ltr:text-left rtl:text-right mt-2 lg:hidden md:hidden xs:block"
    >
      <Menu.Button className="flex items-center focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent">
  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
</svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cn(
            ' absolute xs-pop-card px-4 w-auto mt-3 w-48 rounded bg-white pb-2 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
            {
              '!mt-3': minimal,
            }
          )}
        >
            <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mb-2"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>&nbsp;
            <a href="tel:+91 999-555-4565" className="leading-relaxed text-xs my-2">+91 999 555 4565</a>
            </div>
            <div className='flex items-center'>  
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mb-0"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>&nbsp;
            <a href="mailto:satyawholesaleinfo@gmail.com" className="text-blue-ribbon-500 leading-relaxed  text-xs">satyawholesaleinfo@gmail.com</a>
            </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Contactdropdown;
