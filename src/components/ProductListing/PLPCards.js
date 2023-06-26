/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PLPModal from './PLPModal';
import { imageFormatter, DEFAULT_IMAGE_LINK } from './helper';

export default function PLPCards({
  handleMouseOver,
  handleMouseOut,
  isHovering,
  productValueArray,
  skuId,
  handleModalOpen,
  handleModalClose,
  modalOpen,
  slug,
  sub_slug,
  showAll
  // addProductForCompare,
  // removeFromCompare
}) {
  // const compareLabelCheck = id => {
  //   const localStorageCheck =
  //     JSON.parse(localStorage.getItem('theArray')) || [];
  //   if (localStorageCheck !== null) {
  //     return (
  //       localStorageCheck.find(function (el) {
  //         return el.ProductProductNo === id;
  //       }) !== undefined
  //     );
  //   }
  // };

  return (
    <>
      {productValueArray?.map((item, index) => {
        return (
          <>
            <div
              onMouseOver={() => {
                handleMouseOver(item.SkuNumber);
              }}
              onMouseOut={() => handleMouseOut(item.SkuNumber)}
              className='h-[380px] hover:shadow-2xl text-[#232323] bg-[#f9f9f9] md:basis-1/4 basis-1/3 grow mr-[2px] mb-[5px] ml-[2px] md:max-w-[33%] max-w-[50%]'
            >
              {isHovering && skuId === item?.SkuNumber && !showAll && (
                <p className='text-right px-[5px] text-2xl font-bold'>
                  <button onClick={() => handleModalOpen(item?.SkuNumber)}>
                    +
                  </button>
                </p>
              )}
              <div className='mb-[10px] flex justify-center border-4 border-neutral-50'>
                <img
                  src={imageFormatter(item?.SkuResourceImgName)}
                  alt={item?.SkuResourceImgName}
                  className='h-[147px] w-[196px]'
                  onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                />
              </div>
              <Link
                href={{
                  pathname: `/product-detail/${item.ProductProductNo}?skuid=${skuId}`
                }}
                as={`/product-detail/${item.ProductProductNo}?skuid=${skuId}`}
                className=''
                key={index}
              >
                <div>
                  <div className='mb-[20px] px-[10px] text-center font-helvetica leading-tight text-ellipsis text-[14px] text-[#232323] hover:cursor-pointer'>
                    <span>{item.ProductBrandName}</span>
                    <span>{item.ProductDescriptionProductShort_PT}</span>
                    {item.ProductOverallLengthMm && (
                      <span> {item.ProductOverallLengthMm}mm </span>
                    )}
                  </div>
                  <p className='font-HelveticaRoman text-[#666] text-[12px] leading-tight text-center mb-[3px] hover:cursor-pointer'>
                    {item.SkuNumber}
                  </p>
                </div>
              </Link>
              {/* {isHovering &&
                  skuId === item?.SkuNumber &&
                  !showAll && (
                    <div className='my-[60px] text-center'>
                      {!compareLabelCheck(item.ProductProductNo) ? (
                        <a
                          className='uppercase font-HelveticaRoman text-[14px] cursor-pointer'
                          onClick={e => addProductForCompare(e, item)}
                        >
                          +Compare
                        </a>
                      ) : (
                        <a
                          className='uppercase font-HelveticaRoman text-[14px] cursor-pointer'
                          onClick={e =>
                            removeFromCompare(e, item.ProductProductNo)
                          }
                        >
                          -To Compare
                        </a>
                      )}
                    </div>
                  )} */}
            </div>

            {modalOpen && skuId === item?.SkuNumber && (
              <PLPModal
                handleModalClose={handleModalClose}
                modalItem={item}
                showAll={showAll}
                // addProductForCompare={addProductForCompare}
                // removeFromCompare={removeFromCompare}
                // compareLabelCheck={compareLabelCheck}
              />
            )}
          </>
        );
      })}
    </>
  );
}

PLPCards.defaultProps = {
  handleMouseOver: () => {},
  handleMouseOut: () => {},
  isHovering: false,
  skuId: '',
  productValueArray: [],
  handleModalOpen: () => {},
  handleModalClose: () => {},
  modalOpen: false,
  showAll: false
};
