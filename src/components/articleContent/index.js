import PropTypes from 'prop-types';
import { RichText } from '@components/RichText';

const ArticleContent = ({ heading, fields }) => {
  return (
    <div className='max-w-screen-lg mx-auto px-8 md:my-12 md:pb-3 px-[10px]'>
      <h2 className='md:mt-20 md:mb-20 md:text-5xl mb-[30px] text-[2rem] font-normal text-black font-helveticaLight'>
        {heading}
      </h2>
      {fields?.sections?.map((sect, index) => (
        <RichText
          key={sect?.sys?.id || index}
          text={sect?.fields?.richText}
          paragraphCustomClasses='text-[14px] text-black font-HelveticaRoman'
        />
      ))}
    </div>
  );
};

ArticleContent.propTypes = {
  heading: PropTypes.string,
  fields: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        sys: PropTypes.shape({
          id: PropTypes.string
        }),
        fields: PropTypes.shape({
          richText: PropTypes.string
        })
      })
    )
  })
};

export default ArticleContent;
