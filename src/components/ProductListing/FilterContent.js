import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import FilterAccordion from './FilterAccordion';
import FilterItems from './FilterItems';
import {
  staticLabelsPLP,
  filterMapping,
  filterValueMap,
  formatRedirectionUrl
} from './helper';

const specRegional = 'SpecRegionProductCategoryLocal';
const regional = 'RegionProductCategoryLocal';

const ResultLinkButton = ({
  pageType,
  selectedFilter,
  totalProductCount,
  locale,
  subSlug,
  slug
}) => (
  <Link
    href={{
      pathname: pageType
        ? `/results?type=${pageType}&search=${selectedFilter?.search}${
            pageType === `spec` ? `` : `&currentPage=1`
          }`
        : `/browse/${slug}`,
      query: {
        search: selectedFilter?.search,
        CurrentPage: pageType === `spec` ? `` : 1,
        lang: locale,
        subSlug: subSlug
      }
    }}
    as={
      pageType
        ? `/results?type=${pageType}&search=${selectedFilter?.search}${
            pageType === `spec` ? `` : `&currentPage=1`
          }`
        : `/browse/${slug}`
    }
  >
    <button className='m-0 mb-[10px] outline-none bg-gray-300 text-gray-800 inline-block border-0 rounded-md relative text-left w-full pb-[10px]'>
      <span className='block float-left text-base leading-normal font-normal shadow-none font-helvaticaFont mr-[10px] mt-[10px] ml-[10px] '>
        {selectedFilter?.['RegionProductCategoryLocal']}
      </span>
      <span className='float-left  mr-[10px] mt-[10px]  text-base leading-normal font-normal text-gray-600'>
        ({totalProductCount})
      </span>
      <span className='absolute mt-[10px] right-2 text-gray-400 font-normal text-base'>
        x
      </span>
    </button>
  </Link>
);

const CategoryListDesktop = ({
  categoryArr,
  pageType,
  searchValue,
  currentPageValue
}) => (
  <ul className='m-0 mb-[10px] outline-none relative text-left w-full'>
    {categoryArr?.map((item, index) => (
      <li className='py-[16px] cursor-pointer' key={item.value || index}>
        <a
          href={formatRedirectionUrl(
            item.value,
            pageType,
            searchValue,
            currentPageValue
          )}
          className='font-helveticaLight text-[15px] leading-tight font-light text-[#232323] hover:no-underline'
        >
          {item.value} ({item.count})
        </a>
      </li>
    ))}
  </ul>
);

