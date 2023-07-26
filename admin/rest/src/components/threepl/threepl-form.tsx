import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { FormProvider, useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThreeplValidationSchema } from './threepl-validation-schema';
import { Permission, Tpl, User } from '@/types';
import { useCreateTplMutation, useUpdateTplMutation } from '@/data/threepl';
import FileInput from '../ui/file-input';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Form } from '../ui/form/form';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type FormValues = {
  name: string;
  description:string;
  image:any
};

const defaultValues = {
  email: '',
  description:'',
  image:''
};
type IProps = {
  initialValues?: Tpl | undefined | null;
};
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // basic formatting
  ['blockquote', 'code-block'], // blockquote and code tags
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header dropdown
  [{ 'list': 'ordered'}, { 'list': 'bullet' }], // ordered and unordered lists
  [{ 'script': 'sub'}, { 'script': 'super' }], // subscript and superscript
  [{ 'indent': '-1'}, { 'indent': '+1' }], // indentations
  [{ 'direction': 'rtl' }], // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // font size
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header dropdown
  [{ 'color': ['green','blue','red','yellow'] }, { 'background': [] }], // text and background colors
  ['clean'] // remove formatting
];
const ThreeplCreateForm = ({ initialValues }: IProps) => {
  const { t } = useTranslation();
  const { mutate: registerTpl, isLoading: loading } = useCreateTplMutation();
  const {mutate:update,isLoading:updating}=useUpdateTplMutation();
  const [wysiwig,setwysiwig]=useState(initialValues?.description);


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
          ...initialValues,
          
        }
      : defaultValues,

    resolver: yupResolver(ThreeplValidationSchema),
  });

  useEffect(() => {  
    if (initialValues) {    
      setValue('name', initialValues.name);  
         setValue('description', initialValues?.description);    
            
           setValue('image', initialValues?.image);      } }, [initialValues, setValue]);
   const onSubmit= async({ name, description, image }: FormValues) =>{
    
    if(!initialValues)
    {
      registerTpl(
        {
          name,
          description:wysiwig as string,
          image,
  
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              console.log(error);
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
      update(
        {
          id:initialValues.id!,
          input:{
            name,
            description:wysiwig as string,
            image,
          }

  
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              console.log(error);
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
    <div>

<form onSubmit={handleSubmit (onSubmit)}>
       <>
    
        
        <Input
            label={t('form:input-label-name')}
            {...register('name')}
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
          />
          {/* <Input
            label={t('Description')}
            {...register('description')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
          /> */}
               <QuillNoSSRWrapper  modules={{ toolbar: toolbarOptions }} onChange={(event)=>setwysiwig(event)} value={wysiwig} theme="snow"  /> 

          <div className="mb-8">
              <label className="block mb-3 text-sm font-semibold leading-none text-body-dark">Banner Image</label>
                <FileInput control={control} name="image" />
              </div>
    
        <Button
                className="h-10 px-5 float-right !bg-blue-600 !text-light hover:!bg-blue-500 sm:h-12"
             
              >
                {t('Save')}
              </Button>
       </>
      
      </form>
      {/* <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 flex flex-wrap sm:my-8">
       
       
      </div>

      <div className="text-end mb-4">
        <button type='submit' >
          {t('form:button-label-create-tpl')}
        </button>
      </div>
    </form>
      </FormProvider> */}
     
    </div>
    
  );
};

export default ThreeplCreateForm;
