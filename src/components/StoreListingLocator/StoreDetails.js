import { RichText } from '@components/RichText';

export default function StoreDetails({
  city,
  details,
  locale,
  storeDetailsLabel
}) {
  return (
    <>
      <h2 className='font-helveticaLight md:text-3xl text-2xl font-light text-[#232323] py-[30px]'>
        {city}
      </h2>
      <div className='flex md:flex-row flex-col font-HelveticaRoman font-normal text-[14px] text-[#232323]'>
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
                {storeDetailsLabel[locale]?.storeTelephoneNumber}{' '}
                {innerItem.fields.storeTelephoneNumber}
              </div>
            )}
            {innerItem.fields.mobile && (
              <div className='whitespace-pre-wrap'>
                {storeDetailsLabel[locale]?.mobile} {innerItem.fields.mobile}
              </div>
            )}
            {innerItem.fields.emailAddress && (
              <div>
                {storeDetailsLabel[locale]?.emailAddress}{' '}
                <a
                  href={`mailto:${innerItem.fields.emailAddress}`}
                  className='font-HelveticaRoman'
                >
                  {innerItem.fields.emailAddress}
                </a>
              </div>
            )}
            {innerItem.fields.websiteLink && (
              <div>
                {storeDetailsLabel[locale]?.websiteLink}{' '}
                <a
                  href={innerItem.fields.websiteLink}
                  target='_blank'
                  rel='noreferrer'
                  className='font-HelveticaRoman'
                >
                  {innerItem.fields.websiteLink}
                </a>
              </div>
            )}
            {innerItem?.fields?.storeOpeningHours?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses='text-[14px] text-black font-HelveticaRoman'
                />
              )
            )}
            <div className='pb-[30px]'></div>
          </div>
        ))}
      </div>
    </>
  );
}

StoreDetails.defaultProps = {
  city: '',
  details: [],
  locale: '',
  storeDetailsLabel: {}
};
