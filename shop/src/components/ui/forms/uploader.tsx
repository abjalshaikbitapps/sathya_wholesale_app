import { useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';
import { UploadIcon } from '@/components/icons/upload-icon';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useUploads } from '@/framework/settings';
import Image from 'next/image';
import { pdfPlaceholder } from '@/lib/placeholders';
export default function Uploader({
  onChange,
  value,
  name,
  onBlur,
  multiple = false,
  isImg,
  pdf
}: any) {
  const { t } = useTranslation('common');
  const {
    mutate: upload,
    isLoading,
    files,
  } = useUploads({
    onChange,
    defaultFiles: value,
  });
  const imgType = 'image/*';
  const allType = 'image/*,application/pdf,application/vnd.rar,application/epub+zip,.psd';
  const onDrop = useCallback(
    (acceptedFiles) => {
      upload(acceptedFiles);
    },
    [upload]
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: isImg ? imgType : allType,
    multiple,
    onDrop,
  });
  //FIXME: package update need to check
  // types: [
  //   {
  //     description: 'Images',
  //     accept: {
  //       'image/*': ['.png', '.gif', '.jpeg', '.jpg']
  //     }
  //   },
  // ],
  // excludeAcceptAllOption: true,
  // multiple: false
 var previews:any =[]

//  for (let i=0;i<files.length;i++){
//   const userfile =files[i];
//   var filesuser=files[i]
//   const fileExtension = userfile.name.split('.').pop()?.toLowerCase();
//   if(fileExtension === 'pdf'){
    
//     previews.push(
//       {
//         preview:filesuser.preview
//       }

//     )
//   }
//  }
  const tsupfiles=files.map((file:any,idx)=>{
         console.log(file.preview);
        
  
  const fileExtension = file?.preview?.split('.');
  if(fileExtension)
  {
    if(fileExtension[1] == 'jpg'||fileExtension[1] == 'png'||fileExtension[1] == 'svg'){
    
      previews.push(
        {
          preview:file?.preview,
          isPdf:false,
          name:file?.name
        }
  
      )
    }
    else
    {
      
      previews.push(
        {
          preview:pdf,
          isPdf:true,
          name:file?.name
        })
    }
  }
  else
  {
    previews.push(
      {
        preview:pdf,
        isPdf:true,
       
      })
  }
  }
  );
  const thumbs = previews.map((file: any, idx:any) => (
    <div
      className="relative mt-2 inline-flex flex-col overflow-hidden rounded border border-border-100 ltr:mr-2 rtl:ml-2"
      key={idx}
    >
      <div className="flex h-16 w-16 min-w-0 items-center justify-center overflow-hidden">
        {/* eslint-disable */}
        {file?.isPdf!=true ? <img src={file.preview} alt={file?.name} /> : <div ><Image src={pdfPlaceholder} layout="fixed" width={42} height={42} className="overflow-hidden rounded" alt="pdf" onClick={(ev)=>{window.open(file?.preview,'_blank')}}/></div>}
      </div>
    </div>
  ));
  //FIXME: maybe no need to use this
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
        })}
      >
        <input
          {...getInputProps({
            name,
            onBlur,
          })}
        />
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-center text-sm text-body">
          <span className="font-semibold text-accent">
            {t('text-uploadFile-highlight')}
          </span>{' '}
           <br />
          <span className="text-xs text-body">{t('text-file-format')}</span>
        </p>
      </div>

      <aside className="mt-2 flex flex-wrap">
        {!!thumbs.length && thumbs}
        {isLoading && (
          <div className="mt-2 flex h-16 items-center ltr:ml-2 rtl:mr-2">
            <Spinner
              text={t('text-loading')}
              simple={true}
              className="h-6 w-6"
            />
          </div>
        )}
      </aside>
    </section>
  );
}
