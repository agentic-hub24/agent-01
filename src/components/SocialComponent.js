import { useEffect, useRef, useState } from 'react';
import { HiShare } from 'react-icons/hi';
import { HiMiniPrinter } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { PDP_LABELS } from '@components/detailsComponent/helper';
import { Fb, Twitter } from '@components/svgs';

export const SocialButton = ({
  href,
  onClick,
  className,
  title,
  icon,
  label
}) => (
  <li className='relative'>
    <button
      target='popup'
      data-href={href}
      onClick={onClick}
      rel='noreferrer'
      className={className}
      title={title}
    >
      <div className='flex inline-flex'>
        <div className='flex w-[20px] h-[20px]'>{icon}</div>
        <div className='flex p-2 text-[#232323] font-HelveticaRoman text-[14px]'>
          {label}
        </div>
      </div>
    </button>
  </li>
);
SocialButton.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string
};

export default function SocialComponent() {
  const router = useRouter();
  const ref = useRef();
  const [social, setSocial] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (social && ref.current && !ref.current.contains(e.target)) {
        setSocial(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [social]);

  const shareOnFacebook = () => {
    window.open(
      `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      'facebook share',
      'width=600,height=400'
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `http://twitter.com/share?text=${
        PDP_LABELS[router.locale].twitterText
      }&url=${window.location.href}`,
      'twitter share',
      'width=600,height=400'
    );
  };

  return (
    <>
      <div className='flex mt-5 mb-5 px-[10px]'>
        <button
          className='flex justify-center items-center mr-3 h-[40px] w-[40px] bg-[#e5e5e5] text-[#232323] rounded hover:bg-[#364573] hover:text-[#fff]'
          onClick={() => window.print()}
          aria-label='Print'
        >
          <HiMiniPrinter size={20} />
        </button>
        <button
          className='flex justify-center items-center mr-3 h-[40px] w-[40px] bg-[#e5e5e5] text-[#232323] rounded hover:bg-[#364573] hover:text-[#fff]'
          onClick={() => setSocial(true)}
          aria-label='Share Link'
        >
          <HiShare size={20} />
        </button>
      </div>
      {social && (
        <div className='ml-20 relative' ref={ref}>
          <ul
            className='flex flex-col cursor-pointer text-[#000] [&_li]:block absolute w-[230px] p-4 shadow-md rounded bg-white'
            style={{ top: '-20px' }}
          >
            <SocialButton
              href={`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              onClick={shareOnFacebook}
              className='flex bg-[#fff] text-[15px] text-[#325a90] transititext-primary transition duration-150 ease-in-out hover:text-opacity-70 hover:no-underline'
              title='Share On facebook'
              icon={<Fb />}
              label='Facebook'
            />
            <SocialButton
              href={`http://twitter.com/share?text=${
                PDP_LABELS[router.locale].twitterText
              }&url=${window.location.href}`}
              onClick={shareOnTwitter}
              className='flex bg-[#fff] text-[15px] text-[#55acee] transititext-primary transition duration-150 ease-in-out hover:text-opacity-70 hover:no-underline'
              title='Share On twitter'
              icon={<Twitter />}
              label='Twitter'
            />
          </ul>
        </div>
      )}
    </>
  );
}
