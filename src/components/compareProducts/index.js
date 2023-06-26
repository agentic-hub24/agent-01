/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { RiNumber1, RiNumber2, RiNumber3 } from 'react-icons/ri';
import { getProductDetails } from '@services/productListingAPI/client';
import { imageFormatter } from '@components/ProductListing/helper';
import CompareModal from './CompareModal';

{
  /* TODO: Label from CTFL */
}
export default function CompareProducts({
  navbarOpen,
  headerLabelKitchen,
  headerlabelBathroom,
  isStorage
}) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [storage, setStorage] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setStorage(isStorage);
    }
  }, [isStorage]);

  const removeFromCompare = (e, id) => {
    e.preventDefault();
    const localStorageCheck =
      JSON.parse(localStorage.getItem('theArray')) || [];
    if (localStorageCheck !== null) {
      const filteredArr = localStorageCheck.filter(function (el) {
        return el.ProductProductNo !== id;
      });
      localStorage.setItem('theArray', JSON.stringify(filteredArr));
      setStorage(filteredArr);
      modalOpen && handleComparePDP();
    }
    window.dispatchEvent(new Event('storage'));
  };

  const handleClear = () => {
    localStorage.removeItem('theArray');
    setStorage([]);
    window.dispatchEvent(new Event('storage'));
  };

  const handleComparePDP = async () => {
    const PData = [];
    for (let i = 0; i < storage.length; i++) {
      const productData = await getProductDetails(storage[i].ProductProductNo);
      PData.push(productData.data.product);
    }
    setProductDetails(PData);
  };

  return (
    <>
      <div
        className={`sticky top-[80px] left-0 w-full bg-white text-[#333] p-[10px] border-t lg:border-b-2 
         ${
           navbarOpen || headerLabelKitchen || headerlabelBathroom
             ? `z-30`
             : `z-50`
         }`}
      >
        <div className='max-w-screen-lg mx-auto'>
          <div className='flex justify-between mb-2'>
            <div className='flex items-center lg:ml-[3.5rem] font-helveticaLight text-[18px] uppercase'>
              Compare products
            </div>
            <div className='flex items-center'>
              <div className='flex mr-3'>
                <a
                  href='#'
                  className='text-[12px] font-semibold leading-tight'
                  onClick={handleClear}
                >
                  clean results
                </a>
              </div>
              <div className='flex mr-3'>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setModalOpen(true);
                    handleComparePDP();
                  }}
                  className='bg-[#e5e5e5] text-[#232323] text-[12px] px-[15px] py-[12.5px] leading-tight uppercase font-bold rounded-md shadow'
                >
                  To Compare
                </button>
              </div>
              <div className='flex mr-3'>
                <button onClick={() => setOpen(!open)}>
                  {open ? (
                    <HiOutlineChevronUp size={25} />
                  ) : (
                    <HiOutlineChevronDown size={25} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {open && (
            <div className='flex justify-between border-t py-[25px] w-full h-[230px]'>
              {storage && storage[0] ? (
                <div className='flex grow w-1/3 px-[10px] flex-col'>
                  <>
                    {' '}
                    <button
                      className='flex justify-end'
                      onClick={e =>
                        removeFromCompare(e, storage[0].ProductProductNo)
                      }
                    >
                      X
                    </button>
                    <img
                      src={imageFormatter(storage[0].SkuResourceImgName)}
                      alt={storage[0]?.SkuResourceImgName}
                      style={{ height: '51px', width: '68px' }}
                    />
                    {/* PDP product link */}
                    <a href='#' className='hover:no-underline'>
                      <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-bold'>
                        {storage[0]?.ProductBrandName}
                      </p>
                      <p className='text-[#232323] font-helveticaGroup text-[16px] leading-normal'>
                        {storage[0]?.ProductDescriptionProductShort_PT}
                      </p>
                      <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-light'>
                        {storage[0]?.ProductDefaultSKU}
                      </p>
                    </a>
                  </>
                </div>
              ) : (
                <div className='flex grow w-1/3 justify-center'>
                  <RiNumber1 />
                </div>
              )}
              {storage && storage[1] ? (
                <div className='flex grow w-1/3 px-[10px] flex-col border-x'>
                  <>
                    {' '}
                    <button
                      className='flex justify-end'
                      onClick={e =>
                        removeFromCompare(e, storage[1].ProductProductNo)
                      }
                    >
                      X
                    </button>
                    <img
                      src={imageFormatter(storage[1].SkuResourceImgName)}
                      alt={storage[1]?.SkuResourceImgName}
                      style={{ height: '51px', width: '68px' }}
                    />
                    {/* PDP product link */}
                    <a href='#' className='hover:no-underline'>
                      <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-bold'>
                        {storage[1]?.ProductBrandName}
                      </p>
                      <p className='text-[#232323] font-helveticaGroup text-[16px] leading-normal'>
                        {storage[1]?.ProductDescriptionProductShort_PT}
                      </p>
                      <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-light'>
                        {storage[1]?.ProductDefaultSKU}
                      </p>
                    </a>
                  </>
                </div>
              ) : (
                <div className='flex grow w-1/3 justify-center border-x '>
                  <RiNumber2 />
                </div>
              )}
              {storage && storage[2] ? (
                <div className='flex grow w-1/3 px-[10px] flex-col'>
                  <>
                    {' '}
                    <button
                      className='flex justify-end'
                      onClick={e =>
                        removeFromCompare(e, storage[2].ProductProductNo)
                      }
                    >
                      X
                    </button>
                    <img
                      src={imageFormatter(storage[2].SkuResourceImgName)}
                      alt={storage[2]?.SkuResourceImgName}
                      style={{ height: '51px', width: '68px' }}
                    />
                    {/* PDP product link */}
                    <a href='#' className='hover:no-underline'>
                      <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-bold'>
                        {storage[2]?.ProductBrandName}
                      </p>
                      <p className='text-[#232323] font-helveticaGroup text-[16px] leading-normal'>
                        {storage[2]?.ProductDescriptionProductShort_PT}
                      </p>
                      <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-light'>
                        {storage[2]?.ProductDefaultSKU}
                      </p>
                    </a>
                  </>
                </div>
              ) : (
                <div className='flex grow w-1/3 justify-center'>
                  <RiNumber3 />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {modalOpen && (
        <CompareModal
          storage={storage}
          modalOpen={modalOpen}
          productDetails={productDetails}
          removeFromCompare={removeFromCompare}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}
