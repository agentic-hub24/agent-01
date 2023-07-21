import { useState, useEffect } from 'react';
import { getProductListing } from '@services/productListingAPI/client';
import Cta from '@components/Cta';
import BackToTop from '@components/backToTop';
import FilterContent from './FilterContent';
import PLPCards from './PLPCards';
import PLPHeader from './PLPHeader';
import PLPOrderBySelect from './PLPOrderBySelect';
import { CTAObject, selectOptions, formatterHeader } from './helper';

export default function ProductListing({
  productListingData,
  requestBody,
  params: { slug, sub_slug },
  locale
}) {
  const {
    response: { value }
  } = productListingData;

  const [productValueArray, setProductValueArray] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [skuId, setSkuId] = useState('');
  const [apiRequestBody, setApiRequestBody] = useState(requestBody);
  const [selectedFilterCount, setSelectedFilterCount] = useState({});

  useEffect(() => {
    setApiRequestBody(requestBody);
    setProductValueArray(value);
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
      <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto'>
        <div className='flex justify-between flex-wrap md:flex-nowrap'>
          <PLPHeader
            productCount={productListingData?.response?.['@odata.count']}
            pageHeading={formatterHeader(sub_slug)}
          />
          {/* order by select -- start ==> TODO: Select option from CTFL */}
          <PLPOrderBySelect
            orderBySelect={e => orderBySelect(e)}
            sortingArray={selectOptions[locale]}
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
            locale={locale}
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
              slug={slug}
              sub_slug={sub_slug}
            />
          </div>
        </div>
      </section>
      <Cta fields={CTAObject[locale]} />
      <BackToTop topHeight={0} localeProp={locale} />
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
