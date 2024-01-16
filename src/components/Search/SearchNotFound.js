import PropTypes from 'prop-types';
import { staticLabelsPLP } from '@components/ProductListing/helper';

const SearchNotFound = ({ requestBody, locale = 'en' }) => {
  const isEnglish = locale === 'en';

  const commonSection = (
    <section className='text-xs w-full mx-auto bg-white text-gray-800 overflow-auto relative z-0'>
      <div className='font-sans font-light text-xl leading-5 font-medium relative float-left w-full min-h-1px mb-[20px] pt-[100px] px-10'>
        <h3>
          {isEnglish
            ? 'We did not find any results for your search.'
            : 'No encontramos ningún resultado para su búsqueda.'}
        </h3>
        <div className='mt-[20px] mb-[10px] text-xl'>
          <h3>{isEnglish ? 'SEARCH TIPS:' : 'CONSEJOS DE BÚSQUEDA:'}</h3>
          <ul className='text-base mb-10 list-disc ml-[50px]'>
            <li>
              {isEnglish
                ? 'Check spelling again.'
                : 'Revisar ortografía nuevamente.'}
            </li>
            <li>
              {isEnglish
                ? 'Try different keywords.'
                : 'Pruebe diferentes palabras clave.'}
            </li>
            <li>
              {isEnglish
                ? 'Try more generic keywords.'
                : 'Pruebe palabras clave más genéricas.'}
            </li>
            <li>
              {isEnglish
                ? 'Try fewer keywords.'
                : 'Pruebe con menos palabras clave.'}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );

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
      {commonSection}
    </>
  );
};

SearchNotFound.propTypes = {
  requestBody: PropTypes.shape({ search: PropTypes.string }),
  locale: PropTypes.string
};

export default SearchNotFound;
