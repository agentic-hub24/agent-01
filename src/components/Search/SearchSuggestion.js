import Link from 'next/link';
import PropTypes from 'prop-types';
import { commonSectionSearch } from '@components/CommonSection';
import { staticLabelsPLP } from '@components/ProductListing/helper';

const SearchSuggestion = ({ requestBody, suggestion, locale = 'en' }) => {
  const isEnglish = locale === 'en';

  const formatRedirectionUrl = suggestion => {
    return `${locale}/results?search=${suggestion}&currentPage=1`;
  };

  return (
    <>
      <div className='text-center bg-gray-200 pt-[120px] pb-[50px]'>
        <div className=' text-black'>
          <h1 className='font-sans font-light text-5xl leading-1'>
            {staticLabelsPLP[locale].searchForLabel}{' '}
            <span className='font-bold capitalize'>{requestBody?.search}</span>
          </h1>
          <h1 className='font-sans font-light text-5xl leading-1'>
            {staticLabelsPLP[locale].didYouMean}
            <Link href={formatRedirectionUrl(suggestion)}>
              <a>&quot;{suggestion}&quot;</a>
            </Link>
          </h1>
          <p className='my-5 font-sans font-bold text-xl leading-none'>
            0 &nbsp;{staticLabelsPLP[locale].totalProductLabel}
          </p>
        </div>
      </div>
      {commonSectionSearch(isEnglish)}
    </>
  );
};

SearchSuggestion.propTypes = {
  requestBody: PropTypes.shape({ search: PropTypes.string }),
  locale: PropTypes.string,
  suggestion: PropTypes.string
};

export default SearchSuggestion;
