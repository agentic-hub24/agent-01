/* eslint-disable react/no-unknown-property */

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import {
  HiCheck,
  HiOutlineDownload,
  HiOutlineChevronRight
} from 'react-icons/hi';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getProductListing } from '@services/productListingAPI/client';
import Cta from '@components/Cta';
import BackToTop from '@components/backToTop';
import ImageZoomModal from './ImageZoomModal';
import LinkWithLabel from './LinkWithLabel';
import SimilarProducts from './SimilarProducts';
import SimilarProductsCards from './SimilarProductsCards';
import {
  imageFormatter,
  magnify,
  gifLineArtImageFormatter,
  PRODUCT_RESOURCE_TYPE_SPEC_DOC,
  PRODUCT_GIF_LINE_ART_IMAGE,
  PRODUCT_CAROUSEL_IMAGE,
  PRODUCT_PLAN_3D,
  PRODUCT_PLAN_NAME_3D,
  PRODUCT_FRONT_NAME_2D,
  PRODUCT_PLAN_NAME_2D,
  PRODUCT_SIDE_NAME_2D,
  PRODUCT_Front_View_2D,
  PRODUCT_Plan_View_2D,
  PRODUCT_Side_View_2D,
  PRODUCT_ADDITIONAL_IMAGE,
  PDP_LABELS,
  PRODUCT_Cut_Out_DXF,
  PRODUCT_BIMRevit,
  TECHNICAL_INFORMATION_FILES,
  TECHNICAL_INFORMATION_FILES_NAMES,
  formattedUrl,
  DEFAULT_IMAGE_LINK,
  CTAObject,
  formattedSlugName
} from './helper';

