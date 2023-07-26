import { PlusIcon } from '@/components/icons/plus-icon';
import Card from '@/components/ui/cards/card';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import PhoneInput from '@/components/ui/forms/phone-input';
import cn from 'classnames';
import { useUser } from '@/framework/user';
import { Controller } from 'react-hook-form';



interface Props {
  userId: string;
  profileId: string;
  contact: string;
}

const ProfileContact = ({ userId, profileId, contact }: Props) => {
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { me } = useUser();

  const variantClasses = {
    normal:
      'bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent',
    solid:
      'bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent',
    outline: 'border border-border-base rounded focus:border-accent',
    line: 'ltr:pl-0 rtl:pr-0 border-b border-border-base rounded-none focus:border-accent',
  };

  const sizeClasses = {
    small: 'text-sm h-9',
    medium: 'h-12',
    big: 'h-14',
  };

  function onAdd() {
    openModal('ADD_OR_UPDATE_PROFILE_CONTACT', {
      customerId: userId,
      profileId,
      contact,
    });
  }
  return (
    <Card className="flex w-full flex-col">
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <p className="text-lg capitalize text-heading lg:text-xl">
          {t('text-contact-number')}
        </p>

        {onAdd && (
          <button
            className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover focus:text-accent-hover focus:outline-none"
            onClick={onAdd}
          >
            <PlusIcon className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5" />
            {Boolean(me) ? t('text-update') : t('text-add')}
          </button>
        )}
      </div>
      
      <div>
      <PhoneInput
                  country="us"
                  inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rtl:!rounded-l-none focus:!border-accent !h-12"
                  dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
                  value={me?.phone_number}
                />
    
      </div>
    </Card>
  );
};

export default ProfileContact;
