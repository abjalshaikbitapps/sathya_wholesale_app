import { useTranslation } from 'next-i18next';
import { useModalState } from '@/components/ui/modal/modal.context';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useUpdateUser, useUser } from '@/framework/user';
import { UpdateUserInput, User } from '@/types';
import { Form } from '../ui/forms/form';
import Card from '../ui/cards/card';
import Button from '../ui/button';
import pick from 'lodash/pick';
import Input from '../ui/forms/input';
import PhoneInput from 'react-phone-input-2';

const ProfileAddOrUpdateContact = ({ user }: { user: User }) => {
  const { t } = useTranslation('common');
  const {
    data: { customerId, contact, profileId, phonenumber },
  } = useModalState();
  // console.log(phone_number,'nag');
  const { me } = useUser();

  const { mutate: updateProfile,isLoading } = useUpdateUser();
  function onSubmit(values: UpdateUserInput) {
    if (!customerId) {
      return false;
    }
    console.log(values.phonenumber,"phonenumber");
    updateProfile({
      id: customerId,
      phonenumber:values.phonenumber,
      profile: {
        id: profileId,
      },

    });
  }
  return (
    <div className="flex min-h-screen flex-col justify-center bg-light p-5 sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-5 text-center text-sm font-semibold text-heading sm:mb-6">
        {contact ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>
      <Form<UpdateUserInput>
      onSubmit={onSubmit}
      useFormProps={{
        ...(user && {
          defaultValues: pick(user, ['phone_number']),
        }),
      }}
    >
      {({control, register}) => (
        <>
          <div className="mb-8 flex">
            <Card className="w-full">
              <div className="mb-6 flex flex-row">
              <Controller
              name="phonenumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country="us"
                  inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rtl:!rounded-l-none focus:!border-accent !h-12"
                  dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
                  {...field}
                  value={me?.phone_number}
                />
              )}
            />
              {/* <PhoneInput label={t('text-name')} {...register('phone_number')} ></PhoneInput> */}
                {/* <Input
                  className="flex-1"
                  label={t('text-name')}
                  {...register('phone_number')}
                  variant="outline"
                /> */}
              </div>
              <div className="flex">
                <Button
                  className="inline-flex items-center justify-center"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {t('text-save')}
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </Form>
    </div>
  );
};

export default ProfileAddOrUpdateContact;
