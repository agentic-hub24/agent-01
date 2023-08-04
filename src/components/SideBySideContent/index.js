import Link from 'next/link';
import MediaItem from '@components/MediaItem/MediaItem';
import { RichText } from '@components/RichText';

export default function SideBySideContent({ fields }) {
  return (
    <div className='flex flex-wrap flex-col lg:flex-row w-full mx-auto max-w-screen-lg justify-center my-[30px] mx-[22px] px-[10px] lg:h-[350px]'>
      {/* Left content */}
      <div className='flex lg:w-1/2 w-full justify-center pr-5'>
        <div className='flex flex-col'>
          {fields?.leftContent[0]?.fields?.heading &&
            fields?.leftContent[0]?.fields?.heading?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
                />
              )
            )}
          {fields?.leftContent[0]?.fields?.textContent &&
            fields?.leftContent[0]?.fields?.textContent?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
                />
              )
            )}
          {fields?.leftContent[0]?.fields?.richText &&
            fields?.leftContent[0]?.fields?.richText?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
                />
              )
            )}
          <div className='pt-2'>
            {fields?.leftContent[0]?.fields?.cta &&
              fields?.leftContent[0]?.fields?.cta.map(({ fields, sys }, id) => (
                <div className='pt-2' key={sys?.id}>
                  <Link
                    href={fields?.url || ''}
                    passHref
                    className={`flex w-full text-[16px] font-HelveticaRoman justify-left hover:no-underline`}
                  >
                    <a
                      target={
                        fields?.openerType !== 'Current Window' ? '_blank' : ''
                      }
                      rel='noreferrer'
                    >
                      {fields?.label}
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <MediaItem assets={fields?.leftContent} height='350px' />
      </div>
      {/* Right content */}
      <div className='flex lg:w-1/2 flex-col w-full'>
        <div className='flex flex-col'>
          {fields?.rightContent[0]?.fields?.heading &&
            fields?.rightContent[0]?.fields?.heading?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
                />
              )
            )}
          {fields?.rightContent[0]?.fields?.textContent &&
            fields?.rightContent[0]?.fields?.textContent?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
                />
              )
            )}
          {fields?.rightContent[0]?.fields?.richText &&
            fields?.rightContent[0]?.fields?.richText?.content?.map(
              (sect, index) => (
                <RichText
                  key={index}
                  text={sect}
                  paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
                />
              )
            )}
          <div className='pt-2'>
            {fields?.rightContent[0]?.fields?.cta &&
              fields?.rightContent[0]?.fields?.cta.map(
                ({ fields, sys }, id) => (
                  <div className='pt-2' key={sys?.id}>
                    <Link
                      href={fields?.url || ''}
                      passHref
                      className={`flex w-full text-[16px] font-HelveticaRoman justify-left hover:no-underline`}
                    >
                      <a
                        target={
                          fields?.openerType !== 'Current Window'
                            ? '_blank'
                            : ''
                        }
                        rel='noreferrer'
                      >
                        {fields?.label}
                      </a>
                    </Link>
                  </div>
                )
              )}
          </div>
        </div>
        <MediaItem assets={fields?.rightContent} height='350px' />
      </div>
      <div className={`${'border-b pb-2 pt-6'}`}></div>
    </div>
  );
}