export default function FilterContent({
  filterOptions,
  slug,
  subSlug,
  filterSelect,
  selectedFilter,
  selectedFilterCount,
  showAll,
  pageType,
  searchValue,
  currentPageValue,
  locale,
  totalProductCount,
  setSelectedFilterCount
}) {
  const categoryType = pageType === 'spec' ? specRegional : regional;
  const categoryArr = filterOptions?.[categoryType];
  const searchFacetsNode = filterOptions;

  const filterkeys = Object.keys(searchFacetsNode).filter(el =>
    searchValue
      ? ![
          'RegionProductCategoryLocal',
          'SpecRegionProductCategoryLocal'
        ].includes(el)
      : filterValueMap[locale][
          selectedFilter?.['RegionProductCategoryLocal']
        ]?.includes(el)
  );

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState();

  useEffect(() => {
    // setSelectedFilterCount
    const arr = filterkeys
      .map(item => ({
        [item]: filterOptions[item]?.[0]?.count
      }))
      .reduce((result, currentObject) => {
        return Object.assign(result, currentObject);
      }, {});

    setSelectedFilterCount({ ...arr });
  }, [filterOptions]);

  useEffect(() => {
    setIsMobileFilterOpen(false);
  }, [selectedFilter]);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const getResultLink = () => {
    if (pageType) {
      const resultPath = `/results?type=${pageType}&search=${
        selectedFilter?.search
      }${pageType === 'spec' ? '' : '&currentPage=1'}`;
      return {
        pathname: resultPath,
        query: {
          search: selectedFilter?.search,
          currentPage: pageType === 'spec' ? '' : 1,
          lang: locale,
          subSlug: subSlug
        }
      };
    } else {
      return { pathname: `/browse/${slug}/${subSlug}` };
    }
  };

  const linkProps = getResultLink();

  const generateLinkProps = () => {
    const baseLink = pageType
      ? `/results?type=${pageType}&search=${selectedFilter?.search}${
          pageType === 'spec' ? '' : '&currentPage=1'
        }`
      : `/browse/${slug}`;

    const linkProps = {
      pathname: baseLink,
      query: {
        search: selectedFilter?.search,
        currentPage: pageType === 'spec' ? '' : '1',
        lang: locale,
        subSlug: subSlug
      }
    };

    return linkProps;
  };

  const linkPropsShowAll = generateLinkProps();

  return (
    <>
      <div className='flex flex-col pl-[10px] w-1/4 mb-[38px] hidden md:block'>
        <div className='relative mb-8 border-b-2 border-gray-300'>
          <div className='flex justify-between pb-[22px] mt-[14px] mb-[22px]  border-b-2'>
            <div className='flex'>
              <h3 className='font-helveticaLight leading-tight text-xl font-normal'>
                {staticLabelsPLP[locale].category}
              </h3>
            </div>
            <div className='flex mt-[5px]'>
              <Link
                href={linkPropsShowAll}
                as={linkPropsShowAll.pathname}
                className='font-helveticaLight leading-relaxed text-[14px] font-normal'
              >
                {staticLabelsPLP[locale].showAll}
              </Link>
            </div>
          </div>
          {slug ? (
            <ResultLinkButton
              pageType={pageType}
              selectedFilter={selectedFilter}
              totalProductCount={totalProductCount}
              locale={locale}
              subSlug={subSlug}
              slug={slug}
            />
          ) : (
            <CategoryListDesktop
              categoryArr={categoryArr}
              pageType={pageType}
              searchValue={searchValue}
              currentPageValue={currentPageValue}
            />
          )}
        </div>
        {!showAll && (
          <>
            <div className='flex justify-between pb-[22px] mt-[14px] mb-[22px] border-b-2'>
              <div className='flex'>
                <h3 className='font-helveticaLight leading-tight text-xl font-normal'>
                  {staticLabelsPLP[locale].filterby}
                </h3>
              </div>
              <div className='flex mt-[5px]'>
                <Link href={linkProps} as={linkProps.pathname}>
                  {staticLabelsPLP[locale].clearAll}
                </Link>
              </div>
            </div>

            {filterkeys.map(option => {
              const filterType = filterMapping?.[0]?.[locale]?.[option]?.type;

              let minValue = 0;
              let maxValue = 0;

              if (filterType === 'range') {
                const values = searchFacetsNode?.[option].map(
                  item => item.value
                );
                minValue = Math.min(...values);
                maxValue = Math.max(...values);
                // Calculate the min and max values based on the filterOption
              }

              return (
                searchFacetsNode?.[option]?.length > 0 && (
                  <FilterAccordion
                    header={filterMapping?.[0]?.[locale]?.[option]?.label}
                    key={filterMapping?.[0]?.[locale]?.[option]?.label}
                  >
                    <FilterItems
                      filterOption={searchFacetsNode?.[option]}
                      filterType={filterMapping?.[0]?.[locale]?.[option]?.type}
                      filterName={option}
                      minRange={minValue}
                      maxRange={maxValue}
                      filterSelect={filterSelect}
                      selectedFilter={selectedFilter}
                      selectedFilterCount={selectedFilterCount}
                    />
                  </FilterAccordion>
                )
              );
            })}
          </>
        )}
      </div>
      <div className='block appearance-none w-full py-[10px] px-[10px] pr-[10px] rounded leading-normal focus:outline-none focus:bg-white focus:border-gray-500 md:hidden'>
        {/* Mobile filter toggle button */}
        <button
          className='m-0 mb-[20px] outline-none bg-white text-[#232323] inline-block border border-solid border-gray-300 rounded-md font-HelveticaRoman text-lg font-normal text-center w-full py-5 px-8 cursor-pointer '
          onClick={toggleMobileFilter}
        >
          <span>{staticLabelsPLP[locale].buttonMDLabel}</span>
        </button>

        {/* Mobile filter content */}
        {isMobileFilterOpen && (
          <div className='bg-white p-[4x] md:hidden'>
            <div className='flex justify-between pb-[22px] mt-[14px] mb-[22px] border-b-2'>
              <div className='flex'>
                <h3 className='font-helveticaLight leading-tight text-xl font-normal'>
                  {staticLabelsPLP[locale].category}
                </h3>
              </div>
              <div className='flex mt-[5px]'>
                <Link
                  href={linkPropsShowAll}
                  as={linkPropsShowAll.pathname}
                  className='font-helveticaLight leading-relaxed text-[14px] font-normal'
                >
                  {staticLabelsPLP[locale].showAll}
                </Link>
              </div>
            </div>
            <div className='mb-[5px] pr-[30px] border-b-2'>
              {slug ? (
                <ResultLinkButton
                  pageType={pageType}
                  selectedFilter={selectedFilter}
                  totalProductCount={totalProductCount}
                  locale={locale}
                  subSlug={subSlug}
                />
              ) : (
                <CategoryListDesktop
                  categoryArr={categoryArr}
                  pageType={pageType}
                  searchValue={searchValue}
                  currentPageValue={currentPageValue}
                />
              )}
            </div>
            <div className='flex justify-between pb-[22px] mt-[14px] mb-[22px] border-b-2'>
              <div className='flex'>
                <h3 className='font-helveticaLight leading-tight text-xl font-normal'>
                  {staticLabelsPLP[locale].filterby}
                </h3>
              </div>
              <div className='flex mt-[5px]'>
                <Link href={linkProps} as={linkProps.pathname}>
                  {staticLabelsPLP[locale].clearAll}
                </Link>
              </div>
            </div>

            {filterkeys.map(option => {
              const filterType = filterMapping?.[0]?.[locale]?.[option]?.type;

              let minValue = 0;
              let maxValue = 0;

              if (filterType === 'range') {
                const values = searchFacetsNode?.[option].map(
                  item => item.value
                );
                minValue = Math.min(...values);
                maxValue = Math.max(...values);
                // Calculate the min and max values based on the filterOption
              }

              return searchFacetsNode?.[option]?.length > 0 ? (
                <FilterAccordion
                  header={filterMapping?.[0]?.[locale]?.[option]?.label}
                  subSlug={subSlug}
                  key={filterMapping?.[0]?.[locale]?.[option]?.label}
                >
                  <FilterItems
                    filterOption={searchFacetsNode?.[option]}
                    filterType={filterMapping?.[0]?.[locale]?.[option]?.type}
                    filterName={option}
                    minRange={minValue}
                    maxRange={maxValue}
                    filterSelect={filterSelect}
                    selectedFilter={selectedFilter}
                    selectedFilterCount={selectedFilterCount}
                  />
                </FilterAccordion>
              ) : (
                <></>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

FilterContent.propTypes = {
  filterOptions: PropTypes.shape({
    RegionProductCategoryLocal: PropTypes.array,
    SpecRegionProductCategoryLocal: PropTypes.array
  }),
  slug: PropTypes.string,
  subSlug: PropTypes.string,
  filterSelect: PropTypes.func,
  selectedFilter: PropTypes.shape({
    search: PropTypes.string,
    RegionProductCategoryLocal: PropTypes.string
  }),
  selectedFilterCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  showAll: PropTypes.bool,
  pageType: PropTypes.string,
  searchValue: PropTypes.string,
  currentPageValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  totalProductCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedFilterCount: PropTypes.func
};

ResultLinkButton.propTypes = {
  pageType: PropTypes.string,
  selectedFilter: PropTypes.array,
  locale: PropTypes.string,
  slug: PropTypes.string,
  subSlug: PropTypes.string,
  totalProductCount: PropTypes.string
};

CategoryListDesktop.propTypes = {
  categoryArr: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })),
  pageType: PropTypes.string,
  searchValue: PropTypes.string,
  currentPageValue: PropTypes.string
};

FilterContent.defaultProps = {
  filterOptions: {
    response: {
      '@search.facets': ''
    }
  },
  slug: '',
  subSlug: '',
  filterSelect: () => {},
  selectedFilter: {},
  selectedFilterCount: ''
};
