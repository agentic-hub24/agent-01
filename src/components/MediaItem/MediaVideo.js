/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { HiPlay } from 'react-icons/hi2';
import { getYoutubeMetaData } from '@services/productListingAPI/client';
import { DEFAULT_IMAGE_LINK } from '@components/detailsComponent/helper';

export function VideoModal({ item, setYoutubeLinkOpen }) {
  return (
    <div
      className='relative z-50'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto '>
        <div className='flex max-h-full justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg '>
            <div className='bg-white px-10 pb-4 pt-5 sm:p-6 sm:pb-4 relative'>
              <div className='flex items-stretch w-full lg:h-[400px] h-[300px]'>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MediaVideo({ fields }) {
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
      <div className='relative'>
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
          className='absolute top-[50%] right-[50%] h-[70px] w-[70px] bg-black opacity-40 hover:opacity-70 border-2 rounded-full border-neutral-500 cursor-pointer'
          onClick={() => setYoutubeLinkOpen(youtubeMetaData)}
        >
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#fff]'>
            <HiPlay size={30} />
          </div>
        </div>
      </div>
      {Object.keys(youtubeLinkOpen).length > 0 && (
        <VideoModal
          item={fields[0]?.fields?.description} // youtube video id
          setYoutubeLinkOpen={e => setYoutubeLinkOpen(e)}
        />
      )}
    </>
  );
}
