import MediaVideo from '@components/MediaItem/MediaVideo';
import { RichText } from '@components/RichText';

export default function SideBySideContent({ fields }) {
  return (
    <div className='flex flex-wrap flex-col lg:flex-row w-full mx-auto max-w-screen-lg justify-center my-[30px] mx-[22px] px-[10px] lg:h-[350px]'>
      <div className='flex lg:w-1/2 w-full justify-center pr-5'>
        <MediaVideo fields={fields?.leftContent} height='350px' />
      </div>
      <div className='flex lg:w-1/2 flex-col w-full'>
        {fields?.rightContent[0]?.fields?.richText?.content?.map(
          (sect, index) => (
            <RichText
              key={index}
              text={sect}
              paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
            />
          )
        )}
      </div>
    </div>
  );
}
