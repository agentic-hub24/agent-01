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
  console.log('::: locale==>', locale);
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const res = client.getEntries({
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    content_type: 'brazilLandingPage',
    'fields.slug': '/product-details',
    include: 7,
    locale: 'pt-BR'
  });

  const footerNavigationData = await client.getEntries({
    content_type: 'footer',
    include: 7,
    locale: 'pt-BR'
  });

  const headerNavigationData = await client.getEntries({
    content_type: 'header',
    include: 7,
    locale: 'pt-BR'
  });
  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: 'pt-BR'
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
