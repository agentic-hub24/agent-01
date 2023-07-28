import { useState, useEffect } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useRouter } from 'next/router';
import Cta from '@components/Cta';
import PLPCards from '@components/ProductListing/PLPCards';
import {
  SHOWALL_LABELS,
  staticLabelsPLP,
  CTAObject
} from '@components/ProductListing/helper';
import BackToTop from '@components/backToTop';
import Loader from '@components/loader';

export default function ShowAllProducts({
  params,
  locale,
  categoryProductData
}) {
  const router = useRouter();
  const subSlug = router?.query?.subSlug?.replace(/\+/g, ' ');
  const categoryArr =
    categoryProductData?.response?.['@search.facets']
      ?.RegionProductCategoryLocal;

  const productCardData = categoryProductData?.response?.value;

  const [isHovering, setIsHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [skuId, setSkuId] = useState('');
  const [newPLPCards, setNewPLPCards] = useState([]);
  const [showCategoryList, setShowCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    filterProductByDefaultCategory();
    setTimeout(() => {
      const elem = subSlug
        ? document.getElementById(subSlug).offsetTop - 50
        : 0;
      window.scrollTo(0, elem);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filterProductByDefaultCategory = () => {
    const newArr = [];
    categoryArr?.filter(item1 => {
      return productCardData.some(item2 => {
        if (item2.RegionProductCategoryLocal === item1.value) {
          return newArr.push({
            RegionProductCategoryLocal: item1.value,
            cardItem: productCardData
              .filter(item3 => item3.RegionProductCategoryLocal === item1.value)
              .slice(0, 3)
          });
        }
      });
    });
    setNewPLPCards(newArr);
  };

  const handleMouseOver = id => {
    setSkuId(id);
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setSkuId('');
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setIsHovering(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const formatRedirectionUrl = urlName => {
    return `${params?.slug}/${urlName.replace(/ /g, '+')}`;
  };

  return (
    <>
      {isLoading && <Loader loading={isLoading} />}
      <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto px-[10px]'>
        <div className='pt-[50px] md:pb-[22px] mb-[8px] mx-[10px]'>
          <h2 className='font-helveticaLight text-3xl leading-normal font-normal uppercase'>
            {params?.slug}
          </h2>
        </div>
        <div className='border-b md:hidden'></div>
        <div className='flex flex-wrap md:flex-nowrap w-full flex-col md:flex-row'>
          <div className='flex flex-col md:w-1/4 md:mb-[38px] grow w-full'>
            <div className='md:hidden flex justify-center mb-[20px] bg-[fff] text-[#232323] border-2 my-[10px] rounded-md'>
              {/* TODO: Dynamic button label */}
              <button
                className='p-[20px] font-HelveticaRoman'
                onClick={() => setShowCategory(!showCategoryList)}
              >
                {SHOWALL_LABELS[locale].categoryButton}
              </button>
            </div>
            <div
              className={`${!showCategoryList ? `hidden` : `block`} md:block`}
            >
              <div className='flex mx-[10px]'>
                {/* TODO: dynamic label */}
                <h3 className='font-helveticaLight text-2xl leading-normal pb-[22px]'>
                  {SHOWALL_LABELS[locale].category}:
                </h3>
              </div>
              <div className='border-b-2 '></div>
              <ul className='mx-[10px]'>
                {categoryArr?.map((item, index) => (
                  <li className='py-[16px]' key={index}>
                    {/* TODO: href link */}
                    <a
                      href={formatRedirectionUrl(item.value)}
                      className='font-helveticaLight text-[15px] leading-tight font-light text-[#232323] hover:no-underline'
                    >
                      {item.value} ({item.count})
                    </a>
                  </li>
                ))}
              </ul>
              <div className='border-b-2 '></div>
            </div>
          </div>

          <div className='flex flex-col md:w-3/4 w-full md:mx-[10px] mb-[20px] pt-[12px] pb-[20px] grow'>
            {newPLPCards?.map((cardData, index) => (
              <div
                className='flex flex-col'
                key={index}
                id={cardData?.RegionProductCategoryLocal}
              >
                <a
                  href={formatRedirectionUrl(
                    cardData?.RegionProductCategoryLocal
                  )}
                  className='flex text-[#232323] hover:underline font-helveticaLight text-2xl leading-tight font-light py-[22px]'
                >
                  <span>{cardData?.RegionProductCategoryLocal} </span>
                  <span className='ml-[5px] mt-[3px]'>
                    <HiOutlineChevronRight size={25} />
                  </span>
                </a>
                <div className='flex flex-wrap'>
                  {cardData.cardItem && cardData.cardItem.length > 0 ? (
                    cardData.cardItem?.map((item, index) => {
                      return (
                        <PLPCards
                          handleMouseOut={e => handleMouseOut(e)}
                          handleMouseOver={e => handleMouseOver(e)}
                          isHovering={isHovering}
                          skuId={skuId}
                          item={item}
                          handleModalOpen={e => handleModalOpen(e)}
                          handleModalClose={e => handleModalClose(e)}
                          modalOpen={modalOpen}
                          key={index}
                        />
                      );
                    })
                  ) : (
                    <div>{staticLabelsPLP[locale].noProductFound}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta fields={CTAObject[locale]} />
      <BackToTop topHeight={0} localeProp={locale} />
    </>
  );
}
