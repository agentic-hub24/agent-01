import Link from 'next/link';
import MediaVideo from '@components/MediaItem/MediaVideo';
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

      {fields?.cta && (
        <Link href='/store-listing'>{fields?.cta[0]?.fields?.label}</Link>
      )}
      {fields?.mediaItem && (
        <div className='pt-4'>
          <MediaVideo fields={fields?.mediaItem} height='550px' />
        </div>
      )}
      <div className={`${'border-b pb-2 pt-6'}`}></div>
    </div>
  );
}
