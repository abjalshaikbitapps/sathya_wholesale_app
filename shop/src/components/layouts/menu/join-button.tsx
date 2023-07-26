import Button from '@/components/ui/button';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';

export default function JoinButton() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  function handleJoin() {
    return openModal('LOGIN_VIEW');
  }
  return (
    <div className="lg:mr-5 md:mr-5 xs:mr-0 flex items-center" onClick={handleJoin}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>

    <a href="#" className="font-medium text-gray-500 lg:block md:block xs:hidden">
      Sign up or Sign in</a>
    
     </div>
    // <Button className="font-semibold" size="small" onClick={handleJoin}>
    //   {t('Sign up or sign in-button')}
    // </Button>
  );
}
