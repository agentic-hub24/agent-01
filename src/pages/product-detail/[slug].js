import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductDetails } from '@services/productListingAPI/client';
import DetailsComponent from '@components/detailsComponent';

export default function ProductDetails({ productDetailsData }) {
  return <DetailsComponent productDetailsData={productDetailsData} />;
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
    locale,
    preview
  } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const res = client.getEntries({
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    content_type: 'latamLandingPage',
    'fields.slug': '/product-details',
    include: 7,
    locale: lc
  });

  const footerNavigationData = await client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });

  const headerNavigationData = await client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });
  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: lc
  });

  const results = await Promise.all([res]);

  const productDetailsData = await getProductDetails('pt', slug);

  return {
    props: {
      // pageData: results[0]?.items?.[0]?.fields,
      footerNavigationData,
      headerNavigationData,
      world,
      productDetailsData
      // seoData: results[0].items[0]?.fields?.seoMetadata
    }
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    // revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 1000
  };
}
