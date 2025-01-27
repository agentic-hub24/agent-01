/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
const MediaVideo = dynamic(() => import('./MediaVideo'))
import Image from 'next/image';

const MediaItem = ({ assets, height }) => {
  return (
    <div className='mx-auto max-w-screen-lg flex justify-center w-full h-full'>
      {assets?.map(({ fields, sys }, id) => {
        const isPressReleseaseArticle = fields?.internalTitle.includes(
          'Press Room Article Page'
        );
        return (
          <div
            key={sys?.id || id}
            className={`w-full h-full flex overflow-hidden ${
              isPressReleseaseArticle
                ? 'justify-start p-[32px]'
                : 'justify-center'
            }`}
          >
            {fields?.type === 'Image' && (
              <Image
                src={`https:${fields?.asset?.fields?.file?.url}`}
                key={sys?.id}
                alt={fields?.altText}
                title={fields?.altText}
                width={fields?.asset?.fields?.file?.details?.image?.width}
                height={fields?.asset?.fields?.file?.details?.image?.height}
                loading='lazy'
              />
            )}
            {fields?.type === 'Video' && (
              <MediaVideo fields={fields} height={height} />
            )}
          </div>
        );
      })}
    </div>
  );
};

MediaItem.propTypes = {
  assets: PropTypes.array,
  height: PropTypes.string
};

export default MediaItem;
