/* eslint-disable react/no-unknown-property */
export default function VideoModal({ item, setYoutubeLinkOpen }) {
  return (
    <div
      className='relative z-50'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex max-h-full justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative'>
              <div className='flex items-stretch w-full lg:h-[400px]'>
                <iframe
                  src={`https://www.youtube.com/embed/${item?.i?.ResourceName}?rel=0`}
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
                className='absolute top-0 right-0 text-[16px] md:p-3 cursor-pointer'
                onClick={() => setYoutubeLinkOpen({})}
              >
                X
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
