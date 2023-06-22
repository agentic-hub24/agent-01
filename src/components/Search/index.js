import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductListing } from '@services/productListingAPI/client';
import Cta from '@components/Cta';
import FilterContent from '@components/ProductListing/FilterContent';
import PLPCards from '@components/ProductListing/PLPCards';
import PLPOrderBySelect from '@components/ProductListing/PLPOrderBySelect';
import { selectOptions, CTAObject } from '@components/ProductListing/helper';
import Pagination from './Pagination';
import SpecCard from './SpecCard';

export default function SearchPage({
  productListingData,
  requestBody,
  params,
  pageType,
  pageData
}) {
  const {
    response: { value, searchResults, paginationData }
  } = productListingData;
  const router = useRouter();
  const [productValueArray, setProductValueArray] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [skuId, setSkuId] = useState('');
  const [apiRequestBody, setApiRequestBody] = useState();
  const [selectedFilterCount, setSelectedFilterCount] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const [ListingData, setListingData] = useState(productListingData);
  const labelMappingArr = pageData?.labelMappingSections?.filter(
    item => item?.fields?.DropdownItems === undefined
  );

  const sortingArray = pageData?.labelMappingSections?.filter(
    item => item?.fields?.DropdownItems !== undefined
  );

  useEffect(() => {
    setListingData(productListingData);
    setProductValueArray(value);
    setApiRequestBody(requestBody);
    pageType === 'spec' ? setActiveIndex(1) : setActiveIndex(0);
  }, [value, requestBody]);

  const handleMouseOver = id => {
    setSkuId(id);
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setSkuId('');
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
    console.log(postBody);
    const data = await getProductListing(postBody);
    console.log(data, 'response');
    setProductValueArray(data?.response?.value);
    setListingData(data);
  };
  const onClickPageType = async index => {
    if (params?.slug) {
      router.push(
        `/results?type=${index === 1 ? `spec` : `producto`}&search=${
          requestBody?.search
        }${index === 1 ? `` : `&currentPage=1`}`
      );
    } else {
      setActiveIndex(index);
      let postBody = {};
      if (index === 1) {
        setApiRequestBody({ ...apiRequestBody, CurrentPage: '' });
        postBody = { ...apiRequestBody, CurrentPage: '' };
      } else {
        setApiRequestBody({ ...apiRequestBody, CurrentPage: 1 });
        postBody = { ...apiRequestBody, CurrentPage: 1 };
      }

      console.log('post body ', postBody)

      const data = await getProductListing(postBody);

      setListingData(data);
      setProductValueArray(data?.response?.value);
    }
  };
  const handlePageChange = async page => {
    router.push(
      `/results?${pageType && `type=${pageType}&`}search=${
        requestBody?.search
      }${pageType === `spec` ? `` : `&currentPage=${page}`}`
    );
  };

  return (
    <>
      <div className='text-center bg-gray-200'>
        <div className='pt-[100px] pb-[0px] text-black'>
          <h1 className='font-sans font-light text-5xl leading-1'>
            Buscar resultados para &quot;{requestBody?.search}&quot;
          </h1>
          <p className='my-5 font-sans font-bold text-xl leading-none'>
            {searchResults?.totalSearchResults}
            &nbsp;Procurar resultados
          </p>
          <div className='relative mb-20'>
            <ul className='block list-none mx-auto py-30 pb-40 text-center shadow-none border-none bg-transparent'>
              <li
                className={`inline-block mx-30 rounded-4 mr-[100px] ${
                  activeIndex === 0 ? 'text-white bg-black' : 'bg-transparent'
                }`}
                onClick={() => onClickPageType(0)}
              >
                <span className='m-0 outline-none inline-block py-[8px] px-[22px] border-0 rounded-4 uppercase no-underline text-center font-HelveticaMedium text-1.4em font-normal leading-1 shadow-none cursor-pointer bg-transparent'>
                  Produto
                  <span>({searchResults?.productsCount})</span>
                </span>
              </li>
              <li
                className={`inline-block mx-30 rounded-4 border ${
                  activeIndex === 1 ? 'text-white bg-black' : 'bg-transparent'
                }`}
                onClick={() => onClickPageType(1)}
              >
                <span className='m-0 outline-none inline-block py-[8px] px-[22px] border-0 rounded-4 uppercase no-underline text-center font-HelveticaMedium text-1.4em font-normal leading-1 shadow-none cursor-pointer bg-transparent'>
                  Spec
                  <span>({searchResults?.specificationCount})</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {activeIndex === 1 ? (
        <>
          {' '}
          <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto'>
            <div className='flex justify-between flex-wrap md:flex-nowrap'>
              <div className=' flex flex-col pt-[50px] pb-[22px] m-[10px] border-b-2 md:border-b-0 w-full'></div>
              <PLPOrderBySelect
                sortingArray={sortingArray}
                orderBySelect={e => orderBySelect(e)}
              />
            </div>
            <div className='flex flex-wrap md:flex-nowrap w-full flex-col md:flex-row'>
              <FilterContent
                filterOptions={ListingData}
                showAll={true}
                pageType={'spec'}
                searchValue={requestBody?.search}
                slug={params?.slug}
                selectedFilter={apiRequestBody}
                labelMappingSections={labelMappingArr}
              />
              <div className='float-right lg:mx-10 md:mx-10 my-0 py-10px pb-20px w-full md:w-2/3 lg:w-2/3'>
                <SpecCard skuId={skuId} productValueArray={productValueArray} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className='max-w-screen-lg mx-auto bg-white text-[#232323] overflow-auto'>
            <div className='flex justify-between flex-wrap md:flex-nowrap'>
              <div className=' flex flex-col pt-[50px] pb-[22px] m-[10px] border-b-2 md:border-b-0 w-full'></div>

              <PLPOrderBySelect
                sortingArray={sortingArray}
                orderBySelect={e => orderBySelect(e)}
              />
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full flex-col md:flex-row'>
              <FilterContent
                filterOptions={ListingData}
                filterSelect={filterSelect}
                selectedFilter={apiRequestBody}
                selectedFilterCount={selectedFilterCount}
                pageType={'producto'}
                searchValue={requestBody?.search}
                currentPageValue={1}
                slug={params?.slug}
                labelMappingSections={labelMappingArr}
              />
              {/* cards div */}
              <div className='flex md:ml-[30px] mb-[20px] pt-[12px] pb-[20px] md:w-3/4 flex-wrap'>
                {/* Repeater div 1 */}
                <PLPCards
                  handleMouseOut={e => handleMouseOut(e)}
                  handleMouseOver={e => handleMouseOver(e)}
                  isHovering={isHovering}
                  skuId={skuId}
                  showAll={true}
                  productValueArray={productValueArray}
                />
              </div>
            </div>
          </section>
          <Pagination
            currentPage={paginationData?.CurrentPage}
            totalPages={paginationData?.totalNumberOfPages}
            onPageChange={handlePageChange}
            // itemsPerPage={paginationData?.countPerEachPage}
          />
        </>
      )}
      <Cta fields={CTAObject} />
    </>
  );
}
