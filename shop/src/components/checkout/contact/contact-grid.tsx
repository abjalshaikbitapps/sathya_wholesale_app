import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@/store/checkout';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import PhoneInput from '@/components/ui/forms/phone-input';
import cn from 'classnames';
import { useUser } from '@/framework/user';



interface ContactProps {
  contact: string | undefined | null;
  label: string;
  count?: number;
  className?: string;
  gridClassName?: string;
}
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
const ContactGrid = ({
  contact,
  label,
  count,
  className,
  // gridClassName,
}: ContactProps) => {
  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { me } = useUser();


  useEffect(() => {
    if (contact) {
      setContactNumber(contact);
      return;
    }
    setContactNumber('');
  }, [contact, setContactNumber]);

  function onAddOrChange() {
    openModal('ADD_OR_UPDATE_CHECKOUT_CONTACT');
  }
  return (
    <div className={className}>
      <div
        className={classNames('mb-5 flex items-center justify-between', {
          'md:mb-8': count,
        })}
      >
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
          {count && (
            <span className="flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent text-light lg:text-xl">
              {count}
            </span>
          )}
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>

        <button
          className="flex items-center text-sm font-semibold transition-colors duration-200 text-accent hover:text-accent-hover focus:text-accent-hover focus:outline-none"
          onClick={onAddOrChange}
        >
          <PlusIcon className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5" />
          {contactNumber ? t('text-update') : t('text-add')}
        </button>
      </div>

      <input
              className={cn(
                'flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0',
                false && 'focus:shadow',
                variantClasses['normal'],
                sizeClasses['medium'],
                false && 'cursor-not-allowed bg-gray-100',
                'mb-5'
                )}
                type="text"
                value={me?.phonenumber}
                />
      {/* <div className={classNames('w-full', gridClassName)}>
        <PhoneInput
          country="us"
          value={contactNumber}
          disabled={true}
          inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12"
          dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
        />
      </div> */}
    </div>
  );
};

export default ContactGrid;
