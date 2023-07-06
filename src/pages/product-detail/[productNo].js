import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductDetails } from '@services/productListingAPI/client';
import DetailsComponent from '@components/detailsComponent';

export default function ProductDetailMain({ productDetailsData }) {
  return <DetailsComponent productDetailsData={productDetailsData} />;
}

export async function getServerSideProps(context) {
  const {
    params: { productNo },
    locale,
    preview
  } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const languageAPI = ['default', 'es'].includes(locale) ? 'es-mx' : 'en';
  const client = preview ? contentfulPreviewClient : contentfulClient;

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

  const productDetailsData = await getProductDetails(languageAPI, productNo);

  return {
    props: {
      footerNavigationData,
      headerNavigationData,
      world,
      productDetailsData
    }
  };
}
