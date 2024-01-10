import { useEffect, useState } from 'react';
import { HiOutlineChevronUp } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { backtoTopLabels } from '@utils/footerUtils';

export default function BackToTop({ topHeight, localeProp = '' }) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: topHeight, behavior: 'smooth' });
  };
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY < 500 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);
  return (
    <>
      {top && (
        <button
          className='fixed bottom-[12px] right-[12px] rounded shadow w-[56px] h-[56px] bg-[#dbdbdb] cursor-pointer shadow pt-[2px]'
          onClick={handleScrollToTop}
        >
          <div className='font-bold text-[#232323] flex justify-center'>
            <HiOutlineChevronUp size={30} />
          </div>
          <div className='text-[8px] font-bold text-[#232323] text-center'>
            {backtoTopLabels[localeProp]}
          </div>
        </button>
      )}
    </>
  );
}

BackToTop.propTypes = {
  topHeight: PropTypes.number,
  localeProp: PropTypes.string
};
