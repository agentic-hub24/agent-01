import { RichText } from '@components/RichText';

const TextContent = ({ fields, pageHeading }) => {
  const isPressReleseaseArticle = fields?.internalTitle.includes(
    'Press Room Article Page'
  );
  return (
    <div
      className={` pb-3  ${
        isPressReleseaseArticle
          ? 'md:w-2/3 px-8 my-12 w-full'
          : 'max-w-screen-lg mx-auto px-8 my-12  w-full'
      }`}
    >
      <h2 className='mt-[20px] mb-[30px] text-[2rem] md:text-[2.7rem] font-normal text-black'>
        {fields?.heading || pageHeading}
      </h2>
      {fields?.richText?.content?.map((sect, index) => (
        <RichText
          key={index}
          text={sect}
          paragraphCustomClasses='text-[14px] text-black font-HelveticaRoman'
        />
      ))}
    </div>
  );
};

export default TextContent;
