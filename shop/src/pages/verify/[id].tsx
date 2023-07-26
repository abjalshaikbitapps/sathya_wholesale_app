
import { useRouter } from 'next/router';
import { useRegister, useVerifyMutation } from '@/framework/user';
import { getLayout } from '@/components/layouts/layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GeneralLayout from '@/components/layouts/_general';



export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
export default function UpdateVerifysPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const slugval=query.id as string;
  const { mutate: verifyUser, isLoading: loading } = useVerifyMutation();

  async function  verified()
  {
    console.log("vali")
    verifyUser(
      {
        id:slugval
      },
      {
        onError: (error: any) => {
          console.log(error,"error");
          // Object.keys(error?.response?.data).forEach((field: any) => {
          //   setError(field, {
          //     type: 'manual',
          //     message: error?.response?.data[field][0],
          //   });
          // });
        },
      }
    );
  }

  return (
    <>
      <div>
      <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 className="text-2xl">Thanks for signing up for Satya Wholesale!</h3>
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>

                <p>We're happy you're here. Let's get your email address verified:</p>
                <div className="mt-4">
                    <button className="px-2 py-2 text-blue-200 bg-blue-600 rounded" onClick={verified}>Click to Verify Email</button>
                    <p className="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a  className="text-blue-600 underline"></a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

// UpdateVerifyPage.Layout = Layout;


