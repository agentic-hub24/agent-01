import Image from 'next/image';

const MediaItem = ({ assets }) => {
  return (
    <>
      {assets?.map(({ fields, sys }) => (
        <Image
          src={`https:${fields?.asset?.fields?.file?.url}`}
          width={290}
          height={220}
          key={sys?.id}
          alt={fields?.altText}
          className='cursor-pointer'
          title={fields?.altText}
        />
      ))}
    </>
  );
};

export default MediaItem;
