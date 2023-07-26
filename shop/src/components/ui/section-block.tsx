import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@/components/ui/link';

type SectionProps = {
  className?: any;
  title?: string;
  href?: string;
};

/**
 * UI component for a section block
 * @param {string} title - The title of the section
 * @param {string} description - The description of the section
 * @param {string} href - The href of the external page for this section
 */

const SectionBlock: React.FC<SectionProps> = ({
  className,
  title,
  href,
  children,
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        'w-full grid pb-[40px] xl:pb-[54px] 3xl:pb-[60px] px-7 xl:px-16 mt-8',
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between mb-7 text-blue-800">
          {title && (
            <h3 className="text-2xl lg:text-[27px] 3xl:text-3xl font-semibold">
              {t(title)}
            </h3>
          )}
        </div>
      )}

      {children}
      {href && (
            <Link
              href={href}
              className="flex text-base font-semibold justify-end transition-colors text-blue-800 hover:text-orange-500 mr-5 pt-1"
            >
              {t('text-view-more')}
            </Link>
          )}
    </div>
  );
};

export default SectionBlock;
