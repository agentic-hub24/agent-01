/* eslint-disable @next/next/no-img-element */
import MediaVideo from './MediaVideo';

const MediaItem = ({ assets, height }) => {
  return (
    <div className='mx-auto max-w-screen-lg flex justify-center w-full h-full'>
      {assets?.map(({ fields, sys }) => (
        <div key={sys} className='w-full'>
          {fields?.type === 'Image' && (
            <img
              src={`https:${fields?.asset?.fields?.file?.url}`}
              key={sys?.id}
              alt={fields?.altText}
              title={fields?.altText}
            />
          )}
          {fields?.type === 'Video' && (
            <MediaVideo fields={assets} height={height} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaItem;
