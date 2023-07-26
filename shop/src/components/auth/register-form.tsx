import { useRouter } from 'next/router';
import Logo from '@/components/ui/logo';
import Input from '@/components/ui/forms/input';
import PasswordInput from '@/components/ui/forms/password-input';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import type { RegisterUserInput } from '@/types';
import * as yup from 'yup';
import { useRegister } from '@/framework/user';
import Checkbox from '../ui/forms/checkbox/checkbox';
import 'react-phone-input-2/lib/bootstrap.css';

const registerFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
    phonenumber : yup.string().required('error-phone-number-required'),
    password: yup.string().required('error-password-required'),
    age: yup.bool().oneOf([true], 'error-age-required'),
});

function RegisterForm() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { mutate, isLoading, formError } = useRegister();
  
  function onSubmit({ email, phonenumber, password ,age}: RegisterUserInput) {
    mutate({
      email,
      phonenumber,
      password,
      age,
    });
  }

  return (
    <>
      <Form<RegisterUserInput>
        onSubmit={onSubmit}
        validationSchema={registerFormSchema}
        serverError={formError}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <Input
              label={t('text-email')}
              {...register('email')}
              type="email"
              variant="outline"
              className="mb-5"
              error={t(errors.email?.message!)}
            />
             <Controller
              name="phonenumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={"us"}
                  inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rtl:!rounded-l-none focus:!border-accent !h-12"
                  dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
                  {...field}
                />
              )}
            />
            {/* <Input
              label={t('text-phone-number')}
              {...register('phonenumber')}
              variant="outline"
              className="mb-5"
              error={t(errors.phonenumber?.message!)}
            /> */}
            <PasswordInput
              label={t('text-password')}
              {...register('password')}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Checkbox
              {...register('age')}
              id="age"
              label={t('I agree I am 18+ Above')}
              className="mb-5"
              error={t(errors.age?.message!)}
            />
            <div className="mt-8">
              <Button
                className="h-12 w-full !bg-blue-600 !text-light hover:!bg-blue-500 sm:h-12"
                loading={isLoading}
                disabled={isLoading}
              >
                {t('text-register')}
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* End of forgot register form */}

      <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          {t('text-or')}
        </span>
      </div>
      <div className="text-center text-sm text-body sm:text-base">
        {t('text-already-account')}{' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="font-semibold text-accent underline transition-colors duration-200 text-blue-500 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none ltr:ml-1 rtl:mr-1"
        >
          {t('text-login')}
        </button>
      </div>
    </>
  );
}
export default function RegisterView() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { closeModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center mb-5">
        <Logo />
      </div>
      <RegisterForm />
      <p className="mt-4 mb-7 px-2 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 sm:px-0 md:text-base">
        {t('registration-helper')}
        <span
          onClick={() => handleNavigate('terms')}
          className="mx-1 cursor-pointer text-accent underline hover:no-underline text-blue-500"
        >
          {t('text-terms')}
        </span>
        &
        <span
          onClick={() => handleNavigate('privacy')}
          className="cursor-pointer text-accent underline hover:no-underline ltr:ml-1 rtl:mr-1 text-blue-500"
        >
          {t('text-policy')}
        </span>
      </p>
    </div>
  );
}