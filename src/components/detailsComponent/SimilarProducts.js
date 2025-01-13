/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { carouselImageFormatter, DEFAULT_IMAGE_LINK } from './helper';
import Image from 'next/image';

export default function SimilarProducts({ productProductLinkType, locale }) {
  return (
    <>
      {productProductLinkType?.map((item, index) => {
        return (
          <div
            key={item.SkuNumber || index}
            className='h-[380px] hover:shadow-2xl text-[#232323] bg-[#f9f9f9] md:basis-1/4 basis-1/3 grow mr-[2px] mb-[5px] ml-[2px] md:max-w-[33%] max-w-[50%] hover:cursor-pointer pb-[40px]'
          >
            <div className='mb-[10px] flex justify-center border-4 border-neutral-50'>
              <Image
                src={carouselImageFormatter(
                  item?.SkuResourceImgName,
                  item?.ProductNewProduct
                )}
                alt={item?.SkuResourceImgName}
                onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                width={196}
                height={147}
              />
            </div>

            <a
              href={`/${locale}/product-detail/${item.ProductProductNo}?skuid=K-${item.SkuNumber}`}
              className='hover:no-underline'
            >
              <div className='mb-[20px] px-[10px] text-center font-helvetica leading-tight text-ellipsis text-[14px] text-[#232323] hover:cursor-pointer'>
                <span>{item?.ProductBrandName}</span>
                <span>{item?.ProductDescriptionProductShort}</span>
              </div>
            </a>

            <p className='font-HelveticaRoman text-[#666] text-[12px] leading-tight text-center mb-[3px]'>
              {item.SkuNumber}
            </p>
          </div>
        );
      })}
    </>
  );
}

SimilarProducts.propTypes = {
  productProductLinkType: PropTypes.arrayOf(
    PropTypes.shape({
      SkuResourceImgName: PropTypes.string,
      ProductNewProduct: PropTypes.string,
      ProductProductNo: PropTypes.string,
      SkuNumber: PropTypes.string,
      ProductBrandName: PropTypes.string,
      ProductDescriptionProductShort: PropTypes.string
    })
  ),
  locale: PropTypes.string
};
