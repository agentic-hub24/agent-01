import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductListing } from '@services/productListingAPI/client';
import PropTypes from 'prop-types';
import FilterContent from '@components/ProductListing/FilterContent';
import PLPCards from '@components/ProductListing/PLPCards';
import PLPOrderBySelect from '@components/ProductListing/PLPOrderBySelect';
import {
  selectOptions,
  staticLabelsPLP
} from '@components/ProductListing/helper';
import BackToTop from '@components/backToTop';
import Loader from '@components/loader';
import Pagination from './Pagination';
import SpecCard from './SpecCard';

export default function SearchPage({
  productListingData,
  requestBody,
  params,
  pageType,
  locale
}) {
  const {
    response: { value, searchResults }
  } = productListingData;
  const router = useRouter();
  const [productValueArray, setProductValueArray] = useState([]);

  const [skuId, setSkuId] = useState('');
  const [apiRequestBody, setApiRequestBody] = useState();
  const [selectedFilterCount, setSelectedFilterCount] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const [ListingData, setListingData] = useState(productListingData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setListingData(productListingData);
    setProductValueArray(value);
    setApiRequestBody(requestBody);
    pageType === 'spec' ? setActiveIndex(1) : setActiveIndex(0);
    setIsLoading(false);
  }, [value, requestBody]);

  const handleMouseOver = id => {
    setSkuId(id);
  };

  const handleMouseOut = () => {
    setSkuId('');
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
    setListingData(data);
    setIsLoading(false);
  };
  const onClickPageType = async index => {
    setActiveIndex(index);
    if (params?.slug) {
      setIsLoading(true);
      router.push(
        `/results/Category/${params?.slug}?type=${
          index === 1 ? `spec` : `producto`
        }&search=${requestBody?.search}${index === 1 ? `` : `&currentPage=1`}`,
        undefined,
        { shallow: true }
      );
      setIsLoading(false);
    } else {
      setIsLoading(true);
      router.push(
        `/results?type=${index === 1 ? `spec` : `producto`}&search=${
          requestBody?.search
        }${index === 1 ? `` : `&currentPage=1`}`,
        undefined,
        { shallow: true }
      );
      let postBody = {};
      if (index === 1) {
        setApiRequestBody({ ...apiRequestBody, CurrentPage: '' });
        postBody = { ...apiRequestBody, CurrentPage: '' };
      } else {
        setApiRequestBody({ ...apiRequestBody, CurrentPage: 1 });
        postBody = { ...apiRequestBody, CurrentPage: 1 };
      }
      const data = await getProductListing(postBody);

      setListingData(data);
      setProductValueArray(data?.response?.value);
      setIsLoading(false);
    }
  };

  const handlePageChange = async page => {
    setIsLoading(true);
    setApiRequestBody({ ...apiRequestBody, CurrentPage: 1 });
    let postBody = { ...apiRequestBody, CurrentPage: page };
    const data = await getProductListing(postBody);
    setListingData(data);
    setProductValueArray(data?.response?.value);
    router.push(
      `/results?${pageType && `type=${pageType}&`}search=${
        requestBody?.search
      }${pageType === `spec` ? `` : `&currentPage=${page}`}`,
      undefined,
      { shallow: true }
    );
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader loading={isLoading} />}
      <div className='text-center bg-gray-200'>
        <div className='pt-[100px] pb-[0px] text-black'>
          <h1 className='font-sans font-light text-5xl leading-1'>
            {staticLabelsPLP[router.locale].searchForLabel}{' '}
            <span className='font-bold capitalize'>{requestBody?.search}</span>
          </h1>
          <p className='my-5 font-sans font-bold text-xl leading-none'>
            {ListingData?.response?.searchResults?.totalSearchResults}
            &nbsp;{staticLabelsPLP[router.locale].totalProductLabel}
          </p>
          <div className='relative mb-20 hidden lg:block'>
            <ul className='block list-none mx-auto py-30 pb-40 text-center shadow-none border-none bg-transparent'>
              <li
                className={`inline-block mx-30 rounded-4 lg:mr-[100px] ${
                  activeIndex === 0 ? 'text-white bg-black' : 'bg-transparent'
                }`}
                onClick={() => onClickPageType(0)}
              >
                <span className='m-0 outline-none inline-block py-[8px] px-[22px] border-0 rounded-4 uppercase no-underline text-center font-HelveticaMedium font-semibold text-1.4em font-normal leading-1 shadow-none cursor-pointer bg-transparent'>
                  {staticLabelsPLP[router.locale].product}{' '}
                  <span>
                    ({ListingData?.response?.searchResults?.productsCount})
                  </span>
                </span>
              </li>
              <li
                className={`inline-block mx-30 rounded-4 border ${
                  activeIndex === 1 ? 'text-white bg-black' : 'bg-transparent'
                }`}
                onClick={() => onClickPageType(1)}
              >
                <span className='m-0 outline-none inline-block py-[8px] px-[22px] border-0 rounded-4 uppercase no-underline text-center font-HelveticaMedium font-semibold text-1.4em font-normal leading-1 shadow-none cursor-pointer bg-transparent'>
                  {staticLabelsPLP[router.locale].spec}{' '}
                  <span>
                    ({ListingData?.response?.searchResults?.specificationCount})
                  </span>
                </span>
              </li>
            </ul>
          </div>
          {/* select for lower screen */}
          <div className='relative mb-20 block lg:hidden'>
            <select
              className='w-[95%] p-2 mb-3'
              onChange={e => onClickPageType(+e.target.value)} // "+" string to number conversion
            >
              <option value={0} style={{ display: 'none' }}>
                {staticLabelsPLP[router.locale].selectCategoryLabel}
              </option>
              <option value={0}>
                <span className='m-0 outline-none inline-block py-[8px] px-[22px] border-0 rounded-4 uppercase no-underline text-center font-HelveticaMedium font-semibold text-1.4em font-normal leading-1 shadow-none cursor-pointer bg-transparent'>
                  {staticLabelsPLP[router.locale].product}{' '}
                  <span>
                    ({ListingData?.response?.searchResults?.productsCount})
                  </span>
                </span>
              </option>
              <option value={1}>
                <span className='m-0 outline-none inline-block py-[8px] px-[22px] border-0 rounded-4 uppercase no-underline text-center font-HelveticaMedium font-semibold text-1.4em font-normal leading-1 shadow-none cursor-pointer bg-transparent'>
                  {staticLabelsPLP[router.locale].spec}{' '}
                  <span>
                    ({ListingData?.response?.searchResults?.specificationCount})
                  </span>
                </span>
              </option>
            </select>
          </div>
        </div>
      </div>
      {activeIndex === 1 ? (
        <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto'>
          <div className='flex justify-between flex-wrap md:flex-nowrap'>
            <div className=' flex flex-col pt-[50px] pb-[22px] m-[10px] border-b-2 md:border-b-0 w-full'></div>
            <PLPOrderBySelect
              sortingArray={selectOptions[router.locale]}
              orderBySelect={e => orderBySelect(e)}
            />
          </div>
          <div className='flex flex-wrap md:flex-nowrap w-full flex-col md:flex-row'>
            <FilterContent
              filterOptions={ListingData?.response?.['@search.facets']}
              showAll={true}
              pageType={'spec'}
              searchValue={requestBody?.search}
              slug={params?.slug}
              selectedFilter={apiRequestBody}
              locale={router.locale}
              totalProductCount={ListingData?.response?.['@odata.count']}
              setSelectedFilterCount={setSelectedFilterCount}
            />
            {searchResults?.specificationCount > 0 ? (
              <div className='float-right lg:mx-10 md:mx-10 my-0 py-10px pb-[20px] w-full md:w-2/3 lg:w-2/3'>
                <SpecCard
                  skuId={skuId}
                  productValueArray={productValueArray}
                  locale={locale}
                />
              </div>
            ) : (
              <div className='lg:mx-10 md:mx-10 my-0 py-10px'>
                {staticLabelsPLP[router.locale].noProductFound}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto'>
            <div className='flex justify-between flex-wrap md:flex-nowrap'>
              <div className=' flex flex-col pt-[50px] pb-[22px] m-[10px] border-b-2 md:border-b-0 w-full'></div>

              <PLPOrderBySelect
                sortingArray={selectOptions[router.locale]}
                orderBySelect={e => orderBySelect(e)}
              />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full flex-col md:flex-row'>
              <FilterContent
                filterOptions={ListingData?.response?.['@search.facets']}
                filterSelect={filterSelect}
                selectedFilter={apiRequestBody}
                selectedFilterCount={selectedFilterCount}
                pageType={'producto'}
                searchValue={requestBody?.search}
                currentPageValue={1}
                slug={params?.slug}
                locale={router.locale}
                totalProductCount={ListingData?.response?.['@odata.count']}
                setSelectedFilterCount={setSelectedFilterCount}
              />
              {/* cards div */}
              <div className='flex md:ml-[30px] mb-[20px] pt-[12px] pb-[20px] md:w-3/4 flex-wrap'>
                {/* Repeater div 1 */}
                {productValueArray && productValueArray.length > 0 ? (
                  productValueArray?.map((item, index) => {
                    return (
                      <PLPCards
                        handleMouseOut={() => handleMouseOut()}
                        handleMouseOver={e => handleMouseOver(e)}
                        skuId={skuId}
                        item={item}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <div>{staticLabelsPLP[router.locale].noProductFound}</div>
                )}
              </div>
            </div>
          </section>
          <Pagination
            currentPage={ListingData?.response?.paginationData?.CurrentPage}
            totalPages={
              ListingData?.response?.paginationData?.totalNumberOfPages
            }
            onPageChange={handlePageChange}
          />
        </>
      )}
      <BackToTop topHeight={0} localeProp={router.locale} />
    </>
  );
}

SearchPage.propTypes = {
  productListingData: PropTypes.shape({
    response: PropTypes.shape({
      value: PropTypes.array,
      searchResults: PropTypes.shape({
        totalSearchResults: PropTypes.number,
        productsCount: PropTypes.number,
        specificationCount: PropTypes.number
      })
    })
  }),
  requestBody: PropTypes.object,
  params: PropTypes.shape({
    slug: PropTypes.string
  }),
  pageType: PropTypes.string,
  locale: PropTypes.string
};
