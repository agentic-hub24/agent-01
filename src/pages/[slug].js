import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import Landing from '@components/landing';

export async function getStaticPaths() {
  const res = await contentfulClient.getEntries({
    content_type: 'brazilLandingPage',
    'metadata.tags.sys.id[in]': 'kohlerBrazil'
  });

  const landingPages = res?.items?.filter(item => {
    return (
      item?.fields?.slug !== '/' &&
      !item?.fields?.slug.includes('browse') &&
      !item?.fields?.slug.includes('results')
    ); // excluding homepage
  });

  const paths = landingPages.map(brLandingPage => brLandingPage?.fields?.slug);

  /**
     * We'll pre-render only these paths at build time.
     * on-demand if the path doesn't exist.
  
     * How does getStaticProps run with regards to getStaticPaths
     * getStaticProps runs during next build for any paths returned during build
     * getStaticProps runs in the background when using fallback: true
     * getStaticProps is called before initial render when using fallback: blocking
     */
  return { paths, fallback: true };
}

export async function getStaticProps({ params, preview }) {
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const query1 = await client.getEntries({
    content_type: 'brazilLandingPage',
    'fields.slug[match]': `/${params.slug}`,
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    include: 7,
    locale: 'pt-BR'
  });
  const query2 = client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    include: 7,
    locale: 'pt-BR'
  });
  const query3 = client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    include: 7,
    locale: 'pt-BR'
  });

  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: 'pt-BR'
  });

  const results = await Promise.all([query1, query2, query3]);

  const res = results[0];
  const headerNavigationData = results[1];
  const footerNavigationData = results[2];

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
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 10
  };
}

const LandingPage = ({ pageData }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div className='mx-auto mb-4 text-center'>Loading...</div>;
  }
  return <Landing pageData={pageData} />;
};

export default LandingPage;
