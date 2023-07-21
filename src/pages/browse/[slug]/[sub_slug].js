import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import ProductListing from '@components/ProductListing';

export default function ProductList({
  productListingData,
  requestBody,
  params,
  locale
}) {
  return (
    <ProductListing
      productListingData={productListingData}
      requestBody={requestBody}
      params={params}
      locale={locale}
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
  //PLP API CALL --> Start
  const requestBody = {
    search: '',
    orderby: '',
    RegionProductCategoryLocal: params.sub_slug.replace(/\+/g, ' '),
    RegionProductCategoryLocal_esMX: ''
  };
  const productListingData = await getProductListing(requestBody);
  // PLP API --> end

  return {
    props: {
      footerNavigationData,
      headerNavigationData,
      world,
      productListingData,
      params,
      locale,
      requestBody
    }
  };
}
