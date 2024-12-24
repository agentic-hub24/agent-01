import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import PropTypes from 'prop-types';
import { fetchContentfulCommonEntries } from '@components/CommonSection';
import { RichText } from '@components/RichText';

const SocialComponent = dynamic(() => import('@components/SocialComponent'));
const BackToTop = dynamic(() => import('@components/backToTop'));
const Landing = dynamic(() => import('@components/landing'));
const Loader = dynamic(() => import('@components/loader'));
export default function PressReleaseLandingPage({ pageData }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loader loading={router.isFallback} />;
  }

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
      <SocialComponent />
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
