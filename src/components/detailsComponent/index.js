/* eslint-disable @next/next/no-html-link-for-pages */

/* eslint-disable react/no-unknown-property */

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from 'react';
import { FaRegFilePdf } from 'react-icons/fa';
import {
  HiCheck,
  HiOutlineDownload,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiShare
} from 'react-icons/hi';
import { HiMiniPrinter, HiPlay } from 'react-icons/hi2';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  getProductListing,
  getYoutubeMetaData
} from '@services/productListingAPI/client';
import Cta from '@components/Cta';
import BackToTop from '@components/backToTop';
import { Fb, Twitter } from '@components/svgs';
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
  DEFAULT_IMAGE_LINK,
  CTAObject,
  checkForNewProducts,
  carouselImageFormatter,
  PRODUCT_RESOURCE_TYPE_VIDEO,
  thumbsImageFormatter
} from './helper';
import VideoModal from './videoModal';

export default function DetailsComponent({ productDetailsData, skuID }) {
  const router = useRouter();
  const { locale = '' } = router;
  const ref = useRef();
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
  const [technicalInfoFiles, setTechnicalInfoFiles] = useState([]);
  const [colorFinishCodeArray, setColorFinisCodeArray] = useState([]);
  const [social, setSocial] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [thumbsPosition, setThumbsPosition] = useState(0);
  const [imageName, setImageName] = useState('');
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [hasLinkedprodcts, setHasLinkedproduct] = useState(false);
  const [youTubeLink, setYoutubeLink] = useState([]);
  const [youtubeMetaData, setYoutubeMetaData] = useState([]);
  const [youtubeLinkOpen, setYoutubeLinkOpen] = useState({});

  const handlePrevClick = () => {
    // Your code to display the selected image goes here

    // Check if the currently selected image is the last one
    if (imageIndex === carousel.length - 1) {
      // Set the selected image to the first image
      setImageIndex(0);
      setThumbsPosition(0);
      setImageName(carousel[0]?.ResourceName);
    } else {
      // Set the selected image to the next image
      setImageIndex(prevImageIndex => prevImageIndex + 1);
      setThumbsPosition(imageIndex);
      setImageName(carousel[imageIndex + 1]?.ResourceName);
    }
  };

  const {
    data: {
      product: {
        links: {
          ProductItem = [],
          ProductResource = [],
          ProductProductLinkType = []
        } = {},
        ProductBrandName,
        ProductProductNo,
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
        ProductWebInstallation01,
        ProductWebInstallation02,
        ProductWebInstallation03,
        ProductWebInstallation04,
        ProductWebInstallation05,
        ProductWebInstallation06,
        ProductWebMaterial01,
        ProductWebMaterial02,
        ProductWebMaterial03,
        ProductWebTechnology01,
        ProductWebTechnology02,
        ProductWebTechnology03,
        ProductOverallLengthMm,
        ProductOverallHeightMm,
        ProductOverallWidthMm,
        ProductOverallDepthMm,
        ProductMaterial,
        ProductInstallationType,
        ProductLocalCategory,
        ProductSection,
        ProductProductType,
        ProductMETADESCRIPTION
      }
    } = {}
  } = productDetailsData;

  const skuId = skuID.replace('K-', '') || ProductDefaultSKU; //take product default SKU NO

  const setColorImageFeature = (e, item) => {
    setColorName(item.SKUColorFinishName);
    setSKUNumber(item.SKUSKUNo);
    setColorFileName(item.SKUColorSwatchFilename);
    setImageIndex(0);
    setThumbsPosition(0);

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

      const youtube_link = ProductResource?.filter(el =>
        PRODUCT_RESOURCE_TYPE_VIDEO.includes(el?.ResourceType)
      );

      setCarousel([...carousel_image_array, ...other_images, ...youtube_link]);
    } else {
      const carousel_image_array =
        item?.links?.ItemResource?.filter(
          el => el.ResourceType === PRODUCT_CAROUSEL_IMAGE
        ) || [];

      const other_images =
        ProductResource?.filter(el =>
          PRODUCT_ADDITIONAL_IMAGE.includes(el.ResourceType)
        ) || [];

      const youtube_link = ProductResource?.filter(el =>
        PRODUCT_RESOURCE_TYPE_VIDEO.includes(el?.ResourceType)
      );

      setCarousel([...carousel_image_array, ...other_images, ...youtube_link]);
    }
    const is_new_product = checkForNewProducts(
      item?.links?.ItemRegion?.find(obj =>
        Object.keys(obj).includes('RegionReleaseforShipment')
      )?.RegionReleaseforShipment
    );
    setIsNewProduct(is_new_product);

    const queryParams = {
      skuid: 'K-' + item.SKUSKUNo
    }; // Replace with your desired dynamic query parameters
    // Create the URL with the dynamic query parameters
    const url = {
      pathname: `/product-detail/${ProductProductNo}`,
      query: queryParams
    };

    // Update the URL
    router.push(url, undefined, { shallow: true });
  };

  useEffect(() => {
    const color_finish_code_array = ProductItem.filter(
      el =>
        el.SKUColorFinishCode !== undefined &&
        el?.links?.ItemResource !== undefined
    );
    setColorFinisCodeArray(color_finish_code_array);
    const defaultItems = ProductItem?.find(el => el.SKUSKUNo === skuId) || {};
    const is_new_product = checkForNewProducts(
      defaultItems?.links?.ItemRegion?.find(obj =>
        Object.keys(obj).includes('RegionReleaseforShipment')
      )?.RegionReleaseforShipment
    );
    setIsNewProduct(is_new_product);
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

    const youtube_link = ProductResource?.filter(item =>
      PRODUCT_RESOURCE_TYPE_VIDEO.includes(item?.ResourceType)
    );
    setYoutubeLink(youtube_link);

    setCarousel([...carousel_image_array, ...other_images, ...youtube_link]);
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
    const has_linked_products = ProductProductLinkType?.find(
      ele => ele.ProductATGISACTIVE === true
    );
    setHasLinkedproduct(has_linked_products);
  }, []);

  useEffect(() => {
    setImageName(carousel[0]?.ResourceName);
  }, [carousel]);

  useEffect(() => {
    async function fetchMetaData() {
      let responseArray = await Promise.all(
        youTubeLink?.map(async i => {
          return { i, metaData: await getYoutubeMetaData(i?.ResourceName) };
        })
      );

      setYoutubeMetaData(responseArray);
    }

    fetchMetaData();
  }, [youTubeLink]);

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

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (social && ref.current && !ref.current.contains(e.target)) {
        setSocial(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [social]);

  const handleMagnifier = (e, myImageId) => {
    let glass = document.getElementsByClassName('img-magnifier-glass');
    !zoomActive
      ? magnify(myImageId, 3)
      : glass[0].parentNode.removeChild(glass[0]);
  };

  return (
    <>
      <section className='max-w-screen-lg mx-auto bg-white text-[#232323] mb-[50px] p-2'>
        <div className='flex w-full md:flex-row flex-col'>
          {/* Product Carousel start */}
          <div className='flex flex-col md:w-2/3 w-full'>
            {/* carousel */}
            <div className='flex lg:p-4 p-0 flex-col-reverse lg:flex-row'>
              {/* Custom image thumbs */}
              <div className='flex lg:flex-col flex-row lg:w-1/6 items-center'>
                {carousel &&
                  carousel
                    ?.slice(thumbsPosition, thumbsPosition + 3)
                    ?.map((imgs, id) => {
                      return (
                        <div
                          key={id}
                          className={`${
                            imageName === imgs?.ResourceName &&
                            'border-2 border-black'
                          } m-1`}
                        >
                          <Image
                            src={thumbsImageFormatter(
                              imgs?.ResourceName,
                              isNewProduct,
                              imgs?.ResourceType
                            )}
                            height={60}
                            width={80}
                            id={imgs.ResourceName}
                            alt={imgs.ResourceName}
                            onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                            onClick={() => {
                              setImageIndex(carousel.indexOf(imgs));
                              setImageName(imgs?.ResourceName);
                            }}
                          />
                        </div>
                      );
                    })}
                {carousel?.length > 3 &&
                  thumbsPosition > -(carousel.length - 3) && (
                    <>
                      <button
                        className='lg:hidden block text-[#e5e5e5] hover:text-[#232323]'
                        onClick={e => handlePrevClick(e)}
                      >
                        <HiOutlineChevronRight size={35} />
                      </button>
                      <button
                        className='lg:block hidden text-[#e5e5e5] hover:text-[#232323]'
                        onClick={e => handlePrevClick(e)}
                      >
                        <HiOutlineChevronDown size={45} />
                      </button>
                    </>
                  )}
              </div>
              <div className='lg:w-5/6 sm:w-[95%] w-full p-1 relative'>
                {PRODUCT_RESOURCE_TYPE_VIDEO.includes(
                  carousel[imageIndex]?.ResourceType
                ) ? (
                  <iframe
                    height='470'
                    width='100%'
                    src={`https://www.youtube.com/embed/${carousel[imageIndex]?.ResourceName}?rel=0`}
                    title='YouTube video player'
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowfullscreen='allowfullscreen'
                    mozallowfullscreen='mozallowfullscreen'
                    msallowfullscreen='msallowfullscreen'
                    oallowfullscreen='oallowfullscreen'
                    webkitallowfullscreen='webkitallowfullscreen'
                  ></iframe>
                ) : (
                  <div
                    className='img-magnifier-container sm:flex hidden'
                    onMouseEnter={e => {
                      setZoomActive(true);
                      handleMagnifier(e, 'myImage');
                    }}
                    onMouseLeave={e => {
                      setZoomActive(false);
                      handleMagnifier(e, 'myImage');
                    }}
                  >
                    <img
                      src={carouselImageFormatter(
                        carousel[imageIndex]?.ResourceName,
                        isNewProduct
                      )}
                      alt={carousel[imageIndex]?.ResourceName}
                      id='myImage'
                      className='w-full h-[250px] md:h-[350px] lg:h-[470px]'
                      onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
                    />
                  </div>
                )}

                <div className='sm:hidden flex'>
                  <Carousel
                    dynamicHeight={true}
                    infiniteLoop={false}
                    showStatus={false}
                    showIndicators={false}
                    emulateTouch={true}
                    showThumbs={false}
                    showArrows={false}
                    selectedItem={imageIndex}
                  >
                    {carousel && carousel.length > 0 ? (
                      carousel?.map((element, id) => (
                        <>
                          {!PRODUCT_RESOURCE_TYPE_VIDEO.includes(
                            element?.ResourceType
                          ) && (
                            <div key={id}>
                              <img
                                src={carouselImageFormatter(
                                  element?.ResourceName,
                                  isNewProduct
                                )}
                                id={element.ResourceName}
                                alt={element.ResourceName}
                                onError={e =>
                                  (e.target.src = DEFAULT_IMAGE_LINK)
                                }
                              />
                            </div>
                          )}
                        </>
                      ))
                    ) : (
                      <div>
                        <img
                          src={imageFormatter()}
                          id={'image1'}
                          alt='image1'
                        />
                      </div>
                    )}
                  </Carousel>
                </div>
                <div
                  className='md:flex cursor-pointer hidden items-end bg-transparent absolute right-0 bottom-0'
                  onClick={() => showImageZoom(true)}
                >
                  <MdOutlineZoomOutMap size={30} />
                </div>
              </div>

              {showZoom && (
                <ImageZoomModal
                  showImageZoom={showImageZoom}
                  skuName={imageIndex}
                  carouselItem={carousel}
                  defaultImageLink={DEFAULT_IMAGE_LINK}
                  isNewProduct={isNewProduct}
                />
              )}
            </div>
            {/* Carousel end */}
          </div>
          {/* Product carousel end */}
          <div className='flex flex-col md:w-1/3 w-full lg:px-[15px]'>
            <div className='text-[22px] font-helveticaLight font-semibold'>
              {ProductBrandName}
            </div>
            <div className='mt-[10px] text-[18px] font-helveticaLight font-light mb-[20px]'>
              {ProductDescriptionProductShort || ProductMETADESCRIPTION}
            </div>
            {skuNumber && (
              <div className='font-helveticaLight text-[16px] leading-tight font-normal text-[#666]'>
                K-{skuNumber}
              </div>
            )}
            <div className='mt-[20px] mb-[10px]'>
              <span className='p-[5px] font-helveticaGroup font-semibold text-[15px] leading-tight text-[#000] uppercase'>
                {PDP_LABELS[locale].colorName}
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
                  {showColorName && showColorName === el.SKUColorFinishName && (
                    <span className='absolute top-full p-[10px] bg-[#f9f9f9] border-1 border-neutral-500 rounded-md shadow font-helvetica leading-tight text-[13px] w-max z-10'>
                      {el.SKUColorFinishName}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className='mt-3 px-[20px] py-[14px] rounded-md bg-[#364573] hover:bg-[#1f2b54] text-center'>
              <a
                href='/store-listing'
                target='_blank'
                className='text-[#fff] uppercase font-HelveticaBold text-[14px] hover:no-underline'
              >
                {PDP_LABELS[locale].storelocatorButtonLabel}
              </a>
            </div>
            <div className='flex mt-5'>
              <div
                className='flex justify-center items-center mr-3 h-[40px] w-[40px] bg-[#e5e5e5] text-[#232323] rounded hover:bg-[#364573] hover:text-[#fff]'
                onClick={() => window.print()}
              >
                <HiMiniPrinter size={20} />
              </div>
              <div
                className='flex justify-center items-center mr-3 h-[40px] w-[40px] bg-[#e5e5e5] text-[#232323] rounded hover:bg-[#364573] hover:text-[#fff]'
                onClick={() => setSocial(true)}
              >
                <HiShare size={20} />
              </div>
            </div>
            {social && (
              <div className='ml-20 relative' ref={ref}>
                <ul
                  className='flex flex-col cursor-pointer text-[#000] [&_li]:block absolute w-[230px] p-4 shadow-md rounded bg-white'
                  style={{ top: '-20px' }}
                >
                  <li className=''>
                    <a
                      data-href={`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target='popup'
                      onClick={() => {
                        window.open(
                          `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                          'facebook share',
                          'width=600,height=400'
                        );
                      }}
                      rel='noreferrer'
                      className='flex bg-[#fff] text-[15px] text-[#325a90] transititext-primary transition duration-150 ease-in-out hover:text-opacity-70 hover:no-underline'
                      title='Share On facebook'
                    >
                      <div className='flex inline-flex'>
                        <div className='flex w-[20px] h-[20px]'>
                          <Fb />
                        </div>
                        <div className='flex p-2 text-[#232323] font-HelveticaRoman text-[14px]'>
                          Facebook
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='relative'>
                    <a
                      target='popup'
                      data-href={`http://twitter.com/share?text=${PDP_LABELS[locale].twitterText}&url=${window.location.href}`}
                      onClick={() => {
                        window.open(
                          `http://twitter.com/share?text=${PDP_LABELS[locale].twitterText}&url=${window.location.href}`,
                          'twitter share',
                          'width=600,height=400'
                        );
                      }}
                      rel='noreferrer'
                      className='flex bg-[#fff] text-[15px] text-[#55acee] transititext-primary transition duration-150 ease-in-out hover:text-opacity-70 hover:no-underline'
                      title='Share On twitter'
                    >
                      <div className='flex inline-flex'>
                        <div className='flex w-[20px] h-[20px]'>
                          <Twitter />
                        </div>
                        <div className='flex p-2 text-[#232323] font-HelveticaRoman text-[14px]'>
                          Twitter
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className='flex w-full lg:m-2 m-0 flex-col'>
          <div className='flex flex-col md:w-2/3 w-full '>
            <div className='breadcrumbs-color hidden md:inline-flex my-[48px] font-HelveticaRoman text-[12px] leading-tight font-light text-[#000]'>
              {PDP_LABELS[locale].home}{' '}
              {ProductSection && ProductSection.length > 0 && (
                <>
                  <HiOutlineChevronRight size={15} />{' '}
                  <span>{ProductSection[0]}</span>
                </>
              )}{' '}
              {ProductLocalCategory &&
                ProductSection &&
                ProductSection.length > 0 &&
                ProductLocalCategory.length > 0 && (
                  <>
                    <HiOutlineChevronRight size={15} />{' '}
                    <span>{ProductLocalCategory[0]}</span>
                  </>
                )}
            </div>
            <div className='font-helveticaLight text-[15px] text-[#232323] mb-[30px] mt-[30px] lg:mt-0 text-left'>
              {ProductNarrativeDescription}
            </div>
            {specPdfFile && (
              <div className='mb-[30px] cursor-pointer'>
                <LinkWithLabel
                  className='inline-flex'
                  label={PDP_LABELS[locale].specFileLabel}
                  url={specPdfFile}
                  icon={<FaRegFilePdf color='red' size={20} />}
                />
              </div>
            )}

            {ProductWebFeatures01 && (
              <>
                <hr />
                <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
                  {PDP_LABELS[locale].characteristics}
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
                </ul>
              </>
            )}
            {ProductWebInstallation01 && (
              <>
                <div className='text-[15px] font-helveticaGroup leading-tight font-semibold'>
                  {PDP_LABELS[locale].installation}
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
                </ul>
              </>
            )}
            {ProductWebMaterial01 && (
              <>
                <div className='text-[15px] font-helveticaGroup leading-tight font-semibold'>
                  {PDP_LABELS[locale].material}
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
                </ul>
              </>
            )}
            {ProductWebTechnology01 && (
              <>
                <div className='text-[15px] font-helveticaGroup leading-tight font-semibold'>
                  {PDP_LABELS[locale].technology}
                </div>
                <ul className='list-disc p-[10px]'>
                  {ProductWebTechnology01 && (
                    <li className='mb-[15px]'>{ProductWebTechnology01}</li>
                  )}
                  {ProductWebTechnology02 && (
                    <li className='mb-[15px]'>{ProductWebTechnology02}</li>
                  )}
                  {ProductWebTechnology03 && (
                    <li className='mb-[15px]'>{ProductWebTechnology03}</li>
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
                    {PDP_LABELS[locale].resources}
                  </div>
                  <div className='pb-[20px] font-helveticaLight text-[17px] uppercase leading-tight font-light'>
                    {PDP_LABELS[locale].cadTemplate}
                  </div>

                  <div className='flex flex-col'>
                    {cutOutDXF && (
                      <>
                        <p className='font-helveticaGroup font-semibold text-[14px]'>
                          {PDP_LABELS[locale].cutOutTemplates}
                        </p>
                        <ul className='inline-flex flex-wrap mb-2'>
                          <HiOutlineDownload size={20} />
                          <li>
                            <LinkWithLabel
                              url={cutOutDXF.ResourceFullWebURL}
                              label={'DXF'}
                              className='font-helveticaGroup font-light text-[14px] uppercase'
                            />
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    {bimRevit && (
                      <>
                        <ul className='inline-flex flex-wrap mb-2'>
                          <HiOutlineDownload size={20} />
                          <li>
                            <LinkWithLabel
                              url={bimRevit.ResourceFullWebURL}
                              label={PDP_LABELS[locale].bimRevit}
                              className='font-helveticaGroup font-light text-[14px] uppercase'
                            />
                          </li>
                        </ul>
                      </>
                    )}
                  </div>

                  <div className='flex md:justify-between md:flex-row flex-col'>
                    {(front2D.length > 0 ||
                      side2D.length > 0 ||
                      plan2D.length > 0) && (
                      <div className='flex'>
                        <div className='flex flex-col'>
                          <p className='font-helveticaGroup font-semibold text-[14px]'>
                            {PDP_LABELS[locale].cadFiles2D}
                          </p>
                          {plan2D.length > 0 && (
                            <>
                              <p>{PDP_LABELS[locale].plan}</p>
                              <ul className='inline-flex mb-1'>
                                <HiOutlineDownload size={20} />
                                {plan2D?.map((el, id) => (
                                  <li key={id}>
                                    <LinkWithLabel
                                      label={
                                        PRODUCT_PLAN_NAME_2D[el.ResourceType]
                                      }
                                      url={el.ResourceFullWebURL}
                                      className={`font-helveticaGroup font-light text-[14px] pr-2 uppercase ${
                                        id !== plan2D.length - 1 &&
                                        `border-r border-black`
                                      }`}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {front2D.length > 0 && (
                            <>
                              <p>{PDP_LABELS[locale].front}</p>
                              <ul className='inline-flex mb-1'>
                                <HiOutlineDownload size={20} />
                                {front2D?.map((el, id) => (
                                  <li key={id}>
                                    <LinkWithLabel
                                      label={
                                        PRODUCT_FRONT_NAME_2D[el.ResourceType]
                                      }
                                      url={el.ResourceFullWebURL}
                                      className={`font-helveticaGroup font-light text-[14px] pr-2 uppercase ${
                                        id !== front2D.length - 1 &&
                                        `border-r border-black`
                                      }`}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {side2D.length > 0 && (
                            <>
                              <p>{PDP_LABELS[locale].side}</p>
                              <ul className='inline-flex mb-1'>
                                <HiOutlineDownload size={20} />
                                {side2D?.map((el, id) => (
                                  <li key={id}>
                                    <LinkWithLabel
                                      url={el.ResourceFullWebURL}
                                      label={
                                        PRODUCT_SIDE_NAME_2D[el.ResourceType]
                                      }
                                      className={`font-helveticaGroup font-light text-[14px] pr-2 uppercase ${
                                        id !== side2D.length - 1 &&
                                        `border-r border-black`
                                      }`}
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
                            {PDP_LABELS[locale].cadFiles3D}
                          </p>
                          <ul className='inline-flex flex-wrap mb-1'>
                            <HiOutlineDownload size={20} />
                            {PlanView3D?.map((el, id) => (
                              <li key={id}>
                                <LinkWithLabel
                                  url={el.ResourceFullWebURL}
                                  label={PRODUCT_PLAN_NAME_3D[el.ResourceType]}
                                  className={`font-helveticaGroup font-light text-[14px] pr-2 uppercase ${
                                    id !== PlanView3D.length - 1 &&
                                    `border-r border-black`
                                  }`}
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
            <div className='flex flex-col'>
              {youtubeMetaData && youtubeMetaData.length > 0 && (
                <>
                  <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
                    Videos
                  </div>
                  <div className='flex flex-wrap lg:flex-nowrap md:flex-row flex-col pb-4'>
                    {youtubeMetaData?.map((item, id) => (
                      <>
                        {item?.metaData?.items.length > 0 && (
                          <div key={id} className='pr-4 md:w-1/3 w-full pb-4'>
                            <div className='relative'>
                              <img
                                src={
                                  item?.metaData?.items &&
                                  item?.metaData?.items[0]?.snippet?.thumbnails
                                    ?.standard?.url
                                }
                                onError={e =>
                                  (e.target.src = DEFAULT_IMAGE_LINK)
                                }
                                className='w-full'
                                alt='youtube thumbnail image'
                              />

                              <div
                                className='absolute top-[40%] right-[40%] h-[50px] w-[50px] bg-black opacity-40 border-2 rounded-full border-neutral-500 cursor-pointer'
                                onClick={() => setYoutubeLinkOpen(item)}
                              >
                                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#fff]'>
                                  <HiPlay size={30} />
                                </div>
                              </div>
                            </div>
                            <div className='font-helveticaLight text-[14px] font-bold text-[#232323] mb-1 leading-tight'>
                              {item?.metaData?.items &&
                                item?.metaData?.items[0]?.snippet?.title}
                            </div>
                            <div className='font-helveticaLight text-[12px] text-[#232323] mb-1 leading-tight truncate h-9'>
                              {item?.metaData?.items &&
                                item?.metaData?.items[0]?.snippet?.description}
                            </div>
                            {Object.keys(youtubeLinkOpen).length > 0 && (
                              <VideoModal
                                item={youtubeLinkOpen}
                                setYoutubeLinkOpen={e => setYoutubeLinkOpen(e)}
                              />
                            )}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
            <hr />
            <div>
              <p className='my-[30px] uppercase font-helveticaLight text-[20px]'>
                {PDP_LABELS[locale].supportService}
              </p>
            </div>
            <hr />
            <div className='mt-[20px]'>
              <p className='mb-[20px]'>{PDP_LABELS[locale].supportServiceQ}</p>
              <p className='mb-[5px] text-[#232323] font-helveticaGroup font-semibold text-[14px]'>
                {PDP_LABELS[locale].contactUs}
              </p>
              <p>
                <a
                  href={`${PDP_LABELS[locale].contactUsNumberLink}`}
                  className='font-bold text-[#000]'
                >
                  {PDP_LABELS[locale].contactUsNumber}
                </a>
              </p>
              <p>{PDP_LABELS[locale].contactUsTime} </p>
              <p>{PDP_LABELS[locale].contactUsDay}</p>
              <p>
                <a href='/contact-us-page' target='_blank'>
                  {PDP_LABELS[locale].emailUS}
                </a>
              </p>
              <ul className='mt-[10px] list-disc mb-[30px]'>
                <li>
                  <Link href={`/${PDP_LABELS[locale].careCleaningLink}`}>
                    <a target='_blank'>{PDP_LABELS[locale].careAndCleaning}</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/${PDP_LABELS[locale].warrantyLink}`}>
                    <a target='_blank'>{PDP_LABELS[locale].guarantee}</a>
                  </Link>
                </li>
              </ul>
            </div>
            <hr />
            <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
              {PDP_LABELS[locale].technicalInformation}
            </div>
            <div className='flex flex-col md:flex-row mb-[30px]'>
              <div className='flex flex-col'>
                <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                  {PDP_LABELS[locale].dimension}
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
                          icon={<FaRegFilePdf color='red' />}
                          url={element.ResourceFullWebURL}
                          label={
                            TECHNICAL_INFORMATION_FILES_NAMES[locale][
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
                {ProductBrandName && (
                  <>
                    <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                      {PDP_LABELS[locale].collection}
                    </div>
                    <div className='mb-[20px]'>{ProductBrandName}</div>
                  </>
                )}
                {ProductMaterial && (
                  <>
                    <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                      {PDP_LABELS[locale].material}
                    </div>
                    <div className='mb-[20px]'>{ProductMaterial}</div>
                  </>
                )}
                {ProductInstallationType &&
                  ProductInstallationType.length > 0 && (
                    <>
                      <div className='font-helveticaGroup text-[14px] leading-tight font-semibold mb-[10px]'>
                        {PDP_LABELS[locale].installation}
                      </div>
                      <div>{ProductInstallationType[0]}</div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='flex flex-col'>
          {ProductProductLinkType && ProductProductLinkType.length > 0 && (
            <>
              {hasLinkedprodcts && (
                <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
                  {PDP_LABELS[locale].paresWellWith}
                </div>
              )}
              <div className='flex flex-wrap lg:flex-nowrap flex-row'>
                <SimilarProductsCards
                  productProductLinkType={ProductProductLinkType?.slice(0, 4)}
                />
              </div>
            </>
          )}
        </div>
        {similarProducts && similarProducts.length > 0 && (
          <div className='flex flex-col'>
            <div className='mt-[20px] mb-[10px] font-helveticaLight text-[20px] uppercase leading-tight font-light'>
              {PDP_LABELS[locale].similarProducts}
            </div>
            <div className='flex flex-wrap lg:flex-nowrap flex-row'>
              <SimilarProducts
                productProductLinkType={similarProducts?.slice(0, 6)}
              />
            </div>
          </div>
        )}
      </section>
      <Cta fields={CTAObject[locale]} />
      <BackToTop topHeight={0} localeProp={locale} />
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
        ProductProductType: '',
        ProductMETADESCRIPTION: ''
      }
    }
  },
  skuID: ''
};
