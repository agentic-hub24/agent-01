/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import Link from 'next/link';
import SelectSection from '@components/SelectSection';
import StoreDetails from './StoreDetails';

const buttonLabel = 'To send';

export default function StoreListing({ pageHeading, fields }) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showCity, setShowCity] = useState(null);
  const [showStoreDetails, setShowStoreDetails] = useState(null);
  const [buttonEnable, setButtonEnable] = useState(false);

  const stateregion = [
    '--Select State--',
    ...fields?.stateregion?.map(item => item?.fields?.stateregionName)
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const storeArray = fields?.stateregion
      ?.filter(item => item?.fields?.stateregionName.includes(state))
      ?.map(item =>
        item?.fields?.city
          .filter(item => item.fields.cityName.includes(city))
          .map(item => item?.fields?.storeDetails)
      )[0][0];
    setShowStoreDetails(storeArray);
    setButtonEnable(false);
  };
  const handleStateChange = e => {
    e.preventDefault();
    setState(e.target.value);
    const cityArry = [
      '--Select City--',
      ...fields?.stateregion
        .filter(item => item?.fields?.stateregionName.includes(e.target.value))
        .map(item => item?.fields?.city.map(item => item?.fields?.cityName))[0]
    ];
    setShowCity(cityArry);
    setShowStoreDetails(null);
  };
  const handleCityChange = e => {
    setCity(e.target.value);
    setButtonEnable(true);
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
            selectOptions={stateregion}
            label={fields?.stateregionLabel}
            onChange={e => handleStateChange(e)}
            selectValue={state}
          />
          <SelectSection
            selectOptions={showCity}
            label={fields?.cityLabel}
            onChange={e => handleCityChange(e)}
            selectValue={city}
            disabled={!showCity}
          />
          <div className='md:flex md:items-center'>
            <input
              className='font-helvetica uppercase bg-[#dbdbdb] text-[#232323] hover:bg-[#364573] hover:text-[#fff] focus:shadow-outline font-bold py-2 px-4 rounded md:ml-[50px] md:mt-[20px] disabled:opacity-50'
              type='submit'
              value={buttonLabel}
              disabled={!buttonEnable}
            />
          </div>
        </form>
      </div>
      <hr />
      {showStoreDetails && (
        <StoreDetails state={state} details={showStoreDetails} />
      )}
    </div>
  );
}

StoreListing.defaultProps = {
  fields: { stateregion: [] },
  pageHeading: ''
};
