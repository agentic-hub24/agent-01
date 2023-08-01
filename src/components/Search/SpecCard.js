import Link from 'next/link';
import {
  imageFormatter,
  staticLabelsPLP
} from '@components/ProductListing/helper';
import SearchAccordion from './SearchAccordion';
import SpecItems from './SpecItems';

export default function SpecCard({ productValueArray, locale = 'en' }) {
  return (
    <>
      {productValueArray?.map(item => {
        return (
          <>
            {(item?.DWGPlanView || item?.ThreeDDXF) && (
              <div className='relative overflow-x-hidden overflow-y-auto pb-[30px] mb-[30px] border-b border-gray-300 '>
                <div className='float-left p-[20px] bg-gradient-to-b from-gray-200 to-white bg-contain bg-no-repeat'>
                  <img
                    src={imageFormatter(item?.SkuResourceImgName)}
                    alt={item?.SkuResourceImgName}
                    className='h-[125px] w-[150px]'
                  />
                </div>
                <Link
                  href={{
                    pathname: '/product-detail/[productNo]'
                  }}
                  as={`/product-detail/${item.ProductProductNo}`}
                >
                  <div className='w-auto ml-[-210px] float-right w-calc-100-subtract-210 hover:cursor-pointer'>
                    {' '}
                    <span className='block mb-[3px] text-base leading-none font-normal text-gray-600'>
                      {' '}
                      {item.ProductDefaultSKU}
                    </span>
                    {item?.ProductDescriptionProductShort && (
                      <span className='display:block mb-10 font-medium font-sans text-base leading-5 text-blue-500'>
                        {item?.ProductDescriptionProductShort}
                      </span>
                    )}
                  </div>
                </Link>
                {(item?.SpecPDFFileName ||
                  item?.InstallationWithoutSPPDF ||
                  item?.HomeguideWithSPPDF ||
                  item?.HomeguideWithoutSPPDF) && (
                  <SearchAccordion header={staticLabelsPLP[locale].tech}>
                    <SpecItems
                      downloadLink={item}
                      linkType='technical'
                      locale={locale}
                    />
                  </SearchAccordion>
                )}
                {(item?.DWGPlanView || item?.ThreeDDXF) && (
                  <>
                    <SearchAccordion header={staticLabelsPLP[locale].template}>
                      <SpecItems
                        downloadLink={item}
                        linkType='template'
                        locale={locale}
                      />
                    </SearchAccordion>
                  </>
                )}
              </div>
            )}
          </>
        );
      })}
    </>
  );
}
