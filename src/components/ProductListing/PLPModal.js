/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import { getProductDetails } from '@services/productListingAPI/client';
import {
  imageFormatter,
  carouselImageFormatter,
  DEFAULT_IMAGE_LINK,
  staticLabelsPLP
} from './helper';

export default function PLPModal({
  handleModalClose,
  modalItem,
  ProductProductNo,
  locale,
  skuId
}) {
  const [showColorName, setShowColorName] = useState(false);
  const [modalValues, setModalValues] = useState({});
  const [colorName, setColorName] = useState('');
  const [skuNumber, setSKUNumber] = useState('');
  const [colorFinishCodeArray, setColorFinisCodeArray] = useState([]);
  const [colorFileName, setColorFileName] = useState('');
  const [image, setImage] = useState({});
  const [loader, setLoader] = useState(true);

  //product api call
  useEffect(() => {
    const languageAPI = ['default', 'es'].includes(locale) ? 'es-mx' : 'en';
    async function fetchData() {
      const productDetailsData = await getProductDetails(
        languageAPI,
        ProductProductNo
      );
      setModalValues(productDetailsData?.data?.product);
    }
    fetchData();
  }, []);

  // if API data is available
  useEffect(() => {
    const defaultItems =
      modalValues?.links?.ProductItem?.find(el => el.SKUSKUNo === skuId) || {};
    setColorName(defaultItems?.SKUColorFinishName);
    setSKUNumber(defaultItems?.SKUSKUNo);
    setColorFileName(defaultItems.SKUColorSwatchFilename);

    const color_finish_code_array = modalValues?.links?.ProductItem.filter(
      el =>
        el.SKUColorFinishCode !== undefined &&
        el?.links?.ItemResource !== undefined
    )?.slice(0, 7);
    setColorFinisCodeArray(color_finish_code_array);
    const carousel_image =
      defaultItems?.links?.ItemResource?.find(
        el => el.ResourceType === 'IMGITEMISO'
      ) || [];
    setImage(carousel_image);
    setLoader(false);
  }, [modalValues]);

  // Color tiles are clickable
  const setColorImageFeature = (e, item) => {
    e.preventDefault();
    setColorName(item.SKUColorFinishName);
    setSKUNumber(item.SKUSKUNo);
    setColorFileName(item.SKUColorSwatchFilename);
    const carousel_image =
      item?.links?.ItemResource?.find(el => el.ResourceType === 'IMGITEMISO') ||
      [];
    setImage(carousel_image);
  };
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
                  src={carouselImageFormatter(
                    image.ResourceName,
                    modalValues?.ProductNewProduct
                  )}
                  alt={image.ResourceName}
                  className='h-[415px] w-[570px]'
                  onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                />
              </div>
              {loader ? (
                <div className='flex flex-col md:w-1/3 w-full lg:px-[15px] py-[15px]'>
                  Loading
                </div>
              ) : (
                <div className='flex flex-col md:w-1/3 w-full lg:px-[15px] py-[15px]'>
                  <div className='text-[22px] font-helveticaLight font-semibold'>
                    {modalValues.ProductBrandName}
                  </div>
                  <div className='mt-[10px] text-[18px] font-helveticaLight font-light mb-[20px]'>
                    {modalValues.ProductDescriptionProductShort ||
                      modalValues.ProductMETADESCRIPTION}
                  </div>
                  {skuNumber && (
                    <div className='font-helveticaLight text-[16px] leading-tight font-normal text-[#666]'>
                      K-{skuNumber}
                    </div>
                  )}
                  <div className='mt-[20px] mb-[10px]'>
                    <span className='p-[5px] font-helveticaGroup font-semibold text-[15px] leading-tight text-[#000] uppercase'>
                      {staticLabelsPLP[locale].colorLabel} :
                    </span>
                    {colorName && (
                      <span className='ml-[10px] font-helveticaLight text-[14px] leading-tight font-light'>
                        {colorName}
                      </span>
                    )}
                  </div>
                  <div className='flex flex-wrap'>
                    {colorFinishCodeArray?.map((el, index) => (
                      <div
                        key={index}
                        className='mx-1 relative inline-block pb-2'
                        onClick={e => setColorImageFeature(e, el)}
                        onMouseOver={e => {
                          e.preventDefault();
                          setShowColorName(el.SKUColorFinishName);
                        }}
                        onMouseOut={e => {
                          e.preventDefault();
                          setShowColorName('');
                        }}
                      >
                        <img
                          src={imageFormatter(el.SKUColorSwatchFilename)}
                          alt={el?.SKUColorSwatchFilename}
                          style={{
                            height: '40px',
                            width: '40px'
                          }}
                          onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                        />
                        {colorFileName === el.SKUColorSwatchFilename && (
                          <div className='absolute top-0 right-0 h-[40px] w-[40px] bg-cover border-2 border-neutral-500'>
                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#fff]'>
                              <HiCheck size={30} />
                            </div>
                          </div>
                        )}
                        {showColorName &&
                          showColorName === el.SKUColorFinishName && (
                            <span className='absolute top-full p-[10px] bg-[#f9f9f9] border-1 border-neutral-500 rounded-md shadow font-helvetica leading-tight text-[13px] w-max z-10'>
                              {el.SKUColorFinishName}
                            </span>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                className='absolute top-0 right-0 p-3 opacity-50 hover:opacity-95 cursor-pointer'
                onClick={() => handleModalClose()}
              >
                <HiX size={30} />
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
  ProductProductNo: '',
  locale: 'en',
  skuId: ''
};
