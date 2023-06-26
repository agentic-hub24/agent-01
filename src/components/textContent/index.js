import { RichText } from '@components/RichText';

const TextContent = ({ heading, content }) => {
  return (
    <div className='max-w-screen-lg mx-auto px-8 my-12 pb-3'>
      <h2 className='mt-[20px] mb-[30px] text-[2rem] md:text-[5rem] font-normal text-black'>
        {heading}
      </h2>
      {content?.map((sect, index) => (
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
