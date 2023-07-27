/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { DEFAULT_IMAGE_LINK, carouselImageFormatter } from './helper';

export default function SimilarProductsCards({
  productProductLinkType,
  locale
}) {
  return (
    <>
      {productProductLinkType?.map((item, index) => {
        return (
          <>
            {item.ProductATGISACTIVE && (
              <div
                className='h-[380px] hover:shadow-2xl text-[#232323] bg-[#f9f9f9] md:basis-1/4 basis-1/3 grow lg:grow-0 mr-[2px] mb-[5px] ml-[2px] md:max-w-[33%] max-w-[50%] hover:cursor-pointer pb-[40px]'
                key={index}
              >
                <div className='mb-[10px] flex justify-center border-4 border-neutral-50'>
                  <img
                    src={carouselImageFormatter(
                      item?.links?.ProductResource[0]?.ResourceName,
                      item?.ProductNewProduct
                    )}
                    alt={item?.SkuResourceImgName}
                    className='h-[147px] w-[196px]'
                    onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                  />
                </div>

                <a
                  href={`/${locale}/product-detail/${item.ProductProductNo}`}
                  className='hover:no-underline'
                >
                  <div className='mb-[20px] px-[10px] text-center font-helvetica leading-tight text-ellipsis text-[14px] text-[#232323] hover:cursor-pointer'>
                    <span>{item?.ProductBrandName}</span>
                    <span>{item?.ProductDescriptionProductShort}</span>
                  </div>
                  <p className='font-HelveticaRoman text-[#666] text-[12px] leading-tight text-center mb-[3px]'>
                    {item.ProductDefaultSKU}
                  </p>
                </a>
              </div>
            )}
          </>
        );
      })}
    </>
  );
}
