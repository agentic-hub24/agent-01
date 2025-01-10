import Link from 'next/link';
import PropTypes from 'prop-types';
import MediaItem from '@components/MediaItem/MediaItem';
import { RichText } from '@components/RichText';

const renderContent = (content, paragraphClass) => {
  return <RichText text={content} paragraphCustomClasses={paragraphClass} />;
};

const renderCtaLinks = cta => {
  return cta.map(({ fields, sys }, id) => (
    <div className='pt-2' key={sys?.id || id}>
      <Link
        href={fields?.url || ''}
        passHref
        className={`flex w-full text-[16px] font-HelveticaRoman justify-left hover:no-underline`}
        legacyBehavior
      >
        <a
          target={fields?.openerType !== 'Current Window' ? '_blank' : ''}
          rel='noreferrer'
        >
          {fields?.label}
        </a>
      </Link>
    </div>
  ));
};

export default function TextHeadingImageContentSection({ fields }) {
  const isPressReleseaseArticle = fields?.internalTitle.includes(
    'Press Room Article Page'
  );

  return (
    <div
      className={`flex flex-col justify-center my-[30px] mx-[22px] px-[10px] ${
        isPressReleseaseArticle
          ? 'bg-[#e5e5e5] h-[121px] w-[224px] p-3'
          : 'w-full mx-auto max-w-screen-lg'
      }`}
    >
      <div className='text-[30px] my-2 font-HelveticaRoman leading-tight font-normal text-[#232323]'>
        {fields?.heading && renderContent(fields?.heading)}
      </div>

      {fields?.textContent &&
        renderContent(
          fields?.textContent,
          `text-[14px] text-black font-HelveticaRoman leading-normal`
        )}

      {fields?.richText &&
        renderContent(
          fields?.richText,
          `text-[14px] text-black font-HelveticaRoman leading-normal`
        )}
      <div>{fields?.cta && renderCtaLinks(fields?.cta)}</div>

      {fields?.mediaItem && (
        <div className='pt-4'>
          <MediaItem assets={fields?.mediaItem} height='550px' />
        </div>
      )}
      <div className={`${'border-b pb-2 pt-6'}`}></div>
    </div>
  );
}

TextHeadingImageContentSection.propTypes = {
  fields: PropTypes.shape({
    internalTitle: PropTypes.string,
    heading: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.string)
    }),
    textContent: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.string)
    }),
    richText: PropTypes.shape({
      content: PropTypes.arrayOf(PropTypes.string)
    }),
    cta: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          url: PropTypes.string,
          openerType: PropTypes.string,
          label: PropTypes.string
        }),
        sys: PropTypes.shape({
          id: PropTypes.string
        })
      })
    ),
    mediaItem: PropTypes.shape({})
  })
};
