import { useState, useEffect } from 'react';
import { getProductListing } from '@services/productListingAPI/client';
import CarouselComponent from '@components/Carousel';
import Cta from '@components/Cta';
import BackToTop from '@components/backToTop';
import FilterContent from './FilterContent';
import PLPCards from './PLPCards';
import PLPHeader from './PLPHeader';
import PLPOrderBySelect from './PLPOrderBySelect';
import { CTAObject } from './helper';

export default function ProductListing({
  productListingData,
  requestBody,
  params: { slug, sub_slug },
  // addProductForCompare,
  // removeFromCompare,
  pageData
}) {
  const {
    response: { value }
  } = productListingData;

  const carouselItem =
    pageData &&
    pageData?.pageSections &&
    pageData?.pageSections[0]?.fields?.carouselItem;

  const labelMappingArr = pageData?.labelMappingSections?.filter(
    item => item?.fields?.DropdownItems === undefined
  );

  const sortingArray = pageData?.labelMappingSections?.filter(
    item => item?.fields?.DropdownItems !== undefined
  );

  const [productValueArray, setProductValueArray] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [skuId, setSkuId] = useState('');
  const [apiRequestBody, setApiRequestBody] = useState(requestBody);
  const [selectedFilterCount, setSelectedFilterCount] = useState();
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setApiRequestBody(requestBody);
    setProductValueArray(value);
    setInnerWidth(window.innerWidth);
  }, [value, requestBody]);

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

  const orderBySelect = async e => {
    const postBody = { ...apiRequestBody, orderby: e.target.value };
    const data = await getProductListing(postBody);
    setProductValueArray(data?.response?.value);
  };

  const filterSelect = async (filterRequest, filterCount) => {
    setSelectedFilterCount({ ...selectedFilterCount, ...filterCount });
    setApiRequestBody({ ...apiRequestBody, ...filterRequest });
    const postBody = { ...apiRequestBody, ...filterRequest };

    const data = await getProductListing(postBody);

    setProductValueArray(data?.response?.value);
  };
  return (
    <>
      {pageData && pageData?.pageSections && (
        <CarouselComponent
          carouselItem={pageData?.pageSections[0]?.fields?.carouselItem}
        />
      )}
      <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto'>
        <div className='flex justify-between flex-wrap md:flex-nowrap'>
          <PLPHeader
            productCount={productValueArray?.length}
            pageHeading={pageData.pageHeading}
          />
          {/* order by select -- start ==> TODO: Select option from CTFL */}
          <PLPOrderBySelect
            orderBySelect={e => orderBySelect(e)}
            sortingArray={sortingArray}
          />
          {/* order by select -- end  */}
        </div>
        <div className='flex flex-wrap md:flex-nowrap w-full flex-col md:flex-row'>
          <FilterContent
            filterOptions={productListingData}
            slug={slug}
            subSlug={sub_slug}
            filterSelect={filterSelect}
            selectedFilter={apiRequestBody}
            selectedFilterCount={selectedFilterCount}
            labelMappingSections={labelMappingArr}
          />
          {/* cards div */}
          <div className='flex md:ml-[30px] mb-[20px] mt-[20px] pb-[20px] md:w-3/4 flex-wrap'>
            {/* Repeater div 1 */}
            <PLPCards
              handleMouseOut={e => handleMouseOut(e)}
              handleMouseOver={e => handleMouseOver(e)}
              isHovering={isHovering}
              skuId={skuId}
              productValueArray={productValueArray}
              handleModalOpen={e => handleModalOpen(e)}
              handleModalClose={e => handleModalClose(e)}
              modalOpen={modalOpen}
              // addProductForCompare={addProductForCompare}
              // removeFromCompare={removeFromCompare}
              slug={slug}
              sub_slug={sub_slug}
            />
          </div>
        </div>
      </section>
      <Cta fields={CTAObject} />

      <BackToTop
        topHeight={
          innerWidth < 768 ? 200 : carouselItem === undefined ? 0 : 400
        }
      />
    </>
  );
}
ProductListing.defaultProps = {
  productListingData: {
    response: {
      value: [],
      '@search.facets': {},
      '@odata.count': ''
    }
  },
  requestBody: {},
  params: {
    slug: '',
    sub_slug: ''
  },
  pageData: {}
};
