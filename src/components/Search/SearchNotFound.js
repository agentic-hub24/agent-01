import PropTypes from 'prop-types';
import { commonSectionSearch } from '@components/CommonSection';
import { staticLabelsPLP } from '@components/ProductListing/helper';

const SearchNotFound = ({ requestBody, locale = 'en' }) => {
  const isEnglish = locale === 'en';

  return (
    <>
      <div className='text-center bg-gray-200 pt-[120px] pb-[50px]'>
        <div className=' text-black'>
          <h1 className='font-sans font-light text-5xl leading-1'>
            {staticLabelsPLP[locale].searchForLabel}{' '}
            <span className='font-bold capitalize'>{requestBody?.search}</span>
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

SearchNotFound.propTypes = {
  requestBody: PropTypes.shape({ search: PropTypes.string }),
  locale: PropTypes.string
};

export default SearchNotFound;
