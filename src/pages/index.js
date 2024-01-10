import { memo } from 'react';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import PropTypes from 'prop-types';
import Landing from '@components/landing';

const Home = ({ pageData }) => {
  return <Landing pageData={pageData} />;
};

Home.propTypes = {
  pageData: PropTypes.shape({})
};

export async function getStaticProps({ preview, locale }) {
  const slugName = ['default', 'es'].includes(locale) ? 'es' : 'en';
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const client = preview ? contentfulPreviewClient : contentfulClient;

  const res = client.getEntries({
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    content_type: 'latamLandingPage',
    'fields.slug': slugName,
    include: 7,
    locale: lc
  });

  const footerNavigationData = await client.getEntries({
    content_type: 'footer',
    include: 7,
    locale: lc
  });

  const headerNavigationData = await client.getEntries({
    content_type: 'header',
    include: 7,
    locale: lc
  });
  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: lc
  });

  const results = await Promise.all([res]);
  const pageData = results?.[0]?.items?.[0]?.fields;
  if (!pageData) {
    return {
      notFound: true,
      revalidate: 10
    };
  }

  return {
    props: {
      pageData: pageData,
      footerNavigationData,
      headerNavigationData,
      world
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 10
  };
}

export default memo(Home);
