import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductCategory } from '@services/productListingAPI/client';
import ShowAllProducts from '@components/ShowAllProducts';
import { getSEOData } from '@utils/footerUtils';

export default function AllListing({ params, locale, categoryProductData }) {
  return (
    <ShowAllProducts
      params={params}
      locale={locale}
      categoryProductData={categoryProductData}
    />
  );
}

export async function getServerSideProps(context) {
  const { params, locale, preview } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const languageAPI = ['default', 'es'].includes(locale) ? 'es' : 'en';

  const client = preview ? contentfulPreviewClient : contentfulClient;
  const seoMetaData = await client.getEntries({
    content_type: 'seoMetadata',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
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

  // category API -- start
  const requestBody = {
    category: params.slug,
    lang: languageAPI
  };
  const categoryProductData = await getProductCategory(requestBody);
  // categoty API -- END

  const pageData = getSEOData(params.slug, seoMetaData);
  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      world,
      pageData,
      categoryProductData,
      params,
      locale
    }
  };
}
