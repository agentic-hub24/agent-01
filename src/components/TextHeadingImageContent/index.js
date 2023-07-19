import Link from 'next/link';
import MediaItem from '@components/MediaItem/MediaItem';
import { RichText } from '@components/RichText';

export default function TextHeadingImageContentSection({ fields }) {
  return (
    <div className='mx-auto max-w-screen-lg flex flex-col justify-center my-[30px] mx-[22px] px-[10px]'>
      <div className='text-[30px] my-2 font-HelveticaRoman leading-tight font-normal text-[#232323]'>
        {fields?.heading?.content?.map((sect, index) => (
          <RichText key={index} text={sect} />
        ))}
      </div>

      {fields?.textContent?.content?.map((sect, index) => (
        <RichText
          key={index}
          text={sect}
          paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman`}
        />
      ))}

      <div className='pt-5'>
        {fields?.cta &&
          fields?.cta.map(({ fields, sys }, id) => (
            <div className='pt-2' key={sys?.id}>
              <a
                href={fields?.url}
                target={fields?.openerType !== 'Current Window' ? '_blank' : ''}
                className={`flex w-full text-[16px] font-HelveticaRoman justify-left hover:no-underline`}
                rel='noreferrer'
              >
                {fields?.label}
              </a>
            </div>
          ))}
      </div>

      {fields?.mediaItem && (
        <div className='pt-4'>
          <MediaItem assets={fields?.mediaItem} height='550px' />
        </div>
      )}
      <div className={`${'border-b pb-2 pt-6'}`}></div>
    </div>
  );
}