export default function DetailsComponent({ productDetailsData }) {
  const router = useRouter();
  const [colorName, setColorName] = useState('');
  const [carousel, setCarousel] = useState([]);
  const [skuNumber, setSKUNumber] = useState('');
  const [showColorName, setShowColorName] = useState('');
  const [colorFileName, setColorFileName] = useState('');
  const [specPdfFile, setSpecPdfFile] = useState('');
  const [lineArt, setLineArtUrl] = useState('');
  const [PlanView3D, setPlanView3D] = useState([]);
  const [front2D, setFront2D] = useState([]);
  const [plan2D, setPlan2D] = useState([]);
  const [side2D, setSide2D] = useState([]);
  const [cutOutDXF, setCutOutDXF] = useState([]);
  const [bimRevit, setBimRevit] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [zoomActive, setZoomActive] = useState(false);
  const [showZoom, showImageZoom] = useState(false);
  const [skuName, setSkuName] = useState(0);
  const [slugForBreadCrumbs, setSlugForBreadCrumbs] = useState('');
  const [subSlugForBreadCrumbs, setSubSlugForBreadCrumbs] = useState('');
  const [technicalInfoFiles, setTechnicalInfoFiles] = useState([]);
  const [colorFinishCodeArray, setColorFinisCodeArray] = useState([]);

  const {
    data: {
      product: {
        links: {
          ProductItem = [],
          ProductResource = [],
          ProductProductLinkType = []
        } = {},
        ProductBrandName,
        ProductDescriptionProductShort,
        ProductDefaultSKU,
        ProductNarrativeDescription,
        ProductWebFeatures01,
        ProductWebFeatures02,
        ProductWebFeatures03,
        ProductWebFeatures04,
        ProductWebFeatures05,
        ProductWebFeatures06,
        ProductWebFeatures07,
        ProductWebFeatures08,
        ProductWebFeatures09,
        ProductWebFeatures10,
        ProductWebFeatures11,
        ProductWebFeatures12,
        ProductWebFeatures13,
        ProductWebFeatures14,
        ProductWebFeatures15,
        ProductWebFeatures16,
        ProductWebFeatures17,
        ProductWebFeatures18,
        ProductWebFeatures19,
        ProductWebFeatures20,
        ProductWebInstallation01,
        ProductWebInstallation02,
        ProductWebInstallation03,
        ProductWebInstallation04,
        ProductWebInstallation05,
        ProductWebInstallation06,
        ProductWebInstallation07,
        ProductWebInstallation08,
        ProductWebMaterial01,
        ProductWebMaterial02,
        ProductWebMaterial03,
        ProductWebMaterial04,
        ProductWebMaterial05,
        ProductWebHydrotherapy01,
        ProductWebHydrotherapy02,
        ProductWebHydrotherapy03,
        ProductWebHydrotherapy04,
        ProductWebHydrotherapy05,
        ProductOverallLengthMm,
        ProductOverallHeightMm,
        ProductOverallWidthMm,
        ProductOverallDepthMm,
        ProductMaterial,
        ProductInstallationType,
        ProductPriceSpiderIncluded,
        ProductLocalCategory,
        ProductSection,
        ProductProductType
      }
    } = {}
  } = productDetailsData;

  const skuId = router?.query?.skuid || ProductDefaultSKU; //take product default SKU NO

  const setColorImageFeature = (e, item) => {
    setColorName(item.SKUColorFinishName);
    setSKUNumber(item.SKUSKUNo);
    setColorFileName(item.SKUColorSwatchFilename);
    setSkuName(0);

    if (item.SKUSKUNo === ProductDefaultSKU) {
      const defaultItems =
        ProductItem?.find(el => el.SKUSKUNo === item.SKUSKUNo) || {};
      const carousel_image_array =
        defaultItems?.links?.ItemResource?.filter(
          el => el.ResourceType === PRODUCT_CAROUSEL_IMAGE
        ) || [];
      const other_images =
        ProductResource?.filter(el =>
          PRODUCT_ADDITIONAL_IMAGE.includes(el.ResourceType)
        ) || [];

      setCarousel([...carousel_image_array, ...other_images]);
    } else {
      const carousel_image_array = item?.links?.ItemResource?.filter(
        el => el.ResourceType === PRODUCT_CAROUSEL_IMAGE
      );

      setCarousel(carousel_image_array);
    }
  };

  useEffect(() => {
    const color_finish_code_array = ProductItem.filter(
      el => el.SKUColorFinishCode !== undefined
    );

    setColorFinisCodeArray(color_finish_code_array);
    const defaultItems = ProductItem?.find(el => el.SKUSKUNo === skuId) || {};
    const carousel_image_array =
      defaultItems?.links?.ItemResource?.filter(
        el => el.ResourceType === PRODUCT_CAROUSEL_IMAGE
      ) || [];
    let other_images = [];
    if (skuId === ProductDefaultSKU) {
      other_images =
        ProductResource?.filter(el =>
          PRODUCT_ADDITIONAL_IMAGE.includes(el.ResourceType)
        ) || [];
    }

    setCarousel([...carousel_image_array, ...other_images]);
    setColorName(defaultItems?.SKUColorFinishName);
    setSKUNumber(defaultItems?.SKUSKUNo);
    setColorFileName(defaultItems.SKUColorSwatchFilename);
    const tech_info_files = ProductResource?.filter(el =>
      TECHNICAL_INFORMATION_FILES.includes(el.ResourceType)
    );
    setTechnicalInfoFiles(tech_info_files);
    const spec_pdf_link = ProductResource?.find(
      el1 => el1.ResourceType === PRODUCT_RESOURCE_TYPE_SPEC_DOC
    );
    setSpecPdfFile(spec_pdf_link?.ResourceFullWebURL);
    const gif_line_art = ProductResource?.find(
      el1 => el1.ResourceType === PRODUCT_GIF_LINE_ART_IMAGE
    );
    setLineArtUrl(gif_line_art);

    // pdf links plan
    const plan_view_3d = ProductResource?.filter(el =>
      PRODUCT_PLAN_3D.includes(el.ResourceType)
    );
    setPlanView3D(plan_view_3d);
    const plan_view_front_2d = ProductResource?.filter(el =>
      PRODUCT_Front_View_2D.includes(el.ResourceType)
    );
    setFront2D(plan_view_front_2d);
    const plan_2d = ProductResource?.filter(el =>
      PRODUCT_Plan_View_2D.includes(el.ResourceType)
    );
    setPlan2D(plan_2d);
    const plan_side_2d = ProductResource?.filter(el =>
      PRODUCT_Side_View_2D.includes(el.ResourceType)
    );
    setSide2D(plan_side_2d);
    const cut_out_dxf = ProductResource?.find(
      el => el.ResourceType === PRODUCT_Cut_Out_DXF
    );
    setCutOutDXF(cut_out_dxf);
    const bim_revit = ProductResource?.find(
      el => el.ResourceType === PRODUCT_BIMRevit
    );
    setBimRevit(bim_revit);
    // set slug
    const localStorageCheckForSlug = localStorage.getItem('slug') || '';
    const localStorageCheckForSubSlug = localStorage.getItem('sub_slug') || '';
    setSlugForBreadCrumbs(localStorageCheckForSlug);
    setSubSlugForBreadCrumbs(localStorageCheckForSubSlug);
  }, []);

  useEffect(() => {
    async function fetchSimilarProducts() {
      if (ProductProductType !== undefined) {
        try {
          const requestBody = {
            ProductProductType_PT: ProductProductType
          };
          const productListingData = await getProductListing(requestBody);
          const filteredData =
            productListingData &&
            productListingData?.response?.value?.filter(
              el => el.ProductDefaultSKU !== skuNumber
            );
          setSimilarProducts(filteredData);
        } catch (err) {
          console.log('err', err);
        }
      }
    }
    //similar products

    fetchSimilarProducts();
  }, [skuNumber]);

  const handleMagnifier = (e, myImageId) => {
    let glass = document.getElementsByClassName('img-magnifier-glass');
    !zoomActive
      ? magnify(myImageId, 3)
      : glass[0].parentNode.removeChild(glass[0]);
  };

  return (
    <>
      <section className='max-w-screen-lg mx-auto bg-white text-[#232323] mb-[50px] p-[5px]'>
        <div className='flex w-full m-2 md:flex-row flex-col'>
          {/* Product Carousel start */}
          <div className='flex flex-col md:w-2/3 w-full'>
            <div id='product_carousel'>
              <Carousel
                dynamicHeight={true}
                infiniteLoop={false}
                showArrows={true}
                showStatus={false}
                showIndicators={false}
                emulateTouch={true}
                selectedItem={skuName}
                onChange={e => setSkuName(e)}
              >
                {carousel && carousel.length > 0 ? (
                  carousel?.map((element, id) => (
                    <div
                      key={id}
                      id='product_carousel_image'
                      className='img-magnifier-container'
                      onMouseEnter={e => {
                        setZoomActive(true);
                        handleMagnifier(e, element.ResourceName);
                      }}
                      onMouseLeave={e => {
                        setZoomActive(false);
                        handleMagnifier(e, element.ResourceName);
                      }}
                    >
                      <img
                        src={element?.ResourceFullWebURL}
                        id={element.ResourceName}
                        alt={element.ResourceName}
                        onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <img src={imageFormatter()} id={'image1'} alt='image1' />
                  </div>
                )}
              </Carousel>
              {showZoom && (
                <ImageZoomModal
                  showImageZoom={showImageZoom}
                  skuName={skuName}
                  carouselItem={carousel}
                  defaultImageLink={DEFAULT_IMAGE_LINK}
                />
              )}
              <div
                className='md:flex bg-[#e5e5e5] p-3 cursor-pointer justify-end hidden'
                onClick={() => showImageZoom(true)}
              >
                <MdOutlineZoomOutMap size={30} />
              </div>
            </div>
          </div>
          {/* Product carousel end */}
          <div className='flex flex-col md:w-1/3 w-full px-[15px]'>
            <div className='text-[22px] font-helveticaLight font-semibold'>
              {ProductBrandName}
            </div>
            <div className='mt-[10px] text-[18px] font-helveticaLight font-light mb-[20px]'>
              {ProductDescriptionProductShort}
            </div>
            {skuNumber && (
              <div className='font-helveticaLight text-[16px] leading-tight font-normal text-[#666]'>
                K-{skuNumber}
              </div>
            )}
            <div className='mt-[20px] mb-[10px]'>
              <span className='p-[5px] font-helveticaGroup font-semibold text-[15px] leading-tight text-[#000] uppercase'>
                {PDP_LABELS.colorName}
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
                  className='mx-1 relative inline-block'
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
                      width: '40px',
                      padding: '5px'
                    }}
                  />
                  {colorFileName === el.SKUColorSwatchFilename && (
                    <div className='absolute top-0 right-0 h-[40px] w-[40px] bg-cover border-2 border-neutral-500'>
                      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <HiCheck size={20} />
                      </div>
                    </div>
                  )}
                  {showColorName && showColorName === el.SKUColorFinishName && (
                    <span className='absolute top-full p-[10px] bg-[#f9f9f9] border-1 border-neutral-500 rounded-md shadow font-helvetica leading-tight text-[13px] w-max'>
                      {el.SKUColorFinishName}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* <div className='mt-[20px] hidden md:block'>
              <a
                className='font-helveticaGroup bg-[#e5e5e5] py-[14px] px-[20px] text-[14px] uppercase font-semibold  text-[#232323] leading-tight shadow hover:no-underline hover:bg-[#bebebe] rounded'
                // onClick={e => addProductForCompare(e, modalItem)}
              >
                +Compare
              </a>
            </div> */}
            {ProductPriceSpiderIncluded && (
              <div className='mt-[35px] mb-[35px]'>
                <div className='koh-ps-button'>
                  <div
                    className='ps-widget'
                    ps-sku={`K-${ProductDefaultSKU}`}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex w-full m-2 flex-col'>
          <div className='flex flex-col md:w-2/3 w-full '>
            <div className='breadcrumbs-color hidden md:inline-flex my-[48px] font-HelveticaRoman text-[12px] leading-tight font-light text-[#000]'>
              {PDP_LABELS.home}{' '}
              {ProductSection && ProductSection.length > 0 && (
                <>
                  <HiOutlineChevronRight size={15} /> {ProductSection[0]}
                </>
              )}{' '}
              {ProductLocalCategory &&
                ProductSection &&
                ProductSection.length > 0 &&
                ProductLocalCategory.length > 0 && (
                  <>
                    <HiOutlineChevronRight size={15} />{' '}
                    {ProductLocalCategory[0]}
                  </>
                )}
            </div>
            <div className='font-HelveticaRoman text-[14px] text-[#232323] mb-[30px]'>
              {ProductNarrativeDescription}
            </div>
            {specPdfFile && (
              <div className='mb-[30px] cursor-pointer'>
                <LinkWithLabel
                  className='inline-flex'
                  label={PDP_LABELS.specFileLabel}
                  url={specPdfFile}
                  icon={<FaFilePdf color='red' />}
                />
              </div>
            )}

            {ProductWebFeatures01 && (
              <>
                <hr />
                <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
                  {PDP_LABELS.characteristics}
                </div>
                <ul className='list-disc p-[10px]'>
                  {ProductWebFeatures01 && (
                    <li className='mb-[15px]'>{ProductWebFeatures01}</li>
                  )}
                  {ProductWebFeatures02 && (
                    <li className='mb-[15px]'>{ProductWebFeatures02}</li>
                  )}
                  {ProductWebFeatures03 && (
                    <li className='mb-[15px]'>{ProductWebFeatures03}</li>
                  )}
                  {ProductWebFeatures04 && (
                    <li className='mb-[15px]'>{ProductWebFeatures04}</li>
                  )}
                  {ProductWebFeatures05 && (
                    <li className='mb-[15px]'>{ProductWebFeatures05}</li>
                  )}
                  {ProductWebFeatures06 && (
                    <li className='mb-[15px]'>{ProductWebFeatures06}</li>
                  )}
                  {ProductWebFeatures07 && (
                    <li className='mb-[15px]'>{ProductWebFeatures07}</li>
                  )}
                  {ProductWebFeatures08 && (
                    <li className='mb-[15px]'>{ProductWebFeatures08}</li>
                  )}
                  {ProductWebFeatures09 && (
                    <li className='mb-[15px]'>{ProductWebFeatures09}</li>
                  )}
                  {ProductWebFeatures10 && (
                    <li className='mb-[15px]'>{ProductWebFeatures10}</li>
                  )}
                  {ProductWebFeatures11 && (
                    <li className='mb-[15px]'>{ProductWebFeatures11}</li>
                  )}
                  {ProductWebFeatures12 && (
                    <li className='mb-[15px]'>{ProductWebFeatures12}</li>
                  )}
                  {ProductWebFeatures13 && (
                    <li className='mb-[15px]'>{ProductWebFeatures13}</li>
                  )}
                  {ProductWebFeatures14 && (
                    <li className='mb-[15px]'>{ProductWebFeatures14}</li>
                  )}
                  {ProductWebFeatures15 && (
                    <li className='mb-[15px]'>{ProductWebFeatures15}</li>
                  )}
                  {ProductWebFeatures16 && (
                    <li className='mb-[15px]'>{ProductWebFeatures16}</li>
                  )}
                  {ProductWebFeatures17 && (
                    <li className='mb-[15px]'>{ProductWebFeatures17}</li>
                  )}
                  {ProductWebFeatures18 && (
                    <li className='mb-[15px]'>{ProductWebFeatures18}</li>
                  )}
                  {ProductWebFeatures19 && (
                    <li className='mb-[15px]'>{ProductWebFeatures19}</li>
                  )}
                  {ProductWebFeatures20 && (
                    <li className='mb-[15px]'>{ProductWebFeatures20}</li>
                  )}
                </ul>
              </>
            )}
            {ProductWebInstallation01 && (
              <>
                <div className='text-[15px] font-helveticaGroup leading-tight font-semibold'>
                  {PDP_LABELS.installation}
                </div>
                <ul className='list-disc p-[10px]'>
                  {ProductWebInstallation01 && (
                    <li className='mb-[15px]'>{ProductWebInstallation01}</li>
                  )}
                  {ProductWebInstallation02 && (
                    <li className='mb-[15px]'>{ProductWebInstallation02}</li>
                  )}
                  {ProductWebInstallation03 && (
                    <li className='mb-[15px]'>{ProductWebInstallation03}</li>
                  )}
                  {ProductWebInstallation04 && (
                    <li className='mb-[15px]'>{ProductWebInstallation04}</li>
                  )}
                  {ProductWebInstallation05 && (
                    <li className='mb-[15px]'>{ProductWebInstallation05}</li>
                  )}
                  {ProductWebInstallation06 && (
                    <li className='mb-[15px]'>{ProductWebInstallation06}</li>
                  )}
                  {ProductWebInstallation07 && (
                    <li className='mb-[15px]'>{ProductWebInstallation07}</li>
                  )}
                  {ProductWebInstallation08 && (
                    <li className='mb-[15px]'>{ProductWebInstallation08}</li>
                  )}
                </ul>
              </>
            )}
            {ProductWebMaterial01 && (
              <>
                <div className='text-[15px] font-helveticaGroup leading-tight font-semibold'>
                  {PDP_LABELS.material}
                </div>
                <ul className='list-disc p-[10px]'>
                  {ProductWebMaterial01 && (
                    <li className='mb-[15px]'>{ProductWebMaterial01}</li>
                  )}
                  {ProductWebMaterial02 && (
                    <li className='mb-[15px]'>{ProductWebMaterial02}</li>
                  )}
                  {ProductWebMaterial03 && (
                    <li className='mb-[15px]'>{ProductWebMaterial03}</li>
                  )}
                  {ProductWebMaterial04 && (
                    <li className='mb-[15px]'>{ProductWebMaterial04}</li>
                  )}
                  {ProductWebMaterial05 && (
                    <li className='mb-[15px]'>{ProductWebMaterial05}</li>
                  )}
                </ul>
              </>
            )}
            {ProductWebHydrotherapy01 && (
              <>
                <div className='text-[15px] font-helveticaGroup leading-tight font-semibold'>
                  {PDP_LABELS.hydrotherapy}
                </div>
                <ul className='list-disc p-[10px]'>
                  {ProductWebHydrotherapy01 && (
                    <li className='mb-[15px]'>{ProductWebHydrotherapy01}</li>
                  )}
                  {ProductWebHydrotherapy02 && (
                    <li className='mb-[15px]'>{ProductWebHydrotherapy02}</li>
                  )}
                  {ProductWebHydrotherapy03 && (
                    <li className='mb-[15px]'>{ProductWebHydrotherapy03}</li>
                  )}
                  {ProductWebHydrotherapy04 && (
                    <li className='mb-[15px]'>{ProductWebHydrotherapy04}</li>
                  )}
                  {ProductWebHydrotherapy05 && (
                    <li className='mb-[15px]'>{ProductWebHydrotherapy05}</li>
                  )}
                </ul>
              </>
            )}

            <div className='mb-[20px]'>
              {((front2D && front2D.length > 0) ||
                (side2D && side2D.length > 0) ||
                (plan2D && plan2D.length > 0) ||
                (PlanView3D && PlanView3D.length > 0) ||
                cutOutDXF) && (
                <>
                  <hr />
                  <div className='mt-[24px] mb-[40px] font-helveticaLight uppercase text-[20px] leading-tight font-light'>
                    {PDP_LABELS.resources}
                  </div>
                  <div className='pb-[20px] font-helveticaLight text-[17px] uppercase leading-tight font-light'>
                    {PDP_LABELS.cadTemplate}
                  </div>

                  <div className='flex flex-col mt-[20px] md:mt-0 pl-[10px]'>
                    {cutOutDXF && (
                      <>
                        <p className='font-helveticaGroup font-semibold text-[14px]'>
                          {PDP_LABELS.cutOutTemplates}
                        </p>
                        <ul className='inline-flex flex-wrap'>
                          <HiOutlineDownload />

                          <li>
                            <LinkWithLabel
                              url={cutOutDXF.ResourceFullWebURL}
                              label={'DXF'}
                              className='font-helveticaGroup font-light text-[14px] px-[5px] border-black uppercase border-x'
                            />
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                  <div className='flex flex-col mt-[20px] md:mt-0 pl-[10px]'>
                    {bimRevit && (
                      <>
                        <ul className='inline-flex flex-wrap'>
                          <HiOutlineDownload />

                          <li>
                            <LinkWithLabel
                              url={bimRevit.ResourceFullWebURL}
                              label={PDP_LABELS.bimRevit}
                              className='font-helveticaGroup font-light text-[14px] px-[5px] border-black uppercase border-x'
                            />
                          </li>
                        </ul>
                      </>
                    )}
                  </div>

                  <div className='flex md:justify-between md:flex-row flex-col p-[10px]'>
                    {(front2D.length > 0 ||
                      side2D.length > 0 ||
                      plan2D.length > 0) && (
                      <div className='flex'>
                        <div className='flex flex-col'>
                          <p className='font-helveticaGroup font-semibold text-[14px]'>
                            {PDP_LABELS.cadFiles2D}
                          </p>
                          {plan2D.length > 0 && (
                            <>
                              <p>{PDP_LABELS.plan}</p>
                              <ul className='inline-flex'>
                                <HiOutlineDownload />
                                {plan2D?.map((el, id) => (
                                  <li key={id}>
                                    <LinkWithLabel
                                      label={
                                        PRODUCT_PLAN_NAME_2D[el.ResourceType]
                                      }
                                      url={el.ResourceFullWebURL}
                                      className='font-helveticaGroup font-light text-[14px] px-[5px] border-black uppercase border-x'
                                    />
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {front2D.length > 0 && (
                            <>
                              <p>{PDP_LABELS.front}</p>
                              <ul className='inline-flex '>
                                <HiOutlineDownload />
                                {front2D?.map((el, id) => (
                                  <li key={id}>
                                    <LinkWithLabel
                                      label={
                                        PRODUCT_FRONT_NAME_2D[el.ResourceType]
                                      }
                                      url={el.ResourceFullWebURL}
                                      className='font-helveticaGroup font-light text-[14px] px-[5px] border-black uppercase border-x'
                                    />
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {side2D.length > 0 && (
                            <>
                              <p>{PDP_LABELS.side}</p>
                              <ul className='inline-flex'>
                                <HiOutlineDownload />
                                {side2D?.map((el, id) => (
                                  <li key={id}>
                                    <LinkWithLabel
                                      url={el.ResourceFullWebURL}
                                      label={
                                        PRODUCT_SIDE_NAME_2D[el.ResourceType]
                                      }
                                      className='font-helveticaGroup font-light text-[14px] px-[5px] border-black uppercase border-x'
                                    />
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    <div className='flex flex-col mt-[20px] md:mt-0'>
                      {PlanView3D.length > 0 && (
                        <>
                          <p className='font-helveticaGroup font-semibold text-[14px]'>
                            {PDP_LABELS.cadFiles3D}
                          </p>
                          <ul className='inline-flex flex-wrap'>
                            <HiOutlineDownload />
                            {PlanView3D?.map((el, id) => (
                              <li key={id}>
                                <LinkWithLabel
                                  url={el.ResourceFullWebURL}
                                  label={PRODUCT_PLAN_NAME_3D[el.ResourceType]}
                                  className='font-helveticaGroup font-light text-[14px] px-[5px] border-black uppercase border-x'
                                />
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <hr />
            <div>
              <p className='my-[30px] uppercase font-helveticaLight text-[20px]'>
                {PDP_LABELS.supportService}
              </p>
            </div>
            <hr />
            <div className='mt-[20px]'>
              <p className='mb-[20px]'>{PDP_LABELS.supportServiceQ}</p>
              <p className='mb-[5px] text-[#232323] font-helveticaGroup font-semibold text-[14px]'>
                {PDP_LABELS.contactUs}
              </p>
              <p>
                <a
                  href={`tel:${PDP_LABELS.contactUsNumber}`}
                  className='font-bold text-[#000]'
                >
                  {PDP_LABELS.contactUsNumber}
                </a>
              </p>
              <p>{PDP_LABELS.contactUsTime} </p>
              <p>{PDP_LABELS.contactUsDay}</p>
              <p>
                Enviar e-mail:{' '}
                <a href='mailto:assistenciatecnica@kohler.com'>
                  assistenciatecnica@kohler.com
                </a>
              </p>
              <ul className='mt-[10px] list-disc mb-[30px]'>
                <li>
                  <Link href='/Cuidados-e-limpeza'>
                    <a target='_blank'>{PDP_LABELS.careAndCleaning}</a>
                  </Link>
                </li>
                <li>
                  <Link href='/garantia'>
                    <a target='_blank'>{PDP_LABELS.guarantee}</a>
                  </Link>
                </li>
              </ul>
            </div>
            <hr />
            <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
              {PDP_LABELS.technicalInformation}
            </div>
            <div className='flex flex-col md:flex-row mb-[30px]'>
              <div className='flex flex-col'>
                <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                  {PDP_LABELS.dimension}
                </div>
                <div className>
                  <span className='font-helveticaGroup text-[14px] leading-tight font-semibold mr-[5px]'>
                    L
                  </span>
                  {ProductOverallLengthMm && (
                    <span className='mr-[5px]'>{ProductOverallLengthMm}</span>
                  )}
                  mm,{' '}
                  <span className='font-helveticaGroup text-[14px] leading-tight font-semibold mr-[5px]'>
                    H
                  </span>
                  {ProductOverallHeightMm && (
                    <span className='mr-[5px]'>{ProductOverallHeightMm}</span>
                  )}
                  mm,{' '}
                  <span className='font-helveticaGroup text-[14px] leading-tight font-semibold mr-[5px]'>
                    W
                  </span>
                  {ProductOverallWidthMm && (
                    <span className='mr-[5px]'>{ProductOverallWidthMm}</span>
                  )}
                  mm,{' '}
                  <span className='font-helveticaGroup text-[14px] leading-tight font-semibold mr-[5px]'>
                    D
                  </span>
                  {ProductOverallDepthMm && (
                    <span className='mr-[5px]'>{ProductOverallDepthMm}</span>
                  )}
                  mm
                </div>
                {lineArt && (
                  <div className='mt-[30px]'>
                    <img
                      src={lineArt?.ResourceFullWebURL}
                      alt='Gif line art'
                      onError={e =>
                        (e.target.src = gifLineArtImageFormatter(
                          lineArt?.ResourceName
                        ))
                      }
                    />
                  </div>
                )}

                <div className='mt-[20px] flex-col flex'>
                  {technicalInfoFiles &&
                    technicalInfoFiles?.map((element, id) => (
                      <div className='inline-flex mt-[10px]' key={id}>
                        <LinkWithLabel
                          icon={<FaFilePdf color='red' />}
                          url={element.ResourceFullWebURL}
                          label={
                            TECHNICAL_INFORMATION_FILES_NAMES[
                              element.ResourceType
                            ]
                          }
                          className='inline-flex'
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className='flex flex-col ml-[20px] mt-[30px] md:mt-0'>
                {ProductMaterial && (
                  <>
                    <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                      {PDP_LABELS.material}
                    </div>
                    <div className='mb-[20px]'>{ProductMaterial}</div>
                  </>
                )}
                {ProductInstallationType &&
                  ProductInstallationType.length > 0 && (
                    <>
                      <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                        {PDP_LABELS.installation}
                      </div>
                      <div>{ProductInstallationType[0]}</div>
                    </>
                  )}
              </div>
            </div>
            <hr />
            <div className='flex flex-col'>
              {ProductProductLinkType && ProductProductLinkType.length > 0 && (
                <>
                  <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
                    {PDP_LABELS.paresWellWith}
                  </div>
                  <div className='flex flex-wrap lg:flex-nowrap flex-row'>
                    <SimilarProductsCards
                      productProductLinkType={ProductProductLinkType}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {similarProducts && similarProducts.length > 0 && (
          <div className='flex flex-col'>
            <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
              {PDP_LABELS.similarProducts}
            </div>
            <div className='flex flex-wrap lg:flex-nowrap flex-row'>
              <SimilarProducts
                productProductLinkType={similarProducts?.slice(0, 4)}
              />
            </div>
          </div>
        )}
      </section>
      <Cta fields={CTAObject} />
      <BackToTop topHeight={0} />
    </>
  );
}

DetailsComponent.defaultProps = {
  productDetailsData: {
    data: {
      product: {
        links: {
          ProductItem: [],
          ProductResource: [],
          ProductProductLinkType: []
        },
        ProductBrandName: '',
        ProductDescriptionProductShort: '',
        ProductDefaultSKU: '',
        ProductNarrativeDescription: '',
        ProductWebFeatures01: '',
        ProductWebFeatures02: '',
        ProductWebFeatures03: '',
        ProductWebFeatures04: '',
        ProductWebFeatures05: '',
        ProductWebFeatures06: '',
        ProductWebFeatures07: '',
        ProductWebFeatures08: '',
        ProductWebFeatures09: '',
        ProductWebFeatures10: '',
        ProductWebFeatures11: '',
        ProductWebFeatures12: '',
        ProductWebFeatures13: '',
        ProductWebFeatures14: '',
        ProductWebFeatures15: '',
        ProductWebFeatures16: '',
        ProductWebFeatures17: '',
        ProductWebFeatures18: '',
        ProductWebFeatures19: '',
        ProductWebFeatures20: '',
        ProductWebInstallation01: '',
        ProductWebInstallation02: '',
        ProductWebInstallation03: '',
        ProductWebInstallation04: '',
        ProductWebInstallation05: '',
        ProductWebInstallation06: '',
        ProductWebInstallation07: '',
        ProductWebInstallation08: '',
        ProductWebMaterial01: '',
        ProductWebMaterial02: '',
        ProductWebMaterial03: '',
        ProductWebMaterial04: '',
        ProductWebMaterial05: '',
        ProductWebHydrotherapy01: '',
        ProductWebHydrotherapy02: '',
        ProductWebHydrotherapy03: '',
        ProductWebHydrotherapy04: '',
        ProductWebHydrotherapy05: '',
        ProductOverallLengthMm: '',
        ProductOverallHeightMm: '',
        ProductOverallWidthMm: '',
        ProductOverallDepthMm: '',
        ProductMaterial: '',
        ProductInstallationType: [],
        ProductPriceSpiderIncluded: false,
        ProductLocalCategory: [],
        ProductSection: [],
        ProductProductType: ''
      }
    }
  }
};
