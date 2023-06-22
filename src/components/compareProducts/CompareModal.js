import { imageFormatter } from '@components/ProductListing/helper';

export default function CompareModal({
  storage,
  modalOpen,
  productDetails,
  removeFromCompare,
  setModalOpen
}) {
  return (
    <div
      className='relative z-50'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-50 overflow-y-auto'>
        <div className='flex items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-screen-lg mx-auto'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:items-start flex'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <div
                    className='flex justify-end cursor-pointer'
                    onClick={() => setModalOpen(false)}
                  >
                    X
                  </div>
                  <h3
                    className='text-base font-semibold leading-6 text-gray-900'
                    id='modal-title'
                  >
                    Compare product
                  </h3>
                  <div className='mt-2'>
                    <table id='products'>
                      <tr>
                        <th></th>
                        {storage.map((ele, id) => (
                          <>
                            <th key={id}>
                              <button
                                className='flex justify-end'
                                onClick={e =>
                                  removeFromCompare(e, ele.ProductProductNo)
                                }
                              >
                                X
                              </button>
                              <img
                                src={imageFormatter(ele.SkuResourceImgName)}
                                alt={ele?.SkuResourceImgName}
                                style={{ height: '51px', width: '68px' }}
                              />
                              {/* PDP product link */}
                              <a href='#' className='hover:no-underline'>
                                <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-bold'>
                                  {ele?.ProductBrandName}
                                </p>
                                <p className='text-[#232323] font-helveticaGroup text-[16px] leading-normal'>
                                  {ele?.ProductDescriptionProductShort_PT}
                                </p>
                                <p className='text-[#999] font-helveticaGroup text-[16px] leading-normal font-light'>
                                  {ele?.ProductDefaultSKU}
                                </p>
                              </a>
                            </th>
                          </>
                        ))}
                      </tr>
                      <tr>
                        <td>Brand</td>
                        <td>{storage[0]?.ProductBrandName}</td>
                        {storage[1] && <td>{storage[1]?.ProductBrandName}</td>}
                        {storage[2] && <td>{storage[2]?.ProductBrandName}</td>}
                      </tr>
                      <tr>
                        <td>Number of Loops</td>
                        <td>-</td>
                        {storage[1] && <td>-</td>}
                        {storage[2] && <td>-</td>}
                      </tr>
                      <tr>
                        <td>Number of holes</td>
                        <td>{storage[0]?.NumberOfHoles_PT}</td>
                        {storage[1] && <td>{storage[1]?.NumberOfHoles_PT}</td>}
                        {storage[2] && <td>{storage[2]?.NumberOfHoles_PT}</td>}
                      </tr>
                      <tr>
                        <td>Installation type</td>
                        <td>{storage[0]?.ProductInstallationType_PT}</td>
                        {storage[1] && (
                          <td>{storage[1]?.ProductInstallationType_PT}</td>
                        )}
                        {storage[2] && (
                          <td>{storage[2]?.ProductInstallationType_PT}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Material</td>
                        <td>{storage[0]?.ProductMaterial_PT}</td>
                        {storage[1] && (
                          <td>{storage[1]?.ProductMaterial_PT}</td>
                        )}
                        {storage[2] && (
                          <td>{storage[2]?.ProductMaterial_PT}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Total length(mm)</td>
                        <td>{storage[0].ProductOverallLengthMm}</td>
                        {storage[1] && (
                          <td>{storage[1].ProductOverallLengthMm}</td>
                        )}
                        {storage[2] && (
                          <td>{storage[2].ProductOverallLengthMm}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Overall width(mm)</td>
                        <td>{storage[0].ProductOverallWidthMm}</td>
                        {storage[1] && (
                          <td>{storage[1].ProductOverallWidthMm}</td>
                        )}
                        {storage[2] && (
                          <td>{storage[2].ProductOverallWidthMm}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Liters per minute</td>
                        <td>{storage[0].ProductLitersPerMinute}</td>
                        {storage[1] && (
                          <td>{storage[1].ProductLitersPerMinute}</td>
                        )}
                        {storage[2] && (
                          <td>{storage[2].ProductLitersPerMinute}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Number of Handles</td>
                        <td>{storage[0].ProductNumberofHandles}</td>
                        {storage[1] && (
                          <td>{storage[1].ProductNumberofHandles}</td>
                        )}
                        {storage[2] && (
                          <td>{storage[2].ProductNumberofHandles}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Color/finish codes</td>
                        <>
                          {productDetails &&
                            productDetails?.map((el1, id1) => (
                              <td key={id1}>
                                <div className='flex'>
                                  {el1.links?.ProductItem?.map((el, id2) => (
                                    <div key={id2} className='mx-1'>
                                      <img
                                        src={imageFormatter(
                                          el.SKUColorSwatchFilename
                                        )}
                                        alt={el?.SKUColorSwatchFilename}
                                        style={{
                                          height: '24px',
                                          width: '24px'
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </td>
                            ))}
                        </>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
