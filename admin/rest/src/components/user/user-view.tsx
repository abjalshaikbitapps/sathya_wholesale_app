import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import Card from '../common/card';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { CloseIcon } from '../icons/close-icon';

const CustomerBanView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const { t } = useTranslation();
  
  return (
    <Card>
      <div className='flex space-x-24'>
      <button
        className="absolute top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs text-light shadow-xl outline-none end-1"
        onClick={()=>closeModal()}
      >
        <CloseIcon width={10} height={10} />  
      </button>
      <div className='absolute top-2 flex h-4 w-4 items-center justify-center text-base font-bold text-heading' >View</div>
      </div>

        <div className='flex space-x-6'>
        <div className='text-base font-bold text-heading'>{t('table:table-item-name')}</div>
        <div className='text-sm text-gray-600'>{data?.user.name}</div>
        </div>
        <div className='flex space-x-6'>
        <div className='text-base font-bold text-heading'>{t('table:table-item-phone-number')}</div>
        <div className='text-sm text-gray-600'>{data?.user.phone_number}</div>
        </div>
        <div className='flex space-x-6'>
        <div className='text-base font-bold text-heading'>{t('table:table-item-email')}</div>
        <div className='text-sm text-gray-600'>{data?.user.email}</div>
        </div>
        <div className='flex space-x-6'>
        <div className='text-base font-bold text-heading'>{t('table:table-item-role')}</div>
        <div className='text-sm text-gray-600'>{data?.user.permissions[1].name}</div>
        </div>
        <div className='flex space-x-6'>
        <div className='text-base font-bold text-heading'>{t('table:table-item-date')}</div>
        <div className='text-sm text-gray-600'>{format(new Date(data?.user.created_at),'yyyy-MM-dd kk:mm:ss')}</div>
        </div>
    </Card>
  );
};

export default CustomerBanView;
