/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import SelectSection from '@components/SelectSection';
import { storeDetailsLabel, storeLocatorOption } from '@utils/footerUtils';
import StoreDetails from './StoreDetails';

export default function StoreListingLocator({ pageHeading, fields }) {
  const router = useRouter();
  const { locale = '' } = router;
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showState, setShowState] = useState(null);
  const [showCity, setShowCity] = useState(null);
  const [showStoreDetails, setShowStoreDetails] = useState(null);
  const [buttonEnable, setButtonEnable] = useState(false);

  const countryregion = [
    storeLocatorOption[locale].selectCountry,
    ...fields?.formItemRow[0]?.fields?.formItemSection?.fields?.country?.map(
      item => item?.fields?.countryName
    )
  ];

  const { label: ctaLabel = '' } =
    fields?.formItemRow[1]?.fields?.formItemSection?.fields;

  const {
    cityLabel = '',
    countryLabel = '',
    stateregionLabel = ''
  } = fields?.formItemRow[0]?.fields?.formItemSection?.fields;

  const handleCountryChange = e => {
    const stateArray = [
      storeLocatorOption[locale].selectState,
      ...fields?.formItemRow[0]?.fields?.formItemSection?.fields?.country
        .filter(item => item?.fields?.countryName.includes(e.target.value))
        .map(item =>
          item?.fields?.stateregion.map(item => item?.fields?.stateregionName)
        )[0]
    ];

    setCountry(e.target.value);
    setShowState(stateArray);
    setShowCity(null);
    setShowStoreDetails(null);
    setState('');
    setCity('');
  };

  const handleStateChange = e => {
    e.preventDefault();
    setShowCity(null);
    setCity('');
    setState(e.target.value);
    const cityArry = [
      storeLocatorOption[locale].selectCity,
      ...fields?.formItemRow[0]?.fields?.formItemSection?.fields?.country
        .filter(item => item?.fields?.countryName.includes(country))
        .map(
          item =>
            item?.fields?.stateregion
              .filter(item =>
                item?.fields?.stateregionName?.includes(e.target.value)
              )
              .map(item =>
                item?.fields?.city.map(item => item?.fields?.cityName)
              )[0]
        )[0]
    ];
    setShowCity(cityArry);
    setShowStoreDetails(null);
  };
  const handleCityChange = e => {
    setCity(e.target.value);
    setButtonEnable(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const storeArray =
      fields?.formItemRow[0]?.fields?.formItemSection?.fields?.country
        ?.filter(item => item?.fields?.countryName.includes(country))
        .map(
          item =>
            item?.fields?.stateregion
              .filter(item => item?.fields?.stateregionName.includes(state))
              .map(item =>
                item?.fields?.city
                  ?.filter(item => item?.fields?.cityName.includes(city))
                  .map(item => item?.fields?.storeDetails)
              )[0][0]
        )[0];
    setShowStoreDetails(storeArray);
    setButtonEnable(false);
  };

  return (
    <div className='p-[20px] max-w-screen-lg mx-auto'>
      <h1 className='font-helveticaLight pb-[20px] lg:mx-10 text-2xl lg:text-3xl lg:py-[40px] font-light text-black uppercase'>
        {pageHeading}
      </h1>
      <hr />
      <div className='pb-[20px] mt-[30px] md:ml-[80px] '>
        <form
          className='max-w-[270px] md:max-w-sm pb-[30px]'
          onSubmit={handleSubmit}
        >
          <SelectSection
            selectOptions={countryregion}
            label={countryLabel}
            onChange={e => handleCountryChange(e)}
            selectValue={country}
          />
          <SelectSection
            selectOptions={showState}
            label={stateregionLabel}
            onChange={e => handleStateChange(e)}
            selectValue={state}
            disabled={!showState}
          />
          <SelectSection
            selectOptions={showCity}
            label={cityLabel}
            onChange={e => handleCityChange(e)}
            selectValue={city}
            disabled={!showCity}
          />
          <div className='md:flex md:items-center'>
            <input
              className='font-helvetica uppercase bg-[#dbdbdb] text-[#232323] hover:bg-[#364573] hover:text-[#fff] focus:shadow-outline font-bold py-3 px-5 rounded md:ml-[50px] md:mt-[20px] disabled:opacity-50 disabled:cursor-not-allowed text-[13px] font-bold'
              type='submit'
              value={ctaLabel}
              disabled={!buttonEnable}
            />
          </div>
        </form>
      </div>
      <hr />
      {showStoreDetails && (
        <StoreDetails
          city={city}
          details={showStoreDetails}
          locale={locale}
          storeDetailsLabel={storeDetailsLabel}
        />
      )}
    </div>
  );
}

StoreListingLocator.propTypes = {
  pageHeading: PropTypes.string,
  fields: PropTypes.shape({
    formItemRow: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          formItemSection: PropTypes.shape({
            fields: PropTypes.shape({
              country: PropTypes.arrayOf(
                PropTypes.shape({
                  fields: PropTypes.shape({
                    countryName: PropTypes.string,
                    stateregion: PropTypes.arrayOf(
                      PropTypes.shape({
                        fields: PropTypes.shape({
                          stateregionName: PropTypes.string,
                          city: PropTypes.arrayOf(
                            PropTypes.shape({
                              fields: PropTypes.shape({
                                cityName: PropTypes.string,
                                storeDetails: PropTypes.arrayOf(
                                  PropTypes.shape({})
                                )
                              })
                            })
                          )
                        })
                      })
                    )
                  })
                })
              ),
              cityLabel: PropTypes.string,
              countryLabel: PropTypes.string,
              stateregionLabel: PropTypes.string
            })
          })
        })
      })
    )
  })
};

StoreListingLocator.defaultProps = {
  fields: {
    formItemRow: [
      {
        fields: {
          formItemSection: {
            fields: {
              country: [],
              cityLabel: '',
              countryLabel: '',
              stateregionLabel: ''
            }
          }
        }
      },
      { fields: { formItemSection: { fields: { label: '' } } } }
    ]
  },
  pageHeading: ''
};
