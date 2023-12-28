import PropTypes from 'prop-types';
import { staticLabelsPLP } from '@components/ProductListing/helper';

const SearchNotFound = ({ requestBody, locale = 'en' }) => {
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
      {locale === 'en' ? (
        <section className='text-xs w-full mx-auto bg-white text-gray-800 overflow-auto relative z-0'>
          <div className='font-sans font-light text-xl leading-5 font-medium relative float-left w-full min-h-1px mb-[20px] pt-[100px] px-10'>
            <h3>We did not find any results for your search.</h3>
            <div className='mt-[20px] mb-[10px] text-xl'>
              <h3>SEARCH TIPS:</h3>
              <ul className='text-base mb-10 list-disc ml-[50px]'>
                <li>Check spelling again.</li>
                <li>Try different keywords.</li>
                <li>Try more generic keywords.</li>
                <li>Try fewer keywords.</li>
              </ul>
            </div>
          </div>
        </section>
      ) : (
        <section className='text-xs w-full mx-auto bg-white text-gray-800 overflow-auto relative z-0'>
          <div className='font-sans font-light text-xl leading-5 font-medium relative float-left w-full min-h-1px mb-[20px] pt-[100px] px-10'>
            <h3>No encontramos ningún resultado para su búsqueda.</h3>
            <div className='mt-[20px] mb-[10px] text-xl'>
              <h3>CONSEJOS DE BÚSQUEDA: </h3>
              <ul className='text-base mb-10 list-disc ml-[50px]'>
                <li>Revisar ortografía nuevamente.</li>
                <li>Pruebe diferentes palabras clave.</li>
                <li>Pruebe palabras clave más genéricas.</li>
                <li>Pruebe con menos palabras clave.</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

SearchNotFound.propTypes = {
  requestBody: PropTypes.shape({ search: PropTypes.string }),
  locale: PropTypes.string
};

export default SearchNotFound;
