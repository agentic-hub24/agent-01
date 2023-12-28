/* eslint-disable @next/next/no-img-element */
import { HiOutlinePlus } from 'react-icons/hi';
import Link from 'next/link';
import PropTypes from 'prop-types';
import PLPModal from './PLPModal';
import { DEFAULT_IMAGE_LINK, carouselImageFormatter } from './helper';

export default function PLPCards({
  handleMouseOver,
  handleMouseOut,
  isHovering,
  skuId,
  handleModalOpen,
  handleModalClose,
  modalOpen,
  locale,
  item
}) {
  return (
    <>
      <div
        onMouseOver={() => {
          handleMouseOver(item.SkuNumber);
        }}
        onMouseOut={() => handleMouseOut(item.SkuNumber)}
        className='h-[380px] hover:shadow-2xl text-[#232323] bg-[#f9f9f9] md:basis-1/4 basis-1/3 grow mr-[2px] mb-[5px] ml-[2px] md:max-w-[33%] max-w-[50%] relative'
      >
        <div className='mb-[10px] mt-2 flex justify-center border-4 border-neutral-50 '>
          <img
            src={carouselImageFormatter(
              item?.SkuResourceImgName,
              item?.ProductNewProduct
            )}
            alt={item?.SkuResourceImgName}
            className='h-[147px] w-[196px]'
            onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
          />
        </div>
        {isHovering && skuId === item?.SkuNumber && (
          <div
            className='text-right px-[5px] text-2xl font-bold absolute top-0 right-0 p-2 cursor-pointer'
            onClick={() => handleModalOpen(item?.SkuNumber)}
          >
            <HiOutlinePlus size={20} />
          </div>
        )}
        <Link
          href={{
            pathname: `/product-detail/${item.ProductProductNo}?skuid=K-${item?.SkuNumber}`,
            query: { skuid: 'K-' + item?.SkuNumber }
          }}
          as={`/product-detail/${item.ProductProductNo}?skuid=K-${item?.SkuNumber}`}
          className=''
          passHref
        >
          <div>
            <div className='mb-[20px] px-[10px] text-center font-helvetica leading-tight text-ellipsis text-[14px] text-[#232323] hover:cursor-pointer'>
              <span>{item.ProductBrandName}</span>
              <span>{item.ProductDescriptionProductShort}</span>
            </div>
            <p className='font-HelveticaRoman text-[#666] text-[12px] leading-tight text-center mb-[3px] hover:cursor-pointer'>
              {item.SkuNumber}
            </p>
          </div>
        </Link>
      </div>

      {modalOpen && skuId === item?.SkuNumber && (
        <PLPModal
          handleModalClose={handleModalClose}
          modalItem={item}
          ProductProductNo={item.ProductProductNo}
          locale={locale}
          skuId={skuId}
        />
      )}
    </>
  );
}

PLPCards.propTypes = {
  handleMouseOver: PropTypes.func,
  handleMouseOut: PropTypes.func,
  isHovering: PropTypes.bool,
  skuId: PropTypes.string,
  handleModalOpen: PropTypes.func,
  handleModalClose: PropTypes.func,
  modalOpen: PropTypes.bool,
  locale: PropTypes.string,
  item: PropTypes.shape({
    SkuNumber: PropTypes.string,
    SkuResourceImgName: PropTypes.string,
    ProductNewProduct: PropTypes.string,
    ProductProductNo: PropTypes.string,
    ProductBrandName: PropTypes.string,
    ProductDescriptionProductShort: PropTypes.string
  })
};

PLPCards.defaultProps = {
  handleMouseOver: () => {},
  handleMouseOut: () => {},
  isHovering: false,
  skuId: '',
  handleModalOpen: () => {},
  handleModalClose: () => {},
  modalOpen: false,
  locale: 'en',
  item: {}
};
