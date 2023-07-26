import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { Controller, useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import { useRegisterAdminMutation, useUpdateUserMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectInput from '../ui/select-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { AddressType, GoogleMapLocation, User } from '@/types';
import TextArea from '../ui/text-area';
import { customerValidationSchema } from './customer-validation-schema';
import { title } from 'process';



type FormValues = {
  name: string;
  lastname:string;
  phonenumber:string;
  address: {
    id:string;
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
  title: string;
  type: AddressType;
  email: string;
  password: string;
  permission: any;
  location:GoogleMapLocation;
};
const dropdown=[
  {
    id:1,Name:"Select"
  },
  {
    id:2,Name:"super_admin"
  },
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
const addressdefault=
{
  id:'',
  country:'',
  city:'',
  state:'',
  zip:'',
  street_address:'',

}
type IProps = {
  initialValues?: User | undefined | null;
};

const CustomerCreateForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useRegisterAdminMutation();
  const { mutate: updateUser, isLoading: updating } =useUpdateUserMutation()
  const router=useRouter();
  var address=[];
  if(initialValues)
  {
   const initvalu=initialValues?.address.find((d:any)=>d.default==true);
    if(initvalu!=undefined)
    {
      address.push(initvalu);
    }
    else
    {
      address.push(initialValues?.address[0]);
    }
  }
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    
      defaultValues: initialValues
      ? {
        name:initialValues.name,
        email:initialValues.email,
        phonenumber:initialValues.phone_number,
        title:initialValues.address[0]?.title,
        address:{
          id:address[0]?.id,
          country:address[0]?.address?.country,
          city:address[0]?.address?.city,
          state:address[0]?.address?.state,
          zip:address[0]?.address?.zip,
          street_address:address[0]?.address?.street_address,
        }
        
        }
      : defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });
  async function onSubmit({ name, email, password,permission,phonenumber,address,title }: FormValues) {
    const formattedInput={
      id:address?.id,
      title,

      address:{...address}
    }
    if(initialValues?.id!=null)
    {
      updateUser( {
        id:initialValues?.id,
        input:{
          name,
          email,
          phonenumber,
          password,
          address:[formattedInput]
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
    else{
      registerUser(
        {
          name,
          email,
          password,
          phonenumber,
          address:[formattedInput]
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
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          />
           {t('Phone Number')}
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
            <div className='mt-4'>
            <Input
              label={t('text-title')}
              {...register('title')}
              error={t(errors.title?.message!)}
              variant="outline"
              className="col-span-2"
            />
          

            <Input
              label={t('text-country')}
              {...register('address.country')}
              error={t(errors.address?.country?.message!)}
              variant="outline"
            />

            <Input
              label={t('text-city')}
              {...register('address.city')}
              error={t(errors.address?.city?.message!)}
              variant="outline"
            />

            <Input
              label={t('text-state')}
              {...register('address.state')}
              error={t(errors.address?.state?.message!)}
              variant="outline"
            />

            <Input
              label={t('text-zip')}
              {...register('address.zip')}
              error={t(errors.address?.zip?.message!)}
              variant="outline"
            />

            <TextArea
              label={t('text-street-address')}
              {...register('address.street_address')}
              error={t(errors.address?.street_address?.message!)}
              variant="outline"
              className="col-span-2"
            />
            </div>
        </Card>
      </div>
      <div className="text-end mb-4">
      <Button variant="outline" className='bg-red-600 mr-1' type='button' onClick={()=>router.push(Routes.customer.list)}>
          {t('button-cancel')}
        </Button>
        {(initialValues != null)?
        (
        <Button loading={loading} disabled={loading}>
          {t('form:form-title-update-customer')}
        </Button>
        ):null
      }
      {(initialValues == null)?
        (
        <Button loading={loading} disabled={loading}>
          {t('form:form-title-create-new-customer')}
        </Button>
        ):null
      }
      </div>
    </form>
  );
};

export default CustomerCreateForm;
