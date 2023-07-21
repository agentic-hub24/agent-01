import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductCategory } from '@services/productListingAPI/client';
import ShowAllProducts from '@components/ShowAllProducts';

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

  // category API -- start
  const requestBody = {
    category: params.slug,
    lang: languageAPI
  };
  const categoryProductData = await getProductCategory(requestBody);
  // categoty API -- END

  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      world,
      categoryProductData,
      params,
      locale
    }
  };
}
