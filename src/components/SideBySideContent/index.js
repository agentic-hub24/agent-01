import Link from 'next/link';
import PropTypes from 'prop-types';
import MediaItem from '@components/MediaItem/MediaItem';
import { RichText } from '@components/RichText';

const renderContent = content => {
  return (
    <RichText
      text={content}
      paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
    />
  );
};

const renderCtaLinks = cta => {
  return cta.map(({ fields, sys }, id) => (
    <div className='pt-2' key={sys?.id || id}>
      <Link
        href={fields?.url || ''}
        passHref
        className={`flex w-full text-[16px] font-HelveticaRoman justify-left hover:no-underline`}
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

export default function SideBySideContent({ fields }) {
  return (
    <div className='flex flex-wrap flex-col lg:flex-row w-full mx-auto max-w-screen-lg justify-center my-[30px] mx-[22px] px-[10px] lg:h-[350px]'>
      {/* Left content */}
      <div className='flex lg:w-1/2 w-full justify-center pr-5'>
        <div className='flex flex-col'>
          {fields?.leftContent[0]?.fields?.heading &&
            renderContent(fields?.leftContent[0]?.fields?.heading)}
          {fields?.leftContent[0]?.fields?.textContent &&
            renderContent(fields?.leftContent[0]?.fields?.textContent)}
          {fields?.leftContent[0]?.fields?.richText &&
            renderContent(fields?.leftContent[0]?.fields?.richText)}
          <div className='pt-2'>
            {fields?.leftContent[0]?.fields?.cta &&
              renderCtaLinks(fields?.leftContent[0]?.fields?.cta)}
          </div>
        </div>
        <MediaItem assets={fields?.leftContent} height='350px' />
      </div>
      {/* Right content */}
      <div className='flex lg:w-1/2 flex-col w-full'>
        <div className='flex flex-col'>
          {fields?.rightContent[0]?.fields?.heading &&
            renderContent(fields?.rightContent[0]?.fields?.heading)}
          {fields?.rightContent[0]?.fields?.textContent &&
            renderContent(fields?.rightContent[0]?.fields?.textContent)}
          {fields?.rightContent[0]?.fields?.richText &&
            renderContent(fields?.rightContent[0]?.fields?.richText)}
          <div className='pt-2'>
            {fields?.rightContent[0]?.fields?.cta &&
              renderCtaLinks(fields?.rightContent[0]?.fields?.cta)}
          </div>
        </div>
        <MediaItem assets={fields?.rightContent} height='350px' />
      </div>
      <div className={`${'border-b pb-2 pt-6'}`}></div>
    </div>
  );
}

const ContentPropTypes = PropTypes.shape({
  content: PropTypes.arrayOf(PropTypes.object)
});

const CtaPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    fields: PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      openerType: PropTypes.string
    }),
    sys: PropTypes.shape({
      id: PropTypes.string
    })
  })
);

const SideBySideContentPropTypes = {
  fields: PropTypes.shape({
    leftContent: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          heading: ContentPropTypes,
          textContent: ContentPropTypes,
          richText: ContentPropTypes,
          cta: CtaPropTypes
        })
      })
    ),
    rightContent: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          heading: ContentPropTypes,
          textContent: ContentPropTypes,
          richText: ContentPropTypes,
          cta: CtaPropTypes
        })
      })
    )
  })
};

SideBySideContent.propTypes = SideBySideContentPropTypes;

SideBySideContent.defaultProps = {
  fields: {
    leftContent: [],
    rightContent: []
  }
};
