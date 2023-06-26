/* eslint-disable @next/next/no-img-element */
export default function ImageZoomModal({
  showImageZoom,
  skuName,
  carouselItem,
  defaultImageLink
}) {
  const imageResource =
    (carouselItem &&
      carouselItem.length > 0 &&
      carouselItem[skuName]?.ResourceFullWebURL) ||
    '';
  return (
    <div
      className='relative z-50'
      aria-labelledby={'image-zoom'}
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-white bg-opacity-100 transition-opacity'></div>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center w-full'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left  transition-all max-w-screen-lg mx-auto'>
            <div className='flex'>
              <div className='flex'>
                <img
                  src={imageResource}
                  alt={'image-zoom'}
                  className='h-[500px] w-auto'
                  onError={e => (e.target.src = defaultImageLink)}
                />
              </div>
              <div
                className='flex px-[30px] text-5xl cursor-pointer'
                onClick={() => showImageZoom(false)}
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
