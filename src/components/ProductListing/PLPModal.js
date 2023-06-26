/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { TickSvg } from '../svgs';
import {
  colorImageFormatter,
  imageFormatter,
  DEFAULT_IMAGE_LINK
} from './helper';

export default function PLPModal({
  handleModalClose,
  modalItem,
  showAll
  // addProductForCompare,
  // removeFromCompare,
  // compareLabelCheck
}) {
  const [showColorName, setShowColorName] = useState(false);

  return (
    <div
      className='relative z-50'
      aria-labelledby={modalItem.ProductBrandName}
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-screen-lg mx-auto'>
            <div className='flex'>
              <div className='flex'>
                <img
                  src={imageFormatter(modalItem.SkuResourceImgName)}
                  alt={modalItem.SkuResourceImgName}
                  className='h-[415px] w-[570px]'
                  onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                />
              </div>
              <div className='flex flex-col'>
                <p className='text-right p-[20px] text-lg font-bold'>
                  <button onClick={() => handleModalClose()}>X</button>
                </p>
                <div className='py-[18px] px-[48px]'>
                  <span className='font-helvetica font-bold leading-tight text-[#232323] text-[18px]'>
                    {modalItem.ProductBrandName}
                  </span>
                  <span className='font-helvetica leading-normal text-[#232323] text-[18px]'>
                    {modalItem.ProductDescriptionProductShort_PT} Ø
                    {modalItem.ProductOverallLengthMm}mm
                  </span>
                  <p className='font-helvetica leading-relaxed text-[16px] font-normal text-[#666] mt-[20px]'>
                    {modalItem.SkuNumber}
                  </p>
                  <div className='mt-[20px]'>
                    {/* TODO: label from CTFL */}
                    <span className='font-helvetica font-bold leading-none text-[#232323] text-[17px] pr-[10px]'>
                      Selecione a cores:
                    </span>
                    {/* TODO: put color name from API */}
                    <span className='font-helveticaLight font-light leading-none text-[#2b2e38] text-[16px]'>
                      {modalItem.SKUColorFinishName_PT}
                    </span>
                  </div>
                  <div
                    className='my-[10px] relative inline-block'
                    onMouseOver={() => setShowColorName(true)}
                    onMouseOut={() => setShowColorName(false)}
                  >
                    <img
                      src={colorImageFormatter(modalItem.SKUColorFinishCode)}
                      alt={modalItem.SKUColorFinishCode}
                      className='h-[27px] w-[27px]'
                    />
                    <div className='absolute top-0 right-0 h-[27px] w-[27px] bg-cover border-2 border-neutral-500'>
                      <TickSvg />
                    </div>
                    {showColorName && (
                      <span className='absolute top-full p-[10px] bg-[#f9f9f9] border-1 border-neutral-500 rounded-md shadow font-helvetica leading-tight text-[13px] w-max'>
                        {modalItem.SKUColorFinishName_PT}
                      </span>
                    )}
                  </div>
                  {/* TODO: onclick event for compare; button label from CTFL */}
                  {/* {!showAll && (
                    <div className='mt-[10px]'>
                      {!compareLabelCheck(modalItem.ProductProductNo) ? (
                        <a
                          className='font-helveticaGroup bg-[#e5e5e5] py-[14px] px-[20px] text-[14px] uppercase font-semibold  text-[#232323] leading-tight shadow hover:no-underline hover:bg-[#bebebe]'
                          onClick={e => addProductForCompare(e, modalItem)}
                        >
                          +Compare
                        </a>
                      ) : (
                        <a
                          className='font-helveticaGroup bg-[#e5e5e5] py-[14px] px-[20px] text-[14px] uppercase font-semibold  text-[#232323] leading-tight shadow hover:no-underline hover:bg-[#bebebe]'
                          onClick={e =>
                            removeFromCompare(e, modalItem.ProductProductNo)
                          }
                        >
                          -To Compare
                        </a>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PLPModal.defaultProps = {
  modalItem: {},
  handleModalClose: () => {},
  showAll: false
};
