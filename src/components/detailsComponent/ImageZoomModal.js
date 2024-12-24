/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { carouselImageFormatter } from './helper';

export default function ImageZoomModal({
  showImageZoom,
  skuName,
  carouselItem,
  defaultImageLink,
  isNewProduct
}) {
  const imageResource =
    (carouselItem &&
      carouselItem.length > 0 &&
      carouselItem[skuName]?.ResourceName) ||
    '';
  return (
    <div
      className='relative z-50'
      aria-labelledby={'image-zoom'}
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-white bg-opacity-100 transition-opacity'></div>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center w-full'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left  transition-all max-w-screen-lg mx-auto'>
            <div className='flex relative'>
              <div className='flex'>
                <img
                  src={carouselImageFormatter(imageResource, isNewProduct)}
                  alt={'zoom-modal'}
                  aria-label={'zoom-modal'}
                  className='h-[500px] w-auto'
                  onError={e => (e.target.src = defaultImageLink)}
                />
              </div>
              <button
                className='flex px-[30px] text-5xl cursor-pointer absolute top-0 right-0'
                onClick={() => showImageZoom(false)}
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ImageZoomModal.propTypes = {
  showImageZoom: PropTypes.func,
  skuName: PropTypes.string,
  carouselItem: PropTypes.object,
  defaultImageLink: PropTypes.string,
  isNewProduct: PropTypes.bool
};
