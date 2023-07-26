import Button from '@/components/ui/button';
import Card from '@/components/ui/cards/card';
import FileInput from '@/components/ui/forms/file-input';
import Input from '@/components/ui/forms/input';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import pick from 'lodash/pick';
import { Form } from '@/components/ui/forms/form';
import { useUpdateUser } from '@/framework/user';
import type { UpdateUserInput, User } from '@/types';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';

const ProfileForm = ({ user }: { user: User }) => {
  const { t } = useTranslation('common');
  const { mutate: updateProfile, isLoading } = useUpdateUser();
  const router = useRouter();
 if(isLoading)
 {
    router.push(Routes.home);
 }
  function onSubmit(values: UpdateUserInput) {
    if (!user) {
      return false;
    }
    updateProfile({
      id: user.id,
      name: values.name,
      profile: {
        id: user?.profile?.id,
        bio: values?.profile?.bio ?? '',
        //@ts-ignore
        avatar: values?.profile?.avatar?.[0],
      },
      businessLicenseVerify:0,
      tobaccoLicenseVerify:0,
      business_license:values?.business_license,
      tobacco_license:values?.tobacco_license
    });
  }

  return (
    <Form<UpdateUserInput>
      onSubmit={onSubmit}
      useFormProps={{
        ...(user && {
          defaultValues: pick(user, ['name', 'profile.bio', 'profile.avatar','business_license','tobacco_license']),
        }),
      }}
    >
      {({ register, control }) => (
        
        <>
        <div className='text-center'>
          Please upload logo for profile
          </div>
          <div className="mb-8 flex">
            <Card className="w-full">
              <div className="mb-8">
                <FileInput control={control} name="profile.avatar" isImg={true} />
              </div>
              <div className='text-center'>
                Please upload license documents after register
              </div>
              <div className="mb-8">
              <label className="block mb-3 text-sm font-semibold leading-none text-body-dark">Business license</label>
                <FileInput control={control} name="business_license" isImg={false} pdf={user?.business_license} />
              </div>
              <div className="mb-8">
              <label className="block mb-3 text-sm font-semibold leading-none text-body-dark">Tobacco license</label>
                <FileInput control={control} name="tobacco_license"  isImg={false} pdf={user?.tobacco_license}/>
              </div>
              {(user?.business_license!=null)?
              (
              <div className="mb-6 flex flex-row">
                <Input
                  className="flex-1"
                  label={t('text-name')}
                  {...register('name')}
                  variant="outline"
                />
              </div>
              ):null
              }
              {(user?.business_license!=null)?
              (
              <TextArea
                label={t('text-bio')}
                //@ts-ignore
                {...register('profile.bio')}
                variant="outline"
                className="mb-6"
              />
              ):null
            }
              <div className="flex">
                <Button
                  className="ltr:ml-auto rtl:mr-auto"
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
  );
};

export default ProfileForm;