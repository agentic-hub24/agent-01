import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import PropTypes from 'prop-types';
import { fetchContentfulCommonEntries } from '@components/CommonSection';

const Loader = dynamic(() => import('@components/loader'));
const Landing = dynamic(() => import('@components/landing'));
export async function getServerSideProps({ params, preview, locale }) {
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const query1 = await client.getEntries({
    content_type: 'latamLandingPage',
    'fields.slug': `${params.slug}`,
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    // revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 10
  };
}

const LandingPage = ({ pageData }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loader loading={router.isFallback} />;
  }
  return <Landing pageData={pageData} />;
};

LandingPage.propTypes = {
  pageData: PropTypes.shape({
    fields: PropTypes.object
  })
};

export default LandingPage;
