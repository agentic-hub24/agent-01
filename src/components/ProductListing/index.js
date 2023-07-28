import { useState, useEffect } from 'react';
import { getProductListing } from '@services/productListingAPI/client';
import Cta from '@components/Cta';
import BackToTop from '@components/backToTop';
import Loader from '@components/loader';
import FilterContent from './FilterContent';
import PLPCards from './PLPCards';
import PLPHeader from './PLPHeader';
import PLPOrderBySelect from './PLPOrderBySelect';
import {
  CTAObject,
  selectOptions,
  formatterHeader,
  staticLabelsPLP
} from './helper';

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
  const [selectedFilterCount, setSelectedFilterCount] = useState();
  const [totalProductCount, setTotalProductCount] = useState('');
  const [totalFilterType, setTotalFilterType] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setApiRequestBody(requestBody);
    setProductValueArray(value);
    setTotalProductCount(productListingData?.response?.['@odata.count']);
    setTotalFilterType(productListingData?.response?.['@search.facets']);
    setIsLoading(false);
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
    setIsLoading(true);
    const postBody = { ...apiRequestBody, orderby: e.target.value };
    const data = await getProductListing(postBody);
    setProductValueArray(data?.response?.value);
    setIsLoading(false);
  };

  const filterSelect = async (filterRequest, filterCount) => {
    setIsLoading(true);
    setSelectedFilterCount({ ...selectedFilterCount, ...filterCount });
    setApiRequestBody({ ...apiRequestBody, ...filterRequest });
    const postBody = { ...apiRequestBody, ...filterRequest };

    const data = await getProductListing(postBody);

    setProductValueArray(data?.response?.value);
    setTotalProductCount(data?.response?.['@odata.count']);
    setTotalFilterType(data?.response?.['@search.facets']);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loader loading={isLoading} />}
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
            filterOptions={totalFilterType}
            slug={slug}
            subSlug={sub_slug}
            filterSelect={filterSelect}
            selectedFilter={apiRequestBody}
            selectedFilterCount={selectedFilterCount}
            locale={locale}
            totalProductCount={totalProductCount}
          />
          {/* cards div */}
          <div className='flex md:ml-[30px] mb-[20px] mt-[20px] pb-[20px] md:w-3/4 flex-wrap'>
            {/* Repeater div 1 */}
            {productValueArray && productValueArray.length > 0 ? (
              productValueArray?.map((item, index) => {
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
