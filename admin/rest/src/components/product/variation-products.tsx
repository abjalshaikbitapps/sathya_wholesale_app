import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ImportCsv from '@/components/ui/import-csv';
import { useShopQuery } from '@/data/shop';
import { useVariationProductsMutation } from '@/data/import';

export default function VariationProducts() {
  const { t } = useTranslation('common');
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData } = useShopQuery({
    slug: shop as string,
  });
  const shopId = shopData?.id!;
  const { mutate: variationProducts, isLoading: loading } =
  useVariationProductsMutation();

  const handleDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length) {
        variationProducts({
        shop_id: shopId,
        csv: acceptedFiles[0],
      });
    }
  };

  return (
    <ImportCsv
      onDrop={handleDrop}
      loading={loading}
      title={t('text-variation-products')}
    />
  );
}
