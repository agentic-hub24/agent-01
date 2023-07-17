/* eslint-disable @next/next/no-img-element */
const MediaItem = ({ assets }) => {
  return (
    <div className='mx-auto max-w-screen-lg flex justify-center'>
      {assets?.map(({ fields, sys }) => (
        <div key={sys}>
          <img
            src={`https:${fields?.asset?.fields?.file?.url}`}
            key={sys?.id}
            alt={fields?.altText}
            title={fields?.altText}
          />
        </div>
      ))}
    </div>
  );
};

export default MediaItem;
