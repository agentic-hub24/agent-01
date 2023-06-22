import { memo } from 'react';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import Landing from '@components/landing';

const Home = ({ pageData }) => {
  return <Landing pageData={pageData} />;
};

export async function getStaticProps({ preview, locale }) {
  const lc = locale === 'es'? 'es-US' : 'en-US'
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const res = client.getEntries({
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    content_type: 'latamLandingPage',
    'fields.slug': '/en',
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

  return {
    props: {
      pageData: results[0]?.items?.[0]?.fields,
      footerNavigationData,
      headerNavigationData,
      world,
      seoData: results[0].items[0]?.fields?.seoMetadata
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 1000
  };
}

export default memo(Home);
