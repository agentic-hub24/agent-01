export default function StoreDetails({ state, details }) {
  return (
    <>
      <h2 className='font-helveticaLight md:text-3xl text-2xl font-light text-[#232323] py-[30px]'>
        {state}
      </h2>
      <div className='flex md:flex-row flex-col font-helveticaNeueLTRoman text-[14px] text-[#232323]'>
        {details.map((innerItem, index) => (
          <div className='flex flex-col md:w-1/4 w-2/3 mr-[30px]' key={index}>
            <div className='font-helveticaNeueLTBd text-[14px] text-[#232323]'>
              {innerItem.fields.storeName}
            </div>
            <div className='whitespace-pre-wrap'>
              {innerItem.fields.storeDetails}
            </div>
            {innerItem.fields.storeTelephoneNumber && (
              <div className='whitespace-pre-wrap'>
                Telephone: {innerItem.fields.storeTelephoneNumber}
              </div>
            )}
            {innerItem.fields.emailAddress && (
              <div>
                Email:{' '}
                <a href={`mailto:${innerItem.fields.emailAddress}`}>
                  {innerItem.fields.emailAddress}
                </a>
              </div>
            )}
            <div className='pb-[30px]'></div>
          </div>
        ))}
      </div>
    </>
  );
}

StoreDetails.defaultProps = {
  state: '',
  details: []
};
