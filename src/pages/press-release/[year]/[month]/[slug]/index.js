import { useState, useEffect, useRef } from 'react';
import { HiShare } from 'react-icons/hi';
import { HiMiniPrinter } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import PropTypes from 'prop-types';
import {
  SocialButton,
  fetchContentfulCommonEntries
} from '@components/CommonSection';
import { RichText } from '@components/RichText';
import BackToTop from '@components/backToTop';
import { PDP_LABELS } from '@components/detailsComponent/helper';
import Landing from '@components/landing';
import Loader from '@components/loader';
import { Fb, Twitter } from '@components/svgs';

export default function PressReleaseLandingPage({ pageData }) {
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

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loader loading={router.isFallback} />;
  }

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
    <div className='flex flex-col w-full max-w-screen-lg mx-auto'>
      <div className='flex flex-col px-[10px] py-[20px] text-5xl text-[#232323]'>
        {pageData?.headingWithSubtext?.fields?.heading}
      </div>
      <div className='mx-2 mt-[4px] mb-[12px] font-HelveticaRoman italic text-[#666] text-[15px]'>
        {pageData?.headingWithSubtext?.fields?.subText && (
          <RichText
            text={pageData?.headingWithSubtext?.fields?.subText}
            paragraphCustomClasses={`text-[14px] text-black font-HelveticaRoman leading-normal`}
          />
        )}
      </div>
      <div className='flex mt-5 mb-5 px-[10px]'>
        <button
          className='flex justify-center items-center mr-3 h-[40px] w-[40px] bg-[#e5e5e5] text-[#232323] rounded hover:bg-[#364573] hover:text-[#fff]'
          onClick={() => window.print()}
        >
          <HiMiniPrinter size={20} />
        </button>
        <button
          className='flex justify-center items-center mr-3 h-[40px] w-[40px] bg-[#e5e5e5] text-[#232323] rounded hover:bg-[#364573] hover:text-[#fff]'
          onClick={() => setSocial(true)}
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
      <hr />
      <div>
        <Landing pageData={pageData} />
      </div>
      <BackToTop topHeight={0} localeProp={router.locale} />
    </div>
  );
}

PressReleaseLandingPage.propTypes = {
  pageData: PropTypes.shape({
    headingWithSubtext: PropTypes.shape({
      fields: PropTypes.shape({
        heading: PropTypes.string,
        subText: PropTypes.shape({
          content: PropTypes.arrayOf(PropTypes.string)
        })
      })
    })
  })
};

export async function getServerSideProps({ params, preview, locale }) {
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const query1 = await client.getEntries({
    content_type: 'latamLandingPage',
    'fields.slug': `press-release/${params.year}/${params.month}/${params.slug}`,
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });

  const { footerNavigationData, headerNavigationData, world } =
    await fetchContentfulCommonEntries(lc, client);

  const results = await Promise.all([query1]);

  const res = results[0];

  const pageData = res?.items?.[0]?.fields;
  if (!pageData) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      pageData,
      world
    }
  };
}
