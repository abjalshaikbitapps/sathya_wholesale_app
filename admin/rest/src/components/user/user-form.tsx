import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { Controller, useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useRegisterAdminMutation, useRegisterMutation, useUpdateUserMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Permission, User } from '@/types';
import SelectInput from '../ui/select-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { Address } from 'cluster';
import { userValidationSchema } from './user-validation-schema';
import { useEffect } from 'react';



type FormValues = {
  id?:string;
  name: string;
  lastname:string;
  phonenumber:string;
  address:Address[];
  email: string;
  password: string;
  permission: any;
};
const dropdown=[
  {
    id:1,Name:"Select"
  },
  // {
  //   id:2,Name:"super_admin"
  // },
  {
    id:3,Name:"store_owner"
  },
  {
    id:4,Name:"staff"
  },
]

const defaultValues = {
  email: '',
  password: '',
  permission:1,
};

type IProps = {
  initialValues?: User | undefined | null;
};

const UserCreateForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useRegisterAdminMutation();
  const { mutate: updateUser, isLoading: updating } =useUpdateUserMutation()
  
  const router=useRouter();
  const isNewTranslation = router?.query?.action === 'translate';
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
     //@ts-ignore
     defaultValues: initialValues
      ? {
        name:initialValues.name,
        email:initialValues.email,
        phonenumber:initialValues.phone_number,
        ...(isNewTranslation?  {
          permission: 1,
        }:{permission:initialValues.Role}),
        
        
        // address:{
        //   id:initialValues.address[0].address?.id,
        //   country:initialValues.address[0].address?.country,
        //   city:initialValues.address[0].address?.city,
        //   state:initialValues.address[0].address?.state,
        //   zip:initialValues.address[0].address?.zip,
        //   street_address:initialValues.address[0].address?.street_address,
        // }
        
        }
      : defaultValues,
    resolver: yupResolver(userValidationSchema),
  });
  useEffect(() => {  
     if (initialValues) {    
       setValue('name', initialValues.name);  
          setValue('email', initialValues?.email);    
           setValue('phonenumber', initialValues?.phone_number);    
            setValue('permission', initialValues?.permissions);      } }, [initialValues, setValue]);

  async function onSubmit({ name, email, password,permission,phonenumber }: FormValues) {
    if(!initialValues)
    {
      var permval=dropdown.find(d=>d.id==permission);
      registerUser(
        {
          name,
          email,
          password,
          phonenumber,
          permission: permval?.Name,
          Role:permission,
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              setError(field, {
                type: 'manual',
                message: error?.response?.data[field][0],
              });
            });
          },
        }
      );
    }
    else
    {
      updateUser( {
        id:initialValues?.id,
        input:{
          name,
          email,
          phonenumber,
          password,
          permission:permission?.Name
          // address:[formattedInput]
        }
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field][0],
            });
          });
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="my-5 flex flex-wrap sm:my-8">
        {/* <Description
          title={t('form:form-title-information')}
          details={t('form:customer-form-info-help-text')}
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        /> */}
     
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
          />
        
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          {!initialValues &&
          <PasswordInput
            label={`${
              initialValues
                ? t('form:input-label-update-password')
                : t('form:input-label-create-password')
            }`}
            {...register('password')}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
            />}
           {t('Phone Number')}
          <Controller
              name="phonenumber"
              control={control}
              defaultValue={initialValues?.permissions[0].id}
              render={({ field }) => (
                <PhoneInput
                  country={"us"}
                  inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rtl:!rounded-l-none focus:!border-accent !h-12"
                  dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
                  {...field}
                />
              )}
            />
            <div className='mt-4'>
            <div>
            {t('Role')}
            </div>
            <div>
            <select className="form-control !p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rtl:!rounded-l-none focus:!border-accent !h-12"
             {...register("permission")}>
            {dropdown&&dropdown.map((item:any) => (
            <option value={item.id} key={item.id}>
              {item.Name}
              </option>
              ))}
              </select>
              </div>
            {/* <SelectInput
            name="permission"
            isMulti={false}
            control={control}
            getOptionLabel={(option: any) => option.Name}
            getOptionValue={(option: any) => option.id}
            // @ts-ignore
            options={dropdown}
            isLoading={loading}
            value={initialValues?.permissions[0].id}
            /> */}
        </div>
        </Card>
      </div>
      <div className="text-end mb-4">
      <Button variant="outline" className='bg-red-600 mr-1' type='button' onClick={()=>router.push(Routes.user.list)}>
          {t('button-cancel')}
      </Button>
        {(initialValues != null) ?
        (
        <Button loading={loading} disabled={loading}>
          {t('form:form-title-update-user')}
        </Button>
        ):null
        }
        {(initialValues == null) ?
        (
        <Button loading={loading} disabled={loading}>
          {t('form:form-title-create-new-user')}
        </Button>
        ):null
        }
      </div>
    </form>
  );
};

export default UserCreateForm;
