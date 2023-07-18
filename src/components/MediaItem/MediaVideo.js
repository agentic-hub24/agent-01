/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { HiPlay } from 'react-icons/hi2';
import { getYoutubeMetaData } from '@services/productListingAPI/client';
import { DEFAULT_IMAGE_LINK } from '@components/detailsComponent/helper';

export function VideoModal({ item, setYoutubeLinkOpen, height }) {
  return (
    <>
      <div className={`flex items-stretch w-full lg:h-[${height}] h-auto`}>
        <iframe
          src={`https://www.youtube.com/embed/${item}?rel=0`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen='allowfullscreen'
          mozallowfullscreen='mozallowfullscreen'
          msallowfullscreen='msallowfullscreen'
          oallowfullscreen='oallowfullscreen'
          webkitallowfullscreen='webkitallowfullscreen'
          className='w-full'
        ></iframe>
      </div>
      <div
        className='absolute top-0 right-0 text-[26px] md:p-2 cursor-pointer'
        onClick={() => setYoutubeLinkOpen({})}
      >
        x
      </div>
    </>
  );
}

export default function MediaVideo({ fields, height }) {
  const [youtubeMetaData, setYoutubeMetaData] = useState({});
  const [youtubeLinkOpen, setYoutubeLinkOpen] = useState({});
  useEffect(() => {
    async function fetchMetaData() {
      let responseArray = await getYoutubeMetaData(
        fields[0]?.fields?.description
      );
      setYoutubeMetaData(responseArray);
    }
    if (fields && fields[0]?.fields?.type === 'Video') {
      fetchMetaData();
    }
  }, []);
  return (
    <>
      {Object.keys(youtubeLinkOpen).length === 0 && (
        <div className='relative h-full w-full'>
          <img
            src={
              youtubeMetaData?.items &&
              youtubeMetaData?.items[0]?.snippet?.thumbnails?.maxres?.url
            }
            onError={e => (e.target.src = DEFAULT_IMAGE_LINK)}
            className='w-full'
            alt='youtube thumbnail image'
          />

          <div
            className='absolute top-[50%] right-[50%] translate-x-[30%] translate-y-[-50%] h-[70px] w-[70px] bg-black opacity-40 hover:opacity-70 border-2 rounded-full border-neutral-500 cursor-pointer'
            onClick={() => setYoutubeLinkOpen(youtubeMetaData)}
          >
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#fff]'>
              <HiPlay size={30} />
            </div>
          </div>
        </div>
      )}
      {Object.keys(youtubeLinkOpen).length > 0 && (
        <VideoModal
          item={fields[0]?.fields?.description} // youtube video id
          setYoutubeLinkOpen={e => setYoutubeLinkOpen(e)}
          height={height}
        />
      )}
    </>
  );
}
